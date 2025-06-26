let myLeads = [];
const inputEL = document.getElementById("input-el");
const inputBtn = document.getElementById("input=btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//if the local storage has something that we should render that first hand
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEL.value);
  inputEL.value = "";
  localStorage.setItem("myleads", JSON.stringify(myLeads));
  render(myLeads);
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
renderLeads();

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li> 
                        <a target = '_blank' href='${leads[i]}>
                            ${leads[i]} </a>
                        </li>`;
  }
  ulEl.innerHTML = listItems;
}
