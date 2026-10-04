import { trackFormStart, trackWhatsAppClick, trackLeadConversion } from "@/lib/metaPixel"
import React, { useState, memo, useEffect } from "react"
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
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Maximize2,
  FileText
} from "lucide-react"

// ─── 1. HERO 3D COMPONENT (DSP LIMITER) ──────────────────────────────────
const AudioLimiter3D = memo(function AudioLimiter3D() {
  return (
    <div className="w-full relative flex justify-center perspective-[2000px] mt-12 lg:mt-0">
      <motion.div 
        initial={{ opacity: 0, rotateY: 20, rotateX: 20, rotateZ: -5, y: 50 }}
        animate={{ opacity: 1, rotateY: -10, rotateX: 15, rotateZ: 2, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-[700px] aspect-[16/10] bg-[#030303] rounded-2xl md:rounded-[2rem] border border-white/10 relative overflow-hidden flex flex-col p-6 shadow-[0_0_80px_rgba(59,130,246,0.3)]"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2)_0,transparent_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.15)_0,transparent_70%)] pointer-events-none z-0" />

        {/* UI Header */}
        <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
               <Activity className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-[10px] md:text-xs text-zinc-300 font-mono tracking-widest font-bold">SONUS_DSP_CORE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">System Armed</span>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-4 flex-1">
           {[...Array(4)].map((_, colIndex) => {
              const isMaster = colIndex === 3;
              return (
                 <div key={colIndex} className={`flex flex-col items-center justify-end bg-zinc-950/50 rounded-xl border ${isMaster ? 'border-blue-500/30 bg-blue-950/20' : 'border-white/5'} p-2 pb-4 relative overflow-hidden`}>
                    
                    {/* The Limit Line */}
                    <div className="absolute top-[20%] left-0 right-0 border-b border-red-500/50 border-dashed z-20 flex justify-end">
                       <span className="text-[8px] text-red-500 bg-[#030303] px-1 -mt-1.5 mr-1 font-mono font-bold">MAX</span>
                    </div>

                    {/* Fader Track */}
                    <div className="w-2 bg-zinc-900 rounded-full h-[60%] relative flex justify-center mb-4">
                       <div className="absolute w-[1px] h-full bg-zinc-800" />
                       <motion.div 
                          className={`w-4 h-6 rounded ${isMaster ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-zinc-700'} absolute border-b-2 border-black`}
                          animate={{ bottom: isMaster ? '60%' : [`${30 + Math.random()*20}%`, `${70 + Math.random()*10}%`] }}
                          transition={isMaster ? {} : { duration: 2 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                          style={isMaster ? { bottom: '70%' } : {}}
                       />
                    </div>

                    {/* VUmeter Bars */}
                    <div className="w-full flex justify-center gap-1 h-20 items-end px-2 z-10 mb-2">
                       <div className="flex-1 max-w-[12px] bg-zinc-900 rounded-t-sm flex flex-col justify-end overflow-hidden">
                          <motion.div 
                             className={`w-full ${isMaster ? 'bg-blue-400' : 'bg-green-400'}`}
                             animate={{ height: [`${40 + Math.random()*20}%`, `${90 + Math.random()*20}%`, `${30 + Math.random()*20}%`] }}
                             transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                             style={{ maxHeight: '80%' }} // Clipped at 80% (Limit line)
                          />
                       </div>
                       <div className="flex-1 max-w-[12px] bg-zinc-900 rounded-t-sm flex flex-col justify-end overflow-hidden">
                          <motion.div 
                             className={`w-full ${isMaster ? 'bg-blue-400' : 'bg-green-400'}`}
                             animate={{ height: [`${50 + Math.random()*20}%`, `${85 + Math.random()*30}%`, `${40 + Math.random()*20}%`] }}
                             transition={{ duration: 0.6 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                             style={{ maxHeight: '80%' }}
                          />
                       </div>
                    </div>

                    <span className={`text-[9px] font-mono font-bold ${isMaster ? 'text-blue-400' : 'text-zinc-500'}`}>
                       {isMaster ? 'MASTER_L/R' : `CH_0${colIndex + 1}`}
                    </span>

                    {/* Peak Compression Indicator */}
                    <motion.div 
                       className="absolute top-2 w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center"
                       animate={{ opacity: [0, 1, 0, 0] }}
                       transition={{ duration: 2, repeat: Infinity, delay: colIndex * 0.5 }}
                    >
                       <div className="w-1 h-1 bg-red-500 rounded-full" />
                    </motion.div>
                 </div>
              )
           })}
        </div>

        {/* LED Matrix Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.5)_2px,transparent_2px)] bg-[size:3px_3px] md:bg-[size:4px_4px] pointer-events-none z-40 opacity-30" />
      </motion.div>
    </div>
  )
})

// ─── 2. HEATMAP COMPONENT ────────────────────────────────────────────────
const ClubHeatmap = memo(function ClubHeatmap() {
  const [activeZone, setActiveZone] = useState<number | null>(0)
  
  const zones = [
    { id: 0, label: "Pista Principal", x: "25%", y: "15%", w: "50%", h: "40%", coverage: 105, desc: "Alta pressão sonora. Graves no peito. 105dB cravados." },
    { id: 1, label: "Camarotes", x: "5%", y: "15%", w: "18%", h: "40%", coverage: 95, desc: "Som imersivo mas permite conversa." },
    { id: 2, label: "Lounge / Bar", x: "77%", y: "15%", w: "18%", h: "40%", coverage: 90, desc: "Áudio claro para fundo musical e interação no bar." },
    { id: 3, label: "Corredores", x: "20%", y: "60%", w: "60%", h: "15%", coverage: 85, desc: "Transição suave de volume. Sem picos." },
    { id: 4, label: "Rua (Externa)", x: "25%", y: "80%", w: "50%", h: "12%", coverage: 55, desc: "Isolamento acústico. Zero vazamento para vizinhos." },
  ]

  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % zones.length
      setActiveZone(zones[idx].id)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const activeData = zones.find(z => z.id === activeZone)

  return (
    <div className="w-full h-full flex flex-col justify-center relative p-6">
      <div className="relative aspect-[4/3] w-full max-w-sm mx-auto">
        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#050505] overflow-hidden shadow-2xl">
          {zones.map((zone) => {
            const isActive = activeZone === zone.id
            const isExternal = zone.id === 4 
            const colorTheme = isExternal ? "20,184,166" : "59,130,246" 
            
            return (
              <motion.div
                key={zone.id}
                className="absolute cursor-pointer rounded-lg border overflow-hidden z-10 flex flex-col items-center justify-center"
                style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
                animate={{
                  backgroundColor: isActive ? `rgba(${colorTheme},0.2)` : `rgba(${colorTheme},0.04)`,
                  borderColor: isActive ? `rgba(${colorTheme},0.5)` : `rgba(${colorTheme},0.1)`,
                }}
                transition={{ duration: 0.4 }}
              >
                <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(${colorTheme},0.3),transparent_70%)] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <span className={`relative z-10 font-black transition-all duration-300 ${isActive ? 'text-white text-lg md:text-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]' : `text-[rgba(${colorTheme},0.4)] text-xs`}`}>
                  {zone.coverage}dB
                </span>
                <span className={`relative z-10 uppercase tracking-wider font-semibold transition-all text-center px-1 duration-300 ${isActive ? `text-[rgba(${colorTheme},0.8)] text-[9px]` : `text-[rgba(${colorTheme},0.3)] text-[7px]`}`}>
                  {zone.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
      <div className="mt-6 p-4 rounded-xl border border-white/5 bg-zinc-950 flex items-center gap-4 max-w-sm mx-auto w-full">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
          <Maximize2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">{activeData?.label}</p>
          <p className="text-zinc-400 text-xs mt-1">{activeData?.desc}</p>
        </div>
      </div>
    </div>
  )
})


// ─── 3. PATCH PANEL COMPONENT ────────────────────────────────────────────────
const StageBoxVisual = memo(function StageBoxVisual() {
  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Wall Box */}
      <div className="relative w-64 md:w-80 bg-[#111] border-4 border-zinc-800 rounded-2xl shadow-[0_30px_60px_-10px_rgba(0,0,0,1)] flex flex-col p-6 z-10 overflow-hidden transform perspective-[1000px] rotateX(5deg)">
        {/* Screws */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-zinc-700 shadow-inner flex items-center justify-center"><div className="w-2 h-px bg-zinc-900 rotate-45" /></div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-zinc-700 shadow-inner flex items-center justify-center"><div className="w-2 h-px bg-zinc-900 -rotate-45" /></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-zinc-700 shadow-inner flex items-center justify-center"><div className="w-2 h-px bg-zinc-900 rotate-12" /></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-zinc-700 shadow-inner flex items-center justify-center"><div className="w-2 h-px bg-zinc-900 -rotate-12" /></div>

        <div className="text-center mb-6 mt-2">
           <span className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase block mb-1">Entrada Sistema</span>
           <div className="h-px w-1/2 bg-zinc-800 mx-auto" />
        </div>
        
        <div className="flex-1 flex items-center justify-around gap-6">
           {/* XLR Port Left */}
           <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border-[6px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_15px_#000]">
                 <div className="w-8 h-8 rounded-full border border-zinc-800 flex justify-center pt-1 relative">
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute top-1 left-1.5" />
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute top-1 right-1.5" />
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
                 </div>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">L / CH 1</span>
           </div>
           
           {/* XLR Port Right (Plugged) */}
           <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border-[6px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_15px_#000]">
                 {/* Plugged Cable */}
                 <motion.div 
                   initial={{ y: -50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.5 }}
                   className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-28 bg-zinc-800 rounded-t-xl border border-zinc-600 shadow-2xl flex flex-col items-center"
                 >
                    <div className="w-6 h-10 bg-zinc-300 rounded-t-md -mt-6 border-x border-zinc-400" />
                    <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-black px-2 flex justify-center py-2 relative">
                       <div className="w-full h-full bg-[#111] rounded-sm" />
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-zinc-600 font-mono rotate-90 whitespace-nowrap opacity-50">NEUTRIK</div>
                    </div>
                    {/* Cable Drop */}
                    <div className="w-4 h-32 bg-[#1a1a1a] absolute top-full shadow-inner" />
                 </motion.div>
                 
                 {/* Behind the plug */}
                 <div className="w-8 h-8 rounded-full border border-zinc-800 flex justify-center pt-1 relative">
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute top-1 left-1.5" />
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute top-1 right-1.5" />
                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
                 </div>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">R / CH 2</span>
           </div>
        </div>
      </div>
    </div>
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
  { type: "text" as const, label: "NEUTRIK" },
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
                  <div className="inline-flex items-center gap-2 mb-8">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                    <span className="text-xs md:text-sm font-mono text-zinc-400 tracking-[0.2em] uppercase">
                      Sonorização para Entretenimento
                    </span>
                  </div>
                </FadeIn>
                
                <Reveal>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 drop-shadow-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">Pista</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600" style={{ filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.5))' }}>Perfeita.</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-500 to-zinc-700">Zero Multas.</span>
                  </h1>
                </Reveal>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                    A infraestrutura <strong className="text-white">"Plug & Play"</strong> que blinda o seu alvará. 
                    Controle digital absoluto de volume (DSP) e Laudo Acústico garantido, enquanto a pista vibra.
                  </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                   <Button
                     onClick={handleWhatsApp}
                     size="lg"
                     className="bg-white hover:bg-zinc-200 text-black rounded-full px-8 py-7 text-base md:text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
                   >
                     Falar com um Especialista Agora
                     <ArrowRight className="ml-2 w-5 h-5" />
                   </Button>
                </FadeIn>
             </div>

             {/* Right Column: 3D Mockup */}
             <FadeIn delay={0.3} className="h-full flex items-center justify-center">
                <AudioLimiter3D />
             </FadeIn>
          </div>
        </section>

        {/* ═══════════════ 2. LOGO MARQUEE ═══════════════ */}
        <section className="relative z-10 w-full py-8 bg-[#050505] border-y border-white/5 overflow-hidden flex items-center">
          <div className="absolute left-0 top-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-20 md:gap-32 items-center pr-20 md:pr-32 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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

        {/* ═══════════════ 3. DOR (Light Theme / Editorial) ═══════════════ */}
        <section className="py-24 md:py-40 px-4 relative bg-[#ffffff] text-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter uppercase mb-16 md:mb-24 leading-[0.9]">
                O Custo da <br/>
                <span className="text-red-600">Gambiarra.</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              {[
                { num: "01", title: "Multas e Interdição", desc: "A Lei do Silêncio não perdoa. Vazamento de som gera denúncias diárias de vizinhos, batida policial e cassação sumária do alvará." },
                { num: "02", title: "Caixas Queimadas", desc: "DJs e bandas amadoras operando a mesa no limite. Sem um processador (DSP) para segurar os picos, seu patrimônio vira fumaça no meio da noite." },
                { num: "03", title: "Confusão no Palco", desc: "Fiação exposta, cabos com mau contato e gambiarras. O técnico da banda perde horas pra passar o som, e a casa passa uma imagem de amadorismo absoluto." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className="relative pt-8 border-t-[6px] border-black group overflow-hidden bg-white p-8 md:p-10 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 h-full">
                    <span className="absolute -bottom-8 -right-4 text-[140px] font-black text-black/[0.03] leading-none pointer-events-none group-hover:scale-110 group-hover:text-black/[0.06] transition-all duration-700 select-none">
                      {item.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 relative z-10 tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-zinc-600 text-base leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. STICKY SCROLL (A SOLUÇÃO) ═══════════════ */}
        <section className="py-24 md:py-40 relative bg-[#050505]">
          <div className="max-w-7xl mx-auto px-4 mb-20 md:mb-32">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-white">
                Engenharia Invisível.<br/>
                <span className="text-blue-500">Resultados Absurdos.</span>
              </h2>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 mt-8 max-w-2xl font-light leading-relaxed">
                Nós blindamos o seu bar contra falhas humanas. Desenvolvemos infraestruturas onde o artista foca na música e o dono tem a certeza de que a operação está 100% protegida.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-7xl mx-auto px-4 space-y-32 md:space-y-48">
             {/* Act 1: Zoneamento */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <FadeIn className="order-2 lg:order-1 h-full min-h-[400px]">
                   <ClubHeatmap />
                </FadeIn>
                <div className="order-1 lg:order-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Fase 1</span>
                   </div>
                   <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Zoneamento Inteligente.</h3>
                   <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                     Acústica não é volume, é distribuição. Desenhamos a dispersão sonora para cravar 105dB de pressão na pista (graves potentes onde importam) e declinar agressivamente o volume nas áreas de lounge e externa.
                   </p>
                   <ul className="space-y-3 text-zinc-300">
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0"/> Imersão total na pista.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0"/> Conversação nítida no bar.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0"/> Isolamento projetado para não incomodar a rua.</li>
                   </ul>
                </div>
             </div>

             {/* Act 2: Plug & Play */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-1 lg:order-1">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Fase 2</span>
                   </div>
                   <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Palco "Plug & Play".</h3>
                   <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                     Erradicamos a fiação solta. Instalamos caixas de conexão de parede (Stage Boxes) padrão broadcast. O técnico da banda só precisa plugar dois cabos XLR na parede e o som está pronto. Sem quebrar a cabeça, sem atrasar o show.
                   </p>
                   <ul className="space-y-3 text-zinc-300">
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0"/> Conectores Neutrik industriais.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0"/> Sinal limpo, balanceado e sem ruídos (ground loop).</li>
                   </ul>
                </div>
                <FadeIn className="order-2 lg:order-2 h-full min-h-[400px]">
                   <div className="w-full h-full rounded-[2rem] border border-white/10 bg-[#111] overflow-hidden shadow-2xl relative">
                      <StageBoxVisual />
                   </div>
                </FadeIn>
             </div>

             {/* Act 3: Laudo e Proteção */}
             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <FadeIn className="order-2 lg:order-1 h-full min-h-[400px]">
                   <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-[#050505] rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0,transparent_70%)] pointer-events-none" />
                      <FileText className="w-32 h-32 text-zinc-800 absolute -right-10 -bottom-10" />
                      
                      <div className="bg-zinc-100 rounded-xl w-64 p-6 shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
                         <div className="border-b-2 border-zinc-300 pb-2 mb-4 flex justify-between items-end">
                            <span className="font-bold text-black tracking-tighter text-xl">LAUDO TÉCNICO</span>
                            <span className="text-[10px] font-mono text-zinc-500">Aprovado</span>
                         </div>
                         <div className="space-y-2 mb-6">
                            <div className="w-full h-2 bg-zinc-300 rounded" />
                            <div className="w-5/6 h-2 bg-zinc-300 rounded" />
                            <div className="w-4/6 h-2 bg-zinc-300 rounded" />
                         </div>
                         <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center absolute -bottom-6 -right-6 bg-white shadow-xl rotate-12">
                            <span className="text-[10px] font-black text-green-500 leading-tight text-center">ART<br/>VÁLIDA</span>
                         </div>
                      </div>
                   </div>
                </FadeIn>
                <div className="order-1 lg:order-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Fase 3</span>
                   </div>
                   <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Atestado de Paz (ART).</h3>
                   <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                     Após a instalação e o travamento digital do volume via DSP, nossa equipe vai a campo com sonômetros Classe 1 e realiza aferições de acordo com a NBR 10151. O resultado? Um Laudo Acústico com ART, garantindo sua renovação de alvará.
                   </p>
                   <ul className="space-y-3 text-zinc-300">
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Calibragem com analisadores precisos.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Laudo Técnico para prefeitura e MP.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Blindagem jurídica para operar sem medo.</li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        {/* ═══════════════ 5. FORMULÁRIO (CONVERSÃO) ═══════════════ */}
        <section id="contato" className="py-24 md:py-32 px-4 relative bg-[#030303] border-t border-white/5">
          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-2 lg:sticky lg:top-28">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 block">Fale com um Especialista</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 uppercase">
                Profissionalize <br/>a Operação.
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                Preencha os dados abaixo para agendarmos uma visita técnica e avaliarmos a acústica do seu ambiente de entretenimento.
              </p>
              <div className="flex items-center gap-3 text-sm text-zinc-500 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                Seus dados são confidenciais.
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-500/60 shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]">
                <div className="rounded-[calc(2rem-1px)] bg-zinc-950 p-6 md:p-10">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-white">Solicitação Enviada com Sucesso!</h3>
                      <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                        Recebemos seus dados. Entraremos em contato em breve para agendar a visita técnica.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full border-white/10 hover:bg-white/5">
                        Enviar nova solicitação
                      </Button>
                    </div>
                  ) : (
                    <form
                      className="space-y-6"
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

                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
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

                      <div className="space-y-2">
                        <label htmlFor="establishment" className="text-sm font-medium text-zinc-300">Nome do Estabelecimento</label>
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

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-zinc-300">WhatsApp</label>
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

                      <div className="space-y-2">
                        <label htmlFor="objective" className="text-sm font-medium text-zinc-300">Qual seu objetivo principal?</label>
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
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-lg font-medium shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] transition-all hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.7)]"
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
