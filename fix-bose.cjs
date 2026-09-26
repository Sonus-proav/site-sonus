const fs = require('fs');
let c = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');
c = c.replace(/\{ src: "\/marcas\/bose\.svg", alt: "Bose", className: ".*?" \}/, '{ src: "/marcas/bose.svg", alt: "Bose", className: "h-12 md:h-16 scale-[1.5] origin-center brightness-0 invert mx-4" }');
fs.writeFileSync('src/components/ui/ClientMarquee.tsx', c);
