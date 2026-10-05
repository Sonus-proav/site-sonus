const fs = require('fs');
let content = fs.readFileSync('src/components/bares/Posters.tsx', 'utf8');

content = content.replace(
  '<svg viewBox="0 0 300 390" className="h-full max-h-[560px] w-auto"',
  '<svg viewBox="0 0 300 390" className="w-[85vw] max-w-[280px] h-auto object-contain"'
);

fs.writeFileSync('src/components/bares/Posters.tsx', content, 'utf8');
