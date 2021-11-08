const form = document.forms[0];

console.log(document.querySelector(".username"))

//Валидация формы
const textInputs = form.querySelectorAll("input:not([type=checkbox], [type=radio])");

for (let input of textInputs) {
  input.tabIndex = 1;
  input.onchange = function() {
    this.value = this.value.trim();

    if (!this.value) this.classList.add("invalid");
    else this.classList.remove("invalid");
  }
}

form.onsubmit = function() {

  const activeInputI = [...textInputs].indexOf(document.activeElement);
  if (~activeInputI && activeInputI != textInputs.length - 1) {
    textInputs[activeInputI + 1].focus();
    return false;
  }

  for (let el of textInputs) el.onchange();

  if( !Array.from(this.elements).find(el => el.classList.contains("invalid")) ) submitForm(this);

  return false;
}

let prevValLength;
form.birthDate.oninput = function() {
  
  for (let i = 0; i < this.value.length; i++) {
    if ( (this.value[i].charCodeAt() < 0x30 || this.value[i].charCodeAt() > 0x39)
      && !(this.value[i] == "." && (i == 2 || i == 5)) ) {
      this.value = this.value.replace(this.value[i], "");
      i--;
    }
    if (this.value[i] != "." && (i == 2 || i == 5)) {
      this.value = this.value.slice(0, i) + "." + this.value.slice(i, this.value.length);
      i++
    }
  }

  prevValLength = this.value.length;
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