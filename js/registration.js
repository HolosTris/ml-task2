// import * as main from "./script.js";
const form = document.forms[0];

console.log(document.querySelector(".username"))

//Валидация формы
form.onsubmit = function() {
  const textInputs = this.querySelectorAll("input:not([type=checkbox], [type=radio])");

  for (let elem of form.elements) if (typeof elem.value == "string") elem.value = elem.value.trim();

  if (Array.from(textInputs).includes(document.activeElement)) {
    textInputs[Array.from(textInputs).indexOf(document.activeElement) + 1].focus();
    return false;
  }

  for (let el of textInputs)
    if (!el.value && !el.onblur) el.classList.add("invalid");
    else if (el.onblur) el.onblur();
    else el.classList.remove("invalid");

  if( !Array.from(this.elements).find(el => el.classList.contains("invalid")) ) submitForm(this);

  return false;
}

form.birthDate.oninput = function() {
  const lastSym = this.value[this.value.length - 1];
  
  if (lastSym.charCodeAt() < 0x30 || lastSym.charCodeAt() > 0x39) this.value = this.value.slice(0, -1);

  if (this.value.length == 2 || this.value.length == 5) this.value += ".";
}

form.birthDate.onblur = checkDate;

form.mail.onblur = checkMail;

function checkDate() {
  const [day, month, year] = this.value.split(".");
  const date = new Date(year, month - 1, day);
  const now = new Date;

  if (date.getDate() != +day || date.getMonth() + 1 != +month || date.getFullYear() != +year
  || date.getFullYear() < now.getFullYear() - 200 || date > now)
    this.classList.add("invalid");
  else this.classList.remove("invalid");
}

function checkMail() {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.mail.value))
    this.classList.add("invalid");
  else this.classList.remove("invalid");
}

function parseDate(date) {
  const [day, month, year] = date.split(".");
  return new Date(year, month - 1, day);
}

//Обработка и отправка данных формы
function submitForm(form) {
  const data = new FormData(form);
  const date = parseDate(data.get("birthDate"));
  const user = new User(data.get("username"), data.get("surname"), (data.get("sex") == "female")? 1 : 0 , date, data.get("mail"))

  localStorage.setItem("currentUser", JSON.stringify(user));
  location.reload();
}