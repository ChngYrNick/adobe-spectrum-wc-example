import {LitElement, html} from 'lit';

import {firebase} from '../../services/firebase.js';

import '../user-profile.js';

export class Home extends LitElement {
  static get properties() {
    return {
      isLoading: {type: Boolean},
      isAuth: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.isLoading = true;
    this.isAuth = false;

    firebase.auth().onAuthStateChanged((user) => {
      this.isLoading = false;
      if (!user) {
        window.location.replace('https://localhost:8000/dev/sign-in');
        return;
      }
      this.isAuth = true;
    });
  }

  render() {
    if (!this.isAuth || this.isLoading) return null;
    return html`<user-profile></user-profile>`;
  }
}

window.customElements.define('home-page', Home);
