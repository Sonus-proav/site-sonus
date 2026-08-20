import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Magnetic({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return
    const { clientX, clientY } = e
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    
    rafRef.current = requestAnimationFrame(() => {
      const { height, width, left, top } = rectRef.current!
      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)
      x.set(middleX * 0.15)
      y.set(middleY * 0.15)
    })
  }
  
  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect()
    }
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ position: "relative", display: "inline-block", x: springX, y: springY }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
