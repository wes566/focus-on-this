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

      #bottom-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: stretch;
      }

      .padded {
        padding-left: 16px;
        padding-right: 16px;
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

      .button-link {
        text-decoration: none;
        padding: 9px 18px;
        color: inherit;
      }

      .button-link:hover {
        transform: scale(1.03);
      }

      .button {
        display: inline-block;
        color: white;
        text-align: center;
        padding: 15px 45px;
        text-decoration: none;
      }

      /* TODO - some indicator on hover */
      .button:hover {
        background: var(--accent-color);
      }

      .list-button {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      .list-button > :first-child {
        margin-right: 1em;
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
        <div class="sxs padded">
          <a class="button-link" href="./"><h2>Focus On This</h2></a>
          <div class="icon-button" role="button">
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
        <a class="button" role="button" href="./about"
          ><div class="list-button">
            <svg
              id="i-info"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="32"
              height="32"
              fill="none"
              stroke="currentcolor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M16 14 L16 23 M16 8 L16 10" />
              <circle cx="16" cy="16" r="14" />
            </svg>
            <span>About</span>
          </div>
        </a>
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
