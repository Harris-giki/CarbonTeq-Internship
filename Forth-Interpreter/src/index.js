"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputs = process.argv.slice(2);
// built-in property to return array of arguments passed after Node.js run
const stack = []; // initializing an array of numbers to simulate stack
// function to check if the input is integer
// using a map/dictionary to store the user-defined commands as key/value
// note that map is a pre-defined class in TS/JS therefore new keyword to make an instance of that class
const userDefinedWords = new Map();
function isInteger(str) {
    const num = Number(str);
    if (isNaN(num)) {
        // main logic to test for integer inputs
        return false;
    }
    if (str.includes("."))
        return false; // logic to dis-allow floating points
    return true;
}
function MainLogic(inputs) {
    let i = 0;
    while (i < inputs.length) {
        let token = inputs[i];
        if (isInteger(token)) {
            stack.push(parseInt(token));
        }
        else if (token === "+") {
            if (stack.length < 2)
                throw new Error("Stack does not have sufficient inputs");
            const a = stack.pop(); // pop can return either a number or a undefined therefore ignore it
            const b = stack.pop();
            stack.push(a + b);
        }
        else if (token === "-") {
            if (stack.length < 2)
                throw new Error("Stack does not have sufficient inputs");
            const b = stack.pop(); // pop can return either a number or a undefined therefore ignore it
            const a = stack.pop();
            stack.push(a - b); // order of popping is important in substraction and division
        }
        else if (token === "/") {
            if (stack.length < 2)
                throw new Error("Stack does not have sufficient inputs");
            const b = stack.pop(); // pop can return either a number or a undefined therefore ignore it
            const a = stack.pop();
            stack.push(a / b);
        }
        else if (token === "*") {
            if (stack.length < 2)
                throw new Error("Stack does not have sufficient inputs");
            const a = stack.pop(); // pop can return either a number or a undefined therefore ignore it
            const b = stack.pop();
            stack.push(a * b);
        }
        // handling stack words
        else if (token === "dup") {
            if (stack.length < 1)
                throw new Error("Not enough elements to perform 'duplication'");
            const top = stack[stack.length - 1];
            stack.push(top);
        }
        else if (token === "drop") {
            if (stack.length < 1)
                throw new Error("Not enough elements to perform 'drop'");
            stack.pop();
        }
        else if (token === "swap") {
            if (stack.length < 2)
                throw new Error("Not enough elements to perform 'Swap'");
            const a = stack.pop();
            const b = stack.pop();
            stack.push(a);
            stack.push(b);
        }
        else if (token === "over") {
            // method to copy the second to top element and push to the top again
            if (stack.length < 2)
                throw new Error("Not enough elements to perform 'Over'");
            const second_in_top = stack[stack.length - 2];
            stack.push(second_in_top);
        }
        // handling user defined methods
        else if (token === ":") {
            const WordName = inputs[++i];
            if (isInteger(token))
                throw new Error("Cannot use number as word name");
            const definition = []; // an array to store the user specified commands
            i++; // right now we are pointing to the position ahead of the command name
            while (i < inputs.length && inputs[i] != ";") {
                definition.push(inputs[i]);
                i++;
            }
            if (inputs[i] !== ";") {
                throw new Error("there is no ; to terminate the word definition");
            }
            userDefinedWords.set(WordName, definition);
        }
        else if (userDefinedWords.has(token)) {
            const definition = userDefinedWords.get(token); // use .get method to get a value from a map
            MainLogic([...definition]); // recursively run it
        }
        i++;
    }
}
MainLogic(inputs);
const top = stack[stack.length - 1];
console.log(stack);
