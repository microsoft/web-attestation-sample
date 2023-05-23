Pre-release TODO list
* Refresh tokens when running low; UI error when there are no more 
* Improve Badge positioning in HTML
* TODO: FIXME: delete this file :)

Future features
* Add a Badges popup tab to show a list of validated UWA on the current page (v2)
* CI (codeql), https://code.visualstudio.com/api/working-with-extensions/testing-extension (v2)
* Create a test page that can verify a UWA QR from the camera (similar to https://cozmo.github.io/jsQR/) (v2)
* Add issuer friendly name

Issues:
* Badge disappears when you "Trust" an unresponsive issuer (if an error occurs)
* QR badges not clickable on some systems

Test cases:
* test multiple issuers
* token refresh (use all tokens, should trigger re-issuance)
* test one issuers with multiple keys
* test valid but expired badges
* invalid: wrong scope