import { motion, useSpring, useTransform } from "framer-motion"
import { Cpu, Mic, Settings2, Wifi, ShieldCheck } from "lucide-react"
import { useState, useRef } from "react"

export function HeroVisual() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking springs
  const mouseX = useSpring(0, { stiffness: 50, damping: 15, mass: 1 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 15, mass: 1 })

  // Map mouse positions to 3D rotations
  // Base X is 60. We tilt between 45 and 75 based on Y.
  const rotateX = useTransform(mouseY, [-1, 1], [75, 45])
  
  // Base Y is 0. We tilt between -20 and 20 based on X.
  const rotateY = useTransform(mouseX, [-1, 1], [-20, 20])
  
  // Base Z is -45. We twist slightly based on X for extra dynamism.
  const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Calculate mouse position relative to center of container
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Normalize to -1 to 1 range
    const normalizedX = (e.clientX - centerX) / (rect.width / 2)
    const normalizedY = (e.clientY - centerY) / (rect.height / 2)
    
    // Clamp to -1 to 1 just in case
    mouseX.set(Math.max(-1, Math.min(1, normalizedX)))
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)))
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Smoothly return to center
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center group perspective-[2000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[50px] md:blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-30 mix-blend-screen" />

      {/* Isometric 3D Container tracking mouse */}
      <motion.div
        className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px]"
        style={{ 
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          rotateZ
        }}
        animate={{ 
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Continuous slow spin for the whole stack */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* =======================================
              LAYER 1: AV OVER IP (BASE PLATE)
              ======================================= */}
          <motion.div 
            className="absolute inset-0 rounded-[2.5rem] border-[1.5px] border-blue-500/30 bg-black/90 backdrop-blur-sm md:backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ translateZ: isHovered ? -140 : -80 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-[size:30px_30px] bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl border border-blue-500/50 bg-blue-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <Cpu className="w-10 h-10 text-blue-400" />
            </div>
            <motion.div 
              className="absolute top-[50%] left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute left-[50%] top-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent h-full"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
            <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-blue-500/50" />
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/50" />
          </motion.div>

          {/* =======================================
              LAYER 2: ACOUSTIC CORE (MIDDLE PLATE)
              ======================================= */}
          <motion.div 
            className="absolute inset-0 rounded-[2.5rem] border-[1.5px] border-emerald-500/30 bg-black/60 backdrop-blur-md md:backdrop-blur-xl overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ translateZ: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-24 h-24 rounded-full border-2 border-emerald-500/30"
                  animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1.33, ease: "linear" }}
                />
              ))}
              <div className="relative z-10 w-14 h-14 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Mic className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between h-20 gap-2 opacity-70">
              {Array.from({length: 16}).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-emerald-400/60 rounded-t-sm"
                  animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* =======================================
              LAYER 3: CONTROL INTERFACE (TOP PLATE)
              ======================================= */}
          <motion.div 
            className="absolute inset-0 rounded-[2.5rem] border border-cyan-400/40 bg-[#020202]/40 backdrop-blur-lg md:backdrop-blur-2xl overflow-hidden"
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: isHovered 
                ? "0 80px 120px -30px rgba(6,182,212,0.4), inset 0 0 20px rgba(6,182,212,0.2)" 
                : "0 40px 80px -20px rgba(6,182,212,0.2), inset 0 0 10px rgba(6,182,212,0.1)"
            }}
            animate={{ translateZ: isHovered ? 140 : 80 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-xs font-mono text-cyan-400 tracking-[0.2em]">SONUS_OS</span>
              </div>
              <Wifi className="w-5 h-5 text-cyan-400/50" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div 
                className="w-36 h-36 rounded-full border-[3px] border-cyan-500/20 bg-black/60 backdrop-blur-xl flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]"
                animate={{ rotate: isHovered ? 145 : 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-6 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
                <motion.div 
                  className="text-center"
                  animate={{ rotate: isHovered ? -145 : 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-3xl font-light text-white">85</span>
                  <span className="text-sm text-cyan-400 ml-1">%</span>
                  <p className="text-[10px] text-zinc-400 font-mono mt-1 tracking-widest">VOLUME</p>
                </motion.div>
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
              <div className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                <ShieldCheck className="w-5 h-5 text-white/50" />
                <span className="text-[11px] font-mono text-white/50 tracking-wider">SYSTEM</span>
              </div>
              <div className="h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-cyan-500/30 transition-colors cursor-pointer">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-400 tracking-wider">MATRIX</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Labels connecting to the layers (Z-indexed to float outside) */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 flex flex-col gap-12 pointer-events-none hidden lg:flex">
        <motion.div className="flex items-center gap-4" animate={{ y: isHovered ? -60 : -40 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="w-8 h-[1px] bg-cyan-500/50" />
          <div>
            <p className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">Control Layer</p>
            <p className="text-white/40 text-xs font-mono">User Interface</p>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-4" animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="w-12 h-[1px] bg-emerald-500/50" />
          <div>
            <p className="text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase">Acoustic Layer</p>
            <p className="text-white/40 text-xs font-mono">DSP Processing</p>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-4" animate={{ y: isHovered ? 60 : 40 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="w-16 h-[1px] bg-blue-500/50" />
          <div>
            <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">Network Layer</p>
            <p className="text-white/40 text-xs font-mono">AV over IP Matrix</p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
