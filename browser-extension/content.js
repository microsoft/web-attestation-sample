// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome, runtime, ExtensionControl, uwaQrEncoder */

const PATTERN = /uwa:\/\/\S+/g
const ISSUERURL = 'uwaIssuerUrl'

// Check for uwa meta tag
const uwaMeta = document.querySelector('meta[name="uwa"]')
if (uwaMeta) {
    sessionStorage.setItem(ISSUERURL, uwaMeta.content)
}

// Walks a node tree matching nodes containing specific text
// Returns array of nodes that match.
function findElementsWithText (element, pattern) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                return pattern.test(node.textContent)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP
            }
        },
        false
    )

    const nodes = []
    while (walker.nextNode()) {
        nodes.push(walker.currentNode)
    }

    return nodes
}

// Wait for new nodes to be added to the DOM. Scans new nodes that match the
// regular-expression. Returns an array of node that match.
function observe (pattern, callback) {
    const config = { attributes: false, childList: true, subtree: true }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList, observer) => {
        let matchingNodes = []

        for (const mutation of mutationsList) {
            // For each new node
            // Walk its children and return all nodes with the matching text
            mutation.addedNodes.forEach(node => {
                matchingNodes = matchingNodes.concat(findElementsWithText(node, pattern))
            })
        }

        callback(matchingNodes)
    })

    // Start observing the target node for configured mutations
    observer.observe(document.body, config)

    // disconnect when we navigate away or close
    window.addEventListener('beforeunload', function (event) {
        observer.disconnect()
    })
}

// Start the observer, and process all nodes with text matching the pattern
observe(PATTERN, (nodes) => {
    nodes.forEach(replaceWithIcon)
})

function replaceWithIcon (node) {
    const match = PATTERN.exec(node.textContent)

    // the actual tag from the page
    const uwaTag = match[0]

    // the original text node gets the first half of the split and a new text node with the second half is created
    // and auto-inserted after the first
    const nodeSplit = node.splitText(match.index)

    // remove the matched pattern in the new node
    nodeSplit.textContent = nodeSplit.textContent.replace(PATTERN, '')

    chrome.runtime.sendMessage({ text: 'checkUWA', string: uwaTag }, (uwaData) => {
        validationResponse(uwaData, node, uwaTag)
    })
}

// do an initial scan of the document body for pages that are not dynamic
findElementsWithText(document.body, PATTERN).forEach(replaceWithIcon)

let shields = []

function validationResponse (uwaData, node, tag) {
    let ec
    if (uwaData) {
        // check if web attestation is valid
        if (uwaData.status === 'error') {
            ec = ExtensionControl.invalid(uwaData.error)
            ec.tag = tag
            shields.push(ec)
            node.after(ec.icon)
        } else if (uwaData.status === 'unknown_issuer') {
            ec = ExtensionControl.untrusted(
                uwaData.issuer,

                // Trust button was pressed
                (untrustedControl) => {
                    untrustedControl.hide()
                    untrustedControl.icon.remove()

                    shields = shields.filter(c => c !== untrustedControl)

                    // download issuer parameters into the issuerStore
                    downloadIssuerParams(uwaData.issuer)
                        .then(() => {
                            // re-validate tag now that the issuer parameters are stored
                            chrome.runtime.sendMessage({ text: 'checkUWA', string: tag }, (uwaData) => {
                                validationResponse(uwaData, node, tag)
                            })
                        })
                        .catch((/* no tokens */) => {
                            throw new Error('downloadIssuerParams failed')
                        })
                })
            ec.tag = tag
            shields.push(ec)
            node.after(ec.icon)
        } else {
            // check if the scope is correct
            const currentScope = uwaData.scope // TODO: FIXME (ljoy): get the current scope (base url without query params/anchor, see popup.js's getBaseURL) from the page
            if (uwaData.scope !== currentScope) {
                // invalid badge
                ec = ExtensionControl.invalid('invalid scope: ' + uwaData.scope)
                ec.tag = tag
                shields.push(ec)
                node.after(ec.icon)
            } else {
                // valid badge
                const dt = (new Date(uwaData.timestamp)).toLocaleString('en-US', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })

                ec = ExtensionControl.verified(
                    uwaData.issuer, uwaData.scope, dt, uwaData.info, uwaData.about)
                ec.tag = tag
                shields.push(ec)
                // Insert the new icon node after the original node
                node.after(ec.icon)

                const shieldWithSameTag = shields.filter(c => {
                    const f = c !== ec && c.tag === tag && c.state !== 'VERIFIED'
                    return f
                })

                shieldWithSameTag.forEach(c => {
                    shields = shields.filter(d => c !== d)
                    chrome.runtime.sendMessage({ text: 'checkUWA', string: tag }, (uwaData) => {
                        validationResponse(uwaData, c.icon, c.tag)
                        c.icon.remove()
                    })
                })
            }
        }
    } else {
        // invalid web attestation, we won't render it
        console.log('invalid web attestation')
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getIssuerUrl') {
        const value = sessionStorage.getItem(ISSUERURL)
        sendResponse({ value })
    }
    if (request.action === 'verifyAllQrImages') {
        document.querySelectorAll('img').forEach(i => {
            verifyQrImage(i)
        })
        sendResponse({})
    }
    if (request.action === 'verifyContextImage') {
        decodeImage(request.dataUrl, lastContextMenuTarget)
        sendResponse({})
    }
})

function downloadIssuerParams (issuerUrl) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ text: 'downloadIssuerParams', string: issuerUrl }, (jwk) => jwk ? resolve(jwk) : reject(new Error('Issuer Params download failed')))
    })
}

function verifyQrImage (imgNode) {
    // download image to dataUrl in background.js with fetch as we could not read the image data here
    // because of CORS limitations
    chrome.runtime.sendMessage({ text: 'fetchImage', imageUrl: imgNode.src }, (result) => {
        decodeImage(result.imageData, imgNode)
    })
}

function decodeImage (imageData, imgNode) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    console.info(`IMAGE: src:${imgNode.src}`)
    // load the blob into a canvas and retrieve the imageData
    // send imageData to the qrDecoder and get back a uwa string
    const img = new Image()
    img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const result = uwaQrEncoder.decode(imageData.data, imageData.width, imageData.height)

        if (result?.chunks?.[0]?.data === 'uwa://') {
            const uwaTag = `uwa://${toBase64Url(result.chunks[1].bytes)}.${toBase64Url(result.chunks[2].bytes)}.${toBase64Url(result.chunks[3].bytes)}`
            chrome.runtime.sendMessage({ text: 'checkUWA', string: uwaTag }, (uwaData) => {
                validationResponse(uwaData, imgNode, uwaTag)
            })
        }
    }
    img.src = imageData
}

function toBase64Url (byteArray) {
    const binaryString = byteArray.map(b => String.fromCharCode(b)).join('')
    const base64 = btoa(binaryString)
    const base64url = base64.replace('+', '-').replace('/', '_').replace(/=+$/, '')
    return base64url
}

let lastContextMenuTarget

document.addEventListener('contextmenu', event => {
    lastContextMenuTarget = event.target
})
