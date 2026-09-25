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

// ---------------------------------------------
// STACKING CARD COMPONENT
// ---------------------------------------------
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

interface StackingCardProps {
  dim: DimensionItem;
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

function StackingCard({ dim, index, progress, range, targetScale }: StackingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-10vh + ${index * 25}px)` }} 
        className="relative w-full max-w-[90vw] md:max-w-7xl h-[80vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] origin-top border border-white/10"
      >
        {/* Cinematic Image Background */}
        <div className="absolute inset-0 w-full h-full bg-[#020205]">
          <motion.img 
            style={{ scale: imageScale }}
            src={dim.image} 
            alt={dim.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten"
          />
          {/* Vibrant Color Gradient Overlay to bring LIFE and remove the "dark/boring" feel */}
          <div 
            className="absolute inset-0 mix-blend-color opacity-50"
            style={{ backgroundColor: dim.themeColor }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/60 to-transparent md:w-2/3" />
        </div>

        {/* Floating 3D Icon Background Element */}
        <div className="absolute right-[-10%] top-[-10%] opacity-10 pointer-events-none mix-blend-screen hidden md:block">
          <dim.icon className="w-[800px] h-[800px]" style={{ color: dim.themeColor }} strokeWidth={0.5} />
        </div>

        {/* Card Content */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-8">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: dim.themeColor, boxShadow: `0 0 15px ${dim.themeColor}` }} />
              <span className="text-sm font-bold tracking-widest uppercase text-white drop-shadow-md">{dim.title}</span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black text-white tracking-tighter leading-[1.05] mb-6 drop-shadow-2xl">
              {dim.headline}
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-200 font-medium leading-relaxed mb-10 drop-shadow-lg max-w-xl">
              {dim.description}
            </p>

            <Link to={dim.link} className="inline-block group">
              <div 
                className="relative overflow-hidden h-16 px-8 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl flex items-center gap-4 transition-all duration-500 hover:border-white/40"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${dim.themeColor}30, transparent)` }}
                />
                <span className="relative z-10 text-white font-black tracking-widest uppercase text-sm md:text-base">
                  {dim.ctaText}
                </span>
                <div 
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2"
                  style={{ backgroundColor: dim.themeColor }}
                >
                  <ArrowRight className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              </div>
            </Link>
          </div>
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
      description: "Projetos executivos de alta precisão para o legislativo. Votação eletrônica nominal, geração de atas digitais e rastreamento inteligente de câmeras PTZ. Sessões impecáveis e sem margem para falhas.",
      ctaText: "Acessar Plenários",
      link: "/plenarios-e-camaras",
      icon: Vote,
      themeColor: "#06b6d4", // Cyan
      image: "/concordia.webp" // Reusing an existing high-res image
    },
    {
      title: "Salas Corporativas",
      headline: "Videoconferência de Alto Padrão.",
      description: "Padronização tecnológica definitiva para salas de conselho e diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos e elevando a comunicação global da sua empresa.",
      ctaText: "Explorar Corporativo",
      link: "/salas-reuniao",
      icon: Users,
      themeColor: "#3b82f6", // Blue
      image: "/salas-corporativas.webp"
    },
    {
      title: "Auditórios e Teatros",
      headline: "Engenharia Acústica em Grande Escala.",
      description: "Sistemas de sonorização de alta performance projetados milimetricamente para a geometria do seu espaço. Cobertura sonora uniforme que garante clareza absoluta, do palco ao último assento.",
      ctaText: "Conhecer Auditórios",
      link: "/auditorios-e-teatros",
      icon: Mic2,
      themeColor: "#10b981", // Emerald
      image: "/auditorio-sonus.webp"
    },
    {
      title: "Igrejas e Templos",
      headline: "A Mensagem Entregue com Clareza.",
      description: "Sistemas audiovisuais que respeitam a arquitetura sagrada proporcionando impacto sonoro e inteligibilidade incomparáveis. Operação intuitiva desenhada tanto para engenheiros quanto para voluntários.",
      ctaText: "Ver Projetos de Igrejas",
      link: "/igrejas-e-templos",
      icon: HeartHandshake,
      themeColor: "#f59e0b", // Amber
      image: "/interior-matriz-xanxere.webp"
    },
    {
      title: "Plataforma Q-SYS",
      headline: "O Cérebro da Integração AV.",
      description: "Uma infraestrutura baseada puramente em software que centraliza o roteamento de áudio, vídeo e automação do ambiente com estabilidade de missão crítica, eliminando falhas de hardware.",
      ctaText: "Descobrir o Q-SYS",
      link: "/qsys",
      icon: Cpu,
      themeColor: "#8b5cf6", // Purple
      image: "/qsys-tech-bg.webp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#020205] text-white selection:bg-blue-500/30">
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
      <section className="relative h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-mono tracking-widest uppercase text-zinc-300">Não vendemos caixas de som</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          >
            Construímos a fundação de ambientes críticos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Apresentamos as 5 verticais do ecossistema Sonus. Projetos audiovisuais executados milimetricamente para o seu setor.
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Explore as Dimensões</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </section>

      {/* Stacking Cards Section */}
      <main ref={containerRef} className="relative w-full bg-[#020205] pb-[10vh]">
        {dimensions.map((dim, index) => {
          const targetScale = 1 - ((dimensions.length - index) * 0.04);
          return (
            <StackingCard 
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

      <Suspense fallback={null}>
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
