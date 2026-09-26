const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');
if (!c.includes('import { BentoEspecialidades }')) {
  c = 'import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades";\n' + c;
  fs.writeFileSync('src/pages/Home.tsx', c);
}
