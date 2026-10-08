import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { Magnetic } from "./Magnetic"
import { Shield, Cpu, Waves } from "lucide-react"

export function AboutExperience() {
  const features = [
    {
      title: "Acústica & Eletrônica",
      desc: "Projetos 100% Customizados",
      icon: <Waves className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "Garantia Estendida",
      desc: "SLA Blindado e Suporte",
      icon: <Shield className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Equipe Especializada",
      desc: "Instalação sem Terceirizados",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section className="relative bg-[#030303] py-32 lg:py-48 overflow-hidden">
      {/* Mega Marca D'água Dinâmica */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none flex flex-col justify-center overflow-hidden">
        <motion.div 
          animate={{ x: ["-5%", "5%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="text-[25vw] font-black leading-none tracking-tighter text-white/[0.02] whitespace-nowrap"
        >
          28 ANOS DE ENGENHARIA APLICADA
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-[1400px]">
        <div className="grid xl:grid-cols-2 gap-20 xl:gap-24 items-center">
          
          {/* FOTO E MÓDULOS DE VIDRO (ESQUERDA) */}
          <div className="relative group perspective-[1000px]">
            {/* Grid de Blueprint no fundo */}
            <div className="absolute -inset-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
            
            <Magnetic>
              <div className="relative z-10 w-full aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_150px_rgba(6,182,212,0.2)] transition-shadow duration-1000">
                {/* Imagem com Parallax Suave */}
                <img 
                  src="/teatro-unisep.webp" 
                  alt="Integração Audiovisual Sonus" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform [transition-duration:2s] ease-out"
                />
                
                {/* Overlay de Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/60 to-transparent opacity-90" />
                
                {/* Selo 28 Anos Flutuante */}
                <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12">
                  <div className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-sm md:backdrop-blur-md md:backdrop-blur-2xl border border-white/10 relative overflow-hidden group/badge">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 translate-y-full group-hover/badge:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10 flex flex-col">
                      <span className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-1">+200</span>
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Projetos Entregues</span>
                    </div>
                  </div>
                </div>

                {/* Status UI Overlay (Topo Direito) */}
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">Uptime: 99.7%</span>
                </div>
              </div>
            </Magnetic>
          </div>

          {/* TEXTO E FEATURES (DIREITA) */}
          <div className="flex flex-col space-y-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Engenharia Aplicada</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-8">
                  Arquitetura Inteligente. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Operação Simples.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-xl text-zinc-400 font-light leading-relaxed border-l-[3px] border-cyan-500/30 pl-8">
                  Acreditamos que a tecnologia deve facilitar o trabalho, não gerar chamados de suporte. Centralizamos o controle de áudio, vídeo e iluminação em interfaces simples (Touch Screens). O usuário aperta um botão, a sala se prepara sozinha e a reunião começa na hora.
                </p>
              </Reveal>
            </div>

            {/* Feature Pills */}
            <div className="grid gap-4">
              {features.map((feature, i) => (
                <Reveal key={i} delay={0.3 + (i * 0.1)}>
                  <div className="group/pill relative flex items-center gap-6 p-6 rounded-3xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default overflow-hidden">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-transparent -translate-x-full group-hover/pill:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/pill:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <div className="relative z-10 flex flex-col">
                      <span className="text-lg font-bold text-white tracking-tight">{feature.title}</span>
                      <span className="text-sm font-medium text-zinc-500 tracking-wide uppercase">{feature.desc}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
