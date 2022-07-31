import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { HelloWorldOpenwc } from '../src/HelloWorldOpenwc.js';
import '../src/hello-world-openwc.js';

describe('HelloWorldOpenwc', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<HelloWorldOpenwc>(
      html`<hello-world-openwc></hello-world-openwc>`
    );

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<HelloWorldOpenwc>(
      html`<hello-world-openwc></hello-world-openwc>`
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<HelloWorldOpenwc>(
      html`<hello-world-openwc title="attribute title"></hello-world-openwc>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<HelloWorldOpenwc>(
      html`<hello-world-openwc></hello-world-openwc>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
