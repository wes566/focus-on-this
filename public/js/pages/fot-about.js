/**
 * @typedef { import("side-drawer").SideDrawer } SideDrawer
 * @typedef { import("lit-element").LitElement } LitElement
 */

import { LitElement, html, css } from "../../web_modules/lit-element.js";
import "../../web_modules/side-drawer.js";

import "../../web_modules/@material/mwc-fab.js";

import "../components/fot-drawer.js";

/** @extends {LitElement} */
class FotAbout extends LitElement {
  static get styles() {
    return css`
      :host {
        color: var(--primary-fg-color);
        background-color: var(--primary-bg-color);
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;
        flex: 1;
      }

      main {
        max-width: 500px;
        padding: 32px 50px 0 50px;
      }

      li {
        margin-bottom: 12px;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        padding: 20px;
      }

      mwc-fab {
        --mdc-theme-secondary: var(--accent-color);
        --mdc-theme-on-secondary: var(--primary-fg-color);
        --mdc-ripple-fg-scale: 0;
        --mdc-ripple-fg-size: 0;
      }
    `;
  }

  render() {
    return html`
      <main>
        <h1>About</h1>
        <p>
          Hi, I'm Wes. I made this simple app because sometimes I need to focus
          on just one thing, and it helps to have that thing written down and
          sitting on my phone screen. When I unlock my phone it's the first
          thing I see and that reminds me of what I'm trying to focus on. And
          so, I wrote this simple app.
        </p>

        <h2>Tips For Use</h2>
        <ul>
          <li>
            Add this site to your home screen, it will act like a native app
            (home screen icon, works offline, fast).
          </li>
          <li>
            Make this your browser start page, so every time you open a new
            browser window you can have a reminder of what you are focusing on.
          </li>
          <li>
            If you are in a meeting, pull this site up and put in the purpose of
            your meeting... if any discussion in the meeting does not pertain to
            what is on the screen then point to the screen and yell gently
            remind folks to stay on topic... if your meeting doesn't have a
            simple purpose that you can capture in a short sentence then cancel
            your meeting :)
          </li>
        </ul>
      </main>
      ${this.footerTemplate}
    `;
  }

  // TODO: this can and should be shared across pages yo
  get footerTemplate() {
    return html`
      <div>
        <div class="footer">
          <mwc-fab
            class="fade-in"
            icon="menu"
            @click="${this.handleMenuClick}"
          ></mwc-fab>
        </div>
        <side-drawer id="drawer"
          ><fot-drawer @on-close="${this.handleDrawerClosed}"></fot-drawer
        ></side-drawer>
      </div>
    `;
  }

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
  handleDrawerClosed(e) {
    const drawer =
      /** @type {SideDrawer | null} */ (this.shadowRoot &&
      this.shadowRoot.getElementById("drawer"));
    if (drawer) {
      drawer.open = false;
    }
  }
}

customElements.define("fot-about", FotAbout);
