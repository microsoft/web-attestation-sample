// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome */

import { updateTokens } from './tokenStore.js'
import { parseUWA } from './uwa.js'
import { downloadIssuerParams, getBaseURL } from './tokens.js'

// Define the checkUPWA function
async function checkUWA (string, scope) {
    console.log('checkUWA called', string)
    const uwaData = await parseUWA(string)
    if (uwaData.status === 'valid' && uwaData.scope !== scope) {
        uwaData.status = 'invalid_scope'
        uwaData.error = `Wrong URL: ${uwaData.scope}`
    }
    return uwaData
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.text === 'checkUWA') {
        const url = getBaseURL(sender.url)
        checkUWA(msg.string, url).then(sendResponse)
    }

    if (msg?.text === 'downloadIssuerParams') {
        downloadIssuerParams(msg.string).then(result => {
            sendResponse(result)
        })
    }

    if (msg?.text === 'fetchImage') {
        fetchImage(msg.string)
            .then(dataUrl => {
                sendResponse({ dataUrl })
            })
            .catch(() => {
                sendResponse({ dataUrl: null })
            })
    }

    return true
})

// call updateTokens at startup and then every 15 minutes
chrome.runtime.onStartup.addListener(function () {
    updateTokens()
})

setInterval(() => {
    updateTokens()
}, 15 * 60 * 1000)

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'verifyQR',
        title: 'Verify QR',
        contexts: ['image']
    })
})

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'verifyQR') {
        console.log('verifyQR clicked', info, tab.id)
        chrome.tabs.sendMessage(tab.id, { action: 'verifyContextImage' })
    }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.mediaType === 'image') {
        console.log('User clicked on an image with src:', info.srcUrl)
    }
})

function fetchImage (url) {
    return fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = (err) => {
                    reject(err)
                }
                reader.readAsDataURL(blob)
            })
        })
        .catch((error) => {
            console.error('Error fetching image:', error)
        })
}
