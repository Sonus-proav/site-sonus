const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  'w-auto object-contain brightness-0 invert opacity-30 hover:opacity-100 transition-opacity duration-300',
  'w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300'
);

content = content.replace(
  'text-white/10 select-none hover:text-white/50 transition-colors duration-300',
  'text-white/40 select-none hover:text-white transition-colors duration-300'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
