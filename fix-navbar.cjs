const fs = require('fs');
let s = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
s = s.replace('{ name: "Q-SYS", path: "/qsys" },', '{ name: "Bares e Eventos", path: "/bares-e-casas-noturnas" },\n    { name: "Q-SYS", path: "/qsys" },');
fs.writeFileSync('src/components/layout/Navbar.tsx', s);
