import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollReset() {
  const { pathname, hash } = useLocation()
  
  useLayoutEffect(() => {
    if (!hash) {
      // 1. Desliga o navegador de tentar restaurar a rolagem fantasma
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      // 2. Tenta zerar no momento do paint
      window.scrollTo(0, 0)
      document.documentElement.scrollTo(0, 0)
      document.body.scrollTo(0, 0)
      
      // 3. Garante com requestAnimationFrame e timeout compensatório para o Suspense
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })

      const timeout = setTimeout(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTo(0, 0)
      }, 50)

      return () => clearTimeout(timeout)
    } else {
      // Se tiver hash, procura o elemento e scrolla até ele
      const targetId = hash.replace('#', '')
      const tryScroll = () => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        return false
      }
      
      // Tenta imediatamente
      if (!tryScroll()) {
        // Se não achou (ex: a página Home ainda está em Suspense carregando via rede)
        // Tentamos várias vezes por até 1.5s
        let attempts = 0
        const interval = setInterval(() => {
          attempts++
          if (tryScroll() || attempts > 15) {
            clearInterval(interval)
          }
        }, 100)
        return () => clearInterval(interval)
      }
    }
  }, [pathname, hash])
  
  return null
}
