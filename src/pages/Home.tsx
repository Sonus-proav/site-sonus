import { useState, useEffect, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { motion,  } from "framer-motion"
import { ArrowRight, CheckCircle2,  } from "lucide-react"

import { trackLeadConversion } from "@/lib/metaPixel"
import { logLead } from "@/lib/analytics"
import { SEO } from "../components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { HeroVisual } from "@/components/ui/HeroVisual"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Turnstile } from '@marsidev/react-turnstile'

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))
const SocialProofBar = lazy(() => import("@/components/ui/SocialProofBar").then(m => ({ default: m.SocialProofBar })))
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(m => ({ default: m.TestimonialSection })))

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
    <div className="flex flex-col min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      <Helmet>
        <title>Sonus Pro AV | A Fundação de Ambientes Críticos</title>
      </Helmet>
      <SEO 
        title="Sonus Pro AV | Integração Audiovisual de Alto Padrão" 
        description="A tecnologia desaparece. A conexão importa. Engenharia audiovisual de precisão para Salas Corporativas, Plenários e Auditórios." 
        url="https://sonusproaudio.com.br"
      />

      <Navbar />

      {/* VIBRANT HIGH-TECH HERO */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
        {/* Vibrant Gradient Orbs (Controlled, not overpowering) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />

        <div className="container px-4 md:px-8 xl:px-16 relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Inteligência Audiovisual Aplicada</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1] text-white drop-shadow-2xl"
              >
                Engenharia <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Invisível.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 text-lg md:text-xl text-zinc-300 font-light max-w-xl leading-relaxed"
              >
                Projetos acústicos e eletrônicos de alta performance para <span className="font-semibold text-white">Salas Corporativas, Plenários e Auditórios</span>. Quando a conexão é crítica, a tecnologia deve desaparecer.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
              >
                <Link to="/solucoes" className="group relative inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1">
                  Explorar Ecossistema
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/5546920013151" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1">
                  Falar com Engenharia
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
               <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS E CLIENTES (SOCIAL PROOF) */}
      <section className="py-16 border-b border-white/10 bg-zinc-950/50 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Certificações de Alta Performance</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
              <img src="/logo-shure.svg" alt="Shure" className="h-6 object-contain" />
              <img src="/logo-qsc.svg" alt="QSC" className="h-8 object-contain" />
              <img src="/logo-sennheiser.svg" alt="Sennheiser" className="h-6 object-contain" />
            </div>
          </div>
        </div>
      </section>

            {/* APPLE-STYLE BESPOKE BENTO GRID */}
      <section className="py-32 px-4 md:px-8 xl:px-16 bg-[#050505] relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Engenharia <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Aplicada.</span>
            </h2>
            <p className="text-zinc-400 mt-4 text-xl max-w-2xl font-light">
              Nenhuma sala é igual à outra. Nossa arquitetura se adapta à geometria exata do seu desafio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[auto]">
            
            {/* CARD 1: AUDITÓRIOS (Col-7, Row-1) */}
            <Link to="/auditorios-e-teatros" className="md:col-span-7 h-[400px] group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl flex flex-col justify-end">
              <img src="/auditorio-sonus.webp" alt="Auditórios" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90" />
              
              <div className="relative z-10 p-10 md:p-12">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Auditórios e Teatros</h3>
                <p className="text-lg text-zinc-300 font-light max-w-md">Engenharia acústica projetada para a geometria do espetáculo.</p>
              </div>
            </Link>

            {/* CARD 2: Q-SYS (Col-5, Row-1) */}
            <Link to="/qsys" className="md:col-span-5 h-[400px] group relative rounded-[2.5rem] overflow-hidden border border-blue-500/20 bg-[#0B1528] shadow-[0_0_40px_rgba(37,99,235,0.1)] flex flex-col justify-between p-10 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3)_0%,transparent_60%)]" />
              <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  O Cérebro da Operação
                </div>
                <img src="/logo-qsc.svg" alt="QSC" className="h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-black tracking-tighter text-white mb-2">Plataforma <span className="text-blue-400">Q-SYS</span></h3>
                <p className="text-zinc-400 font-light text-lg">Áudio, vídeo e controle unificados na rede.</p>
              </div>
            </Link>

            {/* CARD 3: SALAS CORPORATIVAS (Col-4, Row-2) */}
            <Link to="/salas-reuniao" className="md:col-span-4 h-[350px] group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-xl p-10 flex flex-col justify-between">
              <img src="/sobre-sonus.webp" alt="Salas Corporativas" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
              
              {/* Glass UI Element mimicking touch panel */}
              <div className="relative z-10 self-end w-24 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center gap-3 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="w-6 h-1 rounded-full bg-cyan-400/50" />
                <div className="w-6 h-1 rounded-full bg-white/20" />
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-bold text-white mb-2">Salas Corporativas</h3>
                <p className="text-zinc-400 font-light text-sm">Videoconferência nativa e automação invisível.</p>
              </div>
            </Link>

            {/* CARD 4: PLENÁRIOS (Col-4, Row-2) */}
            <Link to="/plenarios-e-camaras" className="md:col-span-4 h-[350px] group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-black shadow-xl p-10 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.05)_0%,transparent_80%)] group-hover:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15)_0%,transparent_80%)] transition-colors duration-700" />
              
              <div className="relative z-10 w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(245,158,11,0.1)] text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Plenários e Câmaras</h3>
                <p className="text-zinc-400 font-light text-sm">Votação digital e captação irretocável para o legislativo.</p>
              </div>
            </Link>

            {/* CARD 5: IGREJAS (Col-4, Row-2) */}
            <Link to="/igrejas-e-templos" className="md:col-span-4 h-[350px] group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-xl p-10 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.1)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.2)_0%,transparent_70%)] transition-colors duration-700" />
              
              <div className="relative z-10 flex items-center gap-1.5 h-12 opacity-50 group-hover:opacity-100 transition-opacity">
                {[10, 25, 40, 20, 35, 15].map((h, i) => (
                  <div key={i} className="w-1.5 bg-purple-400 rounded-full" style={{ height: `${h}px` }} />
                ))}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Igrejas e Templos</h3>
                <p className="text-zinc-400 font-light text-sm">Acústica controlada para atingir todos os fiéis.</p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* METRICS / SOCIAL PROOF */}
      <section className="py-20 bg-zinc-950 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]" />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <SocialProofBar />
          </Suspense>
        </div>
      </section>

      {/* ABOUT (NOSSA HISTÓRIA) */}
      <section className="relative py-32 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden border border-white/10 group">
              <img src="/sobre-sonus.webp" alt="Projetos Sonus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/50 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 p-6 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center gap-6">
                <div>
                  <span className="block text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">+28</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Anos de Mercado</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                A Garantia da Experiência
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.1]">
                Nós construímos a base para que você opere no topo.
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Nenhuma empresa se mantém líder em integração audiovisual de alta complexidade por quase três décadas por acaso. A Sonus nasceu da necessidade de acabar com o amadorismo técnico no Sul do Brasil.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Projetos Customizados (Acústica e Eletrônica)",
                  "Garantia Estendida e SLA Blindado",
                  "Equipe Própria de Engenharia"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-200">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Suspense fallback={null}>
        <TestimonialSection />
      </Suspense>

      {/* CONTACT FORM */}
      <section className="py-32 px-4 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">Pronto para blindar seu espaço?</h2>
            <p className="text-lg text-zinc-400 font-light">Fale com nossa engenharia e agende uma consultoria técnica.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Nome Completo</label>
                <Input required placeholder="Ex: João Silva" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Telefone / WhatsApp</label>
                <Input required type="tel" placeholder="(00) 00000-0000" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">E-mail Profissional</label>
              <Input required type="email" placeholder="joao@empresa.com.br" className="bg-black/50 border-white/10 h-14 text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Detalhes do Projeto</label>
              <Textarea required placeholder="Descreva brevemente o que você precisa..." className="bg-black/50 border-white/10 min-h-[120px] text-white focus-visible:ring-1 focus-visible:ring-cyan-500 rounded-xl resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <div className="pt-2">
              <Turnstile siteKey="0x4AAAAAAAi9yYc7R3V1N1YF" onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />
            </div>

            {submitError && <div className="text-red-400 text-sm font-medium p-4 bg-red-400/10 border border-red-400/20 rounded-xl">{submitError}</div>}

            <Button type="submit" disabled={isSubmitting} className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              {isSubmitting ? "Enviando..." : "Solicitar Consultoria Técnica"}
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
