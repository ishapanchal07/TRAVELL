const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'screens');

function optimizePadding() {
    const files = fs.readdirSync(screensDir);
    let count = 0;

    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        
        const fullPath = path.join(screensDir, file);
        const originalContent = fs.readFileSync(fullPath, 'utf8');
        
        // Match paddingTop: <number>
        // and reduce any number >= 30 down to 15 to compensate for global safearea
        const newContent = originalContent.replace(/paddingTop:\s*(\d+)/g, (match, p1) => {
            const val = parseInt(p1, 10);
            if (val >= 30) {
                return `paddingTop: 15`;
            }
            return match;
        });

        if (newContent !== originalContent) {
            fs.writeFileSync(fullPath, newContent, 'utf8');
            console.log(`Optimized top padding in: ${file}`);
            count++;
        }
    });

    console.log(`Successfully optimized padding in ${count} screen files.`);
}

optimizePadding();
