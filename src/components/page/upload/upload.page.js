import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {customElement, property} from 'lit/decorators.js';

import firebaseAuth from '../../../services/firebase-auth.service.js';
import styles from './upload.styles.js';

@customElement('upload-page')
export class Upload extends LitElement {
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
      <dropzone-elem></dropzone-elem>
      <gallery-elem></gallery-elem>
    `;
  }
}
