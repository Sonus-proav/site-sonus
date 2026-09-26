import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { SpotlightCard } from "./SpotlightCard"
import { Reveal } from "./Reveal"

export function BentoEspecialidades() {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-20">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
              Engenharia <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aplicada.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              Nenhuma sala é igual à outra. Nossa arquitetura se adapta à geometria exata do seu desafio, com precisão matemática.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(350px,auto)]">
          
          {/* CARD 1: AUDITÓRIOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <Link to="/auditorios-e-teatros" className="block h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] overflow-hidden bg-zinc-900 group !p-0">
                <img src="/auditorio-sonus.webp" alt="Auditórios" className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70 z-0" />
                
                <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-end">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Auditórios e Teatros</h3>
                  <p className="text-lg text-zinc-300 font-light max-w-md group-hover:text-white transition-colors duration-300">Engenharia acústica projetada para a geometria do espetáculo.</p>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* CARD 2: Q-SYS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <Link to="/qsys" className="block h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] overflow-hidden bg-[#0a1120] group !p-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.4)_0%,transparent_80%)] transition-colors duration-700 z-0" />
                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] z-0" />
                
                <div className="absolute top-20 right-10 flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity duration-700 z-0">
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, delay: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                </div>
                
                <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                      O Cérebro da Operação
                    </div>
                    <img src="/marcas/qsc.png" alt="QSC" className="h-6 brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 origin-right transition-all duration-500" />
                  </div>
                  
                  <div className="group-hover:translate-x-2 transition-transform duration-500">
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-3">Plataforma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-lg">Q-SYS</span></h3>
                    <p className="text-zinc-400 font-light text-lg group-hover:text-zinc-300 transition-colors">Áudio, vídeo e controle unificados na rede.</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* CARD 3: SALAS CORPORATIVAS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <Link to="/salas-reuniao" className="block h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] overflow-hidden bg-zinc-900 group !p-0">
                <img src="/sobre-sonus.webp" alt="Salas Corporativas" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 mix-blend-luminosity z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/80 to-[#050505] z-0" />
                
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="self-end w-32 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 group-hover:-translate-y-4 group-hover:rotate-2 transition-all duration-700">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <div className="w-8 h-1.5 rounded-full bg-white/20" />
                  </div>

                  <div className="mt-auto group-hover:translate-x-2 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">Salas Corporativas</h3>
                    <p className="text-zinc-400 font-light text-sm group-hover:text-zinc-300">Videoconferência nativa e automação invisível.</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* CARD 4: PLENÁRIOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <Link to="/plenarios-e-camaras" className="block h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] overflow-hidden bg-[#0c0a05] group !p-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.25)_0%,transparent_80%)] transition-colors duration-700 z-0" />
                
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500 shadow-[0_0_40px_rgba(245,158,11,0.15)] text-amber-500 overflow-hidden relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
                    <motion.div 
                      initial={{ top: "-100%" }}
                      whileHover={{ top: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent rotate-45 pointer-events-none"
                    />
                  </div>

                  <div className="mt-auto group-hover:translate-x-2 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">Plenários e Câmaras</h3>
                    <p className="text-zinc-400 font-light text-sm group-hover:text-zinc-300">Votação digital e captação irretocável para o legislativo.</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

          {/* CARD 5: IGREJAS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <Link to="/igrejas-e-templos" className="block h-full">
              <SpotlightCard className="h-full rounded-[2.5rem] overflow-hidden bg-[#0a050c] group !p-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.1)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.25)_0%,transparent_80%)] transition-colors duration-700 z-0" />
                
                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2 h-16 opacity-60 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3, 2, 4, 1, 3].map((bar, i) => (
                      <motion.div 
                        key={i} 
                        className="w-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" 
                        animate={{ height: ["20%", `${bar * 25}%`, "20%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                      />
                    ))}
                  </div>

                  <div className="mt-auto group-hover:translate-x-2 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">Igrejas e Templos</h3>
                    <p className="text-zinc-400 font-light text-sm group-hover:text-zinc-300">Acústica controlada para atingir todos os fiéis com clareza.</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
