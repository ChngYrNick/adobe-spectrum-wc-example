import '@spectrum-web-components/styles/all-large-light.css';

import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

import '@spectrum-web-components/card/sp-card';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
import '../user-profile.comp.js';
import '../item-card.comp.js';
import '../stock.comp.js';

import {LitElement, html} from 'lit';

import firebaseAuth from '../../services/firebase-auth.service.js';
import styles from './home.styles.js';

export class Home extends LitElement {
  static properties = {
    isAuth: Boolean,
  };

  constructor() {
    super();
    this.isAuth = false;
  }

  static get styles() {
    return styles;
  }

  connectedCallback() {
    super.connectedCallback();
    firebaseAuth.onAuthStateChanged((user) => {
      const {host, protocol} = window.location;
      if (user) return (this.isAuth = true);
      window.location.replace(`${protocol}//${host}/sign-in`);
    });
  }

  render() {
    if (!this.isAuth) return;
    return html`<user-profile></user-profile><stock-elem></stock-elem> `;
  }
}

window.customElements.define('my-app', Home);
