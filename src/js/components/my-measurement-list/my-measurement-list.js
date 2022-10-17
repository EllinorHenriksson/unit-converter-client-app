/**
 * The my-measurement-list web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-measurement'
import helper from '../../helper'
import { converter } from '../../../../modules/converter/src'

const ADD = new URL('./images/add.png', import.meta.url)

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  button {
    background: no-repeat center/80% url("${ADD}");
    border: none;
    width: 20px;
    height: 20px;
    margin: 5px;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  button:hover, button:active {
    cursor: pointer;
  }
</style>

<div id="my-measurement-list">
  <my-measurement type="length"></my-measurement>
  <button id="add"></button>
</div>
`

customElements.define('my-measurement-list',
  /**
   * Represents a my-measurement-list element.
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
      this.#addEventListenersToMeasurement(this.shadowRoot.querySelector('my-measurement'))

      this.shadowRoot.querySelector('#add').addEventListener('click', event => {
        event.preventDefault()
        this.#addMeasurement()
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
        this.shadowRoot.querySelectorAll('my-measurement').forEach(measurement => {
          measurement.setAttribute('type', newValue)
        })
      }
    }

    /**
     * Clears the list from measurements.
     */
    clear () {
      this.shadowRoot.querySelectorAll('my-measurement').forEach(measurement => {
        measurement.remove()
      })

      this.#addMeasurement()
    }

    /**
     * Adds event listeners to a my-measurement custom element.
     *
     * @param {HTMLElement} measurement The my-measurement element.
     */
    #addEventListenersToMeasurement (measurement) {
      measurement.addEventListener('quantityInput', () => {
        this.#dispatchUpdateEvent()
      })
      measurement.addEventListener('unitChange', () => {
        this.#dispatchUpdateEvent()
      })
      measurement.addEventListener('removeMeasurement', event => {
        this.#removeMeasurement(event.target)
      })
    }

    /**
     * Gets a merge of all the measurements contained in the list, in a specific unit.
     *
     * @param {string} unit The unit to merge the measurements into.
     * @returns {object} A measurement object.
     */
    getMerge (unit) {
      helper.validateUnit(unit, this.#type)
      const measurements = this.#getMeasurementsAsObjects()
      return converter.mergeAllInto(measurements, unit)
    }

    /**
     * Creates measurement objects from the measurement elements in the list and returns them in an array.
     *
     * @returns {object[]} The array of measurement objects.
     */
    #getMeasurementsAsObjects () {
      const measurementElemets = this.shadowRoot.querySelectorAll('my-measurement')
      const measurementObjects = []
      measurementElemets.forEach(measurement => {
        measurementObjects.push(this.#convertMeasurementToObject(measurement))
      })
      return measurementObjects
    }

    /**
     * Converts a measurement element into a measurement object and returns it.
     *
     * @param {HTMLElement} measurement The my-measurement element.
     * @returns {object} The resulting measurement object.
     */
    #convertMeasurementToObject (measurement) {
      let measurementObject
      if (measurement.getAttribute('type') === 'length') {
        measurementObject = converter.length(measurement.quantity, measurement.unit)
      } else if (measurement.getAttribute('type') === 'time') {
        measurementObject = converter.time(measurement.quantity, measurement.unit)
      } else if (measurement.getAttribute('type') === 'weight') {
        measurementObject = converter.weight(measurement.quantity, measurement.unit)
      } else if (measurement.getAttribute('type') === 'volume') {
        measurementObject = converter.volume(measurement.quantity, measurement.unit)
      } else if (measurement.getAttribute('type') === 'speed') {
        measurementObject = converter.speed(measurement.quantity, measurement.unit)
      }

      return measurementObject
    }

    /**
     * Removes a measurement from the list.
     *
     * @param {HTMLElement} measurement The my-measurement custom element.
     */
    #removeMeasurement (measurement) {
      measurement.remove()
      if (this.shadowRoot.querySelectorAll('my-measurement').length === 0) {
        this.#addMeasurement()
      }

      this.#dispatchUpdateEvent()
    }

    /**
     * Adds a measurement to the list.
     */
    #addMeasurement () {
      const measurement = document.createElement('my-measurement')
      measurement.setAttribute('type', this.#type)
      this.#addEventListenersToMeasurement(measurement)
      const parent = this.shadowRoot.querySelector('#my-measurement-list')
      parent.insertBefore(measurement, parent.lastElementChild)
    }

    /**
     * Dispatches a custom event that lets the parent element know that the list has been updated in some way.
     */
    #dispatchUpdateEvent () {
      this.dispatchEvent(new CustomEvent('update', { bubbles: true }))
    }
  }
)
