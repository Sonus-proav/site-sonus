import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { WhatsAppButton } from "./WhatsAppButton"
import { useEffect } from "react"
import { SmoothScroll } from "../ui/SmoothScroll"
import { Helmet } from "react-helmet-async"

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

  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Sonus Pro Audio e Video",
        "url": "https://sonusproaudio.com.br",
        "logo": "https://sonusproaudio.com.br/logo.png",
        "sameAs": [
          "https://instagram.com/sonus.av",
          "https://br.linkedin.com/company/sonus-pro-av"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Sonus Pro Audio e Video",
        "image": "https://sonusproaudio.com.br/sobre-sonus.webp",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Francisco Beltrão",
          "addressRegion": "PR",
          "addressCountry": "BR"
        },
        "areaServed": ["Paraná", "Santa Catarina", "Rio Grande do Sul", "Brasil"],
        "knowsAbout": ["Audiovisual", "Engenharia Acústica", "Automação Corporativa", "Videoconferência"],
        "telephone": "+5546920013151",
        "priceRange": "$$$$"
      }
    ]
  };

  return (
    <SmoothScroll>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(globalSchema)}
        </script>
      </Helmet>
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
