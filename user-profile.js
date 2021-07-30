/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';

export class UserProfile extends LitElement {
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
      name: {type: String},
      service: {type: String},
      email: {type: String},
      isAuth: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.name = 'Anonym';
    this.email = '';
    this.service = '';
    this.isAuth = false;
  }

  setUser({name, email, service}) {
    this.name = name;
    this.email = email;
    this.service = service;
    this.isAuth = true;
  }

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <p style="visibility: ${this.isAuth ? 'visible' : 'hidden'}">
        Email: ${this.email}
      </p>
      <hr />
      <p style="visibility: ${this.isAuth ? 'visible' : 'hidden'}">
        ${this.service} account
      </p>
    `;
  }
}

window.customElements.define('user-profile', UserProfile);
