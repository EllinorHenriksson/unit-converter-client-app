/**
 * The my-converter web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import '../my-unit-selector'
import '../my-measurement-list'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>

<div id="my-converter">
  <form id="type">
    <label for="measurement-types">Measurement type:</label>
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
      <my-measurement-list></my-measurement-list>
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

      this.shadowRoot.querySelector('my-measurement-list').addEventListener('update', () => {
        this.#convert()
      })

      this.shadowRoot.querySelector('my-unit-selector').addEventListener('unitChange', () => {
        this.#convert()
      })

      this.shadowRoot.querySelector('#clear').addEventListener('click', event => {
        event.preventDefault()
        this.#clear()
      })
    }

    #handleChangeSelect (event) {
      this.#type = event.target.value
      this.shadowRoot.querySelector('my-measurement-list').setAttribute('type', this.#type)
      this.shadowRoot.querySelector('my-unit-selector').setAttribute('type', this.#type)

      this.#convert()
    }

    #convert () {
      const unit = this.shadowRoot.querySelector('my-unit-selector').unit
      const merge = this.shadowRoot.querySelector('my-measurement-list').getMerge(unit)
      this.shadowRoot.querySelector('#result').innerText = merge.quantity
    }

    #clear () {
      this.shadowRoot.querySelector('my-measurement-list').clear()
      this.#removeUnitSelector()
      this.#addUnitSelector()
      this.#convert()
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
