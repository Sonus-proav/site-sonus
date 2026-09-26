const fs = require('fs');
let c = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Optimize blur classes
c = c.replace('blur-[120px]', 'blur-[60px] md:blur-[120px]');
c = c.replace('blur-[100px]', 'blur-[50px] md:blur-[100px]');

// 2. Optimize backdrop-blur for layers
c = c.replace('backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]', 'backdrop-blur-sm md:backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]');
c = c.replace('backdrop-blur-xl overflow-hidden', 'backdrop-blur-md md:backdrop-blur-xl overflow-hidden');
c = c.replace('backdrop-blur-2xl overflow-hidden', 'backdrop-blur-lg md:backdrop-blur-2xl overflow-hidden');

// 3. Add will-change-transform to the continuous spinning inner container
c = c.replace(
  'style={{ transformStyle: "preserve-3d" }}',
  'style={{ transformStyle: "preserve-3d", willChange: "transform" }}'
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', c);
console.log("Optimized HeroVisual");
