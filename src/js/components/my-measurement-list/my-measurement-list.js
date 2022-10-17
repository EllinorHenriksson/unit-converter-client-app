/**
 * The my-measurement-list web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-measurement'
import helper from '../../helper'
import { converter } from '../../../../modules/converter/src'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>

<div id="my-measurement-list">
  <my-measurement type="length"></my-measurement>
  <button id="add">Add</button>
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

    clear () {
      this.shadowRoot.querySelectorAll('my-measurement').forEach(measurement => {
        measurement.remove()
      })

      this.#addMeasurement()
    }

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

    getMerge (unit) {
      helper.validateUnit(unit, this.#type)
      const measurements = this.#getMeasurementsAsObjects()
      return converter.mergeAllInto(measurements, unit)
    }

    #getMeasurementsAsObjects () {
      const measurementElemets = this.shadowRoot.querySelectorAll('my-measurement')
      const measurementObjects = []
      measurementElemets.forEach(measurement => {
        measurementObjects.push(this.#convertMeasurementToObject(measurement))
      })
      return measurementObjects
    }

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

    #removeMeasurement (measurement) {
      measurement.remove()
      if (this.shadowRoot.querySelectorAll('my-measurement').length === 0) {
        this.#addMeasurement()
      }

      this.#dispatchUpdateEvent()
    }

    #addMeasurement () {
      const measurement = document.createElement('my-measurement')
      measurement.setAttribute('type', this.#type)
      this.#addEventListenersToMeasurement(measurement)
      const parent = this.shadowRoot.querySelector('#my-measurement-list')
      parent.insertBefore(measurement, parent.lastElementChild)
    }

    #dispatchUpdateEvent () {
      this.dispatchEvent(new CustomEvent('update', { bubbles: true }))
    }
  }
)
