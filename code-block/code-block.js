
class CodeBlock extends HTMLElement {

  connectedCallback() {
    let content = this.innerHTML; //this.innerText don't preserve indentation and newlines
    this.innerHTML = `
    <h5>Code block</h5>
    <pre><code>${content}</code></pre>`;
  }

}

customElements.define('code-block', CodeBlock);