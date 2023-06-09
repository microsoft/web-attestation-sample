// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome Uwa Scanner ISSUER_URL MIN_QR_DIMENSION */

// Check current HTML page for uwa meta tag and set the issuer url if found in
// session storage
const uwaMeta = document.querySelector('meta[name="uwa"]')
if (uwaMeta) {
    sessionStorage.setItem(ISSUER_URL, uwaMeta.content)
}

// Start scanning the DOM for uwa nodes; Check if IMG auto-scan is enabled
// eslint-disable-next-line no-unused-vars
chrome.storage.local.get(['autoScanQrCodes'], function (result) {
    Scanner.scanImages = (result.autoScanQrCodes === true)
    Scanner.start(uwaNode, Uwa.tryRemove)
})

// Called when potential uwa nodes are found in the dom
async function uwaNode (node) {
    // Ignore small images or nodes that are no longer in the DOM
    if (node.connected === false || Math.min(node.naturalWidth, node.naturalHeight) < MIN_QR_DIMENSION) {
        return
    }

    Uwa.tryDecodeNode(node).then(result => {
        if (result) {
            console.log(result)
        }
    })
}

// Set message handlers for background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getIssuerUrl') {
        sendResponse({ value: sessionStorage.getItem(ISSUER_URL) })
    }
    if (request.action === 'verifyAllQrImages') {
        Scanner.scanImages = true
    }
    if (request.action === 'verifyContextImage') {
        Uwa.tryDecodeNode(lastContextMenuTarget).then(result => {
            if (!result) alert('This image cannot be decoded to a UWA')
        })
    }
})

// Whenever the context menu is used, store the element that was right-clicked
let lastContextMenuTarget
document.addEventListener('contextmenu', event => {
    lastContextMenuTarget = event.target
})
