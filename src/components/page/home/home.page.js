import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../../../services/firebase.service.js';
import styles from './home.styles.js';

@customElement('home-page')
export class Home extends LitElement {
  @property() isAuth = false;

  static get styles() {
    return styles;
  }

  connectedCallback() {
    super.connectedCallback();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) return (this.isAuth = true);
      Router.go({pathname: '/sign-in'});
    });
  }

  render() {
    if (!this.isAuth) return;
    return html`<user-profile></user-profile><stock-elem></stock-elem> `;
  }
}
