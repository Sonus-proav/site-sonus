const fs = require('fs');
let s = fs.readFileSync('src/hooks/useReducedPerformance.ts', 'utf8');

const target = 'const html = document.documentElement;';
const replacement = `const html = document.documentElement;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) { html.classList.add('mobile-device'); }`;

s = s.replace(target, replacement);

fs.writeFileSync('src/hooks/useReducedPerformance.ts', s);
console.log('mobile-device class added');
