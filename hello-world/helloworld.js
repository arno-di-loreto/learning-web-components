// This class defines the web Component.
class HelloWorld extends HTMLElement {
  
  // Invoked when each element is created
  // (called before connectedCallback)
  constructor() {
    super();
    this.name = "World"; // Default value
  }
  
  // The attributes of the web component
  // Hence <hello-world attribute1="" attribute2="">
  static get observedAttributes() {
    return['name'];
  }

  // Callback called when an attribute is set in tag or changed
  attributeChangedCallback(property, oldValue, newValue) {
    if(oldValue !== newValue) {
      this[property] = newValue;
    }
  }


  // Invoked when each element is added to a document
  connectedCallback() {
    this.textContent = `Hello ${this.name}`;
  }
}

// This call registers the web component.
// It links <hello-world></hello-world> tag
// to the HelloWorld class.
customElements.define('hello-world', HelloWorld);