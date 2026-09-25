import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// The active state and items array
const activeStateString = '  const [active, setActive] = useState(0);';

if (content.includes(activeStateString)) {
  const componentCode = `
// ─── Componente Blueprint Isolado para Performance ───
const PlenaryBlueprint = memo(function PlenaryBlueprint() {
  const [active, setActive] = useState(0);
  const items = [
    { 
      title: "Cérebro Q-SYS", 
      icon: <Cpu className="w-5 h-5" />, 
      desc: "Um único Q-SYS Core gerencia todo o áudio, os cortes de vídeo e a automação do plenário através da rede local (IP/Dante), eliminando a necessidade de racks analógicos e DSPs isolados.",
      visual: (
        <div className="w-full h-full bg-[#02050a] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]" />
           <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-950 border border-blue-500/50 rounded-2xl flex flex-col items-center justify-center relative z-10 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
             <Cpu className="w-12 h-12 md:w-16 md:h-16 text-blue-500 mb-4" />
             <span className="font-mono text-xs md:text-sm text-blue-400 font-bold">CORE 110f</span>
             
             <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 w-12 md:w-16 h-0.5 bg-blue-500/50">
               <div className="w-full h-full bg-blue-400 animate-pulse" />
             </div>
             <div className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 w-12 md:w-16 h-0.5 bg-blue-500/50">
               <div className="w-full h-full bg-blue-400 animate-pulse" />
             </div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 md:-translate-y-16 w-0.5 h-12 md:h-16 bg-blue-500/50">
               <div className="w-full h-full bg-blue-400 animate-pulse" />
             </div>
           </div>
        </div>
      )
    },
    { 
      title: "Microfones e Votação", 
      icon: <Mic className="w-5 h-5" />, 
      desc: "Microfones gooseneck Shure digitais em cada assento, com botões físicos iluminados para votação (SIM, NÃO, ABSTENÇÃO). Integração nativa com o sistema.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex items-center justify-center relative">
           <div className="relative w-64 md:w-80 h-40 bg-zinc-900 border-t border-x border-zinc-800 rounded-t-3xl mt-20 flex flex-col items-center justify-end pb-8">
              <div className="w-4 h-32 md:h-48 bg-zinc-800 absolute bottom-32 -translate-y-8 rounded-full border border-zinc-700" />
              <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 border border-red-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              </div>
              
              <div className="flex gap-4 mt-8 bg-black p-3 md:p-4 rounded-xl border border-zinc-800">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-green-500">SIM</span>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-zinc-500">ABS</span>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-red-500/20 border border-red-500 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-red-500">NÃO</span>
                </div>
              </div>
           </div>
        </div>
      )
    },
    { 
      title: "Câmeras Auto-Track", 
      icon: <Cctv className="w-5 h-5" />, 
      desc: "O corte de câmera deixa de ser manual. Ao apertar o botão do microfone, o Q-SYS direciona a câmera PTZ exata para o rosto do vereador em milissegundos. Enquadramento sempre perfeito.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-4 md:inset-8 border border-zinc-800 rounded-xl overflow-hidden bg-black">
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
             
             <motion.div 
               initial={{ x: -100, y: -50, scale: 2 }}
               animate={{ x: 0, y: 0, scale: 1 }}
               transition={{ duration: 1, delay: 0.5, type: "spring" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 border-2 border-purple-500/30"
             >
               <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-purple-400" />
               <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-purple-400" />
               <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-purple-400" />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-purple-400" />
               
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono text-purple-400 whitespace-nowrap bg-purple-900/30 px-2 py-1 rounded">
                 TARGET LOCKED (MIC_02)
               </div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-purple-400/50 flex items-center justify-center animate-pulse">
                 <div className="w-1 h-1 bg-purple-400 rounded-full" />
               </div>
             </motion.div>
           </div>
        </div>
      )
    },
    { 
      title: "Transparência & Atas", 
      icon: <FileText className="w-5 h-5" />, 
      desc: "Hardware e software unidos. Cada voto nominal é registrado, computado no telão e uma Ata em PDF assinada digitalmente é gerada imediatamente para o Portal da Transparência.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex flex-col md:flex-row gap-4 p-4 md:p-8">
           <div className="w-full md:w-1/3 flex flex-col gap-4">
             <div className="h-24 md:h-full bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-end p-4 gap-2 relative overflow-hidden">
                <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-500">QUÓRUM</div>
                <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ duration: 1 }} className="w-1/3 bg-green-500 rounded-t-sm shadow-[0_0_10px_rgba(34,197,94,0.3)] relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-green-400">14</span>
                </motion.div>
                <motion.div initial={{ height: 0 }} animate={{ height: '10%' }} transition={{ duration: 1 }} className="w-1/3 bg-zinc-500 rounded-t-sm relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400">00</span>
                </motion.div>
                <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} transition={{ duration: 1 }} className="w-1/3 bg-red-500 rounded-t-sm shadow-[0_0_10px_rgba(239,68,68,0.3)] relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-red-400">03</span>
                </motion.div>
             </div>
           </div>
           
           <div className="w-full md:w-2/3 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 font-mono text-[8px] md:text-[10px] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 bg-zinc-950 p-2 border-b border-zinc-800 flex gap-2 items-center z-10">
                <Lock className="w-3 h-3 text-green-500" />
                <span className="text-zinc-400">LOG_DE_SESSÃO_CRIPTOGRAFADO</span>
              </div>
              
              <div className="mt-8 flex flex-col gap-3 relative h-full">
                 <div className="flex flex-col gap-3">
                   <div className="text-green-400 truncate">[14:02:05] VOTO: SIM (Ver. João) - HASH: x8f9a...</div>
                   <div className="text-green-400 truncate">[14:02:07] VOTO: SIM (Ver. Maria) - HASH: c2b31...</div>
                   <div className="text-red-400 truncate">[14:02:11] VOTO: NÃO (Ver. Carlos) - HASH: a9d4e...</div>
                   <div className="text-green-400 truncate">[14:02:15] VOTO: SIM (Ver. Ana) - HASH: b5f2c...</div>
                   <div className="text-green-400 truncate">[14:02:18] VOTO: SIM (Ver. Pedro) - HASH: e1c8d...</div>
                 </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none" />
              </div>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:h-[500px]">
      <div className="lg:col-span-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <div 
            key={i} 
            onClick={() => setActive(i)}
            className={\`p-5 rounded-2xl cursor-pointer transition-all duration-300 border \${active === i ? 'bg-zinc-900 border-white/10 shadow-xl' : 'bg-transparent border-transparent hover:bg-zinc-900/40'}\`}
          >
            <div className="flex items-center gap-4 mb-2">
               <div className={\`p-3 rounded-xl transition-colors \${active === i ? 'bg-white text-black' : 'bg-white/5 text-zinc-400'}\`}>
                 {item.icon}
               </div>
               <h3 className={\`text-xl font-bold transition-colors \${active === i ? 'text-white' : 'text-zinc-400'}\`}>{item.title}</h3>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-zinc-400 text-sm leading-relaxed overflow-hidden"
                >
                  <div className="pt-2">{item.desc}</div>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-[#030303] shadow-2xl relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
            style={{ willChange: 'transform, opacity' }}
          >
            {items[active].visual}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
});
`;

  // Insert before PlenariosLanding
  const mainExportMatch = content.match(/export function PlenariosLanding\(\) \{/);
  if (mainExportMatch) {
    content = content.substring(0, mainExportMatch.index) + componentCode + '\n' + content.substring(mainExportMatch.index);
  }

  // Remove the active state and items array
  const activeStart = content.indexOf('const [active, setActive] = useState(0);', mainExportMatch.index);
  const itemsEnd = content.indexOf('];', activeStart) + 2;
  
  if (activeStart !== -1 && itemsEnd !== -1) {
    content = content.substring(0, activeStart) + content.substring(itemsEnd);
  }

  // Replace JSX rendering with <PlenaryBlueprint />
  // Look for <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:h-[500px]"> inside PlenariosLanding
  const jsxStart = content.indexOf('<div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:h-[500px]">', itemsEnd);
  const jsxEnd = content.indexOf('</div>', content.indexOf('</AnimatePresence>', jsxStart)) + 6;
  const anotherDiv = content.indexOf('</div>', jsxEnd) + 6; // it has nested divs, let's just find the exact block end

  // Better way: regex replace the whole block by finding a unique wrapper if possible.
  // We can just use the fact that it's between `<Reveal delay={0.4}>` closing tag and `</section>`
  // Or just replace the string. Let's just find where it starts and ends manually.
  fs.writeFileSync(path, content, 'utf8');
}
