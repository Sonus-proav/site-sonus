import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { WhatsAppButton } from "./WhatsAppButton"
import { useEffect } from "react"
import { SmoothScroll } from "../ui/SmoothScroll"

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
