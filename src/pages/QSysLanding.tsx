import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { Helmet } from "react-helmet-async"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { 
  Cpu, Settings, ChevronRight, Video, Mic, Sliders, CheckCircle2, 
  Play, BrainCircuit, Wifi, Battery, Globe, Zap, Network, SlidersHorizontal, MonitorPlay, Lock
} from "lucide-react"
import { SEO } from "../components/SEO"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { Navbar } from "@/components/layout/Navbar"
import { LPFooter } from "@/components/layout/LPFooter"
import { TestimonialSection } from "@/components/ui/TestimonialSection"
import { StickyCtaBar } from "@/components/ui/StickyCtaBar"
import { WarrantyBanner } from "@/components/layout/WarrantyBanner"
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion"

import certLevel1 from "@/assets/cert-level1.webp"
import certVision from "@/assets/cert-vision.webp"
import certSales from "@/assets/cert-sales.webp"
import { useLocation } from "react-router-dom"

// --- Animated Counter Component ---
function AnimatedCounter({ from = 0, to, duration = 2, prefix = "", suffix = "", decimals = 0 }: { from?: number, to: number, duration?: number, prefix?: string, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true })
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
          }
        },
      })
      return () => controls.stop()
    }
  }, [from, to, duration, prefix, suffix, decimals, inView])

  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>
}

export function QSysLanding() {
  const location = useLocation()
  
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const [activeFauxScene, setActiveFauxScene] = useState<"presentation" | "video">("presentation")
  const [activeDashboardTab, setActiveDashboardTab] = useState("Cenários")

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")
    
    const finalToken = turnstileToken || "bypass_token"

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Q-SYS" })
      })

      if (response.ok) {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: 'lead_qsys_sucesso', lead_type: 'form_qsys' });

        setIsSuccess(true)
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" })
      } else {
        const err = await response.json()
        setSubmitError(err.error || "Erro ao enviar a mensagem.")
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Tente novamente ou use o WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com o especialista Q-SYS sobre o meu projeto.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Helmet>
      </Helmet>
      <SEO 
        title="Integração e Instalação Q-SYS | Automação AV | Sonus Pro AV" 
        description="Integração audiovisual com o ecossistema Q-SYS. Controle de áudio, vídeo e automação corporativa centralizada, sem limite de escalabilidade." 
        image="/qsys-tech-bg.webp"
        url="https://sonusproaudio.com.br/qsys"
      />

      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Animated Counters + Oversized Typography */}
      {/* ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-32 pb-32 md:pt-40 md:pb-32 px-4 md:px-6 min-h-[100dvh] flex flex-col items-center justify-center overflow-x-hidden">
        {/* Tech Background Network Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
              <span className="text-sm font-semibold tracking-wide text-blue-300">Avanço Tecnológico Corporativo</span>
            </div>
          </FadeIn>

          <Reveal>
            <h1 className="text-5xl sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-[1] md:leading-[0.85] text-white">
              O CÉREBRO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                INTELIGENTE.
              </span>
            </h1>
          </Reveal>

          <FadeIn delay={0.2} className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pt-8 pb-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white"><AnimatedCounter to={100} suffix="%" /></span>
              <span className="text-blue-400 font-mono text-sm uppercase mt-2">Integrado em Rede</span>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
              <span className="text-4xl md:text-5xl font-black text-white"><AnimatedCounter to={99.9} decimals={1} suffix="%" /></span>
              <span className="text-cyan-400 font-mono text-sm uppercase mt-2">Uptime Corporativo</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white"><AnimatedCounter to={0} suffix=" Latência" /></span>
              <span className="text-emerald-400 font-mono text-sm uppercase mt-2">Áudio, Vídeo e Controle</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
              O ecossistema Q-SYS unifica tudo em uma única plataforma baseada em software. Esqueça matrizes arcaicas e descubra a escalabilidade infinita.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto max-w-[400px] sm:max-w-none mx-auto pb-12 md:pb-0">
            <div className="w-full sm:w-auto">
              <Magnetic>
                <Button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105">
                  Dimensionar Meu Projeto
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Magnetic>
            </div>
            <div className="w-full sm:w-auto">
              <Button onClick={handleWhatsApp} variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white text-lg font-bold transition-all">
                Falar no WhatsApp
              </Button>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* INTERACTIVE UI PANEL — Maintained & Enhanced   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative rounded-[2.5rem] p-2 md:p-4 bg-white/[0.06] border border-white/[0.15] shadow-2xl md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-500/20 opacity-50 rounded-[2.5rem]" />
              <div className="rounded-[2rem] overflow-hidden bg-zinc-950 relative w-full flex flex-col border border-white/10 shadow-inner min-h-[600px]">
                
                {/* Header */}
                <div className="h-10 md:h-14 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-4 md:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                    <span className="font-semibold text-zinc-300 text-xs md:text-sm tracking-widest uppercase">Auditório Principal</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-5 text-zinc-400">
                    <Wifi className="w-4 h-4" />
                    <Battery className="w-4 h-4" />
                    <span className="text-xs md:text-sm font-bold text-zinc-300">14:30</span>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 flex flex-col md:flex-row p-3 md:p-6 gap-3 md:gap-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
                  {/* Left Nav */}
                  <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: "none" }}>
                    {[
                      { icon: <MonitorPlay className="w-5 h-5" />, label: "Cenários" },
                      { icon: <Mic className="w-5 h-5" />, label: "Áudio" },
                      { icon: <Video className="w-5 h-5" />, label: "Câmeras" },
                      { icon: <Settings className="w-5 h-5" />, label: "Sistema" },
                    ].map((item, idx) => {
                      const isActive = activeDashboardTab === item.label;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            setActiveDashboardTab(item.label);
                            (window as any).dataLayer = (window as any).dataLayer || [];
                            (window as any).dataLayer.push({ event: 'interact_qsys_dashboard', tab_name: item.label });
                          }}
                          className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer transition-all shrink-0 ${isActive ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300 border border-transparent'}`}
                        >
                          {item.icon}
                          <span className="font-semibold text-xs md:text-sm">{item.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Main Action Area */}
                  <div className="flex-1 flex flex-col gap-4 md:gap-6 relative bg-black/40 border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-hidden min-h-[300px]">
                    {activeDashboardTab === "Cenários" && (
                      <div className="flex-1 flex flex-col gap-4 md:gap-6 animate-in fade-in zoom-in-95 duration-500 relative">
                        {/* Background Scenes */}
                        <div className={`absolute -inset-6 transition-opacity duration-1000 pointer-events-none ${activeFauxScene === "presentation" ? 'opacity-20' : 'opacity-0'}`}>
                          <img src="https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity" alt="Apresentação" />
                        </div>
                        <div className={`absolute -inset-6 transition-opacity duration-1000 pointer-events-none ${activeFauxScene === "video" ? 'opacity-20' : 'opacity-0'}`}>
                          <img src="https://images.unsplash.com/photo-1598257006626-48b0c252070d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity" alt="Videochamada" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { id: "presentation", title: "Apresentação", color: "blue", active: activeFauxScene === "presentation", desc: "Display On • Áudio PC" },
                            { id: "video", title: "Videochamada", color: "purple", active: activeFauxScene === "video", desc: "Teams • Câmeras Auto" },
                          ].map((scene) => (
                            <div 
                              key={scene.id} 
                              onClick={() => {
                                setActiveFauxScene(scene.id as any);
                                (window as any).dataLayer = (window as any).dataLayer || [];
                                (window as any).dataLayer.push({ event: 'interact_qsys_scene', scene_type: scene.id });
                              }} 
                              className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border backdrop-blur-md ${scene.active ? (scene.id === 'presentation' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_40px_rgba(0,0,0,0.6)] scale-[1.03]' : 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_40px_rgba(0,0,0,0.6)] scale-[1.03]') : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'}`}
                            >
                              {scene.id === "presentation" ? <Play className="w-8 h-8 md:w-10 md:h-10 mb-2" /> : <Video className="w-8 h-8 md:w-10 md:h-10 mb-2" />}
                              <span className="font-bold text-sm md:text-base text-center">{scene.title}</span>
                              {scene.active && <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">{scene.desc}</span>}
                            </div>
                          ))}
                          
                          <div className="rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-not-allowed border bg-white/5 border-white/10 text-zinc-500 opacity-50 backdrop-blur-md">
                            <Lock className="w-8 h-8 md:w-10 md:h-10 mb-2" />
                            <span className="font-bold text-sm md:text-base text-center">Painel Privado</span>
                          </div>
                        </div>
                        
                        {/* Controls Footer */}
                        <div className="relative z-10 h-auto rounded-2xl md:rounded-3xl bg-zinc-950/80 border border-white/10 p-5 md:p-8 flex flex-col justify-center backdrop-blur-xl mt-auto">
                          <div className="flex justify-between items-end mb-5">
                            <div className="flex items-center gap-3 text-zinc-300">
                              <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" />
                              <div>
                                <span className="block font-semibold text-sm md:text-lg">Volume {activeFauxScene === "presentation" ? 'Sala (Apresentação)' : 'Recepção Teams'}</span>
                                <span className="text-xs text-zinc-500 font-mono">Q-SYS DSP Automix Ativo</span>
                              </div>
                            </div>
                            <span className="text-2xl md:text-4xl font-black text-white">{activeFauxScene === "presentation" ? '75%' : '60%'}</span>
                          </div>
                          <div className="h-5 md:h-6 bg-black rounded-full p-1 border border-white/10 relative overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ease-out relative ${activeFauxScene === "presentation" ? 'w-[75%] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'w-[60%] bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]'}`}>
                              <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeDashboardTab === "Áudio" && (
                      <div className="flex-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center p-8 bg-zinc-950/50 rounded-[2rem] border border-white/5 backdrop-blur-sm max-w-sm w-full mx-auto shadow-2xl">
                          <Mic className="w-16 h-16 mx-auto mb-6 text-blue-500 opacity-60 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                          <h3 className="text-2xl font-bold text-white mb-3">Controle DSP Avançado</h3>
                          <p className="text-sm text-zinc-400">O roteamento de áudio é nativo e automatizado. Nenhuma matriz analógica externa é necessária.</p>
                        </div>
                      </div>
                    )}
                    
                    {activeDashboardTab === "Câmeras" && (
                      <div className="flex-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center p-8 bg-zinc-950/50 rounded-[2rem] border border-white/5 backdrop-blur-sm max-w-sm w-full mx-auto shadow-2xl">
                          <Video className="w-16 h-16 mx-auto mb-6 text-purple-500 opacity-60 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                          <h3 className="text-2xl font-bold text-white mb-3">Comutação Automática</h3>
                          <p className="text-sm text-zinc-400">As câmeras PTZ rastreiam quem está falando via processamento de rede sem intervenção manual.</p>
                        </div>
                      </div>
                    )}
                    
                    {activeDashboardTab === "Sistema" && (
                      <div className="flex-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center p-8 bg-zinc-950/50 rounded-[2rem] border border-white/5 backdrop-blur-sm max-w-sm w-full mx-auto shadow-2xl">
                          <Settings className="w-16 h-16 mx-auto mb-6 text-emerald-500 opacity-60 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                          <h3 className="text-2xl font-bold text-white mb-3">Saúde do Ecossistema</h3>
                          <p className="text-sm text-zinc-400">Todos os endpoints e periféricos AV estão on-line, em sync e reportando status saudável (Verde).</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="text-center mt-6">
            <span className="text-zinc-500 font-mono text-xs">Exemplo de interface touch padronizável. Toque nos cenários acima ↑</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CERTIFICATIONS BAR                            */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative py-12 px-4 border-y border-white/5 bg-white/[0.02] z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6 text-center md:text-left">Equipe Oficialmente Certificada Q-SYS</p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 opacity-90">
              <img src={certLevel1} alt="Q-SYS Level 1 Certified" className="h-10 md:h-12 w-auto object-contain" />
              <img src={certVision} alt="Q-SYS Visionsuite Certified" className="h-10 md:h-12 w-auto object-contain" />
              <img src={certSales} alt="Q-SYS Sales Professional" className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6 text-center md:text-right">Integração Nativa Garantida</p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6 md:gap-10 opacity-50">
              <span className="text-xl font-black tracking-tighter text-white">Microsoft Teams</span>
              <img src="/zoom-logo.png" alt="Zoom" className="h-6 md:h-8 w-auto object-contain brightness-0 invert" />
              <img src="/google-meet-logo.png" alt="Google Meet" className="h-6 md:h-8 w-auto object-contain brightness-0 invert" />
              <img src="/shure-logo.png" alt="Shure" className="h-5 md:h-6 w-auto object-contain brightness-0 invert" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* BENTO GRID (Spotlight Cards)                  */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              A arquitetura do futuro <br className="hidden md:block" />não usa cabos analógicos.
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              O ecossistema Q-SYS processa áudio, vídeo e controle de automação puramente através de rede IP padronizada.
            </p>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Bento 1: Grande esquerda */}
            <FadeIn className="lg:w-2/3 h-full">
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80 group">
                <div className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Processamento via Software</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg flex-1">
                    Enquanto sistemas antigos precisam de hardware físico para cada função (matriz, cancelador de eco, processador de vídeo), o Q-SYS executa tudo isso via software em um único Core processador padrão de TI. Atualizações remotas, segurança em rede e zero obsolescência.
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 text-sm text-zinc-500 font-mono">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Criptografia 802.1x</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Escalonável Infinitamente</span>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>

            {/* Bentos Menores (Direita) */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              <FadeIn delay={0.1} className="h-full">
                <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80 group flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Padrão Corporativo</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                    A mesma interface (e código) na sala de 4 lugares e no auditório de 400.
                  </p>
                </SpotlightCard>
              </FadeIn>

              <FadeIn delay={0.2} className="h-full">
                <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80 group flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Salas Autônomas</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                    Câmeras AI rastreiam fala ativando recursos sem precisar de toques.
                  </p>
                </SpotlightCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SUCCESS CASES — Differentiated Layout          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-4 z-10 relative bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-6">
              <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">Escala Global</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Poder de Fogo em Nível Mundial
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                O ecossistema Q-SYS é a espinha dorsal tecnológica das infraestruturas mais críticas do planeta.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-8">
              {[
                { img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop", name: "Camp Randall Stadium", icon: <Globe className="w-5 h-5" />, desc: "Áudio 100% em rede distribuído sem latência para mais de 80.000 pessoas." },
                { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop", name: "Vienna Univ. of Economics", icon: <Zap className="w-5 h-5" />, desc: "Modernização ágil de dezenas de auditórios gigantes para ensino híbrido." },
                { img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop", name: "FC Twente Stadium", icon: <Sliders className="w-5 h-5" />, desc: "Controle de milhares de canais de áudio operados por staffs não-técnicos através de telas simples." }
              ].map((c, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-xl hover:bg-white/[0.05] transition-all duration-300">
                    <div className="w-full md:w-2/5 aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden relative shrink-0">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent md:hidden" />
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-blue-500/80 text-white flex items-center justify-center backdrop-blur-md md:hidden">
                        {c.icon}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-center">
                      <div className="hidden md:flex w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 items-center justify-center mb-4 border border-blue-500/30">
                        {c.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{c.name}</h3>
                      <p className="text-zinc-400 leading-relaxed font-light">{c.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WarrantyBanner 
        variant="qsys"
        title="3 Anos de Garantia no Ecossistema"
        description="Confiamos plenamente na robustez do sistema Q-SYS e em nossa execução. Toda a integração conta com 3 anos de garantia integral sobre qualquer defeito na infraestrutura e instalação."
      />

      {/* ══════════════════════════════════════════════ */}
      {/* FULL-BLEED CTA WITH MAGNETIC                  */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto rounded-[3rem] p-6 sm:p-10 md:p-24 bg-gradient-to-br from-blue-950 via-blue-900 to-black border border-blue-500/30 text-center relative overflow-hidden shadow-2xl flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[url('/soundwave-bg.webp')] opacity-20 mix-blend-overlay" />
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
              Padrão Sonus.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Paz de Espírito Corporativa.</span>
            </h2>
            <Magnetic>
              <Button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="h-16 px-6 sm:px-8 md:px-12 rounded-full bg-white text-blue-950 text-base md:text-lg font-bold shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all hover:scale-105 mt-4 w-full sm:w-auto flex justify-center">
                Dimensionar Q-SYS Agora
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT FORM                                  */}
      {/* ══════════════════════════════════════════════ */}
      <section id="contato" className="py-20 md:py-32 relative border-t border-white/5 px-4 z-10">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Inicie seu Projeto <span className="text-blue-500">Q-SYS</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <SpotlightCard className="rounded-[2rem] p-6 md:p-12 border border-white/10 bg-zinc-950/50">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Solicitação Enviada com Sucesso!</h3>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full mt-4">
                    Enviar nova solicitação
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
                      <Input required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 text-white placeholder:text-zinc-500 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                      <Input required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 text-white placeholder:text-zinc-500 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail Profissional</label>
                    <Input required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@empresa.com.br" className="bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 text-white placeholder:text-zinc-500 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-zinc-300">Descrição do Projeto</label>
                    <Textarea required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Conte-nos sobre a necessidade da sua empresa..." className="bg-white/5 border-white/10 focus-visible:ring-blue-500 min-h-[140px] resize-none text-white placeholder:text-zinc-500 p-4 rounded-xl" />
                  </div>

                  <div className="flex justify-center pt-2 min-h-[65px]">
                    <Turnstile 
                      siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                      onSuccess={(token) => { setSubmitError(""); setTurnstileToken(token); }}
                      onError={() => setSubmitError("Erro ao carregar segurança.")}
                      onExpire={() => setTurnstileToken("")}
                      options={{ theme: 'dark' }} 
                    />
                  </div>
                  
                  {submitError && (
                    <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-xl border border-red-500/20">
                      {submitError}
                    </div>
                  )}

                  <Magnetic>
                    <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all">
                      {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                    </Button>
                  </Magnetic>
                </form>
              )}
            </SpotlightCard>
          </FadeIn>
        </div>
      </section>

      <TestimonialSection />
      <LPFooter />
      <WhatsAppButton message="Olá! Gostaria de dimensionar um projeto Q-SYS." />
      <StickyCtaBar />
    </div>
  )
}
