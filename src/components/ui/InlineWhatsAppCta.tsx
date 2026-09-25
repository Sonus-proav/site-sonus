import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"
import { logLead, getUserGeo } from "@/lib/analytics"

interface InlineWhatsAppCtaProps {
  origin: string;
  pageName: string;
  message?: string;
  className?: string;
}

export function InlineWhatsAppCta({ 
  origin, 
  pageName, 
  message = "Olá! Gostaria de falar com um especialista sobre um projeto.",
  className = "mt-12"
}: InlineWhatsAppCtaProps) {
  
  const handleWhatsApp = () => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    trackWhatsAppClick(origin, pageName);
    
    getUserGeo().then(geo => {
      logLead({
        type: 'whatsapp',
        source: window.location.pathname,
        city: geo.city || 'Desconhecida',
        region: geo.region || 'Desconhecida',
        country: geo.country || 'BR',
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        timestamp: Date.now(),
        whatsappOrigin: origin
      });
    });
    
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className={`flex justify-center w-full relative z-10 ${className}`}>
      <Button 
        onClick={handleWhatsApp} 
        className="h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-base sm:text-lg shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3 group"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        Falar com Especialista pelo WhatsApp
      </Button>
    </div>
  );
}
