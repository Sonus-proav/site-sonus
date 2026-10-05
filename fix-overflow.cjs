const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  '<section className="py-24 md:py-40 relative bg-[#050505] border-t border-white/5">',
  '<section className="py-24 md:py-40 relative bg-[#050505] border-t border-white/5 overflow-hidden">'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
