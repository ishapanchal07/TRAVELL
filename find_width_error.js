const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Check if width is used as a variable but not defined
    // We look for usage like "width *" or "width /" or "width," or "width }" or ": width" (as value)
    const usageRegex = /[^a-zA-Z]width[^a-zA-Z:]/g;
    const definitionRegex = /const\s*{\s*width\s*}/;
    const definitionRegex2 = /const\s*{\s*[^}]*,\s*width\s*[^}]*}\s*=/;
    const definitionRegex3 = /const\s*{\s*width\s*,[^}]*}\s*=/;

    if (usageRegex.test(content)) {
        if (!definitionRegex.test(content) && !definitionRegex2.test(content) && !definitionRegex3.test(content)) {
            // Also check for 'expo-image' ImageBackground issue I suspect
            console.log(`Potential issue in: ${file}`);
        }
    }
});
