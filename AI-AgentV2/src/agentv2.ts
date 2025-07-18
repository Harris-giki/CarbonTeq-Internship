import {
  GoogleGenerativeAI,
  Tool,
  FunctionDeclarationSchemaType,
} from "@google/generative-ai";
import dotenv from "dotenv";
import readline from "readline"; // node module for input read @ terminal
import { getUserById, updateUserEmail } from "./db";

dotenv.config();
// Setup Gemini model with tools
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "get_user_by_id", // name of the tool
        description: "Fetches user details based on user ID",
        parameters: {
          // expected parameters
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            user_id: {
              type: FunctionDeclarationSchemaType.NUMBER,
              description: "The unique ID of the user",
            },
          },
          required: ["user_id"],
        },
      },
      {
        name: "update_user_email",
        description: "Updates a user's email by ID",
        parameters: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            user_id: {
              type: FunctionDeclarationSchemaType.NUMBER,
              description: "The user's ID",
            },
            new_email: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The new email to set",
            },
          },
          required: ["user_id", "new_email"],
        },
      },
    ],
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools,
});

// setup CMD for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user continuously
function promptUser() {
  rl.question("You > ", async (input) => {
    if (
      input.trim().toLowerCase() === "exit" ||
      input.trim().toLowerCase() === "quit"
    ) {
      rl.close();
      return;
    }

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      const response = result.response;

      let functionCall = undefined;

      if (response.functionCalls) {
        const functionCalls = response.functionCalls(); // call the method normally
        if (functionCalls && functionCalls.length > 0) {
          functionCall = functionCalls[0]; // get the first function call
        }
      }

      if (!functionCall) {
        const text = await response.text();
        console.log("Gemini >", text);
      } else {
        const { name, args } = functionCall;

        if (name === "get_user_by_id") {
          const { user_id } = args as { user_id: number };
          const user = await getUserById(user_id);
          console.log("Tool Response >", user);
        } else if (name === "update_user_email") {
          const { user_id, new_email } = args as {
            user_id: number;
            new_email: string;
          };
          const result = await updateUserEmail(user_id, new_email);
          console.log("Tool Response >", result);
        } else {
          console.log("Unknown tool function:", name);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    promptUser(); // Recursively call again
  });
}

// Start the loop
console.log(
  "Welcome to Gemini AI Agent. Type your prompt (type 'exit' to quit):"
);
promptUser();
