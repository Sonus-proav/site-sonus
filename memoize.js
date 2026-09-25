import fs from 'fs';
const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace function VotingLedWall3D() { with const VotingLedWall3D = memo(function VotingLedWall3D() {
content = content.replace(
  'function VotingLedWall3D() {',
  'const VotingLedWall3D = memo(function VotingLedWall3D() {'
);

// We need to find where VotingLedWall3D ends to add the closing `);`
// It's just before `// ─── Interactive Blueprint`
const bpComment = '// ─── Interactive Blueprint';
if (content.includes(bpComment)) {
  const lastBracketBeforeBp = content.lastIndexOf('}', content.indexOf(bpComment));
  content = content.substring(0, lastBracketBeforeBp + 1) + ');\n\n' + content.substring(lastBracketBeforeBp + 1);
} else {
  // Let's just find `function PlenaryBlueprint()`
  const pbIndex = content.indexOf('function PlenaryBlueprint() {');
  if (pbIndex !== -1) {
    const lastBracketBeforePb = content.lastIndexOf('}', pbIndex);
    content = content.substring(0, lastBracketBeforePb + 1) + ');\n\n' + content.substring(lastBracketBeforePb + 1);
  }
}

// Replace function PlenaryBlueprint() { with const PlenaryBlueprint = memo(function PlenaryBlueprint() {
content = content.replace(
  'function PlenaryBlueprint() {',
  'const PlenaryBlueprint = memo(function PlenaryBlueprint() {'
);

// Find where PlenaryBlueprint ends. It's before `export function PlenariosLanding()` or `const PlenariosForm`
const formIndex = content.indexOf('const PlenariosForm');
if (formIndex !== -1) {
  const lastBracketBeforeForm = content.lastIndexOf('}', formIndex);
  content = content.substring(0, lastBracketBeforeForm + 1) + ');\n\n' + content.substring(lastBracketBeforeForm + 1);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Components memoized!');
