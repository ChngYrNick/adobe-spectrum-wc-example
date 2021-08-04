import '../../../public/style.css';

import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
// import 'lit/polyfill-support';

import {LitElement, html, css} from 'lit';
import {facebookProvider, googleProvider} from '../../services/firebase.js';

import '../login-option.js';

export class SignIn extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        max-width: 350px;
        margin: 100px auto 0;
        font-size: 1.2em;
      }

      :host > .title {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host > * {
        height: 35px;
      }
    `;
  }
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
