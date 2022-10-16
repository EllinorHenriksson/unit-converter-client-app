/**
 * The my-measurement web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import helper from '../../helper'
import '../my-unit-selector'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  .invalid {
    background-color: red;
  }
</style>

<div id="my-measurement">
  <fieldset>
    <legend>Measurement</legend>
    <label>Quantity: 
      <input type="text" name="quantity">
    </label>
    <my-unit-selector type="length"></my-unit-selector>
  </fieldset>
  <button>Remove</button>
</div>
`

customElements.define('my-measurement',
  /**
   * Represents a my-mesurement element.
   */
  class extends HTMLElement {
    #type
    #quantity

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.#type = 'length'

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Add event listeners.
      this.shadowRoot.querySelector('input').addEventListener('input', event => {
        this.#handleInput(event)
      })

      this.shadowRoot.querySelector('my-unit-selector').addEventListener('unitChange', event => {
        this.#handleUnitChange()
      })

      this.shadowRoot.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault()
        this.#handleClick()
      })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['type']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {string} oldValue - The old attribute value.
     * @param {string} newValue - The new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'type' && newValue !== oldValue) {
        helper.validateMeasurementType(newValue)
        this.#type = newValue
        this.shadowRoot.querySelector('my-unit-selector').setAttribute('type', newValue)
      }
    }

    get quantity () {
      return this.#quantity
    }

    get unit () {
      return this.shadowRoot.querySelector('my-unit-selector').unit
    }

    #handleInput (event) {
      try {
        this.#validateInput(event.target.value)
        event.target.classList.remove('invalid')
        this.#quantity = Number(event.target.value)
        this.dispatchEvent(new window.CustomEvent('quantityInput', { bubbles: true }))
      } catch (error) {
        event.target.classList.add('invalid')
      }
    }

    #validateInput (input) {
      const value = Number(input)
      if (isNaN(value) || value < 0) {
        throw new Error()
      }
    }

    #handleUnitChange () {
      this.dispatchEvent(new CustomEvent('unitChange', { bubbles: true }))
    }

    #handleClick () {
      this.dispatchEvent(new CustomEvent('removeMeasurement', { bubbles: true }))
    }
  }
)
