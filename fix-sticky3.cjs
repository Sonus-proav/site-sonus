const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

let lines = c.split('\n');
// Find the last </div>
let lastDivIndex = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].includes('</div>')) {
    lastDivIndex = i;
    break;
  }
}

if (lastDivIndex !== -1) {
  lines.splice(lastDivIndex, 0, '      <Suspense fallback={null}>\n        <StickyCtaBar />\n      </Suspense>');
}

fs.writeFileSync('src/pages/Home.tsx', lines.join('\n'));
console.log("Added StickyCtaBar before last div");
