/**
 * The my-app web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-app {
    padding: 20px;
    text-align: center;
  }

  .hidden {
    display: none;
  }
</style>

<div id="my-app">
  <h1>Unit Converter</h1>
</div>
`

customElements.define('my-app',
  /**
   * Represents a my-app element.
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
  }
)
