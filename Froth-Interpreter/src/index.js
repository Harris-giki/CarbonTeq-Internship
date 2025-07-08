"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const inputs = process.argv.slice(2);
// built-in property to return array of arguments passed after Node.js run
const stack = []; // initializing an array of numbers to simulate stack
// function to check if the input is integer
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
for (const token of inputs) {
    if (isInteger(token)) {
        stack.push(parseInt(token));
    }
    else if (token === "+") {
        if (stack.length < 2)
            throw (0, console_1.error)("Stack does not have sufficient inputs");
        const a = stack.pop(); // pop can return either a number or a undefined therefore ignore it
        const b = stack.pop();
        stack.push(a + b);
    }
    else if (token === "-") {
        if (stack.length < 2)
            throw (0, console_1.error)("Stack does not have sufficient inputs");
        const a = stack.pop(); // pop can return either a number or a undefined therefore ignore it
        const b = stack.pop();
        stack.push(a - b);
    }
    else if (token === "/") {
        if (stack.length < 2)
            throw (0, console_1.error)("Stack does not have sufficient inputs");
        const b = stack.pop(); // pop can return either a number or a undefined therefore ignore it
        const a = stack.pop();
        stack.push(a / b);
    }
    else if (token === "*") {
        if (stack.length < 2)
            throw (0, console_1.error)("Stack does not have sufficient inputs");
        const a = stack.pop(); // pop can return either a number or a undefined therefore ignore it
        const b = stack.pop();
        stack.push(a * b);
    }
}
const top = stack[stack.length - 1];
console.log(stack);
