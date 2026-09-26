const fs = require('fs');
let c = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');
c = c.replace(/\\\\\\\`/g, '\`');
c = c.replace(/\\\\\\\$/g, '$');
fs.writeFileSync('src/components/ui/ClientMarquee.tsx', c);
