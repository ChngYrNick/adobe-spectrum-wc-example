import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators';
import {firebase} from '../services/firebase.service.js';

interface UserDTO {
  displayName: string;
  email: string;
  providerData: any[];
  photoURL: string;
}

@customElement('user-profile')
export class UserProfile extends LitElement {
  @property() name = '';
  @property() email = '';
  @property() provider = '';
  @property() photoURL = '';

  connectedCallback() {
    super.connectedCallback();
    firebase
      .auth()
      .onAuthStateChanged((user) => user && this.setUser(user as UserDTO));
  }

  /**
   * Set user data
   */
  setUser({displayName, email, providerData, photoURL}: UserDTO) {
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
