const numRoom = new URL(location).searchParams.get("number");
const arriveDate = (new URL(location).searchParams.get("arrive"))?
  new Date(new URL(location).searchParams.get("arrive")) : new Date();
const departureDate = (new URL(location).searchParams.get("departure"))?
  new Date(new URL(location).searchParams.get("departure")) : new Date(+arriveDate + (24 * 3600 * 1000));
const guests = (new URL(location).searchParams.get("guests"))?
  new URL(location).searchParams.get("guests").split(",") : [1, 0, 0];

fetch("/json/hotel_rooms.json")
  .then(response => response.json())
  .catch(error => alert(error))
  .then(rooms => {
    const room = rooms.find(room => room.number == numRoom);

    if (!room) {
      const correctURL = new URL(location);
      correctURL.searchParams.set("number", rooms[0].number);
      location = correctURL;
    }

    return room;
  })
  .then(room => {
    document.querySelector("title").innerHTML = "Room №" + room.number;

    //Позиционирование фотографий номера
    const preview = document.getElementById("preview");
    const images = room.largeImages || room.images;

    preview.children[0].src = images[0];
    preview.children[0].onload = formatingPreview;

    preview.children[1].innerHTML = "";
    for (i = 1; i < images.length; i++) {
      preview.children[1].insertAdjacentHTML("beforeend", `<img src="${images[i]}" alt="">`);
      preview.children[1].children[i-1].onload = formatingPreview;
    }
    
    let numImgLoaded = 0;
    function formatingPreview() {
      numImgLoaded++;
      if (numImgLoaded >= images.length)
        preview.style.gridTemplateColumns = preview.children[1].offsetHeight / preview.children[0].offsetHeight + "fr 1fr";
    }

    //Внесение данных в карточку номера
    const aside = document.querySelector("aside");

    aside.querySelector(".room-number").innerHTML = `<h2><span>№</span> ${room.number}</h2><h3>${(room.isSuite)? "люкс" : ""}</h3>`
    aside.querySelector(".room-price").innerHTML = `<b>${beutifyNumber(room.price)}₽</b> в сутки`

    aside.querySelector("#input1").value = arriveDate.toLocaleDateString();
    aside.querySelector("#input2").value = departureDate.toLocaleDateString();

    const dropdown = aside.querySelector(".dropdown-content");
    dropdown.querySelector(".adults .counter").innerHTML = guests[0];
    dropdown.querySelector(".children .counter").innerHTML = guests[1];
    dropdown.querySelector(".babies .counter").innerHTML = guests[2];

    initAllDropdowns();

    const subtotalDiv = aside.querySelector(".subtotal");
    const daysOfStay = Math.round((departureDate - arriveDate) / (24 * 3600 * 1000));
    const discount = (room.isSuite)? 0.05 : (room.rating > 3)? 0.03 : 0;
    const totalGuests = +guests[0] + +guests[1] + +guests[2];
    const stringGuests = document.querySelector(".dropdown > button").innerHTML;
    const subtotal = room.price * daysOfStay;
    const fee = 500 * totalGuests - subtotal * discount;
    const extraFee = 125 * daysOfStay * totalGuests;

    subtotalDiv.children[0].innerHTML = `
      <span>${beutifyNumber(room.price)}₽ х ${daysOfStay} ${(daysOfStay > 1)? "суток" : "сутки"}</span>
      <span>${beutifyNumber(subtotal)}₽</span>`;
    subtotalDiv.children[1].innerHTML =
      `<span>Сбор за услуги${(fee < 0)? ": скидка " + beutifyNumber(-fee) + "₽" : ""}</span>
      <span>${(fee < 0)? 0 : beutifyNumber(fee)}₽</span>`;
    subtotalDiv.children[2].innerHTML = `<span>Сбор за дополнительные услуги</span><span>${beutifyNumber(extraFee)}₽</span>`;

    const total = subtotal + fee + extraFee;

    aside.querySelector(".total").lastElementChild.innerHTML = beutifyNumber(total.toFixed()) + "₽";

    //Отображение графика голосов
    const units = document.querySelectorAll("svg .unit");
    const votes = Object.values(room.votes);
    const totalVotes = votes.reduce((prev, cur) => cur + prev);

    document.querySelector(".total-chart").innerHTML = `
      <span>${totalVotes}</span><br>
      <span>${(totalVotes % 10 == 1)? "голос" : (totalVotes % 10 >= 2 && totalVotes % 10 <= 4)? "голоса" : "голосов"}</span>`

    let offset = 0.5;
    for (i = 0; i < 4; i++) {
      units[i].style.strokeDasharray = (votes[3-i] / totalVotes * 100 - 1) + " 100";
      units[i].style.strokeDashoffset = (offset >= 100)? 100 - offset : -offset;
      offset += (votes[3-i] / totalVotes * 100);
    }

    //Вывод правил номера
    const rulesList = document.querySelector(".rules ul");
    rulesList.innerHTML = "";
    rulesList.insertAdjacentHTML("beforeend",
      `<li>${(room.rules.pets)? "Можно с питомцами" : "Нельзя с питомцами"}</li>`);
    rulesList.insertAdjacentHTML("beforeend",
      `<li>${(room.rules.party)? "Разрешается проводить мероприятия" : "Без вечеринок и мероприятий"}</li>`);
    rulesList.insertAdjacentHTML("beforeend",
      `<li>Время прибытия — после ${(room.rules.arriveTime)}, а выезд до ${(room.rules.departureTime)}</li>`);

    //Вывод правил отмены брони
    const cancelP = document.querySelector(".cancel p");
    cancelP.innerHTML = `Бесплатная отмена в течение ${room.cancel.cooldownHours} ч.
      После этого при отмене не позднее чем за ${room.cancel.untilArriveDays} дн.
      до прибытия вы получите полный возврат за вычетом сбора за услуги.`

    //Вывод отзывов
    const reviewsDiv = document.querySelector(".reviews");
    [...reviewsDiv.getElementsByTagName("div")].forEach(div => div.remove());

    showReviews();

    async function showReviews() {
      const reviews = await fetch("/json/reviews.json")
        .then(response => response.json())
        .then(allReviews => allReviews.find(reviews => reviews.room == room.number).reviews);
      const users = await fetch("/json/users.json").then(response => response.json());
      
      for (let review of reviews) {
        const user = users.find(user => user.id == review.user);
        
        reviewsDiv.insertAdjacentHTML("beforeend",
          `<div>
            <img src="${user.avatar}" alt="">
            <p>
              <b>${user.name} ${user.surname}</b><br>
              ${showRelativeDate(review.date)}
            </p>
            <div><button class="alt-btn like-btn"><span class="material-icons">favorite</span>${review.likes}</button></div>
            <p>${review.text}</p>
          </div>`);
      }
    }

    function showRelativeDate(date) {
      const now = new Date();
      date = new Date(date);
      const diffMin = (now - date) / 60 / 1000;
      let time, string;
      
      if (diffMin > 7 * 24 * 60) {
        time = Math.floor(diffMin / 7 / 24 / 60);
        string = (time > 4)? time + " недель" : (time > 1)? time + " недели" : "Неделю";
      }
      else if (diffMin > 24 * 60) {
        time = Math.floor(diffMin / 24 / 60);
        string = (time > 4)? time + " дней" : (time > 1)? time + " дня" : "День";
      }

      return string + " назад";
    }
  });