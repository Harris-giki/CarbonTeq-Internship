const inputs = process.argv.slice(2);
// built-in property to return array of arguments passed after Node.js run

const stack: number[] = []; // initializing an array of numbers to simulate stack
// function to check if the input is integer

// using a map/dictionary to store the user-defined commands as key/value
// note that map is a pre-defined class in TS/JS therefore new keyword to make an instance of that class
const userDefinedWords = new Map<string, string[]>();

function isInteger(str: string): boolean {
  const num = Number(str);
  if (isNaN(num)) {
    // main logic to test for integer inputs
    return false;
  }
  if (str.includes(".")) return false; // logic to dis-allow floating points
  return true;
}
function MainLogic(inputs: string[]): void {
  let i = 0;
  while (i < inputs.length) {
    let token = inputs[i];
    if (isInteger(token)) {
      const value = parseInt(token);
      if (value < -32768 || value > 32767)
        throw new Error("The integer value went out of bounds");
      else stack.push(value);
    } else if (token === "+") {
      if (stack.length < 2)
        throw new Error("Stack does not have sufficient inputs");
      const a: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
      const b: number = stack.pop()!;
      const result = a + b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stack.push(result);
    } else if (token === "-") {
      if (stack.length < 2)
        throw new Error("Stack does not have sufficient inputs");
      const b: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
      const a: number = stack.pop()!;
      const result: number = a - b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stack.push(result); // order of popping is important in substraction and division
    } else if (token === "/") {
      if (stack.length < 2)
        throw new Error("Stack does not have sufficient inputs");
      const b: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
      const a: number = stack.pop()!;
      const result: number = a / b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stack.push(result);
    } else if (token === "*") {
      if (stack.length < 2)
        throw new Error("Stack does not have sufficient inputs");
      const a: number = stack.pop()!; // pop can return either a number or a undefined therefore ignore it
      const b: number = stack.pop()!;
      const result = a * b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stack.push(result);
    }

    // handling stack words
    else if (token === "dup") {
      if (stack.length < 1)
        throw new Error("Not enough elements to perform 'duplication'");
      const topElement = stack[stack.length - 1];
      stack.push(topElement);
    } else if (token === "drop") {
      if (stack.length < 1)
        throw new Error("Not enough elements to perform 'drop'");
      stack.pop();
    } else if (token === "swap") {
      if (stack.length < 2)
        throw new Error("Not enough elements to perform 'Swap'");
      const a: number = stack.pop()!;
      const b: number = stack.pop()!;
      stack.push(a);
      stack.push(b);
    } else if (token === "over") {
      // method to copy the second to top element and push to the top again
      if (stack.length < 2)
        throw new Error("Not enough elements to perform 'Over'");
      const second_in_top = stack[stack.length - 2];
      stack.push(second_in_top);
    }

    // handling user defined methods
    else if (token === ":") {
      const WordName = inputs[++i];
      if (isInteger(WordName))
        throw new Error("Cannot use number as word name");
      const definition: string[] = []; // an array to store the user specified commands
      i++; // right now we are pointing to the position ahead of the command name

      while (i < inputs.length && inputs[i] != ";") {
        definition.push(inputs[i]);
        i++;
      }

      if (i >= inputs.length || inputs[i] !== ";") {
        throw new Error("there is no ; to terminate the word definition");
      }
      userDefinedWords.set(WordName, definition);
    } else if (userDefinedWords.has(token)) {
      const definition: string[] = userDefinedWords.get(token)!; // use .get method to get a value from a map
      MainLogic([...definition]); // recursively run it
    }
    i++;
  }
}

MainLogic(inputs);
console.log(stack);
