import { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Mic, Video, CheckCircle2, Cctv, Cpu, Radio, MonitorPlay, Vote, Timer, Tv, Cable, 
  ChevronRight, Check, X, ShieldCheck, Network, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { SEO } from '@/components/SEO';
import { Navbar } from '@/components/layout/Navbar';
import { Reveal } from '@/components/ui/Reveal';
import { FadeIn } from '@/components/ui/FadeIn';
import { Magnetic } from '@/components/ui/Magnetic';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const WarrantyBanner = lazy(() => import('@/components/layout/WarrantyBanner').then(m => ({ default: m.WarrantyBanner })));
const AeoFaq = lazy(() => import('@/components/ui/AeoFaq').then(m => ({ default: m.AeoFaq })));
const TestimonialSection = lazy(() => import('@/components/ui/TestimonialSection').then(m => ({ default: m.TestimonialSection })));
const LPFooter = lazy(() => import('@/components/layout/LPFooter').then(m => ({ default: m.LPFooter })));
const WhatsAppButton = lazy(() => import('@/components/layout/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
const StickyCtaBar = lazy(() => import('@/components/ui/StickyCtaBar').then(m => ({ default: m.StickyCtaBar })));

// Component: VotingLedWallMockup
function VotingLedWallMockup() {
  const [simVotes, setSimVotes] = useState(0);
  const [naoVotes, setNaoVotes] = useState(0);

  useEffect(() => {
    const simTimer = setInterval(() => {
      setSimVotes(prev => (prev < 14 ? prev + 1 : prev));
    }, 100);
    const naoTimer = setInterval(() => {
      setNaoVotes(prev => (prev < 3 ? prev + 1 : prev));
    }, 400);

    return () => {
      clearInterval(simTimer);
      clearInterval(naoTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-16 aspect-[21/9] bg-black border-4 border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-center items-center p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none mix-blend-overlay"></div>
      
      <Reveal className="w-full">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-5xl font-mono text-zinc-400 tracking-widest uppercase">Projeto de Lei 042/2026</h3>
          <p className="text-zinc-600 mt-2 font-mono text-xl flex items-center justify-center gap-2">
            <Timer size={16} /> EM VOTAÇÃO <Timer size={16} />
          </p>
        </div>
      </Reveal>

      <div className="flex w-full justify-between items-end px-12 md:px-24">
        <div className="flex flex-col items-center">
          <span className="text-green-500 text-7xl md:text-9xl font-black font-mono leading-none glow-green">{simVotes.toString().padStart(2, '0')}</span>
          <span className="text-green-500 font-mono text-2xl mt-4 tracking-widest flex items-center gap-2"><Check size={20} /> SIM</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-zinc-500 text-6xl md:text-8xl font-black font-mono leading-none">00</span>
          <span className="text-zinc-500 font-mono text-xl mt-4 tracking-widest flex items-center gap-2"><Settings size={16} /> ABS</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-red-500 text-7xl md:text-9xl font-black font-mono leading-none glow-red">{naoVotes.toString().padStart(2, '0')}</span>
          <span className="text-red-500 font-mono text-2xl mt-4 tracking-widest flex items-center gap-2"><X size={20} /> NÃO</span>
        </div>
      </div>
      
      <style>{`
        .glow-green { text-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
        .glow-red { text-shadow: 0 0 20px rgba(239, 68, 68, 0.8); }
      `}</style>
    </div>
  );
}

// Component: PlenaryBlueprint
function PlenaryBlueprint() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Cérebro Q-SYS", icon: Cpu, desc: "Processamento de áudio, vídeo e controle centralizado." },
    { id: 1, title: "Captação Shure", icon: Mic, desc: "Microfonia digital com rejeição de ruído e automix." },
    { id: 2, title: "Câmeras PTZ", icon: Cctv, desc: "Rastreamento automático de orador com precisão broadcast." },
    { id: 3, title: "Votação Eletrônica", icon: Vote, desc: "Sistema integrado, biométrico e à prova de fraudes." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto mt-16">
      <div className="lg:col-span-4 flex flex-col gap-4">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                  : 'bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-3 rounded-lg ${isActive ? 'bg-blue-500 text-black' : 'bg-zinc-900 text-zinc-400'}`}>
                  <Icon size={24} />
                </div>
                <h4 className={`text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>{tab.title}</h4>
              </div>
              <p className={`text-sm ${isActive ? 'text-blue-100' : 'text-zinc-600'}`}>{tab.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8 bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden relative min-h-[400px] flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {activeTab === 0 && (
              <div className="relative flex flex-col items-center">
                <div className="w-32 h-32 border-4 border-blue-500 rounded-2xl flex items-center justify-center bg-blue-900/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] mb-8">
                  <Cpu size={64} className="text-blue-400" />
                </div>
                <div className="flex gap-16 relative">
                  <div className="flex flex-col items-center"><Mic size={32} className="text-zinc-500 mb-2" /><div className="w-px h-16 bg-blue-500/50 absolute top-[-30px]"></div></div>
                  <div className="flex flex-col items-center"><Cctv size={32} className="text-zinc-500 mb-2" /><div className="w-px h-16 bg-blue-500/50 absolute top-[-30px]"></div></div>
                  <div className="flex flex-col items-center"><Vote size={32} className="text-zinc-500 mb-2" /><div className="w-px h-16 bg-blue-500/50 absolute top-[-30px]"></div></div>
                  <div className="flex flex-col items-center"><Radio size={32} className="text-zinc-500 mb-2" /><div className="w-px h-16 bg-blue-500/50 absolute top-[-30px]"></div></div>
                </div>
                <p className="mt-8 text-zinc-400 font-mono">CORE 110f // PROCESSING // ROUTING // CONTROL</p>
              </div>
            )}
            
            {activeTab === 1 && (
              <div className="relative flex flex-col items-center w-full">
                <div className="flex gap-8 mb-12">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center relative mb-4">
                        <div className="absolute w-16 h-16 border border-blue-500/30 rounded-full animate-ping opacity-50"></div>
                        <Mic size={16} className="text-blue-400" />
                      </div>
                      <div className="w-px h-8 bg-zinc-700"></div>
                    </div>
                  ))}
                </div>
                <div className="w-3/4 h-3 rounded-full bg-zinc-800 overflow-hidden relative flex items-center justify-between px-2">
                   <motion.div 
                     animate={{ width: ["0%", "100%", "0%"] }} 
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute top-0 left-0 h-full bg-blue-500" 
                   />
                </div>
                <div className="flex gap-4 mt-8">
                  <Cable size={24} className="text-zinc-500" />
                  <p className="text-zinc-400 font-mono">MXCW // DIGITAL MICROFONY // INTELLI-MIX // DANTE</p>
                  <Network size={24} className="text-zinc-500" />
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="relative flex flex-col items-center w-full">
                <div className="flex justify-between w-3/4 mb-16 relative">
                  <div className="flex flex-col items-center relative z-10">
                    <Cctv size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <div className="absolute top-full left-1/2 w-48 h-48 bg-blue-500/10 clip-triangle -translate-x-1/2 origin-top transform scale-y-150"></div>
                  </div>
                  <div className="flex flex-col items-center relative z-10">
                    <Mic size={32} className="text-white bg-zinc-800 p-2 rounded-full mt-24 z-20" />
                  </div>
                  <div className="flex flex-col items-center relative z-10">
                    <Cctv size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <div className="absolute top-full left-1/2 w-48 h-48 bg-blue-500/10 clip-triangle -translate-x-1/2 origin-top transform scale-y-150"></div>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Video size={24} className="text-zinc-500" />
                  <p className="text-zinc-400 font-mono">SEAMLESS SWITCHING // AUTO-TRACKING // NDI // SDI</p>
                  <Tv size={24} className="text-zinc-500" />
                </div>
                <style>{`
                  .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
                `}</style>
              </div>
            )}

            {activeTab === 3 && (
              <div className="relative flex flex-col items-center w-full">
                <div className="grid grid-cols-3 gap-4 w-2/3 mb-8">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className={`p-4 border rounded-lg flex items-center justify-center ${i === 4 ? 'bg-green-900/40 border-green-500' : i === 7 ? 'bg-red-900/40 border-red-500' : 'bg-zinc-900/50 border-zinc-800'}`}>
                        {i === 4 ? <Check size={24} className="text-green-400"/> : i === 7 ? <X size={24} className="text-red-400" /> : <div className="w-6 h-6 rounded-full bg-zinc-800"></div>}
                     </div>
                   ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <ShieldCheck size={24} className="text-zinc-500" />
                  <p className="text-zinc-400 font-mono">VOTE CAST // BIOMETRIC VERIFIED // TAMPER-PROOF</p>
                  <MonitorPlay size={24} className="text-zinc-500" />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


export function PlenariosLanding() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 font-sans">
      <SEO 
        title="Plenários do Futuro | Sonus"
        description="Tecnologia de ponta para assembleias, câmaras e plenários. Áudio digital, vídeo tracking e votação integrada."
      />
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202] pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal className="w-full">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 flex flex-col items-center gap-4">
              <Magnetic>
                <span className="text-white">O Plenário<br/>do Futuro.</span>
              </Magnetic>
            </h1>
          </Reveal>
          <Reveal className="w-full" delay={0.2}>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
              Abandone a obsolescência. Controle total, transparência absoluta e confiabilidade inabalável para o legislativo.
            </p>
          </Reveal>
          
          <FadeIn delay={0.4}>
            <VotingLedWallMockup />
          </FadeIn>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="py-12 border-y border-zinc-900 bg-black">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-mono text-zinc-500 mb-8 uppercase tracking-widest flex items-center justify-center gap-2">Homologado e Certificado com Tecnologias Globais <ChevronRight size={16}/></p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/shure-logo.png" alt="Shure" className="h-8 md:h-12 object-contain filter invert" />
            <img src="/qsys-logo.png" alt="Q-SYS" className="h-8 md:h-12 object-contain filter invert" />
            <img src="/marcas/qsc.png" alt="QSC" className="h-8 md:h-10 object-contain filter invert" />
            <img src="/marcas/sennheiser.svg" alt="Sennheiser" className="h-8 md:h-10 object-contain filter invert" />
          </div>
        </div>
      </section>

      {/* 3. Pain Points (Brutalist White Section) */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black mb-20 tracking-tighter uppercase leading-none">
              O custo da<br/>obsolescência.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Microfonia e Caos", desc: "Sistemas analógicos instáveis que interrompem sessões e comprometem a clareza das falas." },
              { num: "02", title: "Votação Contestada", desc: "Painéis ultrapassados, contagem manual e falta de transparência que geram desconfiança." },
              { num: "03", title: "Cabos Expostos", desc: "Instalações amadoras e perigosas, sem padrão técnico ou documentação de engenharia." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="pt-8 border-t-4 border-black">
                  <span className="text-3xl font-black font-mono mb-4 block">{item.num}.</span>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-zinc-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Blueprint Ecosystem */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Settings className="text-blue-500 animate-spin-slow" size={32} />
              <span className="text-blue-500 font-mono tracking-widest uppercase">Arquitetura de Sistema</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Engenharia de Ponta.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Projetamos ecossistemas convergentes onde áudio, vídeo, automação e dados fluem nativamente através da rede (AVoIP).
            </p>
          </Reveal>

          <PlenaryBlueprint />
        </div>
      </section>

      {/* 5. Direct Comparison Table */}
      <section className="py-32 bg-[#020202]">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black mb-20 text-center tracking-tighter">A Diferença é Brutal.</h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* O Padrão Antigo */}
            <SpotlightCard className="bg-[#0a0a0a] border border-red-900/30 p-8 md:p-12">
              <h3 className="text-3xl font-black mb-8 text-red-500 flex items-center gap-4">
                <X size={32} /> O Padrão Antigo
              </h3>
              <ul className="space-y-6">
                {[
                  "Microfones analógicos propensos a interferência",
                  "Câmeras manuais operadas por terceiros",
                  "Painel de votação isolado e obsoleto",
                  "Cabos espalhados sem infraestrutura estruturada",
                  "Sem integração com transmissão ao vivo"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-zinc-400">
                    <X className="text-red-500 shrink-0 mt-1" size={20} />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            {/* Padrão Sonus */}
            <SpotlightCard className="bg-[#0a0a0a] border border-blue-500/30 p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-blue-500 text-black font-black text-xs uppercase tracking-widest rounded-bl-xl">Estado da Arte</div>
              <h3 className="text-3xl font-black mb-8 text-white flex items-center gap-4">
                <CheckCircle2 size={32} className="text-blue-500" /> Padrão Sonus
              </h3>
              <ul className="space-y-6">
                {[
                  "Rede AVoIP (Dante) com áudio imune a ruídos",
                  "Auto-tracking via inteligência artificial (PTZ)",
                  "Votação integrada com painel LED customizado",
                  "Infraestrutura seca, certificada e normatizada",
                  "Transmissão automatizada para YouTube/TV"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-zinc-300">
                    <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={20} />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 6. Vertical Timeline */}
      <section className="py-32 bg-[#050505] relative">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black mb-24 text-center tracking-tighter">Processo de Implantação.</h2>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform md:-translate-x-1/2"></div>

            {[
              { title: "Levantamento Técnico", desc: "Análise acústica, de rede e infraestrutura do plenário atual." },
              { title: "Projeto Executivo", desc: "Desenho unifilar, especificação de equipamentos e topologia de rede." },
              { title: "Instalação Cirúrgica", desc: "Execução normatizada, passagem de cabos estruturados e montagem de racks." },
              { title: "Sessão Inaugural", desc: "Comissionamento, treinamento da equipe e acompanhamento da primeira sessão." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 md:odd:flex-row-reverse group">
                
                {/* Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-zinc-600 group-hover:border-blue-500 group-hover:bg-blue-500 transition-colors transform -translate-x-1/2 z-10 mt-1 md:mt-0"></div>

                {/* Content */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  <FadeIn delay={i * 0.1}>
                    <SpotlightCard className="p-8 bg-[#0a0a0a] border border-zinc-800">
                      <span className="text-blue-500 font-mono font-bold mb-2 block">FASE 0{i+1}</span>
                      <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                      <p className="text-zinc-400">{step.desc}</p>
                    </SpotlightCard>
                  </FadeIn>
                </div>
                
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Suspense Footer Block */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-zinc-500">Carregando seções...</div>}>
        <WarrantyBanner />
        <AeoFaq faqs={[{question: "Como funciona a votação eletrônica?", answer: "Nossos sistemas possuem integração nativa com os principais hardwares, garantindo registro imutável dos votos."}]} />
        <TestimonialSection />
        <LPFooter />
        <WhatsAppButton />
        <StickyCtaBar />
      </Suspense>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
