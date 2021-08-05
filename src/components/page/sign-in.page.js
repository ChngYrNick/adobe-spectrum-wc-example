import '../../../public/style.css';

import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '../login-option.comp.js';

import {LitElement, html} from 'lit';
import {
  facebookProvider,
  googleProvider,
} from '../../services/firebase.service.js';

import styles from './sign-in.styles.js';

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

window.customElements.define('my-app', SignIn);
