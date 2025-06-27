const dropdown = document.querySelectorAll(".dropdown select");

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected"; //default selection of USD
    } else if (select.name == "to" && currCode == "PKR") {
      newOption.selected = "selected"; //default selection of PKR
    }
    select.append(newOption);
    // evt is just a parameter, JS automatically passes info to
    // the function of what was changed and evt catches it,
    // so select element was changed and it passed

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};
