// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome */

import { updateTokens } from './tokenStore.js'
import { parseUWA } from './uwa.js'
import { downloadIssuerParams } from './tokens.js'

// Define the checkUPWA function
async function checkUWA (string, scope) {
    console.log('checkUWA called', string)
    const uwaData = await parseUWA(string)
    return uwaData
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.text === 'checkUWA') {
        checkUWA(msg.string, sender.origin).then(sendResponse)
    }

    if (msg?.text === 'downloadIssuerParams') {
        downloadIssuerParams(msg.string).then(sendResponse)
    }

    if (msg?.text === 'fetchImage') {
        fetchImage(msg.imageUrl)
            .then(dataUrl => {
                sendResponse({ imageData: dataUrl })
            })
            .catch(() => {
                sendResponse({ imageData: null })
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
        fetchImage(info.srcUrl)
            .then(dataUrl => {
                chrome.tabs.sendMessage(tab.id, { action: 'verifyContextImage', dataUrl })
            })
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
