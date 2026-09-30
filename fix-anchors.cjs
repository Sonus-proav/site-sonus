const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

s = s.replace(/<div ref=\{anchors\.\w+\} className="absolute right-3 bottom-3 w-1 h-1" \/>\r?\n?/g, '');

const lines = s.split(/\r?\n/);
let newLines = [];
let layerIdx = 0;
const refs = ['network', 'acoustic', 'video', 'control'];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('LAYER ') && lines[i].includes('=')) {
     layerIdx++;
  }
  
  if (lines[i].includes('</motion.div>') && layerIdx > 0 && layerIdx <= 4) {
     if (lines[i].startsWith('          </motion.div>')) {
        const refName = refs[layerIdx - 1];
        newLines.push(`            <div ref={anchors.${refName}} className="absolute right-3 bottom-3 w-1 h-1" />`);
        layerIdx = -1; 
     }
  }
  newLines.push(lines[i]);
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', newLines.join('\n'));
console.log('Done!');
