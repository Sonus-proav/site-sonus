const fs = require('fs');
let c = fs.readFileSync('src/components/ui/SpotlightCard.tsx', 'utf8');
c = c.replace('<div className="relative z-10">{children}</div>', '<div className="relative z-10 h-full w-full flex flex-col">{children}</div>');
fs.writeFileSync('src/components/ui/SpotlightCard.tsx', c);
