const fs = require('fs');

// Fix FadeIn
let s = fs.readFileSync('src/components/ui/FadeIn.tsx', 'utf8');
s = s.replace(/margin: "100px"/g, 'amount: 0.1');
fs.writeFileSync('src/components/ui/FadeIn.tsx', s);

// Fix Reveal
let s2 = fs.readFileSync('src/components/ui/Reveal.tsx', 'utf8');
s2 = s2.replace(/margin: "100px"/g, 'amount: 0.1');
fs.writeFileSync('src/components/ui/Reveal.tsx', s2);

// Fix CSS
let s3 = fs.readFileSync('src/index.css', 'utf8');
s3 = s3.replace(/\.mobile-device \[class\*="blur-\\\\\\[80px\\\\\\]"\] \{/g, '.mobile-device [class*="blur-\\[80px\\]"],\n.mobile-device [class*="blur-\\[60px\\]"] {');
fs.writeFileSync('src/index.css', s3);

console.log('IntersectionObservers optimized for mobile');
