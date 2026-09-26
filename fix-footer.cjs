const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /const LPFooter = lazy\(\(\) => import\("@\/components\/layout\/LPFooter"\)\.then\(m => \(\{ default: m\.LPFooter \}\)\)\)/;
c = c.replace(regex, '');

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Removed LPFooter import");
