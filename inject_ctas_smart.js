import fs from 'fs';

function injectCTAs(filePath, pageName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Make sure import exists
  if (!content.includes('InlineWhatsAppCta')) {
    content = content.replace(/import .*\n/, match => match + `import { InlineWhatsAppCta } from "@/components/ui/InlineWhatsAppCta";\n`);
  }

  // Split by </section>
  const parts = content.split('</section>');
  
  if (parts.length > 3) {
    // Inject after the 2nd section
    parts[1] = parts[1] + `\n      <InlineWhatsAppCta origin="section_middle" pageName="${pageName}" className="my-16 md:my-24" />\n    `;
  }
  
  if (parts.length > 5) {
    // Inject after the 4th section
    parts[3] = parts[3] + `\n      <InlineWhatsAppCta origin="section_bottom" pageName="${pageName}" className="my-16 md:my-24" />\n    `;
  }

  const newContent = parts.join('</section>');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Injected into ${filePath}`);
}

injectCTAs('src/pages/AuditoriosTeatros.tsx', 'auditorios');
injectCTAs('src/pages/QSysLanding.tsx', 'qsys');
injectCTAs('src/pages/PlenariosLanding.tsx', 'plenarios');
// MeetingRooms and Igrejas already have it because they were successfully modified?
// Wait! Let me check if MeetingRooms had errors. 
// "error TS6133: 'InlineWhatsAppCta' is declared but its value is never read." only for Auditorios, Plenarios, QSys!
