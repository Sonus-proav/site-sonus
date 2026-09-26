const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(
  '<Suspense fallback={null}>\n        \n      </Suspense>',
  '<Suspense fallback={null}>\n        <ClientMarquee />\n      </Suspense>'
);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log("Added ClientMarquee back to Home");
