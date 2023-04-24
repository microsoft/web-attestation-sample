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
 * Store tokens in the store
 * @param {string} issuerUrl the url of the issuer
 * @param {string} refreshID the refresh ID received from the issuer 
 * @param {number} exp the expiration time of the tokens
 * @param {*} tokens batch of tokens obtained from the issuer
 */
export async function storeTokens(issuerUrl, refreshID, exp, tokens) {
    console.log("storeTokens called", issuerUrl, refreshID, exp, tokens);
    // TODO
}

/**
 * Returns and deletes a token from the store
 * @param {string} issuerUrl the url of the issuer
 */
export async function popToken(issuerUrl) {
    // TODO
    return {
        key: 'J5AIDqV8Fylt5Twz-RUPjSGKWVXUtAXN_WTLAiQ81kE',
        token: {
          UIDP: 'mxANd6pAbiO2DoL2qB1jpaeHRkjpFZXyFXkLmv6U79Y=',
          h: 'BCPcw67OBpAczvVAKDlE+R8HsJADHAl79OGP6uIlzKgD/8OmAo5EVbUycEPkRK+igN+yBmA5I+lO7AuJeMIlb1A=',
          TI: 'eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE5NDcwfQ==',
          PI: '',
          sZp: 'BM6dlt547eS4fQtGdvxNyz/B3htK3x94wI/RK62VN4K6FldLENvyM6/phvOo8FAy7uXzn0eTF0FO6rFWILErRu8=',
          sCp: 'TQ5722laLj+Maj6ZffqnhGO3c1mIZ7U7C+EjOAuSo/Y=',
          sRp: 'dvhgyhXzusJ8BJKu9okQ5lhYVxxkU7c2YOh5c0826p8='
        }
      }
}