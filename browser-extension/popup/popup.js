// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { storeTokens, listTokenIssuers, clearTokens } from "../tokenStore.js";
import { getTokens } from "../tokens.js";
import { createUWA } from "../uwa.js";

// trusted issuer map
let issuerMap = new Map();
console.log("Initializing issuerMap", issuerMap);
issuerMap.set("https://example.com", { "url": "https://example.com/" });
issuerMap.set("https://contoso.com", { "url": "https://contoso.com/" });
issuerMap.set("https://fabrikam.com", { "url": "https://fabrikam.com" });
issuerMap.set("test", { "url": " http://localhost:8080" });

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to switch tabs
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and tab contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active-content"));

      // Add active class to clicked tab and tab content
      tab.classList.add("active");
      const tabContentId = tab.getAttribute("data-tab");
      document.getElementById(tabContentId).classList.add("active-content");
    });
  });

  // Add event listener to link in About tab
  const link = document.querySelector("#about a");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = event.target.href;
    window.open(url, "_blank");
  });

  var issueButton = document.getElementById('issue-button');
  var presentButton = document.getElementById('present-button');
  var copyButton = document.getElementById('copy-button');
  var scopeText = document.getElementById('scope-text');
  var timeText = document.getElementById('time-text');
  var waText = document.getElementById('wa-text');
  var waLabel = document.getElementById('wa-label');
  var waTable = document.getElementById('wa-table');
  let selectedIssuer;

  // get current tab
  let url;

  // issuer url of current tab. value will be undefined if not provided by page.
  let tabIssuerUrl;

  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    const activeTab = tabs[0];
    url = activeTab.url;
    console.log("url:", url);

    // enable the issue button if the current page provides an issuer url
    tabIssuerUrl = await getTabIssuerUrl(activeTab);

    console.debug(`tab: ${activeTab.title}  issuerUrl: ${tabIssuerUrl}`);

    issueButton.disabled = !tabIssuerUrl;

    await updateWaTokens();

  });

  const updateWaTokens = async () => {
    document.getElementById('issuer-table');

    const tokenIssuers = await listTokenIssuers() || [];
    var hasTokens = tokenIssuers.length > 0;
    document.getElementById("no-tokens-div").style.display = hasTokens ? "none" : "block";
    document.getElementById("has-tokens-div").style.display = hasTokens ? "block" : "none";

    // update table

    // clear the waTable
    var waTable = document.getElementById('wa-table');
    while (waTable.rows.length > 1) {
      waTable.deleteRow(1);
    }
    // populate the waTable
    tokenIssuers.forEach(issuer => {
      const row = waTable.insertRow(-1);

      // Add cells for the "Select" checkbox
      const selectCell = row.insertCell(0);
      const selectInput = document.createElement('input');
      selectInput.type = 'radio';
      selectInput.name = 'selected-row';
      selectCell.appendChild(selectInput);

      // Add cells for the "Issuer"
      const issuerCell = row.insertCell(1);
      issuerCell.textContent = issuer;

      // Add cells for the "Info" FIXME: don't have this for now
      // const infoCell = row.insertCell(2);
      // infoCell.textContent = value['info'];
    });
  }

  const updateIssuers = () => {
    console.log("updateIssuers() called, issuerMap:", issuerMap);
    // update table
    // clear the waTable
    var issuerTable = document.getElementById('issuer-table');
    while (issuerTable.rows.length > 1) {
      issuerTable.deleteRow(1);
    }
    // populate the issuerTable
    for (const [issuer, value] of issuerMap.entries()) {
      const row = issuerTable.insertRow(-1);

      // Add cells for the "Name"
      const issuerCell = row.insertCell(0);
      issuerCell.textContent = issuer;

      const urlCell = row.insertCell(1);
      urlCell.textContent = value['url'];
    }
  }

  // get a web attestation from the current page
  issueButton.addEventListener('click', async function () {
    if (!tabIssuerUrl) return;
    let { tokens, refreshID, expiration } = await getTokens(tabIssuerUrl);
    if (tokens) {
      storeTokens(issuerUrl, refreshID, expiration, tokens);
      updateWaTokens();
    }
  });

  // Add a change event listener to the table
  waTable.addEventListener('change', function () {
    // enable the present button if a row is selected
    const selectedRow = waTable.querySelector('input[name="selected-row"]:checked');
    console.log("selectedRow:", selectedRow);
    if (selectedRow) {
      presentButton.disabled = false;
    } else {
      presentButton.disabled = true;
    }
    selectedIssuer = selectedRow.parentNode.parentNode.cells[1].textContent;
    console.log("selectedIssuer:", selectedIssuer);
  });

  // present an attestation to the current page
  presentButton.addEventListener('click', async function () {
    const scope = url.split('/').slice(-2).join('/'); // TODO: fix this beyond demo files; just use new URL(url).path
    scopeText.textContent = 'URL: ' + scope;
    const wa = await createUWA(selectedIssuer, scope);
    waText.textContent = wa;
    waLabel.style.display = 'inline-block';
    waText.style.display = 'block';
    copyButton.style.display = 'inline-block';
  });

  // copy the web attestation to the clipboard
  copyButton.addEventListener('click', function () {
    var copyText = document.getElementById("wa-text");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
  });

  updateIssuers();
});

// requests issuer url from tab
async function getTabIssuerUrl(tab) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tab.id, { action: 'getIssuerUrl' }, (response) => {
      resolve(response.value);
    });
  }).catch((err) => { throw new Error(`Error checking tab issuer url. ${err}`) })
}