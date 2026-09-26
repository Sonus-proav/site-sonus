import { motion } from "framer-motion"

const clientLogos = [
  { src: "/clientes/cesul.png", alt: "Cesul", className: "h-10 md:h-12" }, 
  { src: "/clientes/cresol.webp", alt: "Cresol", className: "h-12 md:h-16 scale-[1.2] md:scale-[1.5] origin-center" }, 
  { src: "/clientes/grupo-msa.svg", alt: "Grupo MSA", className: "h-10 md:h-12" },
  { src: "/clientes/unipar.webp", alt: "Unipar", className: "h-10 md:h-12" },
  { src: "/clientes/unisep.webp", alt: "Unisep", className: "h-10 md:h-12" },
  { src: "/clientes/unoesc.webp", alt: "Unoesc", className: "h-10 md:h-12" },
]

const brandLogos = [
  { src: "/shure-logo.png", alt: "Shure", className: "h-8 md:h-10" }, 
  { src: "/qsys-logo.png", alt: "Q-SYS", className: "h-10 md:h-12" }, 
  { src: "/marcas/sennheiser.svg", alt: "Sennheiser", className: "h-6 md:h-8" },
  { src: "/marcas/bose.svg", alt: "Bose", className: "h-12 md:h-16 scale-[1.5] origin-center" }, 
  { src: "/marcas/renkus-heinz-fixed.png", alt: "Renkus-Heinz", className: "h-8 md:h-10" }, 
  { src: "/marcas/qsc.png", alt: "QSC", className: "h-8 md:h-10" }, 
  { src: "/zoom-logo.png", alt: "Zoom", className: "h-8 md:h-10" },
  { src: "/google-meet-logo.png", alt: "Google Meet", className: "h-8 md:h-10" },
]

export function ClientMarquee() {
  return (
    <section className="py-32 bg-[#020202] border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center gap-24">
      
      {/* --- EFEITOS DE FUNDO (BACKGROUND) --- */}
      {/* 1. Grade de Fundo (Tech Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      
      {/* 2. Orbes de Luz Atmosférica (Glows) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[60px] md:blur-[60px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[60px] md:blur-[60px] pointer-events-none" />


      {/* --- SESSÃO CLIENTES --- */}
      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* Badge Premium */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 ">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Confiança Corporativa</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-light text-zinc-300 mb-12 tracking-tight text-center px-4 max-w-2xl">
          As instituições que não aceitam falhas escolhem a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sonus</span>.
        </h3>
        
        {/* Pista Glassmorfismo Inclinada */}
        <div className="w-[110vw] -ml-[5vw] relative py-10 bg-[#050505] border-y border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] rotate-[-1.5deg] overflow-hidden flex items-center">
          
          {/* Sombras laterais para o fade */}
          <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32 relative z-0"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="group relative flex items-center justify-center shrink-0">
                {/* Aura de Hover */}
                <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={logo.className + " object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 w-auto relative z-10"}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* --- SESSÃO MARCAS --- */}
      <div className="w-full relative z-10 flex flex-col items-center mt-8">
        
        {/* Badge Premium */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 ">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">Ecossistema Certificado</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-light text-zinc-300 mb-12 tracking-tight text-center px-4 max-w-2xl">
          Homologados pelas maiores <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">fabricantes do mundo</span>.
        </h3>

        {/* Pista Glassmorfismo Inclinada Reversa */}
        <div className="w-[110vw] -ml-[5vw] relative py-10 bg-[#050505] border-y border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] rotate-[1.5deg] overflow-hidden flex items-center">
          
          <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32 relative z-0"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="group relative flex items-center justify-center shrink-0">
                {/* Aura de Hover */}
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={logo.className + " object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 w-auto relative z-10"}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
