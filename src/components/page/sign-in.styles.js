import {css} from 'lit';

export default css`
  :host {
    display: block;
    border: solid 1px gray;
    max-width: 350px;
    margin: 100px auto 0;
    font-size: 1.2em;
  }

  :host > .title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > * {
    height: 35px;
  }
`;
