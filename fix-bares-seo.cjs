const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  'title="Sonorização para Bares e Casas Noturnas no Paraná | Sonus Pro AV"',
  'title="Sonorização para Bares e Casas Noturnas | Sonus Pro AV"'
);

content = content.replace(
  'do seu bar no Paraná, SC e RS."',
  'do seu bar em todo o Brasil."'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
