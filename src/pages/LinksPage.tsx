import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { MessageCircle, Building2, Globe, Video, Vote, Mic, Cpu, Music, ArrowUpRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"
import { logLead, getUserGeo } from "@/lib/analytics"

const BENTO_ENVIRONMENTS = [
  {
    num: "01",
    tag: "CORPORATIVO",
    title: "Salas de Reunião",
    subtitle: "Videoconferência e Diretoria",
    to: "/salas-reuniao",
    image: "/salas-corporativas.webp",
    icon: Video,
    badgeColor: "text-cyan-300 border-cyan-500/40 bg-cyan-950/80",
    hoverBorder: "hover:border-cyan-400/60",
    event: "click_links_salas"
  },
  {
    num: "02",
    tag: "GRANDES VÃOS",
    title: "Auditórios e Teatros",
    subtitle: "Som Profissional e Vídeo",
    to: "/auditorios-e-teatros",
    image: "/auditorio-sonus.webp",
    icon: Building2,
    badgeColor: "text-blue-300 border-blue-500/40 bg-blue-950/80",
    hoverBorder: "hover:border-blue-400/60",
    event: "click_links_auditorios"
  },
  {
    num: "03",
    tag: "LEGISLATIVO",
    title: "Plenários e Câmaras",
    subtitle: "Votação e Corte de Câmera",
    to: "/plenarios-e-camaras",
    image: "/plenario-thumb.webp",
    icon: Vote,
    badgeColor: "text-indigo-300 border-indigo-500/40 bg-indigo-950/80",
    hoverBorder: "hover:border-indigo-400/60",
    event: "click_links_plenarios"
  },
  {
    num: "04",
    tag: "ACÚSTICA SACRA",
    title: "Igrejas e Templos",
    subtitle: "Nitidez da Voz e Música",
    to: "/igrejas-e-templos",
    image: "/interior-matriz-xanxere.webp",
    icon: Mic,
    badgeColor: "text-amber-300 border-amber-500/40 bg-amber-950/80",
    hoverBorder: "hover:border-amber-400/60",
    event: "click_links_igrejas"
  }
];

export function LinksPage() {
  const WHATSAPP_NUMBER = "5546920013151";
  const WHATSAPP_MESSAGE = "Olá! Vim pelo Instagram da Sonus e gostaria de falar com um especialista sobre um projeto.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = (originLabel: string = 'links_instagram') => {
    getUserGeo().then(geo => {
      logLead({
        type: 'whatsapp',
        source: '/links (Bio Instagram)',
        city: geo.city,
        region: geo.region,
        country: geo.country,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        timestamp: Date.now(),
        whatsappOrigin: originLabel
      });
    });

    trackWhatsAppClick(originLabel, 'links_page');

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
        <style>{`
          @keyframes eq-bar {
            0%, 100% { transform: scaleY(0.35); }
            50% { transform: scaleY(1); }
          }
          .animate-eq-1 { animation: eq-bar 1.1s ease-in-out infinite; }
          .animate-eq-2 { animation: eq-bar 0.8s ease-in-out infinite 0.2s; }
          .animate-eq-3 { animation: eq-bar 1.3s ease-in-out infinite 0.4s; }
          .animate-eq-4 { animation: eq-bar 0.9s ease-in-out infinite 0.1s; }
        `}</style>
      </Helmet>
      
      <SEO 
        title="Links Oficiais | Sonus Pro AV" 
        description="Soluções de Áudio, Vídeo e Automação. Acesse nossas soluções por ambiente, portfólio de obras e atendimento direto." 
        url="https://sonusproaudio.com.br/links"
        noindex
      />
      
      <main className="relative min-h-[100dvh] w-full bg-[#05060A] text-zinc-100 flex flex-col items-center pt-5 pb-28 px-3.5 sm:px-6 overflow-x-hidden overflow-y-auto font-sans selection:bg-cyan-500/30 selection:text-white">
        
        {/* Subtle Architectural Grid + Ambient Top Glow (Zero GPU blur lag) */}
        <div 
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)] z-0" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[520px] h-[280px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.16)_0%,transparent_70%)] z-0" 
          aria-hidden="true" 
        />
        
        <div className="w-full max-w-[440px] relative z-10 flex flex-col items-center">
          
          {/* 1. CONSOLE TELEMETRY TOP BAR */}
          <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-zinc-900/90 border border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200">
                Atendimento Online
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Live CSS Audio Equalizer */}
              <div className="flex items-end gap-[2px] h-3" aria-hidden="true">
                <span className="w-[2px] h-full bg-cyan-400 rounded-full origin-bottom animate-eq-1" />
                <span className="w-[2px] h-full bg-cyan-400 rounded-full origin-bottom animate-eq-2" />
                <span className="w-[2px] h-full bg-cyan-400 rounded-full origin-bottom animate-eq-3" />
                <span className="w-[2px] h-full bg-cyan-400 rounded-full origin-bottom animate-eq-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                +28 Anos • Brasil
              </span>
            </div>
          </div>

          {/* 2. EDITORIAL BRAND HEADER */}
          <div className="w-full text-center mb-6 px-2">
            <img 
              src="/logo.png" 
              alt="Sonus Pro AV" 
              width={148} 
              height={36} 
              fetchPriority="high"
              className="h-6 sm:h-7 mx-auto mb-3.5 object-contain invert brightness-0" 
              style={{ filter: "brightness(0) invert(1)" }} 
            />

            <h1 className="text-white text-xl sm:text-2xl font-black tracking-tight leading-[1.15]">
              Áudio, Vídeo e Automação{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                de Alto Padrão.
              </span>
            </h1>
            <p className="text-zinc-300 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
              Ambientes modernos, discretos e fáceis de operar para empresas, órgãos públicos e templos.
            </p>
          </div>

          {/* 3. BENTO HERO: 3-PHOTO PORTFOLIO VITRINE */}
          <Link 
            to="/projetos"
            data-tracking="link-portfolio"
            onClick={() => trackNavClick('click_links_portfolio')}
            className="group relative w-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/15 hover:border-cyan-400/60 transition-all duration-300 mb-3.5 active:scale-[0.99] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* 3-Photo Triptych Showcase */}
            <div className="grid grid-cols-3 gap-1 p-1.5 pb-0 bg-zinc-950">
              <div className="relative h-24 rounded-tl-2xl rounded-bl-lg overflow-hidden">
                <img 
                  src="/cresol.webp" 
                  alt="Sede Cresol" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold uppercase tracking-wider text-zinc-200">
                  Cresol
                </span>
              </div>

              <div className="relative h-24 rounded-lg overflow-hidden">
                <img 
                  src="/teatro-unisep.webp" 
                  alt="Teatro Unisep" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold uppercase tracking-wider text-zinc-200">
                  Unisep
                </span>
              </div>

              <div className="relative h-24 rounded-tr-2xl rounded-br-lg overflow-hidden">
                <img 
                  src="/salas-corporativas.webp" 
                  alt="Salas Corporativas" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold uppercase tracking-wider text-zinc-200">
                  Diretorias
                </span>
              </div>
            </div>

            {/* Bottom Callout Bar */}
            <div className="p-3.5 px-4 flex items-center justify-between bg-zinc-900">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                    Portfólio Oficial • Obras Entregues
                  </span>
                </div>
                <h2 className="text-white font-extrabold text-sm sm:text-base leading-tight">
                  Ver Projetos Entregues pela Sonus
                </h2>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 group-hover:bg-cyan-400 group-hover:text-black text-white font-bold text-xs transition-colors">
                Abrir
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* 4. FULL-BLEED ASYMMETRIC BENTO GRID (AMBIENTES) */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-300">
                Soluções por Ambiente
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                [01 — 06]
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {BENTO_ENVIRONMENTS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => trackNavClick(item.event)}
                    className={`group relative h-40 rounded-3xl overflow-hidden border border-white/15 ${item.hoverBorder} flex flex-col justify-between p-3.5 transition-all duration-300 active:scale-[0.98] bg-zinc-950`}
                  >
                    {/* Full-Bleed Background Photo */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width={220}
                      height={160}
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500"
                    />
                    
                    {/* Deep Cinematic Vignette for 100% Mobile Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />

                    {/* Top Row: Editorial Number + Icon Badge */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className={`px-2 py-0.5 rounded-md border text-[9px] font-extrabold tracking-wider uppercase ${item.badgeColor}`}>
                        {item.num} • {item.tag}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Row: Crisp White Title & Subtitle */}
                    <div className="relative z-10 w-full text-left">
                      <h3 className="text-white font-extrabold text-sm sm:text-[15px] leading-tight drop-shadow-sm">
                        {item.title}
                      </h3>
                      <p className="text-zinc-200 text-[11px] mt-0.5 leading-snug line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {/* 05. WIDE BENTO CARD: Q-SYS AUTOMATION */}
              <Link
                to="/qsys"
                onClick={() => trackNavClick('click_links_qsys')}
                className="group relative col-span-2 h-28 rounded-3xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/70 flex flex-col justify-between p-4 transition-all duration-300 active:scale-[0.99] bg-zinc-950"
              >
                <img
                  src="/qsys-tech-bg.webp"
                  alt="Plataforma Q-SYS"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />

                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md border border-cyan-500/40 bg-cyan-950/90 text-[9px] font-extrabold tracking-wider uppercase text-cyan-300">
                    05 • CONTROLE EM UM TOQUE
                  </span>
                  <img 
                    src="/qsys-logo.png" 
                    alt="Q-SYS" 
                    className="h-3.5 object-contain brightness-0 invert opacity-90" 
                  />
                </div>

                <div className="relative z-10 flex items-end justify-between w-full">
                  <div>
                    <h3 className="text-white font-extrabold text-sm sm:text-base leading-tight">
                      Automação e Plataforma Q-SYS
                    </h3>
                    <p className="text-zinc-200 text-xs mt-0.5">
                      Controle som, vídeo, luzes e câmeras na mesma tela
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black transition-colors shrink-0 ml-2">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* 06. Bares & Casas Noturnas + Site Institucional */}
              <Link
                to="/bares-e-casas-noturnas"
                onClick={() => trackNavClick('click_links_bares')}
                className="group relative h-28 rounded-3xl overflow-hidden border border-white/15 hover:border-purple-400/60 flex flex-col justify-between p-3.5 transition-all duration-200 active:scale-[0.98] bg-gradient-to-br from-purple-950/40 via-zinc-900 to-zinc-950"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md border border-purple-500/40 bg-purple-950/80 text-[9px] font-extrabold tracking-wider uppercase text-purple-300">
                    06 • NIGHTLIFE
                  </span>
                  <Music className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xs sm:text-sm leading-tight">
                    Bares e Casas Noturnas
                  </h3>
                  <p className="text-zinc-300 text-[11px] mt-0.5 truncate">
                    Som forte e controle acústico
                  </p>
                </div>
              </Link>

              <Link
                to="/"
                data-tracking="link-home"
                onClick={() => trackNavClick('click_links_home')}
                className="group relative h-28 rounded-3xl overflow-hidden border border-white/15 hover:border-blue-400/60 flex flex-col justify-between p-3.5 transition-all duration-200 active:scale-[0.98] bg-gradient-to-br from-blue-950/40 via-zinc-900 to-zinc-950"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md border border-blue-500/40 bg-blue-950/80 text-[9px] font-extrabold tracking-wider uppercase text-blue-300">
                    WEB OFICIAL
                  </span>
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xs sm:text-sm leading-tight">
                    Site Institucional
                  </h3>
                  <p className="text-zinc-300 text-[11px] mt-0.5 truncate">
                    sonusproaudio.com.br
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* 5. FOOTER WITH OFFICIAL PARTNER LOGOS */}
          <div className="mt-7 pt-5 border-t border-white/10 w-full text-center">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-3">
              Marcas Parceiras Oficiais
            </p>
            <div className="flex items-center justify-center gap-6 opacity-80 mb-3 px-2">
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

        {/* 6. THUMB-ZONE FLOATING DOCK (ALWAYS UNDER THE USER'S THUMB) */}
        <div className="fixed bottom-3.5 left-0 right-0 z-50 px-3.5 pointer-events-none">
          <div className="max-w-[440px] mx-auto pointer-events-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-tracking="link-whatsapp"
              onClick={() => handleWhatsAppClick('links_thumb_dock')}
              className="group w-full flex items-center justify-between p-2.5 pl-3.5 rounded-2xl bg-zinc-950/95 border border-emerald-500/60 hover:border-emerald-400 shadow-[0_12px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(16,185,129,0.22)] transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-center min-w-0 pr-2">
                <div className="relative w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-zinc-950" />
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-white font-extrabold text-xs sm:text-sm leading-tight truncate">
                    Solicitar Orçamento
                  </p>
                  <p className="text-emerald-300/90 text-[11px] leading-tight truncate mt-0.5">
                    Falar com especialista no WhatsApp
                  </p>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-emerald-500 group-hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md">
                Conversar
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

      </main>
    </>
  )
}
