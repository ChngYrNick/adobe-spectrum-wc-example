import {LitElement, html} from 'lit';
import firebaseAuth from '../services/firebase-auth.service.js';

/**
 * @typedef UserDTO
 * @property {Array} param.providerData
 * @property {string} param.displayName
 * @property {string} param.email
 * @property {string} param.photoURL
 */

export class UserProfile extends LitElement {
  static properties = {
    name: {type: String},
    email: {type: String},
    provider: {type: String},
    photoURL: {type: String},
    isLoading: {type: Boolean},
  };

  constructor() {
    super();
    this.name = '';
    this.email = '';
    this.provider = '';
    this.photoURL = '';
    this.isLoading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) return;
      this.isLoading = false;
      this.setUser(user);
    });
  }

  /**
   * Set user data
   * @param {UserDTO}
   */
  setUser({displayName, email, providerData, photoURL}) {
    this.name = displayName;
    this.email = email;
    this.provider = providerData[0].providerId;
    this.photoURL = photoURL;
  }

  _onClick() {
    firebaseAuth.signOut().catch((error) => console.log(error));
  }

  render() {
    if (this.isLoading) {
      return html`<sp-progress-bar indeterminate></sp-progress-bar>`;
    }

    return html`
      <sp-card heading=${this.name} subheading=${this.email}>
        <img slot="cover-photo" src=${this.photoURL} alt="Profile Image" />
        <div slot="footer">${this.provider}</div>
        <sp-action-menu slot="actions" placement="bottom-end">
          <sp-menu-item @click=${this._onClick}>Logout</sp-menu-item>
        </sp-action-menu>
      </sp-card>
    `;
  }
}

window.customElements.define('user-profile', UserProfile);
