import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import for WarrantyShield3D (after LiveSessionSimulator import)
if (!content.includes('WarrantyShield3D')) {
  content = content.replace(
    'import { LiveSessionSimulator } from "@/components/plenarios/LiveSessionSimulator";',
    'import { LiveSessionSimulator } from "@/components/plenarios/LiveSessionSimulator";\nimport { WarrantyShield3D } from "@/components/plenarios/WarrantyShield3D";'
  );
}

// 2. Replace <WarrantyBanner variant="qsys" ... /> with <WarrantyShield3D />
const warrantyStart = content.indexOf('<WarrantyBanner');
const warrantyEnd = content.indexOf('/>', warrantyStart) + 2;

if (warrantyStart !== -1 && warrantyEnd !== -1) {
  content = content.substring(0, warrantyStart) + '<WarrantyShield3D />' + content.substring(warrantyEnd);
}

// 3. Remove the lazy import for WarrantyBanner since it's no longer used
content = content.replace(
  'const WarrantyBanner = lazy(() => import("@/components/layout/WarrantyBanner").then(m => ({ default: m.WarrantyBanner })))\n',
  ''
);

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced WarrantyBanner with WarrantyShield3D!');
