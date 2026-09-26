const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetStr = "A Garantia da Experiência";
const targetIndex = c.indexOf("A Garantia");

if (targetIndex !== -1) {
  // Find the closest <section before this
  const sectionStart = c.lastIndexOf('<section', targetIndex);
  // Find the closest </section> after this
  const sectionEnd = c.indexOf('</section>', targetIndex) + 10;
  
  if (sectionStart !== -1 && sectionEnd !== -1) {
    const oldBlock = c.substring(sectionStart, sectionEnd);
    c = c.replace(oldBlock, '<AboutExperience />');
    
    if (!c.includes('import { AboutExperience }')) {
      c = c.replace('import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"', 'import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"\nimport { AboutExperience } from "@/components/ui/AboutExperience"');
    }
    
    fs.writeFileSync('src/pages/Home.tsx', c);
    console.log("Successfully replaced About section");
  } else {
    console.log("Could not find section boundaries");
  }
} else {
  console.log("Could not find 'A Garantia da Experiência'");
}
