import { Invoice } from "./classes/invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { payment } from "./classes/payment.js";
// const invOne = new Invoice("maria", "work on the mario website", 250);
// let invoices: Invoice[] = [];
// invoices.push(invOne);
const form = document.querySelector(".new-item-form");
const type = document.querySelector("#type");
const tofrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, "end");
    // console.log(doc);
    // console.log(type.value, tofrom.value, details.value, amount.valueAsNumber);
    //  amount type has been explicitly defined as number
});
