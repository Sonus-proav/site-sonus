import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { MessageCircle, Building2, Image as ImageIcon, Globe } from "lucide-react"

export function LinksPage() {
  const WHATSAPP_NUMBER = "5546920013151";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram e gostaria de falar com um Especialista.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Optimization: noise texture rendered without mix-blend-mode overlay
  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
  };

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://api.whatsapp.com" />
      </Helmet>
      
      <SEO 
        title="Links Oficiais | Sonus" 
        description="Acesse nossas soluções audiovisuais, portfólio e atendimento direto." 
        noindex
      />
      
      <main className="min-h-[100dvh] bg-[#0B0F19] flex flex-col items-center py-12 px-5 relative overflow-hidden font-sans">
        
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.15)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center">
          
          {/* Header / Logo */}
          <div 
            className="mb-12 flex flex-col items-center animate-slide-up-fade"
            style={{ animationDelay: '0s' }}
          >
            <img 
              src="/logo.png" 
              alt="Sonus Logo" 
              width={160} 
              height={40} 
              fetchPriority="high"
              className="h-6 md:h-7 mb-6 object-contain invert brightness-0" 
              style={{ filter: "brightness(0) invert(1)" }} 
            />
            <h1 className="text-white text-xl font-bold tracking-tight">Soluções Audiovisuais</h1>
            <p className="text-zinc-300 text-sm mt-1">Projetos e Tecnologia de Alta Performance</p>
          </div>

          {/* Links Container */}
          <div className="w-full flex flex-col gap-4">
            
            {/* Primary Button */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden animate-slide-up-fade"
              style={{ animationDelay: '0.1s' }}
              data-tracking="link-whatsapp"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({ event: 'falar_engenheiro_whatsapp', source: 'links_page' });
              }}
            >
              {/* Opacity only noise - vastly more performant than mix-blend-overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={noiseStyle} />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-white font-semibold text-base">Falar com um Especialista</h2>
                <p className="text-zinc-300 text-xs mt-0.5">Atendimento via WhatsApp</p>
              </div>
            </a>

            {/* Secondary Button 1 */}
            <div className="w-full animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/auditorios-e-teatros"
                className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
                data-tracking="link-corporative"
                onClick={() => {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: 'click_links_corporativo', source: 'links_page' });
                }}
              >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={noiseStyle} />
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <Building2 className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-white font-semibold text-base">O Fim do Improviso</h2>
                  <p className="text-zinc-300 text-xs mt-0.5">Soluções Corporativas</p>
                </div>
              </Link>
            </div>

            {/* Secondary Button 2 */}
            <div className="w-full animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
              <Link 
                to="/projetos"
                className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
                data-tracking="link-portfolio"
                onClick={() => {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: 'click_links_portfolio', source: 'links_page' });
                }}
              >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={noiseStyle} />
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <ImageIcon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-white font-semibold text-base">Ver Portfólio</h2>
                  <p className="text-zinc-300 text-xs mt-0.5">Projetos Cresol, Unisep...</p>
                </div>
              </Link>
            </div>

            {/* Ghost Button */}
            <div className="w-full mt-2 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/"
                className="group relative w-full flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden"
                data-tracking="link-home"
                onClick={() => {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({ event: 'click_links_home', source: 'links_page' });
                }}
              >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={noiseStyle} />
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-white font-semibold text-base">Site Institucional</h2>
                  <p className="text-zinc-300 text-xs mt-0.5">Visite a nossa página oficial</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer Authority */}
          <div 
            className="mt-16 text-center animate-slide-up-fade"
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase mb-1">
              Sonus Pro Audio e Video
            </p>
            <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
              Inteligência Audiovisual
            </p>
            <p className="text-[10px] text-zinc-700 mt-3 font-medium">
              Francisco Beltrão - PR • Atendimento Premium
            </p>
          </div>

        </div>
      </main>
    </>
  )
}
