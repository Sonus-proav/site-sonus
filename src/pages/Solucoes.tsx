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
}

// ---------------------------------------------
// ACOUSTIC MINIMALISM STACKING CARD
// ---------------------------------------------
function MinimalistStackingCard({ dim, index, progress, range, targetScale }: {
  dim: DimensionItem;
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const overlayOpacity = useTransform(progress, range, [0, 0.7]);

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${index * 15}px)` }} 
        className="relative w-full max-w-[1200px] h-[80vh] md:h-[70vh] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col-reverse md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] origin-top bg-[#121214] border border-white/5 will-change-transform"
      >
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none z-50"
        />

        {/* LEFT PANEL: Clean Editorial Content */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10 bg-[#0d0d0f]">
          <div className="relative">
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-6 block">
              {String(index + 1).padStart(2, '0')} // {dim.title}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              {dim.headline}
            </h2>
            
            <p className="text-base md:text-lg text-zinc-400 font-normal leading-relaxed mb-10 max-w-md">
              {dim.description}
            </p>

            <Link to={dim.link} className="inline-flex items-center gap-4 group">
              <span className="text-sm font-semibold tracking-wider uppercase text-white group-hover:text-zinc-300 transition-colors">
                {dim.ctaText}
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* RIGHT PANEL: Acoustic Grille Texture & Minimalist Icon */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden bg-[#18181b] border-b md:border-b-0 md:border-l border-white/5">
          {/* Acoustic Perforated Mesh Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#18181b]/50 to-[#18181b]" />

          {/* Clean, Massive Icon representing the hardware/concept */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
            <dim.icon className="w-64 h-64 md:w-[400px] md:h-[400px] text-white" strokeWidth={0.5} />
          </div>
          
          {/* Front Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <dim.icon className="w-16 h-16 md:w-24 md:h-24 text-zinc-300 drop-shadow-2xl" strokeWidth={1} />
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
      headline: "Transparência e Controle no Legislativo.",
      description: "Votação eletrônica, microfonação individual e transmissão automatizada. O ambiente perfeito para a tomada de decisões públicas sem interrupções técnicas.",
      ctaText: "Acessar Plenários",
      link: "/plenarios-e-camaras",
      icon: Vote,
    },
    {
      title: "Salas Corporativas",
      headline: "Videoconferência Sem Fricção.",
      description: "Salas de reunião onde a tecnologia desaparece. Áudio claro e vídeo fluido para diretorias que exigem conexão imediata e simplificada com o mundo.",
      ctaText: "Explorar Corporativo",
      link: "/salas-reuniao",
      icon: Users,
    },
    {
      title: "Auditórios e Teatros",
      headline: "Cobertura Sonora Cirúrgica.",
      description: "Da acústica do ambiente à instalação de Line Arrays. Projetamos auditórios onde a voz do palestrante alcança a última fileira com a mesma clareza da primeira.",
      ctaText: "Conhecer Auditórios",
      link: "/auditorios-e-teatros",
      icon: Mic2,
    },
    {
      title: "Igrejas e Templos",
      headline: "A Palavra no Centro de Tudo.",
      description: "Sistemas sonoros que respeitam a estética do templo e resolvem o desafio da reverberação. Inteligibilidade máxima para que a mensagem seja sempre ouvida.",
      ctaText: "Ver Projetos",
      link: "/igrejas-e-templos",
      icon: HeartHandshake,
    },
    {
      title: "Plataforma Q-SYS",
      headline: "Controle Centralizado.",
      description: "Uma central de comando única. Elimine racks confusos e cabos soltos com uma plataforma de software que orquestra todo o áudio e vídeo do seu prédio.",
      ctaText: "Descobrir o Q-SYS",
      link: "/qsys",
      icon: Cpu,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white selection:bg-zinc-800 font-sans">
      <Helmet>
        <title>Especialidades | Sonus Pro AV</title>
      </Helmet>
      <SEO 
        title="Especialidades | Sonus Pro AV" 
        description="Engenharia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      {/* SOBER, IMPOSING HERO */}
      <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
              Engenharia Audiovisual
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-zinc-100"
          >
            Arquitetura Audiovisual.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Projetamos, integramos e instalamos a tecnologia que dá vida aos espaços institucionais mais importantes do Sul do Brasil.
          </motion.p>
        </div>
      </section>

      {/* Stacking Cards Section */}
      <main ref={containerRef} className="relative w-full bg-[#09090b] pb-[15vh]">
        {dimensions.map((dim, index) => {
          const targetScale = 1 - ((dimensions.length - index) * 0.02);
          return (
            <MinimalistStackingCard 
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
