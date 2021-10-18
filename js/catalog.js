// document.onmousemove = () => false;
// document.onkeydown = () => false;

const loadedCatalog = fetch("/json/hotel_rooms.json")
  .then(response => response.json())
  .catch(error => alert(error))
  .then(rooms => {
    for (let room of rooms) {
      createCard(room);
    }
    
    createRandomCatalog(6);

    catalog.dataset.loaded = true;

    // let ev = new MouseEvent("click", {
    //   clientX: 800,
    //   clientY: 400
    // })
  
    // document.dispatchEvent(ev);
  });

function createCard(info) {
  catalog.insertAdjacentHTML("beforeend", `
    <article>
      <div class="carousel-wrap">
        <a href="/rooms/${info.number}.html" class="card-link">
          <ul class="carousel">
          <--images-->
          </ul>
        </a>
        <div class="btns" id="next"><i class="material-icons">expand_more</i></div>
        <div class="btns" id="previous"><i class="material-icons">expand_more</i></div>
        <div id="counter"></div>

        <div id="pagination-wrap">
          <ul>
          </ul>
        </div>
      </div>
      <a href="/rooms/${info.number}.html" class="card-link">
        <div class="info">
          <span class="room-number"><h2><span>№</span> ${info.number}</h2><h3>${(info.isSuite)? "люкс" : ""}</h3></span>
          <span class="room-price"><b>${beutifyNumber(info.price)}₽</b> в сутки</span>
          <div class="line"></div>
          <span class="room-rating material-icons"></span>
          <span class="room-comments"><b>${info.comments}</b> Отзывов</span>
        </div>
      </a>
    </article>`);
  
  const card = catalog.querySelectorAll("article")[catalog.querySelectorAll("article").length - 1];

  for (let i = 1; i <= 5; i++)
    if (i <= info.rating) card.querySelector(".room-rating").innerHTML += "<span>star</span>";
    else card.querySelector(".room-rating").innerHTML += "<span>star_border</span>";

    
  card.querySelector(".carousel").innerHTML = "";
  for (image of info.images) {
    card.querySelector(".carousel").insertAdjacentHTML("beforeend", `
      <li>
        <img src="${image}" alt="">
      </li>`);
  }
}

function createRandomCard() {
  const randomInfo = {
    "number": Math.ceil(Math.random() * 999),
    "price": Math.round(Math.random() * 99) * 100 + 90,
    "rating": Math.ceil(Math.random() * 3 + 2),
    "comments": Math.round(Math.random() * 150 + 10),
    "isSuite": (Math.random() < 0.5)? true : false,
    "images": []
  }
  const numImages = Math.ceil(Math.random() * 5 + 1);
  
  for (let i = 0; i < numImages; i++)
    randomInfo.images.push(`images/catalog/catalog${Math.ceil(Math.random() * 12)}.png`);

  createCard(randomInfo);
}

function createRandomCatalog(amount = 1) {
  for (let i = 0; i < amount; i++) createRandomCard();
}

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

// console.log(beutifyNumber(21349123.4324));