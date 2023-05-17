Pre-release TODO list
* Fix "Get token" UI, tokens table doesn't refresh, and sometimes errors out (you have to reload the page to fix)
* TODO: FIXME: delete this file :)

Future features
* Create a more compact encoding for UWA (CBOR?) (v2)
* Specify UWA links to retrieve external UWA (v2)
* Encrypt keys and tokens in the extension (v2)
* Add a Badges popup tab to show a list of validated UWA on the current page (v2)
* CI (codeql), https://code.visualstudio.com/api/working-with-extensions/testing-extension (v2)
* Replace extension ui elements in a tab with IFrames using an origin different from the tab; this way the tab scripting cannot manipulate the DOM of extension provided elements. (v2)
* Create a test page that can verify a UWA QR from the camera (similar to https://cozmo.github.io/jsQR/) (v2)

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