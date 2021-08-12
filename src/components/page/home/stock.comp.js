import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

import {firebase} from '../../../services/firebase.service.js';
import styles from './stock.styles.js';

@customElement('stock-elem')
export class Stock extends LitElement {
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
    this.fetchData();
  }

  fetchData() {
    firebase
      .firestore()
      .collection('stock')
      .get()
      .then((querySnapshot) => {
        this.items = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          location: doc.data().location,
          photoURL: doc.data().photoURL,
        }));
      })
      .finally(() => (this.isLoading = false));
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
