import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../../../services/firebase.service.js';

/**
 * @typedef UserDTO
 * @property {Array} param.providerData
 * @property {string} param.displayName
 * @property {string} param.email
 * @property {string} param.photoURL
 */

@customElement('user-profile')
export class UserProfile extends LitElement {
  @property() name = '';
  @property() email = '';
  @property() provider = '';
  @property() photoURL = '';
  @property() isLoading = true;

  connectedCallback() {
    super.connectedCallback();
    firebase.auth().onAuthStateChanged((user) => {
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
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(error));
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