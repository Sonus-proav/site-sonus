import { useState, useRef, useEffect } from "react"
import { Helmet } from "react-helmet-async"
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
import { Turnstile } from '@marsidev/react-turnstile'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Settings2, 
  Mic2, 
  ArrowRight,
  CheckCircle2,
  Video,
  Lightbulb,
  SlidersHorizontal,
  VolumeX,
  Wrench,
  EyeOff
} from "lucide-react"

// --- Interactive iPad Mockup ---
function InteractivePanelMockup() {
  const [activeScene, setActiveScene] = useState<"palestra" | "cinema" | "off">("palestra")
  
  const sceneConfigs = {
    palestra: { volume: 75, mics: true, projector: false, lights: "50%", lightsColor: "text-yellow-400" },
    cinema: { volume: 90, mics: false, projector: true, lights: "10%", lightsColor: "text-yellow-600" },
    off: { volume: 0, mics: false, projector: false, lights: "100%", lightsColor: "text-yellow-300" },
  }
  
  const config = sceneConfigs[activeScene]

  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#080808] border border-white/5 shadow-[0_0_80px_rgba(41,128,185,0.08)] flex items-center justify-center p-4 sm:p-8 group">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(41,128,185,0.4)_0,transparent_100%)]" />
      
      {/* iPad Frame */}
      <div className="w-full max-w-lg aspect-auto sm:aspect-[16/10] min-h-[300px] bg-zinc-950 border-[6px] border-zinc-800/80 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10 relative">
        
        {/* Status Bar */}
        <div className="h-6 sm:h-8 bg-zinc-900 flex items-center justify-between px-4 border-b border-zinc-800">
          <span className="text-[8px] sm:text-[10px] font-bold text-zinc-400 tracking-widest flex items-center gap-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Q-SYS SYSTEM ACTIVE
          </span>
          <span className="text-[8px] sm:text-[10px] font-medium text-zinc-500">14:50</span>
        </div>

        {/* Interface */}
        <div className="flex-1 p-3 sm:p-5 flex gap-3 sm:gap-5 bg-black relative">
           {/* Left Sidebar (Scenes) */}
           <div className="w-[35%] flex flex-col gap-2 sm:gap-3 z-10">
             {(["palestra", "cinema", "off"] as const).map((scene) => (
               <motion.div
                 key={scene}
                 onClick={() => {
                   setActiveScene(scene);
                   (window as any).dataLayer = (window as any).dataLayer || [];
                   (window as any).dataLayer.push({ event: 'interact_auditorio_simulator', scene_name: scene });
                 }}
                 className={`rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                   activeScene === scene 
                     ? 'bg-primary/20 border border-primary/30' 
                     : 'bg-white/5 border border-white/10 text-zinc-500 hover:bg-white/10'
                 }`}
                 whileTap={{ scale: 0.97 }}
               >
                 <span className={`text-[10px] sm:text-xs font-bold ${activeScene === scene ? 'text-white' : ''}`}>
                   {scene === "palestra" ? "Palestra" : scene === "cinema" ? "Cinema" : "Desligar Tudo"}
                 </span>
                 {activeScene === scene && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />}
               </motion.div>
             ))}
           </div>

           {/* Right Content (Controls) */}
           <div className="w-[65%] flex flex-col gap-2 sm:gap-4 z-10">
              {/* Master Volume */}
              <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] sm:text-xs font-semibold text-zinc-300 flex items-center gap-2">
                    <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" /> Master
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-primary">{config.volume}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 relative"
                    animate={{ width: `${config.volume}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                  </motion.div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
                <motion.div 
                  className={`rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 transition-all duration-300 ${
                    config.mics ? 'bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-white/5 border border-white/10'
                  }`}
                  animate={{ opacity: 1 }}
                >
                  <Mic2 className={`w-4 h-4 sm:w-5 sm:h-5 ${config.mics ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  <span className={`text-[8px] sm:text-[10px] font-bold ${config.mics ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    Mics {config.mics ? 'On' : 'Off'}
                  </span>
                </motion.div>
                <motion.div 
                  className={`rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 transition-all duration-300 ${
                    config.projector ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <Video className={`w-4 h-4 sm:w-5 sm:h-5 ${config.projector ? 'text-blue-400' : 'text-zinc-600'}`} />
                  <span className={`text-[8px] sm:text-[10px] font-medium ${config.projector ? 'text-blue-400' : 'text-zinc-600'}`}>
                    Projetor {config.projector ? 'On' : 'Off'}
                  </span>
                </motion.div>
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2">
                  <Lightbulb className={`w-4 h-4 sm:w-5 sm:h-5 ${config.lightsColor}`} />
                  <span className="text-[8px] sm:text-[10px] font-medium text-zinc-300">Luzes {config.lights}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2">
                  <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
                  <span className="text-[8px] sm:text-[10px] font-medium text-zinc-400">Sistema</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}


export function AuditoriosTeatros() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
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
    } catch(e) {}

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Auditórios e Teatros", utms })
      })

      if (response.ok) {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: 'generate_lead', lead_type: 'form_auditorios', value: 500, currency: 'BRL' });
        
        setIsSubmitting(false)
        navigate("/obrigado")
      } else {
        const errData = await response.json().catch(() => ({}))
        setSubmitError(errData.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente ou use o WhatsApp.")
        setIsSubmitting(false)
        ;(window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ event: 'form_error', error_type: 'api_rejection' });
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      setSubmitError("Erro de conexão. Tente novamente ou use o WhatsApp.")
      ;(window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'form_error', error_type: 'network_failure' });
      setIsSubmitting(false)
    }
  }

  const auditorioSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Automação Corporativa e Integração de Sistemas",
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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Helmet>
        <link rel="preload" href="/auditorio-sonus.webp" as="image" fetchPriority="high" />
      </Helmet>
      <SEO 
        title="Sonorização para Auditórios e Teatros | Sonus Pro AV" 
        description="Soluções audiovisuais de alta performance para grandes eventos. Integração Q-SYS e Shure com foco em inteligibilidade e falha zero." 
        image="/auditorio-sonus.webp"
        url="https://sonusproaudio.com.br/auditorios-e-teatros"
        keywords="sonorização para auditórios, projeto de áudio para teatro, automação audiovisual, sistema de som profissional, microfones shure para auditório, Q-SYS integração, sonorização teatro, som ambiente auditório"
        schema={auditorioSchema}
      />

      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Cinematic Parallax                     */}
      {/* ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <img fetchPriority="high" src="/auditorio-sonus.webp" className="w-full h-[120%] object-cover opacity-40 object-[center_60%]" alt="Teatro com iluminação moderna" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent z-[1]" />

        <motion.div style={{ opacity: heroOpacity }} className="max-w-6xl mx-auto relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 py-32">
          <div className="w-full md:w-3/5 space-y-8 text-center md:text-left">
            <Reveal delay={0.1}>
              <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-black tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
                ONDE CADA<br />
                NOTA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  IMPORTA.
                </span>
              </h1>
            </Reveal>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mx-auto md:mx-0">
                Sistemas audiovisuais completos para auditórios e teatros. Cobertura sonora uniforme e controle absoluto nas mãos do seu operador.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Magnetic>
                  <Button 
                    onClick={() => document.getElementById('consultoria')?.scrollIntoView({ behavior: 'smooth' })}
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium shadow-[0_0_60px_-10px_rgba(41,128,185,0.5)] transition-all hover:shadow-[0_0_80px_-10px_rgba(41,128,185,0.7)] h-auto"
                  >
                    Solicitar Consultoria Acústica
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Magnetic>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({ event: 'click_whatsapp_auditorios', source: 'hero_button' });
                    const text = `Olá! Gostaria de falar com um especialista sobre o som do meu Auditório / Teatro.`
                    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
                  }}
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-medium border-white/10 hover:bg-white/5 h-auto"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* EDITORIAL PAIN POINTS — Magazine Style         */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-8">O custo do improviso</p>
          </FadeIn>
          
          <div className="space-y-16">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
                Acústica mal dimensionada não cansa apenas os ouvidos.
                <span className="text-red-500/70"> Ela cansa a paciência do seu público.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Card 1 */}
              <FadeIn delay={0.2} className="h-full">
                <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 p-8 flex flex-col group hover:border-red-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-700" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                    <VolumeX className="w-7 h-7 text-red-400" />
                  </div>
                  
                  <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-red-500/[0.05] transition-colors duration-500 select-none">
                    01
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-red-100 transition-colors">
                    Fadiga Auditiva
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    Ecos, cortes e ruídos que destroem a mensagem do palestrante após longas horas. O público abandona a apresentação antes do fim por puro cansaço mental.
                  </p>
                </SpotlightCard>
              </FadeIn>

              {/* Card 2 */}
              <FadeIn delay={0.3} className="h-full">
                <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 p-8 flex flex-col group hover:border-orange-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Wrench className="w-7 h-7 text-orange-400" />
                  </div>

                  <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-orange-500/[0.05] transition-colors duration-500 select-none">
                    02
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-orange-100 transition-colors">
                    Dependência Técnica
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    Sistemas desintegrados que exigem um profissional de TI sempre presente para "apertar botões", conectar cabos e resolver quedas no meio da apresentação.
                  </p>
                </SpotlightCard>
              </FadeIn>

              {/* Card 3 */}
              <FadeIn delay={0.4} className="h-full">
                <SpotlightCard className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 p-8 flex flex-col group hover:border-purple-500/30 transition-colors duration-500 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    <EyeOff className="w-7 h-7 text-purple-400" />
                  </div>

                  <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-purple-500/[0.05] transition-colors duration-500 select-none">
                    03
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-100 transition-colors">
                    Poluição Visual
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    Caixas de som gigantescas e pilhas de cabos expostos que arruínam completamente o design de interiores arquitetônico em que milhões foram investidos.
                  </p>
                </SpotlightCard>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* SOLUTION — Interactive iPad Mockup             */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left: Interactive Mockup */}
            <FadeIn className="order-2 lg:order-1">
              <InteractivePanelMockup />
              <p className="text-center text-xs text-zinc-600 mt-4 font-mono">Clique nos cenários para ver a automação em ação ↑</p>
            </FadeIn>

            {/* Right: Copy */}
            <FadeIn delay={0.2} className="order-1 lg:order-2 space-y-8">
              <span className="text-primary font-mono text-sm uppercase tracking-widest">Ecossistema Integrado</span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                Controle Total em<br />
                <span className="text-primary">Uma Única Tela.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Esqueça racks confusos e dezenas de controles remotos. Nossa metodologia unifica microfonação, processamento, caixas acústicas e vídeo em um ecossistema inteligente, invisível e à prova de falhas.
              </p>

              <div className="space-y-6 pt-4">
                {[
                  { icon: <Settings2 className="w-5 h-5" />, label: "Q-SYS", title: "O Cérebro", desc: "Processamento central que gerencia áudio e automação de forma fluida e escalável.", colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20" },
                  { icon: <Mic2 className="w-5 h-5" />, label: "SHURE", title: "A Captação", desc: "Padrão ouro mundial: cada palavra captada com precisão cristalina, sem interferências.", colorClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={0.3 + i * 0.1}>
                    <div className="flex gap-4 group">
                      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-colors ${item.colorClass}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
                          {item.title} <span className="text-xs px-2 py-0.5 bg-white/10 rounded-md text-zinc-300">{item.label}</span>
                        </h4>
                        <p className="text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CASE STUDIES — Sticky Scroll                   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-20">
            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Cases de Sucesso</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Onde a exigência é máxima,<br className="hidden md:block" />
              a Sonus é a escolha.
            </h2>
          </FadeIn>

          <div className="space-y-24 md:space-y-32">
            {/* Case 1: Teatro UNISEP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              <FadeIn className="md:sticky md:top-32">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 relative group shadow-2xl">
                  <img src="/teatro-unisep.webp" alt="Teatro UNISEP" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 [transform:translateZ(0)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">Teatro UNISEP</h3>
                    <p className="text-zinc-300 font-medium">O maior teatro do interior do Paraná</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="space-y-8 pt-4">
                <div>
                  <span className="text-red-400 font-mono text-xs uppercase tracking-widest">O Desafio</span>
                  <p className="text-xl text-zinc-300 leading-relaxed font-medium mt-3">
                    Entregar pressão sonora e inteligibilidade de excelência em um teatro de grande porte sem agredir a obra arquitetônica.
                  </p>
                </div>
                <SpotlightCard className="rounded-2xl p-6 border border-white/10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-l-2xl" />
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider pl-4">A Solução Sonus</h4>
                  <p className="text-zinc-400 leading-relaxed pl-4">Implementamos caixas acústicas de altíssima fidelidade projetadas para serem virtualmente invisíveis, respeitando 100% da identidade arquitetônica aprovada.</p>
                </SpotlightCard>
              </FadeIn>
            </div>

            {/* Case 2: CRESOL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              <FadeIn className="order-2 md:order-1 space-y-8 pt-4">
                <div>
                  <span className="text-red-400 font-mono text-xs uppercase tracking-widest">O Desafio</span>
                  <p className="text-xl text-zinc-300 leading-relaxed font-medium mt-3">
                    Garantir conforto acústico e foco durante treinamentos e convenções extensas para mais de 400 pessoas.
                  </p>
                </div>
                <SpotlightCard className="rounded-2xl p-6 border border-white/10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50 rounded-l-2xl" />
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider pl-4">A Solução Sonus</h4>
                  <p className="text-zinc-400 leading-relaxed pl-4">Calibração perfeita do sistema de difusão sonora, garantindo que o som chegue limpo e na pressão exata na última fileira, sem cansar os ouvidos após horas de evento.</p>
                </SpotlightCard>
              </FadeIn>
              <FadeIn delay={0.2} className="order-1 md:order-2 md:sticky md:top-32">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 relative group shadow-2xl">
                  <img src="/auditorio-sonus.webp" alt="Auditório CRESOL" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 [transform:translateZ(0)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">Auditório CRESOL</h3>
                    <p className="text-zinc-300 font-medium">Auditório corporativo para 400 pessoas</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
          
          <FadeIn delay={0.3} className="mt-20 text-center">
            <Link to="/projetos">
              <Button variant="outline" className="h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-medium text-lg transition-all">
                Ver todos os Projetos <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Warranty Banner */}
      <WarrantyBanner 
        variant="auditorium"
        title="3 Anos de Garantia para Seu Auditório"
        description="Projetos de grande porte exigem segurança e responsabilidade absoluta. Oferecemos 3 anos de garantia integral contra qualquer falha de instalação. A infraestrutura do seu auditório sempre pronta e impecável para o próximo grande evento."
      />

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT FORM — Cinematic Identity              */}
      {/* ══════════════════════════════════════════════ */}
      <section id="consultoria" className="py-20 md:py-32 relative px-4 md:px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Projeto</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  Pronto para elevar<br className="hidden md:block" /> o nível do seu espaço?
                </h2>
              </div>
              <p className="text-zinc-400 md:max-w-xs text-sm leading-relaxed md:pb-1">
                Descreva seu projeto e nossa equipe elaborará uma análise técnica personalizada.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <SpotlightCard className="rounded-[2rem] p-6 md:p-10 border border-white/10 bg-zinc-950/50">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
                    <Input onBlur={(e) => { if(e.target.value.trim() !== '') { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: 'form_interact', field: e.target.id, page: 'auditorios' }); } }} required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                    <Input onBlur={(e) => { if(e.target.value.trim() !== '') { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: 'form_interact', field: e.target.id, page: 'auditorios' }); } }} required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail Profissional</label>
                  <Input onBlur={(e) => { if(e.target.value.trim() !== '') { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: 'form_interact', field: e.target.id, page: 'auditorios' }); } }} required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@empresa.com.br" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-300">Descreva o escopo do seu Auditório ou Teatro</label>
                  <Textarea onBlur={(e) => { if(e.target.value.trim() !== '') { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: 'form_interact', field: e.target.id, page: 'auditorios' }); } }} required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Capacidade de pessoas, problemas atuais, objetivos do projeto..." className="bg-black/50 border-white/10 focus-visible:ring-primary min-h-[150px] resize-none text-white rounded-xl" />
                </div>
                
                <div className="flex justify-center pt-2 min-h-[65px]">
                  <Turnstile 
                    siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                    onSuccess={(token) => { setSubmitError(""); setTurnstileToken(token); }}
                    onError={() => setSubmitError("Erro ao carregar o sistema de segurança.")}
                    onExpire={() => setTurnstileToken("")}
                    options={{ theme: 'dark' }} 
                  />
                </div>

                {submitError && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-xl border border-red-500/20">
                    {submitError}
                  </div>
                )}

                <Magnetic>
                  <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(41,128,185,0.4)] transition-all hover:shadow-[0_0_50px_rgba(41,128,185,0.6)]">
                    {isSubmitting ? "Enviando Solicitação..." : "Enviar Solicitação de Projeto"}
                  </Button>
                </Magnetic>
                <p className="text-center text-xs text-zinc-500 mt-2">
                  Seus dados estão seguros. Responderemos em até 24h úteis.
                </p>
              </form>
            </SpotlightCard>
          </FadeIn>
        </div>
      </section>

      <TestimonialSection />
      <LPFooter />
      <WhatsAppButton message="Olá, gostaria de saber mais sobre projetos para auditórios." />
      <StickyCtaBar />
    </div>
  )
}
