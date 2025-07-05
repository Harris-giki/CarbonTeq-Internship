// MDX to JSON conversion

import {read, write} from 'to-vfile' // using vfile's options to read and write
import {unified} from 'unified' // to complete the syntax change pipeline
import remarkParse from 'remark-parse'  // This plugin takes Markdown content and parses it into a structured markdown syntax tree called mdast
import remarkMDX from 'remark-mdx' // The remark-mdx plugin extends the markdown parser (remark-parse) to support MDX syntax
import {fileURLToPath} from 'url'
import path from 'path'

// reading the MDX file using the  vfile

const file = await read('example.mdx') // remmeber read and write are async functions

const tree = await unified()
 .use(remarkParse)
 .use(remarkMDX)
 .parse(file)

file.value = JSON.stringify(tree, null, 2)
file.extname = '.json' // change the extension to .json
file.path = 'ast.json' // sets the file name 

await write (file)