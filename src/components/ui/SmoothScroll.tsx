import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

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
    if (lenisRef.current && !hash) {
      window.scrollTo(0, 0)
      lenisRef.current.scrollTo(0, { immediate: true })
      
      // Delay extra para lidar com páginas carregadas sob demanda (React.lazy / Suspense)
      const timeout = setTimeout(() => {
        window.scrollTo(0, 0)
        lenisRef.current?.scrollTo(0, { immediate: true })
      }, 100)
      
      return () => clearTimeout(timeout)
    }
  }, [pathname, hash])

  return <>{children}</>
}
