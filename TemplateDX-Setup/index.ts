import {load} from "@agentmark/templatedx"
import fs from "node:fs";

const toFile = async () => {
    const ast = await load("./test.mdx") 
    fs.writeFileSync("test.json", JSON.stringify(ast, null, 2))
}

toFile()