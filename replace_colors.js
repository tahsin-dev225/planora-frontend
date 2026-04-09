const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function (filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace rose-600 and rose-500 with primary
  content = content.replace(/\brose-600\b/g, 'primary');
  content = content.replace(/\brose-500\b/g, 'primary');
  content = content.replace(/\bteal-600\b/g, 'secondary');
  content = content.replace(/\bteal-500\b/g, 'secondary');

  // Replace heading color hardcoded patterns
  content = content.replace(/text-gray-900 dark:text-white/g, 'text-[var(--heading-color)] dark:text-[var(--heading-color-dark)]');
  content = content.replace(/text-black dark:text-white/g, 'text-[var(--heading-color)] dark:text-[var(--heading-color-dark)]');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
