import { motion } from "framer-motion"

const clientLogos = [
  { src: "/clientes/cesul.png", alt: "Cesul" },
  { src: "/clientes/cresol.webp", alt: "Cresol" },
  { src: "/clientes/grupo-msa.svg", alt: "Grupo MSA" },
  { src: "/clientes/unipar.webp", alt: "Unipar" },
  { src: "/clientes/unisep.webp", alt: "Unisep" },
  { src: "/clientes/unoesc.webp", alt: "Unoesc" },
]

const brandLogos = [
  { src: "/marcas/shure.svg", alt: "Shure" },
  { src: "/marcas/qsys.svg", alt: "Q-SYS" },
  { src: "/marcas/sennheiser.svg", alt: "Sennheiser" },
  { src: "/marcas/bose.svg", alt: "Bose" },
  { src: "/marcas/renkus-heinz.svg", alt: "Renkus-Heinz" },
  { src: "/marcas/qsc.svg", alt: "QSC" },
]

export function ClientMarquee() {
  return (
    <section className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center gap-20">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Fading Edges globais */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* SESSÃO CLIENTES */}
      <div className="w-full">
        <div className="text-center mb-10 relative z-10 px-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 mb-3">Confiança Corporativa</h3>
          <p className="text-zinc-500 text-sm md:text-base font-light">As instituições que não aceitam falhas escolhem a Sonus.</p>
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden relative z-0">
          <motion.div 
            className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <img 
                key={i} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-10 md:h-14 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* LINHA DIVISÓRIA SUTIL */}
      <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* SESSÃO MARCAS (PARCEIROS TECNOLÓGICOS) */}
      <div className="w-full">
        <div className="text-center mb-10 relative z-10 px-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-3">Ecossistema Certificado</h3>
          <p className="text-zinc-500 text-sm md:text-base font-light">Homologados pelas maiores fabricantes do mundo.</p>
        </div>

        <div className="flex whitespace-nowrap overflow-hidden relative z-0">
          <motion.div 
            className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <img 
                key={i} 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-12 object-contain grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
              />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
