const dropdown = document.querySelectorAll(".dropdown select");
const FetchURL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";
const getResultBtn = document.querySelector("button");

let msgChange = document.querySelector(".msg");
let value_to_convert = "";
let countryCode = "";
let passingCurrency = "PKR";
for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "EUR") {
      newOption.selected = "selected"; //default selection of USD
    } else if (select.name == "to" && currCode == "PKR") {
      newOption.selected = "selected"; //changeable default selection of PKR
    }
    select.append(newOption);
    // evt is just a parameter, JS automatically passes info to
    // the function of what was changed and evt catches it,
    // so select element was changed and it passed
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    if (evt.target.name === "to") {
      passingCurrency = evt.target.value;
      getData(evt.target.value);
    }
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const getData = async (toCurreny) => {
  let response = await fetch(FetchURL);
  let data = await response.json();
  value_to_convert = data.eur[toCurreny.toLowerCase()];
  console.log(value_to_convert);
};
const getResult = (parameterhere) => {
  let inputValue = document.querySelector("input").value;
  msgChange.innerHTML = `1 EUR = ${value_to_convert} ${parameterhere}`;
  let numbers = parseInt(inputValue);
  let converter = parseInt(value_to_convert);
  let answer = numbers * converter;
  let output = document.querySelector(".output");
  output.innerText = answer;
};
getResultBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form reload on button click
  getResult(passingCurrency);
});
