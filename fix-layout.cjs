const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

// 1. Fix Hero overflow
content = content.replace(
  'pt-32 pb-16 overflow-hidden px-4 border-b border-white/5',
  'pt-32 pb-16 overflow-x-hidden px-4 border-b border-white/5'
);

// 2. Fix Bento section overflow
content = content.replace(
  '<section className="py-24 md:py-40 relative bg-[#050505] border-t border-white/5 overflow-hidden">',
  '<section className="py-24 md:py-40 relative bg-[#050505] border-t border-white/5 overflow-x-hidden">'
);

// 3. Ensure w-full on Bento container
content = content.replace(
  '<div className="max-w-7xl mx-auto px-4">',
  '<div className="w-full max-w-7xl mx-auto px-4">'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
