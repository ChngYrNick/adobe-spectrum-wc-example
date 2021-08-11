import './providres/sign-in.provider.js';

import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {
  facebookProvider,
  googleProvider,
} from '../../services/firebase.service.js';
import styles from './sign-in.styles.js';

@customElement('my-app')
export class SignIn extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="title">
        <p1>Sing In</p1>
      </div>
      <login-option
        .icon=${''}
        .title=${'Google'}
        .provider=${googleProvider}
      ></login-option>
      <login-option
        .icon=${''}
        .title=${'Facebook'}
        .provider=${facebookProvider}
      ></login-option>
    `;
  }
}
