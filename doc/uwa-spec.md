# User-centric Web Attestation Specification

This document specifies the User-centric Web Attestation (UWA) framework.

A UWA is composed of an attestation issued to a user by an issuer, and a proof created by the user attaching the attestation to a scope at a specific timestamp. UWA have these interesting properties:

* *Authenticated*: Attestations are signed by issuers and tied to a user-controlled private key. Only the users to whom the attestation was issued can attach it to some web content.
* *Unlinkable*: The cryptographic values (including the issuer signature and user public key) have been randomized by the user, preventing anyone to link the attestation issuance to its attachment to some web content.
* *Attributes*: Attestations can contain attributes about its user.
* *Non-transferable*: once attached to some web content, the attestations cannot be transferred (stolen).

These security properties are achieved using the [U-Prove technology](https://www.microsoft.com/uprove). In this document, Issuer, User, and Verifier are roles that can be implemented by software components that can take different forms (e.g., web servers, web clients, phone apps, etc.)

## Technical details

The [U-Prove JSON Framework](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md) (UPJF) details how U-Prove tokens are obtained and used by the user to create UWAs.

### Issuer setup

The Issuer is identified by a URL `[ISSUER_URL]`. It creates its U-Prove Issuer Parameters encoded as a JSON Web Key as specified in the [UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuer-parameters), to issue tokens with no attributes with expiration numbered in days; the `specJSON` object is therefore:
```json
{
    n: 0,
    expType: "days"
}
```
The Issuer publishes the public JWK set at a well-known URL `[ISSUER_URL]/.well-known/jwks.json`.

### Issuance

TODO

### Attachment

TODO

### Verification

TODO