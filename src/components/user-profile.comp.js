import {LitElement, html} from 'lit';
import {firebase} from '../services/firebase.service.js';

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
  };

  connectedCallback() {
    super.connectedCallback();
    firebase.auth().onAuthStateChanged((user) => user && this.setUser(user));
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

  /**
   * Render profile photo
   */
  photoTemplate() {
    return (
      this.photoURL &&
      html`<img slot="cover-photo" src=${this.photoURL} alt="Profile Image" />`
    );
  }

  _onClick() {
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(error));
  }

  render() {
    return html`
      <sp-card heading=${this.name} subheading=${this.email}>
        ${this.photoTemplate()}
        <div slot="footer">${this.provider}</div>
        <sp-action-menu slot="actions" placement="bottom-end">
          <sp-menu-item @click=${this._onClick}>Logout</sp-menu-item>
        </sp-action-menu>
      </sp-card>
    `;
  }
}

window.customElements.define('user-profile', UserProfile);
