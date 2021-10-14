function createRandomCatalog(amount = 1) {
  const alreadyExist = 2;
  const catalog = document.querySelector(".catalog");
  for (let i = alreadyExist; i < amount + alreadyExist; i++) {
    catalog.insertAdjacentHTML("beforeend", `
      <article>
        <div class="carousel-wrap">
          <a href="" class="card-link">
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
        <a href="" class="card-link">
          <div class="info">
            <span class="room-number"><h2><span>№</span> ${Math.ceil(Math.random() * 999)}</h2><h3>${(Math.random() < 0.5)? "люкс" : ""}</h3></span>
            <span class="room-price"><b>${Math.round(Math.random() * 8 + 1)} ${Math.round(Math.random() * 9)}90₽</b> в сутки</span>
            <div class="line"></div>
            <span class="room-rating material-icons"></span>
            <span class="room-comments"><b>${Math.round(Math.random() * 100 + 50)}</b> Отзывов</span>
          </div>
        </a>
      </article>`);
    
    const card = catalog.querySelectorAll("article")[catalog.querySelectorAll("article").length - 1];
    const numStars = Math.ceil(Math.random() * 3 + 2); //from 3 to 5 stars
    const numImages = Math.ceil(Math.random() * 5 + 1);

    for (let i = 1; i <= 5; i++)
      if (i <= numStars) card.querySelector(".room-rating").innerHTML += "<span>star</span>";
      else card.querySelector(".room-rating").innerHTML += "<span>star_border</span>";

      
    card.querySelector(".carousel").innerHTML = "";
    for (let i = 0; i < numImages; i++) {
      card.querySelector(".carousel").insertAdjacentHTML("beforeend", `
        <li>
          <img src="images/catalog/catalog${Math.ceil(Math.random() * 12)}.png" alt="">
        </li>`);
    }
  }
}

createRandomCatalog(7);