import {LitElement, html, css} from 'lit';
import {localStorageSvc} from '../services/localStorage.js';
import {firebase, googleProvider} from '../services/firebase.js';

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
        const {providerId, accessToken} = result.credential;
        localStorageSvc.setToken(providerId, accessToken);
        window.location.replace('https://localhost:8000/dev/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('google-login', GoogleLogin);
