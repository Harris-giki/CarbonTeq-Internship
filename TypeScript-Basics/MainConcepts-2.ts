// **function signatures **

// example 1

let greetNew: (a: string, b: string) => void;

greetNew = (name: string, greetings: string) => {
  console.log(`${name} is saying "${greetings}"`);
};

// **classes and object **

class Invoice1 {
  client: string;
  details: string;
  amount: number;
  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }
  //you can specify access modifiers for variables at the initialization or the constructor
  format() {
    return `${this.client} owes ${this.amount} for ${this.details}`;
  }
}

const invOne1 = new Invoice1("maria", "work on the mario website", 250);

// creating an array of class objects
let invoices1: Invoice1[] = [];
invoices1.push(invOne1);

// ** Interfaces **
// An interface in TypeScript is a way to define the structure of an object — what
// properties and types it must have — without providing actual implementation.

interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: "Haris",
  age: 20,
};

// **GENERICs**
