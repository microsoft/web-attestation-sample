// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { storeTokens } from "../tokenStore.js";
import { getTokens } from "../tokens.js";

// web attestation map
let waMap = new Map();
console.log("Initializing waMap", waMap);
waMap.set("Contoso", { "info": "Level 3" });
waMap.set("Example", { "info": "Example claim" });
waMap.set("Fabrikam", { "info": "is human" });

// trusted issuer map
let issuerMap = new Map();
console.log("Initializing issuerMap", issuerMap);
issuerMap.set("Example", { "url": "https://example.com/" });
issuerMap.set("Contoso", { "url": "https://contoso.com/" });
issuerMap.set("Fabrikam", { "url": "https://fabrikam.com" });
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
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    url = tabs[0].url;
    console.log("url:", url);

    // enable the issue button if the current page is an issuer
    if (url.endsWith("issuer.html")) { // TODO (ljoy): read meta tag info (here? from content.ts?)
      // this is an issuance page
      issueButton.disabled = false;
    } else if (url.endsWith("iamgreen.html"))
      waMap.set("CommunityXYZ", { "info": "Member since 2011" });
    else {
      issueButton.disabled = true;
    }
    updateWaTokens();
  });

  const updateWaTokens = () => {
    console.log("updateWaTokens() called, waMap:", waMap);
    console.log("current tab url:", url);
    document.getElementById('issuer-table');

    var hasTokens = waMap.size > 0;
    document.getElementById("no-tokens-div").style.display = hasTokens ? "none" : "block";
    document.getElementById("has-tokens-div").style.display = hasTokens ? "block" : "none";

    // update table

    // clear the waTable
    var waTable = document.getElementById('wa-table');
    while (waTable.rows.length > 1) {
      waTable.deleteRow(1);
    }
    // populate the waTable
    for (const [issuer, value] of waMap.entries()) {
      // if (value['count'] > 0) {
      const row = waTable.insertRow(-1);

      // Add cells for the "Select" checkbox
      const selectCell = row.insertCell(0);
      const selectInput = document.createElement('input');
      selectInput.type = 'radio';
      selectInput.name = 'selected-row';
      selectCell.appendChild(selectInput);

      // Add cells for the "Issuer", "Info" data
      const issuerCell = row.insertCell(1);
      issuerCell.textContent = issuer;

      const infoCell = row.insertCell(2);
      infoCell.textContent = value['info'];
    }

    // update storage
    chrome.storage.sync.set({ waMap: JSON.stringify([...waMap]) }, function () {
      console.log('waMap saved to storage' + JSON.stringify([...waMap]));
    });
  }

  const updateIssuers = () => {
    console.log("updateTrustedIssuers() called, issuerMap:", issuerMap);
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

  // get waMap from storage
  chrome.storage.sync.get(['waMap'], function (result) {
    console.log('waMap retrieved from storage' + result.waMap);
    if (result.waMap) {
      waMap = new Map(JSON.parse(result.waMap));
    } else {
      waMap = new Map();
    }
  });

  //    updateWaTokens();

  // get a web attestation from the current page
  issueButton.addEventListener('click', async function () {
    console.log("issueButton clicked. waMap:", waMap);
    waMap.set("CommunityXYZ", {
      "info": "Member since 2011",
      "count": 10
    });

    console.log("waMap after set:", waMap);
    updateWaTokens();
    console.log("waMap after updateWaTokens:", waMap);

    const issuerUrl = "http://localhost:8080";
    let {tokens, refreshID} = await getTokens(issuerUrl);
    if (tokens) {
      storeTokens(issuerUrl, refreshID, tokens);
    }
    console.log(tokens);
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
  presentButton.addEventListener('click', function () {
    scopeText.textContent = 'URL: ' + url.split('/').slice(-2).join('/');
    var date = new Date().toISOString();
    timeText.textContent = 'Time: ' + date;
    var wa = "uwa://eyJpc3N1ZXIiOiJDb21tdW5pdHlYWVoifQ;eyJzY29wZSI6Imh0dHBzOi8vc29jaWFsLmNvbS8iLCJkYXRlIjoiMjAyMS0wNC0xMyIsImluZm8iOiJNZW1iZXIgc2luY2UgMjAxMSJ9";
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
