import { useState, lazy, Suspense, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Mic, CheckCircle2, Cctv, Cpu, X, Loader2, FileText, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(m => ({ default: m.TestimonialSection })))
const StickyCtaBar = lazy(() => import("@/components/ui/StickyCtaBar").then(m => ({ default: m.StickyCtaBar })))
const WarrantyBanner = lazy(() => import("@/components/layout/WarrantyBanner").then(m => ({ default: m.WarrantyBanner })))
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })))
const AeoFaq = lazy(() => import("@/components/ui/AeoFaq").then(m => ({ default: m.AeoFaq })))


// ─── 3D Voting LED Wall Component ──────────────────────────────────
function VotingLedWall3D() {
  const [sim, setSim] = useState(0)
  const [nao, setNao] = useState(0)

  useEffect(() => {
    let s = 0; let n = 0;
    const interval = setInterval(() => {
      if (s < 14) setSim(prev => prev + 1);
      if (s > 8 && n < 3) setNao(prev => prev + 1);
      s++;
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full relative flex justify-center perspective-[1200px] mt-12 md:mt-20">
      <motion.div 
        animate={{ rotateX: [12, 8, 12], y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-5xl aspect-[21/9] md:aspect-[32/10] bg-[#020202] rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-center p-4 md:p-12"
        style={{ 
          transformStyle: 'preserve-3d',
          boxShadow: '0 50px 100px -20px rgba(0,0,0,1), 0 0 80px rgba(59,130,246,0.1)'
        }}
      >
        {/* LED Matrix Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.7)_2px,transparent_2px)] bg-[size:4px_4px] pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-30 pointer-events-none" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 text-center mb-6 md:mb-10 border-b border-white/10 pb-4 md:pb-8">
          <h3 className="text-xl md:text-5xl font-mono text-amber-500 font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">PROJETO DE LEI 042/2026</h3>
          <p className="text-zinc-500 font-mono mt-2 md:mt-4 uppercase tracking-widest text-[10px] md:text-sm">Votação Nominal Aberta</p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-12 w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-green-500 font-mono text-sm md:text-3xl mb-1 md:mb-3 tracking-widest">SIM</span>
            <span className="text-6xl md:text-[9rem] font-black text-green-400 font-mono drop-shadow-[0_0_25px_rgba(74,222,128,0.6)] leading-none">
              {sim.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col items-center opacity-40">
            <span className="text-zinc-400 font-mono text-sm md:text-3xl mb-1 md:mb-3 tracking-widest">ABS</span>
            <span className="text-6xl md:text-[9rem] font-black text-zinc-500 font-mono leading-none">
              00
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-500 font-mono text-sm md:text-3xl mb-1 md:mb-3 tracking-widest">NÃO</span>
            <span className="text-6xl md:text-[9rem] font-black text-red-500 font-mono drop-shadow-[0_0_25px_rgba(239,68,68,0.6)] leading-none">
              {nao.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Interactive Blueprint ──────────────────────────────────────────
function PlenaryBlueprint() {
  const [active, setActive] = useState(0);
  const items = [
    { 
      title: "Cérebro Q-SYS", 
      icon: <Cpu className="w-5 h-5" />, 
      desc: "O processador central (Core) gerencia áudio, roteia vídeo e automação. Uma matriz digital sobre rede IP, eliminando racks analógicos gigantescos e processamentos isolados.",
      visual: (
        <div className="w-full h-full bg-[#030303] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            className="relative z-10 w-48 h-48 rounded-2xl border border-blue-500/30 bg-blue-950/20 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]"
          >
            <Cpu className="w-16 h-16 text-blue-400 mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-blue-300 font-mono text-xs font-bold tracking-wider">Q-SYS CORE</span>
            <div className="mt-4 flex gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
               <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75" />
               <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-150" />
            </div>
          </motion.div>
        </div>
      )
    },
    { 
      title: "Captação Shure MXC", 
      icon: <Mic className="w-5 h-5" />, 
      desc: "Microfones de discussão padrão ONU. Cada unidade possui alto-falante integrado, anel de LED de status, botão físico de requisição de fala e imunidade contra interferência celular 5G.",
      visual: (
        <div className="w-full h-full bg-[#030303] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0,transparent_60%)]" />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-2 h-20 bg-gradient-to-t ${i === 2 ? 'from-zinc-800 to-red-500' : 'from-zinc-800 to-zinc-600'} rounded-t-full relative`}>
                  {i === 2 && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full blur-[4px] animate-pulse" />}
                </div>
                <div className="w-16 sm:w-24 h-8 bg-zinc-900 border border-white/10 rounded-t-xl mt-1 flex justify-center pt-2">
                  <div className={`w-3 h-3 rounded-full ${i === 2 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-700'}`} />
                </div>
              </div>
            ))}
          </motion.div>
          <div className="mt-8 text-zinc-500 font-mono text-xs uppercase tracking-widest text-center">
            {">"} Mic 02 Ativo <br/> Fila FIFO: Mic 01, Mic 03
          </div>
        </div>
      )
    },
    { 
      title: "Câmeras Auto-Track", 
      icon: <Cctv className="w-5 h-5" />, 
      desc: "Automação robótica de vídeo. Assim que o microfone Shure é ativado, o processador Q-SYS direciona automaticamente a câmera PTZ para o orador em milissegundos. Adeus cortes manuais.",
      visual: (
        <div className="w-full h-full bg-[#030303] flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0,transparent_60%)]" />
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative flex items-center justify-center">
              <Cctv className="w-20 h-20 text-purple-400 relative z-10" />
              {/* Cone of vision */}
              <motion.div 
                animate={{ rotate: [-15, 15, -15] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-b from-purple-500/20 to-transparent origin-top -translate-x-1/2"
                style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
              />
           </motion.div>
        </div>
      )
    },
    { 
      title: "Transparência & Atas", 
      icon: <FileText className="w-5 h-5" />, 
      desc: "Integração do hardware de votação ao software legislativo. O sistema registra cada voto nominal, tempo de fala e gera as atas da sessão em PDF automaticamente para o portal da transparência.",
      visual: (
        <div className="w-full h-full bg-[#030303] flex items-center justify-center relative overflow-hidden p-8">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,transparent_60%)]" />
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-zinc-950 p-3 flex items-center gap-2 border-b border-zinc-800">
                <Lock className="w-4 h-4 text-green-500" />
                <span className="text-[10px] text-green-400 font-mono">REGISTRO_CRIPOTOGRAFADO.PDF</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { n: "Ver. João (SIM)", t: "14:02:05" },
                  { n: "Ver. Maria (SIM)", t: "14:02:07" },
                  { n: "Ver. Carlos (NÃO)", t: "14:02:11" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-2">
                    <span className="text-zinc-300">{row.n}</span>
                    <span className="text-zinc-500">{row.t}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-center gap-2 text-green-500 bg-green-500/10 py-2 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold">ATA ASSINADA DIGITALMENTE</span>
                </div>
              </div>
           </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:h-[500px]">
      <div className="lg:col-span-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <div 
            key={i} 
            onClick={() => setActive(i)}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${active === i ? 'bg-zinc-900 border-white/10 shadow-xl' : 'bg-transparent border-transparent hover:bg-zinc-900/40'}`}
          >
            <div className="flex items-center gap-4 mb-2">
               <div className={`p-3 rounded-xl transition-colors ${active === i ? 'bg-white text-black' : 'bg-white/5 text-zinc-400'}`}>
                 {item.icon}
               </div>
               <h3 className={`text-xl font-bold transition-colors ${active === i ? 'text-white' : 'text-zinc-400'}`}>{item.title}</h3>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-zinc-400 text-sm leading-relaxed overflow-hidden"
                >
                  <div className="pt-2">{item.desc}</div>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-[#030303] shadow-2xl relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
          >
            {items[active].visual}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export function PlenariosLanding() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])


  // Scroll logic for Timeline
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] })

  // Form State for Gov Project Request
  const [formData, setFormData] = useState({ name: "", role: "", email: "", phone: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contato', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: "Landing Page Plenários - TR Licitação" })
      });
      if(response.ok) setIsSuccess(true);
    } catch(err) {
      console.error(err);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="dark min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Plenários e Câmaras Municipais | Sonus Pro Audio</title>
        <meta name="description" content="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários. Solicite um Termo de Referência ou Projeto Executivo." />
      </Helmet>
      <SEO 
        title="Plenários e Câmaras Municipais | Sonus Pro Audio"
        description="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários. Solicite um Termo de Referência."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Automação de Plenários e Câmaras Municipais",
          provider: { "@type": "Organization", name: "Sonus Pro Audio" },
          description: "Integração completa de áudio, câmeras PTZ e votação para câmaras de vereadores.",
          areaServed: { "@type": "Country", name: "Brasil" }
        }} 
      />
      
      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* IMMERSIVE HERO — 3D Display                   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden min-h-[95vh] flex flex-col justify-center border-b border-white/5">
        {/* Futuristic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        
        <div className="max-w-[1400px] mx-auto w-full px-4 lg:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-zinc-300 uppercase">Projetos Executivos para o Setor Público</span>
            </div>
          </FadeIn>
          
          <Reveal>
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter leading-[0.95] text-white">
              O Plenário<br/>do <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-400">Futuro.</span>
            </h1>
          </Reveal>
          
          <FadeIn delay={0.2} className="max-w-2xl mx-auto mt-6 md:mt-8">
            <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed">
              Áudio de inteligibilidade impecável. Câmeras que cortam automaticamente para a voz. Votação eletrônica nominal imune a falhas.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <VotingLedWall3D />
          </FadeIn>

        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* AUTHORITY BADGE                              */}
      {/* ══════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20 border-b border-blue-500/20 py-4 relative z-20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs text-blue-300/80 font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
            A mesma tecnologia aprovada por: Congresso Nacional • STF • ONU
          </p>
        </div>
      </div>

      <div className="bg-[#020202] py-8 relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 hover:opacity-70 transition-opacity duration-500">
          <img src="/shure-logo.png" alt="Shure" className="h-6 md:h-8 object-contain brightness-0 invert" loading="lazy" />
          <img src="/qsys-logo.png" alt="Q-SYS" className="h-5 md:h-7 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/qsc.png" alt="QSC" className="h-6 md:h-8 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/sennheiser.svg" alt="Sennheiser" className="h-5 md:h-7 object-contain brightness-0 invert" loading="lazy" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* BRUTALIST PAIN POINTS (White Block)          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-50 text-black relative overflow-hidden">
        {/* Subtle noise texture on white */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-multiply pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-20 leading-[0.9]">
              O Custo Político<br/>da <span className="text-red-600">Obsolescência.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: "01", title: "Microfonia e Caos", desc: "Equipamentos amadores captam o ruído inteiro da sala. Parlamentares precisam gritar, o áudio da TV Câmara fica ininteligível e a sessão perde o decoro institucional." },
              { num: "02", title: "Risco de Recontagem", desc: "Votar levantando a mão ou usar sistemas instáveis gera lentidão e dúvidas no resultado. Sem registro digital criptografado, a transparência pública é comprometida." },
              { num: "03", title: "Falta de Compliance", desc: "Ministério Público e Tribunais de Contas exigem registros claros, acessibilidade e transmissões nítidas. Um plenário analógico deixa a Câmara vulnerável a apontamentos." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative pt-8 border-t-8 border-black group overflow-hidden bg-white/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  <span className="absolute -bottom-8 -right-4 text-[120px] font-black text-black/[0.03] leading-none pointer-events-none group-hover:scale-110 group-hover:text-black/[0.05] transition-all duration-700 select-none">
                    {item.num}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-600 text-lg relative z-10 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* INTERACTIVE BLUEPRINT                        */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#020202] text-white relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">Engenharia de Ponta.</h2>
          </Reveal>
          <p className="text-lg md:text-xl text-zinc-400 mb-16 max-w-2xl font-light">
            Não vendemos caixas de som avulsas. Projetamos um ecossistema inteligente, integrado e livre de falhas para o setor público.
          </p>
          
          <PlenaryBlueprint />
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* DIRECT COMPARISON X-RAY                      */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter">A Diferença é Brutal.</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Padrão Antigo */}
            <FadeIn>
              <div className="relative p-[1px] rounded-3xl overflow-hidden group h-full">
                <div className="absolute inset-0 bg-red-900/30 group-hover:bg-red-800/50 transition-colors duration-500" />
                <div className="relative bg-[#0a0505] p-8 md:p-12 rounded-[23px] h-full">
                  <div className="flex items-center gap-4 mb-10 border-b border-red-900/30 pb-6">
                    <div className="p-3 bg-red-950 rounded-xl text-red-500"><X className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-red-400">O Padrão Antigo</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Cabeamento analógico cruzando o chão e mesas', 
                      'Microfonia constante exigindo interrupção da sessão', 
                      'Operador de vídeo precisando adivinhar quem vai falar', 
                      'Votação simbólica sujeita a contestações e erros'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 items-start text-zinc-400">
                        <div className="mt-1 shrink-0"><X className="w-4 h-4 text-red-500/50" /></div>
                        <span className="text-sm md:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Padrão Sonus */}
            <FadeIn delay={0.2}>
              <div className="relative p-[1px] rounded-3xl overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 opacity-30 group-hover:opacity-100 animate-[spin_4s_linear_infinite] transition-opacity duration-500" />
                <div className="relative bg-[#02050a] p-8 md:p-12 rounded-[23px] h-full shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                  <div className="flex items-center gap-4 mb-10 border-b border-blue-900/30 pb-6">
                    <div className="p-3 bg-blue-950 rounded-xl text-blue-400"><CheckCircle2 className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-blue-400">O Padrão Sonus</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Áudio e Vídeo digitais tráfegando via cabo de rede IP (Dante)', 
                      'Captação direcional hiper-nítida e livre de interferências', 
                      'Câmeras PTZ cortam sozinhas para quem está com o microfone aberto', 
                      'Painel integrado que emite a ata oficial assinada em PDF'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 items-start text-zinc-200">
                        <div className="mt-1 shrink-0 bg-blue-500/20 rounded-full p-0.5"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                        <span className="text-sm md:text-base font-medium leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ILLUMINATED VERTICAL TIMELINE                */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#020202] relative" ref={timelineRef}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter">Processo de Implantação.</h2>
          </Reveal>
          
          <div className="relative">
            {/* The vertical base line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
            {/* The animated glow line */}
            <motion.div 
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent md:-translate-x-1/2 origin-top shadow-[0_0_15px_#3b82f6]"
              style={{ scaleY: timelineProgress }}
            />

            <div className="space-y-16">
              {[
                { step: "01", title: "Levantamento & TR", desc: "Nossos engenheiros mapeiam o plenário e ajudam o setor de compras na formulação do Termo de Referência técnico correto." },
                { step: "02", title: "Projeto Executivo", desc: "Desenho da arquitetura de rede, plantas de cabeamento estruturado e design das interfaces touchscreen." },
                { step: "03", title: "Instalação Cirúrgica", desc: "A execução ocorre durante o recesso parlamentar ou janelas livres, garantindo zero impacto na agenda legislativa." },
                { step: "04", title: "Sessão Inaugural e SLA", desc: "Acompanhamos as primeiras sessões presencialmente e ativamos o monitoramento remoto 24/7 (Q-SYS Reflect)." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group">
                  {/* Icon Node */}
                  <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full border-4 border-[#020202] bg-zinc-900 flex items-center justify-center -translate-x-[19px] md:-translate-x-1/2 z-10 transition-colors duration-500 group-hover:bg-blue-600 group-hover:border-blue-400">
                    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-white">{item.step}</span>
                  </div>
                  
                  {/* Content Box */}
                  <div className="w-[calc(100%-4rem)] ml-[4rem] md:ml-0 md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 group-hover:border-blue-500/30 transition-all duration-500 group-hover:bg-white/[0.04]">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FORM: PROJETO EXECUTIVO / LICITAÇÃO          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#050505] relative border-t border-white/5" id="contato">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Solicite um Projeto Executivo</h2>
              <p className="text-zinc-400 text-lg">Ideal para Câmaras Municipais que precisam iniciar um Termo de Referência (TR) para licitação.</p>
            </div>

            {isSuccess ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p className="text-zinc-400">Nossa equipe técnica entrará em contato em breve para agendar uma reunião de alinhamento do projeto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} tabIndex={-1} autoComplete="off" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Nome do Contato</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="João da Silva" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Órgão Público / Cargo</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Câmara Municipal de..." value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">E-mail Institucional</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="joao@camara.leg.br" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="(00) 00000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Resumo da Necessidade</label>
                  <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Ex: Precisamos modernizar o áudio do plenário e implementar votação eletrônica..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando...</> : "Solicitar Contato Técnico"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FOOTER BLOCK (Lazy)                            */}
      {/* ══════════════════════════════════════════════ */}
      <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <WarrantyBanner 
          variant="qsys"
          title="3 Anos de Garantia e SLA"
          description="Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de garantia sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager."
        />
        <AeoFaq faqs={[
          {
            question: "Como o sistema ajuda na Transparência Pública?",
            answer: "O sistema integrado da Sonus gera atas digitais assinadas automaticamente, com o registro de cada voto e tempo de fala. Além disso, a transmissão para a TV Câmara e YouTube sai com qualidade broadcast (GC, cortes automáticos e áudio perfeito), garantindo que a população compreenda claramente cada sessão legislativa."
          },
          {
            question: "Vocês auxiliam na elaboração do Termo de Referência (TR)?",
            answer: "Sim. Nossos engenheiros de áudio e vídeo realizam o levantamento técnico arquitetônico da Câmara e entregam um projeto executivo detalhado. Esse documento possui as especificações técnicas exatas para garantir que o edital da licitação seja montado de forma segura, evitando a compra de equipamentos amadores."
          },
          {
            question: "É possível instalar o sistema sem interromper as sessões da Câmara?",
            answer: "Sim. Temos experiência em trabalhar no formato 'turn-key' durante os finais de semana ou no período de recesso parlamentar. A migração da tecnologia antiga para a nova é feita com planejamento cirúrgico para que nenhuma pauta seja atrasada por conta da obra técnica."
          }
        ]} />
        <TestimonialSection />
        <LPFooter />
        <WhatsAppButton message="Olá! Gostaria de iniciar um levantamento técnico para a minha Câmara Municipal." />
        <StickyCtaBar />
      </Suspense>
    </div>
  )
}
