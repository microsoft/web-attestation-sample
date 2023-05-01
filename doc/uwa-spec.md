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

The Issuer is identified by a URL `[ISSUER_URL]`. It creates its U-Prove Issuer parameters encoded as a JSON Web Key as specified in the [UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuer-parameters), to issue tokens with no attributes with expiration numbered in days. The Issuer can encode a label into its issued tokens, the values of which are described in a `lblType` object encoded in its specification containing numerical keys and string values. The `specJSON` is therefore of this form:
```
{
    n: 0,
    expType: "days",
    lblType:? {
        1: <first type>,
        2: <second type>,
        ...
    }
}
```
 
The Issuer publishes the public JWK set at a well-known URL `[ISSUER_URL]/.well-known/jwks.json`, and listens for token issuance requests at `[ISSUER_URL]/issue`.

Issuers can add a `<meta name="uwa" content="[ISSUER_URL]">` HTML element on a web page to allow Users to discover its `[ISSUER_URL]`.

## Issuance

The U-Prove issuance protocol consists of four messages, described in the following sections (see the [UPJF]([UPJF](https://github.com/microsoft/uprove-node-reference/blob/main/doc/U-Prove_JSON_Framework.md#issuance-protocol)) for more details).

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

The Issuer can issue U-Prove tokens to the User by continuing the issuance protocol. It decides on the number of tokens `N` to issue (up to `n`), creates a unique session ID for the issuance, creates (or reuses) a refresh identifier that a User can present to obtain new tokens in a subsequent issuance requests, sets the token expiration date (number of days since the Unix epoch), and optionally sets the label value (one of the numeric keys contained in the `lblType` object in its parameters' specification field). The `[ISSUER_URL]`, expiration, and label values are then encoded in the U-Prove Token Information field, a JSON object of this form:
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
* `TI` is the base64 encoding of the U-Prove Token Information field.
* `msg` is a JSON object containing the cryptographic values of the first U-Prove issuance message (one shared values `sz`, and `sA` and `sB` arrays of length `N`).

### Second issuance message

The User responds with the second issuance message of this form:
```
{
    sID: string,
    msg: {
        sC: string[]
    }
}
```
where:
* `sID` is the unique session identifier.
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
    scope: string,
    timestamp: number
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
1. Decoding the U-Prove token's Token Information field, consisting of a issuer URL `[ISSUER_URL]` and an expiration value.
1. Retrieving the Issuer parameters for the Issuer from its cached store (or retrieve them from `[ISSUER_URL]/.well-known/jwks.json` if deemed trusted).
1. Validating the U-Prove token and the presentation proof.
1. Checking that the token expiration (encoded as a number of days after the Unix epoch) is after the presentation message's timestamp (encoded in milliseconds).

## Sample 

TODO: create a sample issuance trace and uwa creation using sample issuance params