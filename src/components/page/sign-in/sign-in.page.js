import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import firebaseAuth from '../../../services/firebase-auth.service.js';

const {googleProvider, facebookProvider} = firebaseAuth;

@customElement('sign-in-page')
export class SignIn extends LitElement {
  render() {
    return html`
      <sp-popover open style="position: relative">
        <sp-menu>
          <login-option
            .title=${'Google'}
            .provider=${googleProvider}
          ></login-option>
          <login-option
            .title=${'Facebook'}
            .provider=${facebookProvider}
          ></login-option>
        </sp-menu>
      </sp-popover>
    `;
  }
}
