'use strict'
function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector; 
    this.height = height;
    this.width = width;
    this.bg = bg; 
    this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
    let element, 
        p; 
    if (this.selector[0] === '.') {
        element = document.createElement('div');
        element.className = this.selector.slice(1);
        element.textContent = "Hello World";
    };

    if (this.selector[0] === '#') {
        element = document.createElement('p');
        element.id = this.selector.slice(1);
        element.textContent = 'Hello world';
    };
    element.style.cssText = 
    `height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;
    `;
    console.log(element);
    return element;
}
let blockDiv = new DomElement('.block', 450, 450, 'red', 35);
let blockId = new DomElement('#best', 30, 30, 'green', 13);
document.body.appendChild(blockDiv.createElement());
document.body.appendChild(blockId.createElement());
