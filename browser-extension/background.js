// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseUWA } from "./uwa.js";

// Define the checkUPWA function
function checkUWA(string, scope) {
    console.log("checkUWA called", string);
    const uwaData = parseUWA(string);
    return uwaData;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text && (msg.text == "checkUWA")) {
        sendResponse(checkUWA(msg.string, sender.origin));
    }
    return true;
});
