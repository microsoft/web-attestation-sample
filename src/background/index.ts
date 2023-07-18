// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { updateTokens } from './tokenStore'
import { parseUWA } from './uwa'
import { downloadIssuerParams, getBaseURL } from './tokens'

interface Message {
  text?: string
  string?: string
}

interface ResponseData {
  dataUrl: string | null
}

async function checkUWA (string: string, scope: string): Promise<Validation> {
  console.log('checkUWA called', string)
  const uwaData = await parseUWA(string)
  if (uwaData.status === 'valid' && uwaData.scope !== scope) {
    uwaData.status = 'invalid_scope'
    uwaData.error = `Wrong URL: ${uwaData.scope ?? ''}`
  }
  return uwaData
}

chrome.runtime.onMessage.addListener((msg: Message, sender, sendResponse) => {
  if (msg?.text === 'checkUWA') {
    const url = getBaseURL(sender.url as string) as string
    void checkUWA(msg.string as string, url).then(sendResponse)
  }

  if (msg?.text === 'downloadIssuerParams') {
    void downloadIssuerParams(msg.string as string).then(result => {
      sendResponse(result)
    })
  }

  if (msg?.text === 'fetchImage') {
    fetchImage(msg.string as string)
      .then(dataUrl => {
        sendResponse({ dataUrl } satisfies ResponseData)
      })
      .catch(() => {
        sendResponse({ dataUrl: null } satisfies ResponseData)
      })
  }

  return true
})

chrome.runtime.onStartup.addListener(() => {
  void updateTokens()
})

setInterval(() => {
  void updateTokens()
}, 15 * 60 * 1000)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'verifyQR',
    title: 'Verify QR',
    contexts: ['image']
  })
})

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === 'verifyQR') {
    console.log('verifyQR clicked', info, tab?.id)
    void chrome.tabs.sendMessage(tab?.id as number, { action: 'verifyContextImage' })
  }
})

async function fetchImage (url: string): Promise<string> {
  return await fetch(url)
    .then(async (response) => await response.blob())
    .then(async (blob) => {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result as string)
        }
        reader.onerror = (err) => {
          reject(err)
        }
        reader.readAsDataURL(blob)
      })
    })
}
