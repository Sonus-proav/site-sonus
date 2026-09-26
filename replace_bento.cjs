const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace the <section> that contains "Engenharia Aplicada"
const regex = /<section className="py-24 bg-\[#050505\] relative overflow-hidden">[\s\S]*?Engenharia[\s\S]*?<\/section>/;

if(regex.test(c)) {
  c = c.replace(regex, '<BentoEspecialidades />');
  
  // Also add the import at the top
  if (!c.includes('BentoEspecialidades')) {
    c = c.replace('import { ClientMarquee } from "@/components/ui/ClientMarquee"', 'import { ClientMarquee } from "@/components/ui/ClientMarquee"\nimport { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"');
  }
  
  fs.writeFileSync('src/pages/Home.tsx', c);
  console.log("Substituted successfully.");
} else {
  console.log("Could not find the section.");
}
