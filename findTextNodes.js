const fs = require('fs');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const files = glob.sync('src/**/*.{js,jsx}');

let found = false;

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    try {
        const ast = parser.parse(code, {
            sourceType: "module",
            plugins: ["jsx"]
        });

        traverse(ast, {
            JSXText(path) {
                const text = path.node.value;
                if (text.trim().length > 0) {
                    let parent = path.parent;
                    if (parent.type === 'JSXFragment') {
                        console.log(`\nFound real text inside Fragment in ${file} at line ${path.node.loc.start.line}:`);
                        console.log(`Text: "${text.trim()}"`);
                        found = true;
                    } else if (parent.type === 'JSXElement') {
                        const parentName = parent.openingElement.name.name;
                        if (parentName !== 'Text' && parentName !== 'TextInput') {
                            console.log(`\nFound real text inside ${parentName} in ${file} at line ${path.node.loc.start.line}:`);
                            console.log(`Text: "${text.trim()}"`);
                            found = true;
                        }
                    }
                }
            }
        });
    } catch (e) {}
});
if (!found) console.log('No stray text strings inside Fragments or Views found!');
