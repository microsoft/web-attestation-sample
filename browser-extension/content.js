// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome, ExtensionControl, uwaQrEncoder */

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

function validationResponse (uwaData, node, tag) {
    if (uwaData) {
        // check if web attestation is valid
        if (uwaData.status === 'error') {
            node.after(ExtensionControl.invalid(uwaData.error).icon)
        } else if (uwaData.status === 'invalid_scope') {
            node.after(ExtensionControl.invalid(uwaData.error).icon)
            console.error(`Invalid uwa scope : ${uwaData.scope}`)
        } else if (uwaData.status === 'unknown_issuer') {
            node.after(ExtensionControl.untrusted(
                uwaData.issuer,

                // Trust button was pressed
                (untrustedControl) => {
                    untrustedControl.hide()

                    // download issuer parameters into the issuerStore
                    downloadIssuerParams(uwaData.issuer)
                        .then(() => {
                            untrustedControl.icon.remove()
                            // re-validate tag now that the issuer parameters are stored
                            chrome.runtime.sendMessage({ text: 'checkUWA', string: tag }, (uwaData) => {
                                validationResponse(uwaData, node, tag)
                            })
                        })
                        .catch((err) => {
                            console.error(err.toString())
                        })
                }).icon)
        } else if (uwaData.status === 'valid') {
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

            // Insert the new icon node after the original node
            node.after(ExtensionControl.verified(
                uwaData.issuer, uwaData.scope, dt, uwaData.info, uwaData.about).icon)
        } else {
            throw new Error(`unknown validation status: ${uwaData.status}`)
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
})

function downloadIssuerParams (issuerUrl) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ text: 'downloadIssuerParams', string: issuerUrl }, (jwk) => jwk ? resolve(jwk) : reject(new Error('Issuer Params download failed')))
    })
}

function verifyQrImage (imgNode) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // download image to dataUrl in background.js with fetch as we could not read the image data here
    // because of CORS limitations
    chrome.runtime.sendMessage({ text: 'fetchImage', imageUrl: imgNode.src }, (result) => {
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
        img.src = result.imageData
    })
}

function toBase64Url (byteArray) {
    const binaryString = byteArray.map(b => String.fromCharCode(b)).join('')
    const base64 = btoa(binaryString)
    const base64url = base64.replace('+', '-').replace('/', '_').replace(/=+$/, '')
    return base64url
}

chrome.storage.local.get(['autoScanQrCodes'], function (result) {
    if (result.autoScanQrCodes === true) {
        // function onImageLoad () {
        //     console.log('Image loaded: ', this.src)
        // }

        // Add load event listener to existing images
        const images = document.getElementsByTagName('img')
        for (let i = 0; i < images.length; i++) {
            // images[i].addEventListener('load', onImageLoad)
            verifyQrImage(images[i])
        }

        // Create a MutationObserver to watch for added images
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i]

                        // Check if the added node is an image
                        if (node.tagName === 'IMG') {
                            // node.addEventListener('load', onImageLoad)
                            verifyQrImage(node)
                        }

                        // If the added node is a container, check its descendants for images
                        const descendants = node.getElementsByTagName('img')
                        for (let j = 0; j < descendants.length; j++) {
                            // descendants[j].addEventListener('load', onImageLoad)
                            verifyQrImage(descendants[j])
                        }
                    }
                }
            })
        })

        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true })
    }
})
