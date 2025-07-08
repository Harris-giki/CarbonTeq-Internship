import fs from "node:fs/promises"; // Import filesystem promises for async file operations
import remarkParse from "remark-parse"; // Import markdown parser plugin
import { unified } from "unified"; // Import unified processor for text processing pipeline
import remarkMDX from "remark-mdx"; // Import MDX plugin to handle JSX in markdown

// Interface defining the structure of AST nodes from the parser
interface ASTNode {
  type: string; // Node type (text, emphasis, strong, etc.)
  value?: string; // Text content for text nodes
  url?: string; // URL for link nodes
  name?: string; // Element name for JSX nodes
  children?: ASTNode[]; // Child nodes for container elements
  depth?: number; // Heading level (1-6) for heading nodes
}

// Interface defining the structure of Editor.js blocks
interface EditorJsBlock {
  id: string; // Unique identifier for each block
  type: 'paragraph' | 'header'; // Block type supported by Editor.js
  data: {
    text: string; // HTML content of the block
    level?: number; // Header level (only for header blocks)
  };
}

// Parse MDX content into an Abstract Syntax Tree (AST)
async function mdxToJson(file: string) {
  const tree = await unified().use(remarkParse).use(remarkMDX).parse(file); // Create unified processor with markdown and MDX plugins, then parse
  return tree; // Return the generated AST
}

// Generate a random 10-character ID for Editor.js blocks
function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // Character set for ID generation
  let result = ''; // Initialize empty result string
  for (let i = 0; i < 10; i++) { // Loop 10 times to create 10-character ID
    result += chars.charAt(Math.floor(Math.random() * chars.length)); // Add random character from charset
  }
  return result; // Return the generated ID
}

// Recursively extract and format text content from AST nodes into HTML
function extractFormattedText(node: ASTNode): string {
  if (node.type === 'text') { // Handle plain text nodes
    let text = node.value || ''; // Get text content or empty string
    text = text.replace(/~~(.+?)~~/g, '<s class="cdx-strikethrough">$1</s>'); // Convert ~~text~~ to strikethrough HTML
    return text; // Return processed text
  }

  if (node.type === 'emphasis') { // Handle italic formatting (*text*)
    return `<i>${(node.children || []).map(extractFormattedText).join('')}</i>`; // Wrap child content in italic tags
  }

  if (node.type === 'strong') { // Handle bold formatting (**text**)
    return `<b>${(node.children || []).map(extractFormattedText).join('')}</b>`; // Wrap child content in bold tags
  }

  if (node.type === 'delete') { // Handle strikethrough nodes (~~text~~)
    return `<s class="cdx-strikethrough">${(node.children || []).map(extractFormattedText).join('')}</s>`; // Wrap in strikethrough tags
  }

  if (node.type === 'mdxJsxTextElement') { // Handle JSX elements in MDX
    const content = (node.children || []).map(extractFormattedText).join(''); // Process child content
    if (node.name === 'u') { // Handle underline JSX element
      return `<u>${content}</u>`; // Wrap in underline tags
    } else if (node.name === 's') { // Handle strikethrough JSX element
      return `<s class="cdx-strikethrough">${content}</s>`; // Wrap in strikethrough tags
    }
  }

  if (node.type === 'link') { // Handle link nodes [text](url)
    const href = node.url || ''; // Get URL or empty string
    const text = (node.children || []).map(extractFormattedText).join(''); // Process link text content
    return `<a href="${href}">${text}</a>`; // Create anchor tag with href and text
  }

  if (node.children) { // Handle nodes with children
    return node.children.map(extractFormattedText).join(''); // Recursively process all children and join
  }

  return ''; // Return empty string for unhandled node types
}

// Convert AST node to Editor.js block format
function mapNodetoBlock(node: any): EditorJsBlock | null {
  const blockId = generateId(); // Generate unique ID for the block

  if (node.type === "heading") { // Handle heading nodes (# ## ### etc.)
    return {
      id: blockId, // Assign unique block ID
      type: "header", // Set block type to header
      data: {
        text: extractFormattedText(node), // Extract and format text content with rich formatting
        level: node.depth, // Set heading level (1-6)
      },
    };
  }

  if (node.type === "paragraph") { // Handle paragraph nodes
    return {
      id: blockId, // Assign unique block ID
      type: "paragraph", // Set block type to paragraph
      data: {
        text: extractFormattedText(node), // Extract and format text content with rich formatting
      },
    };
  }
  
  return null; // Return null for unsupported node types
}

// Main function to convert MDX content to Editor.js format
async function mdxToEditorJS(file: string) {
  let ast = await mdxToJson(file); // Parse MDX file into AST
  const blocks: EditorJsBlock[] = []; // Initialize empty blocks array

  for (const node of ast.children) { // Iterate through all top-level AST nodes
    const block = mapNodetoBlock(node); // Convert each node to Editor.js block
    if (block) blocks.push(block); // Add block to array if conversion was successful
  }

  const editorJson = { // Create Editor.js compatible JSON structure
    time: Date.now(), // Set current timestamp
    blocks, // Add all converted blocks
    version: "2.31.0-rc.7", // Set Editor.js version
  };

  await fs.writeFile( // Write JSON to file
    "editor.json", // Output filename
    JSON.stringify(editorJson, null, 2), // Convert to formatted JSON string
    "utf-8" // Set file encoding
  );
  console.log("✅ Written to editor.json"); // Log success message
}

const document: string = await fs.readFile("example.mdx", "utf-8"); // Read MDX file content
mdxToEditorJS(document); // Convert MDX to Editor.js format

// parse converts from MDX to an AST in unist format : Universal Syntax Tree
// remarkParse is a plugin that parses markdown. Goes from markdown to MDAST
// remarkMDX is a plugin that adds MDX support to the parser e.g. import/export blocks
// It Does not do parsing itself, but enhances what remark-parse can parse.
/*
Summary
parse() stops after generating the AST.
process() runs the full pipeline: parse → transform → compile.
Each .use() plugin is either:
A parser (remark-parse)
A parser enhancer (remark-mdx)
A transformer (unist-util-visit, custom plugins)
A compiler (remark-stringify, rehype-stringify)
*/