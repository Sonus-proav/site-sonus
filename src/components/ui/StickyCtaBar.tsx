import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Clock, ArrowRight } from "lucide-react"

interface StickyCtaBarProps {
  buttonText?: string
  messageText?: string
  phoneNumber?: string
}

// SVG Filter for Liquid Glass distortion
function LiquidGlassFilter() {
  return (
    <svg style={{ display: "none", position: "absolute" }}>
      <filter
        id="sticky-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export function StickyCtaBar({
  buttonText = "Falar com Especialista",
  messageText = "Olá, gostaria de tirar dúvidas e solicitar um orçamento.",
  phoneNumber = "5546920013151" // Same as WhatsAppButton
}: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Verifica horário comercial (08:00 as 18:00 BRT)
  useEffect(() => {
    const checkBusinessHours = () => {
      try {
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: 'numeric',
          hour12: false
        })
        const currentHour = parseInt(formatter.format(new Date()), 10)
        
        // 8h as 17:59 (menor que 18)
        setIsOnline(currentHour >= 8 && currentHour < 18)
      } catch (e) {
        // Fallback in case Intl.DateTimeFormat fails
        setIsOnline(true)
      }
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000) // Re-check every minute
    return () => clearInterval(interval)
  }, [])

  // Show after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      // Don't show if they are near the bottom of the page (to not overlap footer)
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
      
      if (window.scrollY > 300 && !isNearBottom) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsApp = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ 
      event: 'falar_especialista_sticky', 
      button_status: isOnline ? 'online' : 'offline'
    });

    const encodedMessage = encodeURIComponent(messageText)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <>
      <LiquidGlassFilter />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto px-4 pb-6 md:pb-0 pointer-events-none"
          >
            {/* Liquid Glass Container */}
          <div 
            className="relative mx-auto max-w-sm md:max-w-md p-3 md:p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-3 md:gap-4 pointer-events-auto overflow-hidden cursor-default transition-all duration-700"
            style={{
              boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Glass Layer 1: Distortion */}
            <div
              className="absolute inset-0 z-0 overflow-hidden rounded-2xl md:rounded-full"
              style={{
                backdropFilter: "blur(16px)",
                filter: "url(#sticky-glass-distortion)",
                isolation: "isolate",
              }}
            />
            {/* Glass Layer 2: White tint */}
            <div
              className="absolute inset-0 z-[1] rounded-2xl md:rounded-full"
              style={{ background: "rgba(255, 255, 255, 0.12)" }}
            />
            {/* Glass Layer 3: Inner highlight/shadow */}
            <div
              className="absolute inset-0 z-[2] rounded-2xl md:rounded-full overflow-hidden"
              style={{
                boxShadow:
                  "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.15)",
              }}
            />
            {/* Subtle border glow */}
            <div className="absolute inset-0 z-[3] rounded-2xl md:rounded-full border border-white/20" />

            {/* Content (above glass layers) */}
            <div className="relative z-10 flex items-center gap-2 pl-2">
              <span className="relative flex h-3 w-3">
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></span>
              </span>
              <div className="flex flex-col">
                <span className="text-white text-xs font-semibold">{isOnline ? 'Especialista Online' : 'Especialista Offline'}</span>
                <span className="text-white/60 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {isOnline ? 'Resposta rápida' : 'Deixe uma mensagem'}
                </span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className={`relative z-10 w-full md:w-auto group overflow-hidden rounded-xl md:rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
                isOnline 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-emerald-500/25' 
                  : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-red-500/25'
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <MessageCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{isOnline ? buttonText : "Deixar Mensagem"}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
