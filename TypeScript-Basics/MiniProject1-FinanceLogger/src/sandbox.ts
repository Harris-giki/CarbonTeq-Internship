import { Invoice } from "./classes/invoice.js";
import { payment } from "./classes/payment.js";
import { HasFormatter } from "./interfaces/HasFormatter";
const invOne = new Invoice("maria", "work on the mario website", 250);

let invoices: Invoice[] = [];
invoices.push(invOne);

const form = document.querySelector(".new-item-form") as HTMLFormElement;

const type = document.querySelector("#type") as HTMLSelectElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let doc: HasFormatter;
  if (type.value === "invoice") {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new payment(tofrom.value, details.value, amount.valueAsNumber);
  }

  console.log(doc);
  // console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
  //  amount type has been explicitly defined as number
});
