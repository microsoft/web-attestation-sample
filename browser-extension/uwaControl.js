// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global chrome toBase64Url uwaQrEncoder uwaContentPopup PATTERN INVALID_URL WARNING_URL CHECKMARK_URL */

/**
 * Class that manages html UWA elements
 *
 * @Class Uwa
 */
// eslint-disable-next-line no-unused-vars
class Uwa {
    node
    icon
    tag
    type // qr or text
    #validation
    static #minIconSize = 16 // px
    static #uwa = [] // List of current Uwa instances
    static #initialized = false

    constructor (tag, node, validation) {
        if (Uwa.isUwaNode(node)) {
            throw new Error('Uwa already exists')
        }

        this.type = node.nodeName.toLowerCase() === 'img' ? 'QR' : 'TEXT'
        this.tag = tag
        this.node = node
        this.#validation = validation
        this.icon = Uwa.#createIcon(validation.status)
        this.#setIcon()
        this.icon.addEventListener('click', _event => {
            setTimeout(this.popup.bind(this))
        })
        this.icon.addEventListener('hover', _event => {
            // do nothing for now
        })
        if (!Uwa.#initialized) {
            window.addEventListener('resize', function () {
                Uwa.#uwa.filter(uwa => uwa.type === 'QR').forEach(u => {
                    u.updateIconPosition()
                })
            })
            Uwa.#initialized = true
        }
        Uwa.#uwa.push(this)
    }

    updateIconPosition () {
        const icon = this.icon
        const rect = this.node.getBoundingClientRect()
        const width = Math.max((rect.width * 0.1) | 0, Uwa.#minIconSize)
        const height = Math.max((rect.height * 0.1) | 0, Uwa.#minIconSize)
        icon.style.width = `${width}px`
        icon.style.height = `${height}px`
        icon.style.top = `${rect.y + window.scrollY + rect.height - height}px`
        icon.style.left = `${rect.x + window.scrollX + rect.width - width}px`
    }

    #setIcon () {
        const node = this.node
        const icon = this.icon
        if (this.type === 'QR') {
            icon.style.position = 'absolute'
            // make sure the zIndex is higher than that of the target element
            const zIndex = window.getComputedStyle(node).getPropertyValue('z-index')
            icon.style.zIndex = `${Number.parseInt(zIndex) + 1}`
            document.body.appendChild(icon)
            this.updateIconPosition()
        } else /* text-node */ {
            const tagIndex = node.textContent.indexOf(this.tag)
            node.textContent = node.textContent.replace(PATTERN, '')
            const nodeSplit = node.splitText(tagIndex)
            nodeSplit.after(icon)
        }
    }

    updateIcon () {
        switch (this.#validation.status) {
        case 'invalid_scope':
        case 'error':
            this.icon.src = INVALID_URL
            break
        case 'valid':
            this.icon.src = CHECKMARK_URL
            break
        case 'unknown_issuer' :
            this.icon.src = WARNING_URL
            break
        default:
            // eslint-disable-next-line no-debugger
            debugger
        }
    }

    // The 'Trust' button has been clicked for this untrusted UWA
    trust () {
        uwaContentPopup.hide()

        // download issuer parameters into the issuerStore
        background.downloadIssuerParams(this.#validation.issuer)
            .then(() => {
                // Now that the issuer is possibly trusted, reevaluate this tag
                background.checkUwa(this.tag).then(validation => {
                    // if we get unknown_issuer again, then the parameter download happened
                    // but the issuer is still not trusted (possibly because the kid was not found after a key change)
                    if (validation.status === 'unknown_issuer') {
                        validation.error = 'This attestation cannot be validated'
                    }
                    Uwa.updateByTag(this.tag, validation)
                    this.popup()
                })
            })
            .catch((error) => {
                this.#validation.error = error
                Uwa.updateByTag(this.tag, this.#validation)
                this.popup()
            })
    }

    // The validation status needs to be updated
    update (validation) {
        this.#validation = validation
        this.updateIcon()
        this.updateIconPosition()
    }

    popup () {
        switch (this.#validation.status) {
        case 'valid':
            // eslint-disable-next-line no-case-declarations
            const dt = (new Date(this.#validation.timestamp)).toLocaleString('en-US', {
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })
            uwaContentPopup.show(this.icon, 'Verified', CHECKMARK_URL, [
                { label: 'Issuer', value: this.#validation.issuer },
                { label: 'Scope', value: this.#validation.scope },
                { label: 'Created', value: dt },
                { label: 'Info', value: this.#validation.info },
                { label: 'About', link: `<a href='${this.#validation.about}' target='_blank'>${this.#validation.about}<a/>` }
            ])
            break
        case 'invalid_scope':
        case 'error':
            uwaContentPopup.show(this.icon, 'Invalid', INVALID_URL, [
                { label: 'Error', value: this.#validation.error }
            ])
            break
        case 'unknown_issuer':
            uwaContentPopup.show(this.icon, 'Untrusted', WARNING_URL, [
                { label: 'Issuer', value: this.#validation.issuer },
                { label: 'Error', value: this.#validation.error }
            ],
            'Trust Issuer', this.trust.bind(this))
            break

        default:
            // eslint-disable-next-line no-debugger
            debugger
        }
    }

    // Create an instance of an image element
    static #createIcon (status) {
        let path
        switch (status) {
        case 'invalid_scope':
        case 'error':
            path = INVALID_URL
            break
        case 'valid':
            path = CHECKMARK_URL
            break
        case 'unknown_issuer' :
            path = WARNING_URL
            break
        default:
            // eslint-disable-next-line no-debugger
            debugger
        }

        const img = document.createElement('img')
        img.style.height = '1em'
        img.style.width = '1em'
        img.setAttribute('src', path)
        return img
    }

    static isUwaNode (node) {
        return Uwa.#uwa.find(u => u.node === node)
    }

    static updateByTag (tag, validation) {
        Uwa.#uwa.filter(u => u.tag === tag).forEach(u => {
            u.update(validation)
        })
    }

    // Takes a DOM node that can potentially be decoded into a valid UWA tag
    static async tryDecodeNode (node) {
        let uwaTag
        if (node.textContent) {
            const match = PATTERN.exec(node.textContent)
            // the actual uwa tag from the node text
            uwaTag = match[0]
        } else /* IMG */ {
            const result = await background.fetchImage(node.src)
            if (!result.dataUrl) return undefined
            uwaTag = await Uwa.imageDataToUwa(result.dataUrl)
            if (!uwaTag) {
                return undefined
            }
        }
        const validation = await background.checkUwa(uwaTag)

        const existingUwa = Uwa.isUwaNode(node)
        if (existingUwa) {
            existingUwa.update(validation)
            return existingUwa
        }

        return new Uwa(uwaTag, node, validation)
    }

    static async imageDataToUwa (dataUrl) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // load the blob into a canvas and retrieve the imageData
            // send imageData to the qrDecoder and get back a uwa string
            const img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                const imageData = ctx.getImageData(0, 0, img.width, img.height)
                const result = uwaQrEncoder.decode(imageData.data, imageData.width, imageData.height)
                let uwaTag
                if (result?.chunks?.[0]?.data === 'uwa://') {
                    uwaTag = `uwa://${toBase64Url(result.chunks[1].bytes)}.${toBase64Url(result.chunks[2].bytes)}.${toBase64Url(result.chunks[3].bytes)}`
                }
                resolve(uwaTag)
            }
            img.src = dataUrl
        })
    }

    static tryRemove (node) {
        // node might be a container or a single element
        Uwa.#uwa = Uwa.#uwa.filter(u => {
            const remove = node.contains(u.node)
            if (remove) {
                // TODO: triggers another observer remove call (harmless but unnecessary)
                u.icon.remove()
            }
            return !remove
        })
    }
}

/**
 * Wraps message calls to background.js as async function calls
 */
// eslint-disable-next-line no-unused-vars
const background = {

    /**
     * Attempts to decode an validate4 a UWA string
     *
     * @param {string} uwaTag
     * @returns uwaData | undefined
     */
    checkUwa: async (uwaTag) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ text: 'checkUWA', string: uwaTag }, (uwaData) => {
                resolve(uwaData)
            })
        })
    },

    /**
     * Sends a url to background.js to be downloaded and converted to an DataURL string
     * This is necessary because we can't always do this in content.js with CORS restriction
     *
     * @param {string} imageUrl
     * @returns {string} dataUrl
     */
    fetchImage: async (imageUrl) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ text: 'fetchImage', string: imageUrl }, (dataUrl) => {
                resolve(dataUrl)
            })
        })
    },

    /**
     * Downloads the issuer params from the issuerUrl
     *
     * @param {string} issuerUrl
     * @returns {string} jwk
     */
    downloadIssuerParams: async (issuerUrl) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ text: 'downloadIssuerParams', string: issuerUrl }, (jwk) =>
                jwk ? resolve(jwk) : reject(new Error('Issuer Params download failed'))
            )
        })
    }
}
