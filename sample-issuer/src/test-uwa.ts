// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Use existing issuer params to issue a token and create a UWA

import fs from 'fs'
import { Command } from 'commander'
import process from 'process'

import { upjf, uprove, serialization } from 'uprove-node-reference'
import type * as io from './io.js'
import * as settings from './settings.js'

interface Options {
    issuerJwksPath: string
    issuerKeyPath: string
    tokenKeyPath: string
    tokenPath: string
    issuerUrl: string
    expiration: string
    label: string
    uwaScope: string
    uwaPath: string
}

const program = new Command()
program.option('-j, --issuerJwksPath <issuerJwksPath>', 'path to the input issuer JWKS', 'public' + settings.JWKS_SUFFIX)
program.option('-p, --issuerKeyPath <issuerKeyPath>', 'path to the input private issuer key file', 'private/ip.key')
program.option('-k, --tokenKeyPath <tokenKeyPath>', 'path to the output token key file', 'private/token.key')
program.option('-t, --tokenPath <tokenPath>', 'path to the output token file', 'public/token.json')
program.option('-u, --issuerUrl <issuerUrl>', 'issuer URL to encode in the token', settings.ISSUER_URL)
program.option('-e, --expiration <expiration>', 'token expiration in days', '500')
program.option('-l, --label <label>', 'token label', '1')
program.option('-s, --uwaScope <uwaScope>', 'UWA scope', 'https://example.com')
program.option('-a, --uwaPath <uwaPath>', 'path to the output UWA file', 'uwa.txt')

program.parse(process.argv)
const options: Options = program.opts()

void (async () => {
    try {
        // read the issuer parameters
        const jwksString = fs.readFileSync(options.issuerJwksPath, 'utf8')
        const jwk: upjf.IssuerParamsJWK = (JSON.parse(jwksString) as io.IssuerParamsJWKS).keys[0] // TODO: add a config option to select the key
        const issuerParams = upjf.decodeJWKAsIP(jwk)
        console.log('Issuer parameters loaded from: ' + options.issuerJwksPath)

        // read the private key
        const privateString = fs.readFileSync(options.issuerKeyPath, 'utf8')
        const privateKey = upjf.decodeBase64UrlAsPrivateKey(issuerParams, privateString)
        console.log('Issuer private key loaded from: ' + options.issuerKeyPath)

        // create the issuer key and params object
        const issuerKeyAndParams: uprove.IssuerKeyAndParams = {
            ip: issuerParams,
            y0: privateKey
        }

        // create the token information
        const spec = upjf.parseSpecification(issuerParams.S)
        const tokenInformation: upjf.TokenInformation = {
            iss: options.issuerUrl,
            exp: upjf.getExp(spec.expType, parseInt(options.expiration)),
            lbl: parseInt(options.label)
        }
        const TI = upjf.encodeTokenInformation(tokenInformation)

        // initialize the issuer and prover
        const issuer = new uprove.Issuer(issuerKeyAndParams, [], TI, 1)
        const prover = new uprove.Prover(issuerParams, [], TI, new Uint8Array(), 1)

        // perform issuance protocol
        const message1 = issuer.createFirstMessage()
        const message2 = prover.createSecondMessage(message1)
        const message3 = issuer.createThirdMessage(message2)
        const uproveKeysAndTokens = prover.createTokens(message3)
        const tokenKey = uproveKeysAndTokens[0].alphaInverse
        fs.writeFileSync(options.tokenKeyPath, upjf.encodePrivateKeyAsBase64Url(tokenKey))
        console.log('Token key written to: ' + options.tokenKeyPath)
        const token = uproveKeysAndTokens[0].upt
        const encodedToken = serialization.encodeUProveToken(token)
        fs.writeFileSync(options.tokenPath, JSON.stringify(encodedToken, null, 4))
        console.log('Token written to: ' + options.tokenPath)

        // create UWA
        const message = Buffer.from(JSON.stringify({
            scope: options.uwaScope,
            timestamp: Date.now()
        }))
        const presentationData = uprove.generatePresentationProof(issuerParams, [], uproveKeysAndTokens[0], message, [])
        const proof = serialization.encodePresentationProof(presentationData.pp)
        const tp = {
            upt: encodedToken,
            pp: proof
        }
        const jws = upjf.createJWS(upjf.descGqToUPAlg(issuerParams.descGq), message, tp)
        const uwa = 'uwa://' + jws
        fs.writeFileSync(options.uwaPath, uwa)
        console.log('UWA written to: ' + options.uwaPath)
    } catch (err) {
        console.log(err)
    }
})()
