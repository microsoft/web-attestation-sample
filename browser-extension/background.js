// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseUWA } from "./uwa.js";
import { getTokens } from "./tokens.js";

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

    if (msg?.text == "getTokens") {
        getTokens(msg.string).then(sendResponse);
    }

    return true;
});
