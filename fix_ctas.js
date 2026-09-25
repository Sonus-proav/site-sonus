import fs from 'fs';

// Fix metaPixel.ts
let meta = fs.readFileSync('src/lib/metaPixel.ts', 'utf8');
meta = meta.replace(
  "export function trackWhatsAppClick(sourceId: 'whatsapp_flutuante' | 'whatsapp_hero' | 'whatsapp_urgente' | 'whatsapp_footer', pageName: string)",
  "export function trackWhatsAppClick(sourceId: string, pageName: string)"
);
fs.writeFileSync('src/lib/metaPixel.ts', meta);

// Inject into AuditoriosTeatros.tsx
let f1 = fs.readFileSync('src/pages/AuditoriosTeatros.tsx', 'utf8');
f1 = f1.replace(
  '<InteractivePanelMockup />\n              </FadeIn>',
  '<InteractivePanelMockup />\n              </FadeIn>\n              <div className="lg:col-span-2"><InlineWhatsAppCta origin="section_panel" pageName="auditorios" className="mt-8" /></div>'
);
fs.writeFileSync('src/pages/AuditoriosTeatros.tsx', f1);

// Inject into QSysLanding.tsx
let f2 = fs.readFileSync('src/pages/QSysLanding.tsx', 'utf8');
f2 = f2.replace(
  '<div className="mt-16 text-center text-zinc-500 font-mono text-sm">\n            E muito mais recursos disponíveis...\n          </div>',
  '<div className="mt-16 text-center text-zinc-500 font-mono text-sm">\n            E muito mais recursos disponíveis...\n          </div>\n          <InlineWhatsAppCta origin="section_recursos" pageName="qsys" className="mt-16" />'
);
f2 = f2.replace(
  '<div className="text-sm text-zinc-500 mt-2">Flexibilidade</div>\n                </div>\n              </div>\n            </div>',
  '<div className="text-sm text-zinc-500 mt-2">Flexibilidade</div>\n                </div>\n              </div>\n            </div>\n            <InlineWhatsAppCta origin="section_arquitetura" pageName="qsys" className="mt-16" />'
);
fs.writeFileSync('src/pages/QSysLanding.tsx', f2);

// Inject into PlenariosLanding.tsx
let f3 = fs.readFileSync('src/pages/PlenariosLanding.tsx', 'utf8');
f3 = f3.replace(
  '<LiveSessionSimulator />\n        </div>',
  '<LiveSessionSimulator />\n        </div>\n        <InlineWhatsAppCta origin="section_simulador" pageName="plenarios" className="mt-16 mb-8" />'
);
f3 = f3.replace(
  '<PlenaryBlueprint />\n        </div>',
  '<PlenaryBlueprint />\n        </div>\n        <InlineWhatsAppCta origin="section_blueprint" pageName="plenarios" className="mt-16 mb-8" />'
);
fs.writeFileSync('src/pages/PlenariosLanding.tsx', f3);

console.log('Fixed CTAs!');
