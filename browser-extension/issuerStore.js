// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getIssuerParams(issuerUrl) {
    return {
        "kty": "UP",
        "alg": "UP256",
        "kid": "mxANd6pAbiO2DoL2qB1jpaeHRkjpFZXyFXkLmv6U79Y",
        "g0": "BCBrrePM00SFz4NL7kTnM9WbXGcYQTCNf7fXbeK7t7oCnKptIoqMchNJBeEGetdOBvDLUp5HkFxy9u2T6oxug9w",
        "spec": "eyJuIjowLCJleHBUeXBlIjoiZGF5In0"
    }
}

export function setIssuerParams(issuerUrl, issuerParams) {
    // TODO
}
