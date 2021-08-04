import {LitElement, html, css} from 'lit';

import {firebase} from '../services/firebase.js';
import {localStorageSvc} from '../services/localStorage.js';

export class LoginOption extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        border-top: solid 1px gray;
        align-items: center;
      }

      :host > .icon {
        border-right: solid 1px gray;
        width: 35px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :host > a {
        padding-left: 35px;
        font-style: italic;
        text-decoration: none;
      }

      :host > a:hover {
        text-decoration: underline;
      }
    `;
  }

  static get properties() {
    return {
      title: {type: String},
      icon: {type: String},
      provider: {type: Object},
    };
  }

  render() {
    return html`
      <div class="icon">${this.icon}</div>
      <a href="" @click=${this._onClick}>Login With ${this.title}</a>
    `;
  }

  _onClick(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        const {host, protocol} = window.location;
        const {providerId, accessToken} = result.credential;
        localStorageSvc.setToken(providerId, accessToken);
        window.location.replace(`${protocol}//${host}/`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('login-option', LoginOption);
