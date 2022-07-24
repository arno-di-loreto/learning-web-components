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

  // Custom method centralizing UI modifications
  _render() {
    this.innerHTML = `
      <div><h5>Greetings message</h5><p>Hello ${this.name}</p></div>
    `;
  }

  // Callback called when an attribute is set in tag or changed
  attributeChangedCallback(property, oldValue, newValue) {
    if(oldValue !== newValue) {
      this[property] = newValue;
      // Updating the component
      this._render();
    }
  }


  // Invoked when each element is added to a document
  connectedCallback() {
    this._render();
  }
}

// This call registers the web component.
// It links <hello-world></hello-world> tag
// to the HelloWorld class.
customElements.define('hello-world', HelloWorld);