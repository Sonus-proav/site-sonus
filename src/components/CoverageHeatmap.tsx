import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export function CoverageHeatmap() {
  const [activeZone, setActiveZone] = useState<number | null>(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const autoPlayRef = useRef(true)
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Detecta se 20% do componente está visível na tela
  const isInView = useInView(containerRef, { amount: 0.2 })
  
  const zones = [
    { id: 0, label: "Altar", x: "33%", y: "6%", w: "34%", h: "16%", coverage: 98, desc: "Cobertura direcional de alta precisão" },
    { id: 1, label: "Nave Central", x: "20%", y: "26%", w: "60%", h: "30%", coverage: 95, desc: "Dispersão uniforme em toda a extensão" },
    { id: 2, label: "Lateral Esq.", x: "4%", y: "24%", w: "13%", h: "40%", coverage: 92, desc: "Caixas anguladas para cobertura lateral" },
    { id: 3, label: "Lateral Dir.", x: "83%", y: "24%", w: "13%", h: "40%", coverage: 92, desc: "Caixas anguladas para cobertura lateral" },
    { id: 4, label: "Fundo", x: "12%", y: "60%", w: "76%", h: "16%", coverage: 88, desc: "Delay line para alcance dos últimos bancos" },
  ]

  // Auto-cycle through zones
  useEffect(() => {
    autoPlayRef.current = autoPlay
    // Se não estiver em modo autoplay ou não estiver visível na tela, interrompe o looping!
    if (!autoPlay || !isInView) return
    
    let idx = 0
    const interval = setInterval(() => {
      if (!autoPlayRef.current) return
      setActiveZone(zones[idx].id)
      idx = (idx + 1) % zones.length
    }, 2500)
    
    return () => clearInterval(interval)
  }, [autoPlay, isInView]) // A dependência isInView refaz ou desfaz o setInterval automaticamente!

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
        <div className="absolute inset-0 rounded-2xl border border-amber-500/20 bg-zinc-950/90 overflow-hidden shadow-[0_0_60px_-15px_rgba(245,158,11,0.12)]">
          
          {/* Outline tracejado removido */}

          {/* Coverage zones */}
          {zones.map((zone) => {
            const isActive = activeZone === zone.id
            return (
              <motion.div
                key={zone.id}
                className="absolute cursor-pointer rounded-lg border overflow-hidden z-10"
                style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
                animate={{
                  backgroundColor: isActive 
                    ? "rgba(245,158,11,0.2)" 
                    : "rgba(245,158,11,0.04)",
                  borderColor: isActive 
                    ? "rgba(245,158,11,0.5)" 
                    : "rgba(245,158,11,0.1)",
                }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => handleMouseEnter(zone.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.3),transparent_70%)] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <span className={`font-black transition-all duration-300 ${isActive ? 'text-amber-100 text-base drop-shadow-[0_1px_6px_rgba(245,158,11,0.6)]' : 'text-amber-500/30 text-xs'}`}>
                    {zone.coverage}%
                  </span>
                  <span className={`uppercase tracking-wider font-semibold transition-all duration-300 ${isActive ? 'text-amber-200/80 text-[10px]' : 'text-amber-500/20 text-[8px]'}`}>
                    {zone.label}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Legend bottom */}
          <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[8px] text-zinc-600 z-20 pointer-events-none">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-sm bg-amber-500/30 border border-amber-500/30" />
              Cobertura Sonora
            </span>
            <span className="text-amber-500/40">Toque nas zonas</span>
          </div>
        </div>
      </div>

      {/* Active zone info panel */}
      <motion.div 
        className="rounded-xl border border-amber-500/15 bg-zinc-950/80 px-5 py-3 flex items-center gap-4 min-h-[56px]"
        animate={{ borderColor: activeData ? "rgba(245,158,11,0.3)" : "rgba(245,158,11,0.1)" }}
      >
        {activeData ? (
          <>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
              <span className="text-amber-400 font-black text-sm">{activeData.coverage}%</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{activeData.label}</p>
              <p className="text-zinc-500 text-xs truncate">{activeData.desc}</p>
            </div>
          </>
        ) : (
          <p className="text-zinc-600 text-xs italic w-full text-center">Selecione uma zona no mapa acima</p>
        )}
      </motion.div>
    </div>
  )
}
export default CoverageHeatmap
