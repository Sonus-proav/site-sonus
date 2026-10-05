import { trackFormStart, trackWhatsAppClick, trackLeadConversion } from "@/lib/metaPixel"
import React, { useState, memo, useRef, lazy } from "react"
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
import { motion, useScroll, useTransform } from "framer-motion"
import { ClubHeatmap } from "@/components/bares/ClubHeatmap"
import { NightclubWarranty } from "@/components/bares/NightclubWarranty"
import { Lazy3D } from "@/components/bares/Lazy3D"
import { SpeakerPoster } from "@/components/bares/Posters"
const True3DSpeaker = lazy(() => import("@/components/bares/True3DSpeaker"))
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Volume2,
  Settings2
} from "lucide-react"

// ─── 1. HERO 3D COMPONENT (TRUE 3D SPEAKER) ──────────────────────────────────
const AudioLimiter3D = memo(function AudioLimiter3D() {
  return (
    <div className="w-full relative flex justify-center h-[420px] sm:h-[500px] md:h-[600px] z-20 mt-8 lg:mt-0">
      <Lazy3D Component={True3DSpeaker} poster={<SpeakerPoster />} eager={true} />
    </div>
  )
})

// ─── 4. PATCH PANEL COMPONENT (Premium 3D) ────────────────────────────────────────────────
const StageBoxVisual = memo(function StageBoxVisual() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-[#0a0a0a] to-black rounded-3xl relative overflow-hidden group border border-white/5">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] pointer-events-none" />
       
       <div className="relative w-full max-w-[280px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-zinc-700/50 rounded-xl shadow-[0_30px_60px_-10px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col p-6 z-10 overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,1)]">
         {/* Brushed Metal Texture */}
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20  pointer-events-none" />
         
         {/* Screws */}
         {[
           {top: '12px', left: '12px'}, {top: '12px', right: '12px'}, 
           {bottom: '12px', left: '12px'}, {bottom: '12px', right: '12px'}
         ].map((pos, i) => (
           <div key={i} className="absolute w-4 h-4 rounded-full bg-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center" style={pos}>
             <div className="w-2.5 h-px bg-zinc-800 rotate-45" />
           </div>
         ))}

         <div className="text-center mb-8 relative z-10">
            <span className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] uppercase block mb-1">Entrada DSP L/R</span>
            <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto" />
         </div>
         
         <div className="flex-1 flex items-center justify-center gap-6 relative z-10 pb-2">
            {/* XLR Port Left */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-16 h-16 rounded-full border-[6px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_20px_#000,0_4px_10px_rgba(0,0,0,0.5)]">
                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex justify-center pt-1.5 relative bg-[#0a0a0a]">
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full absolute top-1.5 left-1.5 shadow-inner" />
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full absolute top-1.5 right-1.5 shadow-inner" />
                     <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2 shadow-inner" />
                  </div>
               </div>
               <span className="text-[9px] text-zinc-500 font-mono tracking-widest bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800">CH 1</span>
            </div>
            
            {/* XLR Port Right (Plugged) */}
            <div className="flex flex-col items-center gap-3">
               <div className="w-16 h-16 rounded-full border-[6px] border-zinc-800 bg-black flex items-center justify-center relative shadow-[inset_0_0_20px_#000,0_4px_10px_rgba(0,0,0,0.5)]">
                  {/* Plugged Cable */}
                  <motion.div 
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-24 bg-zinc-800 rounded-t-lg border border-zinc-600 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center"
                  >
                     <div className="w-6 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-t-sm -mt-6 border-x border-zinc-400 shadow-inner" />
                     <div className="w-full h-full bg-gradient-to-b from-zinc-700 to-[#050505] px-2 flex justify-center py-2 relative border-x border-zinc-600">
                        <div className="w-full h-full bg-[#111] rounded-sm shadow-inner" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[5px] text-zinc-500 font-mono rotate-90 whitespace-nowrap tracking-widest">SANTO ANGELO</div>
                     </div>
                     {/* Cable Drop */}
                     <div className="w-3 h-24 bg-[#1a1a1a] absolute top-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] border-l border-zinc-800 rounded-b-full" />
                  </motion.div>
                  
                  {/* Green LED Indicator behind plug */}
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.8] }} transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute -top-2 right-0 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e] z-30"
                  />
               </div>
               <span className="text-[9px] text-blue-400 font-mono tracking-widest bg-blue-950/30 px-2 py-0.5 rounded border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">CH 2</span>
            </div>
         </div>
       </div>
    </div>
  )
})

// ─── ART COMPONENT ────────────────────────────────────────────────────────
const CertificadoART = memo(function CertificadoART() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-zinc-100 to-zinc-300 rounded-3xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0,transparent_100%)] pointer-events-none" />
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white rounded-xl w-full max-w-[280px] p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative border border-zinc-200 transition-transform duration-500 group-hover:scale-105"
      >
         <div className="border-b-4 border-zinc-200 pb-3 mb-5 flex justify-between items-end">
            <span className="font-black text-black tracking-tighter text-2xl">LAUDO TÉCNICO</span>
         </div>
         <div className="space-y-3 mb-8">
            <div className="w-full h-2 bg-zinc-100 rounded" />
            <div className="w-5/6 h-2 bg-zinc-100 rounded" />
            <div className="w-4/6 h-2 bg-zinc-100 rounded" />
            <div className="w-full h-2 bg-zinc-100 rounded mt-4" />
            <div className="w-3/4 h-2 bg-zinc-100 rounded" />
         </div>
         
         <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
            className="w-20 h-20 rounded-full border-[5px] border-green-500 flex flex-col items-center justify-center absolute -bottom-6 -right-6 bg-white shadow-[0_10px_30px_rgba(34,197,94,0.3)] z-10"
         >
            <ShieldCheck className="text-green-500 w-5 h-5 mb-0.5"/>
            <span className="text-[8px] font-black text-green-500 leading-none text-center tracking-widest">ART<br/>VÁLIDA</span>
         </motion.div>
      </motion.div>
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
  {
    question: "O DJ sempre queima meus alto-falantes. Como o sistema previne isso?",
    answer: "Nós implementamos limitadores de pico e RMS direto no cérebro do sistema (DSP). Mesmo que o DJ coloque a mesa de som no 'vermelho' e tente forçar, o DSP atua como um escudo invisível, comprimindo o sinal musicalmente antes que ele chegue aos amplificadores. O som continua incrível, mas suas caixas nunca mais vão queimar."
  },
  {
    question: "A adequação acústica vai estragar a decoração e o design do meu bar?",
    answer: "De forma alguma. Nosso foco é a 'Engenharia Invisível'. Trabalhamos junto com o seu arquiteto para posicionar as caixas e painéis acústicos de forma que eles se integrem à identidade visual da casa. Você não verá fios soltos ou equipamentos improvisados pendurados."
  },
  {
    question: "O bar precisa ficar fechado por muitos dias para a instalação?",
    answer: "Não. Sabemos que bar fechado é prejuízo. Nossa engenharia é pré-montada e testada no laboratório da Sonus. A instalação física das Stage Boxes e dos processadores é feita de forma extremamente ágil, geralmente nos dias da semana em que a casa não abre, sem impactar o seu faturamento de final de semana."
  },
]

const marqueeLogos = [
  { type: "img" as const, src: "/qsys-logo.png", alt: "Q-SYS", className: "h-8 md:h-10" },
  { type: "text" as const, label: "Dante" },
  { type: "img" as const, src: "/shure-logo.png", alt: "Shure", className: "h-6 md:h-8" },
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
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityHero = useTransform(scrollYProgress, [0, 1], [1, 0])

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
    <div className="flex flex-col min-h-screen bg-[#020202] text-white selection:bg-blue-500/30">
      <SEO
        title="Sonorização para Bares e Casas Noturnas no Paraná | Sonus Pro AV"
        description="Som impecável na pista, zero multas na porta. Sonorização profissional, palco Plug & Play, controle ativo por DSP e laudo acústico com ART para blindar o alvará do seu bar no Paraná, SC e RS."
        keywords="sonorização de bares paraná, laudo acústico casa noturna, projeto de áudio boates santa catarina, dsp para bares, acústica de igrejas sudoeste paraná, sonorização profissional maringá cascavel"
        image="/og-image.jpg"
        url="https://sonusproaudio.com.br/bares-e-casas-noturnas"
        schema={schema}
      />

      <Navbar />

      <main className="flex-1 relative z-10">
        
        {/* ═══════════════ 1. HERO (ATMOSPHERIC & MASSIVE) ═══════════════ */}
        <section ref={heroRef} className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center overflow-x-hidden px-4 border-b border-white/5">
          {/* Atmospheric Lights */}
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[40px] md:blur-[120px] pointer-events-none " />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[40px] md:blur-[120px] pointer-events-none " />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="max-w-7xl mx-auto w-full grid xl:grid-cols-2 gap-16 xl:gap-8 items-center relative z-10"
          >
             {/* Left Column: Typography */}
             <div className="flex flex-col items-start text-left max-w-2xl relative">
                {/* Glowing decorative line */}
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block" />
                
                <FadeIn>
                  <div className="inline-flex items-center gap-2 mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs md:text-sm font-mono text-zinc-300 tracking-[0.2em] uppercase font-bold">
                      A Revolução na Pista
                    </span>
                  </div>
                </FadeIn>
                
                <Reveal>
                  <h1 className="text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-8">
                    <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Pista Perfeita.</span><br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400" style={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.5))' }}>Zero Multas.</span>
                  </h1>
                </Reveal>

                <FadeIn delay={0.2}>
                  <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                    A infraestrutura <strong className="text-white font-medium">"Plug & Play"</strong> que blinda o seu alvará. 
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
                       Falar com um Especialista
                       <ArrowRight className="ml-2 w-5 h-5" />
                     </Button>
                   </Magnetic>
                </FadeIn>
             </div>

             {/* Right Column: 3D Mockup */}
             <FadeIn delay={0.3} className="h-full flex items-center justify-center">
                <AudioLimiter3D />
             </FadeIn>
          </motion.div>
        </section>

        {/* ═══════════════ 2. LOGO MARQUEE (GEO SEO) ═══════════════ */}
        <section className="relative z-10 w-full pt-16 pb-12 bg-[#020202] border-b border-white/5 overflow-hidden flex flex-col items-center">
          <Reveal>
            <h2 className="text-zinc-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-10 text-center px-4">
              Tecnologia de Nível Internacional no <span className="text-white font-bold">Sudoeste do Paraná</span>
            </h2>
          </Reveal>
          
          <div className="absolute left-0 bottom-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-24 md:gap-40 items-center pr-24 md:pr-40 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((logo, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center">
                {logo.type === "img" ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${logo.className} w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300`}
                  />
                ) : (
                  <span className="text-2xl md:text-3xl font-black tracking-widest text-white/40 select-none hover:text-white transition-colors duration-300">
                    {logo.label}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ 3. DOR (Brutalist Dark Red Theme) ═══════════════ */}
        <section className="py-24 md:py-40 px-4 relative bg-[#020202] text-white overflow-hidden">
          {/* Subtle red glow indicating danger */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[40px] md:blur-[150px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase mb-20 md:mb-28 leading-[0.85] text-zinc-100">
                O Prejuízo da <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Gambiarra.</span>
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 relative">
              {[
                { icon: AlertTriangle, title: "Multas e Polícia", desc: "Vazamento de som gera denúncias imediatas de vizinhos. Batida policial, interdição do alvará e dor de cabeça." },
                { icon: Volume2, title: "Caixas Queimadas", desc: "DJs operando no limite da distorção, clipando o sinal da mesa direto para a caixa. Sem DSP, seu patrimônio vira fumaça." },
                { icon: Settings2, title: "Gambiarras no Palco", desc: "Fiação exposta, ruídos de ground loop, técnico perdendo horas pra ligar 2 cabos. Uma imagem de amadorismo absoluto." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.15} className="h-full">
                  <div className={`relative group overflow-hidden bg-zinc-900/40 border border-white/10 p-8 md:p-10 rounded-3xl h-full backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/60 hover:border-red-500/30`}>
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                       <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 relative z-10 tracking-tight leading-tight text-white">{item.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed relative z-10 font-light group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                    
                    {/* Background glow on hover */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. BENTO GRID (A SOLUÇÃO PREMIUM) ═══════════════ */}
        <section className="py-24 md:py-40 relative bg-[#050505] border-t border-white/5 overflow-x-hidden">
          {/* Ambient Lighting for Bento Grid */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[40px] md:blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[40px] md:blur-[150px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-24 text-center">
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-white drop-shadow-2xl mx-auto">
                Engenharia Invisível.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Resultados Absurdos.</span>
              </h2>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-400 mt-8 max-w-3xl mx-auto font-light leading-relaxed">
                Nós blindamos o seu bar contra falhas humanas. Atendemos casas noturnas e igrejas em todo o <strong>Paraná, Santa Catarina e Rio Grande do Sul</strong>.
              </p>
            </FadeIn>
          </div>

          <div className="w-full max-w-7xl mx-auto px-4">
             {/* THE BENTO GRID */}
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-6">
                
                {/* BENTO 1: Zoneamento (Large - Span 2 cols, 2 rows on Desktop) */}
                <FadeIn delay={0.1} className="md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 h-auto md:h-full">
                   <div className="w-full h-auto md:h-full min-h-[400px] bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="p-5 md:p-8 pb-0 relative z-10">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4 backdrop-blur-sm">
                            <Lock className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Fase 01</span>
                         </div>
                         <h3 className="text-3xl font-black tracking-tight mb-3 text-white">Zoneamento Inteligente.</h3>
                         <p className="text-zinc-400 text-base font-light mb-6 max-w-sm">
                           Dispersão sonora matemática. <strong>105dB cravados na pista</strong>, e silêncio absoluto na rua para proteger seu alvará.
                         </p>
                      </div>
                      
                      <div className="w-full relative px-0 pb-4 flex-1">
                           <div className="w-full h-full scale-95 origin-top">
                             <ClubHeatmap />
                           </div>
                        </div>
                   </div>
                </FadeIn>

                {/* BENTO 2: Plug & Play (Vertical - Span 1 col, 2 rows) */}
                <FadeIn delay={0.2} className="md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 h-auto md:h-full">
                   <div className="w-full h-auto md:h-full min-h-[400px] bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="p-5 md:p-8 relative z-10 flex flex-col items-center text-center">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4 backdrop-blur-sm">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Fase 02</span>
                         </div>
                         <h3 className="text-2xl font-black tracking-tight mb-3 text-white">Palco "Plug & Play".</h3>
                         <p className="text-zinc-400 text-sm font-light">
                           Conectores de parede industriais Santo Angelo. O técnico liga dois cabos e o show começa. Fim do amadorismo.
                         </p>
                      </div>
                      
                      <div className="flex-1 w-full relative flex items-center justify-center p-4">
                         <StageBoxVisual />
                      </div>
                   </div>
                </FadeIn>

                {/* BENTO 3: ART (Vertical - Span 1 col, 2 rows) */}
                <FadeIn delay={0.3} className="md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 h-auto md:h-full">
                   <div className="w-full h-auto md:h-full min-h-[400px] bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="p-5 md:p-8 relative z-10 flex flex-col items-center text-center">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 mb-4 backdrop-blur-sm">
                            <ShieldCheck className="w-3 h-3 text-green-400" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Fase 03</span>
                         </div>
                         <h3 className="text-2xl font-black tracking-tight mb-3 text-white">Atestado de Paz (ART).</h3>
                         <p className="text-zinc-400 text-sm font-light">
                           Calibragem final com analisadores Classe 1 e entrega do Laudo Técnico para prefeitura e MP.
                         </p>
                      </div>
                      
                      <div className="flex-1 w-full relative flex items-center justify-center p-4">
                         <CertificadoART />
                      </div>
                   </div>
                </FadeIn>

             </div>
          </div>
        </section>

        {/* ═══════════════ GARANTIA VIP ═══════════════ */}
        <NightclubWarranty />

        {/* ═══════════════ 5. FORMULÁRIO (CONVERSÃO) ═══════════════ */}
        <section id="contato" className="py-24 md:py-32 px-4 relative bg-[#020202] border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn>
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-6 block">Fale com um Especialista</span>
              <h2 className="text-[2.5rem] sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white drop-shadow-xl break-words sm:break-normal hyphens-auto">
                Profissionalize <br/>a Operação.
              </h2>
              <p className="text-zinc-400 text-xl font-light leading-relaxed mb-10 max-w-lg">
                Preencha os dados abaixo para agendarmos uma visita técnica e avaliarmos a acústica do seu ambiente de entretenimento.
              </p>
              <div className="flex items-center gap-4 text-base text-zinc-300 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl max-w-md">
                <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
                Seus dados são 100% confidenciais.
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="w-full">
              <div className="rounded-[2.5rem] p-[1px] bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-purple-500/30 shadow-[0_0_80px_-15px_rgba(59,130,246,0.2)]">
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
                      <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full border-white/10 hover:bg-white/5 text-lg py-6 px-8 text-white">
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
                        <label htmlFor="name" className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Nome Completo</label>
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
                        <label htmlFor="establishment" className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Nome do Estabelecimento</label>
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
                        <label htmlFor="phone" className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">WhatsApp</label>
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
                        <label htmlFor="objective" className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Qual seu objetivo principal?</label>
                        <select
                          id="objective"
                          required
                          value={formData.objective}
                          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none h-14 rounded-xl text-white px-4 appearance-none text-base"
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
                          options={{ theme: "dark" }}
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
                          className="w-full bg-white hover:bg-zinc-200 text-black h-16 rounded-xl text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
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
