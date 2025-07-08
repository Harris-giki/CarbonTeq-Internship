import { error } from "console";

const inputs = process.argv.slice(2);
// built-in property to return array of arguments passed after Node.js run

const stack: number[] = []; // initializing an array of numbers to simulate stack
// function to check if the input is integer
function isInteger(str: string): boolean {
  const num = Number(str);
  if (isNaN(num)) {
    // main logic to test for integer inputs
    return false;
  }
  if (str.includes(".")) return false; // logic to dis-allow floating points
  return true;
}

for (const token of inputs) {
  if (isInteger(token)) {
    stack.push(parseInt(token));
  } else if (token === "+") {
    if (stack.length < 2) throw error("Stack does not have sufficient inputs");
    const a: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
    const b: number = stack.pop()!;
    stack.push(a + b);
  } else if (token === "-") {
    if (stack.length < 2) throw error("Stack does not have sufficient inputs");
    const b: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
    const a: number = stack.pop()!;
    stack.push(a - b); // order of popping is important in substraction and division
  } else if (token === "/") {
    if (stack.length < 2) throw error("Stack does not have sufficient inputs");
    const b: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
    const a: number = stack.pop()!;
    stack.push(a / b);
  } else if (token === "*") {
    if (stack.length < 2) throw error("Stack does not have sufficient inputs");
    const a: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
    const b: number = stack.pop()!;
    stack.push(a * b);
  }
}
const top = stack[stack.length - 1];
console.log(stack);
