import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense, useRef } from "react";
import { SEO } from "@/components/SEO";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  image: string;
}

// ---------------------------------------------
// PREMIUM EDITORIAL STACKING CARD
// ---------------------------------------------
function EditorialStackingCard({ dim, index, progress, range, targetScale }: {
  dim: DimensionItem;
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  

  // Scale the card down as it gets covered by the next one
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Smooth opacity fade out for the content as it gets covered
  const opacity = useTransform(progress, range, [1, 0.4]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div 
        style={{ scale, opacity, top: `calc(5vh + ${index * 20}px)` }} 
        className="relative w-full max-w-6xl h-[85vh] md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col-reverse md:flex-row shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] origin-top border border-white/10 bg-[#050508] will-change-transform"
      >
        {/* LEFT PANEL: Content (Highly Readable, Executive) */}
        <div className="w-full md:w-[55%] h-[50%] md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10">
          
          {/* Subtle Accent Glow */}
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{ background: `linear-gradient(90deg, ${dim.themeColor}, transparent)` }}
          />
          <div 
            className="absolute -left-32 -bottom-32 w-64 h-64 blur-[120px] rounded-full opacity-20 pointer-events-none"
            style={{ backgroundColor: dim.themeColor }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 md:mb-8 backdrop-blur-md">
              <dim.icon className="w-4 h-4" style={{ color: dim.themeColor }} />
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">{dim.title}</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-black text-white tracking-tighter leading-[1.05] mb-4 md:mb-6">
              {dim.headline}
            </h2>
            
            <p className="text-base md:text-xl text-zinc-400 font-light leading-relaxed mb-8 md:mb-10 max-w-lg">
              {dim.description}
            </p>

            <Link to={dim.link} className="inline-block group">
              <div 
                className="relative overflow-hidden h-14 md:h-16 px-6 md:px-8 rounded-full border border-white/20 bg-black/50 hover:bg-white transition-all duration-500 flex items-center gap-4 group-hover:border-transparent"
              >
                <span className="relative z-10 text-white group-hover:text-black font-black tracking-widest uppercase text-xs md:text-sm transition-colors duration-500">
                  {dim.ctaText}
                </span>
                <div 
                  className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2"
                  style={{ backgroundColor: dim.themeColor }}
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* RIGHT PANEL: High-Res Image (No messy blend modes, pure visual) */}
        <div className="w-full md:w-[45%] h-[50%] md:h-full relative overflow-hidden bg-black">
          {/* Smooth CSS Zoom on the image, perfectly performant */}
          <div className="absolute inset-0 transition-transform duration-[10s] ease-out hover:scale-110">
            <img 
              src={dim.image} 
              alt={dim.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          </div>
          
          {/* Gradient to blend the image seamlessly into the left panel on Desktop */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          {/* Gradient to blend the image seamlessly into the bottom panel on Mobile */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050508] to-transparent z-10" />
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------
export function Solucoes() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const dimensions: DimensionItem[] = [
    {
      title: "Plenários e Câmaras",
      headline: "A Soberania do Som e da Imagem.",
      description: "Projetos executivos de alta precisão para o legislativo. Votação eletrônica nominal, atas digitais automáticas e rastreamento de câmeras robóticas PTZ.",
      ctaText: "Acessar Plenários",
      link: "/plenarios-e-camaras",
      icon: Vote,
      themeColor: "#06b6d4", 
      image: "/concordia.webp" 
    },
    {
      title: "Salas Corporativas",
      headline: "Videoconferência de Alto Padrão.",
      description: "Padronização tecnológica definitiva para diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos em reuniões globais.",
      ctaText: "Explorar Corporativo",
      link: "/salas-reuniao",
      icon: Users,
      themeColor: "#3b82f6", 
      image: "/salas-corporativas.webp"
    },
    {
      title: "Auditórios e Teatros",
      headline: "Engenharia Acústica em Grande Escala.",
      description: "Sonorização de alta inteligibilidade projetada para a geometria do espaço. Cobertura uniforme que garante clareza do palco ao último assento.",
      ctaText: "Conhecer Auditórios",
      link: "/auditorios-e-teatros",
      icon: Mic2,
      themeColor: "#10b981", 
      image: "/auditorio-sonus.webp"
    },
    {
      title: "Igrejas e Templos",
      headline: "A Mensagem Entregue com Clareza.",
      description: "Sistemas que respeitam a arquitetura sagrada e proporcionam impacto sonoro incomparável. Operação desenhada para conforto de técnicos e voluntários.",
      ctaText: "Ver Projetos",
      link: "/igrejas-e-templos",
      icon: HeartHandshake,
      themeColor: "#f59e0b", 
      image: "/interior-matriz-xanxere.webp"
    },
    {
      title: "Plataforma Q-SYS",
      headline: "O Cérebro da Integração Audiovisual.",
      description: "Uma infraestrutura baseada puramente em software que centraliza áudio, vídeo e automação com estabilidade extrema, eliminando falhas de hardware.",
      ctaText: "Descobrir o Q-SYS",
      link: "/qsys",
      icon: Cpu,
      themeColor: "#8b5cf6", 
      image: "/qsys-tech-bg.webp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#020205] text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Ecossistema de Soluções | Sonus Pro AV</title>
      </Helmet>
      <SEO 
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de engenharia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      {/* Hero Intro */}
      <section className="relative h-[60vh] md:h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] mb-6 text-white"
          >
            A fundação de <br/> ambientes críticos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Apresentamos as 5 verticais do ecossistema Sonus. Engenharia audiovisual executada milimetricamente para o seu setor.
          </motion.p>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <main ref={containerRef} className="relative w-full bg-[#020205] pb-[10vh]">
        {dimensions.map((dim, index) => {
          const targetScale = 1 - ((dimensions.length - index) * 0.03);
          return (
            <EditorialStackingCard 
              key={index} 
              index={index} 
              dim={dim} 
              progress={scrollYProgress} 
              range={[index * 0.2, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>

      <section className="h-[10vh] bg-[#020205]" />

      <Suspense fallback={null}>
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
