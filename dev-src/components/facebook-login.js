import {LitElement, html, css} from 'lit';

import {firebase, facebookProvider} from '../services/firebase.js';
import {localStorageSvc} from '../services/localStorage.js';

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
        const {providerId, accessToken} = result.credential;
        localStorageSvc.setToken(providerId, accessToken);
        window.location.replace('https://localhost:8000/dev/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('facebook-login', FacebookLogin);
