---
layout: page.11ty.cjs
title: <hello-world-lit> ⌲ Home
---

# &lt;hello-world-lit>

`<hello-world-lit>` is an hello world web component. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<hello-world-lit>` is just an HTML element. You can it anywhere you can use HTML!

```html
<hello-world-lit></hello-world-lit>
```

  </div>
  <div>

<hello-world-lit></hello-world-lit>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<hello-world-lit>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

render(
  html`
    <h2>This is a &lt;hello-world-lit&gt;</h2>
    <hello-world></hello-world>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;hello-world-lit&gt;</h2>
<hello-world-lit></hello-world-lit>

  </div>
</section>
