import '@spectrum-web-components/styles/all-large-light.css';

import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import '@spectrum-web-components/card/sp-card';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import '../user-profile.comp.js';

import {LitElement, html, css} from 'lit';
import {firebase} from '../../services/firebase.service.js';

export class Home extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-top: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  static get properties() {
    return {
      isLoading: {type: Boolean},
      isAuth: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.isLoading = true;
    this.isAuth = false;
    const {host, protocol} = window.location;

    firebase.auth().onAuthStateChanged((user) => {
      this.isLoading = false;
      if (!user) {
        window.location.replace(`${protocol}//${host}/sign-in`);
        return;
      }
      this.isAuth = true;
    });
  }

  render() {
    if (!this.isAuth || this.isLoading)
      return html`<sp-progress-bar
        aria-label="Loaded an unclear amount"
        indeterminate
      ></sp-progress-bar>`;
    return html`<user-profile></user-profile> `;
  }
}

window.customElements.define('my-app', Home);
