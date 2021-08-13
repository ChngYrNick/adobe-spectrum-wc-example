import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {customElement, property} from 'lit/decorators.js';

import firebaseAuth from '../../../services/firebase-auth.service.js';
import styles from './user.styles.js';

@customElement('user-page')
export class User extends LitElement {
  @property() isAuth = false;

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) return (this.isAuth = true);
      Router.go({pathname: '/sign-in'});
    });
  }

  render() {
    if (!this.isAuth) return;
    return html` <user-profile></user-profile> `;
  }
}
