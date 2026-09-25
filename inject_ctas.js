import fs from 'fs';
import path from 'path';

const addImport = (content) => {
  if (content.includes('InlineWhatsAppCta')) return content;
  const importStatement = `import { InlineWhatsAppCta } from "@/components/ui/InlineWhatsAppCta";\n`;
  // Add right after the first import
  return content.replace(/import .*\n/, match => match + importStatement);
};

// 1. AuditoriosTeatros.tsx
let file1 = 'src/pages/AuditoriosTeatros.tsx';
let c1 = fs.readFileSync(file1, 'utf8');
c1 = addImport(c1);
// Insert after Pain Points (Cenário Atual)
c1 = c1.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* -- INTERACTIVE MOCKUP -- \*\/\}/,
  `$1</div>\n$1  <InlineWhatsAppCta origin="section_dores" pageName="auditorios" className="mt-16" message="Olá! Gostaria de falar sobre um projeto de sonorização para meu auditório." />\n$1</div>\n$1</section>\n\n$1{/* -- INTERACTIVE MOCKUP -- */}`
);
// Insert after Case Studies (before form)
c1 = c1.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* -- FORM SECTION -- \*\/\}/,
  `$1</div>\n$1  <InlineWhatsAppCta origin="section_cases" pageName="auditorios" className="mt-20 mb-8" message="Olá! Gostaria de falar sobre um projeto de sonorização para meu auditório." />\n$1</div>\n$1</section>\n\n$1{/* -- FORM SECTION -- */}`
);
fs.writeFileSync(file1, c1);

// 2. IgrejasTemplos.tsx
let file2 = 'src/pages/IgrejasTemplos.tsx';
let c2 = fs.readFileSync(file2, 'utf8');
c2 = addImport(c2);
c2 = c2.replace(
  /(\s*)<\/div>\s*<\/section>\s*\{\/\* -- SECTION 3: A SOLUÇÃO -- \*\/\}/,
  `$1  <InlineWhatsAppCta origin="section_dores" pageName="igrejas" className="mt-16" message="Olá! Precisamos melhorar o som da nossa igreja." />\n$1</div>\n$1</section>\n\n$1{/* -- SECTION 3: A SOLUÇÃO -- */}`
);
c2 = c2.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* -- SECTION 5: FORMULÁRIO -- \*\/\}/,
  `$1</div>\n$1  <InlineWhatsAppCta origin="section_diferenciais" pageName="igrejas" className="mt-20 mb-8" message="Olá! Precisamos melhorar o som da nossa igreja." />\n$1</div>\n$1</section>\n\n$1{/* -- SECTION 5: FORMULÁRIO -- */}`
);
fs.writeFileSync(file2, c2);

// 3. MeetingRoomsLanding.tsx
let file3 = 'src/pages/MeetingRoomsLanding.tsx';
let c3 = fs.readFileSync(file3, 'utf8');
c3 = addImport(c3);
c3 = c3.replace(
  /(\s*)<\/div>\s*<\/section>\s*\{\/\* -- THE SOLUTION -- \*\/\}/,
  `$1  <InlineWhatsAppCta origin="section_dores" pageName="salas_reuniao" className="mt-16" message="Olá! Quero resolver os problemas de áudio nas nossas salas de reunião." />\n$1</div>\n$1</section>\n\n$1{/* -- THE SOLUTION -- */}`
);
c3 = c3.replace(
  /(\s*)<\/div>\s*<\/section>\s*\{\/\* -- METHODOLOGY TIMELINE -- \*\/\}/,
  `$1  <InlineWhatsAppCta origin="section_chat" pageName="salas_reuniao" className="mt-20 mb-10" message="Olá! Quero resolver os problemas de áudio nas nossas salas de reunião." />\n$1</div>\n$1</section>\n\n$1{/* -- METHODOLOGY TIMELINE -- */}`
);
fs.writeFileSync(file3, c3);

// 4. PlenariosLanding.tsx
let file4 = 'src/pages/PlenariosLanding.tsx';
let c4 = fs.readFileSync(file4, 'utf8');
c4 = addImport(c4);
c4 = c4.replace(
  /(\s*)<\/div>\s*<\/section>\s*\{\/\* ACT 2: A SESSÃO PERFEITA \*\/\}/,
  `$1  <InlineWhatsAppCta origin="section_dores" pageName="plenarios" className="mt-16" message="Olá! Gostaria de falar sobre um projeto executivo para Plenário/Câmara." />\n$1</div>\n$1</section>\n\n$1{/* ACT 2: A SESSÃO PERFEITA */}`
);
c4 = c4.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* ACT 5: TIMELINE DA METODOLOGIA \*\/\}/,
  `$1</div>\n$1  <InlineWhatsAppCta origin="section_comparativo" pageName="plenarios" className="mt-20 mb-10" message="Olá! Gostaria de falar sobre um projeto executivo para Plenário/Câmara." />\n$1</div>\n$1</section>\n\n$1{/* ACT 5: TIMELINE DA METODOLOGIA */}`
);
fs.writeFileSync(file4, c4);

// 5. QSysLanding.tsx
let file5 = 'src/pages/QSysLanding.tsx';
let c5 = fs.readFileSync(file5, 'utf8');
c5 = addImport(c5);
c5 = c5.replace(
  /(\s*)<\/div>\s*<\/div>\s*<\/section>\s*\{\/\* -- SOFTWARE SHOWCASE -- \*\/\}/,
  `$1</div>\n$1  <InlineWhatsAppCta origin="section_recursos" pageName="qsys" className="mt-20" message="Olá! Quero saber mais sobre a plataforma Q-SYS." />\n$1</div>\n$1</section>\n\n$1{/* -- SOFTWARE SHOWCASE -- */}`
);
c5 = c5.replace(
  /(\s*)<\/div>\s*<\/section>\s*\{\/\* -- WARRANTY SECTION -- \*\/\}/,
  `$1  <InlineWhatsAppCta origin="section_arquitetura" pageName="qsys" className="mt-16 mb-12" message="Olá! Quero saber mais sobre a plataforma Q-SYS." />\n$1</div>\n$1</section>\n\n$1{/* -- WARRANTY SECTION -- */}`
);
fs.writeFileSync(file5, c5);

console.log('Injected CTAs in all landing pages!');
