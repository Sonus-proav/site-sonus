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
    <span ref={ref} className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter flex items-baseline justify-center pr-2">
      {prefix && <span className="text-4xl lg:text-5xl text-cyan-400 mr-2 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">{prefix}</span>}
      <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{count}</span>
      {suffix && <span className="text-4xl lg:text-5xl text-blue-400 ml-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">{suffix}</span>}
    </span>
  )
}

function OrbitingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full rounded-full border border-dashed border-cyan-500/30"
      />
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border-t-2 border-r-2 border-blue-500/40"
      />
    </div>
  )
}

export function SocialProofBar({ stats = defaultStats }: SocialProofBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section ref={ref} className="w-full relative z-20 border-y border-white/5 bg-[#020202] py-24 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      
      {/* Deep Background Grid & Scanner */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />
      
      <motion.div 
        animate={{ left: ['-10%', '110%'] }} 
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 bottom-0 w-[1px] bg-cyan-500/50 shadow-[0_0_30px_5px_#06b6d4] z-0 pointer-events-none" 
      />

      {/* Top Status Dropdown */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 bg-black/80 border-x border-b border-white/10 rounded-b-2xl backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
        <span className="text-[10px] font-mono text-zinc-400 tracking-[0.3em] uppercase">Global Telemetry Hub</span>
      </div>

      <div className="container mx-auto px-4 max-w-[1400px] relative z-10 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center w-full md:w-1/3"
            >
              
              {/* Glowing Icon Orb */}
              <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                <OrbitingRings />
                <div className="absolute inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-full backdrop-blur-md border border-white/10" />
                <div className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  {i === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                  {i === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {i === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                </div>
              </div>

              {/* Numbers */}
              <div className="relative mb-6">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>

              {/* Label */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-sm bg-cyan-500/50" />
                  <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
                <p className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-sm md:text-base">
                  {stat.label}
                </p>
              </div>

              {/* Vertical Glass Divider */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-48 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
