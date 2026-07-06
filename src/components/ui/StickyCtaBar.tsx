import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Clock, ArrowRight } from "lucide-react"

interface StickyCtaBarProps {
  buttonText?: string
  messageText?: string
  phoneNumber?: string
}

export function StickyCtaBar({
  buttonText = "Falar com Engenheiro",
  messageText = "Olá, gostaria de tirar dúvidas e solicitar um orçamento.",
  phoneNumber = "5546920013151" // Same as WhatsAppButton
}: StickyCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false)

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-white text-xs font-semibold">Engenharia Online</span>
                <span className="text-zinc-400 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Resposta rápida
                </span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full md:w-auto relative group overflow-hidden rounded-xl md:rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <MessageCircle className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{buttonText}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
