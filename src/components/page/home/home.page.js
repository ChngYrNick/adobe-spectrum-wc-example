import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {property, customElement} from 'lit/decorators.js';

import firebaseAuth from '../../../services/firebase-auth.service.js';
import styles from './home.styles.js';

@customElement('home-page')
export class Home extends LitElement {
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
    return html`
      <label @click=${Router.go.bind(null, {pathname: '/user'})}>
        <sp-link href="javascript:;">Go to user profile</sp-link>
      </label>
      <stock-elem></stock-elem>
    `;
  }
}
