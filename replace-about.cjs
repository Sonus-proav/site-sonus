const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The section starts with <section className="py-32 bg-[#050505] relative overflow-hidden">
// and ends right before {/* TESTIMONIALS */}

const startIndex = c.indexOf('<section className="py-32 bg-[#050505] relative overflow-hidden">');
const endIndex = c.indexOf('{/* TESTIMONIALS */}');

if (startIndex !== -1 && endIndex !== -1) {
  const oldBlock = c.substring(startIndex, endIndex);
  c = c.replace(oldBlock, '<AboutExperience />\n\n        ');
  
  // Also add import
  if (!c.includes('import { AboutExperience }')) {
    c = c.replace('import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"', 'import { BentoEspecialidades } from "@/components/ui/BentoEspecialidades"\nimport { AboutExperience } from "@/components/ui/AboutExperience"');
  }
  
  fs.writeFileSync('src/pages/Home.tsx', c);
  console.log("Successfully replaced About section in Home.tsx");
} else {
  console.log("Could not find boundaries");
}
