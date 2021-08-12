import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../services/firebase.service.js';

@customElement('login-option')
export class LoginOption extends LitElement {
  @property() title = '';
  @property() provider = '';

  render() {
    return html`
      <sp-menu-item @click=${this._onClick}>
        <sp-icons-medium></sp-icons-medium>
        <sp-icon name="ui:Chevron100"></sp-icon>
        Login With ${this.title}
      </sp-menu-item>
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
