import {LitElement, html, css} from 'lit';
import {firebase} from '../services/firebase.js';
import {localStorageSvc} from '../services/localStorage.js';

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
      email: {type: String},
      provider: {type: String},
    };
  }

  constructor() {
    super();
    this.name = 'Anonym';
    this.email = '';
    this.provider = '';

    firebase.auth().onAuthStateChanged((user) => user && this.setUser(user));
  }

  setUser({displayName, email, providerData}) {
    this.name = displayName;
    this.email = email;
    this.provider = providerData[0].providerId;
  }

  _onClick() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorageSvc.clearAllTokens();
        window.location.replace('https://localhost:8000/dev/sign-in');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <p>Email: ${this.email}</p>
      <hr />
      <p>Provider: ${this.provider}</p>
      <button @click=${this._onClick} part="button">Logout</button>
    `;
  }
}

window.customElements.define('user-profile', UserProfile);
