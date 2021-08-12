import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../../services/firebase.service.js';
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
      const {host, protocol} = window.location;
      if (user) return (this.isAuth = true);
      window.location.replace(`${protocol}//${host}/sign-in`);
    });
  }

  render() {
    if (!this.isAuth) return;
    return html`<user-profile></user-profile><stock-elem></stock-elem> `;
  }
}
