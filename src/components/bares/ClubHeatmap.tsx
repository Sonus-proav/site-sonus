import { useState, useEffect, useRef, memo } from "react"
import { motion, useInView } from "framer-motion"
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
      desc: "Onde a mágica acontece. Graves no peito, som de festival, pressão cravada no limite seguro do DSP.",
      color: "bg-blue-600",
      ringSize: "w-[30%] h-[30%]"
    },
    { 
      id: 1, 
      label: "Área VIP / Mesas", 
      icon: Users,
      coverage: 95, 
      desc: "Som imersivo com alta fidelidade, mas que permite conversação sem precisar gritar.",
      color: "bg-indigo-500",
      ringSize: "w-[50%] h-[50%]"
    },
    { 
      id: 2, 
      label: "Bar / Caixas", 
      icon: Beer,
      coverage: 88, 
      desc: "Volume reduzido para garantir que os garçons e caixas escutem os pedidos perfeitamente.",
      color: "bg-purple-500",
      ringSize: "w-[70%] h-[70%]"
    },
    { 
      id: 3, 
      label: "Fumódromo", 
      icon: Cigarette,
      coverage: 75, 
      desc: "Transição suave de volume para a área externa. Conforto acústico para descanso.",
      color: "bg-zinc-500",
      ringSize: "w-[85%] h-[85%]"
    },
    { 
      id: 4, 
      label: "Calçada & Vizinhos", 
      icon: VolumeX,
      coverage: 55, 
      desc: "Isolamento acústico absoluto. O DSP garante que o som não vase, blindando seu alvará contra a lei do silêncio.",
      color: "bg-teal-500",
      ringSize: "w-[100%] h-[100%]"
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
    }, 3500)
    
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
    <div ref={containerRef} className="w-full flex flex-col justify-center relative p-2 md:p-6 h-full">
      
      {/* Top-down concentric club layout */}
      <div className="relative aspect-square w-full max-w-[320px] mx-auto mb-6 flex items-center justify-center">
         <div className="absolute inset-0 rounded-full border border-white/5 bg-[#030303] shadow-2xl flex items-center justify-center overflow-hidden">
            
            {/* Render concentric zones from largest (street) to smallest (stage) so they stack correctly */}
            {[...zones].reverse().map((zone) => {
               const isActive = activeZone === zone.id
               const opacityClass = isActive ? "opacity-100" : "opacity-30 hover:opacity-70"
               const borderClass = isActive ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)] z-10" : "border-white/10"
               
               return (
                 <motion.div
                   key={zone.id}
                   onMouseEnter={() => handleMouseEnter(zone.id)}
                   onMouseLeave={handleMouseLeave}
                   className={`absolute rounded-full border-2 ${borderClass} flex items-start justify-center cursor-pointer transition-all duration-500 ${zone.ringSize}`}
                   animate={{ 
                      scale: isActive ? 1.02 : 1,
                   }}
                 >
                    {/* Colored background for the zone */}
                    <div className={`absolute inset-0 rounded-full ${zone.color} transition-opacity duration-500 ${isActive ? 'opacity-20' : 'opacity-0'}`} />
                    
                    {/* Ring Label (Only show if active or it's the center) */}
                    <div className={`mt-2 md:mt-4 transition-opacity duration-300 flex flex-col items-center ${opacityClass}`}>
                       <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                         {zone.coverage}dB
                       </span>
                    </div>
                 </motion.div>
               )
            })}
            
            {/* Center Stage Icon */}
            <div className="absolute flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] z-20 pointer-events-none">
               <Music className="w-4 h-4 text-white" />
            </div>

            {/* Sweep radar effect */}
            <motion.div 
               className="absolute top-1/2 left-1/2 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left z-0 pointer-events-none"
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
         </div>
      </div>

      {/* Info Card */}
      <motion.div 
        className="mt-auto p-4 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-start gap-4 max-w-sm mx-auto w-full shadow-2xl"
        key={activeData.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${activeData.color}`}>
          <activeData.icon className="w-6 h-6 text-white drop-shadow-md" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h4 className="text-white font-bold text-sm">{activeData.label}</h4>
             <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/80">{activeData.coverage}dB</span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">{activeData.desc}</p>
        </div>
      </motion.div>
    </div>
  )
})

export default ClubHeatmap
