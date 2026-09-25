import fs from 'fs';

const path = 'src/components/plenarios/WarrantyShield3D.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "let timeoutId: NodeJS.Timeout;",
  "let timeoutId: ReturnType<typeof setTimeout>;"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed Timeout type!');
