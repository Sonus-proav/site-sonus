import { motion } from "framer-motion"

const clientsRow1 = [
  "Sistema Cresol",
  "Sicoob Vale Sul",
  "Sicredi",
  "Prefeitura de Pato Branco",
  "Câmara Municipal",
  "Universidade Unisep",
]

const clientsRow2 = [
  "Teatro Municipal",
  "Assembleia de Deus",
  "Igreja Matriz",
  "Auditório Fadep",
  "Sesi Senai",
  "Centro de Eventos",
]

export function ClientMarquee() {
  return (
    <section className="py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="text-center mb-16 relative z-10 px-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4">Confiança Tecnológica</h3>
        <p className="text-zinc-400 text-lg md:text-xl font-light">As instituições que não aceitam falhas escolhem a Sonus.</p>
      </div>

      {/* Fading Edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-8 w-full max-w-[100vw] relative z-0 origin-center -rotate-2 scale-105">
        
        {/* ROW 1 - Scrolls Left */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...clientsRow1, ...clientsRow1, ...clientsRow1].map((client, i) => (
              <div key={i} className="flex items-center gap-16 md:gap-24">
                <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:from-white hover:to-zinc-400 transition-all duration-500 cursor-default">
                  {client}
                </span>
                <span className="w-3 h-3 rounded-full bg-cyan-500/20" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2 - Scrolls Right */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...clientsRow2, ...clientsRow2, ...clientsRow2].map((client, i) => (
              <div key={i} className="flex items-center gap-16 md:gap-24">
                <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter hover:from-cyan-400 hover:to-blue-600 transition-all duration-500 cursor-default">
                  {client}
                </span>
                <span className="w-3 h-3 rounded-full bg-blue-500/20" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
