/**
 * @license Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {firebase, googleProvider} from './firebase.js';

export class GoogleLogin extends LitElement {
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
    this.title = 'Login From Google';
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
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const userProfile = document.getElementsByTagName('user-profile')[0];
        userProfile.setUser({
          name: user.displayName,
          email: user.email,
          service: 'Google',
        });
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('google-login', GoogleLogin);
