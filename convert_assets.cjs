const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, 'src/assets');

async function processDirectory(dir) {
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const name = path.basename(file, ext);
        const outPath = path.join(dir, `${name}.webp`);
        console.log(`Convertendo: ${file} -> ${name}.webp`);
        try {
          await sharp(fullPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(outPath);
          fs.unlinkSync(fullPath);
          console.log(`Removido arquivo antigo: ${file}`);
        } catch (e) {
          console.error(`Erro ao converter ${file}`, e);
        }
      }
    }
  }
}

async function main() {
  console.log('Iniciando conversão WebP nos assets internos...');
  await processDirectory(assetsDir);
  console.log('Feito!');
}
main();
