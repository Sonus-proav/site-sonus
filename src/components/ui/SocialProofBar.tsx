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
      const duration = 2000
      let startTime: number | null = null

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        
        if (Number.isInteger(value)) {
           setCount(Math.floor(easeProgress * (end - start) + start))
        } else {
           // For decimal values like 99.7
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
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-black text-white tabular-nums tracking-tighter">
      {prefix}{count}{suffix}
    </span>
  )
}

export function SocialProofBar({ stats = defaultStats }: SocialProofBarProps) {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-2 relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-zinc-400 font-medium tracking-wide uppercase text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
