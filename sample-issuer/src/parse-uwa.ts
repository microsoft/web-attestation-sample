// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Parse a UWA and output its content

import fs from 'fs'
import { Command } from 'commander'
import process from 'process'

import { upjf, uprove, serialization } from 'uprove-node-reference'
import type * as io from './io.js'

interface Options {
    uwa: string
    jwksPath: string
}

const program = new Command()
program.option('-u, --uwa <uwa>', 'the User-centric Web Attestation to parse') // TODO: add an option to parse from a file too
program.option('-j, --jwksPath <jwksPath>', 'path to the issuer JWKS', 'public/.well-known/jwks.json')
program.parse(process.argv)
const options: Options = program.opts()

const uwaScheme = 'uwa://'

void (async () => {
    try {
        const jwksString = fs.readFileSync(options.jwksPath, 'utf8')
        const jwks = JSON.parse(jwksString) as io.IssuerParamsJWKS
        console.log(`Issuer JWKS loaded from: ${options.jwksPath}`)

        const uwa = options.uwa
        if (uwa == null) {
            throw new Error('missing uwa string')
        }
        if (!uwa.startsWith(uwaScheme)) {
            // not a uwa string
            throw new Error('invalid uwa string; must start with ' + uwaScheme)
        }
        const jws = uwa.substring(uwaScheme.length)
        const upJWS = upjf.parseJWS(jws)

        const header = upJWS.header
        // check the header alg (we'll check it matches the issuer params later)
        if (header == null || header.alg == null || !Object.values(upjf.UPAlg).includes(header.alg)) {
            throw new Error('invalid header alg: ' + header.alg)
        }
        const message = upJWS.payload
        const tokenPresentation = upJWS.sig
        if (tokenPresentation.upt == null) {
            throw new Error('upt missing from JWS')
        }
        if (tokenPresentation.pp == null) {
            throw new Error('pp missing from JWS')
        }
        const token = tokenPresentation.upt

        // retrieve the issuer parameters key identifier and the issuer url from the token
        const kid = token.UIDP
        console.log('Issuer key identifier: ' + kid)
        const tokenInfo = upjf.parseTokenInformation(Buffer.from(token.TI, 'base64'))
        console.log('Token information', tokenInfo)
        console.log('Issuer: ' + tokenInfo.iss)
        const issuerParamsJWK: upjf.IssuerParamsJWK | undefined = jwks.keys.find((key: upjf.IssuerParamsJWK) => key.kid === kid)
        if (issuerParamsJWK == null) {
            // TODO: fetch the issuer params from the issuer URL if it's not in the JWKS or if not provided
            throw new Error('issuer params not found for kid: ' + kid)
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
        await uprove.verifyTokenSignature(issuerParams, upt)

        // parse the presentation message's scope and timestamp
        const parsedMessage = JSON.parse(Buffer.from(message).toString('utf8'))
        const scope: string = parsedMessage.scope
        console.log('Scope: ' + scope)
        const timestamp: string = parsedMessage.timestamp
        console.log('Timestamp: ' + timestamp)

        // parse the issuer parameters' specification encoding expiration and label types
        const spec = upjf.parseSpecification(issuerParams.S)

        // check the expiration
        // transform the ms timestamp to the type encoded by the issuer (number of days)
        const sigTime = upjf.msToTypedTime(spec.expType, parseInt(timestamp))
        if (upjf.isExpired(spec.expType, tokenInfo.exp, sigTime)) {
            console.log(`token expired at timestamp ${timestamp} (expiration ${tokenInfo.exp})`)
        }
        try {
            await uprove.verifyPresentationProof(
                issuerParams,
                upt,
                message,
                serialization.decodePresentationProof(issuerParams, tokenPresentation.pp))
        } catch (err) {
            console.log('presentation proof verification failed: ' + (err as Error).toString())
        }

        // extract the label
        const label = `${spec.lblType as string}${(spec.lblValues as Record<number, string>)[tokenInfo.lbl as number]}`
        console.log(`Label: ${label}`)
    } catch (err) {
        console.log(err)
    }
})()
