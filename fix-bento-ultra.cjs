const fs = require('fs');
let s = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// I will completely replace the return block with a highly optimized pure CSS version.
// No framer-motion. No grayscale. No scale on images.

const newCode = `import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

const SPECIALTIES = [
  {
    id: "auditorios",
    title: "Auditórios e Teatros",
    subtitle: "Acústica Imersiva",
    description: "Projetos de sonorização de alta inteligibilidade e acústica arquitetônica para espaços com grande audiência, garantindo que a última fileira ouça com a mesma clareza da primeira.",
    link: "/auditorios",
    color: "from-blue-500/20 to-transparent",
    accent: "text-blue-500",
    image: "/auditorio-sonus.webp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
    )
  },
  {
    id: "qsys",
    title: "Plataforma Q-SYS",
    subtitle: "Processamento e Controle",
    description: "Somos certificados na programação e integração do ecossistema Q-SYS, unificando áudio, vídeo e automação (AV&C) em uma única plataforma controlada por software baseado em nuvem.",
    link: "/qsys",
    color: "from-cyan-500/20 to-transparent",
    accent: "text-cyan-500",
    image: "/qsys-tech-bg.webp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
    )
  },
  {
    id: "salas",
    title: "Salas Corporativas",
    subtitle: "Videoconferência",
    description: "Transformamos salas de reunião tradicionais em hubs de colaboração híbrida. Integração invisível com Teams e Zoom, microfones de teto e câmeras com IA que acompanham quem fala.",
    link: "/salas-de-reuniao",
    color: "from-indigo-500/20 to-transparent",
    accent: "text-indigo-500",
    image: "/salas-corporativas.webp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
    )
  },
  {
    id: "plenarios",
    title: "Plenários e Câmaras",
    subtitle: "Votação e Transmissão",
    description: "Sistemas robustos de votação eletrônica, microfones parlamentares com prioridade de fala e câmeras PTZ automatizadas integradas ao sistema de transmissão ao vivo (streaming).",
    link: "/plenarios",
    color: "from-emerald-500/20 to-transparent",
    accent: "text-emerald-500",
    image: "/plenario-legislativo.jpg",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    )
  },
  {
    id: "igrejas",
    title: "Igrejas e Templos",
    subtitle: "Palavra Clara",
    description: "Acústica controlada para atingir todos os fiéis com clareza. Da voz falada ao louvor com banda completa, sem microfonia. Sistemas dimensionados para a arquitetura do seu templo.",
    link: "/igrejas",
    color: "from-violet-500/20 to-transparent",
    accent: "text-violet-500",
    image: "/interior-matriz-xanxere.webp",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
    )
  }
];

export function BentoEspecialidades() {
  const [active, setActive] = useState("igrejas");

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

        {/* ACCORDION HORIZONTAL INTERATIVO - ULTRA OTIMIZADO (CSS-ONLY) */}
        <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[600px] w-full">
          {SPECIALTIES.map((item) => {
            const isActive = active === item.id;
            
            // Usamos uma classe CSS estática para o hover e flex.
            // Para garantir 60FPS absoluto, evitamos animações pesadas nas imagens (sem scale, sem grayscale).
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActive(item.id)}
                onClick={() => setActive(item.id)}
                className={\`relative overflow-hidden rounded-[2rem] cursor-pointer group flex flex-col will-change-[flex] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] \${isActive ? 'lg:flex-[5] flex-[4] bg-zinc-900' : 'flex-1 bg-zinc-950/50 hover:bg-zinc-900/50 border border-white/5'}\`}
              >
                {/* Background Image & Gradient (SIMPLIFIED FOR PERFORMANCE) */}
                <div className="absolute inset-0 z-0 bg-[#050505]">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={\`w-full h-full object-cover transition-opacity duration-500 \${isActive ? 'opacity-50' : 'opacity-10'}\`}
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90" />
                  <div className={\`absolute inset-0 bg-gradient-to-br \${item.color} transition-opacity duration-500 \${isActive ? 'opacity-40' : 'opacity-0'}\`} />
                </div>

                {/* Content Overlay */}
                <div className={\`relative z-10 p-4 lg:p-8 h-full flex transition-all duration-500 \${isActive ? "flex-col justify-end" : "flex-row lg:flex-col items-center lg:items-start justify-start lg:justify-end"}\`}>
                  
                  {/* Ícone fixo */}
                  <div className={\`w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 z-20 shrink-0 \${isActive ? \`bg-white/10 \${item.accent} scale-110\` : 'bg-white/5 text-zinc-500'}\`}>
                    {item.icon}
                  </div>

                  {/* Título Rotacionado (Desktop) */}
                  <div className={\`hidden lg:flex absolute inset-0 flex-col items-center justify-center transition-opacity duration-300 \${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'}\`}>
                    <h3 className="text-2xl font-black tracking-widest text-zinc-300 uppercase whitespace-nowrap -rotate-90 mb-32 drop-shadow-xl">{item.title}</h3>
                  </div>

                  {/* Título (Mobile) */}
                  <div className={\`flex lg:hidden items-center justify-between w-full transition-opacity duration-300 ml-4 \${isActive ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}\`}>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-300">{item.title}</h3>
                  </div>

                  {/* Conteúdo Expandido - DOM Constante e Largura Fixa */}
                  {/* will-change-opacity previne reflows */}
                  <div className={\`flex flex-col w-[80vw] lg:w-[450px] transition-all duration-500 will-change-[opacity,transform] \${isActive ? 'opacity-100 translate-y-0 pointer-events-auto delay-100' : 'opacity-0 translate-y-4 pointer-events-none absolute bottom-8'}\`}>
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

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
`

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', newCode);
console.log("Ultra-optimized Bento applied!");
