// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.



/*
  Content-scripts do not support ESM imports.
  However, by adding additional scripts to the content_scripts section in the 
  manifest.json, you can globally include other scripts.
  The ordering of the files in content_scripts determines the order of the loading.

  We list the following 'imports' to show what we're bringing in globally from an
  previously loaded script:
  
  import { ExtensionControl } from './control.js';

*/


const PATTERN = /uwa:\/\/\S+/g;
const ISSUERURL = "uwaIssuerUrl";

// Check for uwa meta tag
const uwaMeta = document.querySelector('meta[name="uwa"]');
if (uwaMeta) {
    sessionStorage.setItem(ISSUERURL, uwaMeta.content);
}

// Walks a node tree matching nodes containing specific text
// Returns array of nodes that match.
function findElementsWithText(element, pattern) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                return pattern.test(node.textContent)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            },
        },
        false
    );

    const nodes = [];
    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    return nodes;
}

// Wait for new nodes to be added to the DOM. Scans new nodes that match the 
// regular-expression. Returns an array of node that match.
function observe(pattern, callback) {

    const config = { attributes: false, childList: true, subtree: true };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList, observer) => {

        let matchingNodes = [];

        for (const mutation of mutationsList) {
            // For each new node
            // Walk its children and return all nodes with the matching text
            mutation.addedNodes.forEach(node => {
                matchingNodes = matchingNodes.concat(findElementsWithText(node, pattern));
            });

        }

        callback(matchingNodes);
    });

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);

    // disconnect when we navigate away or close
    window.addEventListener("beforeunload", function (event) {
        observer.disconnect();
    });
}

// Start the observer, and process all nodes with text matching the pattern
observe(PATTERN, (nodes) => {
    nodes.forEach(replaceWithIcon);
});


function replaceWithIcon(node) {

    const match = PATTERN.exec(node.textContent);

    // the actual tag from the page
    const uwaTag = match[0];

    // the original text node gets the first half of the split and a new text node with the second half is created
    // and auto-inserted after the first
    const nodeSplit = node.splitText(match.index);

    // remove the matched pattern in the new node
    nodeSplit.textContent = nodeSplit.textContent.replace(PATTERN, '');

    chrome.runtime.sendMessage({ text: "checkUWA", string: uwaTag }, (uwaData) => {
        validationResponse(uwaData, node, uwaTag);
    });

}

// do an initial scan of the document body for pages that are not dynamic
findElementsWithText(document.body, PATTERN).forEach(replaceWithIcon);


function validationResponse(uwaData, node, tag) {

    if (uwaData) {

        // check if web attestation is valid
        if (uwaData.status === 'error') {
            node.after(ExtensionControl.invalid(uwaData.error).icon);

        } else if (uwaData.status === 'unknown_issuer') {

            node.after(ExtensionControl.untrusted(
                uwaData.issuer,

                // Trust button was pressed
                (untrustedControl) => {

                    untrustedControl.hide()
                    untrustedControl.icon.remove();

                    // download issuer parameters into the issuerStore
                    downloadIssuerParams(uwaData.issuer)
                        .then(() => {

                            // re-validate tag now that the issuer parameters are stored
                            // TODO: re-validate all tags on the page from this issuer
                            chrome.runtime.sendMessage({ text: "checkUWA", string: tag }, (uwaData) => {
                                validationResponse(uwaData, node, tag);
                            });


                        })
                        .catch((/*no tokens*/) => {

                        });

                }).icon);

        } else {

            // check if the scope is correct
            const currentScope = uwaData.scope; // TODO: FIXME (ljoy): get the current scope (base url without query params/anchor, see popup.js's getBaseURL) from the page
            if (uwaData.scope !== currentScope) {
                // invalid badge
                node.after(ExtensionControl.invalid("invalid scope: " + uwaData.scope).icon);
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
                });
    
                // Insert the new icon node after the original node
                node.after(ExtensionControl.verified(
                    uwaData.issuer, uwaData.scope, dt, uwaData.info, uwaData.about).icon);
            }
        }

    } else {
        // invalid web attestation, we won't render it
        console.log('invalid web attestation');
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getIssuerUrl') {
        const value = sessionStorage.getItem(ISSUERURL);
        sendResponse({ value: value });
    }
});


function downloadIssuerParams(issuerUrl) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ text: "downloadIssuerParams", string: issuerUrl }, (jwk) => jwk ? resolve(jwk) : reject());
    });
}
