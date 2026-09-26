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
    <span ref={ref} className="text-6xl lg:text-7xl xl:text-8xl font-black text-white tabular-nums tracking-tighter drop-shadow-2xl flex items-baseline">
      {prefix && <span className="text-4xl lg:text-5xl text-cyan-500 mr-1">{prefix}</span>}
      {count}
      {suffix && <span className="text-4xl lg:text-5xl text-blue-500 ml-1">{suffix}</span>}
    </span>
  )
}

function CircuitTraces() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <motion.path 
          d="M 0,50 L 200,50 L 250,150 L 500,150 L 550,50 L 1000,50 L 1050,150 L 2000,150" 
          fill="none" 
          stroke="url(#cyan-grad)" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 0,200 L 150,200 L 200,100 L 600,100 L 650,200 L 1200,200 L 1250,100 L 2000,100" 
          fill="none" 
          stroke="url(#blue-grad)" 
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function SocialProofBar({ stats = defaultStats }: SocialProofBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section ref={ref} className="py-8 md:py-0 w-full relative z-20 -mt-16 mb-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Painel Unificado Central */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[3rem] p-[1px] overflow-hidden group"
        >
          {/* Borda Animada */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.div 
            animate={{ left: ['-100%', '200%'] }} 
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent skew-x-[-45deg] opacity-20"
          />

          <div className="relative w-full h-full bg-[#050505]/90 backdrop-blur-3xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center justify-evenly py-16 md:py-20 px-8 gap-12 md:gap-4 shadow-2xl">
            
            {/* Background Técnico */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <CircuitTraces />
            
            {/* Sombras radiais atrás dos números */}
            <div className="absolute left-1/6 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
            <div className="absolute right-1/6 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />

            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3"
              >
                {/* Ícone Minimalista Topo */}
                <div className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  {i === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                  {i === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {i === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                </div>

                {/* Número Grande Animado */}
                <div className="mb-4">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>

                {/* Label Estilo Painel de Aeronave */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <p className="text-zinc-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
