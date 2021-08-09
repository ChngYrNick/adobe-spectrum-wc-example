import {LitElement, html} from 'lit';
import styles from './item-card.styles.js';

export class ItemCard extends LitElement {
  static styles = styles;

  static properties = {
    name: {type: String},
    location: {type: String},
    photoURL: {type: String},
  };

  render() {
    return html`
      <sp-card heading=${this.name} subheading=${this.location}>
        <img slot="cover-photo" src=${this.photoURL} alt="Item Image" />
      </sp-card>
    `;
  }
}

window.customElements.define('item-card', ItemCard);
