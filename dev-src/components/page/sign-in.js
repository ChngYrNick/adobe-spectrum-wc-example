import {LitElement, html} from 'lit';

import '../facebook-login.js';
import '../google-login.js';

export class SignIn extends LitElement {
  render() {
    return html`
      <facebook-login></facebook-login>
      <google-login></google-login>
    `;
  }
}

window.customElements.define('sign-in', SignIn);
