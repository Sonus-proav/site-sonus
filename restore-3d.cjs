const fs = require('fs');
let c = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

c = c.replace(
  'className="relative w-full h-full flex items-center justify-center"',
  'className="relative w-full h-full flex items-center justify-center"\n        style={{ transformStyle: "preserve-3d" }}'
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', c);
console.log("Restored parent 3D style");
