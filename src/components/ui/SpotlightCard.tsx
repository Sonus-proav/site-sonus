import { useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"

export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const opacity = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/5 bg-[#0A0F1C]/80 p-8 shadow-2xl transition-all duration-300 hover:border-white/10 group",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0, 200, 255, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
