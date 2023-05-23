*** ***PRE-RELEASE VERSION: WORK IN PROGRESS*** ***

# User-centric Web Attestations

This project is a proof-of-concept prototype for User-Centric Web Attestations (UWA); as such, it shouldn't be used as-is in a production environment. These attestations are statements (encoded as [U-Prove tokens](https://microsoft.com/uprove)) certified by an Issuer that can be attached to a web site by their User and verified by anyone. The UWA are only valid on the page (scope) to which they are attached. UWA protects the privacy of users; they contain no traceable information other than the application-specific data a user might want to disclose. Users are in control of which attestations to present where.

Details can be found in the [UWA specification](./doc/uwa-spec.md).

The repository contains two projects, which need to be setup separately:
* an Express [sample server](./sample-issuer/README.md)
* a Edge/Chrome [web browser extension](./browser-extension/README.md)

## System overview

The system consists of three participants:
* an Issuer that issues U-Prove tokens to Users
* a User that obtains U-Prove tokens from Issuers, and creates web attestations
* a Verifier that verifies web attestations

The [sample server](./sample-issuer/README.md) implements the Issuer role, while the [web browser extension](./browser-extension/README.md) implements both the User and Verifier roles.

The UWA lifecycle is as follows:
1. The Issuer sets up its Issuer parameters and publishes them in a publicly accessible location. These specify the contents of the U-Prove tokens, which can contain an application-specific label. Users and Verifiers must obtain the Issuer parameters before creating or verifying web attestations.
2. The User obtains U-Prove tokens from an Issuer. Authentication to the Issuer is application-specific. U-Prove tokens are stored in the web browser extension; new tokens will be automatically obtained if they expired or if they are running out.
3. When visiting a web site, the User can create a web attestation using the web browser extension (encoded either as a string or a QR code), and attach it to the site.
4. Other users visiting the same web site can validate attached web attestations from trusted Issuers using the web browser extension. Unknown Issuers can be added to the trusted list by the User. Invalid attestations (for example: forged, or copied to a different site) are marked as such; malformed ones are simply ignored.

![UWA architecture](./doc/UWA_arch.svg)

## Frequently Asked Questions

### How can I trust the Issuer of an attestation?

Just like in identity federations (e.g., in OAuth/OpenID) or in PKI where verifiers must trust the keys of token/certificate issuers, U-Prove Verifiers must trust the parameters of an attestation's Issuers. Issuers are identified by a URL, from which the parameters can be retrieved. The validation therefore relies on trust of  ownership of the TLS endpoint. In an open environment, Users can make this decisions on an Issuer-by-Issuer basis, or delegate the trust to other authorities (e.g., an organization listing trusted issuers it oversees or audits).

### Why U-Prove? Can't you do this with standard cryptography?

We could have designed the UWA framework encoding an Issuer signature and a User's proof-of-possession using conventionally signed JWS, which would be perfectly acceptable in many scenarios (e.g., for posting alumni or employment attestations in one's professional social profiles), but might be problematic in others (e.g., posting controversial or sensitive memberships on a pseudonymous forum). It would be trivial for an Issuer (e.g., an insider with access to the issuance logs) to recognize attestations it issued that are attached to web sites (therefore identifying the User behind them). Since U-Prove tokens are unlinkable, usage of the technology supports all use cases by protecting the full privacy spectrum: from anonymity, to pseudonymity, to full-identification.  

### Why do label values need be pre-determined in the Issuer parameters?

It is sometimes useful to augment an Issuer attestation with some addition information. For example, a "humanness validation" attestation could encode a "level of assurance" value describing how the User's identity was confirmed (e.g., phone, email, in-person), an alumni attestation could encode a graduation year, an employment attestation could encode a company division where the User works. Since the UWA framework aims at protecting privacy to the upmost degree, free-form labels are not allowed; this is to prevent Issuers from encoding unique trackable values in a User's tokens. Issuers must therefore list the possible values in its parameters, and encode the corresponding value index in the issued tokens. Richer User attributes could be encoded in a token and disclosed in an attestation; see the [extensions](#extensions) section for details. 

### Can U-Prove tokens be revoked?

Although U-Prove tokens can be revoked using various mechanisms, the UWA framework specifies the simplest validity method to deploy: short-lived tokens. Limiting the validity period of tokens foregoes the need for a token revocation scheme. Issuer keys can however be revoked by removing the corresponding parameters from the issuer JWK set as described in the [UWA specification](https://github.com/microsoft/web-attestation-sample/blob/main/doc/uwa-spec.md#issuer-setup). Doing so will invalidate all UWA generated using tokens issued using these parameters.

### How long is a U-Prove token valid for?

The Issuer decides on the validity period of the U-Prove tokens they issue. The expiration date is described as the number of days since the Unix epoch; all tokens expire at midnight UTC on the specified day. These bucketized expiration values enhance privacy by reducing token trackability, when compared to using fine-grained expiration values. 

### Why are multiple tokens retrieved in batch for each issuance?

The issuance and attachment of a UWA is unlinkable (by virtue of the U-Prove unlinkability property); reusing a token to create multiple UWAs attached to different sites would however be linkable (they would have the same Issuer signature). Using a different token for each UWA protects against undesired User tracking. Obtaining tokens in advance in batch reduces the Issuer's visibility into their usage, thus better protecting privacy. If tokens were retrieved on-demand just before creating a UWA, an Issuer comparing issuance and UWA creation times could infer a lot of information on the Users behind them.  

### Can someone steal my web attestation and attach it to another page?

No. The page URL (a.k.a. scope) where the UWA is attached has been signed by the User when creating it; moving the UWA to another page would result in an invalid signature that would be rejected by Verifiers; the corresponding badge would consequently be rendered as invalid. An attacking accessing issued tokens private keys could however create new attestations; it is therefore important to protect them accordingly (see the [extensions](#extensions) section for a discussion).

## Extensions

This initial release focusses on the core concept of creating user-controlled and privacy-preserving web attestations. Many additional features and improvements are possible (by making use current or upcoming features of the [U-Prove JSON Framework (UPJF)](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md)), and some of these are needed for a secure and robust real-life deployment. The following list describes some of them:

* *Selectively-disclosable attributes*: a UWA can currently encode only a single Issuer-specific label value. To make badges more informative, the issued U-Prove tokens could be augmented with various attributes that could be selectively-disclosed on a page by page basis (e.g., a User could disclose its Issuer-verified real name on their professional social media page, while withholding it on their pseudonymous gaming profile).
* *Optimized serialization*: the UWA URI is a direct encoding of the token presentation JWS as specified in the UPJF. Defining a more compact serialization in the framework would reduce the size of the UWA strings and their corresponding QR encoding.
* *Key protection*: the User's token keys are stored as-is in the browser extension's local storage. Keys should be encrypted under a user-controlled key to help prevent theft. It is also desirable to prevent Users from extracting the private keys to prevent undesired token transfer (for example, to prevent Users from sharing or selling their attestations), which is difficult to do in a JavaScript environment. Stronger cryptographic techniques, such as the U-Prove device binding (see section 6 of the U-Prove [technical overview](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove%20Technology%20Overview%20V1.1%20Revision%203.pdf)) could be use to tie a token to a specific 2nd-factor device (e.g., a TPM, a phone).
* *UWA links*: a web attestation URI might be too big to fit into some web environments with a character limit, and its alternative QR code form might not suitable for text-only environment. Another possibility is to define a UWA link, pointing to an external location from which the UWA content could be retrieved from.
* *Verifier UI protections*: malicious code could be used to trick a user into believing a fake UWA is valid by manipulating the page's UI (e.g., displaying verified badges or fake content popup on top of the ones created by the browser extensions). Isolating the extension's UI element in their own iframe could help mitigate this issue. Another useful feature would be for the browser extension to display the current's page validated UWAs in its popup. 

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
