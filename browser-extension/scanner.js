// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global PATTERN */

/**
 * Scans DOM for elements that are candidates for UWA decoding
 * The global PATTERN is used for filtering UWA text-nodes
 *
 * @ Scanner
 */
// eslint-disable-next-line no-unused-vars
const Scanner = (function () {
    // Private variables
    let _addCallback
    let _observer
    let _scanImages = false
    let _started = false

    /**
     * Internal constructor called on initialization
     * Sets up the MutationObserver
     * @private
     * @constructor
     * @ignore
     */
    function Scanner (addCallback, removeCallback) {
        _addCallback = addCallback
        _observer = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(mutation => {
                mutation.addedNodes.forEach(n => {
                    if (n.isConnected === false /* element no longer in the DOM */) {
                        return
                    }
                    _scanDomText(n)
                    _scanDomImg(n)
                })
                mutation.removedNodes.forEach(n => {
                    removeCallback(n)
                })
                // an IMG element may have its src property dynamically updated
                if (_scanImages && mutation.attributeName === 'src' && mutation.target.tagName.toLowerCase() === 'img') {
                    // remove the previous UWA for this IMG (if it exists)
                    removeCallback(mutation.target)
                    // see if the new IMG src is a UWA
                    mutation.target.onload = (e) => addCallback(e.target)
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
    function _scanDomText (element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            { acceptNode: (e) => PATTERN.test(e.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP },
            false
        )
        while (walker.nextNode()) {
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
    function _scanDomImg (element) {
        if (_scanImages === false) return

        const callback = _addCallback
        if (element.nodeType !== 1 /* must be an element */) return

        [element, ...element.querySelectorAll('img')].forEach((img) => {
            if (img.complete /* img is loaded */) {
                callback(img)
            } else /* img not loaded */ {
                img.onload = (n) => callback(n.target)
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
    Scanner.start = function (addCallback, removeCallback) {
        // eslint-disable-next-line no-new
        new Scanner(addCallback, removeCallback)
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
    Scanner.stop = function () {
        _observer.stop()
        _started = false
    }

    /**
     * Get the value of the scanImages property.
     *
     * @returns {boolean} The value of the scanImages property.
     * @name scanImages
     * @alias getscanImages
     * @public
     */
    Object.defineProperty(Scanner, 'scanImages', {

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
            if (_scanImages === true && _started === true) {
                _scanDomImg(document.body)
            }
        },
        get: function () {
            return _scanImages
        }
    })

    return Scanner
})()
