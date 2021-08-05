import {css} from 'lit';

export default css`
  :host {
    display: flex;
    border-top: solid 1px gray;
    align-items: center;
  }

  :host > .icon {
    border-right: solid 1px gray;
    width: 35px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > a {
    padding-left: 35px;
    font-style: italic;
    text-decoration: none;
  }

  :host > a:hover {
    text-decoration: underline;
  }
`;
