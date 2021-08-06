import {LitElement, html} from 'lit';

export class ItemCard extends LitElement {
  static properties = {
    name: {type: String},
    location: {type: String},
    photoURL: {type: String},
  };

  render() {
    return html`
      <div style="width: 208px; height: 264px">
        <sp-card heading=${this.name} subheading=${this.location}>
          <img slot="cover-photo" src=${this.photoURL} alt="Item Image" />
        </sp-card>
      </div>
    `;
  }
}

window.customElements.define('item-card', ItemCard);
