import fs from 'fs';
const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = '\n    </div>\n  )\n}\n\n// ─── Main Component';
if (content.includes(targetStr)) {
  content = content.replace(targetStr, '\n    </div>\n  )\n});\n\n// ─── Main Component');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fixed PlenaryBlueprint syntax finally!');
} else {
  // Let's just find `export function PlenariosLanding()`
  const exportIndex = content.indexOf('export function PlenariosLanding() {');
  if (exportIndex !== -1) {
    const bracketIndex = content.lastIndexOf('}', exportIndex);
    if (bracketIndex !== -1 && content[bracketIndex-1] === '\n') {
      content = content.substring(0, bracketIndex) + '});' + content.substring(bracketIndex + 1);
      fs.writeFileSync(path, content, 'utf8');
      console.log('Fixed using fallback bracket search!');
    }
  }
}
