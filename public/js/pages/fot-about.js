/**
 * @typedef { import("side-drawer").SideDrawer } SideDrawer
 * @typedef { import("lit-element").LitElement } LitElement
 */

import { LitElement, html, css } from "../../web_modules/lit-element.js";
import "../../web_modules/side-drawer.js";
import "../../web_modules/@material/mwc-fab.js";

import "../components/fot-drawer.js";

const FOCUS_ITEM_KEY = "focusitem";

/** @extends {LitElement} */
class FotApp extends LitElement {
  constructor() {
    super();

    /** @property {string} inputValue */
    this.inputValue = "";

    /** @property {boolean} isLoading */
    this.isLoading = true;

    /** @property {string} focusItem */
    this.focusItem = "";
  }

  connectedCallback() {
    super.connectedCallback();

    // TODO - move to kv storage and promises!
    this.focusItem = localStorage.getItem(FOCUS_ITEM_KEY) || "";
    this.isLoading = false;
  }

  static get styles() {
    return css`
      :host {
        color: var(--primary-fg-color);
        background-color: var(--primary-bg-color);
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        flex: 1;

        --body-padding: 80px 20px 20px 20px;
      }

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeout {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      .fade-out {
        visibility: hidden;
        animation-name: fadeout;
        animation-duration: 1s;
      }

      .fade-in {
        visibility: visible;
        animation-name: fadein;
        animation-duration: 2s;
      }

      .input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--body-padding);
      }

      .info-container {
        width: 100%;
        font-size: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      .hint-text {
        font-size: 16px;
        color: #fafafa77;
        cursor: default;
        animation-duration: 5s;
      }

      .focus-item-container {
        display: flex;
        justify-content: center;
        padding: var(--body-padding);
        font-size: 24px;
        cursor: default;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        padding: 20px;
      }

      input {
        padding: 0.5em;
        text-align: center;
        min-width: 50%;
        margin: 2em;
        border: none;
        border-radius: 3px;
        border-bottom-width: 0;
        padding: 10px;
        font-size: 24px;
      }

      .centered-label {
        cursor: default;
        text-align: center;
      }

      mwc-fab {
        --mdc-theme-secondary: var(--accent-color);
        --mdc-theme-on-secondary: var(--primary-fg-color);
        --mdc-ripple-fg-scale: 0;
        --mdc-ripple-fg-size: 0;
      }
    `;
  }

  /** @returns {import("lit-element").PropertyDeclarations} */
  static get properties() {
    return {
      focusItem: { type: String },
      inputValue: {
        type: String,
        hasChanged(newVal, oldVal) {
          const isOldEmpty = !oldVal;
          const isNewEmpty = !newVal;
          return isOldEmpty !== isNewEmpty;
        }
      }
    };
  }

  render() {
    let body = this.inputTemplate;
    if (this.isLoading) {
      body = this.loadingTemplate;
    }

    if (!!this.focusItem) {
      body = this.showFocusItemTemplate;
    }

    return html`
      ${body} ${this.footerTemplate}
    `;
  }

  get hasFocusItem() {
    return !!this.focusItem;
  }

  get loadingTemplate() {
    return html`
      <div>Loading...</div>
    `;
  }

  get inputTemplate() {
    return html`
      <div class="input-container">
        <div class="info-container">
          <p class="centered-label">
            What one thing do you want to focus on right now?
          </p>
          <input id="focusItemInput" @keyup="${this.handleKeyUp}" autofocus />
          <mwc-fab
            class="${this.hasText ? "fade-in" : "fade-out"}"
            icon="arrow_forward"
            @click="${this.handleFocusItemSubmit}"
          ></mwc-fab>
          <p
            class="${this.hasText ? "hint-text fade-in" : "hint-text fade-out"}"
          >
            or press Enter
          </p>
        </div>
      </div>
    `;
  }

  get showFocusItemTemplate() {
    return html`
      <div></div>
      <div class="focus-item-container">${this.focusItem}</div>
    `;
  }

  get footerTemplate() {
    return html`
      <div>
        <div class="footer">
          <mwc-fab
            class="fade-in"
            icon="menu"
            @click="${this.handleMenuClick}"
          ></mwc-fab>
          <mwc-fab
            class="${!!this.focusItem ? "fade-in" : "fade-out"}"
            icon="done"
            @click="${this.handleFocusItemDone}"
          ></mwc-fab>
        </div>
        <side-drawer id="drawer"
          ><fot-drawer @on-close="${this.handleDrawerClosed}"></fot-drawer
        ></side-drawer>
      </div>
    `;
  }

  // TODO - refocus the input box after a focus item is complete
  // /**
  //  *
  //  * @param {{[s:string]: any}} changedProperties
  //  */
  // updated(changedProperties) {
  //   if ("focusItem" in changedProperties) {
  //     const inputElement =
  //       this.shadowRoot && this.shadowRoot.getElementById("focusItemInput");
  //     if (!!inputElement) {
  //       inputElement.focus();
  //     }
  //   }
  // }

  /**
   * @param {Event} e
   */
  handleMenuClick(e) {
    const drawer =
      /** @type {SideDrawer | null} */ (this.shadowRoot &&
      this.shadowRoot.getElementById("drawer"));
    if (drawer !== null) {
      drawer.open = true;
    }
  }

  /**
   * @param {Event} e
   */
  handleFocusItemDone(e) {
    localStorage.removeItem(FOCUS_ITEM_KEY);
    this.focusItem = "";
    this.inputValue = "";
  }

  /**
   * @param {Event} e
   */
  handleFocusItemSubmit(e) {
    if (!this.inputValue) {
      return;
    }

    localStorage.setItem(FOCUS_ITEM_KEY, this.inputValue);

    this.focusItem = this.inputValue;
    this.inputValue = "";
  }

  /**
   * @param {KeyboardEvent} e
   */
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleFocusItemSubmit(e);
    } else if (e.target !== null) {
      this.inputValue = /** @type {HTMLInputElement} */ (e.target).value;
    }
  }

  /**
   * @param {Event} e
   */
  handleDrawerClosed(e) {
    const drawer =
      /** @type {SideDrawer | null} */ (this.shadowRoot &&
      this.shadowRoot.getElementById("drawer"));
    if (drawer) {
      drawer.open = false;
    }
  }

  get hasText() {
    return !!this.inputValue;
  }
}

customElements.define("fot-app", FotApp);
