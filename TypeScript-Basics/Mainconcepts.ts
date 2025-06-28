let character = "mario"; //string
let age = 30; // numbers
let isBlackBelt = false; //boolean

// once the type is set during initialization
// it cannot be changed later rather only modified in the same type
character = "haris"; // correct

// **functions**
// defining function parameters type
const circ = (diameter: number) => {
  return diameter * Math.PI;
};

// **arrays** in typescript

let names = ["hello", "world"];
names.push("apple"); // can be pushed
// name.push(2); generates error

let mixed = ["hello", 3, true];
// this can push all the types defined on initialization

// **objects** in typescript (similar in concept as defined above)

let ninja = {
  name: "mario",
  belt: "black",
  age: 30,
};

ninja.age = 40;
ninja.name = "ryu";
// ninja.age = 'haris' // would generate an error

// **explict types** -> explicitly setting datatypes

let newCharacter: string;
let newAge: number;
let isLoggedIn: boolean;

let ninjas: string[] = []; //initialized as an empty array to use push/pop

let newMixed: (string | number)[] = []; //union type for multiple datatypes arrays

let ninjasOne: object;
ninjasOne = { name: "haris", ninjaAge: 40 };

// OR

let ninjaTwo: {
  name: string;
  age: number;
  beltcolor: string;
};

// ** any data-type **

let yourAge: any = 25; //initialized with a number
yourAge = true; // changed to boolean
yourAge = "tweentyFive"; // changed to string
yourAge = { name: "haris", age25: "twentyfive" }; //changed to object

let newerMixed: any[] = [];

newerMixed.push(5);
newerMixed.push("haris");
newerMixed.push(true);
newerMixed.push(mixed);

// ** function basics **

const add = (a: number, b: number, c?: number | string) => {
  console.log(a + b);

  // this function has the return type void
};
// 'c' is an optional parameter which can be either a number or a string

const addnew = (a: number, b: number, c: number | string = 10) => {
  console.log(a + b);
  // this function has the return type void
};
// 'c' has a default value that is 10

const minus = (a: number, b: number) => {
  return a - b;
};

let result = minus(10, 9);
// now result has the same type as what was returned by the function

const minuNew = (a: number, b: number): number => {
  return a - b;
  // this function has the return type explicilty mentioned
};

// **type Allias**

type StringOrNum = string | number;

const logDetails = (uid: StringOrNum, item: string) => {
  console.log(`${item} has the uid of ${uid}`);
};

type objWithName = {
  name: string;
  uid: StringOrNum;
};

const greet = (user: objWithName) => {
  console.log(`${user.name} says hello`);
};
