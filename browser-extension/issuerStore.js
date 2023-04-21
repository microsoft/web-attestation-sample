// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getIssuerParams(issuerUrl) {
    return {
        "kty": "UP",
        "alg": "UP256",
        "kid": "ATSQlvZAMV6-w_ZoN5ZtxrSZkCVo9lNfbRRAqvwPOow",
        "g0": "BEzY_UArgtIb8wfhZLXZzPE_zaUaq4o_ilZun0mY_-LINtGZszeQ77R8qjvcABtgTFzHYsfMOozlPdhAGaAjBO0",
        "spec": "eyJuIjowLCJleHBUeXBlIjoieWVhciJ9"
    }
}

export function setIssuerParams(issuerUrl, issuerParams) {
    // TODO
}
