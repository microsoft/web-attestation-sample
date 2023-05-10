// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome, getTokens */

import uproveModule from './lib/uprove.mjs'

const { upjf } = uproveModule

// The token store contains U-Prove tokens issued by various issuers. It is a map
// from issuerUrl to issuerData. The issuerData contains a refreshID (used to obtain
// new tokens from the issuer) string and an array of tokens. Each token is an object
// with the following properties:
// - exp: the expiration time of the token
// - kid: the identifier of the issuer parameters
// - t: the token itself

// The token store is stored in the local storage of the extension.
const TOKEN_STORE_KEY = 'tokenStore'

/**
 * Updates the store by obtaining new tokens if they are few left or expired.
 */
export async function updateTokens () {
    console.log('updateToken called', new Date().toString())

    chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
        const tokenStore = result.tokenStore || {}
        const issuers = Object.keys(tokenStore) || []
        issuers.forEach(async (issuerUrl) => {
            console.log('updateToken for issuerUrl', issuerUrl)
            const issuerData = tokenStore[issuerUrl]
            let tokens = issuerData.tokens || []
            // remove expired tokens
            tokens = tokens.filter(t => {
                const expired = upjf.isExpired(upjf.ExpirationType.days, t.exp)
                if (expired) { console.log('updateToken: token expired', t.token, t.exp) };
                return !expired
            })
            // if there are few tokens left, get more
            if (tokens.length < 3) {
                console.log('updateToken: getting more tokens', issuerUrl)
                const freshTokens = await getTokens(issuerUrl, issuerData.refreshID)
                freshTokens.forEach(t => {
                    tokens.push({ exp: t.exp, kid: t.kid, t: t.t })
                    issuerData.refreshID = t.refreshID
                })
            }
            issuerData.tokens = tokens
            tokenStore[issuerUrl] = issuerData
        })
        console.log('updateToken: tokenStore', tokenStore)
        chrome.storage.local.set({ tokenStore })
    })
}

/**
 * Deletes the token store
 */
export async function clearTokens () {
    console.log('clearTokens called')
    chrome.storage.local.remove(TOKEN_STORE_KEY)
}

/**
 * Store tokens in the store
 * @param {string} issuerUrl the url of the issuer
 * @param {string} refreshID the refresh ID received from the issuer
 * @param {number} exp the expiration time of the tokens
 * @param {string} kid the identifier of the issuer parameters
 * @param {*} newTokens batch of tokens obtained from the issuer
 */
export async function storeTokens (issuerUrl, refreshID, exp, kid, newTokens) {
    console.log('storeTokens called', issuerUrl, refreshID, exp, kid, newTokens)
    chrome.storage.local.get([TOKEN_STORE_KEY]).then((result) => {
        const tokenStore = result.tokenStore || {}
        const issuerData = tokenStore[issuerUrl] || { refreshID: null, tokens: [] }
        issuerData.refreshID = refreshID
        issuerData.tokens.push(...newTokens.map(t => { return { exp, kid, t } }))
        tokenStore[issuerUrl] = issuerData
        console.log('storeTokens: tokenStore', tokenStore)
        chrome.storage.local.set({ tokenStore })
    })
}

/**
 * Returns the list of issuers for which tokens are stored
 * @returns the list of issuers
 */
export async function listTokenIssuers () {
    console.log('listTokenIssuers called')
    return new Promise((resolve) => {
        chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
            const tokenStore = result.tokenStore || {}
            const issuers = Object.keys(tokenStore) || []
            resolve(issuers)
        })
    })
}

/**
 * Returns and deletes a token from the store
 * @param {string} issuerUrl the url of the issuer
 * @returns an object with the following properties:
 * - kid: the identifier of the corresponding issuer parameters
 * - keyAndToken: the key and token pair
 */
export async function popToken (issuerUrl) {
    console.log('popToken called', issuerUrl)
    return new Promise((resolve) => {
        chrome.storage.local.get([TOKEN_STORE_KEY], (result) => {
            const tokenStore = result.tokenStore || {}
            const issuerData = tokenStore[issuerUrl] || { refreshID: null, tokens: [] }
            if (issuerData.tokens.length > 0) {
                const tokenData = issuerData.tokens.pop()
                const result = {
                    kid: tokenData.kid,
                    keyAndToken: tokenData.t
                }
                chrome.storage.local.set({ tokenStore })
                console.log('popToken: tokenStore', tokenStore)
                resolve(result)
            } else {
                resolve(null)
            }
        })
    })
}
