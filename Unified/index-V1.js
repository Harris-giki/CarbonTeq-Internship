// converting markdown to  html

import fs from 'node:fs/promises'
import rehypeStringify from 'rehype-stringify' // pluggin to convert syntax tree into strings of HTML
import remarkParse from 'remark-parse' // This plugin takes Markdown content and parses it into a structured syntax tree called mdast
import remarkRehype from 'remark-rehype' // This plugin converts the markdown tree (mdast) into an HTML syntax tree called hast.
import rehypeDocument from 'rehype-document' // gives our HTML output a full HTML page structure
import rehypeSlug from 'rehype-slug' // gives each of the heading an ID
import remarkToc from 'remark-toc'  // For table of contents
import rehypeFormat from 'rehype-format'
import {unified} from 'unified' // This imports the unified processor, which chain plugins together like a pipeline
 
const document = await fs.readFile('example.md', 'utf8') // 'utf8' tells Node to read it as a text file, not binary.
const file = await unified() // pipeline defined below
  .use(remarkParse) // 1. Parse Markdown string to its AST
  .use(remarkToc)  // Inject Table of Contents  
  .use(remarkRehype) // 2. Change Markdown AST (MDAST) into HTML AST (HAST)
  .use(rehypeSlug)        // Add IDs to headings
  .use(rehypeDocument, { title: 'Pluto' }) // Wrap in <html><head><body>
  .use(rehypeFormat)  // makes HTML nicely indented and clean
  .use(rehypeStringify).process(document) // 3. convert HTML AST into HTML String and rhn the process
  
console.log(String(file))