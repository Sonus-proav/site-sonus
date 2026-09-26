const fs = require('fs');

const content = `import { Helmet } from "react-helmet-async";
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
    bgGradient: "from-cyan-900/20 via-cyan-950/10 to-transparent"
  },
  {
    title: "Salas Corporativas",
    headline: "Videoconferência de Alto Padrão.",
    description: "Padronização tecnológica para diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos em reuniões globais.",
    ctaText: "Explorar Corporativo",
    link: "/salas-reuniao",
    icon: Users,
    themeColor: "#3b82f6",
    bgGradient: "from-blue-900/20 via-blue-950/10 to-transparent"
  },
  {
    title: "Auditórios e Teatros",
    headline: "Acústica Profissional em Grande Escala.",
    description: "Sonorização de alta inteligibilidade projetada para a geometria do espaço. Cobertura uniforme que garante clareza do palco ao último assento.",
    ctaText: "Conhecer Auditórios",
    link: "/auditorios-e-teatros",
    icon: Mic2,
    themeColor: "#10b981",
    bgGradient: "from-emerald-900/20 via-emerald-950/10 to-transparent"
  },
  {
    title: "Igrejas e Templos",
    headline: "A Mensagem Entregue com Clareza.",
    description: "Sistemas que respeitam a arquitetura sagrada e proporcionam impacto sonoro incomparável. Operação desenhada para conforto de voluntários.",
    ctaText: "Ver Projetos",
    link: "/igrejas-e-templos",
    icon: HeartHandshake,
    themeColor: "#f59e0b",
    bgGradient: "from-amber-900/20 via-amber-950/10 to-transparent"
  },
  {
    title: "Plataforma Q-SYS",
    headline: "O Cérebro da Integração AV.",
    description: "Uma infraestrutura baseada puramente em software que centraliza áudio, vídeo e automação com estabilidade extrema, eliminando falhas de hardware.",
    ctaText: "Descobrir o Q-SYS",
    link: "/qsys",
    icon: Cpu,
    themeColor: "#8b5cf6",
    bgGradient: "from-purple-900/20 via-purple-950/10 to-transparent"
  }
];

function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#020205]">
      
      {/* Global Background Particles/Glows reacting to scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex w-[500vw] will-change-transform transform-gpu"
        >
          {dimensions.map((dim, index) => (
            <div key={index} className="w-[100vw] h-full flex items-center justify-center p-4 md:p-8 relative">
              
              <div className={\`relative w-full max-w-[1300px] h-[85vh] md:h-[75vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_80px_-20px_rgba(0,0,0,1)] border border-white/5 bg-[#030303] group\`}>
                
                {/* Dynamic Inner Glow */}
                <div 
                  className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none transition-opacity duration-1000 group-hover:opacity-60"
                  style={{ background: \`radial-gradient(circle at 100% 50%, \${dim.themeColor}15 0%, transparent 50%)\` }}
                />

                {/* Content Side */}
                <div className="w-full md:w-1/2 h-[50%] md:h-full p-8 md:p-16 flex flex-col justify-center relative z-10">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 mb-8 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                    <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: dim.themeColor, color: dim.themeColor }} />
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/80">{dim.title}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-xl">
                    {dim.headline}
                  </h2>
                  
                  <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
                    {dim.description}
                  </p>

                  <Link to={dim.link} className="w-fit">
                    <div className="relative group/btn flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-6 pr-2 py-2 transition-all duration-300">
                      <span className="text-white font-bold tracking-widest uppercase text-xs transition-colors duration-300">
                        {dim.ctaText}
                      </span>
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        style={{ backgroundColor: dim.themeColor }}
                      >
                        <ArrowRight className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 3D Sci-Fi Hologram Side */}
                <div className="w-full md:w-1/2 h-[50%] md:h-full relative overflow-hidden flex items-center justify-center bg-black/50 border-t md:border-t-0 md:border-l border-white/5">
                  
                  {/* Perspective Grid Floor */}
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(75deg)_translateY(-100px)] opacity-60 [mask-image:linear-gradient(to_top,black_10%,transparent_100%)]" />

                  {/* Vertical Light Beam */}
                  <div 
                    className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] h-[120%] opacity-20 mix-blend-screen pointer-events-none blur-[40px]"
                    style={{ background: \`linear-gradient(to bottom, \${dim.themeColor} 0%, transparent 100%)\` }} 
                  />

                  {/* Holographic Installation */}
                  <div className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 ease-out">
                    
                    {/* Floating Orb/Cube */}
                    <motion.div 
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                    >
                      {/* Rings */}
                      <motion.div 
                        animate={{ rotate: 360, rotateX: 65, rotateY: 15 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[3px] border-dashed rounded-full opacity-30"
                        style={{ borderColor: dim.themeColor }}
                      />
                      <motion.div 
                        animate={{ rotate: -360, rotateX: 65, rotateY: 15 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-solid rounded-full opacity-60"
                        style={{ borderColor: dim.themeColor }}
                      />

                      {/* Glass Prism */}
                      <div className="absolute inset-1/4 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden"
                           style={{ boxShadow: \`0 0 50px \${dim.themeColor}30, inset 0 0 30px \${dim.themeColor}30\` }}>
                        
                        {/* Scanning Laser inside Prism */}
                        <motion.div 
                          animate={{ y: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-[2px] opacity-70 z-20"
                          style={{ background: \`linear-gradient(90deg, transparent, \${dim.themeColor}, transparent)\`, boxShadow: \`0 0 20px \${dim.themeColor}\` }}
                        />

                        {/* Icon */}
                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                          <dim.icon 
                            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl" 
                            style={{ color: dim.themeColor, filter: \`drop-shadow(0 0 20px \${dim.themeColor}80)\` }} 
                            strokeWidth={1}
                          />
                        </div>
                      </div>

                      {/* Particle Orbits */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-20%] border border-transparent rounded-full"
                      >
                        <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_currentColor]" style={{ backgroundColor: dim.themeColor, color: dim.themeColor }} />
                      </motion.div>
                    </motion.div>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white rounded-full origin-left will-change-transform transform-gpu"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}

export function Solucoes() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.1 });

  return (
    <div className="flex flex-col min-h-screen bg-[#020205] text-white selection:bg-white/30 font-sans">
      <Helmet>
        <title>Ecossistema de Soluções | Sonus Pro AV</title>
      </Helmet>
      <SEO 
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de tecnologia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20 bg-[#020205]">
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
          <motion.div 
            animate={isHeroInView ? { x: [0, 50, 0], y: [0, -25, 0] } : {}}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] md:blur-[150px] rounded-full will-change-transform transform-gpu"
          />
          <motion.div 
            animate={isHeroInView ? { x: [0, -50, 0], y: [0, 50, 0] } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] md:blur-[150px] rounded-full will-change-transform transform-gpu"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 shadow-xl"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white">Nossas Dimensões</span>
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
            className="text-lg md:text-3xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Apresentamos o ecossistema Sonus. Integração audiovisual vibrante, impecável e desenhada para não falhar.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Role para Explorar</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </motion.div>
      </section>

      <HorizontalScrollGallery />

      <Suspense fallback={null}>
        <WhatsAppButton message="Olá! Gostaria de falar sobre os projetos e soluções da Sonus." />
        <LPFooter />
      </Suspense>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Solucoes.tsx', content);
console.log("Solucoes.tsx has been rebuilt completely!");
