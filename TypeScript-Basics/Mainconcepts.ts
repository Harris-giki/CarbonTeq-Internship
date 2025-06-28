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
