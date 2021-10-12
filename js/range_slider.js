//Range Slider vars
const rangeDiv = document.querySelector('[slider]');
const rangeL = rangeDiv.querySelector('#range-left');
const rangeR = rangeDiv.querySelector('#range-right');
const rangeElems = rangeDiv.firstElementChild.children;

//Range Slider settings
const minGap = 2;

if (rangeL != null || rangeR != null) {
  rangeL.oninput = function() {
    this.value = Math.min(this.value, +rangeR.value - minGap);

    const value = 100 / (+this.max - +this.min) * (+this.value - +this.min);
    
    rangeElems[0].style.width = value + '%';
    rangeElems[2].style.left = value + '%';
    rangeElems[3].style.left = value + '%';
    // rangeElems[5].style.left = value + '%';
    // rangeElems[5].firstElementChild.innerHTML = this.value * 500;
    document.getElementById('value-left').innerHTML = this.value * 500;
  }

  rangeR.oninput = function() {
    this.value = Math.max(this.value, +rangeL.value + minGap);

    const value = 100 / (+this.max - +this.min) * (+this.value - +this.min);
    
    rangeElems[1].style.width = ( 100 - value) + '%';
    rangeElems[2].style.right = ( 100 - value) + '%';
    rangeElems[4].style.left = value + '%';
    // rangeElems[6].style.left = value + '%';
    // rangeElems[6].firstElementChild.innerHTML = this.value * 500;
    document.getElementById('value-right').innerHTML = this.value * 500;
  }
}