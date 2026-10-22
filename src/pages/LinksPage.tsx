import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { MessageCircle, Building2, Globe, Video, Vote, Mic, Cpu, Music, ChevronRight, ArrowUpRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"
import { logLead, getUserGeo } from "@/lib/analytics"

const ENVIRONMENT_SOLUTIONS = [
  {
    title: "Salas de Reunião",
    subtitle: "Videoconferência e Diretoria",
    to: "/salas-reuniao",
    image: "/salas-corporativas.webp",
    icon: Video,
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-950/80",
    hoverBorder: "hover:border-cyan-500/50",
    event: "click_links_salas"
  },
  {
    title: "Auditórios e Teatros",
    subtitle: "Som, Vídeo e Automação",
    to: "/auditorios-e-teatros",
    image: "/auditorio-sonus.webp",
    icon: Building2,
    accent: "text-blue-400 border-blue-500/30 bg-blue-950/80",
    hoverBorder: "hover:border-blue-500/50",
    event: "click_links_auditorios"
  },
  {
    title: "Plenários e Câmaras",
    subtitle: "Votação e Corte de Câmera",
    to: "/plenarios-e-camaras",
    image: "/plenario-thumb.webp",
    icon: Vote,
    accent: "text-indigo-400 border-indigo-500/30 bg-indigo-950/80",
    hoverBorder: "hover:border-indigo-500/50",
    event: "click_links_plenarios"
  },
  {
    title: "Igrejas e Templos",
    subtitle: "Acústica e Nitidez da Voz",
    to: "/igrejas-e-templos",
    image: "/interior-matriz-xanxere.webp",
    icon: Mic,
    accent: "text-amber-400 border-amber-500/30 bg-amber-950/80",
    hoverBorder: "hover:border-amber-500/50",
    event: "click_links_igrejas"
  }
];

export function LinksPage() {
  const WHATSAPP_NUMBER = "5546920013151";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Sonus e gostaria de falar com um especialista sobre um projeto.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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
      </Helmet>
      
      <SEO 
        title="Links Oficiais | Sonus Pro AV" 
        description="Soluções de Áudio, Vídeo e Automação. Acesse nossas soluções por ambiente, portfólio de obras e atendimento direto." 
        url="https://sonusproaudio.com.br/links"
        noindex
      />
      
      <main className="relative min-h-[100dvh] w-full bg-[#06080E] text-zinc-100 flex flex-col items-center justify-between py-7 px-4 sm:px-6 overflow-x-hidden overflow-y-auto font-sans selection:bg-cyan-500/30 selection:text-white">
        
        {/* Lightweight Subtle Top Glow (Zero GPU lag on Mobile) */}
        <div 
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.14)_0%,transparent_70%)] z-0" 
          aria-hidden="true" 
        />
        
        <div className="w-full max-w-md relative z-10 flex flex-col items-center my-auto">
          
          {/* Header & Authority */}
          <div className="mb-5 flex flex-col items-center text-center w-full">
            <img 
              src="/logo.png" 
              alt="Sonus Pro AV" 
              width={150} 
              height={38} 
              fetchPriority="high"
              className="h-6 sm:h-7 mb-3.5 object-contain invert brightness-0" 
              style={{ filter: "brightness(0) invert(1)" }} 
            />

            <h1 className="text-white text-lg sm:text-xl font-extrabold tracking-tight leading-snug">
              Soluções de Áudio, Vídeo e Automação
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-xs leading-relaxed">
              Projetos completos e fáceis de usar para empresas, órgãos públicos e templos.
            </p>

            {/* Quick Mobile-Friendly Authority Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-semibold text-zinc-200">
                <strong className="text-cyan-400">+28 Anos</strong> de Mercado
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-semibold text-zinc-200">
                <strong className="text-cyan-400">Atuação</strong> Nacional
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-semibold text-zinc-200">
                <strong className="text-cyan-400">Projeto</strong> Completo
              </span>
            </div>
          </div>

          {/* Main Links Stack */}
          <div className="w-full flex flex-col gap-3">
            
            {/* 1. Primary CTA: WhatsApp */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-950/90 via-zinc-900 to-zinc-900 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl transition-all duration-200 shadow-[0_4px_25px_rgba(16,185,129,0.18)] active:scale-[0.99]"
              data-tracking="link-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <div className="flex items-center min-w-0 pr-2">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="ml-3.5 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Atendimento Online
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-sm sm:text-base leading-tight">
                    Solicitar Orçamento
                  </h2>
                  <p className="text-zinc-300 text-xs mt-0.5 truncate">
                    Falar com especialista no WhatsApp
                  </p>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 text-black font-bold text-xs shadow-sm group-hover:bg-emerald-400 transition-colors">
                Iniciar
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* 2. Featured Portfolio Card */}
            <Link 
              to="/projetos"
              className="group relative w-full flex items-center p-3 bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/15 hover:border-cyan-500/40 rounded-2xl transition-all duration-200 active:scale-[0.99]"
              data-tracking="link-portfolio"
              onClick={() => trackNavClick('click_links_portfolio')}
            >
              <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-zinc-950">
                <img 
                  src="/cresol.webp" 
                  alt="Portfólio de Projetos Sonus" 
                  width={64}
                  height={56}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
              <div className="ml-3.5 flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Obras Entregues
                </span>
                <h2 className="text-white font-bold text-sm sm:text-base leading-tight truncate">
                  Ver Portfólio de Projetos
                </h2>
                <p className="text-zinc-300 text-xs mt-0.5 truncate">
                  Cresol, Câmaras Municipais, Unisep e mais
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            {/* 3. Visual 2x2 Grid: Soluções por Ambiente */}
            <div className="w-full pt-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                  Escolha o seu Ambiente
                </p>
                <span className="text-[10px] text-zinc-400">Toque para abrir</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {ENVIRONMENT_SOLUTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => trackNavClick(item.event)}
                      className={`group flex flex-col overflow-hidden bg-zinc-900/95 border border-white/15 ${item.hoverBorder} rounded-2xl transition-all duration-200 active:scale-[0.98]`}
                    >
                      {/* Clean Visual Header */}
                      <div className="relative h-20 w-full overflow-hidden bg-zinc-950">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          width={200}
                          height={80}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                        <div className={`absolute top-2 left-2 w-7 h-7 rounded-lg border flex items-center justify-center ${item.accent}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* High-Contrast Text Footer */}
                      <div className="p-3 pt-2 flex items-center justify-between gap-1">
                        <div className="min-w-0">
                          <h3 className="text-white font-bold text-xs sm:text-sm leading-tight truncate">
                            {item.title}
                          </h3>
                          <p className="text-zinc-300 text-[11px] mt-0.5 leading-tight truncate">
                            {item.subtitle}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 4. Secondary Solutions (Q-SYS & Bares/Clubes) */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <Link 
                to="/qsys"
                className="group w-full flex items-center p-3.5 bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/15 hover:border-cyan-500/40 rounded-2xl transition-all duration-200 active:scale-[0.99]"
                onClick={() => trackNavClick('click_links_qsys')}
              >
                <div className="w-10 h-10 bg-cyan-500/15 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <h2 className="text-white font-bold text-xs sm:text-sm truncate">
                    Automação e Plataforma Q-SYS
                  </h2>
                  <p className="text-zinc-300 text-[11px] mt-0.5 truncate">
                    Controle unificado de som, vídeo e câmeras
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0 ml-2" />
              </Link>

              <Link 
                to="/bares-e-casas-noturnas"
                className="group w-full flex items-center p-3.5 bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/15 hover:border-purple-500/40 rounded-2xl transition-all duration-200 active:scale-[0.99]"
                onClick={() => trackNavClick('click_links_bares')}
              >
                <div className="w-10 h-10 bg-purple-500/15 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/30">
                  <Music className="w-5 h-5 text-purple-400" />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <h2 className="text-white font-bold text-xs sm:text-sm truncate">
                    Bares, Lounges e Casas Noturnas
                  </h2>
                  <p className="text-zinc-300 text-[11px] mt-0.5 truncate">
                    Som de alta potência e controle acústico
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0 ml-2" />
              </Link>

              {/* 5. Official Website Button */}
              <Link 
                to="/"
                className="group w-full flex items-center p-3.5 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 hover:border-blue-500/40 rounded-2xl transition-all duration-200 active:scale-[0.99]"
                data-tracking="link-home"
                onClick={() => trackNavClick('click_links_home')}
              >
                <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div className="ml-3.5 flex-1 min-w-0">
                  <h2 className="text-white font-bold text-xs sm:text-sm">
                    Acessar Site Completo
                  </h2>
                  <p className="text-zinc-400 text-[11px] mt-0.5">
                    sonusproaudio.com.br
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0 ml-2" />
              </Link>
            </div>

          </div>

          {/* Footer with Official Partner Logos */}
          <div className="mt-7 pt-5 border-t border-white/10 w-full text-center">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-3">
              Tecnologias Homologadas
            </p>
            <div className="flex items-center justify-center gap-6 opacity-75 mb-4 px-2">
              <img src="/qsys-logo.png" alt="Q-SYS" className="h-4 object-contain brightness-0 invert" loading="lazy" />
              <img src="/marcas/shure.svg" alt="Shure" className="h-4 object-contain brightness-0 invert" loading="lazy" />
              <img src="/marcas/sennheiser.svg" alt="Sennheiser" className="h-3.5 object-contain brightness-0 invert" loading="lazy" />
              <img src="/marcas/qsc.png" alt="QSC" className="h-4 object-contain brightness-0 invert" loading="lazy" />
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              Sonus Pro AV • Francisco Beltrão - PR
            </p>
          </div>

        </div>
      </main>
    </>
  )
}
