"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function convertAstToEditorJs(ast) {
    const editorJsData = {
        time: Date.now(),
        blocks: [],
        version: '2.31.0-rc.7'
    };
    ast.children.forEach((node) => {
        const block = convertNodeToBlock(node);
        if (block) {
            editorJsData.blocks.push(block);
        }
    });
    return editorJsData;
}
// If the node is a paragraph, convert it into a valid Editor.js block. Otherwise, ignore it (return null).
function convertNodeToBlock(node) {
    const blockId = generateId();
    if (node.type === 'paragraph') {
        return {
            id: blockId,
            type: 'paragraph',
            data: {
                text: extractFormattedText(node)
            }
        };
    }
    return null;
}
function extractFormattedText(node) {
    if (node.type === 'text') {
        // Handle strikethrough patterns in text nodes
        let text = node.value || '';
        // Convert ~~text~~ to <s class="cdx-strikethrough">text</s>
        text = text.replace(/~~(.+?)~~/g, '<s class="cdx-strikethrough">$1</s>');
        return text;
    }
    if (node.type === 'emphasis') {
        return `<i>${(node.children || []).map(extractFormattedText).join('')}</i>`;
    }
    if (node.type === 'strong') {
        return `<b>${(node.children || []).map(extractFormattedText).join('')}</b>`;
    }
    // Handle strikethrough - multiple possible node types
    if (node.type === 'delete') {
        return `<s class="cdx-strikethrough">${(node.children || []).map(extractFormattedText).join('')}</s>`;
    }
    if (node.type === 'mdxJsxTextElement') {
        const content = (node.children || []).map(extractFormattedText).join('');
        if (node.name === 'u') {
            return `<u>${content}</u>`;
        }
        else if (node.name === 's') {
            return `<s class="cdx-strikethrough">${content}</s>`;
        }
    }
    if (node.type === 'link') {
        const href = node.url || '';
        const text = (node.children || []).map(extractFormattedText).join('');
        return `<a href="${href}">${text}</a>`;
    }
    if (node.children) {
        return node.children.map(extractFormattedText).join('');
    }
    return '';
}
function generateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
// 🧪 Main entry
try {
    const astData = fs_1.default.readFileSync('ast.json', 'utf8');
    const ast = JSON.parse(astData);
    const output = convertAstToEditorJs(ast);
    fs_1.default.writeFileSync('output.json', JSON.stringify(output, null, 2));
    console.log('✅ Conversion complete! Check output.json');
}
catch (err) {
    console.error('❌ Error:', err.message);
}
