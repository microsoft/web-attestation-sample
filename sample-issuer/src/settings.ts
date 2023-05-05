// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// config settings for the sample issuer

// issuer settings
export const ISSUER_PORT: string =  "8080";
export const ISSUER_URL: string = "http://localhost:8080";
export const ISSUANCE_SUFFIX: string = "/issue";
export const JWKS_SUFFIX: string = "/.well-known/jwks.json";
export const TOKEN_VALIDITY_IN_DAYS: number = 1;
export const TOKEN_LABEL_TYPE: string = "Membership";
export const TOKEN_LABEL_VALUES = {
    1: "Type A",
    2: "Type B",
    3: "Type C"
}
export const getLabel = (userId: string): number => 2; // return one of the label types
