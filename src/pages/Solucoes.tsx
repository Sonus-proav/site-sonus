import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { Vote, Users, Mic2, HeartHandshake, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })));
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));
const StickyCtaBar = lazy(() => import("@/components/ui/StickyCtaBar").then(m => ({ default: m.StickyCtaBar })));

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Integração Audiovisual Corporativa",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sonus Pro Audio e Video"
  },
  "areaServed": "Brasil",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Soluções de Tecnologia Audiovisual",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plenários e Câmaras" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Salas Corporativas de Videoconferência" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sonorização de Auditórios e Teatros" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sonorização de Igrejas e Templos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design e Programação Q-SYS" } }
    ]
  }
};

export function Solucoes() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <Helmet>
        <title>Ecossistema de Soluções | Sonus Pro AV</title>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <SEO 
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de tecnologia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      <main className="flex-1 w-full relative z-10 pt-32 pb-24">
        
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-24">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 shadow-xl">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-300">Nossas Dimensões</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1] mb-8 text-white drop-shadow-2xl">
                A fundação de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ambientes críticos.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
                Apresentamos o ecossistema Sonus. Integração audiovisual vibrante, impecável e desenhada para não falhar. Explore as tecnologias que constroem o amanhã.
              </p>
            </Reveal>
          </div>

          {/* BENTO GRID OF SOLUTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* 1. PLENARIOS - SPANS 7 COLS (LARGE) */}
            <SpotlightCard className="col-span-1 lg:col-span-7 h-[500px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-[#050505] to-[#050505] z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 z-0" />
              
              <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-500">
                    <Vote className="w-8 h-8" />
                  </div>
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Executivo & Legislativo</span>
                </div>
                
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">Plenários e Câmaras</h2>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8 max-w-lg">
                    A Soberania do Som e da Imagem. Projetos de alta precisão. Votação eletrônica, atas digitais automáticas e rastreamento robótico PTZ.
                  </p>
                  <Link 
                    to="/plenarios-e-camaras" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Plenários e Câmaras' }); }}
                    className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Acessar Plenários <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 2. SALAS CORPORATIVAS - SPANS 5 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-5 h-[500px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-[#050505] to-[#050505] z-0" />
              
              <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-7 h-7" />
                </div>
                
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">Salas Corporativas</h2>
                  <p className="text-zinc-400 text-base font-light leading-relaxed mb-8">
                    Videoconferência de Alto Padrão. Padronização tecnológica para diretorias, eliminando atritos tecnológicos em reuniões globais.
                  </p>
                  <Link 
                    to="/salas-reuniao" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Salas Corporativas' }); }}
                    className="inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Explorar Corporativo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 3. AUDITORIOS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[450px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-[#050505] to-[#050505] z-0" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <Mic2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white mb-3">Auditórios & Teatros</h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    Acústica em Grande Escala. Sonorização de alta inteligibilidade projetada para a geometria do espaço.
                  </p>
                  <Link 
                    to="/auditorios-e-teatros" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Auditórios e Teatros' }); }}
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Conhecer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 4. IGREJAS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[450px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#050505] to-[#050505] z-0" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-500">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white mb-3">Igrejas & Templos</h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    A Mensagem Entregue com Clareza. Sistemas que respeitam a arquitetura sagrada e proporcionam impacto sonoro.
                  </p>
                  <Link 
                    to="/igrejas-e-templos" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Igrejas e Templos' }); }}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Ver Projetos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 5. Q-SYS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[450px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 via-[#050505] to-[#050505] z-0" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-white mb-3">Plataforma Q-SYS</h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    O Cérebro da Integração AV. Infraestrutura baseada em software que centraliza áudio, vídeo e controle.
                  </p>
                  <Link 
                    to="/qsys" 
                    onClick={() => { (window as any).dataLayer?.push({ event: 'navigate_solucoes_grid', dimension: 'Plataforma Q-SYS' }); }}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold uppercase tracking-widest text-xs transition-colors"
                  >
                    Descobrir <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <StickyCtaBar buttonText="Solicitar Orçamento" messageText="Olá, gostaria de conversar sobre os projetos e soluções da Sonus." />
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
