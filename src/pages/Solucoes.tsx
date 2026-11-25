import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { ORG_ID, SITE_URL, SONUS_OFFER_CATALOG, SONUS_ORGANIZATION, buildBreadcrumb, buildGraph } from "@/lib/schema";
import { Vote, Users, Mic2, HeartHandshake, Cpu, ArrowRight, Speaker, GraduationCap, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const SolucoesHero3D = lazy(() => import("@/components/solucoes/SolucoesHero3D").then(m => ({ default: m.SolucoesHero3D })));
const SolucoesCard3D = lazy(() => import("@/components/solucoes/SolucoesCard3D").then(m => ({ default: m.SolucoesCard3D })));
const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })));
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));


const schema = buildGraph(
  {
    "@type": "Service",
    "@id": `${SITE_URL}/solucoes#service`,
    url: `${SITE_URL}/solucoes`,
    serviceType: "Integração Audiovisual Corporativa",
    provider: { "@id": ORG_ID },
    areaServed: SONUS_ORGANIZATION.areaServed,
    hasOfferCatalog: SONUS_OFFER_CATALOG,
  },
  buildBreadcrumb([
    { name: "Início", path: "/" },
    { name: "Soluções", path: "/solucoes" },
  ])
);

export function Solucoes() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <SEO 
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de tecnologia audiovisual: Educação e Universidades, Estúdios de Podcast Autônomos, Plenários, Salas Corporativas, Auditórios, Igrejas, Bares e Plataforma Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
        schema={schema}
      />

      <Navbar />

      <main className="flex-1 w-full relative z-10 pt-32 pb-24">
        
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          
          {/* Hero Section */}
          <div className="relative flex flex-col items-center text-center mb-16 sm:mb-24">
            <Suspense fallback={null}>
              <SolucoesHero3D />
            </Suspense>
            <div className="relative z-10 flex flex-col items-center">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6 sm:mb-8 shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-zinc-300">Nossas Dimensões</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.05] sm:leading-[1] mb-6 sm:mb-8 text-white drop-shadow-2xl">
                  A fundação de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ambientes críticos.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto px-2">
                  Apresentamos o ecossistema Sonus. Integração audiovisual vibrante, impecável e desenhada para não falhar. Explore as tecnologias que constroem o amanhã.
                </p>
              </Reveal>
            </div>
          </div>

          {/* BENTO GRID OF SOLUTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* 1. PLENARIOS - SPANS 7 COLS (LARGE) */}
            <SpotlightCard className="col-span-1 lg:col-span-7 min-h-[520px] sm:min-h-[500px] lg:h-[500px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#050505] to-[#050505] z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="plenarios"
                  className="absolute -right-4 sm:right-0 top-0 w-[74%] sm:w-[62%] md:w-[50%] h-[320px] sm:h-[360px] md:h-full md:bottom-0 opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_50%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-10 md:p-14 h-full flex flex-col justify-between w-full lg:w-[62%] pointer-events-none [&>*]:pointer-events-auto">
                <div className="flex items-center gap-3 sm:gap-4 max-w-[calc(100%-190px)] sm:max-w-none">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <Vote className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-tight">Executivo &amp; Legislativo</span>
                </div>
                
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Plenários e Câmaras</h2>
                  <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Tecnologia para o legislativo. Câmeras que focam automaticamente em quem está falando e painel seguro para votação eletrônica.
                  </p>
                  <Link 
                    to="/plenarios-e-camaras" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Plenários e Câmaras' }); }}
                    className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors w-fit"
                  >
                    Acessar Plenários <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 2. SALAS CORPORATIVAS - SPANS 5 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-5 min-h-[520px] sm:min-h-[500px] lg:h-[500px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-[#050505] to-[#050505] z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="corporativo"
                  className="absolute -right-4 sm:right-0 top-0 w-[76%] sm:w-[64%] md:w-[54%] h-[320px] sm:h-[360px] md:h-full md:bottom-0 opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_50%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-10 md:p-12 h-full flex flex-col justify-between w-full lg:w-[60%] pointer-events-none [&>*]:pointer-events-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Salas Corporativas</h2>
                  <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Videoconferência de alto padrão. Microfones invisíveis no teto, conexão fácil para notebooks e compatibilidade total com Teams e Zoom.
                  </p>
                  <Link 
                    to="/salas-reuniao" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Salas Corporativas' }); }}
                    className="inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors w-fit"
                  >
                    Explorar Corporativo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 3. AUDITORIOS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 min-h-[460px] sm:min-h-[420px] lg:h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-[#050505] to-[#050505] z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="auditorios"
                  className="absolute -right-2 sm:right-0 top-0 w-[78%] sm:w-[65%] lg:w-[64%] h-[270px] sm:h-[300px] lg:h-[62%] opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_48%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <Mic2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Auditórios &amp; Teatros</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5 sm:mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Sonorização de grande porte. Som limpo em todas as fileiras e controle centralizado no tablet para adaptar a sala a qualquer evento.
                  </p>
                  <Link 
                    to="/auditorios-e-teatros" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Auditórios e Teatros' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Conhecer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 4. IGREJAS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 min-h-[460px] sm:min-h-[420px] lg:h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#050505] to-[#050505] z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="igrejas"
                  className="absolute -right-2 sm:right-0 top-0 w-[78%] sm:w-[65%] lg:w-[64%] h-[270px] sm:h-[300px] lg:h-[62%] opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_48%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500">
                  <HeartHandshake className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Igrejas &amp; Templos</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5 sm:mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Controle de pressão sonora e inteligibilidade. Processamento digital para garantir a clareza da palavra sem microfonias.
                  </p>
                  <Link 
                    to="/igrejas-e-templos" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Igrejas e Templos' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Ver Projetos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 5. Q-SYS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 min-h-[460px] sm:min-h-[420px] lg:h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 via-[#050505] to-[#050505] z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="qsys"
                  className="absolute -right-2 sm:right-0 top-0 w-[80%] sm:w-[68%] lg:w-[66%] h-[270px] sm:h-[300px] lg:h-[62%] opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_48%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Plataforma Q-SYS</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5 sm:mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    O cérebro do sistema. Um único processador inteligente que substitui dezenas de equipamentos antigos, gerenciando tudo através da rede.
                  </p>
                  <Link 
                    to="/qsys" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Plataforma Q-SYS' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Descobrir <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 6. EDUCAÇÃO & UNIVERSIDADES - SPANS 6 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-6 min-h-[380px] sm:min-h-[360px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#050505] to-[#050505] z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25 z-0" aria-hidden="true" />
              {/* Arte visual leve em CSS/SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                className="pointer-events-none absolute -right-4 -top-4 w-52 h-52 sm:w-64 sm:h-64 opacity-45 group-hover:opacity-75 transition-opacity duration-500 z-0"
              >
                <defs>
                  <radialGradient id="eduCardGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="110" cy="110" r="95" fill="url(#eduCardGlow)" />
                <circle cx="110" cy="110" r="78" fill="none" stroke="#22d3ee" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="110" cy="110" r="52" fill="none" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.2" />
                <circle cx="110" cy="110" r="26" fill="none" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1.5" />
              </svg>

              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Ensino Híbrido Q-SYS</span>
                </div>
                <div className="mt-auto pt-8 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Educação &amp; Universidades</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Salas de aula híbridas (HyFlex), auditórios acadêmicos e salas divisíveis com operação em um toque para docentes e gestão remota via Q-SYS Reflect.
                  </p>
                  <Link
                    to="/educacao"
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Educação e Universidades' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Explorar Educação <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 7. ESTÚDIOS DE PODCAST - SPANS 6 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-6 min-h-[380px] sm:min-h-[360px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-950/30 via-[#050505] to-[#050505] z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25 z-0" aria-hidden="true" />
              {/* Arte visual leve em CSS/SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                className="pointer-events-none absolute -right-4 -top-4 w-52 h-52 sm:w-64 sm:h-64 opacity-45 group-hover:opacity-75 transition-opacity duration-500 z-0"
              >
                <defs>
                  <radialGradient id="podCardGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="110" cy="110" r="95" fill="url(#podCardGlow)" />
                <circle cx="110" cy="110" r="76" fill="none" stroke="#f59e0b" strokeOpacity="0.2" strokeWidth="1" />
                <circle cx="110" cy="110" r="52" fill="none" stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="6 4" />
                <circle cx="110" cy="110" r="28" fill="none" stroke="#f59e0b" strokeOpacity="0.55" strokeWidth="1.5" />
              </svg>

              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <Radio className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Autonomous Engine</span>
                </div>
                <div className="mt-auto pt-8 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Estúdios de Podcast</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Salas 100% autônomas em Q-SYS: toque único para gravar sem equipe na sala, corte multi-câmera 4K por voz e entrega automática em 16:9 e 9:16.
                  </p>
                  <Link
                    to="/podcasts"
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Estúdios de Podcast' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Conhecer Estúdios <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 8. BARES E CASAS NOTURNAS - SPANS 12 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-12 min-h-[440px] sm:min-h-[380px] md:h-[300px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505] to-blue-900/10 z-0" />

              <Suspense fallback={null}>
                <SolucoesCard3D
                  variant="bares"
                  className="absolute -right-2 md:right-8 top-0 md:bottom-0 w-[74%] sm:w-[55%] md:w-[40%] h-[280px] sm:h-[300px] md:h-full opacity-95 group-hover:opacity-100 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_90%_90%_at_55%_50%,black_60%,transparent_100%)]"
                />
              </Suspense>

              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto max-w-3xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <Speaker className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="mt-auto pt-6 sm:pt-0 relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Bares &amp; Casas Noturnas</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-5 sm:mb-6 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    Zoneamento IP e controle de dispersão. Pressão sonora máxima na pista com adequação rigorosa às normas de emissão.
                  </p>
                  <Link 
                    to="/bares-e-casas-noturnas" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Bares e Casas Noturnas' }); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Ver Solução <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
