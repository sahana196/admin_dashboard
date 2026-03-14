const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Building frontend...');
try {
    execSync('npm run build --prefix frontend', { stdio: 'inherit' });
} catch (error) {
    console.error('Frontend build failed!');
    process.exit(1);
}

const frontendDistDir = path.join(__dirname, 'frontend', 'dist');
if (!fs.existsSync(frontendDistDir)) {
    console.error(`Build directory not found at ${frontendDistDir}`);
    process.exit(1);
}

const rootDistDir = path.join(__dirname, 'dist');
if (!fs.existsSync(rootDistDir)) {
    fs.mkdirSync(rootDistDir);
}

console.log('Copying build artifacts to root dist folder...');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Only copy the specific files we need to avoid cluttering root too much if possible, 
// but for a reliable deploy, we copy everything from dist.
const files = fs.readdirSync(frontendDistDir);
files.forEach(file => {
    const src = path.join(frontendDistDir, file);
    const dest = path.join(rootDistDir, file);
    
    // Skip node_modules, .git, etc. if they somehow ended up in dist
    if (file === 'node_modules' || file === '.git') return;
    
    console.log(`Copying ${file}...`);
    copyRecursiveSync(src, dest);
});

console.log('Build and copy complete!');
