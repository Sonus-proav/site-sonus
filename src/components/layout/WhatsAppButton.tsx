import { MessageCircle } from "lucide-react"

export function WhatsAppButton({ 
  phone = "554635237192", 
  message = "Olá! Gostaria de falar sobre um projeto." 
}: { 
  phone?: string, 
  message?: string 
} = {}) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
      aria-label="Contate direto por WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className="font-semibold hidden sm:inline-block whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  )
}
