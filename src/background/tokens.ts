// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getIssuerParams, listIssuers, setIssuerParams } from './issuerStore.js'
import { popToken } from './tokenStore.js'
import { upjf, serialization, uprove } from 'uprove-node-reference'
import { type FirstIssuanceMessage, type ThirdIssuanceMessage } from '../../sample-issuer/src/io.js'
import { base64ToBytes, bytesToString, stringToBytes } from '../utils.js'

const DOWNLOAD_TIMEOUT = 2000

interface Response {
  ok: boolean
  err?: Error
  json?: () => Promise<IssuerParamsJWKS>
}

interface IssuerParamsJWKS {
  keys: upjf.IssuerParamsJWK[]
}

async function sendIssuanceMessage<T> (issuanceUrl: string, message: object): Promise<T> {
  console.log('sending issuance message', message)
  const response = await fetch(issuanceUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  })
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }
  const nextMessage = await response.json()
  console.log('received issuance message', nextMessage)
  return nextMessage
}

export async function downloadIssuerParams (issuerUrl: string): Promise<boolean> {
  let jwks: IssuerParamsJWKS
  const jwksResp: Response = await Promise.race<Response>([
    fetch(issuerUrl + '/.well-known/jwks.json'),
    new Promise((_resolve, reject) =>
      setTimeout(() => {
        reject(new Error('timeout'))
      }, DOWNLOAD_TIMEOUT)
    )
  ]).catch(err => {
    return { ok: false, err }
  })

  if (jwksResp.ok && (jwksResp.json != null)) {
    jwks = await jwksResp.json()
    await Promise.all(
      jwks.keys.map(async (jwk: upjf.IssuerParamsJWK) => { await setIssuerParams(issuerUrl, jwk.kid, jwk) })
    )
  }
  return jwksResp.ok
}

interface request {
  n: number
  rID?: string
}

export async function getTokens (issuerUrl: string, refreshID?: string): Promise<{ refreshID: string, expiration: number, tokens: Array<{ key: string, token: serialization.UProveTokenJSON }>, kid: string } | undefined> {
  console.log('getTokens called', issuerUrl)
  try {
    const issuanceUrl = issuerUrl + '/issue'
    const request: request = {
      n: 5 // number of requested tokens
    }
    if (refreshID != null) {
      request.rID = refreshID
    }
    const firstMsg = await sendIssuanceMessage<FirstIssuanceMessage>(issuanceUrl, request)
    const kid: string = firstMsg.kid
    let jwk = await getIssuerParams(issuerUrl, kid)
    if (jwk == null) {
      await downloadIssuerParams(issuerUrl)
      jwk = await getIssuerParams(issuerUrl, kid)
    }
    if (jwk == null) { throw new Error("can't find issuer params with kid " + kid) }
    const issuerParams = await upjf.decodeJWKAsIP(jwk)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!issuerParams) {
      throw new Error("can't parse issuer params with kid " + kid)
    }
    refreshID = firstMsg.rID
    const msg1 = serialization.decodeFirstIssuanceMessage(issuerParams, firstMsg.msg)
    const actualNumberOfTokens = msg1.sA.length
    const TI = base64ToBytes(firstMsg.TI)
    const tokenInformation: upjf.TokenInformation = upjf.parseTokenInformation(TI)
    if (tokenInformation.iss !== issuerUrl) {
      throw new Error(`token information issuer mismatch: ${tokenInformation.iss} != ${issuerUrl}`)
    }
    const spec = upjf.parseSpecification(issuerParams.S)
    const nowTime = upjf.msToTypedTime(spec.expType, Date.now())
    if (upjf.isExpired(spec.expType, tokenInformation.exp, nowTime)) {
      throw new Error('token is expired')
    }
    const expiration = tokenInformation.exp
    if ((spec.lblValues as Record<number, string>)[tokenInformation.lbl as number] == null) {
      throw new Error(`invalid lbl value: ${tokenInformation.lbl as number}`)
    }
    const prover = await uprove.Prover.create(issuerParams, [], TI, new Uint8Array(), actualNumberOfTokens)
    const msg2 = await prover.createSecondMessage(msg1)
    const secondMessage = {
      sID: firstMsg.sID,
      msg: serialization.encodeSecondIssuanceMessage(msg2)
    }
    console.log('2nd issuance message', secondMessage)
    const thirdMsg = await sendIssuanceMessage<ThirdIssuanceMessage>(issuanceUrl, secondMessage)
    if (firstMsg.sID !== thirdMsg.sID) {
      throw new Error('session ID mismatch')
    }
    const msg3 = serialization.decodeThirdIssuanceMessage(issuerParams, thirdMsg.msg)
    const tokens = prover.createTokens(msg3).map((upkt: uprove.UProveKeyAndToken) => {
      return {
        key: upjf.encodePrivateKeyAsBase64Url(upkt.alphaInverse),
        token: serialization.encodeUProveToken(upkt.upt)
      }
    })
    console.log('tokens', tokens)
    return {
      tokens,
      refreshID,
      expiration,
      kid
    }
  } catch (error) {
    console.error('Error making the POST request:', error)
  }
  return undefined
}

export async function presentToken (issuerUrl: string, scope: string): Promise<string> {
  const tokenData = await popToken(issuerUrl)
  if (tokenData == null) {
    throw new Error('no token available')
  }
  const issuerParamsJWK = await getIssuerParams(issuerUrl, tokenData.kid)
  if (issuerParamsJWK == null) {
    throw new Error('issuer params not found')
  }
  const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK)

  const upkt: uprove.UProveKeyAndToken = {
    alphaInverse: upjf.decodeBase64UrlAsPrivateKey(issuerParams, tokenData.keyAndToken.key),
    upt: serialization.decodeUProveToken(issuerParams, tokenData.keyAndToken.token)
  }
  const message: Uint8Array = stringToBytes(JSON.stringify({
    scope,
    timestamp: Date.now()
  }))
  const presentationData = await uprove.generatePresentationProof(issuerParams, [], upkt, message, [])
  const proof = serialization.encodePresentationProof(presentationData.pp)
  const tp = {
    upt: tokenData.keyAndToken.token,
    pp: proof
  }
  const jws = upjf.createJWS(upjf.descGqToUPAlg(issuerParams.descGq), message, tp)

  return jws
} // Make sure to define these models accordingly

/**
 * Verifies a U-Prove token presentation
 * @param {string} jws JWS encoding the token and proof
 */
export async function verifyTokenPresentation (jws: string): Promise<Validation> {
  try {
    const upJWS = upjf.parseJWS(jws)

    const header = upJWS.header
    if ((header == null) || header.alg == null || !Object.values(upjf.UPAlg).includes(header.alg)) {
      throw new Error(`invalid header alg: ${header.alg}`)
    }
    const message: Uint8Array = upJWS.payload
    const tokenPresentation: serialization.TokenPresentation = upJWS.sig
    if (tokenPresentation.upt == null) {
      throw new Error('upt missing from JWS')
    }
    if (tokenPresentation.pp == null) {
      throw new Error('pp missing from JWS')
    }
    const token: serialization.UProveTokenJSON = tokenPresentation.upt

    const kid: string = token.UIDP
    const tokenInfo = upjf.parseTokenInformation(base64ToBytes(token.TI))
    let issuerParamsJWK: upjf.IssuerParamsJWK | null = await getIssuerParams(tokenInfo.iss, kid)
    if (issuerParamsJWK == null) {
      const trustedIssuers: string[] = await listIssuers()
      if (trustedIssuers.find((issuer: string) => issuer === tokenInfo.iss) != null) {
        await downloadIssuerParams(tokenInfo.iss)
        issuerParamsJWK = await getIssuerParams(tokenInfo.iss, kid)
      }
      if (issuerParamsJWK == null) {
        return {
          issuer: tokenInfo.iss,
          status: 'unknown_issuer'
        }
      }
    }
    const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK)
    if ((issuerParams.descGq === uprove.ECGroup.P256 && header.alg !== upjf.UPAlg.UP256) ||
      (issuerParams.descGq === uprove.ECGroup.P384 && header.alg !== upjf.UPAlg.UP384) ||
      (issuerParams.descGq === uprove.ECGroup.P521 && header.alg !== upjf.UPAlg.UP521)) {
      throw new Error(`header alg ${header.alg} doesn't match the Issuer params' group ${issuerParams.descGq}`)
    }
    const upt: uprove.UProveToken = serialization.decodeUProveToken(issuerParams, token)
    await uprove.verifyTokenSignature(issuerParams, upt)

    const parsedMessage = JSON.parse(bytesToString(message))
    const scope: string = parsedMessage.scope
    const timestamp: number = parsedMessage.timestamp
    const spec: upjf.Specification = upjf.parseSpecification(issuerParams.S)
    const about: string = spec.about as string

    const sigTime: number = upjf.msToTypedTime(spec.expType, parseInt(timestamp.toString()))
    if (upjf.isExpired(spec.expType, tokenInfo.exp, sigTime)) {
      throw new Error(`token expired at timestamp ${timestamp} (expiration ${tokenInfo.exp})`)
    }
    await uprove.verifyPresentationProof(
      issuerParams,
      upt,
      message,
      serialization.decodePresentationProof(issuerParams, tokenPresentation.pp))

    const label = `${spec.lblType as string}: ${(spec.lblValues as Record<number, string>)[tokenInfo.lbl as number]}`

    return {
      issuer: tokenInfo.iss,
      status: 'valid',
      scope,
      timestamp,
      info: label,
      about
    }
  } catch (error) {
    console.error('Error validating the JWS', error)
    return {
      status: 'error'
    }
  }
}

/**
 * Returns the base, sanitized URL given a complete one; i.e. a lowercase scheme + path
 * URL without query-parameters or anchors, and without a trailing '/'
 * @param {*} url the URL to sanitize
 * @returns the sanitized base URL
 */
export function getBaseURL (url: string): string | null {
  try {
    const urlObj: URL = new URL(url)
    const baseURL: string = (urlObj.origin + urlObj.pathname).replace(/\/$/, '').toLowerCase()
    return baseURL
  } catch (error) {
    console.error('Error getting base URL:', error)
    return null
  }
}
