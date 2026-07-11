import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Clock, ArrowRight } from "lucide-react"

interface StickyCtaBarProps {
  buttonText?: string
  messageText?: string
  phoneNumber?: string
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto px-4 pb-6 md:pb-0 pointer-events-none"
        >
          <div className="mx-auto max-w-sm md:max-w-md bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-3 md:p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-4 pointer-events-auto ring-1 ring-white/5">
            
            <div className="flex items-center gap-2 pl-2">
              <span className="relative flex h-3 w-3">
                {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <div className="flex flex-col">
                <span className="text-white text-xs font-semibold">{isOnline ? 'Especialista Online' : 'Especialista Offline'}</span>
                <span className="text-zinc-400 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {isOnline ? 'Resposta rápida' : 'Deixe uma mensagem'}
                </span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className={`w-full md:w-auto relative group overflow-hidden rounded-xl md:rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
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
  )
}
