import { GoogleGenerativeAI } from "@google/generative-ai";
import { getUserById, updateUserEmail } from "./db";
import dotenv from "dotenv";
dotenv.config();
// Type definitions
interface DatabaseArguments {
  user_id?: number;
  new_email?: string;
}

interface ClassificationResult {
  category: "database" | "general";
  function?: string;
  arguments?: DatabaseArguments;
}

// Initialize Gemini API
const API_KEY: string = process.env.GOOGLE_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function classifyAndRespond(prompt: string): Promise<string> {
  const classifyPrompt = `
You are an AI agent. Your job is to classify the following user request into one of two categories:

1. 'database' – if the user is trying to access, update, or interact with the database
2. 'general' – if it's a question or something that doesn't require accessing the database

Also extract any required parameters (like user ID or email) if it's a database request.

Example format:
Category: database
Function: get_user_by_id
Arguments: { "user_id": 5 }

Now classify:
User: "${prompt}"
`;

  try {
    const result = await model.generateContent(classifyPrompt);
    const response = result.response.text();

    console.log("LLM Classification Output:");
    console.log(response);

    if (response.includes("database")) {
      // Extract JSON part from the "Arguments" line
      const match = response.match(/Arguments:\s*(\{.*\})/);
      if (match) {
        try {
          const args: DatabaseArguments = JSON.parse(match[1]);

          if (response.includes("get_user_by_id")) {
            if (args.user_id) {
              const result = await getUserById(args.user_id);
              return typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2);
            } else {
              return "User ID is required.";
            }
          } else if (response.includes("update_user_email")) {
            if (args.user_id && args.new_email) {
              return await updateUserEmail(args.user_id, args.new_email);
            } else {
              return "User ID and new email are required.";
            }
          }
        } catch (error) {
          return "Couldn't parse arguments.";
        }
      }
    }

    // For general requests, generate a response
    const generalResult = await model.generateContent(prompt);
    return generalResult.response.text();
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while processing your request.";
  }
}

// Interactive loop for Node.js
async function runInteractiveLoop(): Promise<void> {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(question, (answer: string) => {
        resolve(answer);
      });
    });
  };

  console.log("AI Agent started. Type 'exit' or 'quit' to stop.");

  while (true) {
    try {
      const prompt = await askQuestion("\nYou: ");

      if (prompt.toLowerCase() === "exit" || prompt.toLowerCase() === "quit") {
        break;
      }

      const result = await classifyAndRespond(prompt);
      console.log("Agent:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  rl.close();
}

// Export for use in other modules or run directly
export { classifyAndRespond };

// Run if this file is executed directly
if (require.main === module) {
  runInteractiveLoop().catch(console.error);
}
