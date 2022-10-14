/**
 * The my-convert-page web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-convert-page {
    width: 100%;
    box-sizing: border-box;
  }
</style>

<div id="my-convert-page">
  Convert page
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
      //
    }
  }
)
