import { trackFormStart, trackWhatsAppClick, trackLeadConversion } from "@/lib/metaPixel"
import React, { useState, useRef } from "react"
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
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Turnstile } from "@marsidev/react-turnstile"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Siren,
  Speaker,
  Cable,
  Cpu,
  FileText,
  ShieldCheck,
  Volume2,
} from "lucide-react"

// --- Conteúdo ---------------------------------------------------------------

const painCards = [
  {
    icon: Siren,
    title: "Multas e Fiscalização",
    desc: "Lei do Silêncio e reclamação de vizinhos que podem virar autuação, interdição e dor de cabeça com o alvará.",
  },
  {
    icon: Volume2,
    title: "Caixas Queimadas",
    desc: "DJs e bandas operando o som no limite, sem nenhuma proteção entre a mesa e os alto-falantes.",
  },
  {
    icon: Cable,
    title: "Confusão Operacional",
    desc: "Fiação solta, atrasos para passar o som e gambiarras a cada show.",
  },
]

const steps = [
  {
    id: "zoneamento",
    short: "Zoneamento",
    icon: Speaker,
    title: "Sonorização e Zoneamento",
    desc: "Desenhamos a distribuição do P.A. focada na pista. Alta pressão sonora para quem dança, conforto para quem está no bar e mínimo vazamento para a rua.",
    bullets: ["Pista com alta pressão sonora", "Bar com conforto e conversa", "Mínimo vazamento para a rua"],
  },
  {
    id: "plug-play",
    short: "Palco Plug & Play",
    icon: Cable,
    title: 'Palco "Plug & Play"',
    desc: "Fim do amadorismo. Instalamos painéis de conexão (Stage Boxes/Patch Panels) padronizados. O DJ ou a banda chega, conecta os cabos no painel e está pronto para tocar. Sem mexer na estrutura da casa.",
    bullets: ["Stage Boxes e Patch Panels padronizados", "Conectou, está pronto para tocar", "Nenhuma intervenção na estrutura da casa"],
  },
  {
    id: "dsp",
    short: "Controle Ativo (DSP)",
    icon: Cpu,
    title: "Controle Ativo (DSP) Inviolável",
    desc: "O coração do sistema. O nosso processador digital alinha equalização, delay e impõe limitadores de segurança. O artista pode tentar subir o volume da mesa ao máximo, mas o DSP protege seus alto-falantes e trava o som no limite exato aprovado pela prefeitura.",
    bullets: ["Equalização e delay alinhados", "Limitadores de segurança travados", "Alto-falantes protegidos"],
  },
  {
    id: "laudo",
    short: "Laudo Acústico (ART)",
    icon: FileText,
    title: "Laudo Acústico (ART)",
    desc: "Após a calibragem e aferição com sonômetros Classe 1, entregamos o laudo técnico atestando a adequação do local, garantindo a renovação do seu alvará.",
    bullets: ["Aferição com sonômetros Classe 1", "Laudo técnico com ART", "Renovação do alvará garantida"],
  },
]

const techBullets = [
  "Redes de áudio modernas e painéis de conexão profissionais.",
  "Instrumentação de medição em conformidade com IEC 61672.",
  "Relatórios padronizados pela ABNT NBR 10151 e 10152.",
]

const objectives = [
  "Sonorizar meu bar / casa noturna / igreja do zero",
  "Parar de receber multas e reclamações de vizinhos",
  "Proteger minhas caixas de som com limitador DSP",
  "Laudo acústico (ART) para alvará",
  "Padronizar o palco para DJs e bandas",
]

const faqs = [
  {
    question: "O laudo é aceito pela Prefeitura e Ministério Público?",
    answer:
      "Sim. O projeto inclui a ART (Anotação de Responsabilidade Técnica) assinada por profissional habilitado, válida para defesa de autuações e emissão de alvarás.",
  },
  {
    question: "E se a banda trouxer a própria mesa de som?",
    answer:
      "Sem problemas. O técnico da banda conecta as saídas L/R da mesa dele no nosso painel de parede. O sinal passa obrigatoriamente pelo processador DSP da casa, que otimiza o som para o seu ambiente e aplica os limites de volume (limiters) antes de enviar para as caixas, protegendo seu equipamento e seu alvará.",
  },
  {
    question: "O limite do processador vai deixar a festa sem graça?",
    answer:
      'Muito pelo contrário. Um som distorcido irrita o público e o vizinho. O DSP entrega áudio cristalino e com "peso" nas frequências certas na pista, mas corta os picos de volume que geram as multas. O público tem a melhor experiência e você tem segurança.',
  },
]

const marqueeLogos = [
  { type: "img" as const, src: "/qsys-logo.png", alt: "Q-SYS", className: "h-10 md:h-12" },
  { type: "text" as const, label: "Dante" },
  { type: "img" as const, src: "/shure-logo.png", alt: "Shure", className: "h-8 md:h-10" },
  { type: "text" as const, label: "NEUTRIK" },
]

// --- Página -----------------------------------------------------------------

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

  // Parallax da seção de autoridade
  const authorityRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: authorityRef, offset: ["start end", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-80, 80])

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
  const StepIcon = step.icon
  const inputClass =
    "bg-white/5 border-white/10 focus-visible:ring-blue-500 h-14 rounded-xl text-white placeholder:text-zinc-500"

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
        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_20%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Sonorização • Controle Ativo • Laudo Acústico
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] md:leading-[0.95]">
                <span className="text-white">Som Impecável na Pista.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                  Zero Multas na Porta.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
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
          </div>
        </section>

        {/* ═══════════════ 2. DOR ═══════════════ */}
        <section className="py-20 md:py-32 px-4 relative border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="max-w-3xl mb-16">
              <span className="text-red-400 font-mono text-sm uppercase tracking-widest mb-4 block">O Problema</span>
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.05]">
                  O seu bar não pode depender do <span className="text-red-500">bom senso do DJ.</span>
                </h2>
              </Reveal>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
                  Multas da prefeitura por vazamento de som e alto-falantes queimados por excesso de volume são os maiores
                  ralos de dinheiro da noite. Nós assumimos o controle da sua infraestrutura.
                </p>
              </FadeIn>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {painCards.map((card, i) => (
                <FadeIn key={card.title} delay={0.1 + i * 0.15} className="h-full">
                  <SpotlightCard className="h-full rounded-3xl p-8 border border-red-500/15 bg-red-950/10">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                      <card.icon className="w-7 h-7 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{card.desc}</p>
                  </SpotlightCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 3. SOLUÇÃO (TABS) ═══════════════ */}
        <section className="py-20 md:py-32 px-4 relative border-t border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn className="max-w-3xl mb-14">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 block">
                A Solução Sonus Pro Audio
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                Soluções de Áudio de Ponta a Ponta para o seu Negócio.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Abas */}
              <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar" role="tablist">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === activeStep}
                    onClick={() => setActiveStep(i)}
                    className={`shrink-0 text-left rounded-2xl border px-5 py-4 flex items-center gap-4 transition-all duration-300 ${
                      i === activeStep
                        ? "bg-blue-500/10 border-blue-500/40 text-white shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        : "bg-zinc-950/50 border-white/10 text-zinc-400 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border ${
                        i === activeStep ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "border-white/10"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="font-bold whitespace-nowrap lg:whitespace-normal">{s.short}</span>
                  </button>
                ))}
              </div>

              {/* Painel */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8 md:p-12 relative overflow-hidden"
                  >
                    <div className="absolute -top-6 -right-2 text-[10rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                      {activeStep + 1}
                    </div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                        <StepIcon className="w-7 h-7 text-blue-400" />
                      </div>
                      <span className="text-blue-400 font-mono text-xs uppercase tracking-widest block mb-3">
                        Passo {activeStep + 1} de {steps.length}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-5">{step.title}</h3>
                      <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light mb-8">{step.desc}</p>
                      <ul className="space-y-3 mb-10">
                        {step.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-zinc-300">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                            <span className="text-sm md:text-base">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          disabled={activeStep === 0}
                          onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                          className="rounded-full border-white/10 hover:bg-white/5"
                        >
                          Passo anterior
                        </Button>
                        <Button
                          disabled={activeStep === steps.length - 1}
                          onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
                          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Próximo passo <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. AUTORIDADE (MARQUEE + PARALLAX) ═══════════════ */}
        <section ref={authorityRef} className="py-20 md:py-32 relative border-t border-white/5 overflow-hidden">
          <motion.div
            style={{ y: parallaxY }}
            className="absolute -inset-y-24 inset-x-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"
          />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <FadeIn className="text-center mb-14">
              <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-4 block">
                Autoridade e Tecnologia
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto">
                Tecnologia de Nível Internacional no{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Sudoeste do Paraná.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.15} className="max-w-3xl mx-auto mb-16">
              <ul className="space-y-4">
                {techBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-950/60 px-6 py-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-zinc-300 text-base md:text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Marquee infinito */}
          <div className="relative z-10 w-full py-10 bg-[#050505] border-y border-white/5 overflow-hidden flex items-center">
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
                      className={`${logo.className} w-auto object-contain brightness-0 invert opacity-50`}
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl font-black tracking-widest text-white/50 select-none">
                      {logo.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 5. FORMULÁRIO (STICKY + BORDA ILUMINADA) ═══════════════ */}
        <section id="contato" className="py-20 md:py-32 px-4 relative border-t border-white/5">
          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-2 lg:sticky lg:top-28">
              <span className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4 block">Diagnóstico Técnico</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-6">
                Profissionalize a Operação do Seu Bar.
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
                Preencha os dados abaixo. Nossa equipe agendará uma visita técnica para avaliar sua acústica e o sistema atual.
              </p>
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                Seus dados são usados apenas para o contato sobre o seu projeto.
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-500/60 shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]">
                <div className="rounded-[calc(2rem-1px)] bg-zinc-950 p-6 md:p-10">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4">Solicitação Enviada!</h3>
                      <p className="text-zinc-400 mb-8">
                        Nossa equipe entrará em contato em breve para agendar a visita técnica no seu estabelecimento.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
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
