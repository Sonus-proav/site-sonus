const sharp = require('sharp');

async function processLogo() {
  try {
    const orig = sharp('public/marcas/renkus-heinz.png');
    
    // Create an alpha mask from the image's lightness
    // If it's a white BG and black text:
    // Red channel -> white is 255, black is 0.
    // Negate -> white becomes 0 (transparent), black becomes 255 (opaque).
    const alphaBuffer = await orig
      .extractChannel('red')
      .negate()
      .threshold(128)
      .toBuffer();
      
    const metadata = await orig.metadata();
    
    await sharp({
      create: {
        width: metadata.width,
        height: metadata.height,
        channels: 3,
        background: { r: 255, g: 255, b: 255 } // solid white rgb
      }
    })
    .joinChannel(alphaBuffer) // attach alpha channel to make background transparent
    .png()
    .toFile('public/marcas/renkus-heinz-fixed.png');
    
    console.log("Renkus-Heinz logo fixed!");
  } catch(e) {
    console.error(e);
  }
}

processLogo();
