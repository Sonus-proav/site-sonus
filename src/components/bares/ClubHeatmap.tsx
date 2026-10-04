import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export function ClubHeatmap() {
  const [activeZone, setActiveZone] = useState<number | null>(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const autoPlayRef = useRef(true)
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const isInView = useInView(containerRef, { amount: 0.2 })
  
  const zones = [
    { id: 0, label: "Pista Principal", x: "25%", y: "15%", w: "50%", h: "40%", coverage: 105, desc: "Alta pressão sonora. Graves no peito. 105dB cravados." },
    { id: 1, label: "Camarotes", x: "5%", y: "15%", w: "18%", h: "40%", coverage: 95, desc: "Som imersivo mas permite conversa." },
    { id: 2, label: "Lounge / Bar", x: "77%", y: "15%", w: "18%", h: "40%", coverage: 90, desc: "Áudio claro para fundo musical e interação no bar." },
    { id: 3, label: "Corredores", x: "20%", y: "60%", w: "60%", h: "15%", coverage: 85, desc: "Transição suave de volume. Sem picos." },
    { id: 4, label: "Rua (Externa)", x: "25%", y: "80%", w: "50%", h: "12%", coverage: 55, desc: "Isolamento total. Zero vazamento para vizinhos. (55dB)" },
  ]

  useEffect(() => {
    autoPlayRef.current = autoPlay
    if (!autoPlay || !isInView) return
    
    let idx = 0
    const interval = setInterval(() => {
      if (!autoPlayRef.current) return
      setActiveZone(zones[idx].id)
      idx = (idx + 1) % zones.length
    }, 3000)
    
    return () => clearInterval(interval)
  }, [autoPlay, isInView])

  const handleMouseEnter = (id: number) => {
    setAutoPlay(false)
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    setActiveZone(id)
  }
  const handleMouseLeave = () => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current)
    autoPlayTimerRef.current = setTimeout(() => setAutoPlay(true), 2000)
  }

  const activeData = zones.find(z => z.id === activeZone)

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Main heatmap */}
      <div className="relative aspect-[5/4] w-full">
        <div className="absolute inset-0 rounded-2xl border border-blue-500/20 bg-[#050505] overflow-hidden shadow-[0_0_60px_-15px_rgba(59,130,246,0.15)]">
          
          {/* Coverage zones */}
          {zones.map((zone) => {
            const isActive = activeZone === zone.id
            const isExternal = zone.id === 4 // Red/Green depending on perspective, let's use Green/Cyan to denote safety
            const colorTheme = isExternal ? "20,184,166" : "59,130,246" // Teal for street, Blue for club
            
            return (
              <motion.div
                key={zone.id}
                className="absolute cursor-pointer rounded-lg border overflow-hidden z-10"
                style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
                animate={{
                  backgroundColor: isActive 
                    ? `rgba(${colorTheme},0.2)` 
                    : `rgba(${colorTheme},0.04)`,
                  borderColor: isActive 
                    ? `rgba(${colorTheme},0.5)` 
                    : `rgba(${colorTheme},0.1)`,
                }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => handleMouseEnter(zone.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(${colorTheme},0.3),transparent_70%)] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <span className={`font-black transition-all duration-300 ${isActive ? 'text-white text-base drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]' : `text-[rgba(${colorTheme},0.4)] text-xs`}`}>
                    {zone.coverage}dB
                  </span>
                  <span className={`uppercase tracking-wider font-semibold transition-all text-center px-1 duration-300 ${isActive ? `text-[rgba(${colorTheme},0.8)] text-[10px]` : `text-[rgba(${colorTheme},0.3)] text-[8px]`}`}>
                    {zone.label}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Legend bottom */}
          <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[8px] text-zinc-600 z-20 pointer-events-none">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-sm bg-blue-500/30 border border-blue-500/30" />
              Pressão Sonora (dB)
            </span>
            <span className="text-blue-500/40">Zonificação inteligente</span>
          </div>
        </div>
      </div>

      {/* Active zone info panel */}
      <motion.div 
        className="rounded-xl border border-blue-500/20 bg-zinc-950/80 px-5 py-3 flex items-center gap-4 min-h-[56px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]"
        animate={{ borderColor: activeData ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.1)" }}
      >
        {activeData ? (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
              <span className="text-blue-400 font-black text-sm">{activeData.coverage}dB</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{activeData.label}</p>
              <p className="text-zinc-400 text-xs mt-0.5">{activeData.desc}</p>
            </div>
          </>
        ) : (
          <p className="text-zinc-600 text-xs italic w-full text-center">Selecione uma zona no mapa acima</p>
        )}
      </motion.div>
    </div>
  )
}
export default ClubHeatmap
