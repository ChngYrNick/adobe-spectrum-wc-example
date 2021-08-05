import {LitElement, html} from 'lit';
import {firebase} from '../services/firebase.service.js';
import styles from './login-option.styles.js';

export class LoginOption extends LitElement {
  static styles = styles;

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
      .then(() => {
        const {host, protocol} = window.location;
        window.location.replace(`${protocol}//${host}/`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

window.customElements.define('login-option', LoginOption);
