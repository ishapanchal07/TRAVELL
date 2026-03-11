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
            JSXExpressionContainer(path) {
                // Ignore empty expressions (comments)
                if (path.node.expression.type === 'JSXEmptyExpression') return;

                let parent = path.parent;
                // If the {} expression is a child of an element
                if (parent.type === 'JSXElement' || parent.type === 'JSXFragment') {
                    let parentName = parent.type === 'JSXFragment' ? 'Fragment' : parent.openingElement.name.name;
                    
                    // And that element is NOT Text or TextInput
                    if (parentName !== 'Text' && parentName !== 'TextInput') {
                        // Check if it's just a variable or something that could be a string
                        // Ignore components (starts with uppercase) inside expressions (often false)
                        // Ignore standard JSX elements (e.g. {condition && <View/>})
                        
                        const isSafe = (node) => {
                            if (node.type === 'JSXElement' || node.type === 'JSXFragment') return true;
                            if (node.type === 'LogicalExpression' && isSafe(node.right)) return true;
                            if (node.type === 'ConditionalExpression' && isSafe(node.consequent) && isSafe(node.alternate)) return true;
                            if (node.type === 'CallExpression') {
                                // .map() usually returns elements
                                if (node.callee && node.callee.property && node.callee.property.name === 'map') return true;
                            }
                            // Functions returning JSX are safe
                            if (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') return true;
                            return false;
                        };

                        if (!isSafe(path.node.expression)) {
                            const loc = path.node.loc.start.line;
                            const exprStr = code.substring(path.node.start, path.node.end);
                            console.log(`\nPotential variable child in ${file}:${loc}`);
                            console.log(`Inside <${parentName}>: ${exprStr}`);
                            found = true;
                        }
                    }
                }
            }
        });
    } catch (e) {}
});
if (!found) console.log('No potential variable children found!');
