const fs = require('fs');
let c = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');
c = c.replace(/className=\{\\\`\\\$\\{logo\\.className\\}(.*?)\\\`\}/g, 'className={`${logo.className}$1`}');
fs.writeFileSync('src/components/ui/ClientMarquee.tsx', c);
