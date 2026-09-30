const fs = require('fs');
let s = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');
s = s.replace('import { useState, useEffect }', 'import { useState }');
fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', s);
console.log("Fixed TS error!");
