// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Updates the store by obtaining new tokens if they are few left or expired.
 */
export async function updateTokens() {
  console.log("updateToken called", new Date().toString());
  // TODO
}

/**
 * Deletes the token store
 */
export async function clearTokens() {
  console.log("clearTokens called");
  chrome.storage.local.remove("tokenStore");
}

/**
 * Store tokens in the store
 * @param {string} issuerUrl the url of the issuer
 * @param {string} refreshID the refresh ID received from the issuer 
 * @param {number} exp the expiration time of the tokens
 * @param {*} newTokens batch of tokens obtained from the issuer
 */
export async function storeTokens(issuerUrl, refreshID, exp, newTokens) {
  console.log("storeTokens called", issuerUrl, refreshID, exp, newTokens);
  chrome.storage.local.get(["tokenStore"]).then((result) => {
    let tokenStore = result.tokenStore || {};
    let issuerData = tokenStore[issuerUrl] || {refreshID: null, tokens: []};
    issuerData.refreshID = refreshID;
    issuerData.tokens.push(...newTokens.map(t => { return { exp: exp, t: t } }));
    tokenStore[issuerUrl] = issuerData;
    console.log("storeTokens: tokenStore", tokenStore);
    chrome.storage.local.set({ tokenStore: tokenStore });
  });
}

/**
 * Returns the list of issuers for which tokens are stored
 */
export async function listTokenIssuers() {
  console.log("listTokenIssuers called");
  return new Promise((resolve) => {
    chrome.storage.local.get(["tokenStore"], (result) => {
      let tokenStore = result.tokenStore || {};
      let issuers = Object.keys(tokenStore) || [];
      resolve(issuers);
    });
  });
}


/**
 * Returns and deletes a token from the store
 * @param {string} issuerUrl the url of the issuer
 */

export async function popToken(issuerUrl) {
  console.log("popToken called", issuerUrl);
  return new Promise((resolve) => {
    chrome.storage.local.get(["tokenStore"], (result) => {
      let tokenStore = result.tokenStore || {};
      let issuerData = tokenStore[issuerUrl] || { refreshID: null, tokens: [] };
      if (issuerData.tokens.length > 0) {
        let token = issuerData.tokens.pop().t;
        chrome.storage.local.set({ tokenStore: tokenStore });
        console.log("popToken: tokenStore", tokenStore);
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
}