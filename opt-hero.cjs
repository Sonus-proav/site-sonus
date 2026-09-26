const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Remove mix-blend-screen from the big orbs
s = s.replace(/mix-blend-screen/g, '');

// 2. Remove all backdrop blurs and increase background opacity to compensate
// Card 1
s = s.replace('bg-black/90 backdrop-blur-sm md:backdrop-blur-md', 'bg-black');
// Card 2
s = s.replace('bg-black/80 md:bg-black/60 backdrop-blur-sm md:backdrop-blur-xl', 'bg-[#050505] md:bg-[#070707]');
s = s.replace('backdrop-blur-none md:backdrop-blur-md', ''); // icon
// Card 3
s = s.replace('bg-black/80 md:bg-black/60 backdrop-blur-sm md:backdrop-blur-xl', 'bg-[#050505] md:bg-[#070707]');
s = s.replace('backdrop-blur-none md:backdrop-blur-sm', ''); // icon
// Card 4 (Top layer)
s = s.replace('bg-[#020202]/40 backdrop-blur-lg md:backdrop-blur-2xl', 'bg-[#030303]/95');
// Central rotating volume knob
s = s.replace('bg-black/60 backdrop-blur-sm md:backdrop-blur-xl', 'bg-[#050505]');

// Let's also check if the background grid animation is too heavy (sometimes huge SVGs are bad)
// but the blurs are the main killer.

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log("HeroVisual performance optimized!");
