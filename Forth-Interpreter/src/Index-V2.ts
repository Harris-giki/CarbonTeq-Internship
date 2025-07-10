const input = process.argv.slice(2);
// built-in property to return array of arguments passed after Node.js run

const stackDS: number[] = []; // initializing an array of numbers to simulate stackDS
// function to check if the input is integer

// using a map/dictionary to store the user-defined commands as key/value
// note that map is a pre-defined class in TS/JS therefore new keyword to make an instance of that class
const userDefinedWord = new Map<string, string[]>();

function checkInteger(str: string): boolean {
  const num = Number(str);
  if (isNaN(num)) {
    // main logic to test for integer input
    return false;
  }
  if (str.includes(".")) return false; // logic to dis-allow floating points
  return true;
}
function MainFunction(input: string[]): void {
  let i = 0;
  while (i < input.length) {
    let token = input[i];
    if (checkInteger(token)) {
      const value = parseInt(token);
      if (value < -32768 || value > 32767)
        throw new Error("The integer value went out of bounds");
      else stackDS.push(value);
    } else if (token === "+") {
      if (stackDS.length < 2)
        throw new Error("stackDS does not have sufficient input");
      const a: number = stackDS.pop()!; // pop can return either a number or a undefined therefore ignore it
      const b: number = stackDS.pop()!;
      const result = a + b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stackDS.push(result);
    } else if (token === "-") {
      if (stackDS.length < 2)
        throw new Error("stackDS does not have sufficient input");
      const b: number = stackDS.pop()!; // pop can return either a number or a undefined therefore ignore it
      const a: number = stackDS.pop()!;
      const result: number = a - b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stackDS.push(result); // order of popping is important in substraction and division
    } else if (token === "/") {
      if (stackDS.length < 2)
        throw new Error("stackDS does not have sufficient input");
      const b: number = stackDS.pop()!; // pop can return either a number or a undefined therefore ignore it
      const a: number = stackDS.pop()!;
      const result: number = a / b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stackDS.push(result);
    } else if (token === "*") {
      if (stackDS.length < 2)
        throw new Error("stackDS does not have sufficient input");
      const a: number = stackDS.pop()!; // pop can return either a number or a undefined therefore ignore it
      const b: number = stackDS.pop()!;
      const result = a * b;
      if (result < -32768 || result > 32767)
        throw new Error("The integer value went out of bounds");
      else stackDS.push(result);
    }

    // handling stackDS words
    else if (token === "dup") {
      if (stackDS.length < 1)
        throw new Error("Not enough elements to perform 'duplication'");
      const topElement = stackDS[stackDS.length - 1];
      stackDS.push(topElement);
    } else if (token === "drop") {
      if (stackDS.length < 1)
        throw new Error("Not enough elements to perform 'drop'");
      stackDS.pop();
    } else if (token === "swap") {
      if (stackDS.length < 2)
        throw new Error("Not enough elements to perform 'Swap'");
      const a: number = stackDS.pop()!;
      const b: number = stackDS.pop()!;
      stackDS.push(a);
      stackDS.push(b);
    } else if (token === "over") {
      // method to copy the second to top element and push to the top again
      if (stackDS.length < 2)
        throw new Error("Not enough elements to perform 'Over'");
      const second_in_top = stackDS[stackDS.length - 2];
      stackDS.push(second_in_top);
    }

    // handling user defined methods
    else if (token === ":") {
      const WordName = input[++i];
      if (checkInteger(WordName))
        throw new Error("Cannot use number as word name");
      const definition: string[] = []; // an array to store the user specified commands
      i++; // right now we are pointing to the position ahead of the command name

      while (i < input.length && input[i] != ";") {
        definition.push(input[i]);
        i++;
      }

      if (i >= input.length || input[i] !== ";") {
        throw new Error("there is no ; to terminate the word definition");
      }
      userDefinedWord.set(WordName, definition);
    } else if (userDefinedWord.has(token)) {
      const definition: string[] = userDefinedWord.get(token)!; // use .get method to get a value from a map
      MainFunction([...definition]); // recursively run it
    }
    i++;
  }
}

MainFunction(input);
console.log(stackDS);

// readibility and modular code?
