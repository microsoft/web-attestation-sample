// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from 'express'
import http from 'http'
import rateLimit from 'express-rate-limit'
import fs from 'fs'
import * as crypto from 'crypto'

import type * as io from './io.js'
import * as settings from './settings.js'

import { upjf, uprove, utils, serialization } from 'uprove-node-reference'

// some issuer settings
const MAX_TOKEN_COUNT = 10 // maximum number of tokens to issue in parallel
const ISSUER_PARAMS_PATH = 'public' + settings.JWKS_SUFFIX // created by the setup script
const PRIVATE_KEY_PATH = 'private/ip.key' // created by the setup script

// read the issuer parameters
const jwksString = fs.readFileSync(ISSUER_PARAMS_PATH, 'utf8')
const jwk: upjf.IssuerParamsJWK = (JSON.parse(jwksString) as io.IssuerParamsJWKS).keys[0] // TODO: add a config option to select the key
const issuerParams = upjf.decodeJWKAsIP(jwk)
console.log('Issuer parameters loaded from: ' + ISSUER_PARAMS_PATH)

// read the private key
const privateString = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8')
const privateKey = upjf.decodeBase64UrlAsPrivateKey(issuerParams, privateString)
console.log('Issuer private key loaded from: ' + PRIVATE_KEY_PATH)

// create the issuer key and params object
const issuerKeyAndParams: uprove.IssuerKeyAndParams = {
    ip: issuerParams,
    y0: privateKey
}

// setup server
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.static('./public')) // public files

// apply a rate limiter to incoming request (as suggested by CodeQL)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

// session database
const sessionDB = new Map<string, uprove.Issuer>()

// issuance protocol handler
app.post(settings.ISSUANCE_SUFFIX, (req, res) => {
    console.log('Received POST for', settings.ISSUANCE_SUFFIX, req.body)
    res.type('json')
    try {
        let response
        if ('sID' in req.body) {
            // 2nd issuance message
            const message2 = req.body as io.SecondIssuanceMessage

            // check if we have an issuance session with this ID
            const issuer = sessionDB.get(message2.sID)
            if (issuer != null) {
                // issuer creates the third message
                try {
                    const message3 = serialization.encodeThirdIssuanceMessage(
                        issuer.createThirdMessage(
                            serialization.decodeSecondIssuanceMessage(issuerKeyAndParams.ip, message2.msg)
                        )
                    )
                    response = {
                        sID: message2.sID,
                        msg: message3
                    }
                    // delete issuer object
                    sessionDB.delete(message2.sID)
                } catch (err) {
                    response = { err: 'issuance error' }
                }
            } else {
                response = {
                    err: 'Invalid session ID: ' + message2.sID
                }
            }
        } else {
            // initial token request
            // NOTE: user authentication is outside the scope of this sample, we assume
            //       the user is authorized to obtain tokens. The refresh ID is used to
            //       identify the user in subsequent issuance calls.
            const msg = req.body as io.TokenRequestMessage
            let refreshID
            if (msg.rID != null) {
                // TODO: check if the refresh ID is valid
                refreshID = msg.rID
            } else {
                // create a random refresh ID to recognize the user in subsequent issuance calls
                refreshID = crypto.randomBytes(32).toString('base64')
            }

            let n = 1
            if (msg.n != null) {
                // issue the requested number of tokens (up to our max count)
                // NOTE: this is application-specific; tokens might have some value (access ticket, e-coin, etc.)
                //       in which case the number of issued tokens would be measured/controlled by the issuer
                utils.checkUnsignedInt(n)
                n = msg.n <= MAX_TOKEN_COUNT ? msg.n : MAX_TOKEN_COUNT
            }
            // create a random session ID to recognize the user session on the second call
            const sessionID = crypto.randomBytes(32).toString('base64')

            // create the token information object; this will be included in every token and will be visible
            // to Verifiers
            const spec = upjf.parseSpecification(issuerParams.S)
            const tokenInformation: upjf.TokenInformation = {
                iss: settings.ISSUER_URL,
                // set the expiration date
                exp: upjf.getExp(spec.expType, settings.TOKEN_VALIDITY_IN_DAYS),
                // get a user-specific label for the token, user auth is out-of-scope in this sample,
                // so we return a fixed label for a fixed user
                lbl: settings.getLabel('alice')
            }
            const TI = upjf.encodeTokenInformation(tokenInformation)

            const issuer = new uprove.Issuer(issuerKeyAndParams, [], TI, n)
            const message1 = serialization.encodeFirstIssuanceMessage(issuer.createFirstMessage())

            response = {
                sID: sessionID,
                rID: refreshID,
                kid: jwk.kid,
                TI: Buffer.from(TI).toString('base64'),
                msg: message1
            }

            // store the issuance session object
            sessionDB.set(sessionID, issuer)
        }
        console.log('Response', response)
        res.send(response)
    } catch (err) {
        const errString = err as string
        console.log('Error: ' + errString)
        res.send({ error: errString })
    }
})

http.createServer(app).listen(settings.ISSUER_PORT, () => {
    console.log('Issuer listening at: ' + settings.ISSUER_URL)
})
