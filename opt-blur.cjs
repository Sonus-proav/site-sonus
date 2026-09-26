const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

s = s.replace(/blur-\[120px\]/g, 'blur-[60px]');
s = s.replace(/blur-\[100px\]/g, 'blur-[60px]');
s = s.replace(/blur-\[50px\] md:blur-\[100px\]/g, 'blur-[40px] md:blur-[60px]');
s = s.replace(/blur-\[60px\] md:blur-\[120px\]/g, 'blur-[40px] md:blur-[60px]');

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);

let cm = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');
cm = cm.replace(/blur-\[120px\]/g, 'blur-[60px]');
cm = cm.replace(/blur-\[60px\] md:blur-\[120px\]/g, 'blur-[40px] md:blur-[60px]');
fs.writeFileSync('src/components/ui/ClientMarquee.tsx', cm);

console.log("Reduced giant CSS blurs!");
