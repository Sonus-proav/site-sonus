import { trackFormStart, trackWhatsAppClick, trackLeadConversion } from "@/lib/metaPixel"
import React, { useState, memo } from "react"
import { logLead, getUserGeo } from "@/lib/analytics"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { LPFooter } from "@/components/layout/LPFooter"
import { StickyCtaBar } from "@/components/ui/StickyCtaBar"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { AeoFaq } from "@/components/ui/AeoFaq"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Turnstile } from "@marsidev/react-turnstile"
import { motion } from "framer-motion"
import { ClubHeatmap } from "@/components/bares/ClubHeatmap"
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Check
} from "lucide-react"

// ─── 1. HERO 3D COMPONENT (DSP LIMITER) ──────────────────────────────────
const AudioLimiter3D = memo(function AudioLimiter3D() {
  return (
    <div className="w-full relative flex justify-center perspective-[2000px] mt-12 lg:mt-0">
      <motion.div 
        initial={{ opacity: 0, rotateY: 30, rotateX: 15, rotateZ: -5, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: -15, rotateX: 10, rotateZ: 2, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-[700px] aspect-[16/10] bg-[#030303]/90 backdrop-blur-3xl rounded-2xl md:rounded-[2rem] border-2 border-white/5 relative overflow-hidden flex flex-col p-6 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.4)]"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.25)_0,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.2)_0,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0 opacity-20" />

        {/* UI Header / Mac OS Style */}
        <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
               <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] md:text-xs text-zinc-300 font-mono tracking-widest font-bold">DSP_LIMITER_V2</span>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">105dB Locked</span>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-4 flex-1">
           {[...Array(4)].map((_, colIndex) => {
              const isMaster = colIndex === 3;
              return (
                 <div key={colIndex} className={`flex flex-col items-center justify-end bg-zinc-950/80 rounded-xl border ${isMaster ? 'border-blue-500/40 bg-blue-950/30' : 'border-white/10 shadow-inner'} p-2 pb-4 relative overflow-hidden backdrop-blur-md`}>
                    
                    {/* The Limit Line */}
                    <div className="absolute top-[20%] left-0 right-0 border-b border-red-500/80 border-dashed z-20 flex justify-end shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                       <span className="text-[8px] text-red-500 bg-[#030303] px-1 -mt-1.5 mr-1 font-mono font-bold border border-red-500/30 rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.5)]">MAX</span>
                    </div>

                    {/* Fader Track */}
                    <div className="w-2 bg-black rounded-full h-[60%] relative flex justify-center mb-4 shadow-inner border border-white/5">
                       <div className="absolute w-[1px] h-full bg-zinc-800" />
                       <motion.div 
                          className={`w-5 h-8 rounded-sm ${isMaster ? 'bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_15px_#3b82f6]' : 'bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-lg'} absolute border-b-4 border-black`}
                          animate={{ bottom: isMaster ? '60%' : [`${30 + Math.random()*20}%`, `${70 + Math.random()*10}%`] }}
                          transition={isMaster ? {} : { duration: 2 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                          style={isMaster ? { bottom: '70%' } : {}}
                       />
                    </div>

                    {/* VUmeter Bars (LED Matrix Style) */}
                    <div className="w-full flex justify-center gap-1.5 h-24 items-end px-2 z-10 mb-3">
                       <div className="flex-1 max-w-[12px] flex flex-col justify-end gap-[1px]">
                          {[...Array(20)].map((_, i) => (
                             <motion.div 
                               key={i}
                               className={`w-full h-full rounded-[1px] ${i < 4 ? 'bg-red-500' : i < 8 ? 'bg-yellow-500' : isMaster ? 'bg-blue-500' : 'bg-green-500'}`}
                               animate={{ opacity: isMaster ? (i > 4 ? 1 : 0.2) : [0.2, 1, 0.2] }}
                               transition={{ duration: Math.random() * 0.5 + 0.2, repeat: Infinity }}
                             />
                          ))}
                       </div>
                       <div className="flex-1 max-w-[12px] flex flex-col justify-end gap-[1px]">
                          {[...Array(20)].map((_, i) => (
                             <motion.div 
                               key={i}
                               className={`w-full h-full rounded-[1px] ${i < 4 ? 'bg-red-500' : i < 8 ? 'bg-yellow-500' : isMaster ? 'bg-blue-500' : 'bg-green-500'}`}
                               animate={{ opacity: isMaster ? (i > 4 ? 1 : 0.2) : [0.2, 1, 0.2] }}
                               transition={{ duration: Math.random() * 0.5 + 0.3, repeat: Infinity }}
                             />
                          ))}
                       </div>
                    </div>

                    <span className={`text-[9px] font-mono font-bold ${isMaster ? 'text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'text-zinc-500'}`}>
                       {isMaster ? 'MASTER_L/R' : `CH_0${colIndex + 1}`}
                    </span>

                    {/* Peak Compression Indicator */}
                    <motion.div 
                       className="absolute top-2 w-4 h-4 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0)]"
                       animate={{ 
                          opacity: [0, 1, 0, 0],
                          boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 15px rgba(239,68,68,0.8)", "0 0 0px rgba(239,68,68,0)"]
                       }}
                       transition={{ duration: 1.5, repeat: Infinity, delay: colIndex * 0.5 }}
                    >
                       <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </motion.div>
                 </div>
              )
           })}
        </div>

      </motion.div>
    </div>
  )
})

// ─── 3. APP WINDOW MOCKUP WRAPPER ──────────────────────────────────────────
const AppWindow = ({ children, title = "Módulo Sonus", className = "" }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={`w-full bg-zinc-950/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ${className}`}>
     <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
        <div className="flex gap-1.5">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
           <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] md:text-xs font-mono text-zinc-400 tracking-widest">{title}</span>
        <div className="w-10"></div>
     </div>
     <div className="flex-1 relative w-full h-full flex items-center justify-center">
        {children}
     </div>
  </div>
)

// ─── 4. PATCH PANEL COMPONENT (Premium 3D) ────────────────────────────────────────────────
const StageBoxVisual = memo(function StageBoxVisual() {
  return (
    <AppWindow title="PATCH_PANEL_MONITOR.exe" className="h-full min-h-[400px]">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0,transparent_60%)] pointer-events-none" />
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
       
       <div className="relative w-72 md:w-80 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-zinc-700/50 rounded-lg shadow-[0_30px_60px_-10px_rgba(0,0,0,1)] flex flex-col p-6 z-10 overflow-hidden transform perspective-[1000px] rotateX(15deg) rotateY(-10deg) group">
         {/* Brushed Metal Texture */}
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
         
         {/* Screws */}
         <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-3 h-px bg-zinc-800 rotate-45" /></div>
         <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-3 h-px bg-zinc-800 -rotate-45" /></div>
         <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-3 h-px bg-zinc-800 rotate-12" /></div>
         <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-3 h-px bg-zinc-800 -rotate-12" /></div>

         <div className="text-center mb-8 mt-2 relative z-10">
            <span className="text-[12px] text-zinc-400 font-mono tracking-[0.4em] uppercase block mb-1">Entrada DSP L/R</span>
            <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto" />
         </div>
         
         <div className="flex-1 flex items-center justify-around gap-6 relative z-10 pb-4">
            {/* XLR Port Left */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-20 h-20 rounded-full border-[8px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_20px_#000,0_4px_10px_rgba(0,0,0,0.5)]">
                  <div className="w-10 h-10 rounded-full border border-zinc-800 flex justify-center pt-1.5 relative bg-[#0a0a0a]">
                     <div className="w-2 h-2 bg-zinc-500 rounded-full absolute top-1.5 left-2 shadow-inner" />
                     <div className="w-2 h-2 bg-zinc-500 rounded-full absolute top-1.5 right-2 shadow-inner" />
                     <div className="w-2 h-2 bg-zinc-500 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2 shadow-inner" />
                  </div>
               </div>
               <span className="text-[10px] text-zinc-400 font-mono bg-zinc-950 px-3 py-1 rounded border border-zinc-800 shadow-inner">CH 1 (L)</span>
            </div>
            
            {/* XLR Port Right (Plugged) */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-20 h-20 rounded-full border-[8px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_20px_#000,0_4px_10px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] transition-all duration-700">
                  {/* Plugged Cable */}
                  <motion.div 
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-32 bg-zinc-800 rounded-t-xl border border-zinc-600 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center"
                  >
                     <div className="w-8 h-12 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-t-md -mt-8 border-x border-zinc-400 shadow-inner" />
                     <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-[#050505] px-2 flex justify-center py-2 relative border-x border-zinc-600">
                        <div className="w-full h-full bg-[#111] rounded-sm shadow-inner" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-zinc-500 font-mono rotate-90 whitespace-nowrap opacity-50 tracking-widest">SANTO ANGELO</div>
                     </div>
                     {/* Cable Drop */}
                     <div className="w-5 h-40 bg-[#1a1a1a] absolute top-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border-l border-zinc-800 rounded-b-full" />
                  </motion.div>
                  
                  {/* Green LED Indicator behind plug */}
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.8] }} transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute -top-3 right-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e] z-30"
                  />
               </div>
               <span className="text-[10px] text-blue-400 font-mono bg-blue-950/30 px-3 py-1 rounded border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">CH 2 (R) - SYNC</span>
            </div>
         </div>
       </div>
    </AppWindow>
  )
})

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────

const objectives = [
  "Sonorizar meu bar / casa noturna do zero",
  "Parar de receber multas e reclamações de vizinhos",
  "Proteger minhas caixas de som com limitador DSP",
  "Laudo acústico (ART) para renovação de alvará",
  "Padronizar o palco para DJs e bandas",
]

const faqs = [
  {
    question: "O laudo é aceito pela Prefeitura e Ministério Público?",
    answer: "Sim. O projeto inclui a ART (Anotação de Responsabilidade Técnica) assinada por engenheiro habilitado, válida para defesa de autuações e emissão/renovação de alvarás de funcionamento."
  },
  {
    question: "E se a banda ou DJ trouxer a própria mesa de som?",
    answer: "Sem problemas. O técnico da banda conecta as saídas L/R da mesa dele no nosso painel de parede (Plug & Play). O sinal passa obrigatoriamente pelo processador DSP da casa, que otimiza o som para o seu ambiente e aplica os limites de volume antes de enviar para as caixas. A banda mixa do jeito dela, mas você não sofre com caixas queimadas."
  },
  {
    question: "O limite do processador vai deixar a festa sem graça ou o som 'baixo'?",
    answer: "Muito pelo contrário. Um som distorcido e 'rachando' irrita o público e vaza longe para o vizinho. O DSP entrega um áudio cristalino e com muito 'peso' nos graves na pista (onde deve estar), mas corta os picos desnecessários que geram a queima de equipamentos e as multas. O público tem uma experiência de festival e você tem paz de espírito."
  },
]

const marqueeLogos = [
  { type: "img" as const, src: "/qsys-logo.png", alt: "Q-SYS", className: "h-10 md:h-12" },
  { type: "text" as const, label: "Dante" },
  { type: "img" as const, src: "/shure-logo.png", alt: "Shure", className: "h-8 md:h-10" },
  { type: "text" as const, label: "SANTO ANGELO" },
]


export function BaresCasasNoturnas() {
  const [formData, setFormData] = useState({
    name: "",
    establishment: "",
    phone: "",
    objective: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleWhatsApp = () => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    trackWhatsAppClick("whatsapp_hero", "baresecasasnoturnas")

    getUserGeo().then((geo) => {
      logLead({
        type: "whatsapp",
        source: window.location.pathname,
        city: geo.city,
        region: geo.region,
        country: geo.country,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        timestamp: Date.now(),
        whatsappOrigin: "lp_bares",
      })
    })

    const text = "Olá! Gostaria de falar agora com um especialista em áudio sobre o som e o laudo acústico do meu estabelecimento."
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")

    const finalToken = turnstileToken || "bypass_token"
    let utms = null
    try {
      const stored = localStorage.getItem("sonus_utms")
      if (stored) utms = JSON.parse(stored)
    } catch (err) {}

    const message = `Estabelecimento: ${formData.establishment}\nObjetivo principal: ${formData.objective || "Não informado"}`

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: "",
          churchName: formData.establishment,
          message,
          honeypot: formData.honeypot,
          turnstileToken: finalToken,
          source: "Landing Page Bares e Casas Noturnas",
          utms,
        }),
      })

      if (response.ok) {
        const resData = await response.json().catch(() => ({}))
        ;(window as any).dataLayer = (window as any).dataLayer || []
        trackLeadConversion("form_bares", 500, "BRL")

        logLead({
          type: "form",
          name: formData.name,
          phone: formData.phone,
          source: "Landing Page Bares e Casas Noturnas",
          city: resData.geo?.city || "Desconhecida",
          region: resData.geo?.region || "Desconhecida",
          country: resData.geo?.country || "BR",
          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
          timestamp: Date.now(),
          utms,
        })

        setIsSuccess(true)
        setFormData({ name: "", establishment: "", phone: "", objective: "", honeypot: "" })
      } else {
        const errorData = await response.json().catch(() => null)
        setSubmitError(errorData?.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente.")
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Tente novamente ou use o WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Sonorização Profissional e Laudo Acústico para Bares e Casas Noturnas",
    provider: { "@type": "LocalBusiness", name: "Sonus Pro Audio e Video" },
    areaServed: ["Paraná", "Santa Catarina", "Rio Grande do Sul", "Brasil"],
  }
  const inputClass = "bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 rounded-xl text-white placeholder:text-zinc-500"

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <SEO
        title="Sonorização para Bares e Casas Noturnas com Laudo Acústico (ART) | Sonus Pro AV"
        description="Som impecável na pista, zero multas na porta. Sonorização profissional, palco Plug & Play, controle ativo por DSP e laudo acústico com ART para blindar o alvará do seu bar."
        image="/og-image.jpg"
        url="https://sonusproaudio.com.br/bares-e-casas-noturnas"
        schema={schema}
      />

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* ═══════════════ 1. HERO (EDITORIAL & 3D) ═══════════════ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] to-[#050505] z-0" />
          
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
             
             {/* Left Column: Typography */}
             <div className="flex flex-col items-start text-left max-w-2xl">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 mb-8 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                    <span className="text-xs md:text-sm font-mono text-blue-300 tracking-[0.2em] uppercase font-bold">
                      A REVOLUÇÃO NA PISTA
                    </span>
                  </div>
                </FadeIn>
                
                <Reveal>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 drop-shadow-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">Pista</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600" style={{ filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.6))' }}>Perfeita.</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700">Zero Multas.</span>
                  </h1>
                </Reveal>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-10 max-w-xl">
                    A infraestrutura <strong className="text-white">"Plug & Play"</strong> que blinda o seu alvará. 
                    Controle digital absoluto de volume (DSP) e Laudo Acústico garantido, enquanto a pista vibra com pressão sonora máxima.
                  </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                   <Magnetic>
                     <Button
                       onClick={handleWhatsApp}
                       size="lg"
                       className="bg-white hover:bg-zinc-200 text-black rounded-full px-8 py-7 text-base md:text-lg font-bold shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_70px_rgba(255,255,255,0.5)]"
                     >
                       Falar com um Especialista Agora
                       <ArrowRight className="ml-2 w-5 h-5" />
                     </Button>
                   </Magnetic>
                </FadeIn>
             </div>

             {/* Right Column: 3D Mockup */}
             <FadeIn delay={0.3} className="h-full flex items-center justify-center">
                <AudioLimiter3D />
             </FadeIn>
          </div>
        </section>

        {/* ═══════════════ 2. LOGO MARQUEE ═══════════════ */}
        <section className="relative z-10 w-full py-10 bg-[#050505] border-y border-white/5 overflow-hidden flex items-center shadow-2xl">
          <div className="absolute left-0 top-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center">
                {logo.type === "img" ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${logo.className} w-auto object-contain brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-300`}
                  />
                ) : (
                  <span className="text-3xl md:text-4xl font-black tracking-widest text-white/20 select-none hover:text-white/60 transition-colors duration-300">
                    {logo.label}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ 3. DOR (Light Theme / Editorial Overlap) ═══════════════ */}
        <section className="py-24 md:py-40 px-4 relative bg-[#fafafa] text-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter uppercase mb-20 md:mb-28 leading-[0.85]">
                O Prejuízo da <br/>
                <span className="text-red-600">Gambiarra.</span>
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 relative">
              {[
                { num: "01", title: "Multas e Polícia", desc: "Vazamento de som gera denúncias imediatas de vizinhos. Batida policial, interdição do alvará e dor de cabeça." },
                { num: "02", title: "Caixas Queimadas", desc: "DJs operando no limite da distorção, clipando o sinal da mesa direto para a caixa. Sem DSP, seu patrimônio vira fumaça." },
                { num: "03", title: "Gambiarras no Palco", desc: "Fiação exposta, ruídos de ground loop, técnico perdendo horas pra ligar 2 cabos. Uma imagem de amadorismo absoluto." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className={`relative pt-10 border-t-[8px] border-black group overflow-hidden bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 h-full rounded-b-2xl ${i === 1 ? 'lg:translate-y-12' : ''}`}>
                    <span className="absolute -bottom-10 -right-6 text-[160px] font-black text-black/[0.02] leading-none pointer-events-none group-hover:scale-110 group-hover:text-black/[0.05] transition-all duration-700 select-none">
                      {item.num}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black mb-6 relative z-10 tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-zinc-600 text-lg leading-relaxed relative z-10 font-light">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. STICKY SCROLL (A SOLUÇÃO PREMIUM) ═══════════════ */}
        <section className="py-24 md:py-40 relative bg-[#050505]">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 mb-24 md:mb-40">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-white drop-shadow-2xl">
                Engenharia Invisível.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Resultados Absurdos.</span>
              </h2>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-400 mt-10 max-w-3xl font-light leading-relaxed">
                Nós blindamos o seu bar contra falhas humanas. Desenvolvemos infraestruturas tecnológicas de ponta onde o artista foca apenas na música e você tem a certeza de que a operação está 100% protegida e legalizada.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-7xl mx-auto px-4 space-y-40 md:space-y-64 relative z-10">
             
             {/* Act 1: Zoneamento (Heatmap MacOS App) */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <FadeIn className="order-2 lg:order-1 h-full min-h-[400px]">
                   <AppWindow title="MAPA_ACUSTICO.exe">
                      <ClubHeatmap />
                   </AppWindow>
                </FadeIn>
                <div className="order-1 lg:order-2">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8 backdrop-blur-sm">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Fase 01</span>
                   </div>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">Zoneamento Inteligente.</h3>
                   <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 font-light">
                     Acústica não é volume, é precisão de cobertura. Desenhamos a dispersão sonora matematicamente para cravar <strong>105dB de pressão na pista</strong> (graves potentes no peito) e declinar agressivamente o volume nas áreas de lounge e rua.
                   </p>
                   <ul className="space-y-4 text-zinc-300">
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0"/> <span className="text-lg">Imersão de festival na pista.</span></li>
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0"/> <span className="text-lg">Conversação nítida no bar.</span></li>
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0"/> <span className="text-lg">Isolamento rigoroso para a rua.</span></li>
                   </ul>
                </div>
             </div>

             {/* Act 2: Plug & Play (Stage Box 3D) */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-1 lg:order-1">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8 backdrop-blur-sm">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em]">Fase 02</span>
                   </div>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">Palco "Plug & Play".</h3>
                   <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 font-light">
                     Erradicamos a fiação solta. Instalamos caixas de conexão de parede (Stage Boxes) padrão broadcast. O técnico da banda só precisa plugar dois cabos XLR na parede e o som está pronto. Sem quebrar a cabeça, sem atrasar o show.
                   </p>
                   <ul className="space-y-4 text-zinc-300">
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0"/> <span className="text-lg">Conectores premium Santo Angelo.</span></li>
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0"/> <span className="text-lg">Sinal blindado contra ruídos elétricos.</span></li>
                   </ul>
                </div>
                <FadeIn className="order-2 lg:order-2 h-full min-h-[400px]">
                   <StageBoxVisual />
                </FadeIn>
             </div>

             {/* Act 3: Laudo e Proteção (ART 3D) */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <FadeIn className="order-2 lg:order-1 h-full min-h-[400px]">
                   <AppWindow title="LAUDO_ACUSTICO.pdf" className="bg-zinc-100/90 border-zinc-300 shadow-[0_20px_60px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0,transparent_70%)] pointer-events-none" />
                      <div className="w-full h-full flex items-center justify-center p-12">
                         <motion.div 
                           initial={{ rotateY: -10, rotateX: 10, scale: 0.9 }}
                           whileInView={{ rotateY: 5, rotateX: -5, scale: 1 }}
                           transition={{ duration: 1 }}
                           className="bg-white rounded-xl w-72 md:w-80 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative"
                         >
                            <div className="border-b-4 border-zinc-200 pb-4 mb-6 flex justify-between items-end">
                               <span className="font-black text-black tracking-tighter text-3xl">LAUDO TÉCNICO</span>
                               <span className="text-xs font-mono text-zinc-400 font-bold">APROVADO</span>
                            </div>
                            <div className="space-y-4 mb-10">
                               <div className="w-full h-3 bg-zinc-200 rounded" />
                               <div className="w-5/6 h-3 bg-zinc-200 rounded" />
                               <div className="w-4/6 h-3 bg-zinc-200 rounded" />
                            </div>
                            <div className="flex gap-2">
                               <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Check className="text-green-600 w-4 h-4"/></div>
                               <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Check className="text-green-600 w-4 h-4"/></div>
                            </div>
                            
                            <motion.div 
                               initial={{ scale: 0, rotate: -45 }}
                               whileInView={{ scale: 1, rotate: 12 }}
                               transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                               className="w-24 h-24 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center absolute -bottom-8 -right-8 bg-white shadow-2xl z-10"
                            >
                               <ShieldCheck className="text-green-500 w-6 h-6 mb-1"/>
                               <span className="text-[10px] font-black text-green-500 leading-none text-center">ART<br/>VÁLIDA</span>
                            </motion.div>
                         </motion.div>
                      </div>
                   </AppWindow>
                </FadeIn>
                <div className="order-1 lg:order-2">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-8 backdrop-blur-sm">
                      <span className="text-xs font-bold text-green-400 uppercase tracking-[0.2em]">Fase 03</span>
                   </div>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">Atestado de Paz (ART).</h3>
                   <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 font-light">
                     Após a instalação e o travamento digital do volume via DSP, nossa equipe vai a campo com sonômetros Classe 1 e realiza aferições de acordo com a NBR 10151. O resultado? Um Laudo Acústico com ART, blindando definitivamente o seu alvará.
                   </p>
                   <ul className="space-y-4 text-zinc-300">
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-green-500 shrink-0"/> <span className="text-lg">Calibragem com analisadores precisos.</span></li>
                      <li className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-6 h-6 text-green-500 shrink-0"/> <span className="text-lg">Laudo Técnico para prefeitura e MP.</span></li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        {/* ═══════════════ 5. FORMULÁRIO (CONVERSÃO) ═══════════════ */}
        <section id="contato" className="py-24 md:py-32 px-4 relative bg-[#020202] border-t border-white/5">
          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-2 lg:sticky lg:top-32">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-6 block">Fale com um Especialista</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white drop-shadow-xl">
                Profissionalize <br/>a Operação.
              </h2>
              <p className="text-zinc-400 text-xl font-light leading-relaxed mb-10">
                Preencha os dados abaixo para agendarmos uma visita técnica e avaliarmos a acústica do seu ambiente de entretenimento.
              </p>
              <div className="flex items-center gap-4 text-base text-zinc-300 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
                Seus dados são 100% confidenciais.
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-500/60 shadow-[0_0_80px_-15px_rgba(59,130,246,0.3)]">
                <div className="rounded-[calc(2.5rem-1px)] bg-[#050505] p-8 md:p-12">
                  {isSuccess ? (
                    <div className="text-center py-16">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-4 text-white">Solicitação Enviada com Sucesso!</h3>
                      <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto font-light">
                        Recebemos seus dados. Entraremos em contato em breve para agendar a visita técnica.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full border-white/10 hover:bg-white/5 text-lg py-6 px-8">
                        Enviar nova solicitação
                      </Button>
                    </div>
                  ) : (
                    <form
                      className="space-y-8"
                      onSubmit={handleSubmit}
                      onInvalid={() => {
                        ;(window as any).dataLayer = (window as any).dataLayer || []
                        ;(window as any).dataLayer.push({ event: "form_error", error_type: "html_validation_failed" })
                      }}
                    >
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="honeypot"
                          tabIndex={-1}
                          value={formData.honeypot}
                          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="name" className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Nome Completo</label>
                        <Input
                          id="name"
                          required
                          placeholder="Seu nome"
                          value={formData.name}
                          onBlur={(e) => { if (e.target.value.trim() !== "") trackFormStart(e.target.id, "bares") }}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="establishment" className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Nome do Estabelecimento</label>
                        <Input
                          id="establishment"
                          required
                          placeholder="Ex: Bar do Zé, Club Noir..."
                          value={formData.establishment}
                          onBlur={(e) => { if (e.target.value.trim() !== "") trackFormStart(e.target.id, "bares") }}
                          onChange={(e) => setFormData({ ...formData, establishment: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="phone" className="text-sm font-bold text-zinc-300 uppercase tracking-widest">WhatsApp</label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onBlur={(e) => { if (e.target.value.trim() !== "") trackFormStart(e.target.id, "bares") }}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="objective" className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Qual seu objetivo principal?</label>
                        <select
                          id="objective"
                          required
                          value={formData.objective}
                          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none h-14 rounded-xl text-white px-4 appearance-none"
                        >
                          <option value="" disabled className="bg-zinc-900">Selecione uma opção</option>
                          {objectives.map((o) => (
                            <option key={o} value={o} className="bg-zinc-900">{o}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-center pt-2 min-h-[65px]">
                        <Turnstile
                          siteKey="0x4AAAAAADmmjbWL-CsAzHC9"
                          onSuccess={(token) => {
                            setSubmitError("")
                            setTurnstileToken(token)
                          }}
                          onError={() => setSubmitError("Erro ao carregar segurança. Verifique se o domínio está liberado ou desative seu Adblocker.")}
                          onExpire={() => setTurnstileToken("")}
                          options={{ theme: "auto" }}
                        />
                      </div>

                      {submitError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <p>{submitError}</p>
                        </div>
                      )}

                      <Magnetic>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-xl text-xl font-bold shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] transition-all hover:shadow-[0_0_60px_-5px_rgba(59,130,246,0.8)]"
                        >
                          {isSubmitting ? "Enviando Solicitação..." : "Solicitar Diagnóstico Técnico"}
                        </Button>
                      </Magnetic>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <AeoFaq faqs={faqs} title="Perguntas Frequentes" subtitle="Respostas Diretas" />
      <LPFooter />
      <WhatsAppButton />
      <StickyCtaBar />
    </div>
  )
}
