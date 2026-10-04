import { useEffect, useState, type RefObject } from "react"

/**
 * Retorna true apenas enquanto o elemento está visível na tela.
 * Usado para pausar o render loop do WebGL quando o 3D está fora do viewport
 * (economiza GPU/bateria e mantém o scroll liso em qualquer dispositivo).
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
