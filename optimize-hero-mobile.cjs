const fs = require('fs');

// Optimize HeroVisual.tsx for mobile heights and deep blurs
let hero = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Make the container smaller on mobile so it fits the viewport better and scales the 3D stack
hero = hero.replace(
  'className="relative w-full h-[600px] flex items-center justify-center group perspective-[2000px]"',
  'className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center group perspective-[2000px] scale-90 md:scale-100"'
);

// 2. Reduce backdrop blurs on inner orbs/knobs for mobile to save GPU passes
hero = hero.replace(
  'backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  'backdrop-blur-none md:backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.4)]'
);
hero = hero.replace(
  'backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]',
  'backdrop-blur-none md:backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]'
);
hero = hero.replace(
  'bg-black/60 backdrop-blur-xl flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]',
  'bg-black/60 backdrop-blur-sm md:backdrop-blur-xl flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]'
);

// 3. Make panels bg a bit more opaque on mobile to compensate for lower blur
hero = hero.replace(
  'bg-black/60 backdrop-blur-md md:backdrop-blur-xl overflow-hidden',
  'bg-black/80 md:bg-black/60 backdrop-blur-sm md:backdrop-blur-xl overflow-hidden'
);
// Replace the second occurrence too (Video layer)
hero = hero.replace(
  'bg-black/60 backdrop-blur-md md:backdrop-blur-xl overflow-hidden',
  'bg-black/80 md:bg-black/60 backdrop-blur-sm md:backdrop-blur-xl overflow-hidden'
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', hero);
console.log("Optimized HeroVisual for ultra mobile 60fps");
