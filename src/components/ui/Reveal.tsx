import { motion } from "framer-motion"

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <div className={className} style={{ position: "relative", overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100, rotateX: -20 },
          visible: { opacity: 1, y: 0, rotateX: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
