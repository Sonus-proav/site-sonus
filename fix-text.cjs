const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  'Tecnologia de Nível Internacional no <span className="text-white font-bold">Sudoeste do Paraná</span>',
  'Tecnologia de Nível Internacional'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
