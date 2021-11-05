const catalog = document.querySelector(".catalog-content");
const filters = document.querySelector(".filters");

// let users;
// document.querySelector("script[src='js/script.js']").onload = () => window.stop();
const clientWidth = document.documentElement.clientWidth;
if (clientWidth < 420) document.body.classList.add("mobile")
else if (clientWidth < 872) document.body.classList.add("tablet")
else if (clientWidth < 1160) document.body.classList.add("large-tablet")

for (let button of document.querySelectorAll("button, .btn")) button.disabled = true;
document.onreadystatechange = () => {
  if (document.readyState == "complete")
    for (let button of document.querySelectorAll("button, .btn")) button.disabled = false;
}

(async () => {
  const templates = await Promise.all([
    fetch("./templates/header.html").then(response => response.text()),
    fetch("./templates/footer.html").then(response => response.text())
  ]);
  // const header = await fetch("./templates/header.html").then(response => response.text());

  for (let i = 0; i < templates.length; i++) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templates[i];
    templates[i] = tempDiv.firstElementChild;
    tempDiv.remove();
  }console.log(templates[0]);

  //Header
  // const header = (localStorage.getItem("currentUser"))?
  //   templates[0].querySelector("template#login header") : templates[0].querySelector("template header");
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let header = templates[0].content.querySelector("header");

  if (currentUser) {
    currentUser.__proto__ = User.prototype;

    header = templates[0].content.querySelector("header#login");
    header.querySelector(".user a").innerHTML = currentUser.fullName;
  }

  if (document.querySelector("header")) document.querySelector("header").replaceWith(header);
  else document.body.insertAdjacentElement("afterbegin", header);

  //Footer
  const footer = templates[1].content.firstElementChild;
  if (document.querySelector("footer")) document.querySelector("footer").replaceWith(footer);
  else document.body.insertAdjacentElement("beforeend", footer);

  //Header and footer styles
  if (!document.head.querySelector("link[href='./css/header_footer.css']"))
    document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="./css/header_footer.css">');
  
  header.querySelector("#nav-btn").onpointerup = () => {
    const nav = header.querySelector("nav");
    nav.classList.add("active");

    const blur = document.createElement("div");
    blur.id = "blur";

    blur.onpointerup = () => { nav.classList.remove("active"); blur.remove(); }

    document.body.append(blur);
  }

  // users = await fetch("./json/users.json").then(response => response.json())
  //   .then(() => document.dispatchEvent(new CustomEvent("users-loaded")));

  // document.head.querySelector("link[href='./css/header_footer.css']").onload = () => {
  //   const footerCon = document.querySelector("footer").firstElementChild;
  //   let totalWidth = Number.parseInt(getComputedStyle(footerCon).gridGap) * (footerCon.children.length - 1);
  //   for (el of footerCon.children) totalWidth += el.offsetWidth;

  //   if (document.documentElement.clientWidth >= totalWidth) return;

  //   document.body.classList.add("mobile");
  // }
})()

class User {
  static _lastId;

  constructor(name, surname, sex, birthDate, mail, avatar = null) {
    this.id = 0;
    this.name = name;
    this.surname = surname;
    this.sex = sex;
    this.birthDate = birthDate;
    this.mail = mail;
    this.avatar = avatar;
  }

  get fullName() {
    return this.name + " " + this.surname;
  }

  static func() {
    return this.length;
  }

  // static get lastId() {
  //   if (this._lastId) return this._lastId;

  //   // while (!this._lastId)
  //   //   if (users) this._lastId = users.reduce((prev, cur) => (cur.id > prev.id)? cur : prev);
      
  //   // return this._lastId;
  //   // (async () => {
  //     return this._lastId = fetch("./json/users.json")
  //       .then(response => response.json())
  //       .then( users => users.reduce((prev, cur) => (cur.id > prev.id)? cur : prev) )
  //       .then(lastUser => lastUser.id);
  //   // })();
  // }
}

// console.log(User.lastId);

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