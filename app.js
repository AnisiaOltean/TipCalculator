const billValue = document.querySelector("#bill");
const tips = document.querySelectorAll(".button.tip");
const tipCustom = document.querySelector("#inputCustom");
const nrPeople = document.querySelector("#numberPeople");
const tipPerPerson = document.querySelector("#amountResult");
const totalPerPerson = document.querySelector("#totalResult");
const resetBtn = document.querySelector("#reset");
const errText = document.querySelector("#error");

//variables to hold values in input elements
let billVal = 0,
  peopleNr = 1,
  tipVal = 0.15,
  totalBill = 0;

billValue.addEventListener("change", getBillValue);
tips.forEach((tip) => {
  tip.addEventListener("click", buttonClick);
});
tipCustom.addEventListener("change", buttonCustom);
nrPeople.addEventListener("change", getPeopleNr);
resetBtn.addEventListener("click", reset);

function getBillValue() {
  billVal = parseFloat(billValue.value);
  calculateBill();
}

function getPeopleNr() {
  peopleNr = parseInt(nrPeople.value);
  calculateBill();
}

function buttonClick(ev) {
  tipCustom.value = "";
  tips.forEach((tip) => {
    tip.classList.remove("active");
    if (ev.target.innerHTML == tip.innerHTML) {
      tip.classList.add("active");
      tipVal = parseFloat(tip.innerHTML) / 100;
    }
  });
  calculateBill();
}

function buttonCustom() {
  tips.forEach((tip) => {
    tip.classList.remove("active");
  });

  console.log(tipCustom.value);
  tipVal = parseFloat(tipCustom.value) / 100;
  console.log(tipVal);
  calculateBill();
}

function displayErr() {
  nrPeople.classList.add("displayBorder");
  errText.classList.remove("hidden");
}

function removeErr() {
  errText.classList.add("hidden");
  nrPeople.classList.remove("displayBorder");
}
function verifyConditions() {
  if (peopleNr == 0) {
    //show error when dividing by 0
    displayErr();
    return false;
  }
  return true;
}

function calculateBill() {
  if (verifyConditions()) {
    removeErr();

    //calculate bill
    totalBill = billVal + tipVal * billVal;

    let tip1 = ((tipVal * billVal) / peopleNr).toFixed(2);
    let tip2 = (totalBill / peopleNr).toFixed(2);

    tipPerPerson.innerHTML = "$" + tip1;
    totalPerPerson.innerHTML = "$" + tip2;
  } else {
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";
  }
}

function reset() {
  billValue.value = "";
  nrPeople.value = "";
  tipPerPerson.innerHTML = "$0.00";
  totalPerPerson.innerHTML = "$0.00";

  tips.forEach((tip) => {
    tip.classList.remove("active");
    if (tip.innerHTML == "15%") tip.classList.add("active");
  });

  removeErr();
}
