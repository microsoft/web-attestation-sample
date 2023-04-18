// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const uwaScheme = "uwa://";

function base64UrlEncode(str) {
    let base64 = window.btoa(str);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return window.atob(base64);
}

export function createUWA(attestationData, proofOfPossessionData) {
    // NOTE: TEMPLATE CODE, NOT COMPLETE FUNCTIONALITY

    // create the attestation JWS
    const attJws = base64UrlEncode(JSON.stringify(attestationData));

    // create the proof of possession JWS
    const popJws = base64UrlEncode(JSON.stringify(proofOfPossessionData));

    return uwaScheme + attJws + ";" + popJws;
}

export function parseUWA(uwa) {
    // NOTE: TEMPLATE CODE, NOT COMPLETE FUNCTIONALITY
    
    // parse the uwa string
    if (uwa.indexOf(uwaScheme) === -1) {
        // not a uwa string  
        return undefined;
    } else {
        // split the uwa string into attestation JWS and proof of possession JWS
        const [attJws, popJws] = uwa.slice(uwaScheme.length).split(';');
        if (!attJws || !popJws) {
            // invalid uwa string
            return undefined;
        }

        // parse the attestation JWS
        const attestationData = JSON.parse(base64UrlDecode(attJws));
        if (!attestationData || !attestationData.issuer) {
            // invalid attestation JWS
            return undefined;
        }

        // parse the proof of possession JWS
        const proofOfPossessionData = JSON.parse(base64UrlDecode(popJws));
        if (!proofOfPossessionData || !proofOfPossessionData.scope || !proofOfPossessionData.date || !proofOfPossessionData.info) {
            // invalid proof of possession JWS
            return undefined;
        }

        return {
            issuer: attestationData.issuer,
            scope: proofOfPossessionData.scope,
            date: proofOfPossessionData.date,
            info: proofOfPossessionData.info
        }
    }
}