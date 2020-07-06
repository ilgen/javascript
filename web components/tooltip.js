class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some dummmy tooltip text.';
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `<style>
        div { background-color: black;
        color: white;
        position: absolute
        z-index: 10; 
        }
        </style>
        <slot>Some default</slot><span>(?)</span>
        `;
    }

    connectedCallback() { // must use this method to access the DOM for custom elements
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._showTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() { // psudo-private called from inside internally or outside the class, _ do not call
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('cti-tooltip', Tooltip); // use double words to ensure custom uniqueness
