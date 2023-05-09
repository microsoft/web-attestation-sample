// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { updateTokens } from "./tokenStore.js";
import { parseUWA } from "./uwa.js";
import { downloadIssuerParams } from "./tokens.js";

// Define the checkUPWA function
async function checkUWA(string, scope) {
    console.log("checkUWA called", string);
    const uwaData = await parseUWA(string);
    return uwaData;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.text == "checkUWA") {
        checkUWA(msg.string, sender.origin).then(sendResponse);
    }

    if (msg?.text == "downloadIssuerParams") {
        downloadIssuerParams(msg.string).then(sendResponse);
    }

    if (msg?.text === "fetchImage") {
        fetch(msg.imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                    sendResponse({ imageData: reader.result });
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
                sendResponse({ imageData: null });
            });
    }

    return true;
});

// call updateTokens at startup and then every 15 minutes
chrome.runtime.onStartup.addListener(function() {
    updateTokens();
});
setInterval(() => {
    updateTokens();
}, 15 * 60  * 1000);
