const CHECKMARK_URL = chrome.runtime.getURL("icons/checkmark.svg");
const INVALID_URL = chrome.runtime.getURL("icons/invalid.svg");
const WARNING_URL = chrome.runtime.getURL("icons/warning.svg");

const template = document.createElement('TEMPLATE');
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
        </table>
    </div>

    <div class="right">
        <input id="button" type="button" value="Trust" id="button"/>
    </div>

</div>

</div>


`;

class ExtensionControl /*extends HTMLElement*/ {

    icon;
    root;
    #shadowRoot;

    constructor(element) {
        //super();

        this.root = document.createElement('DIV');
        this.icon = element;

        console.debug(`CONSTRUCTOR: custom-control`);

        // create shadow-dom
        this.#shadowRoot = this.root.attachShadow({ mode: "open" });
        this.#shadowRoot.appendChild(template.cloneNode(true).content);

        //this.root.id = id ?? 'extension-control';
        this.root.style.display = "none";

        document.body.appendChild(this.root);

        element.addEventListener('click', event => {
            if (this.root.style.display === 'none') {
                this.show();
            } else {
                this.hide();
            }
            // stop the event propogation
            // otherwise our check to see if the user clicked off the control, to close it, will fire.
            event.stopPropagation();
        });

        element.addEventListener('hover', event => {
        });
    }

    show() {
        this.root.style.display = 'block';
        this.position();
        document.addEventListener('click', outsideOfControlClickHandler.bind(this));
    }

    hide() {
        this.root.style.display = 'none';
        document.removeEventListener('click', outsideOfControlClickHandler.bind(this));
    }

    position() {
        var boundRect = this.icon.getBoundingClientRect();
        var controlRect = this.root.getBoundingClientRect();
        var left = boundRect.left + window.pageXOffset - (controlRect.width / 2) + (boundRect.width / 2);
        var top = boundRect.top + window.pageYOffset + boundRect.height;
        left = Math.max(left, 0);
        this.root.style.left = Math.min(left, window.innerWidth - controlRect.width) + "px";
        this.root.style.top = top + "px";
    }

    static verified(issuer, scope, created, info) {

        const element = icon(CHECKMARK_URL);
        const control = new ExtensionControl(element);
        const root = control.#shadowRoot;

        const img = control.#shadowRoot.querySelector("#icon");

        img.src = element.src;
        root.querySelector("#label").textContent = 'Verified';
        root.querySelector("#key1").textContent = 'Issuer';
        root.querySelector("#key2").textContent = 'Scope';
        root.querySelector("#key3").textContent = 'Created';
        root.querySelector("#key4").textContent = 'Info';
        root.querySelector("#value1").textContent = issuer;
        root.querySelector("#value2").textContent = scope;
        root.querySelector("#value3").textContent = created;
        root.querySelector("#value4").textContent = info;

        return control;
    }

    static untrusted(issuer, callback) {

        const element = icon(WARNING_URL);
        const control = new ExtensionControl(element);
        const root = control.#shadowRoot;

        const img = control.#shadowRoot.querySelector("#icon");

        img.src = element.src;
        root.querySelector("#label").textContent = 'Untrusted';

        root.querySelector("#key1").textContent = 'Issuer';
        root.querySelector("#value1").textContent = issuer;

        root.querySelector("#value4").parentNode.remove();
        root.querySelector("#value3").parentNode.remove();
        root.querySelector("#value2").parentNode.remove();

        const button = root.querySelector("#button");
        button.style.display = "block";

        button.addEventListener('click', () => {
            callback(issuer);
        })

        return control;
    }

    static invalid(message) {

        const element = icon(INVALID_URL);
        const control = new ExtensionControl(element);
        const root = control.#shadowRoot;
        const img = control.#shadowRoot.querySelector("#icon");

        img.src = element.src;
        root.querySelector("#label").textContent = 'Invalid';

        root.querySelector("#key1").textContent = 'Message';
        root.querySelector("#value1").textContent = message;

        root.querySelector("#value4").parentNode.remove();
        root.querySelector("#value3").parentNode.remove();
        root.querySelector("#value2").parentNode.remove();

        return control;
    }

}


function outsideOfControlClickHandler(event) {
    if (!this.root.contains(event.target)) {
        this.hide();
    }
}

// Create an instance of an image element
const icon = (path) => {
    const img = document.createElement('img');
    img.style.height = "1em";
    img.style.width = "1em";
    img.setAttribute("src", path);
    return img;
}

// Create an instance of each icon
const iconCheck = icon(CHECKMARK_URL);
const iconInvalid = icon(INVALID_URL);
const iconWarning = icon(WARNING_URL);