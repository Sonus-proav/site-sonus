import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Força o scroll para o topo ao trocar de página, a menos que haja uma âncora (hash)
  useEffect(() => {
    if (lenisRef.current) {
      if (!hash) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
    }
  }, [pathname, hash])

  return <>{children}</>
}
