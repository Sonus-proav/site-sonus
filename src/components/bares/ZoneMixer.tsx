import { memo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Music, Users, Wind, SlidersHorizontal } from "lucide-react"

/**
 * Interface de Zoneamento Independente (Fase 02).
 * Mostra 3 zonas do ambiente, cada uma com seu próprio nível (dB) e limite do DSP.
 */
const ZONES = [
  {
    id: "pista",
    label: "Pista",
    icon: Music,
    level: 105,
    limit: 105,
    bar: "from-red-500 via-orange-500 to-yellow-400",
    text: "text-red-400",
    glow: "shadow-[0_0_14px_rgba(239,68,68,0.55)]",
  },
  {
    id: "mesas",
    label: "Mesas / Camarotes",
    icon: Users,
    level: 82,
    limit: 85,
    bar: "from-yellow-500 to-green-400",
    text: "text-yellow-400",
    glow: "shadow-[0_0_14px_rgba(234,179,8,0.5)]",
  },
  {
    id: "varanda",
    label: "Varanda",
    icon: Wind,
    level: 68,
    limit: 70,
    bar: "from-green-500 to-sky-400",
    text: "text-sky-400",
    glow: "shadow-[0_0_14px_rgba(56,189,248,0.5)]",
  },
] as const

const MIN_DB = 40
const MAX_DB = 110
const pct = (db: number) => ((db - MIN_DB) / (MAX_DB - MIN_DB)) * 100

export const ZoneMixer = memo(function ZoneMixer() {
  const reduce = useReducedMotion()

  return (
    <div className="w-full h-full min-h-[260px] flex items-center justify-center p-1 md:p-2">
      <div className="w-full max-w-md bg-gradient-to-b from-zinc-900/80 to-black border border-white/10 rounded-2xl p-4 md:p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden [contain:layout_paint]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12)_0,transparent_65%)] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase">Zonas DSP</span>
          </div>
          <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none" />
            INDEPENDENTE
          </span>
        </div>

        {/* Zones */}
        <div className="relative z-10 flex flex-col gap-3">
          {ZONES.map((zone, i) => (
            <div
              key={zone.id}
              className="rounded-xl bg-white/[0.03] border border-white/5 p-3 transition-colors duration-300 hover:bg-white/[0.06] hover:border-white/15"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <zone.icon className={`w-3.5 h-3.5 ${zone.text}`} />
                  <span className="text-xs font-semibold text-zinc-200">{zone.label}</span>
                </div>
                <span className={`text-xs font-mono font-bold ${zone.text}`}>{zone.level} dB</span>
              </div>

              {/* Track — só anima transform (GPU): scaleX no preenchimento, translateX no knob */}
              <div className="relative h-2 rounded-full bg-zinc-800/80">

                  <motion.div
                    className={`absolute inset-0 origin-left rounded-full bg-gradient-to-r ${zone.bar} ${zone.glow}`}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: pct(zone.level) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
                    style={reduce ? { scaleX: pct(zone.level) / 100 } : undefined}
                  />
                {/* DSP limit marker */}
                <div
                  className="absolute -top-1 -bottom-1 w-0.5 bg-white/70 rounded"
                  style={{ left: `${pct(zone.limit)}%` }}
                  aria-hidden="true"
                />
                {/* Fader knob (wrapper de largura total deslocado via translateX em %) */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-full pointer-events-none"
                  initial={reduce ? false : { x: "0%" }}
                  whileInView={{ x: `${pct(zone.level)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
                  style={reduce ? { x: `${pct(zone.level)}%` } : undefined}
                >
                  <div className="absolute left-0 top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100 border-2 border-zinc-900 shadow-lg" />
                </motion.div>
              </div>

              <div className="flex justify-between mt-2 text-[9px] font-mono text-zinc-500 tracking-wider">
                <span>{MIN_DB} dB</span>
                <span>LIMITE {zone.limit} dB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default ZoneMixer
