// This class defines the web Component.
class HelloWorld extends HTMLElement {
  // Invoked when element is added to a document
  connectedCallback() {
    this.textContent = 'Hello World';
  }
}

// This call registers the web component.
// It links <hello-world></hello-world> tag
// to the HelloWorld class.
customElements.define('hello-world', HelloWorld);