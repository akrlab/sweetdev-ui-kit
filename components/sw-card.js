class Store {
    style(padding, size, center, border) {
        return /*html*/`
            <style>
                :root {
                    box-sizing: border-box;
                }
                .card {
                    width: ${size}0%;
                    height: ${size}0%;
                    background: #fff;
                    ${border ? 'border-radius\: ' + border + 'px;' : null}
                    ${center ? 'display\: flex;justify-content\: center;align-items\: center;' : null}
                }
                .card__padding {
                    padding: ${padding}px;
                    box-sizing: border-box;
                }
            </style>
        `
    }
    html(padding, border) {
        return /*html*/`
            <div class="card ${padding ? 'card__padding' : ''} card__border">
                <slot></slot>
            </div>
        `
    }
}


class SwCard extends HTMLElement {
    constructor() {
        super()
    }

    get padding() {
        return this.getAttribute('padding')
    }

    get size() {
        return this.getAttribute('size')
    }
    get borderRadius() {
        return this.getAttribute('border-radius')
    }

    get center() {
        return this.hasAttribute('center')
    }

    get config() {
        return this.hasAttribute('config')
    }

    connectedCallback() {
        const store = new Store

        this.attachShadow({ mode: 'open' })
        
        if (this.config) {
            fetch('../configuration/config.json').then(res => res.json()).then(data => {

                const { swCard } = data
                this.shadowRoot.innerHTML = /*html*/`
                    ${store.style(swCard.padding || null, swCard.size || 10, swCard.center || false, swCard.borderRadius || 0)}
                    ${store.html(swCard.padding || null, swCard.borderRadius || 0)}`

            })

        } else {

            this.shadowRoot.innerHTML = /*html*/`
            ${store.style(this.padding || null, this.size || 10, this.center || false, this.borderRadius || 0)}
            ${store.html(this.padding || null, this.borderRadius || 0)}`

        }
    }
}

window.customElements.define('sw-card', SwCard)