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
3. When visiting a web site, the User can create a web attestation from an issued token using the web browser extension (encoded either as a string or a QR code), and attach it to the site. The U-Prove token is then deleted from the browser extension to prevent linkability with newly created attestations.
4. Other users visiting the same web site can verify attached web attestations from trusted Issuers using the web browser extension. Unknown Issuers can be added to the trusted list by the User. Invalid attestations (for example: forged, or copied from a different site) are marked as such; malformed ones are simply ignored.

![UWA architecture](./doc/UWA_arch.svg)

## Deployment example

This section describes an example of how a user could create a web attestation for their *soc.ial* profile attesting their membership in the amazing *commun.ity* (both *soc.ial* and *commun.ity* are fictional web sites).

### Issuer setup

The *commun.ity* admin first need to create their U-Prove Issuer parameters and setup their issuance service; this can be achieved using the [sample server](./sample-issuer/README.md) project.

The admin first modifies the [settings.ts](./sample-issuer/src/settings.ts) file to correctly setup the Express server (to be deployed at `https://commun.ity`), which would then need to be modified and integrated into the *commun.ity* web environment to authenticate incoming users. In this example, the admin decides on a 7-day token validity, on an about page location (e.g., `https://commun.ity/uwa/about.html`), and decides to add a "Membership level" label to the tokens with three possible values: "Gold", "Silver", and "Bronze", representing the community's three membership types it offers.

The admin then creates the Issuer parameters by running `npm run setup-issuer` resulting in the creation of a JSON web key (JWK) set (publicly available at `https://commun.ity/.well-known/jwks.json`) and the corresponding private key (that remains, of course, secret).

The admin creates the about page explaining its UWA issuance criteria, and adds a `<meta name="uwa" content="https://commun.ity/issue">` tag in the page's HTML allowing a user's browser extension to discover the token issuance endpoint.

The token issuance server can be deployed by running `npm run deploy-issuer`.

### Token issuance

Alice, a member of *commun.ity*, visits the community web site, and sees the new feature to obtain tokens on its about page. She downloads and install the UWA browser extension for Edge, and in the popup Tokens tab, she clicks `Get tokens` (the browser extension enables this button after parsing the `<meta>` tag in the about page). This triggers the U-Prove issuance protocol after which she obtains some U-Prove tokens signed by *commun.ity* (5 tokens by default); the tokens and corresponding private keys are stored in the browser extension.

### Attestation creation

Alice has a pseudonymous account on *soc.ial*, with name tag *@pr1v4cy*; she wants to add a *commun.ity* membership attestation to her profile. She navigates to her profile page `https://soc.ial/@pr1v4cy`, and from the browser extension's Tokens tab, she selects the `https://commun.ity` issuer and clicks `Create`. The browser extension selects an unused token from the selected issuer, and creates a web attestation by signing the scope URL `https://soc.ial/@pr1v4cy` and current time using the token's private key before deleting it (expired and low-count tokens are automatically renewed by the browser extension). The resulting UWA string and equivalent QR code image are displayed in the popup. Alice copies the UWA string and edits her profile's bio adding the following text:

```
I'm a member of the amazing commun.ity: uwa://eyJhbGciOiJVUDI1NiJ9.eyJzY29wZSI6Imh0dHBzOi8vc29jLmlhbC9AcHIxdjRjeSIsInRpbWVzdGFtcCI6MTY4NDk1MDA0Mzg5MX0.eyJ1cHQiOnsiVUlEUCI6ImJvTGNUdTA1M2NNeGtOVEJtdEMyTmFkb2VIUnEyMzVtTmlQLVRNblM1Y2siLCJoIjoiQkVrZHJWU1padV9lUmNXc25YNld4M0Z3QmxwdWxnSkU2NUEyeWtyUmxkMjdUN3VxY3E4ZTZKOVl1NkNVaDJOQzNYZVo3QmlvTGQ4M2VMWlhGQURNeW00IiwiVEkiOiJleUpwYzNNaU9pSm9kSFJ3Y3pvdkwyTnZiVzExYmk1cGRIa2lMQ0psZUhBaU9qSXdNREF5TENKc1ltd2lPakY5IiwiUEkiOiIiLCJzWnAiOiJCR2RlT01rcTNnX1VEdHp2R1ZOTTYzckY2VGh6WDlPX0RoWFA4Q3I0Y3dlQW9QaHAxMEpKWnZBZ3NsN2tjLWJXTDEtX2V4eHpzdEhuS1JVT2ZpX0N2dE0iLCJzQ3AiOiJHaWJXdDYybGt3TG1Od3hYM3F5U2szblR5Y05HQy1pNmRiTkJhUUdBbzZjIiwic1JwIjoiWFNfY1dTOTdRNm5udTJpSlRjVXpKWHJHamdFdXBWLWZiOWZNRFlhRGpaMCJ9LCJwcCI6eyJhIjoiMFl3VUZWQjBKUmJIM2tRM1cyaElzb3VnLTJnQ21wbTVUSnBTLXJQYXZfdyIsInIiOlsiZGdqTU9mR2U1MWlpV0JHWTB0bVQ5VHJ1dVRRWjhXZHBpaFhZY2pBSUM5VSJdfX0
```

In addition, she downloads the QR code image, and adds it in a pinned message on her profile page.

![soc.ial QR code](./doc/soc.ial.qr.png)

### Attestation verification

Bob, who also has the UWA browser extension installed, navigates to `https://soc.ial/@pr1v4cy` to learn more about this insightful user. The browser extension automatically parses the UWA string in the bio text, and since Bob is also a member of *commun.ity* (and therefore already trusts this Issuer), it renders it as a verified blue badge. Clicking on the badge reveals that *@pr1v4cy* is a Gold member of *commun.ity* (wow!) and this already increases Bob's confidence in this user's *soc.ial* posts. Bob would like to know who is behind this *@pr1v4cy* tag name, unfortunately he can't even if he bribed the *commun.ity* admin with a million dollars (this could be any of the site's Gold members, nothing else to learn due to the U-Prove unlinkability property).

Bob later navigates to `https://soc.ial/@h4ck3r`, who also claims to be part of *commun.ity*. This malicious user is however not part of the reputable community, they simply copied the UWA string from *@pr1v4cy*'s page and added it to their own. Fortunately, the browser extension isn't fooled by this subterfuge, and renders the string as a red invalid badge (the U-Prove presentation proof is invalid, because the signed scope doesn't match the current page).

Finally, Bob visits the page of `https://soc.ial/2cool4u` and starts reading this user's numerous but interesting posts. Bob starts to wonder if this is a bot account or simply someone with a lot of free time! This user's profile pic is a UWA QR code, so Bob right click on it and selects "Verify QR". The QR-encoded UWA string has been issued by `https://human.iam`, an issuer unknown to Bob (and his browser extension), so a yellow unknown badge is displayed. After navigating to their website and performing a quick web search, Bob learns that this is a web site that validates users' humanness after validating their real-life identity. Bob decides to click on the `Trust` button in the UWA badge, which prompts the browser extension to download and trust the Issuer parameters from `https://human.iam/.well-known/jwks.json` and validate the UWA. Bob now inspect the information of the verified blue badge, learning that *2cool4u* was verified using a government-issued ID, which convinces Bob that this is indeed a real person. From now on, UWA from `https://human.iam` will be automatically verified by his browser extension.

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
