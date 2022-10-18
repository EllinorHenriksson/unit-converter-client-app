/**
 * The my-start-page web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import { MeasurementType } from '../../measurementType'

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
  <p>Supported measurement types:<p>
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
    }

    /**
     * Appends the available measurement types to a list when the web component is mounted to the DOM.
     */
    connectedCallback () {
      const list = this.shadowRoot.querySelector('ul')
      for (const type in MeasurementType) {
        const item = document.createElement('li')
        item.innerText = MeasurementType[type]
        list.appendChild(item)
      }
    }

    /**
     * Removes the measurement types from the list when the web component is unmounted.
     */
    disconnectedCallback () {
      this.shadowRoot.querySelector('ul').innerHTML = ''
    }
  }
)
