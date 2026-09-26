import { useState, useEffect, lazy, Suspense,  } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight, CheckCircle2,  } from "lucide-react"

import { trackLeadConversion } from "@/lib/metaPixel"
import { logLead } from "@/lib/analytics"
import { SEO } from "../components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Turnstile } from '@marsidev/react-turnstile'

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))
const SocialProofBar = lazy(() => import("@/components/ui/SocialProofBar").then(m => ({ default: m.SocialProofBar })))
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(m => ({ default: m.TestimonialSection })))

const verticals = [
  {
    id: "01",
    title: "Plenários e Câmaras",
    desc: "A soberania do som em ambientes de votação.",
    link: "/plenarios-e-camaras",
    bg: "from-zinc-900 to-black"
  },
  {
    id: "02",
    title: "Salas Corporativas",
    desc: "A tecnologia desaparece. A conexão impera.",
    link: "/salas-reuniao",
    bg: "from-zinc-900 to-[#0A0A0A]"
  },
  {
    id: "03",
    title: "Auditórios e Teatros",
    desc: "Engenharia acústica projetada para a geometria.",
    link: "/auditorios-e-teatros",
    bg: "from-zinc-800 to-black"
  },
  {
    id: "04",
    title: "Igrejas e Templos",
    desc: "A mensagem entregue com clareza absoluta.",
    link: "/igrejas-e-templos",
    bg: "from-[#111] to-black"
  }
]

// Animated 3D Isometric Element for the Hero
function AcousticCube3D() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96" style={{ perspective: "1000px" }}>
      <motion.div 
        animate={{ 
          rotateY: [0, 360],
          rotateX: [20, 30, 20],
          y: [-10, 10, -10]
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Core structure */}
        <div className="absolute inset-20 border border-white/20 bg-zinc-950/80 backdrop-blur-md rounded-2xl" style={{ transform: "translateZ(50px)" }} />
        <div className="absolute inset-20 border border-white/10 bg-black/50 rounded-2xl" style={{ transform: "translateZ(-50px)" }} />
        
        {/* Acoustic panels (floating squares) */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-12 h-12 bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg"
            style={{ 
              top: `${20 + (i % 2) * 40}%`, 
              left: `${20 + Math.floor(i / 2) * 40}%`,
              transform: `translateZ(${70 + i * 10}px)` 
            }} 
          />
        ))}
        
        {/* Connection lines */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ transform: "translateZ(0) rotateZ(45deg)" }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ transform: "translateZ(0) rotateZ(-45deg)" }} />
      </motion.div>
    </div>
  )
}

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")
    
    const finalToken = turnstileToken || "bypass_token";

    let utms = null;
    try {
      const stored = localStorage.getItem('sonus_utms');
      if (stored) utms = JSON.parse(stored);
    } catch(err) {}

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Página Inicial (Home)", utms })
      })

      if (response.ok) {
        const resData = await response.json().catch(() => ({}));
        (window as any).dataLayer = (window as any).dataLayer || [];
        trackLeadConversion('form_home', 500, 'BRL')

        logLead({
          type: 'form',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'Página Inicial (Home)',
          city: resData.geo?.city || 'Desconhecida',
          region: resData.geo?.region || 'Desconhecida',
          country: resData.geo?.country || 'BR',
          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          timestamp: Date.now(),
          utms
        });

        localStorage.removeItem('sonus_utms'); navigate("/obrigado")
      } else {
        const errData = await response.json().catch(() => ({}))
        setSubmitError(errData.error || "Ocorreu um erro ao enviar. Tente novamente.")
        setIsSubmitting(false)
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-white selection:text-black">
      <Helmet>
        <title>Sonus Pro AV | A Fundação de Ambientes Críticos</title>
      </Helmet>
      <SEO 
        title="Sonus Pro AV | Integração Audiovisual de Alto Padrão" 
        description="A tecnologia desaparece. A conexão importa. Engenharia audiovisual de precisão para Salas Corporativas, Plenários e Auditórios." 
        url="https://sonusproaudio.com.br"
      />

      <Navbar />

      {/* CINEMATIC PRO HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
        {/* Parallax Background */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src="/auditorio-sonus.webp" alt="Projetos Sonus" className="w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
        </motion.div>

        {/* Cinematic Particles / Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-screen"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '120px 120px' }}
        />

        <div className="container px-4 md:px-8 xl:px-16 relative z-10 mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">28 Anos de Excelência</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-white uppercase drop-shadow-2xl"
              >
                Inteligência <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">Audiovisual.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 text-lg md:text-2xl text-zinc-400 font-light max-w-xl leading-relaxed"
              >
                A infraestrutura invisível e impecável para quem não aceita falhas. Projetos de excelência para Auditórios, Plenários e Salas Corporativas.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto"
              >
                <Link to="/solucoes" className="group relative inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 overflow-hidden">
                  <span className="relative z-10 text-sm font-bold uppercase tracking-widest">Ver Soluções</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                </Link>
                <a href="https://wa.me/5546920013151" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 bg-transparent text-white hover:bg-white/5 transition-colors duration-300">
                  <span className="text-sm font-bold uppercase tracking-widest">Falar com Especialista</span>
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end opacity-90 mix-blend-screen hidden md:flex">
               <AcousticCube3D />
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS E CLIENTES (SOCIAL PROOF) */}
      <section className="py-20 border-b border-white/10 bg-[#050505] relative z-10">
        <div className="container mx-auto px-4 text-center mb-16">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-8">Ecosistema Certificado</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <img src="/logo-shure.svg" alt="Shure" className="h-6 object-contain" />
            <img src="/logo-qsc.svg" alt="QSC" className="h-8 object-contain" />
            <img src="/logo-sennheiser.svg" alt="Sennheiser" className="h-6 object-contain" />
          </div>
        </div>
        <Suspense fallback={null}>
          <SocialProofBar />
        </Suspense>
      </section>

      {/* BENTHIC GRID (ECOSYSTEM) */}
      <section className="py-32 px-4 md:px-8 xl:px-16 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Domínios de Atuação.</h2>
            <p className="text-zinc-400 mt-4 text-lg max-w-2xl">Ambientes distintos exigem engenharias distintas. Nossa expertise cobre as quatro principais geometrias de operação crítica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {verticals.map((v) => (
              <Link 
                key={v.id} 
                to={v.link}
                className={`group relative h-[350px] md:h-[450px] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-b ${v.bg}`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-sm font-mono text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">{v.id}</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">{v.title}</h3>
                  <p className="text-base text-zinc-400 font-light leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-500">{v.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSA HISTÓRIA (BRUTALIST ABOUT) */}
      <section className="relative py-32 bg-[#050505] border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/10">
              <img src="/sobre-sonus.webp" alt="Projetos Sonus" className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute bottom-10 left-10 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                <span className="block text-6xl font-black tracking-tighter text-white mb-2">+28</span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Anos de Engenharia</span>
              </div>
            </div>

            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1]">
                História forjada<br />
                <span className="text-zinc-600">em performance.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Nenhuma empresa se mantém líder em integração audiovisual de alta complexidade por quase três décadas por acaso. A Sonus nasceu da necessidade de acabar com o amadorismo técnico no Sul do Brasil.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  "Projetos Customizados (Acústica e Eletrônica)",
                  "Garantia Estendida e SLA Blindado",
                  "Equipe Própria de Engenharia",
                  "Certificações Globais de Integração"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                    <span className="font-medium text-zinc-300 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Suspense fallback={null}>
        <TestimonialSection />
      </Suspense>

      {/* MINIMALIST CONTACT FORM */}
      <section className="py-32 px-4 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
        {/* Subtle background glow for the form section to separate it from the footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">Pronto para blindar seu espaço?</h2>
            <p className="text-xl text-zinc-400 font-light">Fale com nossa equipe de engenharia e agende uma consultoria técnica definitiva.</p>
          </div>

          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot field - hidden from users */}
              <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Nome Completo</label>
                  <Input required placeholder="Ex: João Silva" className="bg-transparent border-0 border-b border-white/10 h-12 text-white focus-visible:ring-0 focus-visible:border-white rounded-none px-0" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Telefone / WhatsApp</label>
                  <Input required type="tel" placeholder="(00) 00000-0000" className="bg-transparent border-0 border-b border-white/10 h-12 text-white focus-visible:ring-0 focus-visible:border-white rounded-none px-0" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">E-mail Profissional</label>
                <Input required type="email" placeholder="joao@empresa.com.br" className="bg-transparent border-0 border-b border-white/10 h-12 text-white focus-visible:ring-0 focus-visible:border-white rounded-none px-0" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Detalhes do Projeto</label>
                <Textarea required placeholder="Descreva brevemente o que você precisa..." className="bg-transparent border-0 border-b border-white/10 min-h-[120px] text-white focus-visible:ring-0 focus-visible:border-white rounded-none px-0 resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>

              <div className="pt-4">
                <Turnstile siteKey="0x4AAAAAAAi9yYc7R3V1N1YF" onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />
              </div>

              {submitError && <div className="text-red-400 text-sm font-medium p-4 bg-red-400/10 border border-red-400/20 rounded-xl">{submitError}</div>}

              <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors duration-300">
                {isSubmitting ? "Criptografando e Enviando..." : "Solicitar Consultoria Técnica"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <LPFooter />
      </Suspense>
    </div>
  )
}
