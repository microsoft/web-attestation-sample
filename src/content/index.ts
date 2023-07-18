// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ISSUER_URL, MIN_QR_DIMENSION } from './global.js'
import { scanner } from './scanner.js'
import { Uwa } from './uwa.js'

// Check current HTML page for uwa meta tag and set the issuer url if found in
// session storage
const uwaMeta = document.querySelector('meta[name="uwa"]') as HTMLMetaElement
if (uwaMeta != null) {
  sessionStorage.setItem(ISSUER_URL, uwaMeta.content)
}

// Start scanning the DOM for uwa nodes; Check if IMG auto-scan is enabled
// eslint-disable-next-line no-unused-vars
chrome.storage.local.get(['autoScanQrCodes'], function (result) {
  scanner.scanImages = (result.autoScanQrCodes === true)
  scanner.start(uwaNode, Uwa.tryRemove)
})

// Called when potential uwa nodes are found in the dom
function uwaNode (node: Node): void {
  // Ignore small images or nodes that are no longer in the DOM
  if (!node.isConnected || Math.min((node as HTMLImageElement).naturalWidth, (node as HTMLImageElement).naturalHeight) < MIN_QR_DIMENSION) {
    return
  }

  void Uwa.tryDecodeNode(node).then(result => {
    if (result != null) {
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
    scanner.scanImages = true
  }
  if (request.action === 'verifyContextImage') {
    void Uwa.tryDecodeNode(lastContextMenuTarget).then(result => {
      if (result == null) alert('This image cannot be decoded to a UWA')
    })
  }
})

// Whenever the context menu is used, store the element that was right-clicked
let lastContextMenuTarget: Node
document.addEventListener('contextmenu', event => {
  lastContextMenuTarget = event.target as Node
})
