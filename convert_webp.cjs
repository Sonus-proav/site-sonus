const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');
const indexHtml = path.join(__dirname, 'index.html');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const name = path.basename(file, ext);
        if (name.includes('logo') || name.includes('favicon')) {
          console.log(`Pulando logo/ícone: ${file}`);
          continue;
        }
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

function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;
      content = content.replace(/([a-zA-Z0-9_-]+)\.(jpg|png)/gi, (match, p1, p2) => {
         if(p1.toLowerCase().includes('logo') || p1.toLowerCase().includes('favicon') || p1.toLowerCase().includes('apple-touch')) {
            return match;
         }
         return `${p1}.webp`;
      });
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Referências atualizadas em: ${file}`);
      }
    }
  }
}

async function main() {
  console.log('Iniciando conversão WebP...');
  await processDirectory(publicDir);
  console.log('Atualizando referências no código (React/TSX)...');
  replaceInFiles(srcDir);
  let indexData = fs.readFileSync(indexHtml, 'utf8');
  const newIndex = indexData.replace(/([a-zA-Z0-9_-]+)\.(jpg|png)/gi, (match, p1) => {
      if(p1.toLowerCase().includes('logo') || p1.toLowerCase().includes('favicon')) return match;
      return `${p1}.webp`;
  });
  if(indexData !== newIndex) {
     fs.writeFileSync(indexHtml, newIndex, 'utf8');
     console.log('Referências atualizadas em: index.html');
  }
  console.log('Tudo pronto!');
}
main();
