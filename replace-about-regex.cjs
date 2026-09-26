const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /<section[^>]*>[\s\S]*?A Garantia da Experiência[\s\S]*?<\/section>/;

if (regex.test(c)) {
  c = c.replace(regex, '<AboutExperience />');
  
  if (!c.includes('import { AboutExperience }')) {
    c = c.replace('import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"', 'import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"\nimport { AboutExperience } from "@/components/ui/AboutExperience"');
  }
  
  fs.writeFileSync('src/pages/Home.tsx', c);
  console.log("Successfully replaced About section");
} else {
  console.log("Not found with regex");
}
