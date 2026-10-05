import { useState, useEffect, useRef, memo } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Music, Users, Beer, Cigarette, VolumeX } from "lucide-react"

export const ClubHeatmap = memo(function ClubHeatmap() {
  const [activeZone, setActiveZone] = useState<number | null>(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const autoPlayRef = useRef(true)
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const isInView = useInView(containerRef, { amount: 0.2 })
  
  const zones = [
    { 
      id: 0, 
      label: "Palco & Pista", 
      icon: Music,
      coverage: 105, 
      desc: "Onde a mágica acontece. Pressão cravada no limite seguro do DSP.",
      color: "text-red-500",
      bgMap: "bg-red-500/80",
      x: "50%", y: "25%",
      glow: "drop-shadow-[0_0_20px_rgba(239,68,68,1)]"
    },
    { 
      id: 1, 
      label: "Área VIP / Mesas", 
      icon: Users,
      coverage: 95, 
      desc: "Som imersivo, mas que permite conversação sem precisar gritar.",
      color: "text-yellow-500",
      bgMap: "bg-yellow-500/80",
      x: "25%", y: "45%",
      glow: "drop-shadow-[0_0_20px_rgba(234,179,8,1)]"
    },
    { 
      id: 2, 
      label: "Bar", 
      icon: Beer,
      coverage: 88, 
      desc: "Volume reduzido para garantir que os caixas escutem os pedidos.",
      color: "text-green-500",
      bgMap: "bg-green-500/80",
      x: "75%", y: "60%",
      glow: "drop-shadow-[0_0_20px_rgba(34,197,94,1)]"
    },
    { 
      id: 3, 
      label: "Fumódromo / Saída", 
      icon: Cigarette,
      coverage: 75, 
      desc: "Transição suave de volume para a área externa.",
      color: "text-blue-400",
      bgMap: "bg-blue-400/80",
      x: "50%", y: "80%",
      glow: "drop-shadow-[0_0_20px_rgba(96,165,250,1)]"
    },
    { 
      id: 4, 
      label: "Rua (Vizinhos)", 
      icon: VolumeX,
      coverage: 55, 
      desc: "Isolamento absoluto. O DSP garante que o som não vase para a rua.",
      color: "text-indigo-400",
      bgMap: "bg-indigo-500/80",
      x: "50%", y: "100%",
      glow: "drop-shadow-[0_0_20px_rgba(99,102,241,1)]"
    },
  ]

  useEffect(() => {
    autoPlayRef.current = autoPlay
    if (!autoPlay || !isInView) return
    
    let idx = 0
    const interval = setInterval(() => {
      if (!autoPlayRef.current) return
      idx = (idx + 1) % zones.length
      setActiveZone(zones[idx].id)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [autoPlay, isInView, zones.length])

  const handleMouseEnter = (id: number) => {
    setAutoPlay(false)
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    setActiveZone(id)
  }
  
  const handleMouseLeave = () => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    autoPlayTimerRef.current = setTimeout(() => setAutoPlay(true), 2000)
  }

  const activeData = zones.find(z => z.id === activeZone) || zones[0]

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center relative p-2 md:p-6 h-full">
      
      {/* 3D Architectural Blueprint Wrapper */}
      <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[340px] mx-auto mb-8 ">
         <motion.div 
           className="w-full h-full relative"
           initial={{ scale: 0.9, y: 20, opacity: 0 }}
           whileInView={{ scale: 1, y: 0, opacity: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           
         >
            {/* The Floor Plan Base */}
            <div className="absolute inset-0 bg-zinc-950/80 border-2 border-white/20 rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden ">
               
               {/* 
                 The Thermal Heatmap Gradient Overlay!
                 This simulates acoustic dispersion from the stage (top center) to the bottom.
                 We use a complex radial gradient for the "heat" map look.
               */}
               <div className="absolute inset-0 mix-blend-screen opacity-90 transition-opacity duration-1000"
                    style={{
                      background: `
                        radial-gradient(circle at 50% 10%, rgba(239,68,68,0.8) 0%, transparent 40%),
                        radial-gradient(circle at 50% 30%, rgba(234,179,8,0.6) 10%, transparent 55%),
                        radial-gradient(circle at 50% 60%, rgba(34,197,94,0.4) 30%, transparent 80%),
                        radial-gradient(circle at 50% 90%, rgba(59,130,246,0.3) 50%, transparent 100%)
                      `
                    }}
               />

               {/* Architectural Grid / Lines */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
               
               {/* Room Walls & Structures Drawn with CSS */}
               {/* Stage */}
               <div className="absolute top-[5%] left-[20%] w-[60%] h-[15%] border-2 border-white/30 bg-black/40 rounded-t-lg  flex items-center justify-center">
                  <span className="text-[10px] text-white/50 font-mono tracking-widest">STAGE</span>
               </div>
               
               {/* VIP Area */}
               <div className="absolute top-[30%] left-[5%] w-[35%] h-[30%] border-2 border-white/20 bg-black/20 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] text-white/30 font-mono tracking-widest">VIP</span>
               </div>
               
               {/* Bar Area */}
               <div className="absolute top-[50%] right-[5%] w-[25%] h-[35%] border-2 border-white/20 bg-black/20 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] text-white/30 font-mono tracking-widest -rotate-90">BAR</span>
               </div>

               {/* Entrance / Smoking Area */}
               <div className="absolute bottom-[2%] left-[30%] w-[40%] h-[15%] border-t-2 border-x-2 border-white/20 bg-black/40 rounded-b-none flex items-center justify-center">
                  <span className="text-[10px] text-white/30 font-mono tracking-widest">EXIT</span>
               </div>

            </div>

            {/* 3D Floating Markers mapped to zones */}
            {zones.map((zone) => {
               const isActive = activeZone === zone.id
               return (
                 <div 
                   key={zone.id}
                   className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50"
                   style={{ left: zone.x, top: zone.y }}
                   onMouseEnter={() => handleMouseEnter(zone.id)}
                   onMouseLeave={handleMouseLeave}
                 >
                    {/* The glowing pulse effect when active */}
                    <AnimatePresence>
                       {isActive && (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.5 }}
                           className={`absolute w-12 h-12 rounded-full border-2 border-white/50 ${zone.bgMap} blur-md`} 
                           
                         />
                       )}
                    </AnimatePresence>
                    
                    {/* The Marker Label that stands UP in 3D */}
                    <motion.div 
                      className={`relative flex flex-col items-center justify-center transition-all duration-300`}
                      
                      animate={{ y: isActive ? -10 : 0, scale: isActive ? 1.1 : 0.9 }}
                    >
                       <div className={`px-2 py-1 rounded bg-black/80 border border-white/20  shadow-xl flex items-center gap-1.5 ${isActive ? 'ring-2 ring-white/50 ' + zone.glow : 'opacity-70'}`}>
                          <zone.icon className={`w-3 h-3 ${zone.color}`} />
                          <span className="text-[10px] font-bold text-white">{zone.coverage}dB</span>
                       </div>
                       
                       {/* Line pointing down to the map */}
                       <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent" />
                       <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                    </motion.div>
                 </div>
               )
            })}
         </motion.div>
      </div>

      {/* Modern Floating Info Card */}
      <motion.div 
        className="mt-6 p-4 rounded-xl border border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-[280px] sm:max-w-[340px] mx-auto w-full shadow-2xl relative"
        key={activeData.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
      >
        {/* Glow behind the icon in the card */}
        <div className={`absolute -left-4 -top-4 w-24 h-24 rounded-full ${activeData.bgMap} blur-3xl opacity-30 pointer-events-none`} />
        
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-black/50 z-10 ${activeData.glow}`}>
          <activeData.icon className={`w-5 h-5 ${activeData.color}`} />
        </div>
        <div className="z-10">
          <div className="flex items-center gap-2 mb-1">
             <h4 className="text-white font-bold text-sm tracking-wide">{activeData.label}</h4>
             <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 ${activeData.bgMap} text-white font-bold`}>{activeData.coverage}dB</span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">{activeData.desc}</p>
        </div>
      </motion.div>
    </div>
  )
})

export default ClubHeatmap
