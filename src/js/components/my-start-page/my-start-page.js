/**
 * The my-start-page web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-start-page {
    width: 100%;
    box-sizing: border-box;
  }
</style>

<div id="my-start-page">
  Start page
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

      // Add event listeners.
      //
    }
  }
)
