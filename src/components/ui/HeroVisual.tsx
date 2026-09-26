import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Cpu, Settings2, ShieldCheck, Wifi } from "lucide-react"

const CAROUSEL_POSITIONS = [
  // 0: FRONT
  { 
    y: 60, x: 0, z: 100, 
    rotateY: 0, rotateX: 0, 
    scale: 1, opacity: 1, zIndex: 30 
  },
  // 1: BACK RIGHT
  { 
    y: 0, x: 120, z: -50, 
    rotateY: -15, rotateX: -5, 
    scale: 0.9, opacity: 0.5, zIndex: 20 
  },
  // 2: BACK LEFT
  { 
    y: -40, x: -120, z: -100, 
    rotateY: 15, rotateX: 10, 
    scale: 0.8, opacity: 0.3, zIndex: 10 
  }
];

export function HeroVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Acoustic Card
  const AcousticCard = (
    <div className="w-full h-full rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none rounded-[2rem]" />
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Mic className="w-5 h-5 text-emerald-400" />
      </div>
      
      {/* Soundwave Simulation */}
      <div className="relative z-10 flex items-end gap-1.5 h-20 opacity-50">
        {[40, 70, 30, 90, 50, 100, 60, 40].map((h, i) => (
          <motion.div 
            key={i} 
            className="w-full bg-emerald-400/50 rounded-t-sm"
            animate={{ height: [`${h}%`, `${h * 0.4}%`, `${h}%`] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Acoustic Core</p>
        <h4 className="text-white font-bold text-lg mt-1">Alta Fidelidade</h4>
      </div>
    </div>
  );

  // Network Card
  const NetworkCard = (
    <div className="w-full h-full rounded-[2rem] border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none rounded-[2rem]" />
      <div className="relative z-10 flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-blue-400" />
        </div>
        <Wifi className="w-4 h-4 text-blue-500/50" />
      </div>
      
      {/* IP Network Simulation */}
      <div className="relative z-10 h-24 w-full flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-blue-500/20 rotate-45" />
        <div className="absolute w-full h-[1px] bg-blue-500/20 -rotate-45" />
        <motion.div className="w-10 h-10 rounded-full border border-blue-400/30 bg-blue-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 rounded-full bg-blue-400" />
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">AV over IP</p>
        <h4 className="text-white font-bold text-lg mt-1">Matriz Q-SYS</h4>
      </div>
    </div>
  );

  // Control Card
  const ControlCard = (
    <div className="w-full h-full rounded-[2rem] border border-white/20 bg-black/70 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(34,211,238,0.3)] p-6 overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none rounded-[2rem]" />
      
      
      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Sistema Ativo</span>
      </div>
      
      {/* UI Mockup */}
      <div className="relative z-10 flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 justify-center mb-4">
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
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white/50" />
          </div>
          <div className="h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <h4 className="text-white font-bold text-lg">Controle Absoluto</h4>
        <p className="text-xs text-zinc-400 mt-1">Toda a complexidade reduzida a um toque.</p>
      </div>
    </div>
  );

  const cards = [ControlCard, NetworkCard, AcousticCard];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center cursor-default" style={{ perspective: "2000px" }}>
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 3D Container rotating slightly based on overall visual flair */}
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        
        animate={{ 
          rotateY: [-3, 3, -3],
          rotateX: [2, -2, 2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {cards.map((CardContent, i) => {
          // Calculate the target position index for this card based on the current interval index
          const positionIndex = (i + index) % 3;
          const pos = CAROUSEL_POSITIONS[positionIndex];

          return (
            <motion.div
              key={i}
              className="absolute w-[280px] h-[340px]"
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                z: pos.z,
                rotateY: pos.rotateY,
                rotateX: pos.rotateX,
                scale: pos.scale,
                opacity: pos.opacity,
                zIndex: pos.zIndex,
              }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              }}
            >
              {CardContent}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  )
}
