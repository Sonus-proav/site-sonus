import fs from 'fs';
const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find PlenaryBlueprint
const startStr = 'const PlenaryBlueprint = memo(function PlenaryBlueprint() {';
const pbIndex = content.indexOf(startStr);
if (pbIndex !== -1) {
  // Find the end of it
  const endStr = '  )\n}\n\n// ══════════════════════════════════════════════';
  content = content.replace('  )\n}\n\n// ════', '  )\n});\n\n// ════');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed PlenaryBlueprint syntax!');
