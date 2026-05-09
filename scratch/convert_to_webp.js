const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function convertToWebp(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

    const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
        await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        const origSize = fs.statSync(filePath).size;
        const newSize = fs.statSync(webpPath).size;
        const saved = ((1 - newSize / origSize) * 100).toFixed(1);
        console.log(`✅ ${path.relative(publicDir, filePath)} → .webp (saved ${saved}%)`);
    } catch (err) {
        console.error(`❌ Failed: ${filePath} - ${err.message}`);
    }
}

async function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await walkDir(fullPath);
        } else {
            await convertToWebp(fullPath);
        }
    }
}

async function main() {
    console.log('🔄 Converting all PNG/JPG/JPEG to WebP...\n');
    await walkDir(path.join(publicDir, 'images'));
    console.log('\n✅ All conversions complete!');
}

main();
