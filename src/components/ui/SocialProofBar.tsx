import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Activity, ShieldCheck, MapPin } from "lucide-react"

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
        const easeProgress = 1 - Math.pow(1 - progress, 4) // easeOutQuart
        
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
    <span ref={ref} className="text-5xl md:text-6xl font-black text-white tabular-nums tracking-tighter">
      {prefix}{count}{suffix}
    </span>
  )
}

// 1. Rede Neural / Pontos do Mapa
function NetworkGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 flex items-center justify-center">
      <div className="grid grid-cols-8 gap-2 w-[120%] h-[120%] -rotate-12">
        {[...Array(64)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            animate={{
              opacity: [0.1, Math.random() * 0.8 + 0.2, 0.1],
              scale: [1, Math.random() * 1.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// 2. Anel de Precisão
function PrecisionDial() {
  return (
    <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 opacity-20 pointer-events-none">
      <motion.div 
        className="w-full h-full rounded-full border-[1px] border-dashed border-blue-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute inset-4 rounded-full border border-blue-400/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  )
}

// 3. Anel de Progresso
function SatisfactionRing({ inView }: { inView: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-white/10" strokeWidth="2" />
        <motion.circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#emerald-grad)" 
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 0.997 : 0 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function SocialProofBar({ stats = defaultStats }: SocialProofBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const isDefault = stats === defaultStats

  return (
    <section ref={ref} className="py-8 md:py-0 w-full relative z-20 -mt-16 mb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const isFirst = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[220px] rounded-3xl overflow-hidden bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col justify-end p-8"
              >
                {/* Efeitos Visuais Avançados (só aparecem nas métricas default da home) */}
                {isDefault && isFirst && <NetworkGrid />}
                {isDefault && isSecond && <PrecisionDial />}
                {isDefault && isThird && <SatisfactionRing inView={isInView} />}
                
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top Icon Area */}
                <div className="absolute top-8 left-8 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md">
                  {isFirst && <MapPin className="w-4 h-4 text-cyan-400" />}
                  {isSecond && <Activity className="w-4 h-4 text-blue-400" />}
                  {isThird && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  {!isFirst && !isSecond && !isThird && <div className="w-2 h-2 rounded-full bg-white/50" />}
                </div>

                {/* Data Content */}
                <div className="relative z-10 mt-auto">
                  <div className="mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-white/50 to-transparent" />
                    <p className="text-zinc-400 font-bold tracking-widest uppercase text-xs md:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
