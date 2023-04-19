// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { parseUWA } from "./uwa.js";

// Define the checkUPWA function
function checkUWA(string) {
    console.log("checkUWA called", string);
    if (string === "uwa://test") {
        console.log("returning test json");
        return {
            issuer:"https://example.com/",
            scope:"https://example.com/",
            date:"2021-03-14",
            info: "some info"
        };
    }
    const uwaData = parseUWA(string);
    return uwaData;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text && (msg.text == "checkUWA")) {
        sendResponse(checkUWA(msg.string));
    }
});
