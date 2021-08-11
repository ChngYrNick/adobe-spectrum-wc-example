import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../services/firebase.service.js';
import styles from './login-option.styles.js';

@customElement('login-option')
export class LoginOption extends LitElement {
  static styles = styles;

  @property() title = '';
  @property() icon = '';
  @property() provider = '';

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
