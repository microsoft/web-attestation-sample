// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { presentToken, verifyTokenPresentation } from './tokens.js'

const uwaScheme = 'uwa://'

/**
 * Creates a UWA.
 * @param {string} issuerUrl the token issuer identifier
 * @param {string} scope the attestation scope
 * @returns the UWA string
 */
export async function createUWA (issuerUrl, scope) {
    try {
        // create the U-Prove token presentation as a JWS
        const jws = await presentToken(issuerUrl, scope)

        return uwaScheme + jws
    } catch (e) {
        console.error(e)
        return undefined
    }
}

/**
 * Parses and validates a UWA string
 * @param {string} uwa the UWA string
 * @returns the UWA data (scope, timestamp, issuer, and info)
 */
export async function parseUWA (uwa) {
    // parse the uwa string
    if (uwa.indexOf(uwaScheme) === -1) {
        // not a uwa string
        throw new Error('invalid uwa string')
    } else {
        try {
            return await verifyTokenPresentation(uwa.substring(uwaScheme.length))
        } catch (e) {
            console.error(e)
            throw new Error(`invalid uwa string: ${e}`)
        }
    }
}
