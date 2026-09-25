import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
const importStatement = `import { LiveSessionSimulator } from "@/components/plenarios/LiveSessionSimulator";\n`;
if (!content.includes('LiveSessionSimulator')) {
  // Find last import
  const lastImportIndex = content.lastIndexOf('import ');
  const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
  content = content.substring(0, endOfLastImport) + importStatement + content.substring(endOfLastImport);
}

// Replace Act 2
const act2Start = '{/* ── ACT 2: Session in Progress (Full Width Broadcast Panel) ── */}';
const act2End = '{/* ── ACT 3: After the Session ── */}';

const startIndex = content.indexOf(act2Start);
const endIndex = content.indexOf(act2End);

if (startIndex !== -1 && endIndex !== -1) {
  const newAct2 = `{/* ── ACT 2: Session in Progress (Interactive Simulator) ── */}
          <FadeIn className="mb-20 md:mb-32">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ② DURANTE A SESSÃO
              </span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Controle de Missão Legislativa</h3>
              <p className="text-xl text-zinc-400 max-w-2xl font-light">
                Esqueça telões estáticos. O sistema processa os votos <strong className="text-white">ao vivo</strong>, 
                atualiza gráficos dinâmicos e cronometra o orador sem interferência humana.
              </p>
            </div>
            
            <div className="relative group perspective-1000">
              <LiveSessionSimulator />
            </div>
          </FadeIn>\n\n          `;
          
  content = content.substring(0, startIndex) + newAct2 + content.substring(endIndex);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Act 2 replaced with LiveSessionSimulator');
} else {
  console.log('Markers not found');
}
