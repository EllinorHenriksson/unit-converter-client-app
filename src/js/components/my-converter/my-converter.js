/**
 * The my-converter web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-measurement'
import '../my-unit-selector'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>

<div id="my-converter">
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
      <my-measurement type="length"></my-measurement>
      <button id="add">Add</button>
    </fieldset>
    <fieldset id="to">
      <legend>To</legend>
      <my-unit-selector type="length"></my-unit-selector>
    </fieldset>
    <h3>Result</h3>
    <div id="result">0</div>
    <button id="clear">Clear</button>
  </form>
</div>
`

customElements.define('my-converter',
  /**
   * Represents a my-converter element.
   */
  class extends HTMLElement {
    #type
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.#type = 'length'

      // Attach a shadow DOM tree to this element and append the template to the shadow root.
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      // Add event listeners.
      this.shadowRoot.querySelector('#measurement-types').addEventListener('change', event => {
        this.#handleChangeSelect(event)
      })

      this.#addEventListenersToMeasurement(this.shadowRoot.querySelector('my-measurement'))

      this.shadowRoot.querySelector('#add').addEventListener('click', event => {
        event.preventDefault()
        this.#addMeasurement()
      })

      this.shadowRoot.querySelector('my-unit-selector').addEventListener('unitChange', () => {
        this.#convert()
      })

      this.shadowRoot.querySelector('#clear').addEventListener('click', event => {
        event.preventDefault()
        this.#clearConverter()
      })
    }

    #handleChangeSelect (event) {
      this.#type = event.target.value

      this.shadowRoot.querySelectorAll('my-measurement').forEach(measurement => {
        measurement.setAttribute('type', this.#type)
      })

      this.shadowRoot.querySelector('my-unit-selector').setAttribute('type', this.#type)

      this.#convert()
    }

    #addEventListenersToMeasurement (measurement) {
      measurement.addEventListener('quantityInput', () => {
        this.#convert()
      })
      measurement.addEventListener('unitChange', () => {
        this.#convert()
      })
      measurement.addEventListener('removeMeasurement', event => {
        this.#removeMeasurement(event.target)
      })
    }

    #addMeasurement () {
      const measurement = document.createElement('my-measurement')
      measurement.setAttribute('type', this.#type)
      this.#addEventListenersToMeasurement(measurement)
      const parent = this.shadowRoot.querySelector('#from')
      parent.insertBefore(measurement, parent.lastElementChild)
    }

    #removeMeasurement (measurement) {
      measurement.remove()
      if (this.shadowRoot.querySelectorAll('my-measurement').length === 0) {
        this.#addMeasurement()
      }
      this.#convert()
    }

    #convert () {
      // TODO
      console.log('convert');
      const result = 0
      this.shadowRoot.querySelector('#result').innerText = result
    }

    #clearConverter () {
      this.#removeMeasurements()
      this.#removeUnitSelector()
      this.#addMeasurement()
      this.#addUnitSelector()
      this.#convert()
    }

    #removeMeasurements () {
      this.shadowRoot.querySelectorAll('my-measurement').forEach(measurement => {
        measurement.remove()
      })
    }

    #removeUnitSelector () {
      this.shadowRoot.querySelector('my-unit-selector').remove()
    }

    #addUnitSelector () {
      const unitSelector = document.createElement('my-unit-selector')
      unitSelector.setAttribute('type', this.#type)
      this.shadowRoot.querySelector('#to').appendChild(unitSelector)
    }
  }
)
