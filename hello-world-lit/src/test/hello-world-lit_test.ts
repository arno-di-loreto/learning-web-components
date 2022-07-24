import {HelloWorldLit} from '../hello-world-lit.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('hello-world-lit', () => {
  test('is defined', () => {
    const el = document.createElement('hello-world-lit');
    assert.instanceOf(el, HelloWorldLit);
  });

  test('renders', async () => {
    const el = await fixture(html`<hello-world-lit></hello-world-lit>`);
    assert.shadowDom.equal(
      el,
      `
      <p>Hello World from Lit Web Component!</p>
    `
    );
  });

});
