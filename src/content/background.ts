// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type upjf } from 'uprove-node-reference'

export const background = {

  /**
   * Attempts to decode an validate4 a UWA string
   *
   * @param {string} uwaTag
   * @returns uwaData | undefined
   */
  checkUwa: async (uwaTag: string) => {
    return await new Promise<Validation>((resolve, reject) => {
      chrome.runtime.sendMessage({ text: 'checkUWA', string: uwaTag }, (uwaData) => {
        resolve(uwaData)
      })
    })
  },

  /**
   * Sends a url to background.js to be downloaded and converted to an DataURL string
   * This is necessary because we can't always do this in content.js with CORS restriction
   *
   * @param {string} imageUrl
   * @returns {string} dataUrl
   */
  fetchImage: async (imageUrl: string) => {
    return await new Promise<{ dataUrl: string }>((resolve, reject) => {
      chrome.runtime.sendMessage({ text: 'fetchImage', string: imageUrl }, (dataUrl) => {
        resolve(dataUrl)
      })
    })
  },

  /**
   * Downloads the issuer params from the issuerUrl
   *
   * @param {string} issuerUrl
   * @returns {string} jwk
   */
  downloadIssuerParams: async (issuerUrl: string) => {
    return await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ text: 'downloadIssuerParams', string: issuerUrl }, (jwk: upjf.IssuerParamsJWK | undefined) => { (jwk != null) ? resolve(jwk) : reject(new Error('Issuer Params download failed')) }
      )
    })
  }
}
