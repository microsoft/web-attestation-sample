// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PATTERN } from './global'

let _addCallback: (node: Node) => void
let _observer: MutationObserver
let _scanImages = false
let _started = false

/**
 * Internal constructor called on initialization
 * Sets up the MutationObserver
 * @private
 */
function initialize (addCallback: (node: Node) => void, removeCallback: (node: Node) => void): void {
  _addCallback = addCallback
  _observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(n => {
        if (!n.isConnected /* element no longer in the DOM */) {
          return
        }
        _scanDomText(n)
        _scanDomImg(n as HTMLImageElement)
      })
      mutation.removedNodes.forEach(n => {
        removeCallback(n)
      })
      // an IMG element may have its src property dynamically updated
      if (
        _scanImages &&
                mutation.attributeName === 'src' &&
                (mutation.target as Element).tagName.toLowerCase() === 'img'
      ) {
        const img = mutation.target as HTMLImageElement
        // remove the previous UWA for this IMG (if it exists)
        removeCallback(img)
        // see if the new IMG src is a UWA
        img.onload = (e: Event) => { addCallback(e.target as Node) }
      }
    })
  })
}

/**
 * Scans a DOM element and its children for text-nodes matching the UWA pattern
 * For each matching text-node, the callback is invoked
 *
 * @param {Element} element
 * @returns {void}
 * @private
 */
function _scanDomText (element: Node): void {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    { acceptNode: (e: HTMLElement) => PATTERN.test(e.textContent ?? '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP }//,
    // false
  )
  while (walker.nextNode() != null) {
    _addCallback(walker.currentNode)
  }
}

/**
 * Scans a DOM element and its children for IMG nodes
 * For each matching IMG node, the callback is invoked
 * If an IMG node is not yet loaded, we'll wait until it is
 * This will do nothing if the _scanImages property is false
 *
 * @param {Element} element
 * @returns {void}
 * @private
 */
function _scanDomImg (element: HTMLElement): void {
  if (!_scanImages) return

  const callback = _addCallback
  if (element.nodeType !== 1 /* must be an element */) return

  [element, ...Array.from(element.querySelectorAll('img'))].forEach((img) => {
    if ((img as HTMLImageElement).complete /* img is loaded */) {
      callback(img)
    } else /* img not loaded */ {
      img.onload = (n: Event) => { callback(img) }
    }
  })
}

/**
 * Starts the scanner.
 * Text-nodes matching the UWA pattern and IMG elements (if enabled) are sent to the addCallback
 * Returned IMG element will be in a 'loaded' state
 * Nodes that are removed from the DOM are sent to the removeCallback
 *
 * @public
 * @param {(node: Node) => void} addCallback
 * @param {(node: Node) => void} removeCallback
 * @returns {void}
 */
function start (addCallback: (n: Node) => void, removeCallback: (n: Node) => void): void {
  // eslint-disable-next-line no-new
  initialize(addCallback, removeCallback)
  _scanDomText(document.body)
  _scanDomImg(document.body)
  _observer.observe(document.body, { childList: true, subtree: true, attributes: true })
  _started = true
  // characterData: true, to capture dynamic text updates
}

/**
 * Stops the scanner.
 *
 * @public
 */
function stop (): void {
  _observer.disconnect()
  _started = false
}

export const scanner: Scanner = {
  start,
  stop,
  scanImages: false
}

/**
 * Get the value of the scanImages property.
 *
 * @returns {boolean} The value of the scanImages property.
 * @name scanImages
 * @alias getscanImages
 * @public
 */
Object.defineProperty(scanner, 'scanImages', {

  /**
   * Set the value of the scanImages property.
   * Setting to 'true' will trigger an immediate scan for images
   *
   * @param {boolean} bool turn IMG scanning on or off
   * @returns {void}
   * @name Scanner#setscanImages
   * @public
   */
  set: function (bool) {
    _scanImages = bool
    if (_scanImages && _started) {
      _scanDomImg(document.body)
    }
  },
  get: function () {
    return _scanImages
  }
})

interface Scanner {
  start: typeof start
  stop: typeof stop
  scanImages: boolean
}
