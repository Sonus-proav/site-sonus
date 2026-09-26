import { motion } from "framer-motion"
import { Mic, Cpu, Settings2, ShieldCheck, Wifi } from "lucide-react"

export function HeroVisual() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: "2000px" }}>
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: [-5, 5, -5],
          rotateX: [5, -5, 5]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* BACK LEFT CARD: ÁUDIO & ACÚSTICA */}
        <motion.div 
          className="absolute top-[10%] left-[10%] w-64 h-80 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl p-6 overflow-hidden"
          style={{ transform: "translateZ(-100px) rotateY(15deg) rotateX(10deg)" }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Mic className="w-5 h-5 text-emerald-400" />
            </div>
            
            {/* Soundwave Simulation */}
            <div className="flex items-end gap-1.5 h-20 opacity-50">
              {[40, 70, 30, 90, 50, 100, 60, 40].map((h, i) => (
                <motion.div 
                  key={i} 
                  className="w-full bg-emerald-400/50 rounded-t-sm"
                  animate={{ height: [`${h}%`, `${h * 0.4}%`, `${h}%`] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                />
              ))}
            </div>
            
            <div>
              <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Acoustic Core</p>
              <h4 className="text-white font-bold text-lg mt-1">Alta Fidelidade</h4>
            </div>
          </div>
        </motion.div>

        {/* BACK RIGHT CARD: REDE & PROCESSAMENTO */}
        <motion.div 
          className="absolute top-[15%] right-[5%] w-64 h-72 rounded-3xl border border-white/10 bg-[#050505]/60 backdrop-blur-xl shadow-2xl p-6 overflow-hidden"
          style={{ transform: "translateZ(-50px) rotateY(-15deg) rotateX(-5deg)" }}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <Wifi className="w-4 h-4 text-blue-500/50" />
            </div>
            
            {/* IP Network Simulation */}
            <div className="relative h-24 w-full flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-blue-500/20 rotate-45" />
              <div className="absolute w-full h-[1px] bg-blue-500/20 -rotate-45" />
              <motion.div className="w-8 h-8 rounded-full border border-blue-400/30 bg-blue-500/10 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </motion.div>
            </div>
            
            <div>
              <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">AV over IP</p>
              <h4 className="text-white font-bold text-lg mt-1">Matriz Q-SYS</h4>
            </div>
          </div>
        </motion.div>

        {/* FRONT CENTER CARD: CONTROLE E INTERFACE */}
        <motion.div 
          className="absolute top-[35%] left-[25%] w-72 h-80 rounded-[2rem] border border-white/20 bg-black/50 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-6 overflow-hidden"
          style={{ transform: "translateZ(100px)" }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Sistema Ativo</span>
            </div>
            
            {/* UI Mockup */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-white/70">Master Volume</span>
                <span className="text-xs text-cyan-400 font-mono">85%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-400 rounded-full" 
                  animate={{ width: ["85%", "88%", "85%"] }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white/50" />
                </div>
                <div className="h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Settings2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-white font-bold text-xl">Controle Absoluto</h4>
              <p className="text-sm text-zinc-400 mt-1">Toda a complexidade reduzida a um toque.</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
