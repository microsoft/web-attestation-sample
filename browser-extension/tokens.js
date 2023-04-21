// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getIssuerParams, setIssuerParams } from "./issuerStore.js";
import { popToken } from "./tokenStore.js";
import uproveModule from "./uprove.mjs";

const { Buffer, serialization, upjf, uprove } = uproveModule;

// send a message to the issuer and return the next message
async function sendIssuanceMessage(issuanceUrl, message) {
    console.log("sending issuance message", message);
    const response = await fetch(issuanceUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    });
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    const nextMessage = await response.json();
    console.log("received issuance message", nextMessage);
    return nextMessage;
}

/**
 * Obtain U-Prove tokens from the issuerUrl, using the refreshID if provided
 * @param {*} issuerUrl the url of the issuer
 * @param {*} refreshID the refresh ID received from the issuer
 * @returns a token batch, a new refreshID, and the expiration date of the tokens
 */
export async function getTokens(issuerUrl, refreshID) {
    console.log("getTokens called", issuerUrl);
    try {
        // obtain issuer params from the issuer store
        let jwk = getIssuerParams(issuerUrl);
        if (!jwk) {
            // first need to obtain the params from the issuer
            const jwksResp = await fetch(issuerUrl + "/.well-known/jwks.json");
            if (jwksResp.ok) {
                const jwks = await jwksResp.json();
                jwk = jwks.keys[0]; // TODO: deal with more than one token
                console.log("jwk", jwk);
                if (jwk) {
                    setIssuerParams(issuerUrl, jwk);
                }
            }
        }

        const issuanceUrl = issuerUrl + "/issue";
        const issuerParams = await upjf.decodeJWKAsIP(jwk);
        if (!issuerParams) {
            throw "can't parse issuer params";
        }
        const request = {
            n: 5 // number of requested tokens
        }
        // add the user id to the request if provided
        if (refreshID) {
            request.rID = refreshID;
        }
        // parse 1st issuance message
        const firstMsg = await sendIssuanceMessage(issuanceUrl, request);
        // save the refresh ID for subsequent issuances
        refreshID = firstMsg.rID;
        const msg1 = serialization.decodeFirstIssuanceMessage(issuerParams, firstMsg.msg);
        const actualNumberOfTokens = msg1.sA.length;
        const TI = Buffer.from(firstMsg.TI, "base64");
        const tokenInformation = upjf.parseTokenInformation(TI);
        // TODO: check tokenInformation.iss matches issuerUrl, and tokenInformation.exp is not expired
        const expiration = tokenInformation.exp;

        const prover = await uprove.Prover.create(issuerParams, [], TI, new Uint8Array(), actualNumberOfTokens);

        // prover creates the second message
        const msg2 = await prover.createSecondMessage(msg1);
        const secondMessage = {
            sID: firstMsg.sID,
            msg: serialization.encodeSecondIssuanceMessage(msg2)
        }
        console.log("2nd issuance message", secondMessage);

        // send 2nd issuance message
        const thirdMsg = await sendIssuanceMessage(issuanceUrl, secondMessage);
        if (firstMsg.sID !== thirdMsg.sID) {
            throw "session ID mismatch";
        }

        // parse 3rd issuance message
        const msg3 = serialization.decodeThirdIssuanceMessage(issuerParams, thirdMsg.msg);

        // create the U-Prove tokens
        const tokens = prover.createTokens(msg3);
        console.log("tokens", tokens);

        return {
            tokens,
            refreshID,
            expiration
        }
    } catch (error) {
        console.error('Error making the POST request:', error);
    }
}

/**
 * Creates a U-Prove presentation proof
 * @param {*} scope the scope of the presentation
 * @param {*} timestamp the timestamp of the presentation
 * @param {*} key the token private key
 * @param {*} token the U-Prove token
 */
export async function presentToken(issuerUrl, scope, timestamp) {
    const issuerParamsJWK = getIssuerParams(issuerUrl);
    if (!issuerParamsJWK) {
        throw "issuer params not found";
    }
    const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK);
    const {key, token} = await popToken(issuerUrl);
    if (!key || !token) {
        throw "no token available";
    }
    let upkt = {
        alphaInverse: upjf.decodeBase64UrlAsPrivateKey(issuerParams, key),
        upt: serialization.decodeUProveToken(issuerParams, token)
    }
    let message = new TextEncoder().encode(JSON.stringify({
        scope: scope,
        timestamp: timestamp
    }));
    let presentationData = await uprove.generatePresentationProof(issuerParams, [], upkt, message, []);
    let proof = serialization.encodePresentationProof(presentationData.pp);
    let tp = {
        upt: token,
        pp: proof
    }
    let jws = upjf.createJWS(upjf.descGqToUPAlg(issuerParams.descGq), message, tp);
    return jws;
}

/**
 * Verifies a U-Prove token presentation
 * @param {*} jws JWS encoding the token and proof
 */
export async function verifyTokenPresentation(jws) {
    const upJWS = upjf.parseJWS(jws);
/*
    TODO: work in progress

    const header = upJWS.header;
    // check the header alg (we'll check it matches the issuer params later)
    if (!header || !header.alg || !Object.values(upjf.UPAlg).includes(header.alg)) {
        console.log("invalid header alg: " + header.alg);
        throw "invalid JWS";
    }
    const message = upJWS.payload;
    const tokenPresentation = upJWS.sig;
    if (!tokenPresentation.upt) {
        console.log("upt missing from JWS");
        throw "invalid JWS";
    } 
    if (!tokenPresentation.pp) {
        console.log("pp missing from JWS");
        throw "invalid JWS";
    }
    const token = tokenPresentation.upt;
    const tokenInfo = upjf.parseTokenInformation(Buffer.from(token.TI, 'base64'));
    const issuerParamsJWK = await getIssuerParams(tokenInfo.iss);
    if (!issuerParamsJWK) {
        return {
            status: "unknown_issuer"
        }
    }
    const issuerParams = await upjf.decodeJWKAsIP(issuerParamsJWK);
    // check that JWS alg matches the issuer params's group
    if ((issuerParams.descGq == uprove.ECGroup.P256 && header.alg !== UPJF.UPAlg.UP256) ||
        (issuerParams.descGq == uprove.ECGroup.P384 && header.alg !== UPJF.UPAlg.UP384) ||
        (issuerParams.descGq == uprove.ECGroup.P521 && header.alg !== UPJF.UPAlg.UP521))
    {
        console.log(`header alg ${header.alg} doesn't match the Issuer params' group ${issuerParams.descGq}`);
        throw "invalid JWS";
    }
    const upt = serialization.decodeUProveToken(issuerParams, token)
    uprove.verifyTokenSignature(issuerParams, upt);
    const spec = upjf.parseSpecification(issuerParams.S);
    if (upjf.isExpired(spec.expType, tokenInfo.exp)) { // TODO: use timestamp from presentation message
        throw "token is expired";
    }
    const pm = io.parsePresentationMessage(message); // FIXME
    // TODO: check scope, expiration, etc.
    const verificationData = uprove.verifyPresentationProof(
        issuerParams,
        upt,
        message,
        serialization.decodePresentationProof(issuerParams, tokenPresentation.pp));
*/
        return {
            status: "valid",
            scope: "https://example.com",
            timestamp: "2023-04-21T15:30:00Z",
            info: "Some info"
        }
}