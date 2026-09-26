const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(
  '    </div>\n  )\n}\n',
  '      <Suspense fallback={null}>\n        <StickyCtaBar />\n      </Suspense>\n    </div>\n  )\n}\n'
);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Added StickyCtaBar strictly at the bottom");
