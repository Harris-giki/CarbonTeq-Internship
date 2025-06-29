import { Invoice } from "./classes/invoice";

const invOne = new Invoice("maria", "work on the mario website", 250);

let invoices: Invoice[] = [];
invoices.push(invOne);

const anchor = document.querySelector("a");
const form = document.querySelector(".new-item-form") as HTMLFormElement;

// type casted the selection by class to make typescript know what type of element we
// have selected to use it properly

const type = document.querySelector("#type") as HTMLSelectElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
  // amount type has been explicitly defined as number
});
