const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/pages/Home.tsx', c);
console.log('Fixed syntax!');
