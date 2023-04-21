// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getIssuerParams, setIssuerParams } from "./issuerStore.js";
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

// obtain U-Prove tokens from the issuerUrl, using the refreshID if provided
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
            refreshID
        }
    } catch (error) {
        console.error('Error making the POST request:', error);
    }
}