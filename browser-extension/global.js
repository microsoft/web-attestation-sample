// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome */

/* eslint-disable no-unused-vars */
const CHECKMARK_URL = chrome.runtime.getURL('icons/checkmark.svg')
const INVALID_URL = chrome.runtime.getURL('icons/invalid.svg')
const WARNING_URL = chrome.runtime.getURL('icons/warning.svg')

const PATTERN = /uwa:\/\/[\w-]+\.[\w-]+\.[\w-]+/
const ISSUER_URL = 'uwaIssuerUrl'
const MIN_QR_DIMENSION = 150

function toBase64Url (byteArray) {
    const binaryString = byteArray.map(b => String.fromCharCode(b)).join('')
    const base64 = btoa(binaryString)
    const base64url = base64.replace('+', '-').replace('/', '_').replace(/=+$/, '')
    return base64url
}
