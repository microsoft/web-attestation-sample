Pre-release TODO list:
* QR code (ljoy)
  * Add UWA logo to the QR code
  * Make "verify all QR codes" as an on/off option in the debug tab
  * Add context menu verification (see qr-verify branch for an example)
* Compare the badge scope with the current URL (see FIXME in content.js) (ljoy)
* Implement: add Issuer button in Debug tab
* Create a more compact encoding for UWA (v2)
* Encrypt keys and tokens in the extension (v2)
* Add a Badges popup tab to show a list of validated UWA on the current page (v2)
* Make the badge popup about link clickable (v2)
* CI (codeql), https://code.visualstudio.com/api/working-with-extensions/testing-extension (v2)
* Replace extension ui elements in a tab with IFrames using an origin different from the tab; this way the tab scripting cannot manipulate the DOM of extension provided elements. (v2)
* TODO: FIXME: delete this file :)

Issues:
* Fix error in popup when you visit a "stale" page. Tokens tab UI all messed up (catch errors and don't mess up UI)
* Tokens table not updating after issuance
* Badge disappears when you "Trust" an unresponsive issuer (if an error occurs)
* QR badges not clickable on some systems

Test cases:
* test multiple issuers
* token refresh (use all tokens, should trigger re-issuance)
* test one issuers with multiple keys
* test valid but expired badges
* invalid: wrong scope