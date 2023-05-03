// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const ISSUER_STORE_KEY = "issuerStore";

/**
 * Returns the issuer params from the store
 * @param {string} kid the key identifier of the issuer parameters
 * @returns the JSON encoded issuer params
 */
export async function getIssuerParams(kid) {
    console.log("getIssuerParams called", kid);
    return new Promise((resolve) => {
        chrome.storage.local.get([ISSUER_STORE_KEY], (result) => {
            let issuerStore = result.issuerStore || {};
            let issuerParams = issuerStore[kid] || null;
            console.log("getIssuerParams: issuerParams", issuerParams);
            resolve(issuerParams);
        });
    });
}

/**
 * Stores the issuer params in the store
 * @param {string} kid the key identifier of the issuer parameters
 * @param {*} issuerParams the JSON encoded issuer params
 */
export function setIssuerParams(kid, issuerParams) {
    console.log("setIssuerParams called", kid, issuerParams);
    chrome.storage.local.get([ISSUER_STORE_KEY]).then((result) => {
        let issuerStore = result.issuerStore || {};
        issuerStore[kid] = issuerParams;
        console.log("setIssuerParams: issuerStore", issuerStore);
        chrome.storage.local.set({ issuerStore: issuerStore });
    });
}

/**
 * Returns the list of trusted issuers
 * @returns the list of trusted issuers
 */
export async function listIssuers() {
    console.log("listIssuers called");
    return new Promise((resolve) => {
        chrome.storage.local.get([ISSUER_STORE_KEY], (result) => {
            let issuerStore = result.issuerStore || {};
            let issuers = Object.keys(issuerStore) || [];
            resolve(issuers);
        });
    });
}

/**
 * Deletes the issuer params from the store
 */
export async function clearIssuerParams() {
    console.log("clearIssuerParams called");
    chrome.storage.local.remove(ISSUER_STORE_KEY);
}