// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { storeTokens, listTokenIssuers, clearTokens, updateTokens, openTokenStore } from '../background/tokenStore.js'
import { listIssuers, clearIssuerParams } from '../background/issuerStore.js'
import { getTokens, getBaseURL, downloadIssuerParams } from '../background/tokens.js'
import { createUWA } from '../background/uwa.js'
import { type serialization } from 'uprove-node-reference'
import { encode } from '../qr.js'

interface getTokensResponse {
  refreshID: string
  expiration: number
  tokens: Array<{
    key: string
    token: serialization.UProveTokenJSON
  }>
  kid: string
}

document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners to switch tabs
  const tabs = document.querySelectorAll('.tab')
  const tabContents = document.querySelectorAll('.tab-content')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and tab contents
      tabs.forEach((t) => { t.classList.remove('active') })
      tabContents.forEach((c) => { c.classList.remove('active-content') })

      // Add active class to clicked tab and tab content
      tab.classList.add('active')
      const tabContentId = tab.getAttribute('data-tab') as string
      (document.getElementById(tabContentId) as HTMLElement).classList.add('active-content')
      if (tabContentId === 'issuers') {
        void updateIssuers()
      }
    })
  })

  // Add event listener to link in About tab
  const link = document.querySelector('#about a')
  link?.addEventListener('click', (event) => {
    event.preventDefault()
    const url = (event?.target as HTMLAnchorElement)?.href
    window.open(url, '_blank')
  })

  const issueButton = document.getElementById('issue-button') as HTMLButtonElement
  const presentButton = document.getElementById('present-button') as HTMLButtonElement
  const deleteIssuersButton = document.getElementById('delete-issuers-button') as HTMLButtonElement
  const deleteTokensButton = document.getElementById('delete-tokens-button') as HTMLButtonElement
  const updateTokensButton = document.getElementById('update-tokens-button') as HTMLButtonElement
  const verifyQrCodeToggle = document.getElementById('verify-all-images-toggle') as HTMLInputElement
  const addIssuerButton = document.getElementById('add-issuer-button') as HTMLButtonElement
  const copyButton = document.getElementById('copy-button') as HTMLButtonElement
  const scopeText = document.getElementById('scope-text') as HTMLLabelElement
  const waText = document.getElementById('wa-text') as HTMLTextAreaElement
  const waLabel = document.getElementById('wa-label') as HTMLLabelElement
  const waTable = document.getElementById('wa-table') as HTMLTableElement
  const qrCode = document.getElementById('img-qr-code') as HTMLImageElement
  const fromIssuerLabel = document.getElementById('from-issuer-label') as HTMLLabelElement

  let selectedIssuer: string

  // get current tab
  let sanitizedUrl: string | null

  // issuer url of current tab. value will be undefined if not provided by page.
  let tabIssuerUrl: string | undefined

  void chrome.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
    const activeTab = tabs[0]
    sanitizedUrl = getBaseURL(activeTab.url as string)

    scopeText.textContent = sanitizedUrl
    console.log('sanitizedUrl, as seen by popup.js:', sanitizedUrl)

    // enable the issue button if the current page provides an issuer url
    tabIssuerUrl = await getTabIssuerUrl(activeTab)

    console.debug(`tab: ${activeTab.title as string}  issuerUrl: ${tabIssuerUrl}`)

    issueButton.disabled = tabIssuerUrl.length === 0
    if (issueButton.disabled) {
      fromIssuerLabel.textContent = 'No issuer detected on this page.'
    } else {
      fromIssuerLabel.textContent = 'Issuer detected: ' + tabIssuerUrl
    }

    await updateWaTokens()
  })

  const updateWaTokens = async (): Promise<void> => {
    void await openTokenStore()
    const tokenIssuers = await listTokenIssuers()

    const hasTokens = tokenIssuers.length > 0

    const noTokensDiv = document.getElementById('no-tokens-div') as HTMLElement
    noTokensDiv.style.display = hasTokens ? 'none' : 'block'

    const hasTokensDiv = document.getElementById('has-tokens-div') as HTMLElement
    hasTokensDiv.style.display = hasTokens ? 'block' : 'none'

    const createUwaDiv = document.getElementById('create-uwa-div') as HTMLElement
    createUwaDiv.style.display = hasTokens ? 'block' : 'none'

    // update table

    // clear the waTable
    const waTable = document.getElementById('wa-table') as HTMLTableElement
    while (waTable.rows.length > 1) {
      waTable.deleteRow(1)
    }
    // populate the waTable
    tokenIssuers.forEach(issuer => {
      const row = waTable.insertRow(-1)

      // Add cells for the "Select" checkbox
      const selectCell = row.insertCell(0)
      const selectInput = document.createElement('input')
      selectInput.type = 'radio'
      selectInput.name = 'selected-row'
      selectCell.appendChild(selectInput)

      // Add cells for the "Issuer"
      const issuerCell = row.insertCell(1)
      issuerCell.textContent = issuer
    })
  }

  const updateIssuers = async (): Promise<void> => {
    console.log('updateIssuers called')
    const issuers = await listIssuers()
    const hasIssuers = issuers.length > 0
    const noIssuersDiv = document.getElementById('no-trusted-issuers-div') as HTMLElement
    noIssuersDiv.style.display = hasIssuers ? 'none' : 'block'
    const hasIssuersDiv = document.getElementById('has-trusted-issuers-div') as HTMLElement
    hasIssuersDiv.style.display = hasIssuers ? 'block' : 'none'

    // update table
    // clear the waTable
    const issuerTable = document.getElementById('issuer-table') as HTMLTableElement
    while (issuerTable.rows.length > 1) {
      issuerTable.deleteRow(1)
    }
    // populate the issuerTable
    for (const issuer of issuers) {
      const row = issuerTable.insertRow(-1)

      // Add cells for the "Name"
      const issuerCell = row.insertCell(0)
      issuerCell.textContent = issuer
    }
  }

  // get a web attestation from the current page
  issueButton.addEventListener('click', () => {
    void (async () => {
      if (tabIssuerUrl == null) return
      const { tokens, refreshID, expiration, kid } = (await getTokens(tabIssuerUrl)) as getTokensResponse
      if (tokens != null) {
        await storeTokens(tabIssuerUrl, refreshID, expiration, kid, tokens)
        await updateWaTokens()
      }
    })()
  })

  // Add a change event listener to the table
  waTable.addEventListener('change', function () {
    // enable the present button if a row is selected
    const selectedRow = waTable.querySelector('input[name="selected-row"]:checked')
    console.log('selectedRow:', selectedRow)
    if (selectedRow != null) {
      presentButton.disabled = false
    } else {
      presentButton.disabled = true
    }
    selectedIssuer = (selectedRow?.parentNode?.parentNode as HTMLTableRowElement)?.cells?.[1]?.textContent as string
    console.log('selectedIssuer:', selectedIssuer)
  })

  // present an attestation to the current page
  presentButton.addEventListener('click', () => {
    void (async () => {
      const wa = await createUWA(selectedIssuer, sanitizedUrl as string) as string
      const qrDataUrl = encode(wa)

      const img = new Image()
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(img, 0, 0, img.width, img.height)

        const imgCenter = new Image()
        const scale = 0.25
        imgCenter.width = Math.floor(canvas.width * scale)
        imgCenter.height = Math.floor(canvas.height * scale)
        imgCenter.onload = function () {
          ctx.drawImage(imgCenter, Math.floor((canvas.width - imgCenter.width) / 2), Math.floor((canvas.height - imgCenter.height) / 2), imgCenter.width, imgCenter.height)
          qrCode.src = canvas.toDataURL('image/png')
        }
        imgCenter.src = '..\\icons\\uwa-logo-blue.png'
      }
      img.src = qrDataUrl

      waText.textContent = wa
      waLabel.style.display = 'inline-block'
      waText.style.display = 'block'
      copyButton.style.display = 'inline-block'
    })()
  })

  // copy the web attestation to the clipboard
  copyButton.addEventListener('click', function () {
    const copyText = document.getElementById('wa-text') as HTMLTextAreaElement
    copyText.select()
    copyText.setSelectionRange(0, 99999) // For mobile devices
    document.execCommand('copy')
  })

  deleteIssuersButton.addEventListener('click', () => {
    void (async () => {
      await clearIssuerParams()
      await updateIssuers()
    })()
  })

  deleteTokensButton.addEventListener('click', () => {
    void (async () => {
      await clearTokens()
      await updateWaTokens()
    })()
  })

  updateTokensButton.addEventListener('click', () => {
    void (async () => {
      await updateTokens()
      await updateWaTokens()
    })()
  })

  chrome.storage.local.get(['autoScanQrCodes'], (result) => {
    verifyQrCodeToggle.checked = result === undefined ? false : result.autoScanQrCodes
  })

  verifyQrCodeToggle.addEventListener('change', () => {
    console.log('verifyQrCodeToggle changed')

    chrome.storage.local.set({ autoScanQrCodes: verifyQrCodeToggle.checked }, () => {
      console.log('autoScanQrCodes is set to ' + verifyQrCodeToggle.checked.toString())
    })

    if (verifyQrCodeToggle.checked) {
      // auto-verification turned on. Scan all images now.
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id as number, { action: 'verifyAllQrImages' }, function (response) {
          console.log('verifyAllQrImages response', response.status)
        })
      })
    }
  })

  // add a trusted issuer, download its parameters
  addIssuerButton.addEventListener('click', () => {
    void (async () => {
      const issuerUrl = document.getElementById('add-issuer-text') as HTMLInputElement
      if (issuerUrl.value != null && issuerUrl.value !== '') {
        console.log('adding issuer: ' + issuerUrl.value)
        await downloadIssuerParams(issuerUrl.value)
        await updateIssuers()
      }
    })()
  })

  // requests issuer url from tab
  async function getTabIssuerUrl (tab: chrome.tabs.Tab): Promise<string> {
    const response = await chrome.tabs.sendMessage(tab.id as number, { action: 'getIssuerUrl' })
      .catch((err) => { throw new Error(`Error checking tab issuer url. ${(err as Error).toString()}`) })

    // if the tab is the empty-tab there will be no message listener
    // we must check chrome.runtime.lastError to prevent the error from displaying in the console
    if (chrome.runtime.lastError != null) {
      // tab has no listener - do nothing
    }
    return response.value as string
  }
})
