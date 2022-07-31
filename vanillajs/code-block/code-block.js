
class CodeBlock extends HTMLElement {

  constructor() {
    super();
    //this.attachShadow({ mode: 'open' });
  }

  // Kind of setters, there's a better way to do this with get/set keywords I think

  _setOriginalLines() {
    let lines = this.content.split(/^/gm);
    this.originalLines = [];
    let lineNumber = 0;
    lines.forEach(line => {
      this.originalLines.push({
        number: ++lineNumber,
        value: line
      })
    })
    console.log('_setOriginalLines', this.originalLines.length);
  }

  // An array of line blocks (hence an array of array of lines)
  _getSelectedLinesBlocks() {
    let selectedLinesBlocks;
    if(this.ranges) {
      this.ranges.forEach(range => {
        selectedLinesBlocks = this._getLinesBlocksInRanges(this.originalLines, this.ranges);
      });
    }
    else {
      selectedLinesBlocks = [this.originalLines];
    }
    return selectedLinesBlocks; 
  }

  _setRanges(textRanges) {
    // Will need to check format
    // Will need to check numbers are ok, refine option, sort option? allow range not in right order?
    // Prototype of full regex \s*\d+(\s*-\s*\d+)?\s*(\s*,\s*\d+(\s*-\s*\d+)?\s*)*
    const splitTextRanges = textRanges.split(/\s*,\s*/g); // Lazy format handling white space, will add it for individual ranges
    const tmpRanges = [];
    splitTextRanges.forEach(textRange => {
      const range = this._getRangeNumbers(textRange);
      tmpRanges.push(range);
    });
    this.ranges = tmpRanges;
  }

  // Generic functions

  _getLinesInRange(lines, startLineNumber, endLineNumber) {
    const selectedLines = [];
    // Could probably use a filter here?
    lines.forEach(line => {
      if(line.number >= startLineNumber && line.number <= endLineNumber) {
        selectedLines.push(line);
      }
    });
    return selectedLines;
  }
  // An array of line blocks (hence an array of array of lines)
  _getLinesBlocksInRanges(lines, ranges) {
    const linesBlocks = [];
    ranges.forEach(range => {
      const rangeLines = this._getLinesInRange(lines, range.start, range.end);
      linesBlocks.push(rangeLines);
    });
    return linesBlocks;
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

  _getRangeAsText(range) {
    let textRange = range.start;
    if(range.start != range.end){
      textRange += `-${range.end}`;
    }
    return textRange;
  }

  _getRangesAsText(ranges) {
    let textRanges = '';
    if(ranges) {
      ranges.forEach( (range, index, ranges) => {
        textRanges += this._getRangeAsText(range);
        if(ranges.length > 1 && index < ranges.length-1) {
          textRanges += ',';
        }
      });
    }
    return textRanges;
  }

  // HTML

  _sanitizeContent(content) {
    return content.replaceAll('<','&lt;').replaceAll('>','&lt;');
  }

  _getSeparatorHTML(){
    // SVG copy/pasted from github UI
    return `
      <div class="separator">
        <svg class="separator-indicator" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
          <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        </svg>
      </div>
    `;
  }

  _setContentAndRender() {
    if(this.src) {
      console.log('content from url', this.src);
      fetch(this.src).then((response)=>{response.text().then((text)=>{
        this.content = text;
        this._setOriginalLines();
        this._render();
      })});
    }
    else {
      console.log('inline content');
      this.content = this.innerHTML; //this.innerText don't preserve indentation and newlines
      this._setOriginalLines();
      this._render(); 
    }
  }

  _render() {
    let codeBlocksHTML = '<div class="code-block-container">';
    this._getSelectedLinesBlocks().forEach((selectedLines, index, blocks) => {
      const content = this._getLinesAsText(selectedLines);
      console.log('index', index, 'first line number', selectedLines[0].number);
      if(index === 0 && selectedLines[0].number > 1){
        codeBlocksHTML += this._getSeparatorHTML();
      }
      codeBlocksHTML += `
        <pre><code>${this._sanitizeContent(content)}</code></pre>
      `;
      // More blocks coming OR last block which is not the end of code
      if( index < blocks.length-1 || selectedLines[selectedLines.length-1].number < this.originalLines[this.originalLines.length - 1].number){
        codeBlocksHTML += this._getSeparatorHTML();
      }
    });
    codeBlocksHTML += '</div>';
    console.log('codeBlocksHTML',codeBlocksHTML);
    this.innerHTML = codeBlocksHTML;
  }

  // Web components functions

  connectedCallback() {
    console.log('connectedCallback');
    this._setContentAndRender();    
  }

  // The attributes of the web component
  // Hence <hello-world attribute1="" attribute2="">
  static get observedAttributes() {
    return['ranges', 'src' ];
  }

  // Callback called when an attribute is set in tag or changed
  attributeChangedCallback(property, oldValue, newValue) {
    console.log('attributeChangedCallback', property, oldValue, newValue);
    //if(oldValue !== newValue) {
      if(property === 'ranges'){
        this._setRanges(newValue);
      }
      else {
        this[property] = newValue;
      }
    //}
  }

}

customElements.define('code-block', CodeBlock);