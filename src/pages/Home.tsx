import { useState, useEffect, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react"

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
    link: "/plenarios-e-camaras"
  },
  {
    id: "02",
    title: "Salas Corporativas",
    desc: "A tecnologia desaparece. A conexão impera.",
    link: "/salas-reuniao"
  },
  {
    id: "03",
    title: "Auditórios e Teatros",
    desc: "Engenharia acústica projetada para a geometria.",
    link: "/auditorios-e-teatros"
  },
  {
    id: "04",
    title: "Igrejas e Templos",
    desc: "A mensagem entregue com clareza absoluta.",
    link: "/igrejas-e-templos"
  }
]

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  
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

      {/* 
        BRUTALIST / MINIMALIST HERO
      */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 xl:px-16 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8 md:mb-12"
          >
            <div className="w-2 h-2 bg-white" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">28 Anos de Tradição e Inovação</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white uppercase"
          >
            Engenharia <br/>
            <span className="text-zinc-600">Invisível.</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full mt-12 md:mt-24 gap-8">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-2xl text-zinc-400 font-light max-w-xl leading-relaxed"
            >
              A tecnologia desaparece. Apenas a conexão importa. Construímos a fundação audiovisual de ambientes onde falhas não são toleradas.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/solucoes" className="group relative inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-5 md:px-10 md:py-6 overflow-hidden">
                <span className="relative z-10 text-sm font-bold uppercase tracking-widest">Descobrir Soluções</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIMENSIONS BENTHIC GRID */}
      <section className="relative w-full border-t border-white/10 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-white/10">
          {verticals.map((v) => (
            <Link 
              key={v.id} 
              to={v.link}
              className="group relative h-[300px] md:h-[400px] p-8 md:p-10 flex flex-col justify-between border-r border-b border-white/10 bg-[#050505] hover:bg-zinc-900 transition-colors duration-500"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-zinc-500">{v.id}</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">{v.title}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARCAS E CLIENTES (SOCIAL PROOF) */}
      <section className="py-24 border-b border-white/10 bg-[#050505]">
        <div className="container mx-auto px-4 text-center mb-16">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-8">Tecnologia de Classe Mundial</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/logo-shure.svg" alt="Shure" className="h-6 object-contain" />
            <img src="/logo-qsc.svg" alt="QSC" className="h-8 object-contain" />
            <img src="/logo-sennheiser.svg" alt="Sennheiser" className="h-6 object-contain" />
          </div>
        </div>
        <Suspense fallback={null}>
          <SocialProofBar />
        </Suspense>
      </section>

      {/* TESTIMONIALS */}
      <Suspense fallback={null}>
        <TestimonialSection />
      </Suspense>

      {/* NOSSA HISTÓRIA (BRUTALIST ABOUT) */}
      <section className="relative py-32 bg-[#050505] border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] md:h-[600px] w-full bg-zinc-900 overflow-hidden">
              <img src="/auditorio-sonus.webp" alt="Projetos Sonus" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 bg-white text-black p-6">
                <span className="block text-5xl font-black tracking-tighter leading-none mb-1">+28</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Anos de Mercado</span>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
                Nossa História,<br />
                <span className="text-zinc-600">Sua Segurança.</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Nenhuma empresa se mantém líder em integração audiovisual de alta complexidade por quase três décadas por acaso. A Sonus nasceu da necessidade de acabar com o amadorismo técnico no Sul do Brasil.
              </p>
              <ul className="space-y-4">
                {[
                  "Projetos Customizados (Acústica e Eletrônica)",
                  "Garantia Estendida e SLA Blindado",
                  "Equipe Própria de Engenharia"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST CONTACT FORM */}
      <section className="py-32 px-4 bg-zinc-950 border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">Pronto para blindar seu espaço?</h2>
            <p className="text-zinc-400">Fale com nossa equipe de engenharia e agende uma consultoria técnica.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field - hidden from users */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Nome Completo</label>
                <Input required placeholder="Ex: João Silva" className="bg-transparent border-white/10 h-12 text-white focus-visible:ring-1 focus-visible:ring-white rounded-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Telefone / WhatsApp</label>
                <Input required type="tel" placeholder="(00) 00000-0000" className="bg-transparent border-white/10 h-12 text-white focus-visible:ring-1 focus-visible:ring-white rounded-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">E-mail Profissional</label>
              <Input required type="email" placeholder="joao@empresa.com.br" className="bg-transparent border-white/10 h-12 text-white focus-visible:ring-1 focus-visible:ring-white rounded-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Detalhes do Projeto</label>
              <Textarea required placeholder="Descreva brevemente o que você precisa..." className="bg-transparent border-white/10 min-h-[120px] text-white focus-visible:ring-1 focus-visible:ring-white rounded-none resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <Turnstile siteKey="0x4AAAAAAAi9yYc7R3V1N1YF" onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />

            {submitError && <div className="text-red-400 text-sm font-medium p-3 bg-red-400/10 border border-red-400/20">{submitError}</div>}

            <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-none font-bold uppercase tracking-widest text-sm transition-colors duration-300">
              {isSubmitting ? "Enviando..." : "Solicitar Contato Especializado"}
            </Button>
          </form>
        </div>
      </section>

      <Suspense fallback={null}>
        <LPFooter />
      </Suspense>
    </div>
  )
}
