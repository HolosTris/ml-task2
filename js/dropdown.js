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

      option.onclick = (ev) => {
        if (ev.target == counters[i].decBut) counters[i].num--;
        if (ev.target == counters[i].incBut) counters[i].num++;

        counters[i].update();
        updateLabel(wordsCases, placeholder);
      }
      
      //It's for modified updateLabel

      let wordsCases;
      let placeholder;

      // if (dropdown.parentElement.classList.contains("guests")) {
      //   wordsCases = [
      //     ["гость", "гостя", "гостей"]
      //   ];
      //   placeholder = "Сколько гостей";
      // }

      // if (dropdown.parentElement.classList.contains("facilities")) {
      //   wordsCases = [
      //     ["спальня", "спальни", "спален"],
      //     ["кровать", "кровати", "кроватей"],
      //     ["ванная", "ванные", "ванных"]
      //   ];
      // }
      
      counters[i].update();
      updateLabel(wordsCases, placeholder);
    }

    function updateLabel() {
      //Guests dropdown
      if (dropdown.parentElement.classList.contains("guests")) {
        const total = counters.map(item => item.num).reduce((prev, cur) => cur += prev);
    
        button.innerHTML = (total > 0)? createLabel(total) : "Сколько гостей";

        function createLabel(num) {
          if (num == 1) return num + " гость";
          if (num >= 2 && num <= 4)  return num + " гостя";
          return num + " гостей";
        }
      }

      //Facilities dropdown
      if (dropdown.parentElement.classList.contains("facilities")) {
        const labels = [];
        const wordsCases = [
          ["спальня", "спальни", "спален"],
          ["кровать", "кровати", "кроватей"],
          ["ванная", "ванные", "ванных"]
        ]

        for (let i = 0; i < counters.length; i++) {
          const num = counters[i].num;
          let iCase;

          if (num <= 0) continue;

          if (num == 1) iCase = 0;
          else if (num >= 2 && num <= 4) iCase = 1;
          else iCase = 2;

          labels[i] = num + " " + wordsCases[i][iCase];
        }
    
        button.innerHTML = labels.join(", ");
      }
    }

    //Modified updateLabel

    // function updateLabel(wordsCases, placeholder = "") {
    //   const labels = [];
    //   button.innerHTML = placeholder;
    
    //   if (!wordsCases || wordsCases.length == 0) return;
    //   let iWord;

    //   for (let i = 0; i < allCounters.length; i++) {
    //     const num = allCounters[i];
    //     let iCase;

    //     iWord = (i < wordsCases.length)? i : iWord;

    //     if (num <= 0) continue;

    //     if (num == 1) iCase = 0;
    //     else if (num >= 2 && num <= 4) iCase = 1;
    //     else iCase = 2;

    //     labels[i] = num + " " + wordsCases[iWord][iCase];
    //   }

    //   button.innerHTML = labels.join(", ");
    // }

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