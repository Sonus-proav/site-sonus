const fs = require('fs');
let s = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');

// Remove massive backdrop-blurs on the scrolling marquees
s = s.replace(/bg-white\/\[0\.015\] backdrop-blur-sm md:backdrop-blur-md/g, 'bg-[#050505]');

// Also the badges have it, but they are small. I'll remove it just in case.
s = s.replace(/backdrop-blur-sm md:backdrop-blur-md/g, '');

fs.writeFileSync('src/components/ui/ClientMarquee.tsx', s);
console.log("ClientMarquee performance optimized!");
