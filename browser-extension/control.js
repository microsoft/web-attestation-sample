// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* global */

const template = document.createElement('TEMPLATE')
template.innerHTML = `
<style>

    /* !important keeps the light-dom from overriding our settings */

    :host {
        all: initial;
        position: fixed;
        z-index: 10000; 
    }

    .container {
        border: 1px solid black;
        border-radius: 0.8em;
        background: #EEEEEE;
        width: auto;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        font-family: Verdana, sans-serif;
        font-size: 12px;
        padding: 0.8em;
        margin: 1em;
        line-height: 1.25;
        
    }

    .left {
        /* width: 30%; */
        box-sizing: border-box;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 0.8em;
    }

    .middle {
        padding-left: 2em;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        min-width: 20em;
    }

    .right {
        box-sizing: border-box;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 0.8em;
    }

    img {
        height: 5em;
        /* opacity: 0.2; */
    }

    label {
        font-weight: 700;
        margin-bottom: 0.4em;
        display: block;
        font-size: 13px;
    }

    td {

    }

    td.key {
        font-weight: 500;
        font-size: 11px;
        color: #808080;
    }

    td.value {
        font-weight: 400;
        font-size: 11px;
        color: #101010;
        padding-left: 2em;
    }

    table {
        margin-left: 0.4em;
    }

    #button {
        display: none;
        margin-left: 0.4em;
        padding: 0.4em 0.8em;
    }


</style>



<div class="container">

    <div class="left">
        <img id="icon"/>
    </div>

    <div class="middle">
        <label id="label"></label>
        <table id="table">
            <tr>
                <td id="key1" class="key"></td>
                <td id="value1" class="value">---------</td>
            </tr>
            <tr>
                <td id="key2" class="key"></td>
                <td id="value2" class="value">---------</td>
            </tr>
            <tr>
                <td id="key3" class="key"></td>
                <td id="value3" class="value">---------</td>
            </tr>
            <tr>
                <td id="key4" class="key"></td>
                <td id="value4" class="value">---------</td>
            </tr>
            <tr>
                <td id="key5" class="key"></td>
                <td id="value5" class="value">---------</td>
            </tr>
        </table>
    </div>

    <div class="right">
        <input id="button" type="button" value="Trust" id="button"/>
    </div>

</div>

</div>


`

/**
 * Uwa validation status popup for content.js
 * There will be a single instance of this control is re-decorated for each use
 * @class UwaContentPopup
 */
// eslint-disable-next-line no-unused-vars
class UwaContentPopup /* extends HTMLElement */ {
    container
    #shadowRoot
    #table
    #icon
    #label
    #button
    #callback

    constructor () {
        this.container = document.createElement('DIV')
        this.#shadowRoot = this.container.attachShadow({ mode: 'open' })
        this.#shadowRoot.appendChild(template.cloneNode(true).content)
        this.container.style.display = 'none'
        document.body.appendChild(this.container)
        this.#table = this.#shadowRoot.querySelector('#table')
        this.#icon = this.#shadowRoot.querySelector('#icon')
        this.#label = this.#shadowRoot.querySelector('#label')
        this.#button = this.#shadowRoot.querySelector('#button')
        this.hide()
    }

    show (element, label, iconUrl, table, buttonLabel, callback) {
        this.#label.textContent = label
        this.#label.style.display = 'block'
        if (iconUrl) {
            this.#icon.style.display = 'block'
            this.#icon.src = iconUrl
        }
        table.forEach((line, index) => {
            const tr = this.#table.rows[index]
            tr.style.display = 'table-row'
            if (line.value !== undefined || line.link !== undefined) {
                tr.cells[0].textContent = line.label
                if (line.value) {
                    tr.cells[1].textContent = line.value
                } else if (line.link) {
                    tr.cells[1].innerHTML = line.link
                }
            }
        })
        if (buttonLabel) {
            this.#button.style.display = 'block'
            this.#button.value = buttonLabel
            this.#callback = callback
            this.#button.addEventListener('click', callback)
        }
        this.container.style.display = 'block'

        // eslint-disable-next-line no-void
        void this.container.offsetWidth

        // don't position until the icon has loaded or we will get the wrong width
        this.#icon.onload = () => {
            this.position(element)
        }

        if (iconUrl === undefined) {
            this.position(element)
        }

        // eslint-disable-next-line no-unused-vars
        const closeListener = (event) => {
            const isClickInsideElement = this.container.contains(event.target)

            if (!isClickInsideElement) {
                this.hide()
                document.removeEventListener('click', closeListener)
            }
        }

        document.addEventListener('click', closeListener)
    }

    hide () {
        this.#label.textContent = ''
        Array.from(this.#table.rows).forEach(tr => {
            Array.from(tr.cells).forEach(td => {
                td.textContent = ''
            })
            tr.style.display = 'none'
        })
        this.#icon.style.display = 'none'
        this.#button.style.display = 'none'
        this.#button.removeEventListener('click', this.#callback)
        this.#callback = undefined
        this.container.style.display = 'none'
    }

    /**
     * Position the popup relative to an element fully on the screen
     *
     * @param {*} node
     * @memberof UwaContentPopup
     */
    position (element) {
        const boundRect = element.getBoundingClientRect()

        // check if the fixed element will go off the right edge of the screen
        this.container.style.left =
            boundRect.right + this.container.offsetWidth > window.innerWidth
                ? `${window.innerWidth - this.container.offsetWidth - 10}px`
                : `${boundRect.right}px`

        // check if the fixed element will go off the bottom edge of the screen
        this.container.style.top =
            boundRect.bottom + this.container.offsetHeight > window.innerHeight
                ? `${window.innerHeight - this.container.offsetHeight - 10}px`
                : this.container.style.top = `${boundRect.bottom}px`
    }
}

// eslint-disable-next-line no-unused-vars
const uwaContentPopup = new UwaContentPopup()
