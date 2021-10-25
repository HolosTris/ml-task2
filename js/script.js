const catalog = document.querySelector(".catalog-content");
const filters = document.querySelector(".filters");

(async () => {
  const templates = await Promise.all([
    fetch("/templates/header.html").then(response => response.text()),
    fetch("/templates/footer.html").then(response => response.text())
  ]);
  // const header = await fetch("/templates/header.html").then(response => response.text());

  //Header
  if (document.querySelector("header")) document.querySelector("header").outerHTML = templates[0];
  else document.body.insertAdjacentHTML("afterbegin", templates[0]);

  //Footer
  if (document.querySelector("footer")) document.querySelector("footer").outerHTML = templates[1];
  else document.body.insertAdjacentHTML("beforeend", templates[1]);

  //Header and footer styles
  if (!document.head.querySelector("link[href='/css/header_footer.css']"))
    document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="/css/header_footer.css">');
})()

function beutifyNumber(number = 1, separator = " ") {
  let numStr = String(number);
  let fractionalPart = "";

  if (typeof number === "number" && !Number.isInteger(number)) {
    const dotI = numStr.indexOf(".");
    fractionalPart = numStr.slice(dotI);
    numStr = numStr.slice(0, dotI);
  }

  // console.log(number);
  
  if (numStr.length > 3)
    return numStr = beutifyNumber(numStr.slice(0, -3)) + separator + numStr.slice(-3) + fractionalPart;
  else return numStr;
}