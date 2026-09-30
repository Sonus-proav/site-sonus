const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

s = s.replace(
  '<div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/50" />',
  '<div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/50" />\n            <div ref={anchors.network} className="absolute right-3 bottom-3 w-1 h-1" />'
);

s = s.replace(
  '{/* Holographic grid and concentric sound waves */}',
  '<div ref={anchors.acoustic} className="absolute right-3 bottom-3 w-1 h-1" />\n            {/* Holographic grid and concentric sound waves */}'
);

s = s.replace(
  '{/* Scanning lines & reticle */}',
  '<div ref={anchors.video} className="absolute right-3 bottom-3 w-1 h-1" />\n            {/* Scanning lines & reticle */}'
);

s = s.replace(
  '{/* UI Elements on top plate */}',
  '<div ref={anchors.control} className="absolute right-3 bottom-3 w-1 h-1" />\n            {/* UI Elements on top plate */}'
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Success');
