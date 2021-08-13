import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import firebaseStorage from '../../../services/firebase-storage.service.js';
import styles from './gallery.styles.js';

@customElement('gallery-elem')
export class Gallery extends LitElement {
  static styles = styles;

  @property() items = [];
  @property() isLoading = true;

  shouldUpdate(properties) {
    // Render if first update
    if (!properties.get('isLoading') && !properties.get('items')) return true;
    // Don't re-render changed items if still loading
    return !properties.has('items') || !this.isLoading;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData().finally(() => (this.isLoading = false));
  }

  async fetchData() {
    return firebaseStorage.listAll('').then(({items}) => {
      this.items = items.map((item) => ({
        name: item.name,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${item.bucket}/o/${item.name}`,
      }));
    });
  }

  render() {
    if (this.isLoading) {
      return html`<sp-progress-bar indeterminate></sp-progress-bar>`;
    }

    return html`${this.items.map(
      (item) =>
        html`<item-card
          .name=${item.name}
          .photoURL=${item.photoURL}
        ></item-card>`
    )}`;
  }
}
