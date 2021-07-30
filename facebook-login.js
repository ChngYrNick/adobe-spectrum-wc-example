/**
 * @license Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {firebase, facebookProvider} from './firebase.js';

export class FacebookLogin extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      title: {type: String},
    };
  }

  constructor() {
    super();
    this.title = 'Login From Facebook';
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <button @click=${this._onClick} part="button">
        Login
      </button>
    `;
  }

  _onClick() {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const user = result.user;
        const userProfile = document.getElementsByTagName('user-profile')[0];
        userProfile.setUser({
          name: user.displayName,
          email: user.email,
          service: 'Facebook',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('facebook-login', FacebookLogin);
