const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// Remove ALL existing injected anchors in the DOM first to start clean.
s = s.replace(/<div ref=\{anchors\.\w+\} className="absolute right-3 bottom-3 w-1 h-1" \/>/g, '');

const lines = s.split(/\r?\n/);
let out = [];
let layerIndex = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('LAYER 1:')) layerIndex = 1;
  else if (lines[i].includes('LAYER 2:')) layerIndex = 2;
  else if (lines[i].includes('LAYER 3:')) layerIndex = 3;
  else if (lines[i].includes('LAYER 4:')) layerIndex = 4;
  else if (lines[i].includes('2D HUD OVERLAY')) layerIndex = 0;

  if (lines[i].trim() === '</motion.div>' && layerIndex > 0) {
     if (lines[i].startsWith('          </motion.div>')) {
        let name = '';
        if (layerIndex === 1) name = 'network';
        if (layerIndex === 2) name = 'acoustic';
        if (layerIndex === 3) name = 'video';
        if (layerIndex === 4) name = 'control';
        
        out.push(`            <div ref={anchors.${name}} className="absolute right-3 bottom-3 w-1 h-1" />`);
        layerIndex = 0; 
     }
  }
  
  out.push(lines[i]);
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', out.join('\n'));
console.log('Anchors perfectly injected!');
