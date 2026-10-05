const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(/row-span-1 md:row-span-2 h-full/g, 'row-span-1 md:row-span-2 h-auto md:h-full');

content = content.replace(
  /className="w-full h-full bg-zinc-950 rounded-3xl border border-white\/10 overflow-hidden flex flex-col relative group"/g,
  'className="w-full h-auto md:h-full min-h-[400px] bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group"'
);

// Also remove h-full from the text div inside Phase 1
content = content.replace(
  'p-5 md:p-8 relative z-10 flex flex-col h-full md:w-1/2',
  'p-5 md:p-8 relative z-10 flex flex-col h-auto md:h-full md:w-1/2'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
