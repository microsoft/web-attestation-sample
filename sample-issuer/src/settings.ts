// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// config settings for the sample issuer

// issuer settings
export const ISSUER_PORT = '9000'
export const ISSUER_URL = `http://localhost:${ISSUER_PORT}`
export const ISSUER_ABOUT_URL = `http://localhost:${ISSUER_PORT}/about.html`
export const ISSUANCE_SUFFIX = '/issue'
export const JWKS_SUFFIX = '/.well-known/jwks.json'
export const TOKEN_VALIDITY_IN_DAYS = 1
export const TOKEN_LABEL_TYPE = 'Membership'
export const TOKEN_LABEL_VALUES = {
    1: 'Type A',
    2: 'Type B',
    3: 'Type C'
}
export const getLabel = (userId: string): number => 2 // return one of the label types
