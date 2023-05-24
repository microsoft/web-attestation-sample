// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getIssuerParams, setIssuerParams, listIssuers } from './issuerStore.js'
import { popToken } from './tokenStore.js'
import uproveModule from './lib/uprove.mjs'

const { Buffer, serialization, upjf, uprove } = uproveModule

// send a message to the issuer and return the next message
async function sendIssuanceMessage (issuanceUrl, message) {
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

/**
 * Download issuer parameters from an issuer URL *
 * @param {string} issuerUrl
 * @returns {string}
 */
export async function downloadIssuerParams (issuerUrl) {
    let jwks
    const jwksResp = await fetch(issuerUrl + '/.well-known/jwks.json').catch(err => {
        return { ok: false, err }
    })
    if (jwksResp.ok) {
        jwks = await jwksResp.json()
        await Promise.all(
            jwks.keys.map(jwk => setIssuerParams(issuerUrl, jwk.kid, jwk))
        )
    }
    return jwksResp.ok
}

/**
 * Obtain U-Prove tokens from the issuerUrl, using the refreshID if provided
 * @param {string} issuerUrl the url of the issuer
 * @param {string} refreshID the refresh ID received from the issuer
 * @returns a token batch, a new refreshID, and the expiration date of the tokens
 */
export async function getTokens (issuerUrl, refreshID) {
    console.log('getTokens called', issuerUrl)
    try {
        const issuanceUrl = issuerUrl + '/issue'
        const request = {
            n: 5 // number of requested tokens
        }
        // add the user id to the request if provided
        if (refreshID) {
            request.rID = refreshID
        }
        // send the token request and parse the 1st issuance message
        const firstMsg = await sendIssuanceMessage(issuanceUrl, request)

        // obtain issuer params (identified by the kid sent by the issuer) from the issuer store
        const kid = firstMsg.kid

        // obtain issuer params from the issuer store by kid
        let jwk = await getIssuerParams(issuerUrl, kid)

        // if not found, download issuer params and try again
        if (!jwk) {
            await downloadIssuerParams(issuerUrl)
            jwk = await getIssuerParams(issuerUrl, kid)
        }

        if (!jwk) { throw new Error("can't find issuer params with kid " + kid) }

        const issuerParams = await upjf.decodeJWKAsIP(jwk)
        if (!issuerParams) {
            throw new Error("can't parse issuer params with kid " + kid)
        }

        // save the refresh ID for subsequent issuances
        refreshID = firstMsg.rID
        const msg1 = serialization.decodeFirstIssuanceMessage(issuerParams, firstMsg.msg)
        const actualNumberOfTokens = msg1.sA.length
        const TI = Buffer.from(firstMsg.TI, 'base64')
        const tokenInformation = upjf.parseTokenInformation(TI)
        // check that tokenInformation.iss matches issuerUrl
        if (tokenInformation.iss !== issuerUrl) {
            throw new Error('token information issuer mismatch: ' + tokenInformation.iss + ' != ' + issuerUrl)
        }
        // check that tokenInformation.exp is not expired
        const spec = upjf.parseSpecification(issuerParams.S)
        const nowTime = upjf.msToTypedTime(spec.expType, Date.now())
        if (upjf.isExpired(spec.expType, tokenInformation.exp, nowTime)) {
            throw new Error('token is expired')
        }
        const expiration = tokenInformation.exp
        // check that the tokenInformation.lbl value is contained in the specification (protects the user against "tagging attacks")
        if (!spec.lblValues[tokenInformation.lbl]) {
            throw new Error('invalid lbl value: ' + tokenInformation.lbl)
        }

        // create the prover
        const prover = await uprove.Prover.create(issuerParams, [], TI, new Uint8Array(), actualNumberOfTokens)

        // prover creates the second message
        const msg2 = await prover.createSecondMessage(msg1)
        const secondMessage = {
            sID: firstMsg.sID,
            msg: serialization.encodeSecondIssuanceMessage(msg2)
        }
        console.log('2nd issuance message', secondMessage)

        // send 2nd issuance message
        const thirdMsg = await sendIssuanceMessage(issuanceUrl, secondMessage)
        if (firstMsg.sID !== thirdMsg.sID) {
            throw new Error('session ID mismatch')
        }

        // parse 3rd issuance message
        const msg3 = serialization.decodeThirdIssuanceMessage(issuerParams, thirdMsg.msg)

        // create the U-Prove tokens
        const tokens = prover.createTokens(msg3).map((upkt) => {
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
}

/**
 * Creates a U-Prove presentation proof
 * @param {string} issuerUrl the url of the issuer
 * @param {string} scope the scope of the presentation
 */
export async function presentToken (issuerUrl, scope) {
    const tokenData = await popToken(issuerUrl)
    if (!tokenData) {
        throw new Error('no token available')
    }
    const issuerParamsJWK = await getIssuerParams(issuerUrl, tokenData.kid)
    if (!issuerParamsJWK) {
        throw new Error('issuer params not found')
    }
    const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK)

    const upkt = {
        alphaInverse: upjf.decodeBase64UrlAsPrivateKey(issuerParams, tokenData.keyAndToken.key),
        upt: serialization.decodeUProveToken(issuerParams, tokenData.keyAndToken.token)
    }
    const message = Buffer.from(JSON.stringify({
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
}

/**
 * Verifies a U-Prove token presentation
 * @param {string} jws JWS encoding the token and proof
 */
export async function verifyTokenPresentation (jws) {
    try {
        const upJWS = upjf.parseJWS(jws)

        const header = upJWS.header
        // check the header alg (we'll check it matches the issuer params later)
        if (!header || !header.alg || !Object.values(upjf.UPAlg).includes(header.alg)) {
            throw new Error('invalid header alg: ' + header.alg)
        }
        const message = upJWS.payload
        const tokenPresentation = upJWS.sig
        if (!tokenPresentation.upt) {
            throw new Error('upt missing from JWS')
        }
        if (!tokenPresentation.pp) {
            throw new Error('pp missing from JWS')
        }
        const token = tokenPresentation.upt

        // retrieve the issuer parameters key identifier and the issuer url from the token
        const kid = token.UIDP
        const tokenInfo = upjf.parseTokenInformation(Buffer.from(token.TI, 'base64'))
        let issuerParamsJWK = await getIssuerParams(tokenInfo.iss, kid)
        if (!issuerParamsJWK) {
            // check if we already trusted the issuer, in which case we are missing
            // newer issuer parameters
            const trustedIssuers = await listIssuers()
            if (trustedIssuers.find((issuer) => issuer === tokenInfo.iss)) {
                // retrieve the latest issuer parameters
                await downloadIssuerParams(tokenInfo.iss)
                issuerParamsJWK = await getIssuerParams(tokenInfo.iss, kid)
            }
            if (!issuerParamsJWK) {
                // unknown issuer; can't proceed with verification
                return {
                    issuer: tokenInfo.iss,
                    status: 'unknown_issuer'
                }
            }
        }
        // parse the JSON Web Key as an Issuer parameters object
        const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK)
        // check that JWS alg matches the issuer params's group
        if ((issuerParams.descGq === uprove.ECGroup.P256 && header.alg !== upjf.UPAlg.UP256) ||
            (issuerParams.descGq === uprove.ECGroup.P384 && header.alg !== upjf.UPAlg.UP384) ||
            (issuerParams.descGq === uprove.ECGroup.P521 && header.alg !== upjf.UPAlg.UP521)) {
            throw new Error(`header alg ${header.alg} doesn't match the Issuer params' group ${issuerParams.descGq}`)
        }
        // decode and verify the U-Prove token
        const upt = serialization.decodeUProveToken(issuerParams, token)
        uprove.verifyTokenSignature(issuerParams, upt)

        // parse the presentation message's scope and timestamp
        const parsedMessage = JSON.parse(Buffer.from(message).toString('utf8'))
        const scope = parsedMessage.scope
        const timestamp = parsedMessage.timestamp

        // parse the issuer parameters' specification encoding expiration and label types
        const spec = upjf.parseSpecification(issuerParams.S)
        const about = spec.about

        // check the expiration
        // transform the ms timestamp to the type encoded by the issuer (number of days)
        const sigTime = upjf.msToTypedTime(spec.expType, parseInt(timestamp))
        if (upjf.isExpired(spec.expType, tokenInfo.exp, sigTime)) {
            throw new Error(`token expired at timestamp ${timestamp} (expiration ${tokenInfo.exp})`)
        }
        await uprove.verifyPresentationProof(
            issuerParams,
            upt,
            message,
            serialization.decodePresentationProof(issuerParams, tokenPresentation.pp))

        // extract the label
        const label = `${spec.lblType}: ${spec.lblValues[tokenInfo.lbl]}`

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
export function getBaseURL (url) {
    try {
        const urlObj = new URL(url)
        const baseURL = (urlObj.origin + urlObj.pathname).replace(/\/$/,'').toLowerCase()
        return baseURL
    } catch (error) {
        console.error('Error getting base URL:', error)
        return null
    }
}
