Pre-release TODO list

* Move dev branch to main
* Fix "Get token" UI, tokens table doesn't refresh, and sometimes errors out (you have to reload the page to fix)
* QR code
  * Encode uwa as QR code; add generated QR in the Token popup tab, with ability to download/copy (ljoy)
  * Add UWA logo to the QR code (ljoy)
  * Make "verify all QR codes" an option in the debug tab (ljoy)
  * Add context menu verification (see qr-verify branch for an example) 
* Fix Issuer popup tab (now showing the kid values): need issuer url in the issuer store (cpaquin)
* Create a more compact encoding for UWA (v2)
* Encrypt keys and tokens in the extension (v2)
* Add a Badges popup tab to show a list of validated UWA on the current page (v2)
* Make the badge popup about link clickable (v2)
* CI (codeql), https://code.visualstudio.com/api/working-with-extensions/testing-extension (v2)
* Generate samples using static issuer params on https://raw.githubusercontent.com/microsoft/web-attestation-sample/main/sample-issuer/sample
* Replace extension ui elements in a tab with IFrames using an origin different from the tab; this way the tab scripting cannot manipulate the DOM of extension provided elements.
* TODO: FIXME: delete this file :)