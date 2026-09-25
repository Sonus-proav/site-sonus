import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

// Find and remove the line with WarrantyBanner import
const idx = lines.findIndex(l => l.includes('WarrantyBanner') && l.includes('lazy'));
if (idx !== -1) {
  lines.splice(idx, 1);
  console.log(`Removed line ${idx + 1}: WarrantyBanner lazy import`);
}

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log('Done!');
