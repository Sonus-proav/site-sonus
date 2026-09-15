import { useState, useEffect, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Cctv, Radio, MonitorPlay, Vote, Timer, Tv, Cable, ChevronRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"

import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Magnetic } from "@/components/ui/Magnetic"
import { logLead, getUserGeo } from "@/lib/analytics"

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(m => ({ default: m.TestimonialSection })))
const StickyCtaBar = lazy(() => import("@/components/ui/StickyCtaBar").then(m => ({ default: m.StickyCtaBar })))
const WarrantyBanner = lazy(() => import("@/components/layout/WarrantyBanner").then(m => ({ default: m.WarrantyBanner })))
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })))
const AeoFaq = lazy(() => import("@/components/ui/AeoFaq").then(m => ({ default: m.AeoFaq })))

// ─── Interactive Voting Panel Mockup ────────────────────────────────
function VotingPanelMockup() {
  const [activeTab, setActiveTab] = useState<"votacao" | "tribuna" | "cameras">("votacao")
  const votes: Record<string, "sim" | "nao" | "abs" | null> = {
    "Ver. Carlos M.": "sim",
    "Ver. Ana Paula": "sim",
    "Ver. Roberto F.": "nao",
    "Ver. Maria L.": "sim",
    "Ver. João Silva": null,
    "Ver. Sandra B.": "abs",
  }

  const totalSim = Object.values(votes).filter(v => v === "sim").length
  const totalNao = Object.values(votes).filter(v => v === "nao").length
  const totalAbs = Object.values(votes).filter(v => v === "abs").length
  const totalVoted = totalSim + totalNao + totalAbs
  const totalVereadores = Object.keys(votes).length

  const tabs = [
    { id: "votacao" as const, label: "Votação", icon: Vote },
    { id: "tribuna" as const, label: "Tribuna", icon: Timer },
    { id: "cameras" as const, label: "Câmeras", icon: Cctv },
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveTab(prev => {
        const t = ["votacao", "tribuna", "cameras"]
        const currentIndex = t.indexOf(prev)
        return t[(currentIndex + 1) % t.length] as "votacao" | "tribuna" | "cameras"
      })
    }, 4000)
    return () => clearInterval(stepInterval)
  }, [])

  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 p-1.5 md:p-3 shadow-2xl border border-white/10 flex items-center justify-center transform-gpu hover:scale-[1.02] transition-transform duration-700">
      
      {/* Fake Bezel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30 flex items-center justify-center gap-2 border-b border-x border-white/5">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
      </div>

      {/* iPad Frame Screen */}
      <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] overflow-hidden flex flex-col z-20 relative">
        {/* Reflexo */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-50" />

        {/* Status Bar */}
        <div className="h-10 bg-black/40 flex items-center justify-between px-6 border-b border-white/5 shrink-0 z-30 pt-2">
          <span className="text-[10px] font-bold text-zinc-400 tracking-widest flex items-center gap-2 uppercase">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Sessão Plenária 042 • REC
          </span>
          <div className="flex gap-3 items-center text-zinc-500">
            <span className="text-[10px] font-mono">Quórum: {totalVereadores}/{totalVereadores}</span>
          </div>
        </div>

        {/* Interface Dashboard */}
        <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black z-30">
          {/* Sidebar Nav */}
          <div className="w-full md:w-16 flex flex-row md:flex-col gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
                className={`flex items-center justify-center p-3 rounded-xl transition-all h-12 w-12 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white"
                }`}
              >
                <tab.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === "votacao" && (
                <motion.div key="votacao" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col bg-black/40 border border-white/5 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">PL 142/2026 — Emenda ao Orçamento</h4>
                      <p className="text-xs text-zinc-500">Votação Nominal em Andamento</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20 font-bold uppercase">Aberta</span>
                  </div>
                  {/* Vote progress bar */}
                  <div className="flex h-3 w-full rounded-full overflow-hidden mb-3 bg-zinc-800">
                    {totalSim > 0 && <motion.div className="bg-green-500" initial={{ width: 0 }} animate={{ width: `${(totalSim / totalVereadores) * 100}%` }} transition={{ duration: 0.5 }} />}
                    {totalNao > 0 && <motion.div className="bg-red-500" initial={{ width: 0 }} animate={{ width: `${(totalNao / totalVereadores) * 100}%` }} transition={{ duration: 0.5, delay: 0.1 }} />}
                    {totalAbs > 0 && <motion.div className="bg-zinc-500" initial={{ width: 0 }} animate={{ width: `${(totalAbs / totalVereadores) * 100}%` }} transition={{ duration: 0.5, delay: 0.2 }} />}
                  </div>
                  <div className="flex justify-between text-xs font-bold mb-4">
                    <span className="text-green-400">Sim: {totalSim}</span>
                    <span className="text-red-400">Não: {totalNao}</span>
                    <span className="text-zinc-400">Abs: {totalAbs}</span>
                    <span className="text-zinc-500">{totalVoted}/{totalVereadores}</span>
                  </div>
                  {/* Nominal list */}
                  <div className="flex-1 space-y-1.5 overflow-hidden">
                    {Object.entries(votes).map(([name, vote]) => (
                      <div key={name} className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-white/[0.02] text-xs">
                        <span className="text-zinc-300 truncate">{name}</span>
                        {vote === "sim" && <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded text-[10px]">SIM</span>}
                        {vote === "nao" && <span className="text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded text-[10px]">NÃO</span>}
                        {vote === "abs" && <span className="text-zinc-400 font-bold bg-zinc-400/10 px-2 py-0.5 rounded text-[10px]">ABS</span>}
                        {vote === null && <span className="text-yellow-400/50 text-[10px] animate-pulse">Aguardando...</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "tribuna" && (
                <motion.div key="tribuna" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col items-center justify-center gap-6 bg-black/40 border border-white/5 rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Uso da Tribuna</p>
                    <p className="text-xl font-bold text-white">Ver. João Silva</p>
                  </div>
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="6" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 42 * 0.28 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-mono font-bold text-white">02:14</span>
                      <span className="text-[10px] text-zinc-500">de 03:00</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium cursor-pointer hover:bg-red-500/20 transition-colors">Encerrar Fala</div>
                    <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-400 font-medium cursor-pointer hover:bg-blue-500/20 transition-colors">+1 Minuto</div>
                  </div>
                </motion.div>
              )}

              {activeTab === "cameras" && (
                <motion.div key="cameras" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col gap-4 bg-black/40 border border-white/5 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white">Controle de Câmeras PTZ</h4>
                    <span className="text-[10px] px-2 py-1 bg-red-500/10 text-red-400 rounded border border-red-500/20 font-bold animate-pulse">● AO VIVO</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {[
                      { name: "CAM 1 — Geral", status: "Panorâmica", active: false },
                      { name: "CAM 2 — PTZ", status: "Mesa Diretora", active: true },
                      { name: "CAM 3 — PTZ", status: "Bancada Esquerda", active: false },
                      { name: "CAM 4 — PTZ", status: "Bancada Direita", active: false },
                    ].map((cam) => (
                      <div key={cam.name} className={`rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${cam.active ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)] scale-[1.02]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${cam.active ? "bg-blue-500 shadow-[0_0_6px_#3b82f6]" : "bg-zinc-600"}`} />
                          <span className="text-[10px] sm:text-xs font-bold text-zinc-300">{cam.name}</span>
                        </div>
                        <span className={`text-[10px] ${cam.active ? "text-blue-400" : "text-zinc-500"}`}>{cam.status}</span>
                        {cam.active && <span className="text-[9px] text-blue-500/60 mt-1 font-bold">FONTE PRINCIPAL ✓</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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

  const handleWhatsApp = async (origin: 'whatsapp_flutuante' | 'whatsapp_hero' | 'whatsapp_urgente' | 'whatsapp_footer') => {
    trackWhatsAppClick(origin, 'plenarios');
    const geo = await getUserGeo();
    logLead({
      type: 'whatsapp',
      source: location.pathname,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      timestamp: Date.now(),
      whatsappOrigin: origin
    });
    window.open("https://wa.me/5546920013151?text=Ol%C3%A1%21+Gostaria+de+falar+sobre+um+projeto+para+Plen%C3%A1rio%2FC%C3%A2mara.", "_blank");
  }

  // Methodology steps
  const [activeStep, setActiveStep] = useState(0)
  const methodSteps = [
    { num: "01", title: "Consultoria", desc: "Mapeamento dos desafios de TI legislativa e desenho 3D da Câmara." },
    { num: "02", title: "Projeto", desc: "Arquitetura e acústica de microfones e automação de vídeo PTZ." },
    { num: "03", title: "Instalação", desc: "Implantação limpa sem interromper as sessões agendadas." },
    { num: "04", title: "Treinamento", desc: "Capacitação técnica, SLA e monitoramento remoto 24/7." },
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % methodSteps.length)
    }, 3000)
    return () => clearInterval(stepInterval)
  }, [methodSteps.length])

  return (
    <div className="dark min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Plenários e Câmaras Municipais | Sonus Pro Audio</title>
        <meta name="description" content="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários, Câmaras de Vereadores e Assembleias. Controle tudo em uma única interface touchscreen com Q-SYS e Shure." />
        <link rel="preload" href="/soundwave-bg.webp" as="image" fetchPriority="high" />
      </Helmet>
      <SEO 
        title="Plenários e Câmaras Municipais | Sonus Pro Audio"
        description="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários, Câmaras de Vereadores e Assembleias. Controle tudo em uma única interface touchscreen com Q-SYS e Shure."
        schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Automação de Plenários e Câmaras Municipais",
        provider: { "@type": "Organization", name: "Sonus Pro Audio" },
        description: "Integração completa de áudio, câmeras PTZ e votação eletrônica para câmaras de vereadores, assembleias legislativas e tribunais.",
        areaServed: { "@type": "Country", name: "Brasil" }
      }} />
      
      {/* Fixed Background Layer for Depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <img fetchPriority="high" decoding="async" src="/soundwave-bg.webp" className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-transparent to-[#050505]/95" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Split Screen + Interactive Simulator    */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 lg:px-12 z-10 min-h-[90vh] flex flex-col justify-center">
        {/* Atmospheric Orbs */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-8 max-w-2xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wider text-blue-300 uppercase">Poder Público & Legislativo</span>
              </div>
            </FadeIn>
            
            <Reveal>
              <h1 className="text-5xl sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter leading-[1] md:leading-[0.9]">
                O Fim da<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Sessão Tumultuada.
                </span>
              </h1>
            </Reveal>
            
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed">
                Transparência, ordem e clareza. Integramos microfones de discussão Shure, câmeras robóticas PTZ e sistemas de votação em uma única plataforma controlada por toque.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <Magnetic>
                  <Button 
                    size="lg" 
                    className="w-full h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
                    onClick={() => handleWhatsApp('whatsapp_hero')}
                  >
                    Projetar Meu Plenário
                  </Button>
                </Magnetic>
              </div>
              <Button 
                variant="outline" 
                size="lg"
                className="w-fit sm:w-auto h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white text-lg transition-all"
                onClick={() => handleWhatsApp('whatsapp_hero')}
              >
                Falar no WhatsApp <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </FadeIn>
          </div>

          {/* Interactive Panel Mockup */}
          <FadeIn delay={0.6} direction="left" className="relative w-full">
            <VotingPanelMockup />
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TRUST BAR — Technology Partners                */}
      {/* ══════════════════════════════════════════════ */}
      <div className="border-t border-white/5 bg-black/50 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          <img src="/shure-logo.png" alt="Shure" className="h-6 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/qsys.webp" alt="Q-SYS" className="h-5 md:h-6 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/qsc.webp" alt="QSC" className="h-6 md:h-7 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/sennheiser.webp" alt="Sennheiser" className="h-5 md:h-6 object-contain brightness-0 invert" loading="lazy" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* PAIN POINTS — Editorial Magazine Style         */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-16">
            <span className="text-red-400 font-mono text-sm uppercase tracking-widest mb-4 block">O Custo do Improviso</span>
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
                Um Plenário obsoleto não prejudica apenas a sessão.<br className="hidden md:block" />
                <span className="text-red-500/80">Prejudica a democracia.</span>
              </h2>
            </Reveal>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FadeIn delay={0.1} className="h-full">
              <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-8 flex flex-col group hover:border-red-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700" />
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-8 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Mic className="w-7 h-7 text-red-400" />
                </div>
                <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-red-500/[0.05] transition-colors duration-500 select-none">01</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-red-100 transition-colors">Microfonia e Chiado</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Microfones antigos captam barulho do ar-condicionado e o som de todos ao mesmo tempo. Parlamentares precisam gritar para serem ouvidos, prejudicando as transmissões oficias.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.2} className="h-full">
              <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-8 flex flex-col group hover:border-orange-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Cable className="w-7 h-7 text-orange-400" />
                </div>
                <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-orange-500/[0.05] transition-colors duration-500 select-none">02</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-orange-100 transition-colors">Emaranhado de Cabos</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Fios cruzando o plenário, conectores desgastados, mau contato. A estética do espaço público fica comprometida e qualquer falha exige intervenção técnica emergencial no meio da sessão.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.3} className="h-full">
              <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-8 flex flex-col group hover:border-purple-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Tv className="w-7 h-7 text-purple-400" />
                </div>
                <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-purple-500/[0.05] transition-colors duration-500 select-none">03</span>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-purple-100 transition-colors">Votação Arcaica</h3>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Um operador controlando câmeras manualmente não acompanha o ritmo dos debates. E a votação verbal ou por levantar a mão não gera registro nominal auditável, abrindo margem para contestações.
                </p>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SOCIAL PROOF — HOLOGRAPHIC CHAT BEFORE/AFTER   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-[#0a0a0a] relative border-y border-white/5 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">O Antes e o Depois.</h2>
            </Reveal>
            <p className="text-zinc-400 text-lg">A evolução real de quem investiu em tecnologia profissional.</p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-4 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* O Passado */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center font-bold shrink-0">ST</div>
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Secretário de TI • 14:10 PM</span>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-lg">
                  O som do vereador João não funciona, ele está gritando e o microfone não pega de jeito nenhum.
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center font-bold shrink-0">IM</div>
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Imprensa • 14:15 PM</span>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-lg">
                  A câmera da TV Câmara está parada no mesmo ângulo há 20 minutos... quem está discursando não aparece.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold shrink-0">AS</div>
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Assessor • 14:30 PM</span>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-lg">
                  A votação de ontem foi contestada porque a contagem manual deu diferença na pauta principal, pediram auditoria.
                </div>
              </div>
            </div>

            <div className="py-6 flex items-center justify-center gap-4">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">Após implementação Sonus</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* O Presente */}
            <div className="flex gap-4 justify-end">
              <div className="flex flex-col items-end max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Presidente da Câmara • 17:05 PM</span>
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl rounded-tr-none p-4 text-sm text-blue-100 shadow-lg">
                  Sessão impecável hoje. A câmera acompanhou cada orador automaticamente, a votação foi registrada digitalmente em segundos e a TV Câmara transmitiu sem uma única falha.
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center font-bold shrink-0">PR</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ECOSYSTEM SOLUTION - Spotlight Cards           */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Tudo em um único <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ecossistema.</span>
              </h2>
            </Reveal>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Nós unimos áudio cristalino, vídeo inteligente e software de votação transparente em uma plataforma infalível.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Votação */}
            <FadeIn className="md:col-span-2 lg:col-span-2 h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                  <div className="w-full md:w-1/2">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                      <Vote className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Software de Votação e Gestão</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg mb-4">
                      Integramos hardware ao software legislativo. Telões de LED exibem a pauta e o cronômetro, enquanto a votação nominal ocorre em tempo real, gerando atas em PDF automaticamente.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 bg-black rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                     <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                       <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-widest">Painel Nominal</span>
                       <span className="text-[8px] text-indigo-400 font-bold uppercase animate-pulse">Ao Vivo</span>
                     </div>
                     <div className="space-y-3">
                       {[
                         { name: "Ver. Carlos M.", vote: "SIM", color: "green" },
                         { name: "Ver. Ana Paula", vote: "SIM", color: "green" },
                         { name: "Ver. Roberto F.", vote: "NÃO", color: "red" },
                         { name: "Ver. Maria L.", vote: "ABS", color: "zinc" },
                       ].map((v) => (
                         <div key={v.name} className="flex items-center justify-between text-xs">
                           <span className="text-zinc-400">{v.name}</span>
                           <span className={`text-${v.color}-400 font-bold bg-${v.color}-400/10 px-2 py-1 rounded`}>{v.vote}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Card 2: Microfones */}
            <FadeIn delay={0.1} className="h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-400">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Sistemas Shure Microflex</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  O mesmo padrão de áudio utilizado na ONU. Imunidade total a interferências de celular, gestão automática de fila de falas e indicação visual por anel de LED de quem está com a palavra.
                </p>
              </SpotlightCard>
            </FadeIn>

            {/* Card 3: Câmeras */}
            <FadeIn delay={0.2} className="h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                  <Cctv className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Auto-Tracking Inteligente</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Quando o microfone é acionado, as coordenadas são enviadas e a câmera PTZ corta automaticamente para o orador em milissegundos. Autonomia total sem precisar de cinegrafista presencial.
                </p>
              </SpotlightCard>
            </FadeIn>

            {/* Card 4: Streaming */}
            <FadeIn delay={0.3} className="md:col-span-2 lg:col-span-2 h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 md:p-10 border border-white/10 bg-zinc-950/80">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                  <div className="w-full md:w-1/2">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                      <MonitorPlay className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">TV Câmara & Streaming Nativo</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      Transmissão direta para o YouTube, Facebook e TV Aberta com qualidade de broadcast. O sistema insere automaticamente os GC's (letras miúdas com nome e partido) durante a fala do vereador.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 bg-zinc-900 rounded-2xl p-4 border border-white/5 relative overflow-hidden h-48 md:h-56 flex items-end">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
                     <div className="relative z-10 p-2">
                       <div className="w-16 h-2 bg-red-600 rounded-sm mb-2" />
                       <span className="text-sm font-bold text-white block tracking-wide">Vereador João da Silva</span>
                       <span className="text-xs text-zinc-300">PSDB — Uso da Tribuna (Tempo: 02:45)</span>
                     </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
            
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* METHODOLOGY TIMELINE                           */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-4 bg-[#030303] border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
                Do Zero à Primeira Sessão em <span className="text-blue-500">4 Passos</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative mt-12">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-white/5 rounded-full overflow-hidden">
               <div className="absolute top-0 h-full w-1/4 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] transition-all duration-1000 ease-in-out" style={{ left: `${(activeStep / 3) * 100}%`, transform: 'translateX(-50%)' }} />
            </div>
            
            {methodSteps.map((item, i) => (
              <div key={i} className={`relative z-10 p-4 md:p-6 rounded-3xl text-center transition-all duration-700 flex flex-col items-center justify-start ${activeStep === i ? 'bg-zinc-900 border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] -translate-y-2' : 'bg-transparent border-transparent'}`}>
                <div className="relative w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 shrink-0">
                  <div className={`relative w-full h-full rounded-full flex items-center justify-center text-xl md:text-2xl font-black transition-all ${activeStep === i ? 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-black border border-white/10 text-zinc-600'}`}>
                    {item.num}
                  </div>
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-2 ${activeStep === i ? 'text-white' : 'text-zinc-500'}`}>{item.title}</h3>
                <p className={`text-xs md:text-sm font-medium px-2 ${activeStep === i ? 'text-zinc-300' : 'text-zinc-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* WARRANTY BANNER                                */}
      {/* ══════════════════════════════════════════════ */}
      <Suspense fallback={null}>
        <WarrantyBanner 
          variant="qsys"
          title="3 Anos de Garantia Premium"
          description="A infraestrutura do legislativo exige robustez absoluta. Oferecemos 3 anos de garantia integral e suporte remoto direto com a equipe de engenharia."
        />
      </Suspense>

      {/* ══════════════════════════════════════════════ */}
      {/* CTA Final                                      */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 relative bg-[#0a0a0a] z-10">
        <div className="max-w-4xl mx-auto">
          <SpotlightCard className="rounded-[3rem] p-12 md:p-20 text-center border-white/10 bg-gradient-to-b from-blue-950/20 to-black/40 relative overflow-hidden">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Modernize sua Câmara.<br /> Garanta transparência total.
              </h2>
            </Reveal>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              Nossa engenharia cuida de tudo: desde o projeto executivo e instalação minuciosa até o treinamento final dos operadores. Sem sustos, sem gambiarras.
            </p>
            
            <Magnetic>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500 text-white text-lg h-14 px-10 rounded-full font-bold shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
                onClick={() => handleWhatsApp('whatsapp_footer')}
              >
                Solicitar Diagnóstico Técnico
              </Button>
            </Magnetic>
          </SpotlightCard>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FOOTER BLOCK (Lazy)                            */}
      {/* ══════════════════════════════════════════════ */}
      <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <AeoFaq faqs={[
          {
            question: "Quanto custa modernizar o sistema de áudio de uma Câmara de Vereadores?",
            answer: "O valor depende do número de parlamentares, se a votação será eletrônica ou manual, se haverá transmissão ao vivo (TV Câmara / YouTube) e do estado atual do cabeamento. Projetos menores começam em uma faixa acessível, enquanto assembleias legislativas exigem maior investimento. A Sonus faz o levantamento técnico sem compromisso."
          },
          {
            question: "É possível instalar sem interromper as sessões legislativas?",
            answer: "Sim. Planejamos toda a instalação para períodos de recesso ou janelas fora do expediente legislativo. A migração do sistema antigo para o novo é feita de forma gradual e com rollback disponível, garantindo que nenhuma sessão atrase."
          },
          {
            question: "Como funciona o rastreamento automático de câmeras?",
            answer: "Cada microfone Shure Microflex possui um identificador único na rede. Quando pressionado, o processador Q-SYS recebe o sinal e envia instantaneamente as coordenadas PTZ para a câmera mais próxima focar no orador em milissegundos. Tudo automático."
          }
        ]} />
        <TestimonialSection />
        <LPFooter />
        <WhatsAppButton message="Olá! Gostaria de falar sobre um projeto para Plenário/Câmara de Vereadores." />
        <StickyCtaBar />
      </Suspense>
    </div>
  )
}
