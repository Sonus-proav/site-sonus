const fs = require('fs');
let c = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');

// Quick fix for the broken className lines
c = c.replace(/className=\{\\\`\\\$\\{logo\.className\\}.*?\\\`\}/g, 'className={logo.className + " object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300 w-auto"}');

fs.writeFileSync('src/components/ui/ClientMarquee.tsx', c);
