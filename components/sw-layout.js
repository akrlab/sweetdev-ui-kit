class Store {
    style(type, responsiveColumns, linearColumns, center) {
        return /*html*/`
            <style>
                .container-${type} {
                    max-width: 100%;
                    background: #b4b4d3;
                    min-height: 100vh;
                    display: ${type};
                }
                .container-grid {
                    grid-template-columns: ${linearColumns ? 'repeat(' + linearColumns + ', 1fr)' : 'repeat(auto-fill, ' + responsiveColumns + ')'};
                }

                ::slotted(*) {
                    ${center ? 'display\: flex;justify-content\: center;align-items\: center;' : null}
                }
            </style>
        `
    }
    html(type) {
        return /*html*/`
            <div class="container-${type}">
                <slot></slot>
            </div>
        `
    }
}


class SwLayout extends HTMLElement {
    constructor () {
        super()
    }

    get type() {
        return this.getAttribute('type')
    }

    get column() {
        return this.getAttribute('column')
    }
    
    get responsiveColumns() {
        return this.getAttribute('responsive-columns')
    }

    get bodyReset() {
        return this.hasAttribute('body-reset')
    }

    get center() {
        return this.hasAttribute('center')
    }

    get config() {
        return this.hasAttribute('config')
    }


    connectedCallback() {
        const store = new Store
        // Refactor code - remove some if's and scope

        if (this.bodyReset) {
            document.body.style.margin = '0'
        }
        
        this.attachShadow({ mode: 'open' })

        if (this.config) {
            fetch('../configuration/config.json').then(res => res.json()).then(data => {

                const { swLayout } = data
                this.shadowRoot.innerHTML = /*html*/`
                    ${store.style(swLayout.type, swLayout.responsiveColumns || '', swLayout.column || 0, swLayout.center || false)}
                    ${store.html(swLayout.type)}`

                })

        } else {

            this.shadowRoot.innerHTML = /*html*/`
            ${store.style(this.type, this.responsiveColumns || '', this.column || 0, this.center || false)}
            ${store.html(this.type)}`

        }  
    }
}

window.customElements.define('sw-layout', SwLayout)