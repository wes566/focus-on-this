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
        padding: 12px 16px;
      }

      #top-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
      }

      #bottom-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: stretch;
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
        <div>
          <h2>Focus On This</h2>
          <!-- TODO - put an X icon here to close the drawer -->
          <svg
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
        <h4>A simple app to help you focus on one thing</h4>
      </div>
      <div id="bottom-container"></div>
    `;
  }
}

customElements.define("fot-drawer", FotDrawer);
