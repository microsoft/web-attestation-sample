// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTokens } from './tokens.js'
import { upjf, type serialization } from 'uprove-node-reference'

// The token store contains U-Prove tokens issued by various issuers. It is a map
// from issuerUrl to issuerData. The issuerData contains a refreshID string (used
// to obtain new tokens from the issuer) and an array of tokens. Each token is an object
// with the following properties:
// - exp: the expiration time of the token
// - kid: the identifier of the issuer parameters
// - t: the token itself

interface Token {
  exp: number
  kid: string
  t: KeyAndToken
}

type TokenStore = Record<string, IssuerData>

interface IssuerData {
  refreshID: string | null
  tokens: Token[]
}

interface KeyAndToken {
  key: string
  token: serialization.UProveTokenJSON
}

// The token store is stored in the local storage of the extension.
const TOKEN_STORE_KEY = 'tokenStore'

/**
 * Updates the store by obtaining new tokens if they are few left or expired.
 * @param {string} url the url of the issuer to get new tokens from. If null, all issuers are updated.
 */
export async function updateTokens (url: string | null = null): Promise<void> {
  console.log('updateToken called', new Date().toString())

  const tokenStore = await openTokenStore()
  const issuers = await listTokenIssuers()

  const promises = issuers
    .filter((i) => url === null || i === url)
    .map(async (issuerUrl) => {
      console.log('updateToken for issuerUrl', issuerUrl)
      const issuerData = tokenStore[issuerUrl]
      let tokens = issuerData.tokens ?? []
      tokens = tokens.filter((t: { exp: number, t: KeyAndToken }) => {
        const expired: boolean = upjf.isExpired(upjf.ExpirationType.day, t.exp)
        if (expired) {
          console.log('updateToken: token expired', t.t, t.exp)
        }
        return !expired
      })

      if (tokens.length < 3) {
        console.log('updateToken: getting more tokens', issuerUrl)
        const freshTokens = await getTokens(issuerUrl, issuerData.refreshID as string)
        if (freshTokens != null) {
          freshTokens.tokens.forEach((token) => {
            tokens.push({ exp: freshTokens.expiration, kid: freshTokens.kid, t: token })
            issuerData.refreshID = freshTokens.refreshID
          })
        }
      }
      issuerData.tokens = tokens
      tokenStore[issuerUrl] = issuerData
    })

  await Promise.all(promises)
  console.log('updateToken: tokenStore', tokenStore)
  await closeTokenStore()
}

/**
 * Deletes the token store
 */
export async function clearTokens (): Promise<void> {
  console.log('clearTokens called')
  await chrome.storage.local.remove(TOKEN_STORE_KEY)
}

/**
 * Store tokens in the store
 * @param {string} issuerUrl the url of the issuer
 * @param {string} refreshID the refresh ID received from the issuer
 * @param {number} exp the expiration time of the tokens
 * @param {string} kid the identifier of the issuer parameters
 * @param {UProveToken[]} newTokens batch of tokens obtained from the issuer
 */
export async function storeTokens (
  issuerUrl: string,
  refreshID: string,
  exp: number,
  kid: string,
  newTokens: KeyAndToken[]
): Promise<void> {
  console.log('storeTokens called', issuerUrl, refreshID, exp, kid, newTokens)

  const tokenStore = await openTokenStore()

  const issuerData = await getIssuer(issuerUrl)
  issuerData.refreshID = refreshID
  issuerData.tokens.push(...newTokens.map((t) => ({ exp, kid, t })))
  tokenStore[issuerUrl] = issuerData
  console.log('storeTokens: tokenStore', _TokenStore)
  await closeTokenStore()
}

/**
* Returns the list of issuers for which tokens are stored
* @returns the list of issuers
*/
export async function listTokenIssuers (): Promise<string[]> {
  console.log('listTokenIssuers called')
  if (_TokenStore === null) throw new Error('Token store not open')
  return Object.keys(_TokenStore) ?? []
}

/**
 * Returns and deletes a token from the store
 * @param {string} issuerUrl the url of the issuer
 * @returns an object with the following properties:
 * - kid: the identifier of the corresponding issuer parameters
 * - keyAndToken: the key and token pair
 */
export async function popToken (issuerUrl: string): Promise<{ kid: string, keyAndToken: KeyAndToken } | null> {
  console.log('popToken called', issuerUrl)

  await openTokenStore()
  const issuerData = await getIssuer(issuerUrl)

  if (issuerData.tokens.length === 0) {
    alert(`No tokens left for ${issuerUrl}`)
    return null
  }

  const tokenData = issuerData.tokens.pop() as Token
  const result = {
    kid: tokenData.kid,
    keyAndToken: tokenData.t
  }

  await closeTokenStore()
  console.log('popToken: tokenStore')

  if (issuerData.tokens.length < 3) {
    // get more tokens for future use, so we don't run out
    console.log('popToken: getting more tokens', issuerUrl)
    await updateTokens(issuerUrl)
  }

  return result
}

let _TokenStore: TokenStore | null = null

export async function openTokenStore (): Promise<TokenStore> {
  const store = await chrome.storage.local.get(TOKEN_STORE_KEY)
  _TokenStore = (store[TOKEN_STORE_KEY] ?? {}) as TokenStore
  return _TokenStore
}

async function closeTokenStore (): Promise<void> {
  await chrome.storage.local.set({ [TOKEN_STORE_KEY]: _TokenStore })
  _TokenStore = null
}

async function getIssuer (issuerUrl: string): Promise<IssuerData> {
  if (_TokenStore === null) throw new Error('Token store not open')
  return _TokenStore[issuerUrl] ?? { refreshID: null, tokens: [] }
}
