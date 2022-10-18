/**
 * The my-unit-selector web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import helper from '../../helper'
import { MeasurementType } from '../../measurementType'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  select {
    border: 1px solid orange;
  }

  select:focus {
    outline: 1px solid orange;
  }
</style>

<div id="my-unit-selector">
  <label>Unit: 
    <select name="unit"></select>
  </label>
</div>
`

customElements.define('my-unit-selector',
  /**
   * Represents a my-unit-selector element.
   */
  class extends HTMLElement {
    /**
     * The measurement type of the units.
     *
     * @type {MeasurementType}
     */
    #type

    /**
     * The selected unit.
     *
     * @type {string}
     */
    #unit

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.#type = MeasurementType.LENGTH

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Add event listeners.
      this.shadowRoot.querySelector('select').addEventListener('change', event => {
        this.#handleChange(event)
      })
    }

    /**
     * Gets the selected unit.
     *
     * @returns {string} The selected unit.
     */
    get unit () {
      return this.#unit
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
        this.#removeOptions()
        this.#addOptions()
      }
    }

    /**
     * Removes the options from the select element.
     */
    #removeOptions () {
      this.shadowRoot.querySelector('select').innerHTML = ''
    }

    /**
     * Adds options to the select element.
     */
    #addOptions () {
      const select = this.shadowRoot.querySelector('select')
      const options = this.#generateUnitOptions()
      for (const option of options) {
        select.appendChild(option)
      }
      this.#unit = this.shadowRoot.querySelector('select').value
    }

    /**
     * Generates option elements for the select element.
     *
     * @returns {HTMLElement[]} The array with option elements.
     */
    #generateUnitOptions () {
      const options = []

      const units = helper.getUnits(this.#type)

      for (const unit of units) {
        const option = document.createElement('option')
        option.setAttribute('value', unit)
        option.innerText = unit
        options.push(option)
      }

      return options
    }

    /**
     * Handles change events on the select element by setting the unit and dispatching a custom event.
     *
     * @param {CustomEvent} event The custom event.
     */
    #handleChange (event) {
      this.#unit = event.target.value
      this.dispatchEvent(new CustomEvent('unitChange', { bubbles: true }))
    }
  }
)
