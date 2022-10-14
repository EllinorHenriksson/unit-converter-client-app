/**
 * The my-navbar web component module.
 *
 * @author Ellinor Henriksson <eh224kr@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  #my-navbar {
    width: 100%;
    box-sizing: border-box;
    background-color: grey;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  #nav-logo {
    font-size: 1.3rem;
  }

  #nav-links {
    font-size: 1.2rem;
    display: flex;
    gap: 1rem;
  }

  a {
    cursor: pointer;
    color: white;
    text-decoration: none;
  }

  a:hover, a:active {
    color: orange;
  }

</style>

<div id="my-navbar">
  <div id="nav-logo">
    <a href="#" id="nav-start-page">Unit Converter</a>
  </div>
  <div id="nav-links">
    <a href="#" id="nav-convert-page">Convert</a>
    <a href="#" id="nav-compare-page">Compare</a>
  </div>
</div>
`

customElements.define('my-navbar',
  /**
   * Represents a my-navbar element.
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
      const links = this.shadowRoot.querySelectorAll('a')
      links.forEach(link => {
        link.addEventListener('click', event => {
          this.#handleClick(event)
        })
      })
    }

    #handleClick (event) {
      const targetId = event.target.getAttribute('id')

      // Dispatches a custom event
      this.dispatchEvent(new window.CustomEvent('clickLink', { detail: { targetId }, bubbles: true }))
    }
  }
)
