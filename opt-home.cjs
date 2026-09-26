const fs = require('fs');
let s = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace the giant contact form backdrop-blur
s = s.replace('bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem]', 'bg-zinc-900 border border-white/10 rounded-[3rem]');

fs.writeFileSync('src/pages/Home.tsx', s);
console.log("Home.tsx optimized!");
