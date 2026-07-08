import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { WhatsAppButton } from "./WhatsAppButton"
import { useEffect, useLayoutEffect } from "react"
import { SmoothScroll } from "../ui/SmoothScroll"

function ScrollReset() {
  const { pathname, hash } = useLocation()
  
  useLayoutEffect(() => {
    if (!hash) {
      // Tenta zerar no momento do paint
      window.scrollTo(0, 0)
      document.documentElement.scrollTo(0, 0)
      document.body.scrollTo(0, 0)
      
      // E garante com requestAnimationFrame (depois que o DOM já está na tela)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    }
  }, [pathname, hash])
  
  return null
}

export function AppLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Pequeno atraso para garantir que a página nova (ex: Home) renderizou o DOM antes de rolar
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }, [pathname, hash])

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <ScrollReset />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  )
}
