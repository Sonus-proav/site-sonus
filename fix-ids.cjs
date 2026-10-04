const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');
content = content.replace(
  '<section className="py-20 bg-zinc-950',
  '<section id="sobre" className="py-20 bg-zinc-950'
);
content = content.replace(
  '<section className="py-32 px-4 bg-[#050505]',
  '<section id="contato" className="py-32 px-4 bg-[#050505]'
);
fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
