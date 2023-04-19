const template = document.createElement('TEMPLATE');
template.innerHTML = `
<style>

    /* This refers to the custom control itself within the shadow-dom */
    :host {
        all: initial;
        position: fixed;
        z-index: 10000;     
        background: #AAAAAA;
        border: 1px solid black;
        border-radius: 0.2em;
        padding: 0.5em !important;
        margin: 1em !important;
        box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.4);
    }

    /* !important keeps the light-dom from overriding our settings */

</style>

<label>Extension Control</label>
<textarea>Some text</textarea>
<input type='button' value='button'/>
`;

class ExtensionControl /*extends HTMLElement*/ {

    #boundElement;
    root;

    constructor(id, element) {
        //super();

        this.root = document.createElement('DIV');
        this.#boundElement = element;

        console.debug(`CONSTRUCTOR: custom-control`);

        // create shadow-dom
        const shadowRoot = this.root.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true).content);

        this.root.id = id;
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
        var boundRect = this.#boundElement.getBoundingClientRect();
        var controlRect = this.root.getBoundingClientRect();
        var left = boundRect.left + window.pageXOffset - (controlRect.width / 2) + (boundRect.width / 2);
        var top = boundRect.top + window.pageYOffset + boundRect.height;
        this.root.style.left = left + "px";
        this.root.style.top = top + "px";
    }

}


function outsideOfControlClickHandler(event) {
    if (!this.root.contains(event.target)) {
        this.hide();
    }
}