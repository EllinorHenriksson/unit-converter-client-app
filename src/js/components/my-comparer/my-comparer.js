/**
 * The my-comparer web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

import helper from '../../helper'
import '../my-measurement-list'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>

<div id="my-comparer">
  <form id="type">
    <label for="measurement-types">Measurement type:</label>
    <select id="measurement-types" name="measurement-type">
      <option value="length">Length</option>
      <option value="time">Time</option>
      <option value="weight">Weight</option>
      <option value="volume">Volume</option>
    </select>
  </form>
  <form id="measurements">
    <fieldset id="groupA">
      <legend>A</legend>
      <my-measurement-list></my-measurement-list>
    </fieldset>
    <fieldset id="groupB">
      <legend>B</legend>
      <my-measurement-list></my-measurement-list>
    </fieldset>
    <h3>Result</h3>
    <div id="result"> - </div>
    <button id="clear">Clear</button>
  </form>
</div>
`

customElements.define('my-comparer',
  /**
   * Represents a my-comparer element.
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

      this.shadowRoot.querySelectorAll('my-measurement-list').forEach(list => {
        list.addEventListener('update', () => {
          this.#compare()
        })
      })

      this.shadowRoot.querySelector('#clear').addEventListener('click', event => {
        event.preventDefault()
        this.#clear()
      })
    }

    #handleChangeSelect (event) {
      this.#type = event.target.value
      this.shadowRoot.querySelectorAll('my-measurement-list').forEach(list => {
        list.setAttribute('type', this.#type)
      })

      this.#compare()
    }

    #compare () {
      const unit = this.#getStandardUnit()
      const mergeA = this.shadowRoot.querySelector('#groupA my-measurement-list').getMerge(unit)
      const mergeB = this.shadowRoot.querySelector('#groupB my-measurement-list').getMerge(unit)

      let text = ' - '
      if (mergeA.isEqualTo(mergeB)) {
        text = 'A = B'
      } else if (mergeA.isGreaterThan(mergeB)) {
        text = 'A > B'
      } else if (mergeA.isLessThan(mergeB)) {
        text = 'A < B'
      }

      this.shadowRoot.querySelector('#result').innerText = text
    }

    #getStandardUnit () {
      const units = helper.getUnits(this.#type)
      return units[0]
    }

    #clear () {
      this.shadowRoot.querySelectorAll('my-measurement-list').forEach(list => list.clear())
      this.#compare()
    }
  }
)
