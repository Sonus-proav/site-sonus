import { trackFormStart, trackWhatsAppClick, trackLeadConversion } from "@/lib/metaPixel"
import React, { useState, useRef, memo } from "react"
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
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ClubHeatmap } from "@/components/bares/ClubHeatmap"
import { NightmareDashboard } from "@/components/bares/NightmareDashboard"
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Cable,
  ShieldCheck, Siren,
  Volume2,
  Activity,
  Check
} from "lucide-react"

// --- Custom Visual Components for Tabs ---

const PatchPanelVisual = memo(function PatchPanelVisual() {
  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0,transparent_60%)] pointer-events-none" />
      
      {/* Wall Box */}
      <div className="relative w-64 md:w-80 h-48 bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-2xl flex flex-col p-4 z-10 overflow-hidden">
        <div className="absolute top-2 left-4 text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Stage Box // Input L/R</div>
        <div className="absolute top-2 right-4 text-[10px] text-zinc-500 font-mono flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-blue-500"/> DSP LINKED</div>
        
        <div className="flex-1 flex items-center justify-around mt-4">
           {/* XLR Ports */}
           <div className="w-16 h-16 rounded-full border-4 border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_10px_#000]">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex justify-center pt-1 relative">
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute top-1 left-2" />
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute top-1 right-2" />
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
              </div>
              <span className="absolute -bottom-5 text-xs text-zinc-500 font-mono">CH 1 (L)</span>
           </div>
           
           <div className="w-16 h-16 rounded-full border-4 border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_10px_#000]">
              {/* Plugged Cable Animation */}
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-24 bg-zinc-800 rounded-t-xl border border-zinc-600 shadow-xl flex flex-col items-center"
              >
                 <div className="w-6 h-8 bg-zinc-300 rounded-t-md -mt-4" />
                 <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-black px-2 flex justify-center py-2">
                    <div className="w-full h-full bg-zinc-900 rounded-sm" />
                 </div>
                 {/* Cable wire dropping down */}
                 <div className="w-3 h-32 bg-zinc-900 absolute top-full border-l border-r border-black" />
              </motion.div>

              <div className="w-8 h-8 rounded-full border border-zinc-800 flex justify-center pt-1 relative">
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute top-1 left-2" />
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute top-1 right-2" />
                 <div className="w-1 h-1 bg-zinc-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
              </div>
              <span className="absolute -bottom-5 text-xs text-zinc-500 font-mono">CH 2 (R)</span>
              
              {/* Green indicator */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.5] }} transition={{ delay: 1, duration: 1 }}
                className="absolute -top-3 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"
              />
           </div>
        </div>
      </div>
    </div>
  )
})

const DSPVisual = memo(function DSPVisual() {
  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
       <div className="w-full max-w-sm bg-zinc-900 border border-blue-500/30 rounded-xl p-5 shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
             <div className="flex items-center gap-2">
               <Activity className="w-4 h-4 text-blue-400" />
               <span className="text-xs font-mono text-zinc-300 tracking-widest">LIMITER COMPRESSOR</span>
             </div>
             <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-mono font-bold">LOCKED</span>
          </div>
          
          <div className="flex items-end gap-1 h-32 w-full pt-4 relative">
             {/* The Limit Line */}
             <div className="absolute top-8 left-0 right-0 border-b-2 border-red-500/50 border-dashed z-20 flex justify-end">
                <span className="text-[10px] text-red-500 bg-zinc-900 px-1 -mt-2 mr-2 font-mono font-bold">MAX 105dB</span>
             </div>

             {/* Animated Bars */}
             {[...Array(24)].map((_, i) => (
                <motion.div 
                   key={i}
                   className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm z-10"
                   animate={{ 
                     height: [`${30 + Math.random()*20}%`, `${60 + Math.random()*40}%`, `${40 + Math.random()*30}%`]
                   }}
                   transition={{ duration: 0.8 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                   style={{
                      // Force clipping visually at the red line (~70% height)
                      maxHeight: "75%"
                   }}
                />
             ))}
             
             {/* Red peak shadows to show compression working */}
             {[...Array(24)].map((_, i) => (
                <motion.div 
                   key={`peak-${i}`}
                   className="absolute bottom-0 w-[calc(100%/24-4px)] bg-red-500/20 rounded-t-sm z-0"
                   style={{ left: `calc(${(i / 24) * 100}% + 2px)` }}
                   animate={{ 
                     height: [`${50 + Math.random()*20}%`, `${80 + Math.random()*20}%`, `${50 + Math.random()*30}%`]
                   }}
                   transition={{ duration: 0.8 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                />
             ))}
          </div>
          <div className="text-center text-[10px] text-zinc-500 font-mono mt-2">SINAL DE ENTRADA DO DJ SENDO ATENUADO AUTOMATICAMENTE</div>
       </div>
    </div>
  )
})

const ArtVisual = memo(function ArtVisual() {
  return (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center p-8 relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0,transparent_70%)] pointer-events-none" />
       
       <motion.div 
         initial={{ y: 20, opacity: 0, rotate: -2 }}
         whileInView={{ y: 0, opacity: 1, rotate: -2 }}
         className="w-48 md:w-56 bg-zinc-100 rounded-lg shadow-2xl p-4 flex flex-col relative"
       >
          <div className="flex justify-between items-start border-b border-zinc-300 pb-2 mb-3">
             <div className="w-8 h-8 bg-zinc-300 rounded" />
             <div className="w-16 h-3 bg-zinc-300 rounded" />
          </div>
          <div className="w-full h-2 bg-zinc-300 rounded mb-2" />
          <div className="w-3/4 h-2 bg-zinc-300 rounded mb-6" />
          
          <div className="w-full h-20 bg-zinc-200 rounded mb-6 border border-zinc-300 flex items-center justify-center">
             <span className="text-zinc-400 font-mono text-[10px]">GRÁFICO ACÚSTICO</span>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>
            <div className="w-full h-2 bg-zinc-300 rounded mt-1" />
          </div>
          
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-[#050505] rotate-12">
             <span className="text-[10px] font-black text-white text-center leading-tight">ART<br/>VÁLIDA</span>
          </div>
       </motion.div>
    </div>
  )
})

// --- Conteúdo ---------------------------------------------------------------

const steps = [
  {
    id: "zoneamento",
    short: "Zoneamento",
    title: "Sonorização e Zoneamento",
    desc: "Desenhamos a distribuição do P.A. focada na pista. Alta pressão sonora para quem dança, conforto para quem está no bar e mínimo vazamento para a rua.",
    bullets: ["Pista com alta pressão sonora (105dB+)", "Bar com conforto para conversação", "Mínimo vazamento para a rua"],
    visual: <ClubHeatmap />
  },
  {
    id: "plug-play",
    short: "Palco Plug & Play",
    title: 'Palco "Plug & Play"',
    desc: "Fim do amadorismo. Instalamos painéis de conexão (Stage Boxes) profissionais. O DJ ou a banda chega, conecta os cabos no painel e está pronto para tocar, sem mexer na estrutura da casa.",
    bullets: ["Stage Boxes e Patch Panels de parede", "Conectou, está pronto para tocar", "Fim das gambiarras e cabos soltos"],
    visual: <PatchPanelVisual />
  },
  {
    id: "dsp",
    short: "Controle DSP",
    title: "Controle Ativo (DSP) Inviolável",
    desc: "O coração do sistema. O processador digital aplica os limites de segurança. O artista pode tentar subir o volume da mesa ao máximo, mas o DSP protege seus alto-falantes e trava o som no limite aprovado pela prefeitura.",
    bullets: ["Equalização e delay perfeitos para o ambiente", "Limitadores de volume travados via software", "Fim das caixas queimadas por pico de sinal"],
    visual: <DSPVisual />
  },
  {
    id: "laudo",
    short: "Laudo Acústico (ART)",
    title: "Laudo Acústico (ART)",
    desc: "Após a calibragem e aferição com sonômetros Classe 1, entregamos o laudo técnico completo, garantindo a renovação do seu alvará e a blindagem jurídica do seu estabelecimento.",
    bullets: ["Aferição com sonômetros Classe 1", "Laudo técnico em conformidade com NBR", "Renovação do alvará garantida"],
    visual: <ArtVisual />
  },
]

const techBullets = [
  "Redes de áudio modernas (Dante/IP) e painéis de conexão Neutrik.",
  "Instrumentação de medição acústica em conformidade com IEC 61672.",
  "Relatórios técnicos padronizados pela ABNT NBR 10151 e 10152.",
]

const objectives = [
  "Sonorizar meu bar / casa noturna / igreja do zero",
  "Parar de receber multas e reclamações de vizinhos",
  "Proteger minhas caixas de som com limitador DSP",
  "Laudo acústico (ART) para renovação de alvará",
  "Padronizar o palco para DJs e bandas",
]

const faqs = [
  {
    question: "O laudo é aceito pela Prefeitura e Ministério Público?",
    answer: "Sim. O projeto inclui a ART (Anotação de Responsabilidade Técnica) assinada por profissional habilitado, válida para defesa de autuações e emissão/renovação de alvarás de funcionamento."
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
  const [activeStep, setActiveStep] = useState(0)

  // Parallax Hero and Authority
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(heroScroll, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])

  const authorityRef = useRef<HTMLElement>(null)
  const { scrollYProgress: authScroll } = useScroll({ target: authorityRef, offset: ["start end", "end start"] })
  const parallaxY = useTransform(authScroll, [0, 1], [-80, 80])

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
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ event: "form_error", error_type: "network_failure" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Sonorização Profissional, Controle Ativo de Áudio (DSP) e Laudo Acústico com ART para Bares, Casas Noturnas e Igrejas",
    provider: { "@type": "LocalBusiness", name: "Sonus Pro Audio e Video" },
    areaServed: ["Paraná", "Santa Catarina", "Rio Grande do Sul", "Brasil"],
  }

  const step = steps[activeStep]
  const inputClass = "bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 rounded-xl text-white placeholder:text-zinc-500"

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <SEO
        title="Sonorização para Bares e Casas Noturnas com Laudo Acústico (ART) | Sonus Pro AV"
        description="Som impecável na pista, zero multas na porta. Sonorização profissional, palco Plug & Play, controle ativo por DSP e laudo acústico com ART para blindar o alvará do seu bar."
        image="/og-image.jpg"
        url="https://sonusproaudio.com.br/bares-e-casas-noturnas"
        keywords="sonorização para bares, sonorização casa noturna, laudo acústico bar, ART acústica alvará, limitador de volume DSP, lei do silêncio bar, palco plug and play, projeto acústico igreja"
        schema={schema}
      />

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* ═══════════════ 1. HERO (Imersivo) ═══════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-[#050505] z-0" />
          
          {/* Animated Equalizer Lines in Background */}
          <div className="absolute inset-0 opacity-10 flex items-end justify-center gap-1 sm:gap-2 px-10 pointer-events-none z-0">
             {[...Array(40)].map((_, i) => (
                <motion.div 
                   key={`bg-eq-${i}`}
                   className="w-full bg-blue-500 rounded-t-sm"
                   animate={{ height: [`${20 + Math.random()*30}%`, `${50 + Math.random()*50}%`, `${20 + Math.random()*30}%`] }}
                   transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                />
             ))}
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(59,130,246,0.15)_0%,transparent_100%)] pointer-events-none z-0" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-0" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Sonorização • Controle Ativo • Laudo Acústico
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] md:leading-[0.95]">
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Som Impecável na Pista.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" style={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4))' }}>
                  Zero Multas na Porta.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-lg md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
                Projetamos a sonorização do seu bar com infraestrutura{" "}
                <strong className="text-white font-medium">"Plug & Play"</strong> para os artistas,{" "}
                <strong className="text-white font-medium">controle digital inviolável de volume</strong> e{" "}
                <strong className="text-white font-medium">laudo acústico (ART)</strong> para blindagem do alvará.
              </h2>
            </FadeIn>

            <FadeIn delay={0.45}>
              <motion.div
                className="inline-block"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Magnetic>
                  <Button
                    onClick={handleWhatsApp}
                    size="lg"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base md:text-lg font-medium shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] transition-all hover:shadow-[0_0_80px_-10px_rgba(59,130,246,0.8)] h-auto"
                  >
                    Falar com um Especialista de Áudio Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Magnetic>
              </motion.div>
            </FadeIn>
          </motion.div>
        </section>

        {/* ═══════════════ 2. DOR (Dashboard de Pesadelos) ═══════════════ */}
        <section className="py-20 md:py-32 px-4 relative bg-[#030303] border-t border-white/5 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <div>
               <FadeIn className="mb-10">
                 <span className="text-red-400 font-mono text-sm uppercase tracking-widest mb-4 block flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4" /> O Problema
                 </span>
                 <Reveal>
                   <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.05]">
                     O seu negócio não pode depender do <span className="text-red-500">bom senso do DJ.</span>
                   </h2>
                 </Reveal>
                 <FadeIn delay={0.2}>
                   <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
                     Multas da prefeitura por vazamento de som, e alto-falantes queimados por excesso de volume são os maiores
                     ralos de dinheiro da noite. <strong>Nós assumimos o controle da sua infraestrutura.</strong>
                   </p>
                 </FadeIn>
               </FadeIn>

               <div className="flex flex-col gap-6">
                 {[
                   { icon: Siren, title: "Multas e Fiscalização", desc: "Lei do Silêncio e vizinhos que geram interdição do alvará." },
                   { icon: Volume2, title: "Caixas Queimadas", desc: "DJs e bandas operando no limite, sem proteção entre a mesa e a caixa." },
                   { icon: Cable, title: "Confusão Operacional", desc: "Fiação solta, atrasos para passar o som e gambiarras a cada show." }
                 ].map((card, i) => (
                   <FadeIn key={card.title} delay={0.3 + (i * 0.1)}>
                      <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950/50 border border-white/5 hover:border-red-500/20 transition-colors">
                         <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex justify-center items-center shrink-0">
                            <card.icon className="w-5 h-5 text-red-400" />
                         </div>
                         <div>
                            <h4 className="text-lg font-bold text-white mb-1">{card.title}</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
                         </div>
                      </div>
                   </FadeIn>
                 ))}
               </div>
            </div>

            <FadeIn delay={0.4} className="h-full">
               <div className="h-full min-h-[500px] bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
                  <NightmareDashboard />
               </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════ 3. SOLUÇÃO (TABS VISUAIS) ═══════════════ */}
        <section className="py-20 md:py-32 px-4 relative bg-[#050505] border-t border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16 max-w-4xl mx-auto">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 block">
                A Solução Sonus Pro Audio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                Soluções de Áudio de Ponta a Ponta para o seu Negócio.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Abas Esquerda */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`text-left rounded-2xl border p-5 md:p-6 transition-all duration-300 relative overflow-hidden ${
                      i === activeStep
                        ? "bg-blue-900/10 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        : "bg-zinc-950/50 border-white/10 hover:border-white/20 hover:bg-zinc-900/50"
                    }`}
                  >
                    {i === activeStep && (
                       <motion.div layoutId="activeTabGlow" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    )}
                    <div className="flex items-center gap-4 mb-2">
                       <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${
                         i === activeStep ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "border-white/10 text-zinc-500"
                       }`}>
                         0{i + 1}
                       </span>
                       <h3 className={`text-lg md:text-xl font-bold ${i === activeStep ? 'text-white' : 'text-zinc-300'}`}>
                         {s.title}
                       </h3>
                    </div>
                    <AnimatePresence>
                       {i === activeStep && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pt-2"
                          >
                             <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                             <ul className="space-y-2">
                               {s.bullets.map((b) => (
                                 <li key={b} className="flex items-start gap-2 text-zinc-300">
                                   <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                   <span className="text-xs md:text-sm">{b}</span>
                                 </li>
                               ))}
                             </ul>
                          </motion.div>
                       )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              {/* Visor Direita */}
              <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full rounded-[2rem] border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl relative"
                  >
                    {step.visual}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. AUTORIDADE (MARQUEE + PARALLAX) ═══════════════ */}
        <section ref={authorityRef} className="py-20 md:py-32 relative bg-[#030303] border-t border-white/5 overflow-hidden">
          <motion.div
            style={{ y: parallaxY }}
            className="absolute -inset-y-24 inset-x-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"
          />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <FadeIn className="text-center mb-14">
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-4 block">
                Autoridade e Tecnologia
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto drop-shadow-xl">
                Tecnologia de Nível Internacional no{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.3))' }}>
                  Sudoeste do Paraná.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15} className="max-w-3xl mx-auto mb-16">
              <ul className="space-y-4">
                {techBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-sm px-6 py-4 shadow-lg hover:border-cyan-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-zinc-300 text-base md:text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Marquee infinito */}
          <div className="relative z-10 w-full py-12 bg-[#050505] border-y border-white/5 overflow-hidden flex items-center">
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
          </div>
        </section>

        {/* ═══════════════ 5. FORMULÁRIO (STICKY + BORDA ILUMINADA) ═══════════════ */}
        <section id="contato" className="py-20 md:py-32 px-4 relative bg-[#050505]">
          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-2 lg:sticky lg:top-28">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 block">Diagnóstico Técnico</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-6">
                Profissionalize a Operação do Seu Bar.
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                Preencha os dados abaixo. Nossa equipe agendará uma visita técnica para avaliar sua acústica e a infraestrutura atual.
              </p>
              <div className="flex items-center gap-3 text-sm text-zinc-500 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                Seus dados são confidenciais e usados apenas para o contato sobre o projeto.
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
                        Nossa equipe recebeu suas informações e entrará em contato em breve para agendar a visita técnica.
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
                          placeholder="Ex: Bar do Zé, Club Noir, Igreja Matriz..."
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
                          onError={() => setSubmitError("Erro ao carregar o sistema de segurança. Verifique se o domínio está liberado no Cloudflare ou desative seu Adblocker.")}
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

      {/* ═══════════════ 6. FAQ (ACORDEÃO) ═══════════════ */}
      <AeoFaq faqs={faqs} title="Perguntas Frequentes" subtitle="Quebrando as últimas objeções" />
      <LPFooter />
      <WhatsAppButton />
      <StickyCtaBar />
    </div>
  )
}
