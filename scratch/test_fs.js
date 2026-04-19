const { writeFile, mkdir } = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');

async function testUpload() {
  try {
    const filename = 'test-file.txt';
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'general');
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
      console.log('Created directory:', uploadDir);
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, 'test content');
    console.log('File successfully written to:', filePath);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testUpload();
