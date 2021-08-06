import {LitElement, html} from 'lit';
import {firebase} from '../services/firebase.service.js';

export class Stock extends LitElement {
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
    return !properties.has('items') || !this.isLoading;
  }

  connectedCallback() {
    super.connectedCallback();
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
