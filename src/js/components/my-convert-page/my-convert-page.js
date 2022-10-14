/**
 * The my-convert-page web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import { converter } from '../../../../modules/converter/src/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-convert-page {
    width: 100%;
    box-sizing: border-box;
    text-justify: center;
  }

  h1 {
    text-justify: left;
    color: orange;
  }
</style>

<div id="my-convert-page">
  <h1>Convert</h1>
  <form id="type">
    <label for="measurement-types">Select measurement type:</label>
    <select id="measurement-types" name="measurement-type">
      <option value="length">Length</option>
      <option value="time">Time</option>
      <option value="weight">Weight</option>
      <option value="volume">Volume</option>
      <option value="speed">Speed</option>
    </select>
  </form>
  <form id="measurements">
    <fieldset id="from">
      <legend>From</legend>
    </fieldset>
    <fieldset id="to">
      <legend>To</legend>
      <label>Unit: 
        <select name="unit"></select>
      </label>
    </fieldset>
  </form>
</div>
`

customElements.define('my-convert-page',
  /**
   * Represents a my-convert-page element.
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
      this.shadowRoot.querySelector('select').addEventListener('change', event => {
        this.#handleChangeSelectType(event)
      })
    }

    connectedCallback () {
      this.#appendMeasurement()
      this.#appendOptions()
    }

    disconnectedCallback () {
      this.#removeMeasurements()
      this.#removeOptions()
    }

    #appendMeasurement () {
      const template = this.#getMeasurementTemplate()
      const nodeToAppend = template.content.cloneNode(true)
      const select = nodeToAppend.querySelector('select')

      const options = this.#generateUnitOptions()
      for (const option of options) {
        select.appendChild(option)
      }

      this.shadowRoot.querySelector('#from').appendChild(nodeToAppend)
    }

    #getMeasurementTemplate () {
      const template = document.createElement('template')
      template.innerHTML = `
      <fieldset>
        <legend>Measurement</legend>
        <label>Quantity: 
          <input type="text" name="quantity">
        </label>
        <label>Unit: 
          <select name="unit"></select>
        </label>
      </fieldset>
      `

      return template
    }

    #generateUnitOptions () {
      const options = []

      const type = this.shadowRoot.querySelector('#measurement-types').value
      const units = this.#getUnits(type)

      for (const unit of units) {
        const option = document.createElement('option')
        option.setAttribute('value', unit)
        option.innerText = unit
        options.push(option)
      }

      return options
    }

    #appendOptions() {
      const select = this.shadowRoot.querySelector('#to select')
      const options = this.#generateUnitOptions()
      for (const option of options) {
        select.appendChild(option)
      }
    }

    #removeMeasurements () {
      const parent = this.shadowRoot.querySelector('#from')
      while (parent.children.length > 1) {
        parent.removeChild(parent.lastChild)
      }
    }

    #removeOptions() {
      const select = this.shadowRoot.querySelector('#to select')
      select.innerHTML = ''
    }

    #handleChangeSelectType (event) {
      this.#removeMeasurements()
      this.#appendMeasurement()
      this.#removeOptions()
      this.#appendOptions()
    }

    #getUnits (type) {
      let units
      if (type === 'length') {
        units = converter.lengthUnits
      } else if (type === 'time') {
        units = converter.timeUnits
      } else if (type === 'weight') {
        units = converter.weightUnits
      } else if (type === 'volume') {
        units = converter.volumeUnits
      } else if (type === 'speed') {
        units = converter.speedUnits
      }
      return units
    }
  }
)
