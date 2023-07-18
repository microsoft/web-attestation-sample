// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from 'fs'
import { Command } from 'commander'
import process from 'process'

import { type IssuerParamsJWKS } from './io.js'
import * as settings from './settings.js'

import { uprove, upjf as UPJF } from 'uprove-node-reference'

const ECGroup = uprove.ECGroup

interface Options {
    curve: string
    jwksPath: string
    privatePath: string
}

// process options
const program = new Command()
program.option('-k, --jwksPath <jwksPath>', 'path to the output JWKS file to create', 'public' + settings.JWKS_SUFFIX)
program.option('-p, --privatePath <privatePath>', 'path to the output private key file', 'private/ip.key')
program.option('-c, --curve <curve>', 'recommended curve to use', 'P256')
program.parse(process.argv)
const options: Options = program.opts()

void (async () => {
    try {
    // create a new JWKS
        const jwks: IssuerParamsJWKS = { keys: [] }

        let descGq: uprove.ECGroup
        // parse the curve option (ignore case and dashes)
        switch (options.curve.toUpperCase().replace(/-/g, '')) {
            case 'P256':
                descGq = ECGroup.P256
                break
            case 'P384':
                descGq = ECGroup.P384
                break
            case 'P521':
                descGq = ECGroup.P521
                break
            default:
                throw new Error(`Unsupported curve ${options.curve}`)
        }
        const ikp = await UPJF.createIssuerKeyAndParamsUPJF(
            descGq,
            {
                n: 0, // no attributes
                expType: UPJF.ExpirationType.day, // token expirations measured in days

                // application-specific values
                about: settings.ISSUER_ABOUT_URL, // issuer about website
                lblType: settings.TOKEN_LABEL_TYPE, // type of the token label
                lblValues: settings.TOKEN_LABEL_VALUES // valid token label values
            },
            undefined)
        const jwk = UPJF.encodeIPAsJWK(ikp.ip)

        // write out updated JWKS
        jwks.keys.push(jwk)
        fs.writeFileSync(options.jwksPath, JSON.stringify(jwks, null, 4))
        console.log(`Public JWKS written to ${options.jwksPath}`)

        // write out private key
        fs.writeFileSync(options.privatePath, UPJF.encodePrivateKeyAsBase64Url(ikp.y0))
        console.log(`Private key written to ${options.privatePath}`)
    } catch (err) {
        console.log(err)
    }
})()
