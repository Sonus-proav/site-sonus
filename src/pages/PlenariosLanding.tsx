import { useState, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Video, CheckCircle2, Cctv, Cpu, Radio, MonitorPlay, Vote, Timer, Tv, Cable, ChevronRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"

import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
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

  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#080808] border border-white/5 shadow-[0_0_80px_rgba(59,130,246,0.08)] flex items-center justify-center p-4 sm:p-8 group">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0,transparent_100%)]" />
      
      {/* iPad Frame */}
      <div className="w-full max-w-lg aspect-auto sm:aspect-[16/10] min-h-[300px] bg-zinc-950 border-[6px] border-zinc-800/80 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10 relative">
        
        {/* Status Bar */}
        <div className="h-6 sm:h-8 bg-zinc-900 flex items-center justify-between px-4 border-b border-zinc-800">
          <span className="text-[8px] sm:text-[10px] font-bold text-zinc-400 tracking-widest flex items-center gap-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            SESSÃO PLENÁRIA 042 • REC
          </span>
          <div className="flex gap-2 items-center">
            <span className="text-[8px] sm:text-[10px] text-zinc-500">Quórum: {totalVereadores}/{totalVereadores}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="h-8 sm:h-10 bg-zinc-900/50 flex border-b border-zinc-800/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] font-medium transition-all ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-blue-500 bg-blue-500/5"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <tab.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interface Content */}
        <div className="flex-1 p-3 sm:p-4 bg-black relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "votacao" && (
              <motion.div key="votacao" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-white">PL 142/2026 — Emenda ao Orçamento</h4>
                    <p className="text-[8px] sm:text-[10px] text-zinc-500">Votação Nominal em Andamento</p>
                  </div>
                  <span className="text-[8px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded border border-green-500/20 font-bold">ABERTA</span>
                </div>
                {/* Vote progress bar */}
                <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-2 bg-zinc-800">
                  {totalSim > 0 && <motion.div className="bg-green-500" initial={{ width: 0 }} animate={{ width: `${(totalSim / totalVereadores) * 100}%` }} transition={{ duration: 0.5 }} />}
                  {totalNao > 0 && <motion.div className="bg-red-500" initial={{ width: 0 }} animate={{ width: `${(totalNao / totalVereadores) * 100}%` }} transition={{ duration: 0.5, delay: 0.1 }} />}
                  {totalAbs > 0 && <motion.div className="bg-zinc-500" initial={{ width: 0 }} animate={{ width: `${(totalAbs / totalVereadores) * 100}%` }} transition={{ duration: 0.5, delay: 0.2 }} />}
                </div>
                <div className="flex justify-between text-[9px] font-bold mb-3">
                  <span className="text-green-400">Sim: {totalSim}</span>
                  <span className="text-red-400">Não: {totalNao}</span>
                  <span className="text-zinc-400">Abs: {totalAbs}</span>
                  <span className="text-zinc-500">{totalVoted}/{totalVereadores}</span>
                </div>
                {/* Nominal list */}
                <div className="flex-1 space-y-1 overflow-hidden">
                  {Object.entries(votes).map(([name, vote]) => (
                    <div key={name} className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/[0.02] text-[9px] sm:text-[10px]">
                      <span className="text-zinc-300 truncate">{name}</span>
                      {vote === "sim" && <span className="text-green-400 font-bold bg-green-400/10 px-1.5 py-0.5 rounded text-[8px]">SIM</span>}
                      {vote === "nao" && <span className="text-red-400 font-bold bg-red-400/10 px-1.5 py-0.5 rounded text-[8px]">NÃO</span>}
                      {vote === "abs" && <span className="text-zinc-400 font-bold bg-zinc-400/10 px-1.5 py-0.5 rounded text-[8px]">ABS</span>}
                      {vote === null && <span className="text-yellow-400/50 text-[8px] animate-pulse">Aguardando...</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "tribuna" && (
              <motion.div key="tribuna" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Uso da Tribuna</p>
                  <p className="text-sm sm:text-lg font-bold text-white">Ver. João Silva</p>
                </div>
                <div className="relative w-28 h-28 sm:w-36 sm:h-36">
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
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-white">02:14</span>
                    <span className="text-[9px] text-zinc-500">de 03:00</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] text-red-400 font-medium cursor-pointer hover:bg-red-500/20 transition-colors">Encerrar Fala</div>
                  <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] text-blue-400 font-medium cursor-pointer hover:bg-blue-500/20 transition-colors">+1 Minuto</div>
                </div>
              </motion.div>
            )}

            {activeTab === "cameras" && (
              <motion.div key="cameras" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] sm:text-xs font-bold text-white">Controle de Câmeras PTZ</h4>
                  <span className="text-[8px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded border border-red-500/20 font-bold animate-pulse">● AO VIVO</span>
                </div>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {[
                    { name: "CAM 1 — Geral", status: "Panorâmica", active: false },
                    { name: "CAM 2 — PTZ", status: "Mesa Diretora", active: true },
                    { name: "CAM 3 — PTZ", status: "Bancada Esquerda", active: false },
                    { name: "CAM 4 — PTZ", status: "Bancada Direita", active: false },
                  ].map((cam) => (
                    <div key={cam.name} className={`rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${cam.active ? "border-blue-500/40 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${cam.active ? "bg-blue-500 shadow-[0_0_6px_#3b82f6]" : "bg-zinc-600"}`} />
                        <span className="text-[8px] sm:text-[9px] font-bold text-zinc-300">{cam.name}</span>
                      </div>
                      <span className={`text-[8px] ${cam.active ? "text-blue-400" : "text-zinc-500"}`}>{cam.status}</span>
                      {cam.active && <span className="text-[7px] text-blue-500/60 mt-1">Fonte Principal ✓</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


// ─── Main Component ─────────────────────────────────────────────────
export function PlenariosLanding() {
  const location = useLocation();

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
    { num: "01", title: "Levantamento", desc: "Visitamos o plenário, medimos o espaço e mapeamos as necessidades do legislativo: quantas bancadas, tipo de transmissão e modelo de votação desejado." },
    { num: "02", title: "Projeto Executivo", desc: "Entregamos documentação completa: plantas baixas, cabeamento estruturado, posição de câmeras e microfones, e protótipos das telas touch personalizadas." },
    { num: "03", title: "Implementação", desc: "Instalamos tudo sem interromper as sessões. Trabalhamos em janelas de recesso para garantir zero impacto na agenda legislativa." },
    { num: "04", title: "Treinamento e SLA", desc: "Capacitamos a equipe técnica da Câmara e deixamos suporte contínuo ativo. Qualquer problema é resolvido remotamente em minutos via Q-SYS Reflect." },
  ]

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30">
      <Helmet>
        <title>Plenários e Câmaras Municipais | Sonus Pro Audio</title>
        <meta name="description" content="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários, Câmaras de Vereadores e Assembleias. Controle tudo em uma única interface touchscreen com Q-SYS e Shure." />
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
      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Split Screen + Interactive Simulator    */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="noise-overlay opacity-30"></div>
        
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] mb-8">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-medium tracking-wide text-zinc-300">Poder Público & Legislativo</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                A Nova Era das <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-indigo-400 to-blue-500 text-glow-blue">
                  Sessões Legislativas.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
                Transparência, ordem e clareza. Integramos microfones de discussão, câmeras robóticas e sistemas de votação em uma única plataforma. O Presidente controla tudo em uma tela touch.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Magnetic>
                  <Button 
                    size="lg" 
                    className="shimmer-btn bg-white text-black hover:bg-zinc-200 text-base h-14 px-8 rounded-full font-semibold"
                    onClick={() => handleWhatsApp('whatsapp_hero')}
                  >
                    Solicitar Projeto
                  </Button>
                </Magnetic>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="glass-card text-white hover:bg-white/10 border-white/20 text-base h-14 px-8 rounded-full"
                  onClick={() => handleWhatsApp('whatsapp_footer')}
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </FadeIn>

            {/* Interactive Panel Mockup */}
            <FadeIn delay={0.2}>
              <VotingPanelMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TRUST BAR — Technology Partners                */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-10 bg-white/[0.01] backdrop-blur-xl border-y border-white/5">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-60">
            <img src="/shure-logo.png" alt="Shure" className="h-6 md:h-7 w-auto brightness-0 invert" loading="lazy" />
            <img src="/marcas/qsys.webp" alt="Q-SYS" className="h-5 md:h-6 w-auto brightness-0 invert" loading="lazy" />
            <img src="/marcas/qsc.webp" alt="QSC" className="h-6 md:h-7 w-auto brightness-0 invert" loading="lazy" />
            <img src="/marcas/sennheiser.webp" alt="Sennheiser" className="h-5 md:h-6 w-auto brightness-0 invert" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* PAIN POINTS — O Custo da Câmara Obsoleta      */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-16">
            <span className="text-red-400 font-mono text-sm uppercase tracking-widest mb-4 block">O Custo do Improviso</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Um Plenário obsoleto não prejudica<br className="hidden md:block" /> apenas a sessão. Prejudica a <span className="text-red-400">democracia</span>.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <SpotlightCard className="rounded-3xl p-8 border border-white/10 relative overflow-hidden h-full">
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none">01</span>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                  <Mic className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Microfonia e Chiado</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Microfones antigos captam barulho do ar-condicionado e o som de todos ao mesmo tempo. Parlamentares precisam gritar para serem ouvidos. As gravações oficiais são inutilizáveis e a TV Câmara transmite áudio comprometido.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SpotlightCard className="rounded-3xl p-8 border border-white/10 relative overflow-hidden h-full">
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none">02</span>
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20">
                  <Cable className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emaranhado de Cabos</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Fios analógicos cruzando o plenário, conectores desgastados, mau contato constante. A estética do espaço público fica comprometida e a manutenção se torna um pesadelo — qualquer falha exige um técnico presencial.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <SpotlightCard className="rounded-3xl p-8 border border-white/10 relative overflow-hidden h-full">
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none">03</span>
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                  <Tv className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Câmera Manual e Votação Arcaica</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Um operador controlando câmeras manualmente nunca consegue acompanhar o ritmo dos debates. E a votação por levantar a mão não gera registro nominal auditável — é uma brecha para contestações.
                </p>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SOLUTION — Ecossistema Integrado               */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">A Solução</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              Tudo em um único <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecossistema.</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Q-SYS é o processador central que conecta microfones Shure, câmeras PTZ e telões de votação em uma única rede IP. Sem equipamentos legados. Sem gambiarras.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Votação (Grande) */}
            <FadeIn delay={0.1} className="md:col-span-2 lg:col-span-2">
              <SpotlightCard className="p-8 md:p-10 rounded-3xl border border-white/10 h-full">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                      <Vote className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Software de Votação Eletrônica</h3>
                    <p className="text-zinc-400 mb-6">
                      Integramos o hardware ao software legislativo. Telões de LED exibem a pauta, o cronômetro e o resultado da votação nominal em tempo real. Tudo com rastreabilidade e transparência absoluta.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> Votação Nominal, Secreta ou Simbólica
                      </li>
                      <li className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> Atas geradas automaticamente em PDF
                      </li>
                      <li className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" /> Gestão de quórum, pauta, requerimentos e tribuna
                      </li>
                    </ul>
                  </div>
                  {/* Visual Element */}
                  <div className="w-full md:w-56 bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm shrink-0">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                      <span className="text-[10px] font-semibold text-zinc-300">Quadro Nominal</span>
                      <span className="text-[8px] text-indigo-400">Tempo Real</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Carlos M.", vote: "SIM", color: "green" },
                        { name: "Ana Paula", vote: "SIM", color: "green" },
                        { name: "Roberto F.", vote: "NÃO", color: "red" },
                        { name: "Maria L.", vote: "ABS", color: "zinc" },
                      ].map((v) => (
                        <div key={v.name} className="flex items-center justify-between text-[10px]">
                          <span className="text-zinc-400">{v.name}</span>
                          <span className={`text-${v.color}-400 font-bold bg-${v.color}-400/10 px-1.5 py-0.5 rounded text-[8px]`}>{v.vote}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Card 2: Microfones Shure */}
            <FadeIn delay={0.2}>
              <SpotlightCard className="p-8 rounded-3xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Radio className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Microfones de Discussão Shure</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  A linha Microflex® (MXC/MXCW) é padrão no Congresso Nacional e na ONU. Cada unidade possui botão físico de solicitação, anel LED de status e alto-falante integrado.
                </p>
                <ul className="space-y-2">
                  <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div> Imunidade total a celulares (GSM/5G)</li>
                  <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div> Anel de LED: indica quem está falando</li>
                  <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div> Interpretação simultânea multi-idioma</li>
                  <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></div> Fila de fala automática (FIFO/Override)</li>
                </ul>
              </SpotlightCard>
            </FadeIn>

            {/* Card 3: Câmeras PTZ */}
            <FadeIn delay={0.1}>
              <SpotlightCard className="p-8 rounded-3xl border border-white/10 h-full">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Cctv className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Rastreamento Automático de Câmeras</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  A câmera segue a voz. Quando um parlamentar ativa o microfone, o Q-SYS envia as coordenadas à câmera PTZ que corta e foca no orador em milissegundos, sem intervenção humana.
                </p>
                <div className="w-full bg-black/30 rounded-xl border border-white/5 p-4 flex items-center justify-center gap-3">
                  <Mic className="w-5 h-5 text-red-400" />
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <Cpu className="w-6 h-6 text-emerald-400" />
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <Video className="w-5 h-5 text-blue-400" />
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                  <MonitorPlay className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-[10px] text-zinc-600 text-center mt-2">Mic → Processador → Câmera → Streaming</p>
              </SpotlightCard>
            </FadeIn>

            {/* Card 4: Streaming */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <SpotlightCard className="p-8 rounded-3xl border border-white/10 h-full">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                      <MonitorPlay className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">Streaming & TV Câmara</h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Transmissão direta para YouTube, Facebook e TV Legislativa em Full HD. O Gerador de Caracteres (GC) insere automaticamente o nome, partido e tempo do orador na tarja — igual emissora de TV.
                    </p>
                    <ul className="space-y-2">
                      <li className="text-xs text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Gravação local + streaming simultâneo</li>
                      <li className="text-xs text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> GC automático (nome, partido, pauta)</li>
                    </ul>
                  </div>
                  {/* GC Mockup */}
                  <div className="w-full md:w-64 bg-zinc-900 rounded-xl p-4 border border-white/5 shrink-0">
                    <div className="w-full aspect-video bg-black rounded-lg flex items-end p-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/30 to-black/60" />
                      <div className="relative z-10">
                        <div className="w-12 h-1.5 bg-red-500 rounded-sm mb-1"></div>
                        <span className="text-[10px] font-bold text-white block">Ver. João da Silva</span>
                        <span className="text-[8px] text-zinc-400">PSD — Uso da Tribuna</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* METHODOLOGY — 4 Steps Timeline                 */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Metodologia</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Do Zero à Primeira Sessão<br className="hidden md:block" /> em 4 Passos.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-6">
            {methodSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div 
                  className={`glass-card p-6 rounded-2xl border cursor-pointer transition-all duration-500 h-full ${
                    activeStep === i 
                      ? "border-primary/40 bg-primary/5 shadow-[0_0_30px_rgba(41,128,185,0.15)]" 
                      : "border-white/5 hover:border-white/10"
                  }`}
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <span className={`text-3xl font-black block mb-4 transition-colors ${activeStep === i ? "text-primary" : "text-zinc-700"}`}>{step.num}</span>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
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
          title="3 Anos de Garantia Integral"
          description="Investir em infraestrutura pública exige segurança absoluta. Oferecemos 3 anos de garantia sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager."
        />
      </Suspense>

      {/* ══════════════════════════════════════════════ */}
      {/* CTA Final                                      */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden px-4 md:px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="glass-card-strong bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-[3rem] p-12 md:p-20 text-center border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 noise-overlay opacity-30"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Pronto para modernizar<br className="hidden md:block" /> a sua Câmara?
                </h2>
                <p className="text-lg text-zinc-300 mb-10">
                  Nossos especialistas desenvolvem o projeto executivo, implementam a tecnologia e treinam a sua equipe. Tudo com garantia e suporte contínuo.
                </p>
                
                <Magnetic>
                  <Button 
                    size="lg" 
                    className="shimmer-btn bg-white text-black hover:bg-zinc-200 text-lg h-14 px-8 rounded-full font-semibold"
                    onClick={() => handleWhatsApp('whatsapp_footer')}
                  >
                    Falar com um Especialista
                  </Button>
                </Magnetic>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FOOTER BLOCK (Lazy)                            */}
      {/* ══════════════════════════════════════════════ */}
      <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <AeoFaq faqs={[
          {
            question: "Quanto custa modernizar o sistema de áudio de uma Câmara de Vereadores?",
            answer: "O valor depende do número de parlamentares, se a votação será eletrônica ou manual, se haverá transmissão ao vivo (TV Câmara / YouTube) e do estado atual do cabeamento. Projetos menores para câmaras de até 9 vereadores começam em uma faixa acessível, enquanto assembleias legislativas de grande porte exigem um investimento maior. A Sonus faz o levantamento técnico sem compromisso para dimensionar o orçamento exato."
          },
          {
            question: "É possível instalar sem interromper as sessões legislativas?",
            answer: "Sim. Planejamos toda a instalação para períodos de recesso ou janelas fora do expediente legislativo. A migração do sistema antigo para o novo é feita de forma gradual e com rollback disponível, garantindo que nenhuma sessão seja cancelada por conta da obra."
          },
          {
            question: "Como funciona o rastreamento automático de câmeras com microfone Shure?",
            answer: "Cada microfone Shure Microflex possui um identificador único na rede. Quando um parlamentar pressiona o botão de fala, o processador Q-SYS recebe o sinal e envia instantaneamente as coordenadas de pan/tilt/zoom para a câmera PTZ mais próxima daquela bancada. O corte de imagem acontece em milissegundos, sem necessidade de operador humano. É a mesma tecnologia usada no Congresso Nacional e na ONU."
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
