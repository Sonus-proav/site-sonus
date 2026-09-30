const fs = require('fs');

// Read the old file to get the exact SPECIALTIES array
const oldCode = fs.readFileSync('bento_old.tsx', 'utf8');

const specialtiesRegex = /const SPECIALTIES = \[[\s\S]*?\];/;
const specialtiesMatch = oldCode.match(specialtiesRegex);
const specialtiesArray = specialtiesMatch[0];

const newCode = `import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

${specialtiesArray}

export function BentoEspecialidades() {
  const [active, setActive] = useState("igrejas");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth > 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <section className="py-24 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/3" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Ecossistema de Soluções</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                Tecnologia <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aplicada.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-start md:items-end">
            <p className="text-lg text-zinc-400 font-light max-w-md leading-relaxed border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6 md:text-right mb-4">
              A arquitetura do seu espaço dita a regra. Nós construímos o cérebro invisível que dá vida a ele.
            </p>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              <span className="hidden lg:inline">Passe o mouse para expandir</span>
              <span className="lg:hidden">Toque para expandir</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            </div>
          </Reveal>
        </div>

        {/* ACCORDION HORIZONTAL INTERATIVO (FLIP GPU ACCELERATED + PRE-MOUNTED) */}
        <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[600px] w-full">
          {SPECIALTIES.map((item) => {
            const isActive = active === item.id;
            
            return (
              <motion.div
                key={item.id}
                onHoverStart={() => setActive(item.id)}
                onClick={() => setActive(item.id)}
                layout
                initial={false}
                style={{ flex: isActive ? (isDesktop ? 5 : 4) : 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
                className={\`relative overflow-hidden rounded-[2rem] cursor-pointer group \${isActive ? 'bg-zinc-900' : 'bg-zinc-950/50 hover:bg-zinc-900/50 border border-white/5'} transition-colors duration-500 flex flex-col\`}
              >
                {/* Background Image & Gradient */}
                <div className="absolute inset-0 z-0">
                  {item.image && (
                    <motion.img 
                      layout="position"
                      src={item.image} 
                      alt={item.title} 
                      className={\`w-full h-full object-cover transition-all duration-[800ms] ease-out \${isActive ? 'opacity-50 scale-100 grayscale-0' : 'opacity-20 scale-110 grayscale'}\`}
                    />
                  )}
                  <div className={\`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent transition-opacity duration-700 \${isActive ? 'opacity-90' : 'opacity-100'}\`} />
                  <div className={\`absolute inset-0 bg-gradient-to-br \${item.color} transition-opacity duration-700 \${isActive ? 'opacity-30' : 'opacity-0'}\`} />
                </div>

                {/* Content Overlay */}
                <motion.div layout="position" className={\`relative z-10 p-4 lg:p-8 h-full flex transition-all duration-[600ms] \${isActive ? "flex-col justify-end" : "flex-row lg:flex-col items-center lg:items-start justify-start lg:justify-end"}\`}>
                  
                  {/* Ícone fixo visível mesmo colapsado */}
                  <div className={\`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 z-20 shrink-0 \${isActive ? \`bg-white/10 \${item.accent} scale-110\` : 'bg-white/5 text-zinc-500'}\`}>
                    {item.icon}
                  </div>

                  {/* Título Rotacionado e Indicador (Desktop) */}
                  <div className={\`hidden lg:flex absolute inset-0 flex-col items-center justify-center transition-all duration-500 \${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}\`}>
                    <h3 className="text-2xl font-black tracking-widest text-zinc-300 uppercase whitespace-nowrap -rotate-90 mb-32 drop-shadow-xl">{item.title}</h3>
                    <div className="absolute bottom-8 text-cyan-500 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="m5 19 7-7 7 7"/></svg>
                    </div>
                  </div>

                  {/* Título e Indicador quando colapsado (Mobile) */}
                  <div className={\`flex lg:hidden items-center justify-between w-full transition-all duration-300 ml-4 \${isActive ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}\`}>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-300">{item.title}</h3>
                    <div className="text-cyan-500 animate-pulse shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>

                  {/* Conteúdo Expandido - ALWAYS MOUNTED & FIXED WIDTH */}
                  {/* min-w-[500px] ensures text never wraps/reflows during animation */}
                  <div className={\`flex flex-col w-[80vw] lg:w-[500px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] \${isActive ? 'opacity-100 translate-y-0 pointer-events-auto delay-100' : 'opacity-0 translate-y-8 pointer-events-none absolute bottom-8'}\`}>
                    <h4 className={\`\${item.accent} text-xs font-bold uppercase tracking-[0.2em] mb-2\`}>{item.subtitle}</h4>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-tight whitespace-normal">{item.title}</h3>
                    
                    <p className="text-zinc-300 font-light text-base md:text-lg leading-relaxed mb-8">
                      {item.description}
                    </p>

                    <div>
                      <Link to={item.link} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors w-fit">
                        Explorar Tecnologia
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
`;

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', newCode);
