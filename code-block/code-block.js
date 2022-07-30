
class CodeBlock extends HTMLElement {

  _getStats() {
    const lineCount =  lines.length;
    return {
      lineCount: lineCount
    }
  }

  _setOriginalLines() {
    let content = this.innerHTML; //this.innerText don't preserve indentation and newlines
    let lines = content.split(/^/gm);
    this.originalLines = [];
    let lineNumber = 0;
    lines.forEach(line => {
      this.originalLines.push({
        number: ++lineNumber,
        value: line
      })
    })
  }

  _getLinesInRange(lines, startLineNumber, endLineNumber) {
    const selectedLines = [];
    lines.forEach(line => {
      if(line.number >= startLineNumber && line.number <= endLineNumber) {
        selectedLines.push(line);
      }
    });
    return selectedLines;
  }

  _getLinesAsText(lines) {
    let textLines = '';
    lines.forEach(line => {
      textLines += `${line.value}`;// End of line has been kept when content.split(/^/gm);
    });
    return textLines;
  }

  _getRangeNumbers(range) {
    // Will need error handling, because bad format or value
    // range can be "12" or "12-16", start must be >= end, start must be >=1, end =< max line number
    // these are line numbers starting at 1
    const values = range.split("-");
    const start = values[0];
    let end;
    if(values.length == 2){
      end = values[1];
    }
    else {
      end = start;
    }
    return {
      start: start,
      end: end
    }
  }

  connectedCallback() {
    console.log('connectedCallback');
    this._setOriginalLines();
    let selectedLines;
    if(this.range) {
      const rangeNumbers = this._getRangeNumbers(this.range);
      selectedLines = this._getLinesInRange(this.originalLines, rangeNumbers.start, rangeNumbers.end);
    }
    else {
      selectedLines = this.originalLines;
    }
    const content = this._getLinesAsText(selectedLines);
    this.innerHTML = `
    <h5>Code block</h5>
    <dl>
      <dt>Range</dt>
      <dd>${this.range}</dd>
      <dt>Original Line count</dt>
      <dd>${this.originalLines.length}</dd>
      <dt>Selected Line count</dt>
      <dd>${selectedLines.length}</dd>
      <dt>First line number / Last line number</dt>
      <dd>${selectedLines[0].number}/${selectedLines[selectedLines.length-1].number}</dd>

    </dl>
    <pre><code>${content}</code></pre>`;
  }

  // The attributes of the web component
  // Hence <hello-world attribute1="" attribute2="">
  static get observedAttributes() {
    return['range'];
  }

  // Callback called when an attribute is set in tag or changed
  attributeChangedCallback(property, oldValue, newValue) {
    console.log('attributeChangedCallback', property, oldValue, newValue);
    if(oldValue !== newValue) {
      this[property] = newValue;
    }
  }

}


customElements.define('code-block', CodeBlock);