// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type upjf } from 'uprove-node-reference'

const ISSUER_STORE_KEY = 'issuerStore'

type IssuerParamsJWK = upjf.IssuerParamsJWK

type IssuerStore = Record<string, Record<string, IssuerParamsJWK>>

async function getIssuerStore (): Promise<IssuerStore> {
  return await new Promise(resolve => {
    void chrome.storage.local.get([ISSUER_STORE_KEY]).then((result) => {
      resolve(result.issuerStore ?? {})
    })
  })
}

export async function getIssuerParams (url: string, kid: string): Promise<IssuerParamsJWK | null> {
  const issuerStore = await getIssuerStore()
  const issuerParams = issuerStore[url]?.[kid] ?? null
  return issuerParams
}

export async function setIssuerParams (url: string, kid: string, issuerParams: IssuerParamsJWK): Promise<void> {
  const issuerStore = await getIssuerStore()
  issuerStore[url] = { ...(issuerStore[url] ?? {}), [kid]: issuerParams }
  await new Promise(resolve => {
    void chrome.storage.local.set({ issuerStore }).then(resolve)
  })
}

export async function listIssuers (): Promise<string[]> {
  const issuerStore = await getIssuerStore()
  return Object.keys(issuerStore)
}

export async function clearIssuerParams (): Promise<void> {
  await chrome.storage.local.remove(ISSUER_STORE_KEY)
}
