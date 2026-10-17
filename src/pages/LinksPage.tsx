import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { MessageCircle, Building2, Globe, Video, Vote, Mic, Cpu, ChevronRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"
import { logLead, getUserGeo } from "@/lib/analytics"

export function LinksPage() {
  const WHATSAPP_NUMBER = "5546920013151";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Sonus e gostaria de falar com a engenharia sobre um projeto.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
  };

  const handleWhatsAppClick = () => {
    getUserGeo().then(geo => {
      logLead({
        type: 'whatsapp',
        source: '/links (Bio Instagram)',
        city: geo.city,
        region: geo.region,
        country: geo.country,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        timestamp: Date.now(),
        whatsappOrigin: 'links_instagram'
      });
    });

    trackWhatsAppClick('links_instagram', 'links_page');

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'falar_especialista_whatsapp',
      source: 'links_page'
    });
  };

  const trackNavClick = (eventName: string) => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      source: 'links_page'
    });
  };

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preload" as="image" href="/links-bg.webp" type="image/webp" />
      </Helmet>
      
      <SEO 
        title="Links Oficiais | Sonus Pro AV" 
        description="Engenharia de Áudio, Vídeo e Automação Corporativa. Acesse nossas soluções por ambiente, portfólio de obras e atendimento direto." 
        url="https://sonusproaudio.com.br/links"
        noindex
      />
      
      <main className="relative min-h-[100dvh] w-full bg-[#050505] text-zinc-100 flex flex-col items-center justify-between py-8 px-4 sm:px-6 overflow-x-hidden overflow-y-auto font-sans selection:bg-cyan-500/30 selection:text-white">
        
        {/* Fixed Background Layer */}
        <div 
          className="fixed inset-0 z-0 opacity-25 pointer-events-none" 
          style={{ backgroundImage: 'url(/links-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden="true" 
        />
        
        {/* Subtle Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.16)_0%,transparent_70%)] pointer-events-none z-0" aria-hidden="true" />
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center my-auto">
          
          {/* Header / Authority & Logo */}
          <div 
            className="mb-7 flex flex-col items-center text-center animate-slide-up-fade"
            style={{ animationDelay: '0s' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                +28 Anos • Atuação Nacional
              </span>
            </div>

            <img 
              src="/logo.png" 
              alt="Sonus Pro AV" 
              width={160} 
              height={40} 
              fetchPriority="high"
              className="h-6 md:h-7 mb-4 object-contain invert brightness-0" 
              style={{ filter: "brightness(0) invert(1)" }} 
            />
            <h1 className="text-white text-lg sm:text-xl font-extrabold tracking-tight leading-snug">
              Engenharia de Áudio, Vídeo e Automação
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xs leading-relaxed">
              Projetos integrados de alta precisão para empresas, órgãos públicos e templos.
            </p>
          </div>

          {/* Main Links Container */}
          <div className="w-full flex flex-col gap-3">
            
            {/* 1. Primary CTA: WhatsApp Engineering */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center p-4 bg-gradient-to-r from-emerald-950/70 via-zinc-900/90 to-zinc-900/90 hover:from-emerald-900/70 backdrop-blur-lg border border-emerald-500/40 hover:border-emerald-400/70 rounded-2xl transition-all duration-300 overflow-hidden shadow-[0_0_25px_rgba(16,185,129,0.15)] animate-slide-up-fade"
              style={{ animationDelay: '0.05s' }}
              data-tracking="link-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={noiseStyle} />
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="ml-3.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Engenharia Online
                  </span>
                </div>
                <h2 className="text-white font-bold text-sm sm:text-base truncate">
                  Solicitar Orçamento ou Consultoria
                </h2>
                <p className="text-zinc-300 text-xs mt-0.5 truncate">
                  Falar diretamente com especialista no WhatsApp
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400/80 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
            </a>

            {/* 2. Featured Portfolio Card with Real Photo */}
            <div className="w-full animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
              <Link 
                to="/projetos"
                className="group relative w-full flex items-center p-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-lg border border-white/10 hover:border-white/25 rounded-2xl transition-all duration-300 overflow-hidden"
                data-tracking="link-portfolio"
                onClick={() => trackNavClick('click_links_portfolio')}
              >
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={noiseStyle} />
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15 relative bg-zinc-900">
                  <img 
                    src="/cresol.webp" 
                    alt="Portfólio de Projetos Sonus" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                    Obras Entregues
                  </span>
                  <h2 className="text-white font-bold text-sm sm:text-base truncate">
                    Ver Portfólio de Projetos
                  </h2>
                  <p className="text-zinc-400 text-xs mt-0.5 truncate">
                    Cases Cresol, Câmaras, Auditórios e Templos
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            </div>

            {/* 3. B2B Verticals 2x2 Grid */}
            <div className="w-full pt-2 animate-slide-up-fade" style={{ animationDelay: '0.15s' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 px-1">
                Soluções por Ambiente
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/salas-reuniao"
                  onClick={() => trackNavClick('click_links_salas')}
                  className="group relative flex flex-col justify-between p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/40 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Video className="w-4 h-4 text-cyan-400" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-tight">Salas de Reunião</h3>
                    <p className="text-zinc-400 text-[11px] mt-0.5 leading-tight">Videoconferência e Diretoria</p>
                  </div>
                </Link>

                <Link
                  to="/auditorios-e-teatros"
                  onClick={() => trackNavClick('click_links_auditorios')}
                  className="group relative flex flex-col justify-between p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/40 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-tight">Auditórios e Teatros</h3>
                    <p className="text-zinc-400 text-[11px] mt-0.5 leading-tight">Som, Vídeo e Automação</p>
                  </div>
                </Link>

                <Link
                  to="/plenarios-e-camaras"
                  onClick={() => trackNavClick('click_links_plenarios')}
                  className="group relative flex flex-col justify-between p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Vote className="w-4 h-4 text-indigo-400" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-tight">Plenários e Câmaras</h3>
                    <p className="text-zinc-400 text-[11px] mt-0.5 leading-tight">Votação e Corte de Câmera</p>
                  </div>
                </Link>

                <Link
                  to="/igrejas-e-templos"
                  onClick={() => trackNavClick('click_links_igrejas')}
                  className="group relative flex flex-col justify-between p-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-500/40 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-amber-400" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-tight">Igrejas e Templos</h3>
                    <p className="text-zinc-400 text-[11px] mt-0.5 leading-tight">Acústica e Nitidez da Voz</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* 4. Q-SYS Platform Highlight */}
            <div className="w-full animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/qsys"
                className="group relative w-full flex items-center p-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-lg border border-white/10 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 overflow-hidden"
                onClick={() => trackNavClick('click_links_qsys')}
              >
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-xs sm:text-sm truncate">
                    Automação e Plataforma Q-SYS
                  </h2>
                  <p className="text-zinc-400 text-[11px] mt-0.5 truncate">
                    Controle unificado de áudio, vídeo e rede IP
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            </div>

            {/* 5. Official Website Button */}
            <div className="w-full animate-slide-up-fade" style={{ animationDelay: '0.25s' }}>
              <Link 
                to="/"
                className="group relative w-full flex items-center p-3.5 bg-white/[0.03] hover:bg-blue-950/30 backdrop-blur-lg border border-white/10 hover:border-blue-500/30 rounded-2xl transition-all duration-300 overflow-hidden"
                data-tracking="link-home"
                onClick={() => trackNavClick('click_links_home')}
              >
                <div className="w-10 h-10 bg-blue-600/15 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-xs sm:text-sm">
                    Acessar Site Institucional Completo
                  </h2>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    sonusproaudio.com.br
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            </div>

          </div>

          {/* Footer Authority & Certified Partners */}
          <div 
            className="mt-8 pt-5 border-t border-white/10 w-full text-center animate-slide-up-fade"
            style={{ animationDelay: '0.3s' }}
          >
            <p className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase mb-1.5">
              Q-SYS • SHURE • SENNHEISER • JBL
            </p>
            <p className="text-[11px] text-zinc-500 font-medium">
              Sonus Pro AV • Sede em Francisco Beltrão - PR
            </p>
          </div>

        </div>
      </main>
    </>
  )
}
