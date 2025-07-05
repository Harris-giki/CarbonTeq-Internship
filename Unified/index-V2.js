// converting markdown to  html

// | Feature                             | `fs.readFile()` | `to-vfile.read()` |
// | ----------------------------------- | --------------- | ----------------- |
// | Only reads raw text                 | ✅               | ✅                 |
// | Gives path/filename info            | ❌               | ✅                 |
// | Supports error/warning messages     | ❌               | ✅                 |
// | Works natively with unified plugins | ❌               | ✅                 |
// | Can be written back easily          | ❌               | ✅                 |
// | Trackable, inspectable, extendable  | ❌               | ✅                 |


import rehypeDocument from 'rehype-document'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import {read, write} from 'to-vfile' // neccesary library for read/write files as virtual objects 
import {unified} from 'unified'
import {reporter} from 'vfile-reporter' // pretty prints a report of any warning, errors, or messages related to virtual file
import remarkRetext from 'remark-retext' // Bridges between remark (markdown) and retext (natural language)
import retextEnglish from 'retext-english' //Parses English into a structure it can analyze
import retextIndefiniteArticle from 'retext-indefinite-article'


const file = await read('example.md') // read a virtual file object

await unified()
   .use(remarkParse)
   .use(remarkToc)
   .use(remarkRehype)
   .use(rehypeSlug)
   .use(rehypeDocument, {title: 'Pluto'})
   .use(rehypeStringify)
   .use(remarkRetext, unified().use(retextEnglish).use(retextIndefiniteArticle)) // for spelling, article use errors check
   .process(file) // attach processing results to the virtual file

console.error(reporter(file)) // for printing a pretty report(E.g: error/warning)
file.extname = '.html' // change the file extension to .html 
await write(file) // save the result back to the disk