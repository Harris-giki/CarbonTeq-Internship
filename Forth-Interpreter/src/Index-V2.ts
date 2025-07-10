import * as readline from "readline";

// required data structures
const stackDS: number[] = [];

type Instruction =
  | { type: "int"; value: number }
  | { type: "builtin"; value: string }
  | { type: "word"; value: string };

const userDefinedWord = new Map<string, Instruction[]>();

// helper function

function checkInteger(string: string): boolean {
  const number = Number(string);
  if (isNaN(number)) {
    // main logic to test for integer inputs
    return false;
  }
  if (string.includes(".")) return false; // logic to dis-allow floating points
  return true;
}

// parser

function Parser(tokens: string[]): Instruction[] {
  const result: Instruction[] = [];

  for (let token of tokens) {
    if (checkInteger(token)) {
      const value = parseInt(token);
      if (value < -32768 || value > 32767)
        throw new Error(`Integer out of bounds: ${value}`);
      result.push({ type: "int", value: value });
    } else if (
      ["+", "-", "*", "/", "dup", "drop", "swap", "over"].includes(token)
    ) {
      result.push({ type: "builtin", value: token });
    } else if (/^[a-z]+$/.test(token)) {
      result.push({ type: "word", value: token });
    } else {
      throw new Error(`Invalid token: ${token}`);
    }
  }
  return result;
}

// Evaluater

function evaluate(Instruction: Instruction[]): void {
  for (const instr of Instruction) {
    if (instr.type === "int") {
      stackDS.push(instr.value);
    } else if (instr.type === "builtin") {
      const op = instr.value;

      // Arithmetic
      if (op === "+") {
        if (stackDS.length < 2) throw new Error("Not enough values for '+'");
        stackDS.push(stackDS.pop()! + stackDS.pop()!);
      } else if (op === "-") {
        if (stackDS.length < 2) throw new Error("Not enough values for '-'");
        const b = stackDS.pop()!,
          a = stackDS.pop()!;
        stackDS.push(a - b);
      } else if (op === "*") {
        if (stackDS.length < 2) throw new Error("Not enough values for '*'");
        stackDS.push(stackDS.pop()! * stackDS.pop()!);
      } else if (op === "/") {
        if (stackDS.length < 2) throw new Error("Not enough values for '/'");
        const b = stackDS.pop()!,
          a = stackDS.pop()!;
        stackDS.push(Math.trunc(a / b)); // Truncated integer division

        // Stack operations
      } else if (op === "dup") {
        if (stackDS.length < 1) throw new Error("Stack underflow on 'dup'");
        stackDS.push(stackDS[stackDS.length - 1]);
      } else if (op === "drop") {
        if (stackDS.length < 1) throw new Error("Stack underflow on 'drop'");
        stackDS.pop();
      } else if (op === "swap") {
        if (stackDS.length < 2) throw new Error("Stack underflow on 'swap'");
        const a = stackDS.pop()!,
          b = stackDS.pop()!;
        stackDS.push(a, b);
      } else if (op === "over") {
        if (stackDS.length < 2) throw new Error("Stack underflow on 'over'");
        stackDS.push(stackDS[stackDS.length - 2]);
      }
    } else if (instr.type === "word") {
      if (!userDefinedWord.has(instr.value))
        throw new Error(`Undefined word: ${instr.value}`);
      const def = userDefinedWord.get(instr.value)!;
      evaluate(def); // Recursive evaluation }
    }
  }
}

function MainFunction(input: string[]): void {
  let i = 0;
  while (i < input.length) {
    const token = input[i];
    if (token === ":") {
      const wordName = input[++i];
      if (checkInteger(wordName))
        throw new Error("Cannot use number as word name");

      const defTokens: string[] = [];
      while (++i < input.length && input[i] !== ";") {
        defTokens.push(input[i]);
      }

      if (i >= input.length || input[i] !== ";") {
        throw new Error("Missing ';' to end definition");
      }

      const parsedDef = Parser(defTokens); // definition stored as language primative
      userDefinedWord.set(wordName, parsedDef);
    } else {
      const remaining = input.slice(i);
      const parsed = Parser(remaining);
      evaluate(parsed);
      break; // once instructions start, stop parsing further input
    }

    i++;
  }
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Forth> ",
});

console.log("Mini Forth Interpreter: Type 'exit' to quit.");
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim().toLowerCase().split(/\s+/);

  if (input[0] === "exit" || input[0] === "quit") {
    rl.close(); // End session
    return;
  }

  try {
    MainFunction(input);
    console.log("Stack:", stackDS);
  } catch (err) {
    console.error("Error:", (err as Error).message);
  }

  rl.prompt(); // Keep session open
});

rl.on("close", () => {
  console.log("Closed Program");
  process.exit(0);
});
