import { useState, useEffect, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate } from "react-router-dom"
import { Turnstile } from "@marsidev/react-turnstile"
import {
  AlertTriangle,
  AudioLines,
  Camera,
  ChevronRight,
  Clock,
  Cpu,
  MessageCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react"

import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FadeIn } from "@/components/ui/FadeIn"
import { Magnetic } from "@/components/ui/Magnetic"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { InlineWhatsAppCta } from "@/components/ui/InlineWhatsAppCta"
import { AutonomousPipeline } from "@/components/podcasts/AutonomousPipeline"
import { PodcastVerticals } from "@/components/podcasts/PodcastVerticals"
import { logLead, getUserGeo } from "@/lib/analytics"
import { sendLeadEmail } from "@/lib/emailService"
import {
  trackCustomizeProduct,
  trackFormStart,
  trackLeadConversion,
  trackPageIntent,
  trackWhatsAppClick,
} from "@/lib/metaPixel"

import certLevel2 from "@/assets/cert-level2.png"
import certVision from "@/assets/cert-vision.webp"
import certSales from "@/assets/cert-sales.webp"

const PodcastStudio3D = lazy(() =>
  import("@/components/podcasts/PodcastStudio3D").then((m) => ({ default: m.PodcastStudio3D }))
)
const LPFooter = lazy(() => import("@/components/layout/LPFooter").then((m) => ({ default: m.LPFooter })))
const TestimonialSection = lazy(() =>
  import("@/components/ui/TestimonialSection").then((m) => ({ default: m.TestimonialSection }))
)
const StickyCtaBar = lazy(() =>
  import("@/components/ui/StickyCtaBar").then((m) => ({ default: m.StickyCtaBar }))
)
const WarrantyBanner = lazy(() =>
  import("@/components/layout/WarrantyBanner").then((m) => ({ default: m.WarrantyBanner }))
)
const WhatsAppButton = lazy(() =>
  import("@/components/layout/WhatsAppButton").then((m) => ({ default: m.WhatsAppButton }))
)
const AeoFaq = lazy(() => import("@/components/ui/AeoFaq").then((m) => ({ default: m.AeoFaq })))

const PROFILE_OPTIONS = [
  "Corporativo & Executivo",
  "Igreja & Ministério",
  "Estúdio / Criador / Marca",
  "Educação / Universidade",
] as const

const ROI_PRESETS = [
  {
    id: "2ep",
    label: "2 Episódios / mês",
    shortLabel: "2 ep / mês",
    execTime: "1h30 / mês",
    longOutput: "2 Episódios 16:9",
    shortOutput: "30+ Cortes 9:16 & 1:1",
    crewCost: "R$ 0 em operação na sala",
  },
  {
    id: "4ep",
    label: "4 Episódios / mês",
    shortLabel: "4 ep / mês",
    execTime: "3h / mês",
    longOutput: "4 Episódios 16:9",
    shortOutput: "60+ Cortes 9:16 & 1:1",
    crewCost: "Presença diária LinkedIn/Reels",
  },
  {
    id: "8ep",
    label: "8 Episódios / mês",
    shortLabel: "8 ep / mês",
    execTime: "6h / mês",
    longOutput: "8 Episódios 16:9",
    shortOutput: "120+ Cortes multi-canal",
    crewCost: "Multi-programas & campanhas B2B",
  },
] as const

const podcastTestimonials = [
  {
    name: "Eduardo",
    role: "Diretor de Marketing & Marca",
    company: "Grupo Industrial B2B",
    initials: "E",
    text: "Nossos diretores nunca tinham tempo de esperar equipe externa montar câmera e luz. Hoje eles reservam 45 minutos na sala de podcast da empresa, apertam um único botão no painel e no mesmo dia o marketing já recebe o episódio e os cortes verticais com a nossa identidade visual.",
  },
  {
    name: "Pr. Marcos",
    role: "Pastor de Comunicação",
    company: "Igreja Batista",
    initials: "PM",
    text: "Dependíamos de voluntários para operar vídeo e editar os cortes da semana, o que atrasava tudo. Com o estúdio autônomo em Q-SYS entregue pela Sonus, os próprios pastores gravam devocionais em 1 clique e recebem os Reels legendados prontos para publicar.",
  },
  {
    name: "Camila",
    role: "Head de Pessoas & Cultura",
    company: "Empresa de Tecnologia",
    initials: "C",
    text: "Usamos o mesmo estúdio para o videocast da presidência no LinkedIn e para gravar treinamentos internos confidenciais sem ninguém técnico dentro da sala. A qualidade de som e o corte automático de câmera dão outro nível de profissionalismo.",
  },
]

const podcastFaqs = [
  {
    question: "Como um executivo ou convidado consegue gravar sozinho sem operador na sala?",
    answer:
      "Toda a complexidade técnica fica pré-programada no processador Q-SYS. Ao entrar na sala, basta tocar em um único botão no painel de mesa para acender a iluminação cênica, ativar os microfones broadcast com cancelamento de ruído, iniciar as câmeras PTZ 4K com corte automático por voz e disparar a gravação redundante.",
  },
  {
    question: "O corte automático de câmeras erra se alguém tossir ou bater um copo na mesa?",
    answer:
      "Não. Ajustamos filtros inteligentes de tempo e frequência vocal no processamento Q-SYS: ruídos curtos e acidentais são ignorados, enquanto a câmera só troca o enquadramento quando detecta fala real e contínua. Se duas ou mais pessoas debaterem ao mesmo tempo, o sistema muda automaticamente para o plano aberto da mesa.",
  },
  {
    question: "Como os cortes verticais 9:16, legendas e episódios completos são gerados automaticamente?",
    answer:
      "A camada inteligente integrada à arquitetura do estúdio Sonus recebe o material logo após o término da gravação, realiza a transcrição automática, remove silêncios longos por análise de texto, identifica os trechos de maior impacto, aplica reenquadramento facial e insere legendas dinâmicas com fontes, cores e vinhetas da sua empresa — entregando pastas prontas em 9:16, 1:1 e 16:9.",
  },
  {
    question: "De que tamanho de sala eu preciso na minha empresa para montar um estúdio assim?",
    answer:
      "Projetamos desde salas executivas compactas a partir de 10 a 14 m² até estúdios principais maiores para mesas de 4 a 6 pessoas. Fazemos todo o estudo acústico para transformar até salas de vidro ou escritórios corporativos comuns em ambientes com som de estúdio profissional, zero eco e isolamento contra ruídos externos.",
  },
  {
    question: "A Sonus entrega apenas o projeto ou executa a obra completa pronto para usar?",
    answer:
      "Entregamos o pacote turn-key completo em todo o Brasil e LATAM: projeto acústico e luminotécnico, fornecimento de microfones, câmeras 4K, ecossistema Q-SYS, instalação limpa, configuração da identidade visual dos cortes, treinamento de equipe e 3 anos de garantia com suporte remoto via Q-SYS Reflect.",
  },
]

const ENGINEERING_PILLARS = [
  {
    num: "01",
    icon: AudioLines,
    accent: "text-amber-300",
    title: "Acústica de Broadcast em Salas Reais",
    desc: "Nenhuma automação salva uma sala com eco. Tratamos a acústica e o isolamento para transformar salas corporativas ou anexos em estúdios com voz encorpada e silenciosa.",
  },
  {
    num: "02",
    icon: Camera,
    accent: "text-cyan-300",
    title: "Direção Multi-Câmera PTZ em 4K",
    desc: "Câmeras robóticas silenciosas enquadram quem fala com fluidez cinematográfica, eliminando custos mensais de cinegrafista e diretor de corte.",
  },
  {
    num: "03",
    icon: Cpu,
    accent: "text-sky-300",
    title: "Automação One-Touch Q-SYS + Reflect",
    desc: "Monitoramento remoto pela sua TI ou pela Sonus via nuvem. Se houver qualquer cabo solto ou alerta, diagnosticamos antes mesmo da gravação começar.",
  },
  {
    num: "04",
    icon: Sparkles,
    accent: "text-emerald-300",
    title: "Pós-Produção Integrada com Sua Marca",
    desc: "Templates exclusivos, lower-thirds, fontes corporativas, vinhetas e formatos 9:16, 1:1 e 16:9 já pré-configurados no fluxo de saída do estúdio.",
  },
]

export function PodcastsLanding() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const [roiPresetId, setRoiPresetId] = useState<(typeof ROI_PRESETS)[number]["id"]>("4ep")
  const activeRoi = ROI_PRESETS.find((r) => r.id === roiPresetId) ?? ROI_PRESETS[1]

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    profile: "Corporativo & Executivo",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setTurnstileToken] = useState("")
  const [submitError, setSubmitError] = useState("")

  const scrollToForm = (source: string, preselectedProfile?: string) => {
    if (preselectedProfile) {
      setFormData((prev) => ({ ...prev, profile: preselectedProfile }))
    }
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: "intent_to_convert_podcasts",
      source,
      profile: preselectedProfile || formData.profile,
    })
    trackPageIntent("Intent_Podcasts")
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleWhatsApp = (origin: string) => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    trackWhatsAppClick(origin, "podcastslanding")

    getUserGeo().then((geo) => {
      logLead({
        type: "whatsapp",
        source: window.location.pathname,
        city: geo.city || "Desconhecida",
        region: geo.region || "Desconhecida",
        country: geo.country || "BR",
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        timestamp: Date.now(),
        whatsappOrigin: origin,
      })
    })

    const text =
      "Olá! Gostaria de falar com um especialista da Sonus sobre um Estúdio de Podcast 100% Autônomo com Q-SYS e cortes automáticos."
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")

    let utms: { source?: string; campaign?: string; medium?: string } | null = null
    try {
      const stored = localStorage.getItem("sonus_utms")
      if (stored) utms = JSON.parse(stored)
    } catch {
      /* noop */
    }

    const formattedMessage = `Perfil da Operação: ${formData.profile}\nOrganização: ${formData.organization}\n\nDetalhes do Estúdio / Projeto:\n${formData.message}`

    const emailPromise = sendLeadEmail({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formattedMessage,
      source: "Landing Page Podcasts",
      utms,
    })

    const firestorePromise = getUserGeo().then((geo) =>
      logLead({
        type: "form",
        name: formData.organization ? `${formData.name} (${formData.organization})` : formData.name,
        phone: formData.phone,
        email: formData.email,
        source: "Landing Page Podcasts",
        city: geo.city || "Desconhecida",
        region: geo.region || "Desconhecida",
        country: geo.country || "BR",
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        timestamp: Date.now(),
        utms,
      })
    )

    await Promise.allSettled([emailPromise, firestorePromise])

    ;(window as any).dataLayer = (window as any).dataLayer || []
    trackLeadConversion("form_podcasts", 500, "BRL")

    try {
      localStorage.removeItem("sonus_utms")
    } catch {
      /* noop */
    }

    setIsSubmitting(false)
    navigate("/obrigado")
  }

  const podcastsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Estúdios e Salas de Podcast 100% Autônomos com Ecossistema Q-SYS",
    provider: {
      "@type": "LocalBusiness",
      name: "Sonus Pro Audio e Video",
      url: "https://sonusproaudio.com.br",
    },
    areaServed: [
      { "@type": "Country", name: "Brazil" },
      { "@type": "Continent", name: "Latin America" },
    ],
    description:
      "Engenharia completa turn-key para estúdios e salas de podcast 100% autônomos. Acionamento em um toque via Q-SYS, corte automático multi-câmera por voz, tratamento acústico, transcrição automática e entrega de episódios 16:9 e cortes verticais 9:16 e 1:1 com legendas da marca.",
  }

  const inputFieldClass =
    "bg-white/[0.03] border-white/[0.12] hover:border-white/25 focus-visible:border-amber-400/60 focus-visible:ring-2 focus-visible:ring-amber-400/20 transition-[border-color,box-shadow] duration-200 h-12 text-white placeholder:text-zinc-500 rounded-xl"

  return (
    <div className="dark flex flex-col min-h-screen bg-[#060509] text-white selection:bg-amber-500/30 font-sans overflow-x-clip">
      <Helmet>
        <html lang="pt-BR" />
        <title>Estúdios e Salas de Podcast 100% Autônomos com Q-SYS | Sonus Pro Audio</title>
        <meta
          name="description"
          content="Projetos turn-key de estúdios de podcast corporativos e profissionais 100% autônomos. Um toque no painel Q-SYS para gravar com corte multi-câmera automático e receber episódio 16:9 + cortes verticais 9:16 legendados na sua marca."
        />
      </Helmet>

      <SEO
        title="Estúdios e Salas de Podcast 100% Autônomos com Q-SYS | Sonus Pro Audio"
        description="Projetos turn-key de estúdios de podcast corporativos e profissionais 100% autônomos. Automação Q-SYS em um toque, corte de câmera por voz e entrega automática em 9:16, 1:1 e 16:9."
        url="https://sonusproaudio.com.br/podcasts"
        keywords="estúdio de podcast corporativo, sala de podcast autônoma Q-SYS, podcast executivo B2B, estúdio automático com corte de câmeras por voz, geração automática de cortes 9:16"
        schema={podcastsSchema}
      />

      <Navbar />

      <main className="flex-1 w-full relative z-10">
        {/* 1. HERO + 3D AUTONOMOUS STUDIO STAGE */}
        <section className="relative pt-24 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
          {/* Atmospheric Obsidian + Tungsten Glows */}
          <div className="pointer-events-none absolute -top-40 right-0 w-[680px] h-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12)_0%,transparent_68%)]" />
          <div className="pointer-events-none absolute top-40 -left-32 w-[520px] h-[440px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08)_0%,transparent_70%)]" />

          <div className="max-w-[1380px] mx-auto relative z-10">
            {/* Editorial Split Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-end mb-7 sm:mb-12 md:mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 sm:mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 pod-tally-dot" />
                    AUTONOMOUS ENGINE
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[10.5px] sm:text-[11px] font-mono tracking-[0.12em] sm:tracking-[0.16em] uppercase text-amber-300">
                    Ecossistema Q-SYS + Cortes Prontos
                  </span>
                </div>

                <h1 className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-[4.15rem] font-black tracking-tight leading-[1.05] text-white">
                  Estúdios de Podcast{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
                    100% Autônomos.
                  </span>
                </h1>

                <p className="text-sm sm:text-xl text-zinc-200 sm:text-zinc-300/90 font-normal sm:font-light leading-relaxed mt-4 sm:mt-5 max-w-2xl">
                  Sua diretoria entra na sala sem equipe técnica, toca em um único botão e grava com corte
                  automático de câmeras por voz. Ao encerrar, o sistema entrega o{" "}
                  <strong className="text-white font-semibold">episódio completo em 16:9</strong> e dezenas de{" "}
                  <strong className="text-white font-semibold">cortes verticais 9:16 legendados</strong> na
                  identidade da sua marca.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mt-6 sm:mt-8">
                  <Magnetic className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      onClick={() => scrollToForm("hero_podcasts")}
                      className="w-full sm:w-auto h-auto min-h-14 py-3 px-6 sm:px-8 whitespace-normal text-center leading-tight rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base shadow-[0_18px_45px_-12px_rgba(245,158,11,0.45)] transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      Projetar Nosso Estúdio Autônomo
                      <ChevronRight className="ml-1.5 w-4 h-4" />
                    </Button>
                  </Magnetic>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleWhatsApp("hero_podcasts")}
                    className="w-full sm:w-auto h-auto min-h-14 py-3 px-6 sm:px-7 whitespace-normal text-center leading-tight rounded-full border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white font-semibold text-sm sm:text-base cursor-pointer"
                  >
                    <MessageCircle className="mr-2 w-4 h-4 text-emerald-400" />
                    Falar com Engenheiro no WhatsApp
                  </Button>
                </div>
              </div>

              {/* Right Header Metrics — Compact 3-col strip on mobile so 3D rises into view */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 border-t border-white/10 divide-x divide-white/10 sm:divide-x-0 lg:pt-0 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 [&>div]:min-w-0">
                <div className="pr-1 sm:pr-0">
                  <span className="block text-lg sm:text-3xl font-black text-amber-300 tracking-tight">Zero</span>
                  <span className="block text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 leading-snug">
                    Operadores na sala
                  </span>
                </div>
                <div className="pl-2.5 sm:pl-0 pr-1 sm:pr-0">
                  <span className="block text-lg sm:text-3xl font-black text-white tracking-tight">1 Toque</span>
                  <span className="block text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 leading-snug">
                    Luz, som e câmeras
                  </span>
                </div>
                <div className="pl-2.5 sm:pl-0">
                  <span className="block text-lg sm:text-3xl font-black text-cyan-300 tracking-tight">3 Formatos</span>
                  <span className="block text-[11px] sm:text-xs text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 leading-snug">
                    9:16, 1:1 e 16:9 prontos
                  </span>
                </div>
              </div>
            </div>

            {/* Proposta de valor em 3 passos — enxuta no mobile e legível sem nenhum clique */}
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-0 mb-6 sm:mb-8 md:mb-10 relative">
              {[
                {
                  n: "1",
                  title: "Toque uma vez no painel Q-SYS",
                  desc: "Luz, microfones, câmeras e gravação ligam juntos. Sem técnico na sala.",
                  icon: Cpu,
                },
                {
                  n: "2",
                  title: "As câmeras cortam sozinhas",
                  desc: "O sistema detecta quem fala e troca de câmera como um diretor de TV.",
                  icon: Camera,
                },
                {
                  n: "3",
                  title: "Receba tudo pronto para publicar",
                  desc: "Episódio 16:9 e cortes 9:16 e 1:1 legendados com a sua marca.",
                  icon: Sparkles,
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.n}
                    className="relative flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 md:p-6 rounded-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl bg-gradient-to-b from-[#161321] to-[#0a090f] border border-white/[0.12] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <span className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-400 text-slate-950 font-black text-sm sm:text-lg flex items-center justify-center shadow-[0_6px_18px_-4px_rgba(245,158,11,0.6)]">
                      {item.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                        <Icon className="w-4 h-4 text-amber-300 shrink-0" />
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 sm:text-zinc-400 mt-0.5 sm:mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    {i < 2 && (
                      <span className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-black items-center justify-center">
                        →
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>

            {/* Interactive 3D Real-Time Studio Simulator (Lazy Loaded) */}
            <Suspense
              fallback={
                <div className="w-full h-[540px] sm:h-[580px] xl:h-[530px] rounded-[2rem] border border-white/[0.09] bg-[#07060b] flex flex-col items-center justify-center gap-3">
                  <Radio className="w-7 h-7 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
                    Carregando Estúdio 3D Interativo...
                  </span>
                </div>
              }
            >
              <PodcastStudio3D />
            </Suspense>
          </div>
        </section>

        {/* 2. EXECUTIVE ROI SIMULATOR & BROADCAST PARTNER BAR */}
        <section className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-10 pod-timecode-line bg-[#090811]">
          <div className="max-w-[1380px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.26em] text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  ROI do Tempo Executivo
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-[1.1]">
                  45 minutos do seu CEO viram{" "}
                  <span className="text-amber-300">um mês inteiro de presença digital.</span>
                </h2>
                <p className="text-zinc-200 sm:text-zinc-400 text-sm sm:text-base font-normal sm:font-light leading-relaxed">
                  Projetos tradicionais param na falta de agenda das lideranças, na fila eterna da edição externa ou
                  no desconforto de gravar assuntos estratégicos diante de terceiros. Nossa arquitetura remove o atrito
                  técnico para transformar conversa executiva em distribuição contínua.
                </p>
              </div>

              {/* Interactive Cadence Multiplier */}
              <div className="lg:col-span-6 rounded-3xl border border-white/15 bg-gradient-to-b from-[#161321] to-[#0a090f] p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-2.5">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-200">
                    <span className="pod-hint-dot shrink-0" />
                    Toque e compare o rendimento mensal:
                  </span>
                  <div className="grid grid-cols-3 sm:flex gap-1.5 w-full sm:w-auto">
                    {ROI_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setRoiPresetId(preset.id)
                          trackCustomizeProduct("Podcast_ROI_Calc", preset.id)
                        }}
                        data-active={roiPresetId === preset.id}
                        className={`pod-btn px-2 sm:px-3.5 py-2 rounded-xl sm:rounded-lg text-xs font-bold text-center ${
                          roiPresetId === preset.id ? "text-amber-100" : "text-zinc-100"
                        }`}
                      >
                        <span className="sm:hidden">{preset.shortLabel}</span>
                        <span className="hidden sm:inline">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 sm:p-0 sm:bg-transparent sm:border-0">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 sm:text-zinc-500">Agenda Líder</span>
                    <span className="block text-base sm:text-lg font-extrabold text-white mt-1">{activeRoi.execTime}</span>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 sm:p-0 sm:bg-transparent sm:border-0">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 sm:text-zinc-500">Long-Form</span>
                    <span className="block text-base sm:text-lg font-extrabold text-cyan-300 mt-1">{activeRoi.longOutput}</span>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 sm:p-0 sm:bg-transparent sm:border-0">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 sm:text-zinc-500">Peças Sociais</span>
                    <span className="block text-base sm:text-lg font-extrabold text-amber-300 mt-1">{activeRoi.shortOutput}</span>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 sm:p-0 sm:bg-transparent sm:border-0">
                    <span className="block text-[10px] font-mono uppercase text-zinc-400 sm:text-zinc-500">Resultado</span>
                    <span className="block text-xs sm:text-sm font-bold text-emerald-400 mt-1 leading-snug">{activeRoi.crewCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner & Broadcast Ecosystem Logos */}
            <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4 sm:gap-6 opacity-75">
              <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.22em] text-zinc-400 sm:text-zinc-500 text-center sm:text-left">
                Padrão de Hardware & Distribuição Global
              </span>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
                <img src="/qsys-logo.png" alt="Q-SYS" className="h-4 sm:h-5 w-auto object-contain brightness-0 invert" />
                <img src="/shure-logo.png" alt="Shure" className="h-3.5 sm:h-4 w-auto object-contain brightness-0 invert" />
                <img
                  src="/marcas/sennheiser.svg"
                  alt="Sennheiser"
                  className="h-3.5 sm:h-4 w-auto object-contain brightness-0 invert"
                />
                <img src="/marcas/qsc.png" alt="QSC" className="h-4 sm:h-5 w-auto object-contain brightness-0 invert" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. PIPELINE INTERATIVO "DO REC À PUBLICAÇÃO" */}
        <AutonomousPipeline />

        <div className="bg-[#060509] pb-12 sm:pb-20 px-4">
          <InlineWhatsAppCta
            origin="section_pipeline"
            pageName="podcasts"
            message="Olá! Queremos montar um estúdio de podcast autônomo com Q-SYS e geração automática de cortes."
            className="mt-0"
          />
        </div>

        {/* 4. APLICAÇÕES POR PERFIL DE OPERAÇÃO */}
        <PodcastVerticals onSelectProfile={(profile) => scrollToForm("vertical_cta", profile)} />

        {/* 5. ENGENHARIA ACÚSTICA, AUTORIDADE Q-SYS E GARANTIA */}
        <section
          aria-labelledby="engineering-heading"
          className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 pod-timecode-line bg-[#060509]"
        >
          <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.26em] text-cyan-300">
                <Volume2 className="w-3.5 h-3.5" />
                Acústica & Certificação Oficial
              </span>
              <h2
                id="engineering-heading"
                className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-[1.08]"
              >
                28 anos desenhando áudio e vídeo de precisão —{" "}
                <span className="text-cyan-300">da acústica à nuvem.</span>
              </h2>
              <p className="text-zinc-200 sm:text-zinc-400 text-sm sm:text-base font-normal sm:font-light leading-relaxed">
                Microfone caro em sala ecoando entrega som amador. A Sonus projeta o tratamento acústico, a
                distribuição elétrica silenciosa, o posicionamento óptico das câmeras PTZ e toda a programação Q-SYS
                antes de instalar o primeiro parafuso.
              </p>

              {/* Q-SYS Certifications */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-5 sm:gap-6">
                <img
                  src={certLevel2}
                  loading="lazy"
                  decoding="async"
                  alt="Certificação Oficial Q-SYS Level 2"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <img
                  src={certVision}
                  loading="lazy"
                  decoding="async"
                  alt="Certificação Oficial Q-SYS VisionSuite"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <img
                  src={certSales}
                  loading="lazy"
                  decoding="async"
                  alt="Certificação Oficial Q-SYS"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              {ENGINEERING_PILLARS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.num}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0c16]/90 hover:border-amber-400/35 transition-colors duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-xs font-mono font-bold text-zinc-400 sm:text-zinc-500">{item.num}</span>
                        <Icon className={`w-5 h-5 ${item.accent}`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{item.title}</h3>
                      <p className="text-sm text-zinc-200 sm:text-zinc-400 font-normal sm:font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-[340px]" />}>
          <WarrantyBanner
            variant="qsys"
            title="3 Anos de Garantia com Monitoramento Remoto"
            description="Todos os estúdios autônomos da Sonus são homologados em laboratório próprio e acompanham 3 anos de garantia sobre a integração audiovisual Q-SYS e monitoramento contínuo de disponibilidade."
          />
        </Suspense>

        {/* 6. FORMULÁRIO DE DIAGNÓSTICO DE ESTÚDIO (#contato) */}
        <section
          id="contato"
          aria-labelledby="contact-title"
          className="relative py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 pod-timecode-line bg-[#060509]"
        >
          <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.26em] text-amber-400 mb-3 sm:mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Diagnóstico Personalizado
                </span>
                <h2 id="contact-title" className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                  Dimensione o{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                    Estúdio Autônomo
                  </span>{" "}
                  da sua operação.
                </h2>
                <p className="text-zinc-200 sm:text-zinc-400 text-sm sm:text-base font-normal sm:font-light leading-relaxed mt-3 sm:mt-4">
                  Avaliamos o espaço disponível, o fluxo ideal de gravação e definimos toda a arquitetura de áudio,
                  câmeras PTZ, Q-SYS e entrega de cortes no padrão da sua marca.
                </p>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {[
                  {
                    step: "01",
                    title: "Levantamento do Espaço e Perfil",
                    desc: "Analisamos medidas da sala (a partir de 10 m²), acústica atual e número de assentos.",
                  },
                  {
                    step: "02",
                    title: "Projeto Turn-Key Claro",
                    desc: "Você recebe escopo de acústica, câmeras, Q-SYS e automação de saída em 9:16, 1:1 e 16:9.",
                  },
                  {
                    step: "03",
                    title: "Instalação Limpa e Treinamento Rápido",
                    desc: "Entregamos tudo testado e ensaiado em 15 minutos com sua liderança e time de marketing.",
                  },
                ].map((item) => (
                  <div key={item.step} className="py-4 sm:py-5 flex items-start gap-3.5 sm:gap-4">
                    <span className="text-xs font-mono text-amber-400 pt-0.5">{item.step}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-zinc-300 sm:text-zinc-400 font-normal sm:font-light mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-300 sm:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Projetos, equipamentos e implantação presencial para todo o Brasil e LATAM.</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} className="lg:col-span-7 w-full">
              <SpotlightCard className="rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-10 md:p-12 border border-white/12 bg-[#0d0c16]/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
                <form
                  className="space-y-5 sm:space-y-6"
                  onSubmit={handleSubmit}
                  onInvalid={() => {
                    ;(window as any).dataLayer = (window as any).dataLayer || []
                    ;(window as any).dataLayer.push({
                      event: "form_error",
                      error_type: "html_validation_failed",
                    })
                  }}
                >
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  {/* Quick Profile Pills — Clean 2x2 grid on mobile */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-zinc-300 block">
                      Perfil do Projeto <span className="text-amber-300 font-normal">— toque para escolher</span>
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                      {PROFILE_OPTIONS.map((prof) => {
                        const selected = formData.profile === prof
                        return (
                          <button
                            key={prof}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, profile: prof }))}
                            data-active={selected}
                            className={`pod-btn px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold text-center leading-tight ${
                              selected ? "text-amber-100" : "text-zinc-100"
                            }`}
                          >
                            {prof}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
                        Seu Nome
                      </label>
                      <Input
                        id="name"
                        required
                        placeholder="Ex: Henrique Almeida"
                        value={formData.name}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("name", "podcasts")
                        }}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="organization" className="text-xs font-semibold text-zinc-300">
                        Empresa, Igreja ou Instituição
                      </label>
                      <Input
                        id="organization"
                        required
                        placeholder="Nome da organização e cargo"
                        value={formData.organization}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("organization", "podcasts")
                        }}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
                        E-mail Profissional
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="nome@empresa.com.br"
                        value={formData.email}
                        onInvalid={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity("Digite um endereço de e-mail válido")
                        }
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("email", "podcasts")
                        }}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold text-zinc-300">
                        WhatsApp ou Telefone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="(11) 90000-0000"
                        value={formData.phone}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("phone", "podcasts")
                        }}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-300">
                      Conte brevemente sobre o estúdio que deseja montar
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Quantos participantes na mesa (ex: 2 a 4 pessoas), tamanho aproximado da sala e cidade onde será implantado..."
                      value={formData.message}
                      onBlur={(e) => {
                        if (e.target.value.trim() !== "") trackFormStart("message", "podcasts")
                      }}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/[0.03] border-white/[0.12] hover:border-white/25 focus-visible:border-amber-400/60 focus-visible:ring-2 focus-visible:ring-amber-400/20 transition-[border-color,box-shadow] duration-200 min-h-[140px] resize-none text-white placeholder:text-zinc-500 p-4 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-center pt-1 min-h-[65px]">
                    <Turnstile
                      siteKey="0x4AAAAAADmmjbWL-CsAzHC9"
                      onSuccess={(token) => {
                        setSubmitError("")
                        setTurnstileToken(token)
                      }}
                      onError={() =>
                        setSubmitError(
                          "Erro ao carregar segurança. Verifique se o domínio está liberado ou desative seu bloqueador."
                        )
                      }
                      onExpire={() => setTurnstileToken("")}
                      options={{ theme: "dark" }}
                    />
                  </div>

                  {submitError && (
                    <div className="text-red-400 text-sm font-medium text-center bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20 flex items-center justify-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <Magnetic className="w-full">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      size="lg"
                      className="w-full h-auto min-h-14 py-3 whitespace-normal text-center leading-tight text-sm sm:text-lg font-bold rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_18px_50px_-12px_rgba(245,158,11,0.45)] transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      {isSubmitting ? "Enviando Solicitação..." : "Solicitar Projeto do Estúdio Autônomo"}
                      {!isSubmitting && <ChevronRight className="ml-2 w-5 h-5" />}
                    </Button>
                  </Magnetic>
                </form>
              </SpotlightCard>
            </FadeIn>
          </div>
        </section>
      </main>

      <Suspense
        fallback={
          <div className="min-h-[200px] w-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AeoFaq
          faqs={podcastFaqs}
          title="Dúvidas Técnicas e Operacionais sobre Estúdios Autônomos"
          subtitle="Arquitetura Q-SYS & Pós-Produção Integrada"
        />
        <TestimonialSection
          title="Quem gravava por horas, hoje publica no mesmo dia."
          subtitle="Lideranças de marketing, comunicação e ministérios que operam seus próprios estúdios autônomos sem equipe técnica na sala."
          testimonials={podcastTestimonials}
        />
        <LPFooter />
        <WhatsAppButton message="Olá! Gostaria de conversar sobre um Estúdio de Podcast 100% Autônomo com Q-SYS." />
        <StickyCtaBar
          buttonText="Orçar Estúdio"
          messageText="Olá! Gostaria de receber um orçamento para montar um estúdio de podcast autônomo com Q-SYS e geração de cortes."
        />
      </Suspense>
    </div>
  )
}
