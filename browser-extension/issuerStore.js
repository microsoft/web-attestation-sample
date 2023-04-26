// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const ISSUER_STORE_KEY = "issuerStore";

/**
 * Returns the issuer params from the store
 * @param {string} issuerUrl the url of the issuer
 * @returns the JSON encoded issuer params
 */
export async function getIssuerParams(issuerUrl) {
    console.log("getIssuerParams called", issuerUrl);
    return new Promise((resolve) => {
        chrome.storage.local.get([ISSUER_STORE_KEY], (result) => {
            let issuerStore = result.issuerStore || {};
            let issuerParams = issuerStore[issuerUrl] || null;
            console.log("getIssuerParams: issuerParams", issuerParams);
            resolve(issuerParams);
        });
    });
}

/**
 * Store the issuer params in the store
 * @param {string} issuerUrl url of the issuer
 * @param {*} issuerParams the JSON encoded issuer params
 */
export function setIssuerParams(issuerUrl, issuerParams) {
    console.log("setIssuerParams called", issuerUrl, issuerParams);
    chrome.storage.local.get([ISSUER_STORE_KEY]).then((result) => {
        let issuerStore = result.issuerStore || {};
        issuerStore[issuerUrl] = issuerParams;
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