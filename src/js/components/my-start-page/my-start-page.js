/**
 * The my-start-page web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import { converter } from '../../../../modules/converter/src/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-start-page {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  h1 {
    color: orange;
    text-align: left;
  }

  h2 {
    color: orange;
  }

  #welcome {
    font-size: 1.2rem;
  }

  ul {
    list-style-position: inside;
  }

  li {
    color: orange;
    font-weight: bold;
  }
</style>

<div id="my-start-page">
  <h1>Unit Converter</h1>
  <h2>Welcome to Unit Converter</h2>
  <p>- a tool for converting and comparing measurements of different units.</p>
  <p>Supported measurrement types:<p>
  <ul></ul>
</div>
`

customElements.define('my-start-page',
  /**
   * Represents a my-start-page element.
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
      //
    }

    connectedCallback () {
      const measurementTypes = converter.measurementTypes
      const list = this.shadowRoot.querySelector('ul')
      for (const type of measurementTypes) {
        const item = document.createElement('li')
        item.innerText = type
        list.appendChild(item)
      }
    }

    disconnectedCallback () {
      this.shadowRoot.querySelector('ul').innerHTML = ''
    }
  }
)
