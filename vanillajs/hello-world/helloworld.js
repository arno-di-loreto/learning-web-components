// This class defines the web Component.
class HelloWorld extends HTMLElement {
  
  // Invoked when each element is created
  // (called before connectedCallback)
  constructor() {
    super();
    this.name = "World"; // Default value
    // Using "closed" shadow DOM, it can 
    // only be accessed within the web component
    this.shadow = this.attachShadow({ mode: 'closed' });
  }
  
  // The attributes of the web component
  // Hence <hello-world attribute1="" attribute2="">
  static get observedAttributes() {
    return['name'];
  }

  // Custom method centralizing UI modifications
  _render() {
      // Different style from helloworld.css, this one will be applied
      this.shadow.innerHTML = `
        <style>
        p {
          font-weight: italic;
          font-size: 1.5rem;
          color: red;
          text-align: center;
          font-weight: normal;
          padding: 0.5rem;
          margin: 0 0 1rem 0;
          background-color: #eee;
          border: 1px solid blue;
        }
        </style>

        <div><h5>Greetings message (with closed shadow DOM)</h5><p>Hello ${this.name}</p></div>
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