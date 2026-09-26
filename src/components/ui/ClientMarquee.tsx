import { motion } from "framer-motion"

const clientLogos = [
  { src: "/clientes/cesul.png", alt: "Cesul", className: "h-8 md:h-10 brightness-0 invert" }, 
  { src: "/clientes/cresol.webp", alt: "Cresol", className: "h-16 md:h-24 scale-[1.5] md:scale-[2] origin-center brightness-0 invert mx-4" }, 
  { src: "/clientes/grupo-msa.svg", alt: "Grupo MSA", className: "h-8 md:h-10 brightness-0 invert" },
  { src: "/clientes/unipar.webp", alt: "Unipar", className: "h-8 md:h-10 brightness-0 invert" },
  { src: "/clientes/unisep.webp", alt: "Unisep", className: "h-8 md:h-10 brightness-0 invert" },
  { src: "/clientes/unoesc.webp", alt: "Unoesc", className: "h-8 md:h-10 brightness-0 invert" },
]

const brandLogos = [
  { src: "/shure-logo.png", alt: "Shure", className: "h-8 md:h-10 brightness-0 invert" }, 
  { src: "/qsys-logo.png", alt: "Q-SYS", className: "h-10 md:h-12 brightness-0 invert" }, 
  { src: "/marcas/sennheiser.svg", alt: "Sennheiser", className: "h-6 md:h-8 brightness-0 invert" },
  { src: "/marcas/bose.svg", alt: "Bose", className: "h-8 md:h-10 brightness-0 invert" }, 
  // Renkus-Heinz tem fundo sólido branco. Usamos apenas invert para o fundo virar preto (mesclando com o site) e a letra ficar branca.
  { src: "/marcas/renkus-heinz.png", alt: "Renkus-Heinz", className: "h-8 md:h-10 invert grayscale mix-blend-screen" }, 
  { src: "/marcas/qsc.png", alt: "QSC", className: "h-8 md:h-10 brightness-0 invert" }, 
  { src: "/zoom-logo.png", alt: "Zoom", className: "h-8 md:h-10 brightness-0 invert" },
  { src: "/google-meet-logo.png", alt: "Google Meet", className: "h-8 md:h-10 brightness-0 invert" },
]

export function ClientMarquee() {
  return (
    <section className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center gap-20">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="w-full">
        <div className="text-center mb-12 relative z-10 px-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 mb-3">Confiança Corporativa</h3>
          <p className="text-zinc-500 text-sm md:text-base font-light">As instituições que não aceitam falhas escolhem a Sonus.</p>
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden relative z-0">
          <motion.div 
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <img 
                key={i} 
                src={logo.src} 
                alt={logo.alt} 
                className={logo.className + " object-contain opacity-50 hover:opacity-100 transition-all duration-300 w-auto"}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="w-full">
        <div className="text-center mb-12 relative z-10 px-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-3">Ecossistema Certificado</h3>
          <p className="text-zinc-500 text-sm md:text-base font-light">Homologados pelas maiores fabricantes do mundo.</p>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden relative z-0">
          <motion.div 
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <img 
                key={i} 
                src={logo.src} 
                alt={logo.alt} 
                className={logo.className + " object-contain opacity-40 hover:opacity-100 transition-all duration-300 w-auto"}
              />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
