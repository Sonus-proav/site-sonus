const fs = require('fs');
let c = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

c = c.replace(
  'className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"',
  'className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none rounded-[2rem]"'
);

c = c.replace(
  'className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none"',
  'className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none rounded-[2rem]"'
);

c = c.replace(
  'className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"',
  'className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none rounded-[2rem]"'
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', c);
console.log("Added rounded-[2rem] to gradient overlays");
