import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { lazy, Suspense, useRef } from "react";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/ui/FadeIn";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionCard3D } from "@/components/ui/SolutionCard3D";
import { Vote, Users, Mic2, HeartHandshake, Cpu } from "lucide-react";

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })));
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Especialidades e Arquitetura Tecnológica Sonus",
  "description": "Conheça nossas verticais de atuação em Plenários, Salas Corporativas, Auditórios, Igrejas e o Ecossistema Q-SYS.",
  "url": "https://sonusproaudio.com.br/solucoes"
};

export function Solucoes() {
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensions = [
    {
      title: "Plenários e Câmaras",
      headline: "A Soberania do Som e da Imagem.",
      description: "Projetos executivos de alta precisão para o legislativo. Votação eletrônica nominal, geração de atas digitais e rastreamento inteligente de câmeras PTZ. Sessões impecáveis e sem margem para falhas técnicas.",
      ctaText: "Acessar Plenários",
      link: "/plenarios-e-camaras",
      icon: Vote,
      themeColor: "#06b6d4", // Cyan
      reverse: false
    },
    {
      title: "Salas Corporativas",
      headline: "Videoconferência de Alto Padrão.",
      description: "Padronização tecnológica definitiva para salas de conselho e diretorias. Áudio e vídeo perfeitamente integrados, eliminando atritos tecnológicos e elevando o nível de comunicação global da sua empresa.",
      ctaText: "Explorar Corporativo",
      link: "/salas-reuniao",
      icon: Users,
      themeColor: "#3b82f6", // Blue
      reverse: true
    },
    {
      title: "Auditórios e Teatros",
      headline: "Engenharia Acústica em Grande Escala.",
      description: "Sistemas de sonorização de alta performance projetados milimetricamente para a geometria do seu espaço. Cobertura sonora uniforme que garante clareza absoluta, do palco ao último assento.",
      ctaText: "Conhecer Auditórios",
      link: "/auditorios-e-teatros",
      icon: Mic2,
      themeColor: "#10b981", // Emerald
      reverse: false
    },
    {
      title: "Igrejas e Templos",
      headline: "A Mensagem Entregue com Clareza.",
      description: "Sistemas audiovisuais que respeitam a arquitetura do templo enquanto proporcionam impacto sonoro e conforto vocal incomparáveis. Operação intuitiva desenhada tanto para engenheiros de som quanto para voluntários.",
      ctaText: "Ver Projetos de Igrejas",
      link: "/igrejas-e-templos",
      icon: HeartHandshake,
      themeColor: "#f59e0b", // Amber
      reverse: true
    },
    {
      title: "Plataforma Q-SYS",
      headline: "O Cérebro da Integração AV.",
      description: "Uma infraestrutura de processamento de ponta baseada puramente em software. O ecossistema Q-SYS elimina a complexidade técnica, centralizando o roteamento de áudio, vídeo e automação do ambiente com estabilidade extrema.",
      ctaText: "Descobrir o Q-SYS",
      link: "/qsys",
      icon: Cpu,
      themeColor: "#8b5cf6", // Purple
      reverse: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#020205] text-white selection:bg-blue-500/30 overflow-hidden">
      <Helmet>
        <title>Ecossistema de Soluções | Sonus Pro AV</title>
      </Helmet>
      <SEO 
        schema={schema}
        title="Ecossistema de Soluções | Sonus Pro AV" 
        description="Conheça nossas verticais de engenharia audiovisual: Plenários, Salas Corporativas, Auditórios, Igrejas e Integração Q-SYS." 
        url="https://sonusproaudio.com.br/solucoes"
      />

      <Navbar />

      <main ref={containerRef} className="relative pt-32 pb-20">
        
        {/* Background Ambient */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Dust and glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
          <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-4 max-w-7xl mx-auto pt-10 md:pt-20 pb-20 md:pb-32 text-center flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-mono tracking-widest uppercase text-zinc-300">Arquitetura Tecnológica</span>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl">
            <Reveal>
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[1.05] mb-8">
                Construindo a fundação de ambientes críticos.
              </h1>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
                Não fornecemos equipamentos avulsos. Desenvolvemos ecossistemas complexos de áudio, vídeo e automação, desenhados cirurgicamente para as exigências do seu setor.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* The Vertical Timeline */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 pb-32">
          
          {/* Central Line (Visible on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          
          <div className="space-y-32 md:space-y-48">
            {dimensions.map((dim, index) => (
              <FadeIn key={index} delay={0.2}>
                <SolutionCard3D {...dim} />
              </FadeIn>
            ))}
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
