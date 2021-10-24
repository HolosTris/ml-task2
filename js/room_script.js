const numRoom = new URL(location).searchParams.get("number");
const arriveDate = (new URL(location).searchParams.get("arrive"))?
  new Date(new URL(location).searchParams.get("arrive")) : new Date();
const departureDate = (new URL(location).searchParams.get("departure"))?
  new Date(new URL(location).searchParams.get("departure")) : new Date(+arriveDate + (24 * 3600 * 1000));
const numGuests = new URL(location).searchParams.get("guests").split(",") || [1, 0, 0];
console.log(numGuests);

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

    const preview = document.getElementById("preview");

    preview.children[0].src = room.images[0];
    preview.children[0].onload = formatingPreview;

    preview.children[1].innerHTML = "";
    for (i = 1; i < room.images.length; i++) {
      preview.children[1].insertAdjacentHTML("beforeend", `<img src="${room.images[i]}" alt="">`);
      preview.children[1].children[i-1].onload = formatingPreview;
    }
    
    let numImgLoaded = 0;
    function formatingPreview() {
      numImgLoaded++;
      if (numImgLoaded >= room.images.length)
        preview.style.gridTemplateColumns = preview.children[1].offsetHeight / preview.children[0].offsetHeight + "fr 1fr";
    }

    const aside = document.querySelector("aside");

    aside.querySelector(".room-number").innerHTML = `<h2><span>№</span> ${room.number}</h2><h3>${(room.isSuite)? "люкс" : ""}</h3>`
    aside.querySelector(".room-price").innerHTML = `<b>${beutifyNumber(room.price)}₽</b> в сутки`

    // const arriveDate = new Date();
    // const departureDate = new Date(arriveDate);
    // departureDate.setDate(departureDate.getDate() + 1);

    aside.querySelector("#input1").value = arriveDate.toLocaleDateString();
    aside.querySelector("#input2").value = departureDate.toLocaleDateString();

    const dropdown = aside.querySelector(".dropdown-content");
    dropdown.querySelector(".adults .counter").innerHTML = numGuests[0];
    dropdown.querySelector(".children .counter").innerHTML = numGuests[1];
    dropdown.querySelector(".babies .counter").innerHTML = numGuests[2];

    initAllDropdowns();

    const subtotalDiv = aside.querySelector(".subtotal");
    const daysOfStay = Math.round((departureDate - arriveDate) / (24 * 3600 * 1000));
    const discount = (room.isSuite)? 0.05 : (room.rating > 3)? 0.03 : 0;
    const subtotal = room.price * daysOfStay;
    const fee = 0;
    const extraFee = 125 * daysOfStay;

    subtotalDiv.children[0].innerHTML = `
      <span>${beutifyNumber(room.price)}₽ х ${daysOfStay} ${(daysOfStay > 1)? "суток" : "сутки"}</span>
      <span>${beutifyNumber(subtotal)}₽</span>`;
    subtotalDiv.children[1].innerHTML =
      `<span>Сбор за услуги${(discount > 0)? ": скидка " + beutifyNumber(subtotal * discount) + "₽" : ""}</span>
      <span>${beutifyNumber(fee)}₽</span>`;
    subtotalDiv.children[2].innerHTML = `<span>Сбор за дополнительные услуги</span><span>${beutifyNumber(extraFee)}₽</span>`;

    const total = room.price * daysOfStay * (1 - discount) + fee + extraFee;

    aside.querySelector(".total").lastElementChild.innerHTML = beutifyNumber(total.toFixed()) + "₽";
  });