/**
 * @typedef { import("side-drawer").SideDrawer } SideDrawer
 * @typedef { import("lit-element").LitElement } LitElement
 */

import { LitElement, html, css } from "../../web_modules/lit-element.js";

/** @extends {LitElement} */
class FotDrawer extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        color: var(--primary-fg-color);
        background-color: var(--secondary-bg-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        box-sizing: border-box;
        padding: 12px 0 12px 0;
      }

      #top-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
      }

      h2 {
        padding-left: 16px;
      }

      #bottom-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: stretch;
      }

      .sxs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .icon-button:active {
        transform: translateY(4px);
      }

      .button {
        display: inline-block;
        background: var(--accent-color);
        color: white;
        text-align: center;
        padding: 15px 45px;
        margin-bottom: 50px;
      }

      /* TODO - some indicator on hover */
      .button:hover {
      }
    `;
  }

  //   /** @returns {import("lit-element").PropertyDeclarations} */
  //   static get properties() {
  //     return {};
  //   }

  render() {
    return html`
      <div id="top-container">
        <div class="sxs">
          <h2>Focus On This</h2>
          <!-- TODO - svg should be wrapped in a button for a11y -->
          <div class="icon-button">
            <svg
              @click="${this.handleCloseClick}"
              class="i-close"
              viewBox="0 0 32 32"
              width="24"
              height="24"
              fill="none"
              stroke="currentcolor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M2 30 L30 2 M30 30 L2 2"></path>
            </svg>
          </div>
        </div>
        <a class="button" role="button" href="./about">About</a>
      </div>
      <div id="bottom-container"></div>
    `;
  }

  /**
   * @param {Event} e
   */
  handleCloseClick(e) {
    const event = new Event("on-close");
    this.dispatchEvent(event);
  }
}

customElements.define("fot-drawer", FotDrawer);
