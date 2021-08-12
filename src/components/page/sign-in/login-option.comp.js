import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {property, customElement} from 'lit/decorators.js';

import firebaseAuth from '../../../services/firebase-auth.service.js';

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
    firebaseAuth
      .signInWithPopup(this.provider)
      .then(Router.go.bind(null, {pathname: '/'}))
      .catch((err) => console.log(err));
  }
}
