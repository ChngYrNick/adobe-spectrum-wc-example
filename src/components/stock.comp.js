import {LitElement, html} from 'lit';
import firestore from '../services/firestore.service.js';
import styles from './stock.styles.js';

export class Stock extends LitElement {
  static styles = styles;

  static properties = {
    items: Array,
    isLoading: Boolean,
  };

  constructor() {
    super();
    this.items = [];
    this.isLoading = true;
  }

  shouldUpdate(properties) {
    // Render if first update
    if (!properties.get('isLoading') && !properties.get('items')) return true;
    // Don't re-render changed items if still loading
    return !properties.has('items') || !this.isLoading;
  }

  connectedCallback() {
    super.connectedCallback();
    this.onItemsChanged();
    this.fetchData().finally(() => (this.isLoading = false));
  }

  async fetchData() {
    return firestore.getDocs('stock').then((querySnapshot) => {
      this.items = querySnapshot.docs.map((doc) => ({...doc.data()}));
    });
  }

  onItemsChanged() {
    return firestore.onSnapshot(firestore.query('stock'), (querySnapshot) => {
      this.items = querySnapshot.docs.map((doc) => ({...doc.data()}));
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
          .location=${item.location}
          .photoURL=${item.photoURL}
        ></item-card>`
    )}`;
  }
}

window.customElements.define('stock-elem', Stock);
