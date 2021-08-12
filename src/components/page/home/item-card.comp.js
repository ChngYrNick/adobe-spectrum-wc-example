import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import styles from './item-card.styles.js';

@customElement('item-card')
export class ItemCard extends LitElement {
  static styles = styles;

  @property() name = '';
  @property() location = '';
  @property() photoURL = '';

  render() {
    return html`
      <sp-card heading=${this.name} subheading=${this.location}>
        <img slot="cover-photo" src=${this.photoURL} alt="Item Image" />
      </sp-card>
    `;
  }
}
