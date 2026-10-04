import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Siren, ShieldCheck, CheckCircle2 } from "lucide-react"

export function NightmareDashboard() {
  const [phase, setPhase] = useState<"nightmare" | "dream">("nightmare")

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => p === "nightmare" ? "dream" : "nightmare")
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col justify-center relative p-4 md:p-8">
      {/* Background Toggle */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${phase === 'nightmare' ? 'bg-red-950/20' : 'bg-blue-950/20'}`} />
      
      {/* Central Indicator */}
      <div className="flex justify-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-zinc-950/80 backdrop-blur-sm transition-colors duration-1000"
             style={{ borderColor: phase === 'nightmare' ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)' }}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${phase === 'nightmare' ? 'bg-red-500' : 'bg-blue-500'}`} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase"
                style={{ color: phase === 'nightmare' ? '#ef4444' : '#3b82f6' }}>
            {phase === 'nightmare' ? 'Sexta-feira 01:30' : 'Sábado 02:00'}
          </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto h-[240px]">
        <AnimatePresence mode="wait">
          {phase === "nightmare" ? (
            <motion.div
              key="nightmare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-zinc-900 border border-red-500/20 p-4 rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.1)]">
                <div className="flex items-center gap-3 mb-2">
                  <Siren className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Aviso da Gerência</span>
                </div>
                <p className="text-zinc-300 text-sm italic">"A polícia acabou de bater na porta. Os vizinhos ligaram reclamando do som. Vamos tomar multa de novo!"</p>
              </div>

              <div className="bg-zinc-900 border border-orange-500/20 p-4 rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex justify-between items-center mb-1 pl-2">
                  <span className="text-orange-400 text-xs font-mono">SUB_L_AMP</span>
                  <span className="text-red-500 text-xs font-mono font-bold blink">CLIP_LIMIT</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden ml-2">
                  <div className="h-full bg-red-500 w-[98%]" />
                </div>
                <p className="text-zinc-400 text-[10px] mt-2 ml-2">O DJ está estourando o volume da mesa. Risco iminente de queima de bobina.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dream"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-zinc-900 border border-blue-500/20 p-4 rounded-xl shadow-[0_4px_20px_rgba(59,130,246,0.1)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">DSP Ativo</span>
                </div>
                <div className="flex items-end gap-1 h-6 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-full bg-blue-500/50 rounded-t-sm"
                      animate={{ height: ['40%', '80%', '50%', '90%', '30%'][i % 5] }}
                      transition={{ duration: 0.5 + (i * 0.1), repeat: Infinity, repeatType: "reverse" }}
                    />
                  ))}
                  <div className="w-full h-full border-b-2 border-red-500/50 border-dashed absolute top-0 left-0 pointer-events-none flex items-start justify-end pr-1 pt-0.5">
                     <span className="text-[8px] text-red-500/80 font-mono">105dB_LIMIT</span>
                  </div>
                </div>
                <p className="text-zinc-300 text-[10px] mt-1 text-center">Compressão transparente segurando os picos do DJ.</p>
              </div>

              <div className="bg-zinc-900 border border-green-500/20 p-4 rounded-xl shadow-[0_4px_20px_rgba(34,197,94,0.1)]">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Laudo Acústico (ART)</span>
                </div>
                <p className="text-zinc-300 text-sm italic">"Pista cheia, graves no peito, e zero vazamento de som lá fora. Alvará renovado sem dor de cabeça."</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
