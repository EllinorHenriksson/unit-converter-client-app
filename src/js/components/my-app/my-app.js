/**
 * The my-app web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-navbar'
import '../my-start-page'
import '../my-convert-page'
import '../my-compare-page'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-app {
    width: 100%;
    box-sizing: border-box
  }

  .hidden {
    display: none;
  }
</style>

<div id="my-app">
  <my-navbar></my-navbar>
  <main>
    <my-start-page></my-start-page>
    <my-convert-page class="hidden"></my-convert-page>
    <my-compare-page class="hidden"></my-compare-page>
  </main>
</div>
`

customElements.define('my-app',
  /**
   * Represents a my-app element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Add event listeners.
      this.shadowRoot.querySelector('my-navbar').addEventListener('clickLink', event => {
        this.#handleClickLink(event)
      })
    }

    #handleClickLink (event) {
      const targetId = event.detail.targetId

      if (targetId === 'nav-start-page') {
        this.#showStartPage()
      } else if (targetId === 'nav-convert-page') {
        this.#showConvertPage()
      } else {
        this.#showComparePage()
      }
    }

    #showStartPage () {
      this.shadowRoot.querySelector('my-start-page').classList.remove('hidden')
      this.shadowRoot.querySelector('my-convert-page').classList.add('hidden')
      this.shadowRoot.querySelector('my-compare-page').classList.add('hidden')
    }

    #showConvertPage () {
      this.shadowRoot.querySelector('my-convert-page').classList.remove('hidden')
      this.shadowRoot.querySelector('my-start-page').classList.add('hidden')
      this.shadowRoot.querySelector('my-compare-page').classList.add('hidden')
    }

    #showComparePage () {
      this.shadowRoot.querySelector('my-compare-page').classList.remove('hidden')
      this.shadowRoot.querySelector('my-start-page').classList.add('hidden')
      this.shadowRoot.querySelector('my-convert-page').classList.add('hidden')
    }
  }
)
