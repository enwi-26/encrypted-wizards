const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const internsDataPath = path.join(__dirname, '../src/data/interns.json');
const outputDir = path.join(__dirname, '../public/qrcodes');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRCodes() {
  try {
    const data = fs.readFileSync(internsDataPath, 'utf8');
    const interns = JSON.parse(data);

    for (const intern of interns) {
      const url = `http://localhost:3000/verify/${intern.id}`;
      const outputPath = path.join(outputDir, `${intern.id}.png`);

      await QRCode.toFile(outputPath, url, {
        color: {
          dark: '#00f0ff',  // Neon Blue
          light: '#030014'  // Dark Background
        },
        width: 300,
        margin: 2
      });

      console.log(`Generated QR Code for ${intern.name} (${intern.id})`);
    }

    console.log('All QR codes generated successfully!');
  } catch (error) {
    console.error('Error generating QR codes:', error);
  }
}

generateQRCodes();
