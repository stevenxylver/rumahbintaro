const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourcePath = 'C:\\Users\\stevm\\.gemini\\antigravity\\brain\\addc6615-409e-47ec-ba89-ebe14fed1ded\\hero_poster_placeholder_1777728475230.png';
const targetPath = 'c:\\Users\\stevm\\Downloads\\deploybintarojaya\\rumahbintaro\\public\\images\\hero-poster.webp';

async function optimizeImage() {
    try {
        if (!fs.existsSync(sourcePath)) {
            console.error('Source file not found:', sourcePath);
            return;
        }

        await sharp(sourcePath)
            .webp({ quality: 80 })
            .toFile(targetPath);
        
        console.log('Image optimized and saved to:', targetPath);
    } catch (error) {
        console.error('Error optimizing image:', error);
    }
}

optimizeImage();
