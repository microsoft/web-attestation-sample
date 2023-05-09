Pre-release TODO list

* Delete uprove.min.mjs, unless we need it
* Fix "Get token" UI, tokens table doesn't refresh, and sometimes errors out (you have to reload the page to fix)
* Encode uwa as QR code; allow extension to verify them (check all images, or add a "verify" in the [context menu](https://developer.chrome.com/docs/extensions/reference/contextMenus/))
* Add a info URL in the issuer params, displayed and clickable in the badge, allowing users to learn more about the token issuance.
* Create a more compact encoding for UWA
* Encrypt keys and tokens in the extension
* CI (codeql), https://code.visualstudio.com/api/working-with-extensions/testing-extension
* linting
* Move dev branch to main
* Generate samples using static issuer params on https://raw.githubusercontent.com/microsoft/web-attestation-sample/main/sample-issuer/sample
* Replace extension ui elements in a tab with IFrames using an origin different from the tab; this way the tab scripting cannot manipulate the DOM of extension provided elements.
* TODO: FIXME: delete this file :)