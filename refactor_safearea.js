const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'screens');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('<SafeAreaView')) {
                // Replace opening tags
                content = content.replace(/<SafeAreaView/g, '<View');
                // Replace closing tags
                content = content.replace(/<\/SafeAreaView>/g, '</View>');
                
                // Remove the import from react-native-safe-area-context
                content = content.replace(/import\s*\{\s*SafeAreaView\s*\}\s*from\s*['"]react-native-safe-area-context['"];?\r?\n?/g, '');
                
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    });
}

console.log('Starting refactor...');
processDirectory(screensDir);
console.log('Refactor complete.');
