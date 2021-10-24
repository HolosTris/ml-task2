const catalog = document.querySelector(".catalog-content");
const filters = document.querySelector(".filters");

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