import { useState, useEffect, lazy, Suspense } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Turnstile } from "@marsidev/react-turnstile"
import { getTurnstileSiteKey, TURNSTILE_OPTIONS } from "@/lib/turnstile"
import {
  AlertTriangle,
  ChevronRight,
  Code2,
  Network,
  ShieldCheck,
  Sparkles,
  Wrench,
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
import { EducationHeroSimulator } from "@/components/educacao/EducationHeroSimulator"
import { CampusBentoGrid } from "@/components/educacao/CampusBentoGrid"
import { QSysReflectDashboard } from "@/components/educacao/QSysReflectDashboard"
import { GlobalCasesShowcase } from "@/components/educacao/GlobalCasesShowcase"
import { ORG_ID, SITE_URL, SONUS_ORGANIZATION, buildBreadcrumb, buildGraph } from "@/lib/schema"
import { logLead, getUserGeo } from "@/lib/analytics"
import { sendLeadEmail } from "@/lib/emailService"
import {
  trackFormStart,
  trackPageIntent,
  trackWhatsAppClick,
  trackLeadConversion,
} from "@/lib/metaPixel"

import certLevel2 from "@/assets/cert-level2.png"
import certVision from "@/assets/cert-vision.webp"
import certSales from "@/assets/cert-sales.webp"

const AuthoritySculpture3D = lazy(() => import("@/components/educacao/AuthoritySculpture3D"))
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

const educationTestimonials = [
  {
    name: "Ana",
    role: "Diretora Acadêmica",
    company: "Universidade Privada",
    initials: "A",
    text: "O auditório e os espaços do campus precisavam atender grandes eventos e, ao mesmo tempo, ser simples para o uso diário dos coordenadores e professores. A equipe da Sonus entregou um sistema robusto, limpo e extremamente fácil de operar. A execução da obra foi impecável.",
  },
  {
    name: "Felipe",
    role: "Gerente de TI",
    company: "Instituição Multicampi",
    initials: "F",
    text: "A gente perdia pelo menos 15 minutos no começo das atividades tentando fazer som e vídeo funcionarem nas salas antigas. A Sonus padronizou tudo: hoje basta tocar em um único botão na tela e a chamada já começa funcionando. Zeramos os chamados urgentes por microfone mudo.",
  },
  {
    name: "Ricardo",
    role: "Diretor Administrativo",
    company: "Rede de Ensino",
    initials: "R",
    text: "O maior alívio foi fazer toda a implantação durante as férias, sem atrasar um único dia do calendário letivo. Os professores entraram nas salas novas e conseguiram dar aula híbrida já no primeiro dia, sem precisar de técnico dentro da sala.",
  },
]

const educationFaqs = [
  {
    question: "Como padronizar vários prédios e salas antigas sem complicar a rotina dos professores?",
    answer:
      "Nós criamos exatamente a mesma tela simples de um toque em todos os espaços — da sala de 30 alunos ao auditório principal. Assim, o professor não precisa reaprender onde ligar o projetor ou o microfone quando muda de bloco: basta tocar em 'Iniciar Aula' e tudo já se ajusta sozinho.",
  },
  {
    question: "O professor precisa usar microfone de lapela ou carregar equipamentos para dar aula híbrida?",
    answer:
      "Não. Instalamos microfones discretos no teto que captam a voz do professor em qualquer ponto da sala (e também as perguntas dos alunos), enquanto as câmeras inteligentes acompanham quem está falando automaticamente. Sem pilhas acabando no meio da aula e sem fios sobre a mesa.",
  },
  {
    question: "Como isso diminui o trabalho da nossa equipe interna de TI?",
    answer:
      "Pelo painel em nuvem Q-SYS Reflect, sua equipe de TI enxerga todas as salas do campus na tela do computador. Se algum cabo for desconectado ou um equipamento precisar reiniciar, o sistema avisa antes da aula começar e permite resolver à distância em segundos — sem correr pelo campus.",
  },
  {
    question: "A instalação atrapalha o semestre letivo ou exige quebrar muitas salas?",
    answer:
      "Não. Como o sistema aproveita a rede de internet da instituição, evitamos obras pesadas. Além disso, pré-montamos e testamos todos os equipamentos antes no laboratório da Sonus para instalar de forma limpa durante férias, recessos ou finais de semana.",
  },
]

const AUTHORITY_PILLARS = [
  {
    num: "01",
    icon: Sparkles,
    accent: "text-cyan-400",
    title: "Especialistas Certificados Q-SYS",
    desc: "Certificações internacionais oficiais Q-SYS Level 2 e VisionSuite: sua instituição atendida diretamente por engenheiros habilitados pela fabricante.",
  },
  {
    num: "02",
    icon: Network,
    accent: "text-blue-400",
    title: "Estudo Acústico antes da Obra",
    desc: "Simulamos suas salas e auditórios em 3D antes da compra dos equipamentos para eliminar eco, microfonia e som embolado no fundo da turma.",
  },
  {
    num: "03",
    icon: Code2,
    accent: "text-emerald-400",
    title: "Tela Feita para Qualquer Professor",
    desc: "Desenvolvemos painéis com a identidade visual da sua escola ou universidade onde luzes, telas, som e chamada funcionam em um só botão.",
  },
  {
    num: "04",
    icon: Wrench,
    accent: "text-indigo-400",
    title: "Entrega Pronta nas Férias Escolares",
    desc: "Montamos e validamos tudo previamente em nosso laboratório para instalar durante o recesso acadêmico, com treinamento completo e 3 anos de garantia.",
  },
]

export function EducacaoLanding() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setTurnstileToken] = useState("")
  const [submitError, setSubmitError] = useState("")

  const scrollToForm = (source: string) => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: "intent_to_convert_educacao", source })
    trackPageIntent("Intent_Educacao")
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleWhatsApp = (origin: string) => {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    trackWhatsAppClick(origin, "educacaolanding")

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
      "Olá! Gostaria de falar com um especialista da Sonus sobre padronização de salas híbridas e auditórios para nossa instituição de ensino."
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

    const formattedMessage = `Instituição de Ensino: ${formData.institution}\n\nDetalhes do Projeto:\n${formData.message}`

    const emailPromise = sendLeadEmail({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formattedMessage,
      source: "Landing Page Educação",
      utms,
    })

    const firestorePromise = getUserGeo().then((geo) =>
      logLead({
        type: "form",
        name: formData.institution ? `${formData.name} (${formData.institution})` : formData.name,
        phone: formData.phone,
        email: formData.email,
        source: "Landing Page Educação",
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
    trackLeadConversion("form_educacao", 500, "BRL")

    try {
      localStorage.removeItem("sonus_utms")
    } catch {
      /* noop */
    }

    setIsSubmitting(false)
    navigate("/obrigado")
  }

  const educacaoSchema = buildGraph(
    {
      "@type": "Service",
      "@id": `${SITE_URL}/educacao#service`,
      url: `${SITE_URL}/educacao`,
      serviceType: "Engenharia Audiovisual e Automação Q-SYS para Instituições de Ensino",
      provider: { "@id": ORG_ID },
      areaServed: SONUS_ORGANIZATION.areaServed,
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "Reitores, Diretores de TI, Pró-Reitores e Mantenedores",
      },
      description:
        "Padronização de salas de aula híbridas (HyFlex), auditórios universitários, salas divisíveis e campus paging com ecossistema Q-SYS, VisionSuite e monitoramento remoto Q-SYS Reflect.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Soluções Audiovisuais para Educação",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Salas de Aula Híbridas (HyFlex) Q-SYS" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auditórios e Salões Nobres Acadêmicos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Salas Divisíveis Inteligentes" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Campus Paging e Sonorização IP" } },
        ],
      },
    },
    buildBreadcrumb([
      { name: "Início", path: "/" },
      { name: "Soluções", path: "/solucoes" },
      { name: "Educação e Universidades", path: "/educacao" },
    ])
  )

  const inputFieldClass =
    "bg-white/[0.03] border-white/10 hover:border-white/25 focus-visible:border-cyan-400/55 focus-visible:ring-2 focus-visible:ring-cyan-400/20 transition-[border-color,box-shadow] duration-200 h-14 text-white placeholder:text-zinc-500 rounded-xl"

  return (
    <div className="flex flex-col min-h-screen bg-[#030407] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <SEO
        schema={educacaoSchema}
        title="Engenharia Audiovisual para Educação e Ensino Híbrido Q-SYS | Sonus Pro AV"
        description="Padronização de salas de aula híbridas (HyFlex), auditórios, salas divisíveis e campus paging com ecossistema Q-SYS. Operação One-Touch para docentes e gestão remota Q-SYS Reflect para TI."
        keywords="engenharia audiovisual educação, salas de aula híbridas hyflex, automação q-sys universidades, microfone de teto beamforming sala de aula, q-sys visionsuite, q-sys reflect, sonorização auditório universitário, campus paging ip"
        image="/teatro-unisep.webp"
        url="https://sonusproaudio.com.br/educacao"
      />

      <Navbar />

      <main className="flex-1 w-full relative">
        {/* 1. HERO + MAQUETE 3D INTERATIVA DA SALA */}
        <EducationHeroSimulator onCtaClick={scrollToForm} onWhatsAppClick={handleWhatsApp} />

        {/* FAIXA DE COMPATIBILIDADE */}
        <div className="edu-hairline-top py-7 sm:py-9 px-4 sm:px-6 lg:px-10 bg-[#05070d]">
          <div className="max-w-[1380px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <span className="text-xs text-zinc-300 sm:text-zinc-400 text-center md:text-left">
              Funciona nativamente com as plataformas que seus professores já usam
            </span>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-9 md:gap-14 opacity-75">
              <img src="/qsys-logo.png" alt="Q-SYS" width={120} height={24} loading="lazy" decoding="async" className="h-4 sm:h-5 md:h-6 w-auto object-contain brightness-0 invert" />
              <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white">Microsoft Teams</span>
              <img src="/zoom-logo.png" alt="Zoom" width={100} height={24} loading="lazy" decoding="async" className="h-4 sm:h-5 md:h-6 w-auto object-contain brightness-0 invert" />
              <img
                src="/google-meet-logo.png"
                alt="Google Meet"
                width={140}
                height={24}
                loading="lazy"
                decoding="async"
                className="h-4 sm:h-5 md:h-6 w-auto object-contain brightness-0 invert"
              />
              <img src="/shure-logo.png" alt="Shure" width={110} height={20} loading="lazy" decoding="async" className="h-3.5 sm:h-4 md:h-5 w-auto object-contain brightness-0 invert" />
            </div>
          </div>
        </div>

        {/* 2. GESTÃO À DISTÂNCIA PELA TI (Q-SYS REFLECT) */}
        <QSysReflectDashboard />

        <div className="bg-[#040508] pb-12 sm:pb-20 px-4">
          <InlineWhatsAppCta
            origin="section_reflect"
            pageName="educacao"
            message="Olá! Queremos padronizar nossas salas de aula e facilitar o suporte da nossa equipe de TI."
            className="mt-0"
          />
        </div>

        {/* 3. SOLUÇÕES POR AMBIENTE DO CAMPUS */}
        <CampusBentoGrid />

        {/* 4. GRANDES UNIVERSIDADES NO MUNDO */}
        <GlobalCasesShowcase onCtaClick={scrollToForm} />

        {/* 5. AUTORIDADE SONUS + ESCULTURA 3D (SÓLIDA EM QUALQUER TELA) */}
        <section
          aria-labelledby="authority-title"
          className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 relative z-10 edu-hairline-top bg-[#05070e]"
        >
          <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-9 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column (5 Cols): 3D Sculpture + Clear Executive Pitch + Official Badges */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7">
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1323] to-[#05070d] p-5 sm:p-6 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14)_0%,transparent_70%)]" />
                <Suspense fallback={<div className="w-full h-44 sm:h-60" />}>
                  <AuthoritySculpture3D />
                </Suspense>
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                  <img
                    src={certLevel2}
                    width={96}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    alt="Certificação Oficial Q-SYS Level 2"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <img
                    src={certVision}
                    width={96}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    alt="Certificação Oficial Q-SYS VisionSuite"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <img
                    src={certSales}
                    width={96}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    alt="Certificação Oficial Q-SYS"
                    className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <div>
                <span className="edu-eyebrow mb-3 sm:mb-4">Por Que Confiar na Sonus</span>
                <h2 id="authority-title" className="edu-title text-2xl sm:text-4xl mb-3 sm:mb-4">
                  28 anos entregando projetos{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                    prontos para funcionar.
                  </span>
                </h2>
                <p className="edu-lead text-sm sm:text-base">
                  Cuidamos de tudo internamente — do desenho acústico à instalação nas férias e ao treinamento dos
                  professores — para sua instituição ter um único responsável do início ao fim.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 block">
                  Projetos Reais Executados &amp; Arquitetura Q-SYS
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/projetos/18"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:text-cyan-200 text-zinc-200 transition-colors"
                  >
                    Teatro UNISEP →
                  </Link>
                  <Link
                    to="/projetos/20"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:text-cyan-200 text-zinc-200 transition-colors"
                  >
                    Auditório Cesul →
                  </Link>
                  <Link
                    to="/projetos/22"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:text-cyan-200 text-zinc-200 transition-colors"
                  >
                    Auditório UNOESC →
                  </Link>
                  <Link
                    to="/projetos"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 text-cyan-200 transition-colors"
                  >
                    Ver Portfólio Completo
                  </Link>
                  <Link
                    to="/qsys"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 text-cyan-200 transition-colors"
                  >
                    Explorar Ecossistema Q-SYS
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column (7 Cols): 2x2 Clear Architectural Matrix */}
            <FadeIn delay={0.08} className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-0 sm:border-t sm:border-l sm:border-white/10">
                {AUTHORITY_PILLARS.map((pillar) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.num}
                      className="group relative p-5 sm:p-10 rounded-2xl sm:rounded-none border border-white/10 sm:border-0 sm:border-r sm:border-b bg-white/[0.02] sm:bg-transparent transition-colors duration-300 hover:bg-white/[0.025]"
                    >
                      <div className="flex items-center justify-between mb-3.5 sm:mb-6">
                        <span className="text-xs font-mono tracking-widest text-zinc-400 sm:text-zinc-500">{pillar.num}</span>
                        <Icon
                          className={`w-5 h-5 ${pillar.accent} transition-transform duration-300 group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 sm:mb-3">{pillar.title}</h3>
                      <p className="text-sm text-zinc-200 sm:text-zinc-300/90 font-normal sm:font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </section>

        <Suspense fallback={<div className="min-h-[160px]" />}>
          <WarrantyBanner
            variant="qsys"
            title="3 Anos de Garantia Integral no Seu Campus"
            description="Confiamos na durabilidade do ecossistema Q-SYS e na precisão da nossa instalação. Sua instituição conta com 3 anos de garantia completa para não ter surpresas durante o ano letivo."
          />
        </Suspense>

        {/* 6. DIAGNÓSTICO TÉCNICO — CONVITE CONSULTIVO + FORMULÁRIO */}
        <section
          id="contato"
          aria-labelledby="form-educacao-title"
          className="py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10 relative z-10 edu-hairline-top bg-[#030407]"
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.10)_0%,transparent_70%)]" />

          <div className="max-w-[1380px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-9 sm:gap-12 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5 space-y-6 sm:space-y-8 lg:pt-4">
              <div>
                <span className="edu-eyebrow mb-3 sm:mb-4">Diagnóstico Sem Compromisso</span>
                <h2 id="form-educacao-title" className="edu-title text-2xl sm:text-4xl xl:text-[2.9rem] mb-4 sm:mb-5">
                  Vamos planejar o novo padrão{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    das suas salas e auditórios?
                  </span>
                </h2>
                <p className="edu-lead text-sm sm:text-base">
                  Conte quantas salas ou blocos deseja modernizar. Nossos especialistas montam um plano sob medida para
                  a realidade e o calendário da sua instituição.
                </p>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {[
                  {
                    step: "01",
                    title: "Conversa de Alinhamento",
                    desc: "Entendemos o porte das turmas, os desafios atuais dos professores e as demandas da TI.",
                  },
                  {
                    step: "02",
                    title: "Proposta Técnica Clara",
                    desc: "Apresentamos a solução ideal para padronizar salas híbridas, auditórios ou avisos do campus.",
                  },
                  {
                    step: "03",
                    title: "Execução nas Férias Escolares",
                    desc: "Planejamos toda a entrega para acontecer no recesso, sem interromper um dia sequer de aula.",
                  },
                ].map((item) => (
                  <div key={item.step} className="py-4 sm:py-5 flex items-start gap-3.5 sm:gap-4">
                    <span className="text-xs font-mono text-cyan-400 pt-0.5">{item.step}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-zinc-300 sm:text-zinc-400 font-normal sm:font-light mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-300 sm:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Atendemos universidades, faculdades, escolas e redes de ensino em todo o Brasil e LATAM.</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} className="lg:col-span-7 w-full">
              <SpotlightCard className="rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-10 md:p-12 border border-white/12 bg-[#080b14]/95 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
                <form
                  className="space-y-6"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
                        Seu Nome
                      </label>
                      <Input
                        id="name"
                        required
                        placeholder="Ex: Prof. Carlos Mendes"
                        value={formData.name}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("name", "educacao")
                        }}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="institution" className="text-xs font-semibold text-zinc-300">
                        Instituição de Ensino
                      </label>
                      <Input
                        id="institution"
                        required
                        placeholder="Universidade, Faculdade ou Colégio"
                        value={formData.institution}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("institution", "educacao")
                        }}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
                        E-mail Institucional
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="nome@instituicao.edu.br"
                        value={formData.email}
                        onInvalid={(e) =>
                          (e.target as HTMLInputElement).setCustomValidity("Digite um endereço de e-mail válido")
                        }
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") trackFormStart("email", "educacao")
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
                          if (e.target.value.trim() !== "") trackFormStart("phone", "educacao")
                        }}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputFieldClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-300">
                      Como podemos ajudar sua instituição?
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Conte brevemente quantas salas híbridas, auditórios ou prédios gostaria de avaliar e para qual período planeja a melhoria..."
                      value={formData.message}
                      onBlur={(e) => {
                        if (e.target.value.trim() !== "") trackFormStart("message", "educacao")
                      }}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/[0.03] border-white/10 hover:border-white/25 focus-visible:border-cyan-400/55 focus-visible:ring-2 focus-visible:ring-cyan-400/20 transition-[border-color,box-shadow] duration-200 min-h-[144px] resize-none text-white placeholder:text-zinc-500 p-4 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-center pt-1 min-h-[65px]">
                    <Turnstile
                      siteKey={getTurnstileSiteKey()}
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
                      options={TURNSTILE_OPTIONS}
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
                      className="w-full h-auto min-h-14 py-3 whitespace-normal text-center leading-tight text-sm sm:text-lg font-bold rounded-full bg-white text-slate-950 hover:bg-cyan-50 shadow-[0_18px_50px_-12px_rgba(34,211,238,0.4)] transition-transform duration-300 hover:scale-[1.01]"
                    >
                      {isSubmitting ? "Enviando Solicitação..." : "Agendar Diagnóstico da Instituição"}
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
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AeoFaq
          faqs={educationFaqs}
          title="Dúvidas Comuns de Gestores e Equipes de TI"
          subtitle="Respostas Diretas"
        />
        <TestimonialSection
          title="Quem já modernizou suas salas recomenda."
          subtitle="Relatos reais de gestores acadêmicos e líderes de TI que padronizaram seus espaços com a Sonus."
          testimonials={educationTestimonials}
        />
        <LPFooter />
        <WhatsAppButton message="Olá! Gostaria de agendar um diagnóstico audiovisual para nossa instituição de ensino." />
        <StickyCtaBar
          buttonText="Diagnóstico Campus"
          messageText="Olá! Gostaria de conversar com um especialista da Sonus sobre salas híbridas e auditórios para Educação."
        />
      </Suspense>
    </div>
  )
}
