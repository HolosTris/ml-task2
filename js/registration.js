const form = document.forms[0];

form.onsubmit = function() {
  const textInputs = form.querySelectorAll("input:not([type=checkbox], [type=radio])");

  if (Array.from(textInputs).includes(document.activeElement)) {
    textInputs[Array.from(textInputs).indexOf(document.activeElement) + 1].focus();
    return false;
  }

  for (let el of textInputs)
    if (!el.value && !el.onblur) el.classList.add("invalid");
    else if (el.onblur) el.onblur();
    else el.classList.remove("invalid");

  if( !Array.from(form.elements).find(el => el.classList.contains("invalid")) ) form.submit();

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