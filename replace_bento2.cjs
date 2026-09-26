const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /\{\/\* APPLE-STYLE BESPOKE BENTO GRID \*\/\}\s*<section className="py-32 px-4 md:px-8 xl:px-16 bg-\[#050505\] relative">[\s\S]*?<\/section>/;

if(regex.test(c)) {
  c = c.replace(regex, '{/* APPLE-STYLE BESPOKE BENTO GRID */}\n      <BentoEspecialidades />');
  
  if (!c.includes('BentoEspecialidades')) {
    c = c.replace('import { ClientMarquee } from "@/components/ui/ClientMarquee"', 'import { ClientMarquee } from "@/components/ui/ClientMarquee"\nimport { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"');
  }
  
  fs.writeFileSync('src/pages/Home.tsx', c);
  console.log("Substituted successfully.");
} else {
  console.log("Could not find the section.");
}
