import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface SocialProofBarProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { prefix: "+", value: 200, label: "Projetos Entregues" },
  { value: 28, label: "Anos de Mercado" },
  { value: 99.7, suffix: "%", label: "Índice de Satisfação" },
]

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2500
      let startTime: number | null = null

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const easeProgress = 1 - Math.pow(1 - progress, 4) 
        
        if (Number.isInteger(value)) {
           setCount(Math.floor(easeProgress * (end - start) + start))
        } else {
           setCount(Number((easeProgress * (end - start) + start).toFixed(1)))
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-6xl lg:text-7xl xl:text-[6rem] font-black tracking-tighter flex items-baseline">
      {prefix && <span className="text-4xl lg:text-5xl text-cyan-400 mr-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">{prefix}</span>}
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-2xl">{count}</span>
      {suffix && <span className="text-4xl lg:text-5xl text-blue-400 ml-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">{suffix}</span>}
    </span>
  )
}

function OrbitingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 rounded-full border border-dashed border-cyan-500/40"
      />
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-24 h-24 rounded-full border-t-2 border-r-2 border-blue-500/50"
      />
    </div>
  )
}

function CornerBrackets() {
  return (
    <>
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500/50" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/50" />
    </>
  )
}

export function SocialProofBar({ stats = defaultStats }: SocialProofBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section ref={ref} className="py-8 md:py-0 w-full relative z-20 -mt-16 mb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2rem] p-[1px] overflow-hidden group"
        >
          {/* Outer Glow & Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative w-full h-full bg-[#030303]/95 backdrop-blur-3xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            <CornerBrackets />

            {/* Status Header */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">Sonus Telemetry Sys_Online</span>
            </div>

            {/* Deep Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            
            {stats.map((stat, i) => (
              <div key={i} className="relative z-10 flex w-full md:w-1/3 justify-center">
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                  className="flex flex-col items-center text-center relative py-12 w-full"
                >
                  {/* Glowing Icon Orb */}
                  <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                    <OrbitingRings />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)]" />
                    <div className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      {i === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                      {i === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                      {i === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                    </div>
                  </div>

                  {/* Physical Casing for Numbers */}
                  <div className="relative mb-6">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>

                  {/* High-Tech Label */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-sm bg-cyan-500/50" />
                      <div className="w-12 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
                    </div>
                    <p className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-xs">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>

                {/* Vertical Divider (Except Last) */}
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
              </div>
            ))}
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
