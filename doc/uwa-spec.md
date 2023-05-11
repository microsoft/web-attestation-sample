# User-centric Web Attestation Specification

This document specifies the User-centric Web Attestation (UWA) framework.

A UWA is composed of an attestation issued to a user by an issuer, and a proof created by the user attaching the attestation to a scope at a specific timestamp. UWA have these interesting properties:

* *Authenticated*: Attestations are signed by issuers and tied to a user-controlled private key. Only the users to whom the attestation was issued can attach it to some web content.
* *Unlinkable*: The cryptographic values (including the issuer signature and user public key) have been randomized by the user, preventing anyone to link the attestation issuance to its attachment to some web content.
* *Informational*: Attestations can contain attributes about its user.
* *Non-transferable*: once attached to some web content, the attestations cannot be transferred (stolen).

These security properties are achieved using the [U-Prove technology](https://www.microsoft.com/uprove). In this document, *Issuer*, *User*, and *Verifier* are roles that can be implemented by software components that can take different forms (e.g., web servers, web clients, phone apps, etc.)

The [U-Prove JSON Framework](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md) (UPJF) details how U-Prove tokens are obtained and used by the user to create UWAs. The following section detail how tokens are obtained, and then how attestations are created and verified.

## Issuer setup

The Issuer is identified by a URL `[ISSUER_URL]`. It creates its U-Prove Issuer parameters encoded as a JSON Web Key as specified in the [UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuer-parameters), to issue tokens with no attributes with expiration numbered in days. The Issuer can encode a label into its issued tokens of the form `<type>: <value>`; the specification contains a `lblType` string describing the type of the label, and the allowed values are described in a `lblValues` object containing numerical keys and string values.
The `specJSON` is therefore of this form:
```
{
    n: 0,
    expType: "days",
    lblType: "<label type>"
    lblValues:? {
        1: "<first value>",
        2: "<second value>",
        ...
    }
}
```
 
The Issuer publishes the public JWK set at a well-known URL `[ISSUER_URL]/.well-known/jwks.json`, and listens for token issuance requests at `[ISSUER_URL]/issue`. As described in the [UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuer-parameters), Issuers can rotate their keys by adding news parameters to the JWK set (while keeping the old ones to allow verification of web attestations created using them); they can also revoke keys by deleting the corresponding parameters.

Issuers can add a `<meta name="uwa" content="[ISSUER_URL]">` HTML element on a web page to allow Users to discover its `[ISSUER_URL]`.

## Issuance

The U-Prove issuance protocol consists of four messages, described in the following sections (see the [UPJF]([UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuance-protocol)) for more details).

```mermaid
sequenceDiagram
    participant User
    participant Issuer
    User->>Issuer: token request message
    Issuer->>User: first issuance message
    User->>Issuer: second issuance message
    Issuer->>User: third issuance message
    User->>User: generate tokens
```

### Token request message
A User initiates the U-Prove token issuance by sending a token request message to the Issuer (using the POST method to `[ISSUER_URL]/issue`). User authentication is application and Issuer-specific, and therefore out-of-scope of this framework. The User must first obtain an authentic copy of the Issuer parameters from `[ISSUER_URL]/.well-known/jwks.json`.

The token request message is a JSON object of this form:
```
{
    n?: number,
    rID?: string
}
```
where:
* `n` is an optional number of requested tokens to issue. The number of requested tokens is ultimately decided by the Issuer, but the User can request a specific maximum value.
* `rID` is an optional refresh identifier, allowing Users to request more tokens without re-authenticating.

### First issuance message

The Issuer can issue U-Prove tokens to the User by continuing the issuance protocol. It decides on the number of tokens `N` to issue (up to `n`), creates a unique session ID for the issuance, creates (or reuses) a refresh identifier that a User can present to obtain new tokens in a subsequent issuance requests, selects the parameters to use (identified by its identifier `kid`), sets the token expiration date (number of days since the Unix epoch), and optionally sets the label value (one of the numeric keys contained in the `lblValues` object in its parameters' specification field). The `[ISSUER_URL]`, expiration, and label value are then encoded in the U-Prove Token Information field, a JSON object of this form:
```
{
    iss: string,
    exp: number,
    lbl: number
}
```

The Issuer then responds with the first issuance message of this form:
```
{
    sID: string,
    rID?: string,
    kid: string,
    TI: string,
    msg: {
        sZ: string,
        sA: string[],
        sB: string[]
    }
}
```
where:
* `sID` is the unique session identifier.
* `rID` is the optional unique refresh identifier.
* `kid` is the key identifier of the Issuer parameters to use.
* `TI` is the base64 encoding of the U-Prove Token Information field.
* `msg` is a JSON object containing the cryptographic values of the first U-Prove issuance message (one shared values `sz`, and `sA` and `sB` arrays of length `N`).

### Second issuance message

The User stores or updates the `rID` value, retrieves the parameters identified with `kid` from the Issuer JWK set (if not available locally, then from `[ISSUER_URL]/.well-known/jwks.json`), validates the content of the Token Information field `TI` (checks that `iss` matches `[ISSUER_URL]`, `exp` is valid, and that `lbl` is one of the values specified in the parameters), and responds with the second issuance message of this form:
```
{
    sID: string,
    msg: {
        sC: string[]
    }
}
```
where:
* `sID` is the unique session identifier sent by the Issuer.
* `msg` is a JSON object containing the cryptographic values of the second U-Prove issuance message (`sC` array of length `N`).

### Third issuance message

Finally, the Issuer responds with the third issuance message of this form:
```
{
    sID: string,
    msg: {
        sR: string[]
    }
}
```
where:
* `sID` is the unique session identifier.
* `msg` is a JSON object containing the cryptographic values of the third U-Prove issuance message (`sR` array of length `N`).

The User then creates `N` U-Prove tokens than can be encoded in an application-specific manner. 

## Web Attestation creation

To create a web attestation, the User selects a U-Prove token, and signs a presentation message to create a U-Prove presentation proof encoded as a JSON Web Signature (JWS) as detailed in the [UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#presentation-protocol). The presentation message is the UTF8 encoding of a JSON object of this form:
```
{
    scope: string,
    timestamp: number
}
```
where:
* `scope` is the URL of the web page on which the attestation is attached.
* `timestamp` is the number of milliseconds since the Unix epoch.

The web attestation is then created by appending the `[JWS]` with a `uwa://` URI prefix.

## Web Attestation verification

A Verifier can validate web attestations URI `uwa://[JWS]` attached to a web site (scope) by
1. Decoding the JWS into a header, a payload, and a signature part.
1. Checking that the header contains a valid U-Prove algorithm identifier (`alg` = `UP256`, `UP384`, or `UP521`).
1. Decoding the payload into a presentation message containing a scope and a timestamp.
1. Checking that the presentation message scope matches the web site's scope.
1. Decoding the signature into a U-Prove token presentation, consisting of a U-Prove token and a presentation proof.
1. Decoding the U-Prove token's Token Information field, consisting of a issuer URL `[ISSUER_URL]`, an expiration value, and a label value `lbl`.
1. Retrieving the Issuer parameters for the Issuer from its cached store (or retrieve them from `[ISSUER_URL]/.well-known/jwks.json` if deemed trusted).
1. Validating the U-Prove token and the presentation proof.
1. Checking that the token expiration (encoded as a number of days after the Unix epoch) is after the presentation message's timestamp (encoded in milliseconds).
1. Extracting the token label, consisting of a string `<type>: <value>` where the `<type>` is extracted from the Issuer parameters specification's `lblType` value, and the `<value>` is extracted by looking up the specification's `lblValues[lbl]` using the token's `lbl` value.

## Sample 

### Sample Issuer parameters
This sections shows an example of a Issuer parameters encoding the following specification: 

```json
{
    "n":0,
    "expType":"day",
    "about":"https://raw.githubusercontent.com/microsoft/web-attestation-sample/main/sample-issuer/sample/about.html",
    "lblType":"Membership",
    "lblValues":
    {
        "1":"Type A",
        "2":"Type B",
        "3":"Type C"
    }
}
```

The resulting Issuer parameters:
```json
{
    "keys": [
        {
            "kty": "UP",
            "alg": "UP256",
            "kid": "UWzlBSurFIwfuqW-1hWXkeOpcZC9ob3HNTJ9Go3hT7Q",
            "g0": "BAwFap4XNPkoekkgg4_F5e8kngMpe3ADW4DS8NNBOhfINaxzXLPLLohFacqYl3L6VWiVhJvZz-aVWqbJOwVoqYk",
            "spec": "eyJuIjowLCJleHBUeXBlIjoiZGF5IiwiYWJvdXQiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWljcm9zb2Z0L3dlYi1hdHRlc3RhdGlvbi1zYW1wbGUvbWFpbi9zYW1wbGUtaXNzdWVyL3NhbXBsZS9hYm91dC5odG1sIiwibGJsVHlwZSI6Ik1lbWJlcnNoaXAiLCJsYmxWYWx1ZXMiOnsiMSI6IlR5cGUgQSIsIjIiOiJUeXBlIEIiLCIzIjoiVHlwZSBDIn19"
        }
    ]
}
```

The corresponding private key:
```
8BlPgOIBI5o0pqT6vMA8UGaYdpSV48yGOYhrULvk_g8
```

### Sample U-Prove token

This section shows a U-Prove token issued using the Issuer parameters above, encoding the following Token Information:
```json
{
    "iss":"https://raw.githubusercontent.com/microsoft/web-attestation-sample/dev/sample-issuer/sample","exp":19989,
    "lbl":1
}
```

The resulting token:
```json
{
    "UIDP": "UWzlBSurFIwfuqW-1hWXkeOpcZC9ob3HNTJ9Go3hT7Q",
    "h": "BPirBkpc71q1qQJtWKjRLrAGLyqUogg_p3xr08dMm_3XqRgnBtnYr_QQ9am3FFL-yrCbDT5b5MhxVSBN3AYf4Jo",
    "TI": "eyJpc3MiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbWljcm9zb2Z0L3dlYi1hdHRlc3RhdGlvbi1zYW1wbGUvZGV2L3NhbXBsZS1pc3N1ZXIvc2FtcGxlIiwiZXhwIjoxOTk4OSwibGJsIjoxfQ",
    "PI": "",
    "sZp": "BKTQ5j9wZRA4u8_DV1U2LughlOKgN74l_DM7Fe0mTxYZXNukmle53ODly-R5THCH159ZlPr0XKDHNktz9ETQnJ0",
    "sCp": "9SVKlkJwtMJv1OFODlqwLVL6Q-0u9081E_KugUGmMNI",
    "sRp": "5_C2Kvb4QzAclFG5jq_Ar6FdmieQa6CeeVLxNlT4Mj0"
}
```

The corresponding private key:
```
KfJGW_2DcYikIUdGrc8J3sIfBWmCnkxYtngisvHnvNI
```

### Sample UWA

This section shows a User-centric Web Attestation created using the token above, signing the following message:
```json
{
    "scope":"https://contoso.com",
    "timestamp":1683835051449
}
```

The UWA string:
```
uwa://eyJhbGciOiJVUDI1NiJ9.eyJzY29wZSI6Imh0dHBzOi8vY29udG9zby5jb20iLCJ0aW1lc3RhbXAiOjE2ODM4MzUwNTE0NDl9.eyJ1cHQiOnsiVUlEUCI6IlVXemxCU3VyRkl3ZnVxVy0xaFdYa2VPcGNaQzlvYjNITlRKOUdvM2hUN1EiLCJoIjoiQlBpckJrcGM3MXExcVFKdFdLalJMckFHTHlxVW9nZ19wM3hyMDhkTW1fM1hxUmduQnRuWXJfUVE5YW0zRkZMLXlyQ2JEVDViNU1oeFZTQk4zQVlmNEpvIiwiVEkiOiJleUpwYzNNaU9pSm9kSFJ3Y3pvdkwzSmhkeTVuYVhSb2RXSjFjMlZ5WTI5dWRHVnVkQzVqYjIwdmJXbGpjbTl6YjJaMEwzZGxZaTFoZEhSbGMzUmhkR2x2YmkxellXMXdiR1V2WkdWMkwzTmhiWEJzWlMxcGMzTjFaWEl2YzJGdGNHeGxJaXdpWlhod0lqb3hPVGs0T1N3aWJHSnNJam94ZlEiLCJQSSI6IiIsInNacCI6IkJLVFE1ajl3WlJBNHU4X0RWMVUyTHVnaGxPS2dONzRsX0RNN0ZlMG1UeFlaWE51a21sZTUzT0RseS1SNVRIQ0gxNTlabFByMFhLREhOa3R6OUVUUW5KMCIsInNDcCI6IjlTVktsa0p3dE1KdjFPRk9EbHF3TFZMNlEtMHU5MDgxRV9LdWdVR21NTkkiLCJzUnAiOiI1X0MyS3ZiNFF6QWNsRkc1anFfQXI2RmRtaWVRYTZDZWVWTHhObFQ0TWowIn0sInBwIjp7ImEiOiJSSmQ4Tm5vZ2tZeVRJaW1vcVdfdzRzaWRCTmlzOFc5OEFDalpBUXl4LW1JIiwiciI6WyJtY2wtUFpOUHJSZHNTbDNGVkhTNzhRdWEwczVlS0NMZHdUelVleVFNRXRnIl19fQ
```
