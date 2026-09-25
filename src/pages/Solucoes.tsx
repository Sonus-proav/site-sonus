import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense, useRef } from "react";
import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
    themeColor: "#06b6d4",
    bgGradient: "from-cyan-900/20 via-cyan-950/10 to-black"
  },
  {
    title: "Salas Corporativas",
    headline: "Videoconferência de Alto Padrão.",
    description: "Padronização tecnológica para diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos em reuniões globais.",
    ctaText: "Explorar Corporativo",
    link: "/salas-reuniao",
    icon: Users,
    themeColor: "#3b82f6",
    bgGradient: "from-blue-900/20 via-blue-950/10 to-black"
  },
  {
    title: "Auditórios e Teatros",
    headline: "Engenharia Acústica em Grande Escala.",
    description: "Sonorização de alta inteligibilidade projetada para a geometria do espaço. Cobertura uniforme que garante clareza do palco ao último assento.",
    ctaText: "Conhecer Auditórios",
    link: "/auditorios-e-teatros",
    icon: Mic2,
    themeColor: "#10b981",
    bgGradient: "from-emerald-900/20 via-emerald-950/10 to-black"
  },
  {
    title: "Igrejas e Templos",
    headline: "A Mensagem Entregue com Clareza.",
    description: "Sistemas que respeitam a arquitetura sagrada e proporcionam impacto sonoro incomparável. Operação desenhada para conforto de voluntários.",
    ctaText: "Ver Projetos",
    link: "/igrejas-e-templos",
    icon: HeartHandshake,
    themeColor: "#f59e0b",
    bgGradient: "from-amber-900/20 via-amber-950/10 to-black"
  },
  {
    title: "Plataforma Q-SYS",
    headline: "O Cérebro da Integração AV.",
    description: "Uma infraestrutura baseada puramente em software que centraliza áudio, vídeo e automação com estabilidade extrema, eliminando falhas de hardware.",
    ctaText: "Descobrir o Q-SYS",
    link: "/qsys",
    icon: Cpu,
    themeColor: "#8b5cf6",
    bgGradient: "from-purple-900/20 via-purple-950/10 to-black"
  }
];

// ---------------------------------------------
// HIGH-PERFORMANCE HORIZONTAL SCROLL GALLERY
// ---------------------------------------------
function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Pure transform without useSpring for maximum performance (no layout thrashing)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  // Tie the icon rotation directly to the scroll progress so it only renders when scrolling
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#020205]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* GPU Accelerated Track */}
        <motion.div 
          style={{ x }} 
          className="flex w-[500vw] will-change-transform transform-gpu"
        >
          {dimensions.map((dim, index) => (
            <div key={index} className="w-[100vw] h-full flex items-center justify-center p-4 md:p-8 relative">
              
              {/* PERFORMANCE CARD (No blur filter, native gradients) */}
              <div className={`relative w-full max-w-[1200px] h-[85vh] md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] border border-white/10 bg-gradient-to-br ${dim.bgGradient} bg-[#050508]`}>
                
                {/* Content Side */}
                <div className="w-full md:w-[55%] h-[55%] md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 md:mb-8 w-fit">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dim.themeColor, boxShadow: `0 0 10px ${dim.themeColor}` }} />
                    <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">{dim.title}</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-4 md:mb-6">
                    {dim.headline}
                  </h2>
                  
                  <p className="text-base md:text-xl text-zinc-300 font-light leading-relaxed mb-8 md:mb-10 max-w-lg">
                    {dim.description}
                  </p>

                  <Link to={dim.link} className="inline-block group w-fit">
                    <div className="relative overflow-hidden h-14 md:h-16 px-6 md:px-8 rounded-full border border-white/20 bg-white/5 hover:bg-white transition-all duration-300 flex items-center gap-4 group-hover:border-transparent">
                      <span className="relative z-10 text-white group-hover:text-black font-black tracking-widest uppercase text-xs md:text-sm transition-colors duration-300">
                        {dim.ctaText}
                      </span>
                      <div 
                        className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2"
                        style={{ backgroundColor: dim.themeColor }}
                      >
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Abstract Visual Side (Optimized for 60fps) */}
                <div className="w-full md:w-[45%] h-[45%] md:h-full relative overflow-hidden flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5">
                  {/* Static Glowing Aura (No heavy JS loops) */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${dim.themeColor} 0%, transparent 60%)` }}
                  />
                  
                  {/* Floating Icon tied to scroll (Hardware accelerated) */}
                  <motion.div 
                    style={{ rotate: iconRotate }}
                    className="relative z-10 will-change-transform transform-gpu"
                  >
                    <dim.icon 
                      className="w-40 h-40 md:w-72 md:h-72" 
                      style={{ color: dim.themeColor, filter: `drop-shadow(0 0 30px ${dim.themeColor}40)` }} 
                      strokeWidth={0.5} 
                    />
                  </motion.div>

                  {/* Static Glass Accents */}
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-2xl bg-white/5 transform rotate-45" />
                  <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-white/5 rounded-full bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress Bar at Bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full origin-left will-change-transform transform-gpu"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------
export function Solucoes() {
  const heroRef = useRef<HTMLElement>(null);
  // Only play heavy hero animations when hero is visible
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.1 });

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

      {/* OPTIMIZED VIBRANT HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20 bg-[#020205]">
        
        {/* Animated Liquid Background Orbs (Pause when scrolled out of view) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
          <motion.div 
            animate={isHeroInView ? { x: [0, 50, 0], y: [0, -25, 0] } : {}}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-[100px] rounded-full will-change-transform transform-gpu"
          />
          <motion.div 
            animate={isHeroInView ? { x: [0, -50, 0], y: [0, 50, 0] } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[100px] rounded-full will-change-transform transform-gpu"
          />
          <motion.div 
            animate={isHeroInView ? { x: [0, 25, 0], y: [0, 25, 0] } : {}}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full will-change-transform transform-gpu"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/10 mb-8 shadow-xl"
          >
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">Nossas Dimensões</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[1] mb-8 text-white drop-shadow-2xl"
          >
            A fundação de <br/> ambientes críticos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-3xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
          >
            Apresentamos o ecossistema Sonus. Engenharia audiovisual vibrante, impecável e desenhada para não falhar.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Role para Explorar</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
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
