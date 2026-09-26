import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Reveal } from "./Reveal"

const SPECIALTIES = [
  {
    id: "auditorios",
    title: "Auditórios e Teatros",
    subtitle: "Acústica para espetáculos",
    description: "Engenharia acústica projetada para a geometria exata do espetáculo. Sem ecos, sem zonas mortas. Fidelidade absoluta em cada poltrona.",
    image: "/auditorio-sonus.webp",
    link: "/auditorios-e-teatros",
    color: "from-emerald-500/20 to-emerald-900/40",
    accent: "text-emerald-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
  },
  {
    id: "qsys",
    title: "Plataforma Q-SYS",
    subtitle: "O Cérebro da Operação",
    description: "Áudio, vídeo e controle unificados na rede. Esqueça racks lotados de equipamentos isolados. Tudo processado via software.",
    image: "/qsys-tech-bg.webp", // Fundo genérico tech, ou uma imagem escura
    
    link: "/qsys",
    color: "from-blue-500/20 to-indigo-900/40",
    accent: "text-blue-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
  },
  {
    id: "salas",
    title: "Salas Corporativas",
    subtitle: "Videoconferência Nativa",
    description: "Automação invisível. Reuniões híbridas que começam com um toque, sem cabos pela mesa e sem falhas de conexão.",
    image: "/salas-corporativas.webp",
    link: "/salas-reuniao",
    color: "from-cyan-500/20 to-teal-900/40",
    accent: "text-cyan-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
  },
  {
    id: "plenarios",
    title: "Plenários e Câmaras",
    subtitle: "Votação Digital",
    description: "Captação irretocável para o legislativo. Microfones parlamentares integrados com câmera tracking automático e votação blindada.",
    bgElement: <div className="absolute inset-0 flex items-center justify-center opacity-20 scale-[2] group-hover:scale-[1.5] transition-transform duration-1000 -translate-y-20"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><polygon points="12 2 2 7 22 7"/><line x1="6" x2="6" y1="22" y2="7"/><line x1="18" x2="18" y1="22" y2="7"/><line x1="12" x2="12" y1="22" y2="7"/><line x1="2" x2="22" y1="22" y2="22"/></svg></div>, // Reaproveitado, idealmente teria um específico
    link: "/plenarios-e-camaras",
    color: "from-amber-500/20 to-orange-900/40",
    accent: "text-amber-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
  },
  {
    id: "igrejas",
    title: "Igrejas e Templos",
    subtitle: "Palavra Clara",
    description: "Acústica controlada para atingir todos os fiéis com clareza. Da voz falada ao louvor com banda completa, sem microfonia.",
    image: "/interior-matriz-xanxere.webp", // Reaproveitado
    link: "/igrejas-e-templos",
    color: "from-purple-500/20 to-fuchsia-900/40",
    accent: "text-purple-400",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
  }
]

export function BentoEspecialidades() {
  const [active, setActive] = useState<string>("auditorios")

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1600px] relative z-10">
        
        {/* Header Bespoke */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Ecossistema de Soluções</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                Engenharia <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aplicada.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-lg text-zinc-400 font-light max-w-md leading-relaxed border-l border-white/10 pl-6">
              A arquitetura do seu espaço dita a regra. Nós construímos o cérebro invisível que dá vida a ele.
            </p>
          </Reveal>
        </div>

        {/* ACCORDION HORIZONTAL INTERATIVO */}
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
                animate={{
                  flex: isActive ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? 5 : 4) : 1,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
                className={`relative overflow-hidden rounded-[2rem] cursor-pointer group ${isActive ? 'bg-zinc-900' : 'bg-zinc-950/50 hover:bg-zinc-900/50 border border-white/5'} transition-colors duration-500 flex flex-col`}
              >
                {/* Background Image & Gradient */}
                <div className="absolute inset-0 z-0">
                  {item.bgElement}
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'opacity-50 scale-100 grayscale-0' : 'opacity-20 scale-110 grayscale'}`}
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-100'}`} />
                  {isActive && <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`} />}
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                  
                  {/* Ícone fixo visível mesmo colapsado */}
                  <div className={`w-12 h-12 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? `bg-white/10 ${item.accent} scale-110` : 'bg-white/5 text-zinc-500'}`}>
                    {item.icon}
                  </div>

                  {/* Título Rotacionado quando colapsado (Desktop) */}
                  <div className={`hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap origin-bottom-left -rotate-90 transition-all duration-500 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 delay-300'}`}>
                    <h3 className="text-xl font-bold tracking-wider text-zinc-500 uppercase">{item.title}</h3>
                  </div>

                  {/* Título normal quando colapsado (Mobile) */}
                  <div className={`block lg:hidden transition-all duration-300 ${isActive ? 'opacity-0 h-0 hidden' : 'opacity-100 h-auto block'}`}>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-400">{item.title}</h3>
                  </div>

                  {/* Conteúdo Expandido */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex flex-col"
                      >
                        <h4 className={`${item.accent} text-xs font-bold uppercase tracking-[0.2em] mb-2`}>{item.subtitle}</h4>
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-tight">{item.title}</h3>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-zinc-300 font-light text-base md:text-lg max-w-xl leading-relaxed mb-8"
                        >
                          {item.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          <Link to={item.link} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors w-fit`}>
                            Explorar Engenharia
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
