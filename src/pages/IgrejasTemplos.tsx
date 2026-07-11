import React, { useState, useEffect, useRef, Suspense } from "react"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { LPFooter } from "@/components/layout/LPFooter"
import { TestimonialSection } from "@/components/ui/TestimonialSection"
import { StickyCtaBar } from "@/components/ui/StickyCtaBar"
import { WarrantyBanner } from "@/components/layout/WarrantyBanner"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LazyMount } from "@/components/ui/LazyMount"
import { Turnstile } from '@marsidev/react-turnstile'
import { Link, useLocation } from "react-router-dom"
import { getProjects, type Project } from "@/lib/publicStorage"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  VolumeX, 
  Settings2, 
  Video,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Church,
  MicOff,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// --- Sound Wave Animation Component ---
function SoundWaves() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-20">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-amber-500/40 w-10 h-10 animate-gpu-soundwave"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <div className="w-3 h-3 rounded-full bg-amber-500 relative z-10 shadow-[0_0_40px_10px_rgba(245,158,11,0.4)]" />
    </div>
  )
}

const CoverageHeatmap = React.lazy(() => import('@/components/CoverageHeatmap'))


export function IgrejasTemplos() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    honeypot: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  // Parallax ref
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    getProjects().then(data => {
      const igrejas = data.filter(p => !p.isHidden && p.category.toLowerCase().includes("igrejas"))
      setProjects(igrejas)
    }).catch(err => console.error("Erro ao carregar projetos de igrejas", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")
    
    const finalToken = turnstileToken || "bypass_token";

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Igrejas e Templos" })
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          honeypot: ""
        })
      } else {
        const errorData = await response.json().catch(() => null)
        setSubmitError(errorData?.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente.")
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Por favor, verifique sua internet e tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com um especialista sobre o som da minha Igreja.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  const fallbackPortfolio: any[] = [
    {
      title: "Matriz de Xanxerê",
      state: "SC",
      image: "/interior-matriz-xanxere.webp",
      description: "Projeto completo de sonorização focado na inteligibilidade da palavra falada, respeitando a arquitetura histórica do templo e proporcionando cobertura sonora uniforme para todos os fiéis."
    },
    {
      title: "Matriz de Concórdia",
      state: "SC",
      image: "/concordia.webp",
      description: "Modernização do sistema de áudio com alinhamento acústico para reduzir a reverberação natural (eco), garantindo clareza absoluta desde a primeira até a última fileira de bancos."
    },
    {
      title: "Matriz de Pato Branco",
      state: "PR",
      image: "/pato-branco.webp",
      description: "Implementação de tecnologia de processamento digital, eliminando microfonias indesejadas e facilitando o controle diário do áudio para a equipe de voluntários durante os cultos e louvores."
    }
  ]

  const displayPortfolio = projects.length > 0 ? projects : fallbackPortfolio

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  const igrejaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Projetos Acústicos para Templos e Sonorização Profissional",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sonus Pro Audio e Video"
    },
    "areaServed": ["Paraná", "Santa Catarina", "Rio Grande do Sul", "Brasil"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Equipamentos de Autoridade",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sistemas Q-SYS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Microfones Shure"
          }
        }
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      <SEO 
        title="Sonorização para Igrejas e Templos | Sonus Pro AV" 
        description="A mensagem de fé precisa ser ouvida com clareza. Soluções audiovisuais premium para igrejas, com foco em inteligibilidade e operação simplificada para voluntários." 
        image="/interior-matriz-xanxere.webp"
        url="https://sonusproaudio.com.br/igrejas-e-templos"
        keywords="sonorização para igrejas, som para templo religioso, projeto acústico igreja matriz, resolver eco na igreja, sistema de som para louvor, automação Q-SYS igreja, sonorização templo, projeto de som igreja"
        schema={igrejaSchema}
      />

      <Navbar />

      <main className="flex-1 relative z-10">

        {/* ══════════════════════════════════════════════ */}
        {/* HERO — Sound Waves Emanating from Center      */}
        {/* ══════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <SoundWaves />
          
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }} 
            className="relative z-10 max-w-5xl mx-auto text-center space-y-10"
          >
            <Reveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] md:leading-[0.9]">
                <span className="text-white">ONDE CADA</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                  PALAVRA IMPORTA
                </span>
              </h1>
            </Reveal>
            
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                O fim das microfonias, do som embolado e da complexidade.
                Entregamos excelência acústica com <strong className="text-white font-medium">controle simplificado</strong> para que seus voluntários operem sem medo.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Magnetic>
                  <Button 
                    onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                    size="lg" 
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-[0_0_60px_-10px_rgba(245,158,11,0.5)] transition-all hover:shadow-[0_0_80px_-10px_rgba(245,158,11,0.7)] h-auto"
                  >
                    Agendar Consultoria
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Magnetic>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-medium border-white/10 hover:bg-white/5 h-auto"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </FadeIn>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                <div className="w-1 h-2 bg-amber-500 rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* BEFORE/AFTER — Visual Sound Comparison        */}
        {/* ══════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                Você <span className="text-red-500 line-through decoration-2 opacity-60">ouve</span>{" "}
                <span className="text-amber-500">sente</span> a diferença
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* BEFORE */}
              <FadeIn className="relative h-full">
                <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center shadow-lg shadow-red-900/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 font-mono text-sm uppercase tracking-widest">Sem tratamento</span>
                  </div>
                  
                  {/* Distorted wave visualization */}
                  <div className="flex items-end gap-[3px] h-24 mb-10">
                    {[45, 82, 34, 91, 55, 10, 76, 23, 88, 42, 15, 67, 95, 31, 73, 50, 28, 84, 61, 19, 97, 38, 71, 44, 89, 12, 65, 58, 25, 79, 36, 92].map((h, i) => (
                      <div key={i} className="flex-1 bg-red-500/30 rounded-full" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <VolumeX className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                      <p className="text-zinc-400 text-sm leading-relaxed">Reverberação excessiva que embolha a palavra do pregador</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MicOff className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                      <p className="text-zinc-400 text-sm leading-relaxed">Microfonias inesperadas que quebram o clima espiritual</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <SlidersHorizontal className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                      <p className="text-zinc-400 text-sm leading-relaxed">Mesa de som complexa que intimida os voluntários</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* AFTER */}
              <FadeIn delay={0.2} className="relative h-full">
                <div className="bg-amber-950/10 border border-amber-500/20 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center shadow-lg shadow-amber-900/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                    <span className="text-amber-400 font-mono text-sm uppercase tracking-widest">Com Sonus Pro AV</span>
                  </div>
                  
                  {/* Clean wave visualization */}
                  <div className="flex items-end gap-[3px] h-24 mb-10">
                    {[...Array(32)].map((_, i) => {
                      const h = 30 + Math.sin(i * 0.4) * 25 + Math.sin(i * 0.15) * 20
                      return (
                        <motion.div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.03, ease: "easeOut" }}
                        />
                      )
                    })}
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                      <p className="text-zinc-300 text-sm leading-relaxed">Inteligibilidade perfeita — <strong className="text-white">cada sílaba é cristalina</strong> do altar ao fundo</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                      <p className="text-zinc-300 text-sm leading-relaxed">Zero microfonias com processamento digital inteligente</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                      <p className="text-zinc-300 text-sm leading-relaxed">Touch panel simplificado: <strong className="text-white">1 botão = 1 cenário</strong></p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* SOLUTION — Coverage Heatmap + Copy            */}
        {/* ══════════════════════════════════════════════ */}
        <section className="py-20 md:py-32 px-4 relative overflow-hidden border-y border-white/5">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <FadeIn>
                <span className="text-amber-500 font-mono text-sm uppercase tracking-widest mb-6 block">Inteligência Acústica</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.05]">
                  Cobertura sonora de parede a parede
                </h2>
                <p className="text-xl text-zinc-400 mb-12 font-light leading-relaxed">
                  Projetamos o posicionamento, angulação e potência de cada caixa para que a mensagem chegue com a mesma clareza ao fiel do primeiro banco e ao da última fileira.
                </p>
                
                <div className="space-y-8">
                  {[
                    { icon: <Settings2 className="w-5 h-5" />, title: "Soluções na Medida Certa", desc: "De sistemas simples para voluntários até Q-SYS — a mesma tecnologia que sonoriza o Santuário Nacional de Aparecida." },
                    { icon: <Church className="w-5 h-5" />, title: "Arquitetura Respeitada", desc: "Caixas de som e projetos acústicos que não poluem o visual do altar nem escondem seus vitrais." },
                    { icon: <Video className="w-5 h-5" />, title: "Transmissão ao Vivo", desc: "Câmeras PTZ robóticas e áudio integrado para transmissões de cultos e missas com qualidade de TV." },
                  ].map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                      <div className="flex gap-4 group">
                        <div className="mt-1 bg-amber-500/10 p-3 rounded-xl h-fit border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                          <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3} className="relative">
                <LazyMount minHeight="400px">
                  <Suspense fallback={<div className="w-full aspect-[5/4] bg-zinc-900/50 animate-pulse rounded-2xl border border-white/5" />}>
                    <CoverageHeatmap />
                  </Suspense>
                </LazyMount>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════ */}
        {/* PORTFOLIO — Horizontal Full-Bleed Carousel    */}
        {/* ══════════════════════════════════════════════ */}
        <LazyMount minHeight="600px" margin="600px">
        <section className="py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 mb-12">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <span className="text-amber-500 font-mono text-sm uppercase tracking-widest mb-4 block">Portfólio Sagrado</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                    Templos que confiam<br className="hidden md:block" /> na nossa tecnologia
                  </h2>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => scrollCarousel("left")}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollCarousel("right")}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-12 lg:px-24 pb-8 no-scrollbar scroll-pl-4 md:scroll-pl-12 lg:scroll-pl-24"
            style={{ scrollbarWidth: "none" }}
          >
            {displayPortfolio.map((item, index) => (
              <div key={item.id || index} className="shrink-0 w-[90vw] md:w-[60vw] lg:w-[600px] snap-center md:snap-start">
                <div className="group relative rounded-[2rem] overflow-hidden aspect-video md:aspect-[16/10] bg-zinc-900 border border-white/5 isolation-isolate [transform:translateZ(0)]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 [transform:translateZ(0)]"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 1000'%3E%3Crect fill='%23111' width='800' height='1000'/%3E%3Ctext fill='%23555' x='50%25' y='50%25' font-family='sans-serif' font-size='24' text-anchor='middle' alignment-baseline='middle'%3EImagem a Caminho%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <FadeIn delay={0.3} className="mt-12 text-center px-4">
            <Link to="/projetos" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
              Ver Portfólio Completo <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </FadeIn>
        </section>

        {/* Warranty Banner */}
        <WarrantyBanner 
          variant="church"
          title="3 Anos de Garantia para o Seu Ministério"
          description="Sabemos da importância de cada investimento feito pela igreja. Por isso, entregamos 3 anos de garantia total sobre qualquer defeito de instalação. Infraestrutura segura para que a mensagem seja sempre transmitida com clareza."
        />

        {/* ══════════════════════════════════════════════ */}
        {/* CONTACT FORM — Unique Church Identity         */}
        {/* ══════════════════════════════════════════════ */}
        <section id="contato" className="py-20 md:py-32 px-4 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <div className="flex-1">
                  <span className="text-amber-500 font-mono text-sm uppercase tracking-widest mb-4 block">Consultoria</span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                    Pronto para elevar<br className="hidden md:block" /> a mensagem?
                  </h2>
                </div>
                <p className="text-zinc-400 md:max-w-xs text-sm leading-relaxed md:pb-1">
                  Preencha o formulário e nossa equipe entrará em contato para entender as necessidades do seu templo.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SpotlightCard className="rounded-[2rem] p-6 md:p-10 border border-white/10 bg-zinc-950/50">
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
                    <p className="text-zinc-400 mb-8">Nossa equipe de especialistas entrará em contato em breve para entender as necessidades da sua igreja.</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
                      Enviar nova solicitação
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Honeypot Invisível */}
                    <div className="hidden" aria-hidden="true">
                      <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
                        <Input 
                          id="name" 
                          required 
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/5 border-white/10 focus-visible:ring-amber-500 h-14 rounded-xl text-white placeholder:text-zinc-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                        <Input 
                          id="phone" 
                          required 
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/5 border-white/10 focus-visible:ring-amber-500 h-14 rounded-xl text-white placeholder:text-zinc-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail</label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white/5 border-white/10 focus-visible:ring-amber-500 h-14 rounded-xl text-white placeholder:text-zinc-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-zinc-300">Descrição do Problema Atual</label>
                      <Textarea 
                        id="message" 
                        required 
                        placeholder="Conte sobre sua igreja (Ex: Matriz com 500 lugares) e o problema atual..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-white/5 border-white/10 focus-visible:ring-amber-500 min-h-[140px] rounded-xl resize-none text-white placeholder:text-zinc-500 p-4"
                      />
                    </div>

                    <div className="flex justify-center pt-2 min-h-[65px]">
                      <Turnstile 
                        siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                        onSuccess={(token) => {
                          setSubmitError("");
                          setTurnstileToken(token);
                        }}
                        onError={() => setSubmitError("Erro ao carregar o sistema de segurança. Verifique se o domínio está liberado no Cloudflare ou desative seu Adblocker.")}
                        onExpire={() => setTurnstileToken("")}
                        options={{ theme: 'auto' }} 
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
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white h-14 rounded-xl text-lg font-medium shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] transition-all hover:shadow-[0_0_50px_-5px_rgba(245,158,11,0.6)]"
                      >
                        {isSubmitting ? "Enviando Solicitação..." : "Falar com um Especialista de Som"}
                      </Button>
                    </Magnetic>
                  </form>
                )}
              </SpotlightCard>
            </FadeIn>
          </div>
        </section>
        </LazyMount>

      </main>

      <TestimonialSection />
      <LPFooter />
      <WhatsAppButton />
      <StickyCtaBar />
    </div>
  )
}
