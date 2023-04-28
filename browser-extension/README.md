# User-centric Web Attestation Browser Extension

This project contains a Edge/Chrome Browser Extension demonstrating the concept of privacy-preserving [User-centric Web Attestations](../doc/uwa-spec.md).

**NOTE**: This is sample code that shouldn't be used in production. The goal is to demonstrate the use of the U-Prove technology to create web attestations. More work would be needed to create a secure and usable browser extension.

The [sample issuer](../sample-issuer/README.md) project can be used to create a sample issuer of web attestations.

Using this browser extension, a user can
1. Obtain U-Prove tokens from an attestation issuer. Tokens are stored in the browser extension, and are renewed automatically when they expire or when then run low.
2. Attach a web attestation to a web site by using a token's private key to sign a timestamp and the web site's address (scope).

## Setup

Follow the [sideloading instructions](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) to lead the browser extension into Edge.

## Usage

This section describes the functionality of the browser extension available in its popup menu.

### Token Issuance

When visiting a web site that supports token issuance (containing a [uwa meta tag](../doc/uwa-spec.md#issuance)), a user can obtain tokens by clicking the `Get Tokens` button from the extension's Tokens tab. This will trigger the issuance of U-Prove tokens (user authentication to the issuance website is out-of-scope of this sample) which will be stored in the extensions local storage.

The extension periodically updates the token store to renew expired tokens (which are valid for a day when using the [sample issuer](../sample-issuer/README.md)) or if the token count is too low.

An issuer is automatically added to list of trusted issuers when a user obtains tokens from it.

### Web Attestation Creation

A user can create a web attestation selecting a token issuer in the extension's Tokens tab, and clicking `Present attestation` button. The resulting string starting with `uwa://` can be added  to the web site's HTML visible content.

### Web Attestation Validation

When the user visits a web site containing web attestations, the extension parses and validates them, replacing the `uwa://` string with one of three validation badges:
* Valid badge <img src="./icons/checkmark.svg" alt="valid badge" title="valid badge" width="25" />: the attestation is valid and attached to the correct website (scope).
* Invalid badge <img src="./icons/invalid.svg" alt="invalid badge" title="invalid badge" width="25" />: the attestation is invalid (cryptographically, or attached to the wrong page).
* Unknown badge <img src="./icons/warning.svg" alt="unknown badge" title="unknown badge" width="25" />: the attestation cannot be validated, since the issuer is unknown. The user can opt to trust the issuer, in which case the validation is performed again.

Clicking on the badge icon displays the attestation's details, including its issuer, the date at which it was created, the scope it was attached to, and a label created by the issuer.

## Extensions

This project is a sample proof-of-concept, with many possible extensions:
* Project updates
  * Move to TypeScript
* Improved security
  * Protect private keys to avoid transferability
  * Token Information to contain a typed attribute, to avoid free-form field from the issuer

