// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// global types available to all TS files

interface Validation {
  issuer?: string
  scope?: string
  status: string
  info?: string
  about?: string
  error?: string
  timestamp?: number
}
