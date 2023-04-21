// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import got from 'got';

import * as io from "./io.js";
import * as settings from './settings.js';

import { upjf, uprove, serialization } from "uprove-node-reference";

void (async () => {
    try {
        // first fetch the Issuer parameters
        const jwksUrl = settings.ISSUER_URL + settings.JWKS_SUFFIX;
        const issuanceUrl = settings.ISSUER_URL + settings.ISSUANCE_SUFFIX;
        const jwksJson = await got(jwksUrl).json() as io.IssuerParamsJWKS;
        console.log("received Issuer JWKS", jwksJson);
        const jwk: upjf.IssuerParamsJWK = jwksJson.keys[0]; // we assume there is one param set in the key set
        const issuerParams = upjf.decodeJWKAsIP(jwk);

        //
        // Token issuance
        //
        
        // send token issuance request to Issuer
        const requestedNumberOfTokens = 5;
        const request: io.TokenRequestMessage = {
            n: requestedNumberOfTokens
        }

        // parse 1st issuance message
        const firstMsg: io.FirstIssuanceMessage = await got.post(issuanceUrl, { json: request }).json();
        console.log("received 1st issuance message", firstMsg);
        const msg1 = serialization.decodeFirstIssuanceMessage(issuerParams, firstMsg.msg);
        const actualNumberOfTokens = msg1.sA.length;
        const TI: Uint8Array = Buffer.from(firstMsg.TI, "base64");
        const prover = new uprove.Prover(issuerParams, [], TI, new Uint8Array(), actualNumberOfTokens);

        // prover creates the second message
        const msg2 = prover.createSecondMessage(msg1);
        const secondMessage: io.SecondIssuanceMessage = {
            sID: firstMsg.sID,
            msg: serialization.encodeSecondIssuanceMessage(msg2)
        }
        console.log("2nd issuance message", secondMessage);

        // send 2nd issuance message
        const thirdMsg: io.ThirdIssuanceMessage = await got.post(issuanceUrl, { json: secondMessage }).json();
        console.log("received 3rd issuance message", thirdMsg);
        if (firstMsg.sID !== thirdMsg.sID) {
            throw "session ID mismatch";
        }

        // parse 3rd issuance message
        const msg3 = serialization.decodeThirdIssuanceMessage(issuerParams, thirdMsg.msg);
        // create the U-Prove tokens
        const uproveKeysAndTokens = prover.createTokens(msg3);

        // verify the U-Prove tokens
        uproveKeysAndTokens.forEach((ukat) => {
            uprove.verifyTokenSignature(issuerParams, ukat.upt);
            console.log(serialization.encodeUProveToken(ukat.upt));
            
            console.log(ukat.alphaInverse);
        });

        console.log("Success");
    } catch (err) {
        console.log(err);
    }
})();