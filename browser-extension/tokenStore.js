// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// check token store to renew expired tokens or when they are running out
export async function updateTokens() {
    console.log("updateToken called", new Date().toString());
    // TODO
}

export async function storeTokens(issuerUrl, uid, tokens) {
    console.log("storeTokens called", issuerUrl, uid, tokens);
    // TODO
}