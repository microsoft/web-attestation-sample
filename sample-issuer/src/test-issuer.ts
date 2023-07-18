// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import got from 'got'

import type * as io from './io.js'
import * as settings from './settings.js'

import { upjf, uprove, serialization } from 'uprove-node-reference'

void (async () => {
    try {
        // first fetch the Issuer parameters
        const jwksUrl = settings.ISSUER_URL + settings.JWKS_SUFFIX
        const issuanceUrl = settings.ISSUER_URL + settings.ISSUANCE_SUFFIX
        const jwksJson: io.IssuerParamsJWKS = await got(jwksUrl).json()
        console.log('received Issuer JWKS', jwksJson)
        const jwk: upjf.IssuerParamsJWK = jwksJson.keys[0] // we assume there is one param set in the key set
        const issuerParams = await upjf.decodeJWKAsIP(jwk)

        //
        // Token issuance
        //

        // send token issuance request to Issuer
        const requestedNumberOfTokens = 5
        const request: io.TokenRequestMessage = {
            n: requestedNumberOfTokens
        }

        // parse 1st issuance message
        const firstMsg: io.FirstIssuanceMessage = await got.post(issuanceUrl, { json: request }).json()
        console.log('received 1st issuance message', firstMsg)
        const msg1 = serialization.decodeFirstIssuanceMessage(issuerParams, firstMsg.msg)
        const actualNumberOfTokens = msg1.sA.length
        const TI: Uint8Array = Buffer.from(firstMsg.TI, 'base64')
        const prover = await uprove.Prover.create(issuerParams, [], TI, new Uint8Array(), actualNumberOfTokens)

        // prover creates the second message
        const msg2 = await prover.createSecondMessage(msg1)
        const secondMessage: io.SecondIssuanceMessage = {
            sID: firstMsg.sID,
            msg: serialization.encodeSecondIssuanceMessage(msg2)
        }
        console.log('2nd issuance message', secondMessage)

        // send 2nd issuance message
        const thirdMsg: io.ThirdIssuanceMessage = await got.post(issuanceUrl, { json: secondMessage }).json()
        console.log('received 3rd issuance message', thirdMsg)
        if (firstMsg.sID !== thirdMsg.sID) {
            throw new Error('session ID mismatch')
        }

        // parse 3rd issuance message
        const msg3 = serialization.decodeThirdIssuanceMessage(issuerParams, thirdMsg.msg)
        // create the U-Prove tokens
        const uproveKeysAndTokens = prover.createTokens(msg3)

        // verify the U-Prove tokens
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        await Promise.all(uproveKeysAndTokens.map(async (ukat, _i) => {
            await uprove.verifyTokenSignature(issuerParams, ukat.upt)
            console.log(`token ${JSON.stringify(serialization.encodeUProveToken(ukat.upt))}`)
            console.log(`key ${upjf.encodePrivateKeyAsBase64Url(ukat.alphaInverse)}`)
        }))

        console.log('Success')
    } catch (err) {
        console.log(err)
    }
})()
