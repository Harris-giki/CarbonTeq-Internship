import { Invoice } from "./classes/invoice";
const invOne = new Invoice("maria", "work on the mario website", 250);
let invoices = [];
invoices.push(invOne);
const anchor = document.querySelector("a");
const form = document.querySelector(".new-item-form");
// type casted the selection by class to make typescript know what type of element we
// have selected to use it properly
const type = document.querySelector("#type");
const tofrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
    // amount type has been explicitly defined as number
});
