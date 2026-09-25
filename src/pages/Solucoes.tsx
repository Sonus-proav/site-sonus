import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense, useRef } from "react";
import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Vote, Users, Mic2, HeartHandshake, Cpu, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })));
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

interface DimensionItem {
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  link: string;
  icon: LucideIcon;
  themeColor: string;
  bgGradient: string;
}

const dimensions: DimensionItem[] = [
  {
    title: "Plenários e Câmaras",
    headline: "A Soberania do Som e da Imagem.",
    description: "Projetos executivos de alta precisão. Votação eletrônica, atas digitais automáticas e rastreamento de câmeras robóticas PTZ.",
    ctaText: "Acessar Plenários",
    link: "/plenarios-e-camaras",
    icon: Vote,
    themeColor: "#06b6d4", // Cyan
    bgGradient: "from-cyan-900/40 via-cyan-950/20 to-black"
  },
  {
    title: "Salas Corporativas",
    headline: "Videoconferência de Alto Padrão.",
    description: "Padronização tecnológica para diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos em reuniões globais.",
    ctaText: "Explorar Corporativo",
    link: "/salas-reuniao",
    icon: Users,
    themeColor: "#3b82f6", // Blue
    bgGradient: "from-blue-900/40 via-blue-950/20 to-black"
  },
  {
    title: "Auditórios e Teatros",
    headline: "Engenharia Acústica em Grande Escala.",
    description: "Sonorização de alta inteligibilidade projetada para a geometria do espaço. Cobertura uniforme que garante clareza do palco ao último assento.",
    ctaText: "Conhecer Auditórios",
    link: "/auditorios-e-teatros",
    icon: Mic2,
    themeColor: "#10b981", // Emerald
    bgGradient: "from-emerald-900/40 via-emerald-950/20 to-black"
  },
  {
    title: "Igrejas e Templos",
    headline: "A Mensagem Entregue com Clareza.",
    description: "Sistemas que respeitam a arquitetura sagrada e proporcionam impacto sonoro incomparável. Operação desenhada para conforto de voluntários.",
    ctaText: "Ver Projetos",
    link: "/igrejas-e-templos",
    icon: HeartHandshake,
    themeColor: "#f59e0b", // Amber
    bgGradient: "from-amber-900/40 via-amber-950/20 to-black"
  },
  {
    title: "Plataforma Q-SYS",
    headline: "O Cérebro da Integração AV.",
    description: "Uma infraestrutura baseada puramente em software que centraliza áudio, vídeo e automação com estabilidade extrema, eliminando falhas de hardware.",
    ctaText: "Descobrir o Q-SYS",
    link: "/qsys",
    icon: Cpu,
    themeColor: "#8b5cf6", // Purple
    bgGradient: "from-purple-900/40 via-purple-950/20 to-black"
  }
];

// ---------------------------------------------
// VIBRANT HORIZONTAL SCROLL COMPONENT
// ---------------------------------------------
function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // The section is 500vh tall (100vh for each of the 5 cards)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth the scroll progress to avoid jitter
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Map progress to X translation. We have 5 cards, each takes 100vw.
  // We want to translate from 0 to -80% (so the 5th card is visible at the end)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  // Dynamic Background Color based on scroll
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(6, 182, 212, 0.05)", // Cyan
      "rgba(59, 130, 246, 0.05)", // Blue
      "rgba(16, 185, 129, 0.05)", // Emerald
      "rgba(245, 158, 11, 0.05)", // Amber
      "rgba(139, 92, 246, 0.05)"  // Purple
    ]
  );

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#020205]">
      {/* Sticky Container */}
      <motion.div 
        style={{ backgroundColor }}
        className="sticky top-0 h-screen flex items-center overflow-hidden transition-colors duration-500"
      >
        {/* Moving Track */}
        <motion.div style={{ x }} className="flex w-[500vw]">
          {dimensions.map((dim, index) => (
            <div key={index} className="w-[100vw] h-full flex items-center justify-center p-4 md:p-12 relative">
              
              {/* VIBRANT GLASS CARD */}
              <div className={`relative w-full max-w-[1200px] h-[80vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10 bg-gradient-to-br ${dim.bgGradient} backdrop-blur-3xl`}>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2 h-[60%] md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 w-fit backdrop-blur-md">
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: dim.themeColor, boxShadow: `0 0 10px ${dim.themeColor}` }} />
                    <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">{dim.title}</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-6">
                    {dim.headline}
                  </h2>
                  
                  <p className="text-base md:text-xl text-zinc-300 font-light leading-relaxed mb-10 max-w-lg">
                    {dim.description}
                  </p>

                  <Link to={dim.link} className="inline-block group w-fit">
                    <div className="relative overflow-hidden h-14 md:h-16 px-8 rounded-full border border-white/20 bg-white/5 hover:bg-white transition-all duration-500 flex items-center gap-4 group-hover:border-transparent backdrop-blur-md">
                      <span className="relative z-10 text-white group-hover:text-black font-black tracking-widest uppercase text-xs md:text-sm transition-colors duration-500">
                        {dim.ctaText}
                      </span>
                      <div 
                        className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2"
                        style={{ backgroundColor: dim.themeColor }}
                      >
                        <ArrowRight className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Abstract Visual Side (Vibrant, Alive, 3D Feel) */}
                <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center">
                  {/* Glowing Auras */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] blur-[100px] opacity-40 mix-blend-screen pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${dim.themeColor} 0%, transparent 70%)` }}
                  />
                  
                  {/* Majestic Floating Icon */}
                  <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <dim.icon 
                      className="w-48 h-48 md:w-80 md:h-80" 
                      style={{ color: dim.themeColor, filter: `drop-shadow(0 20px 40px ${dim.themeColor}80)` }} 
                      strokeWidth={1} 
                    />
                  </motion.div>

                  {/* Geometric Glass Shards (Floating in background) */}
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-2xl backdrop-blur-md bg-white/5"
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <motion.div 
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-white/5 rounded-full backdrop-blur-sm bg-white/5"
                  />
                </div>
              </div>

            </div>
          ))}
        </motion.div>

        {/* Scroll Progress Bar at Bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            style={{ scaleX: smoothProgress, transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------
export function Solucoes() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020205] text-white selection:bg-white/30 font-sans">
      <Helmet>
        <title>Ecossistema de Soluções | Sonus Pro AV</title>
      </Helmet>
      <SEO 
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de engenharia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      {/* VIBRANT HERO SECTION (ALIVE AND COLORFUL) */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
        
        {/* Animated Liquid Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-500/30 blur-[150px] rounded-full"
          />
          <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/30 blur-[150px] rounded-full"
          />
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-8 shadow-2xl"
          >
            <span className="text-sm font-bold tracking-widest uppercase text-white">Nossas Dimensões</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.95] mb-8 text-white drop-shadow-2xl"
          >
            A fundação de <br/> ambientes críticos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-3xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
          >
            Apresentamos o ecossistema Sonus. Engenharia audiovisual vibrante, impecável e desenhada para não falhar.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Role para Explorar</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* HORIZONTAL SCROLL GALLERY */}
      <HorizontalScrollGallery />

      <Suspense fallback={null}>
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
