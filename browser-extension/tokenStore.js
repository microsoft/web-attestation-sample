// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import uproveModule from "./uprove.mjs";

const { upjf } = uproveModule;


const TOKEN_STORE_KEY = "tokenStore";

/**
 * Updates the store by obtaining new tokens if they are few left or expired.
 */
export async function updateTokens() {
  console.log("updateToken called", new Date().toString());
  let now = Date.now();
  chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
    let tokenStore = result.tokenStore || {};
    let issuers = Object.keys(tokenStore) || [];
    issuers.forEach(async (issuerUrl) => {
      console.log("updateToken for issuerUrl", issuerUrl);
      let issuerData = tokenStore[issuerUrl];
      let tokens = issuerData.tokens || [];
      // remove expired tokens
      tokens = tokens.filter(t => {
        const expired = upjf.isExpired(upjf.ExpirationType.days, t.exp);
        if (expired) {console.log("updateToken: token expired", t.token, t.exp)};
        return !expired;
      });
      // if there are few tokens left, get more
      if (tokens.length < 3) {
        console.log("updateToken: getting more tokens", issuerUrl);
        let freshTokens = await getTokens(issuerUrl, issuerData.refreshID);
        freshTokens.forEach(t => { 
          tokens.push({ exp: t.exp, t: t.t });
          issuerData.refreshID = t.refreshID;
        });
      }
      issuerData.tokens = tokens;
      tokenStore[issuerUrl] = issuerData;
    });
    console.log("updateToken: tokenStore", tokenStore);
    chrome.storage.local.set({ tokenStore: tokenStore });
  });
}

/**
 * Deletes the token store
 */
export async function clearTokens() {
  console.log("clearTokens called");
  chrome.storage.local.remove(TOKEN_STORE_KEY);
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
  chrome.storage.local.get([TOKEN_STORE_KEY]).then((result) => {
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
 * @returns the list of issuers
 */
export async function listTokenIssuers() {
  console.log("listTokenIssuers called");
  return new Promise((resolve) => {
    chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
      let tokenStore = result.tokenStore || {};
      let issuers = Object.keys(tokenStore) || [];
      resolve(issuers);
    });
  });
}

/**
 * Returns and deletes a token from the store
 * @param {string} issuerUrl the url of the issuer
 * @returns a JSON encoded token
 */

export async function popToken(issuerUrl) {
  console.log("popToken called", issuerUrl);
  return new Promise((resolve) => {
    chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
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