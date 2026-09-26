const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(/<Suspense fallback=\{null\}>[\s\S]*?<\/Suspense>/, '<Suspense fallback={null}>\n        <StickyCtaBar />\n      </Suspense>');

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Added StickyCtaBar back to Home using regex");
