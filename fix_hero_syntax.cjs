const fs = require('fs');
let c = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/components/ui/HeroVisual.tsx', c);
console.log('Fixed syntax in HeroVisual!');
