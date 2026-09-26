import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { Vote, Users, Mic2, HeartHandshake, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
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

              {/* HOLOGRAM INSTALLATION: Plenários - Câmera PTZ e Áudio */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-center [perspective:1000px]">
                {/* Floor Grid */}
                <div className="absolute bottom-0 w-[200%] h-[100%] bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:30px_30px] [transform:rotateX(70deg)_translateY(50px)] [mask-image:linear-gradient(to_top,black,transparent)]" />
                
                {/* 3D PTZ Camera Abstraction - FIXED WEBKIT RENDERING */}
                <motion.div animate={{ rotateY: [-20, 20, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative w-40 h-40 [transform-style:preserve-3d]">
                  {/* Camera Base */}
                  <div className="absolute bottom-0 left-8 w-24 h-6 bg-cyan-950 border border-cyan-500/50 rounded-full [transform:rotateX(70deg)] shadow-[0_0_20px_#22d3ee]" />
                  <div className="absolute bottom-2 left-10 w-20 h-10 bg-cyan-900 border border-cyan-400/50 rounded-b-xl" />
                  
                  {/* Camera Bracket (U-Shape) */}
                  <div className="absolute bottom-8 left-6 w-28 h-20 border-b-[8px] border-l-[8px] border-r-[8px] border-cyan-500/80 rounded-b-2xl" />
                  
                  {/* Camera Head (Sphere/Cylinder) */}
                  <motion.div animate={{ rotateX: [-10, 15, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-12 left-10 w-20 h-20 bg-cyan-950 border border-cyan-400 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center overflow-hidden [transform-style:preserve-3d]">
                    {/* Lens */}
                    <div className="w-12 h-12 bg-black border-2 border-cyan-300 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                      <div className="w-6 h-6 bg-cyan-500/40 border border-cyan-200 rounded-full shadow-[0_0_10px_#22d3ee]" />
                    </div>
                    {/* REC Light */}
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-3 right-4 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]" />
                  </motion.div>
                </motion.div>

                {/* Floating Video Frames */}
                <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-4 top-16 w-28 h-16 border border-cyan-400/80 bg-cyan-900/40 backdrop-blur-md rounded-lg p-1.5 flex items-center justify-center [transform:rotateY(-20deg)] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                   <div className="w-full h-full border border-cyan-300/50 rounded flex items-center justify-center gap-1">
                     <div className="w-1/3 h-2/3 bg-cyan-400/40 rounded-sm" />
                     <div className="w-1/3 h-1/2 bg-cyan-400/40 rounded-sm" />
                     <div className="w-1/3 h-3/4 bg-cyan-400/40 rounded-sm" />
                   </div>
                </motion.div>
              </div>

              
              <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-between w-full lg:w-[60%] pointer-events-none [&>*]:pointer-events-auto">
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

              {/* HOLOGRAM INSTALLATION: Corporativo - Videoconferência (Telas 3D) */}
              <div className="absolute right-[-10%] top-0 w-[60%] h-full overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-center [perspective:1200px]">
                {/* 3 Floating Screens */}
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] scale-75 md:scale-90">
                  
                  {/* Left Screen */}
                  <div className="absolute left-[10%] w-48 h-32 border border-blue-400/50 bg-blue-950/40 backdrop-blur-md rounded-xl [transform:rotateY(30deg)_translateZ(-50px)] shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-end justify-center pb-2">
                    <div className="w-12 h-16 bg-blue-400/20 rounded-t-full border-t border-blue-300/50" />
                  </div>
                  
                  {/* Center Main Screen */}
                  <div className="absolute w-64 h-40 border border-blue-300 bg-blue-900/40 backdrop-blur-xl rounded-2xl [transform:translateZ(50px)] shadow-[0_0_50px_rgba(59,130,246,0.5)] flex flex-col items-center justify-center gap-2">
                    <div className="w-20 h-20 bg-blue-400/30 rounded-full border border-blue-200/50 flex items-center justify-center">
                       <Users className="w-10 h-10 text-blue-200" />
                    </div>
                    <div className="w-24 h-2 bg-blue-400/40 rounded-full" />
                  </div>

                  {/* Right Screen */}
                  <div className="absolute right-[10%] w-48 h-32 border border-blue-400/50 bg-blue-950/40 backdrop-blur-md rounded-xl [transform:rotateY(-30deg)_translateZ(-50px)] shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-end justify-center pb-2">
                    <div className="w-12 h-16 bg-blue-400/20 rounded-t-full border-t border-blue-300/50" />
                  </div>

                  {/* Orbiting Data Rings */}
                  <motion.div animate={{ rotateX: 70, rotateZ: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/30 rounded-full [transform-style:preserve-3d]" />
                </motion.div>
              </div>

              
              <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-between w-full lg:w-[60%] pointer-events-none [&>*]:pointer-events-auto">
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
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-[#050505] to-[#050505] z-0" />

              {/* HOLOGRAM INSTALLATION: Auditórios - Line Array e Propagação */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-end pr-12 [perspective:800px]">
                {/* Line Array Speaker Stack */}
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative flex flex-col items-center gap-1 z-10">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-16 h-8 bg-emerald-950 border border-emerald-400 rounded shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center" style={{ transform: `rotateX(${i * -5}deg) translateZ(${i * 5}px)` }}>
                      <div className="w-10 h-4 bg-black border border-emerald-500/50 rounded-full flex items-center justify-around px-1">
                         <div className="w-2 h-2 bg-emerald-400/80 rounded-full" />
                         <div className="w-2 h-2 bg-emerald-400/80 rounded-full" />
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Emitting Sound Waves */}
                <div className="absolute right-28 top-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-start overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.1, opacity: 0.8, x: 0 }}
                      animate={{ scale: 2, opacity: 0, x: -100 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
                      className="absolute right-0 w-32 h-[300px] border-l-4 border-emerald-400/50 rounded-[100%]"
                      style={{ filter: 'drop-shadow(0 0 10px #10b981)' }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Conhecer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 4. IGREJAS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-[#050505] to-[#050505] z-0" />

              {/* HOLOGRAM INSTALLATION: Igrejas - Microfone de Púlpito e Claridade Acústica */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-center [perspective:1000px]">
                {/* Architectural Arch Window */}
                <div className="absolute top-4 w-64 h-80 border-t-2 border-l-2 border-r-2 border-amber-500/20 rounded-t-full opacity-50" />
                
                {/* Minimalist Gooseneck Mic */}
                <div className="absolute bottom-0 w-2 h-40 bg-gradient-to-t from-amber-600 to-amber-300 rounded-t-full shadow-[0_0_20px_#f59e0b] flex flex-col items-center">
                  <div className="w-4 h-6 bg-amber-200 border-2 border-amber-100 rounded-full -mt-4 shadow-[0_0_30px_#fcd34d]" />
                </div>

                {/* Clear Expanding Sound Halo */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-amber-300/40 rounded-full"
                    style={{ filter: 'drop-shadow(0 0 10px #f59e0b)' }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
                  >
                    Ver Projetos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            {/* 5. Q-SYS - SPANS 4 COLS */}
            <SpotlightCard className="col-span-1 lg:col-span-4 h-[380px] group !p-0">
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 via-[#050505] to-[#050505] z-0" />

              {/* HOLOGRAM INSTALLATION: Q-SYS - Network & Automação */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-center">
                {/* Network SVG Connections */}
                <svg className="absolute inset-0 w-full h-full" strokeWidth="1">
                   <motion.path d="M50% 50% L20% 20% M50% 50% L80% 20% M50% 50% L20% 80% M50% 50% L80% 80%" stroke="rgba(139,92,246,0.3)" />
                   {/* Moving data packets */}
                   <motion.circle r="3" fill="#c4b5fd" animate={{ cx: ["50%", "20%"], cy: ["50%", "20%"] }} transition={{ duration: 2, repeat: Infinity }} />
                   <motion.circle r="3" fill="#c4b5fd" animate={{ cx: ["50%", "80%"], cy: ["50%", "20%"] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                   <motion.circle r="3" fill="#c4b5fd" animate={{ cx: ["50%", "20%"], cy: ["50%", "80%"] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                   <motion.circle r="3" fill="#c4b5fd" animate={{ cx: ["50%", "80%"], cy: ["50%", "80%"] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
                </svg>

                {/* Main Q-SYS Core (Rack Server / Processor) */}
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-40 h-16 bg-purple-950 border border-purple-400 rounded-lg shadow-[0_0_40px_rgba(139,92,246,0.5)] flex flex-col justify-around px-2 py-1 [transform-style:preserve-3d] [transform:rotateX(20deg)_rotateY(-15deg)]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
                    <div className="w-3 h-3 bg-purple-400 rounded-full" />
                    <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  </div>
                  <div className="w-full h-1 bg-purple-800 rounded">
                    <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-purple-300 rounded shadow-[0_0_10px_#c4b5fd]" />
                  </div>
                </motion.div>

                {/* Sub nodes */}
                <div className="absolute top-[10%] left-[10%] w-12 h-8 border border-purple-500/50 bg-purple-900/30 rounded flex items-center justify-center"><Mic2 className="w-4 h-4 text-purple-300" /></div>
                <div className="absolute top-[10%] right-[10%] w-12 h-8 border border-purple-500/50 bg-purple-900/30 rounded flex items-center justify-center"><Users className="w-4 h-4 text-purple-300" /></div>
                <div className="absolute bottom-[10%] left-[10%] w-12 h-8 border border-purple-500/50 bg-purple-900/30 rounded flex items-center justify-center"><Vote className="w-4 h-4 text-purple-300" /></div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none [&>*]:pointer-events-auto">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors w-fit"
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
