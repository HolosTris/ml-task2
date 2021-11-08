const dropdownContainers = document.querySelectorAll(".dd-container");

for (let dropdown of dropdownContainers) {
  const header = dropdown.querySelector("h3");

  header.onclick = () => dropdown.classList.toggle("active");
}

initAllDropdowns();

function initAllDropdowns() {
  const dropdownMenus = document.querySelectorAll(".dd-menu");

  for (let dropdown of dropdownMenus) {
    const button = dropdown.querySelector("button");
    const content = dropdown.querySelector(".dropdown-content");

    button.onclick = () => {
      dropdown.classList.toggle("active");
      content.style.width = button.offsetWidth + "px";
    }

    const options = content.querySelector(".options");
    const controls = content.querySelector(".controls");

    const counters = [];
    
    for (let i = 0; i < options.children.length; i++) {
      const option = options.children[i];

      const counterElem = option.querySelector(".counter");
      const decElem = option.querySelector(".decrease");
      const incElem = option.querySelector(".increase");

      counters[i] = {
        elem: counterElem,
        decBut: decElem,
        incBut: incElem,
        num: (+counterElem.innerText)? +counterElem.innerText : 0,
        min: +counterElem.dataset.min,
        max: +counterElem.dataset.max,

        update() {
          if (this.num <= this.min) this.decBut.classList.add("deactivated");
          else this.decBut.classList.remove("deactivated");
      
          if (this.num >= this.max) this.incBut.classList.add("deactivated");
          else this.incBut.classList.remove("deactivated");
          
          this.elem.innerHTML = this.num;
        }
      }

      let wordsCases, placeholder, unitedCounters;

      if (dropdown.parentElement.classList.contains("guests")) {
        placeholder = "Сколько гостей";
        wordsCases = [
          ["гость", "гостя", "гостей"],
          ["младенец", "младенца", "младенцев"]
        ];
        unitedCounters = [2];
      }

      if (dropdown.parentElement.classList.contains("facilities")) {
        wordsCases = [
          ["спальня", "спальни", "спален"],
          ["кровать", "кровати", "кроватей"],
          ["ванная", "ванные", "ванных"]
        ];
      }

      option.onclick = (ev) => {
        if (ev.target == counters[i].decBut) counters[i].num--;
        if (ev.target == counters[i].incBut) counters[i].num++;

        counters[i].update();
        updateLabel(placeholder, wordsCases, unitedCounters);
      }
      
      counters[i].update();
      updateLabel(placeholder, wordsCases, unitedCounters);
    }

    function updateLabel(placeholder = "", wordsCases = [], unitedCounters = []) {
      const labels = [];
      const maxNumLabels = counters.length - unitedCounters.reduce((prev, cur) => cur += prev - 1, 0);
      console.log(unitedCounters);

      let numSkips = 0
      for (let i = 0; i < maxNumLabels; i++) {
        let unitedCounter = unitedCounters[i]
        let num = 0;
        let iCase;

        if (!unitedCounter) unitedCounter = 1;

        for (let j = i + numSkips; j < i  + numSkips + unitedCounter; j++) num += counters[j].num;
        numSkips += unitedCounter - 1;

        if (num <= 0) continue;

        if (num == 1) iCase = 0;
        else if (num >= 2 && num <= 4) iCase = 1;
        else iCase = 2;

        labels.push(num + " " + wordsCases[i][iCase]);
      }
  
      button.innerHTML = (labels.length)? labels.join(", ") : placeholder;
    }

    if (controls) {
      controls.onclick = ev => {
        const buttons = controls.querySelectorAll("button");

        const methods = {
          apply() {
            dropdown.classList.toggle("active");
          },

          clear() {
            counters.forEach((counter) => {
              counter.num = counter.min;
              counter.update();
              updateLabel();
              this.apply();
            })
          }
        }

        for (const button of buttons) {
          if (ev.target == button) methods[button.dataset.action]();
        }
      }
    }
  }
}