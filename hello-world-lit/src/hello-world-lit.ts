import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('hello-world-lit')
export class HelloWorldLit extends LitElement {
  override render() {
    return html`
      <p>Hello World from Lit Web Component!</p>
    `;
  }
}