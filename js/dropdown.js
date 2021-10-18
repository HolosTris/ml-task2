const dropdowns = filters.querySelectorAll(".dropdown");

for (let dropdown of dropdowns) {
  const button = dropdown.querySelector("button");

  const content = dropdown.querySelector(".dropdown-content");
  const options = content.querySelector(".options");
  const contols = content.querySelector(".contols");

  button.onclick = () => dropdown.classList.toggle("active");

  for (let option of options.children) {
    const counterElem = option.querySelector(".counter");
    const decElem = option.querySelector(".decrease");
    const incElem = option.querySelector(".increase");

    let counter = 0;
    const max = 10;

    updateCounter();

    option.onclick = (ev) => {
      if (ev.target == decElem) counter--;
      if (ev.target == incElem) counter++;

      updateCounter();
    }

    function updateCounter() {
      if (counter <= 0) decElem.classList.add("deactivated");
      else decElem.classList.remove("deactivated");

      if (counter >= 10) incElem.classList.add("deactivated");
      else incElem.classList.remove("deactivated");
      
      counterElem.innerHTML = counter;
    }
  }
}