import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function Magnetic({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const rectRef = useRef<DOMRect | null>(null)

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect()
    }
  }

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = rectRef.current
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
    rectRef.current = null
  }

  const { x, y } = position
  return (
    <motion.div
      className={className}
      style={{ position: "relative", display: "inline-block" }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
