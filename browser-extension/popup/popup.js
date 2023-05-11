// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome */

import { storeTokens, listTokenIssuers, clearTokens, updateTokens } from '../tokenStore.js'
import { listIssuers, clearIssuerParams } from '../issuerStore.js'
import { getTokens } from '../tokens.js'
import { createUWA } from '../uwa.js'
import '../lib/uwaqrencoder.js'

function getBaseURL (url) {
    const urlObj = new URL(url)
    const baseURL = urlObj.origin + urlObj.pathname
    return baseURL.toLowerCase()
}

document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to switch tabs
    const tabs = document.querySelectorAll('.tab')
    const tabContents = document.querySelectorAll('.tab-content')
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and tab contents
            tabs.forEach((t) => t.classList.remove('active'))
            tabContents.forEach((c) => c.classList.remove('active-content'))

            // Add active class to clicked tab and tab content
            tab.classList.add('active')
            const tabContentId = tab.getAttribute('data-tab')
            document.getElementById(tabContentId).classList.add('active-content')
            if (tabContentId === 'issuers') {
                updateIssuers()
            }
        })
    })

    // Add event listener to link in About tab
    const link = document.querySelector('#about a')
    link.addEventListener('click', (event) => {
        event.preventDefault()
        const url = event.target.href
        window.open(url, '_blank')
    })

    const issueButton = document.getElementById('issue-button')
    const presentButton = document.getElementById('present-button')
    const deleteIssuersButton = document.getElementById('delete-issuers-button')
    const deleteTokensButton = document.getElementById('delete-tokens-button')
    const updateTokensButton = document.getElementById('update-tokens-button')
    // FIXME: TODO: implement addIssuer button
    const copyButton = document.getElementById('copy-button')
    const scopeText = document.getElementById('scope-text')
    const waText = document.getElementById('wa-text')
    const waLabel = document.getElementById('wa-label')
    const waTable = document.getElementById('wa-table')
    const qrCode = document.getElementById('img-qr-code')

    let selectedIssuer

    // get current tab
    let sanitizedUrl

    // issuer url of current tab. value will be undefined if not provided by page.
    let tabIssuerUrl

    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const activeTab = tabs[0]
        sanitizedUrl = getBaseURL(activeTab.url)
        console.log('sanitizedUrl, as seen by popup.js:', sanitizedUrl)

        // enable the issue button if the current page provides an issuer url
        tabIssuerUrl = await getTabIssuerUrl(activeTab)

        console.debug(`tab: ${activeTab.title}  issuerUrl: ${tabIssuerUrl}`)

        issueButton.disabled = !tabIssuerUrl

        await updateWaTokens()
    })

    const updateWaTokens = async () => {
        const tokenIssuers = await listTokenIssuers() || []
        const hasTokens = tokenIssuers.length > 0
        document.getElementById('no-tokens-div').style.display = hasTokens ? 'none' : 'block'
        document.getElementById('has-tokens-div').style.display = hasTokens ? 'block' : 'none'

        // update table

        // clear the waTable
        const waTable = document.getElementById('wa-table')
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

            // // Add cells for the "Label"
            // const labelCell = row.insertCell(2);
            // labelCell.textContent = value['label'];
        })
    }

    const updateIssuers = async () => {
        console.log('updateIssuers called')
        const issuers = await listIssuers() || []
        const hasIssuers = issuers.length > 0
        document.getElementById('no-trusted-issuers-div').style.display = hasIssuers ? 'none' : 'block'
        document.getElementById('has-trusted-issuers-div').style.display = hasIssuers ? 'block' : 'none'

        // update table
        // clear the waTable
        const issuerTable = document.getElementById('issuer-table')
        while (issuerTable.rows.length > 1) {
            issuerTable.deleteRow(1)
        }
        // populate the issuerTable
        for (const issuer of issuers) {
            const row = issuerTable.insertRow(-1)

            // Add cells for the "Name"
            const issuerCell = row.insertCell(0)
            issuerCell.textContent = issuer

            // const urlCell = row.insertCell(1);
            // urlCell.textContent = value['url'];
        }
    }

    // get a web attestation from the current page
    issueButton.addEventListener('click', async function () {
        if (!tabIssuerUrl) return
        const { tokens, refreshID, expiration, kid } = await getTokens(tabIssuerUrl)
        if (tokens) {
            storeTokens(tabIssuerUrl, refreshID, expiration, kid, tokens).then(() => {
                updateWaTokens()
            })
        }
    })

    // Add a change event listener to the table
    waTable.addEventListener('change', function () {
    // enable the present button if a row is selected
        const selectedRow = waTable.querySelector('input[name="selected-row"]:checked')
        console.log('selectedRow:', selectedRow)
        if (selectedRow) {
            presentButton.disabled = false
        } else {
            presentButton.disabled = true
        }
        selectedIssuer = selectedRow.parentNode.parentNode.cells[1].textContent
        console.log('selectedIssuer:', selectedIssuer)
    })

    // present an attestation to the current page
    presentButton.addEventListener('click', async function () {
        scopeText.textContent = 'URL: ' + sanitizedUrl
        const wa = await createUWA(selectedIssuer, sanitizedUrl)
        const qrDataUrl = self.uwaQrEncoder.encode(wa)
        waText.textContent = wa
        waLabel.style.display = 'inline-block'
        waText.style.display = 'block'
        copyButton.style.display = 'inline-block'
        qrCode.src = qrDataUrl
    })

    // copy the web attestation to the clipboard
    copyButton.addEventListener('click', function () {
        const copyText = document.getElementById('wa-text')
        copyText.select()
        copyText.setSelectionRange(0, 99999) // For mobile devices
        document.execCommand('copy')
    })

    deleteIssuersButton.addEventListener('click', async function () {
        await clearIssuerParams()
        updateIssuers()
    })

    deleteTokensButton.addEventListener('click', async function () {
        await clearTokens()
        updateWaTokens()
    })

    updateTokensButton.addEventListener('click', async function () {
        await updateTokens()
        updateWaTokens()
    })
})

// requests issuer url from tab
async function getTabIssuerUrl (tab) {
    return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tab.id, { action: 'getIssuerUrl' }, (response) => {
            resolve(response.value)
        })
    }).catch((err) => { throw new Error(`Error checking tab issuer url. ${err}`) })
}
