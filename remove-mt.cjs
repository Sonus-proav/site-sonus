const fs = require('fs');
let content = fs.readFileSync('src/components/ui/SocialProofBar.tsx', 'utf8');

content = content.replace(
  ' (como nosso projeto recente no Mato Grosso).',
  '.'
);

fs.writeFileSync('src/components/ui/SocialProofBar.tsx', content, 'utf8');
