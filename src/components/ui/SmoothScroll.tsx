import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches))

    if (isMobile || document.documentElement.classList.contains('reduced-perf')) {
      return; // Use 100% native 120Hz hardware momentum scrolling on mobile devices
    }

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

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      lenis.destroy()
      cancelAnimationFrame(rafId)
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
