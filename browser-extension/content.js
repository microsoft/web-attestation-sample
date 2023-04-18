// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const CHECKMARK_URL = chrome.runtime.getURL("icons/checkmark.png");
const INVALID_URL = chrome.runtime.getURL("icons/invalid.png");
const WARNING_URL = chrome.runtime.getURL("icons/warning.png");

console.log("content.js loaded");
console.log("Current URL:", window.location.href);

currentUrl = window.location.href.split('/').slice(-2).join('/').replace(".html", "");
console.log("currentUrl", currentUrl);

// That code works on my sample html 
let strings = document.body.innerHTML.match(/uwa:\/\/\S+/g);
if (strings) {
    strings.forEach(string => {
        console.log(string);
        chrome.runtime.sendMessage({text: "checkUWA", string: string}, uwaData => {
            if (uwaData) {
                let BADGE_URL = CHECKMARK_URL;
                let BADGE_TITLE = "Verified badge";

                // check if web attestation is valid
                if (uwaData.error) {
                    BADGE_URL = INVALID_URL;
                    BADGE_TITLE = "Invalid badge: " + uwaData.error;
                } else {
                    if (uwaData.issuer !== "https://example.com/") {
                        // check if issuer is trusted
                        if (uwaData.issuer === "The Good Place") {
                            BADGE_URL = WARNING_URL;
                            BADGE_TITLE = "Untrusted badge issuer: (details)";
                        }

                        // check if scope is ok
                        const scope = uwaData.scope.split('/').slice(-2).join('/').replace(".html", "");
                        console.log("scope", scope);
                        if (currentUrl !== scope) {
                            BADGE_URL = INVALID_URL;
                            BADGE_TITLE = "Invalid badge: wrong scope";
                        }
                    }
                }

                let checkmarkImage = `<img src="${BADGE_URL}" alt="checkmark" title="
                ${BADGE_TITLE} &#013;
                Issued by: ${uwaData.issuer} &#013;
                Scope: ${uwaData.scope} &#013;
                Attached on: ${uwaData.date} &#013;
                Info: ${uwaData.info} &#013;
                "/>`;

                console.log("checkmarkImage", checkmarkImage);
                document.body.innerHTML = document.body.innerHTML.replace(string, checkmarkImage);
            } else {
                // invalid web attestation, we won't render it
            }
        });
    });
}
