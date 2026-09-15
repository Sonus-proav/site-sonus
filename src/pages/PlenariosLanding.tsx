import { useState, lazy, Suspense, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { Mic, CheckCircle2, Cctv, Cpu, X, Loader2, FileText, Lock } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/metaPixel"
import { logLead, getUserGeo } from "@/lib/analytics"

import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))
const TestimonialSection = lazy(() => import("@/components/ui/TestimonialSection").then(m => ({ default: m.TestimonialSection })))
const StickyCtaBar = lazy(() => import("@/components/ui/StickyCtaBar").then(m => ({ default: m.StickyCtaBar })))
const WarrantyBanner = lazy(() => import("@/components/layout/WarrantyBanner").then(m => ({ default: m.WarrantyBanner })))
const WhatsAppButton = lazy(() => import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })))
const AeoFaq = lazy(() => import("@/components/ui/AeoFaq").then(m => ({ default: m.AeoFaq })))


// ─── 3D Voting LED Wall Component ──────────────────────────────────
function VotingLedWall3D() {
  const [sim, setSim] = useState(0)
  const [nao, setNao] = useState(0)

  useEffect(() => {
    let s = 0; let n = 0;
    const interval = setInterval(() => {
      if (s < 14) { setSim(prev => prev + 1); s++; }
      if (s > 4 && n < 3) { setNao(prev => prev + 1); n++; }
      if (s >= 14 && n >= 3) clearInterval(interval);
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full relative flex justify-center perspective-[2000px]">
      <motion.div 
        initial={{ opacity: 0, rotateY: -10, rotateX: 10, rotateZ: 2 }}
        animate={{ rotateY: [-10, -5, -10], rotateX: [10, 8, 10], y: [-5, 5, -5], opacity: 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full md:w-[110%] max-w-[1200px] py-10 md:py-24 bg-[#050505] rounded-2xl md:rounded-[2rem] border border-white/10 relative overflow-hidden flex flex-col justify-center px-4 md:px-16"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* LED Matrix Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.8)_2px,transparent_2px)] bg-[size:3px_3px] md:bg-[size:4px_4px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none z-10" />
        
        {/* Glow Effects (Optimized - Pure Radial Gradients without Blur) */}
        <div className="absolute top-0 left-1/4 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.1)_0,transparent_60%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-1/4 w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.1)_0,transparent_60%)] pointer-events-none z-0" />

        <div className="relative z-20 text-center mb-6 md:mb-16 border-b border-white/10 pb-4 md:pb-10">
          <h3 className="text-xl md:text-6xl font-mono text-amber-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(245,158,11,0.4)] md:drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">LEI_042/26</h3>
          <p className="text-zinc-500 font-mono mt-2 md:mt-6 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-sm">Votação Nominal Aberta</p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-16 w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-green-500 font-mono text-[10px] md:text-3xl mb-1 md:mb-6 tracking-[0.1em] md:tracking-[0.2em] font-bold">SIM</span>
            <span className="text-5xl sm:text-[6rem] md:text-[11rem] font-black text-green-400 font-mono drop-shadow-[0_0_15px_rgba(74,222,128,0.5)] md:drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] leading-none">
              {sim.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col items-center opacity-30">
            <span className="text-zinc-400 font-mono text-[10px] md:text-3xl mb-1 md:mb-6 tracking-[0.1em] md:tracking-[0.2em] font-bold">ABS</span>
            <span className="text-5xl sm:text-[6rem] md:text-[11rem] font-black text-zinc-500 font-mono leading-none">
              00
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-500 font-mono text-[10px] md:text-3xl mb-1 md:mb-6 tracking-[0.1em] md:tracking-[0.2em] font-bold">NÃO</span>
            <span className="text-5xl sm:text-[6rem] md:text-[11rem] font-black text-red-500 font-mono drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] md:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] leading-none">
              {nao.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Interactive Blueprint ──────────────────────────────────────────
function PlenaryBlueprint() {
  const [active, setActive] = useState(0);
  const items = [
    { 
      title: "Cérebro Q-SYS", 
      icon: <Cpu className="w-5 h-5" />, 
      desc: "Um único Q-SYS Core gerencia todo o áudio, os cortes de vídeo e a automação do plenário através da rede local (IP/Dante), eliminando a necessidade de racks analógicos e DSPs isolados.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex items-center justify-center relative overflow-hidden group">
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
          
          {/* Animated data rings */}
          <div className="absolute w-[80%] aspect-square max-w-[400px] rounded-full border border-blue-500/20 border-dashed animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[60%] aspect-square max-w-[300px] rounded-full border border-blue-400/10 animate-[spin_20s_linear_infinite_reverse]" />
          
          {/* Core */}
          <motion.div 
            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(59,130,246,0.6)", "0 0 20px rgba(59,130,246,0.2)"] }} 
            transition={{ duration: 3, repeat: Infinity }} 
            className="w-32 h-32 md:w-40 md:h-40 bg-zinc-950 border border-blue-500/50 rounded-2xl flex flex-col items-center justify-center relative z-10 backdrop-blur-xl"
            style={{ willChange: 'box-shadow' }}
          >
             <Cpu className="text-blue-400 w-10 h-10 md:w-12 md:h-12 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
             <span className="text-[10px] md:text-xs font-mono text-blue-300 font-bold tracking-wider">CORE 110f</span>
             
             {/* Status indicators */}
             <div className="absolute top-2 right-2 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75" />
             </div>
             <div className="absolute -bottom-6 text-[8px] md:text-[10px] text-blue-400 font-mono whitespace-nowrap opacity-70">
                [AEC PROCESSING: ACTIVE]
             </div>
          </motion.div>
        </div>
      )
    },
    { 
      title: "Captação Shure MXC", 
      icon: <Mic className="w-5 h-5" />, 
      desc: "A linha MXC da Shure entrega imunidade absoluta a smartphones (5G). Os anéis de LED indicam visualmente quem tem a palavra, enquanto o sistema gerencia a fila de fala automaticamente.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0,transparent_60%)]" />
          
          {/* Curved Desk Arrangement */}
          <div className="relative w-64 md:w-96 h-32 md:h-48 border-t-2 border-dashed border-zinc-800 rounded-t-full mt-24 flex justify-center">
             
             {/* Inactive Mics */}
             <div className="absolute top-4 left-4 w-6 h-6 md:w-8 md:h-8 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center">
               <Mic className="w-3 h-3 text-zinc-600" />
             </div>
             <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center">
               <Mic className="w-3 h-3 text-zinc-600" />
             </div>
             
             {/* Active Mic */}
             <div className="absolute -top-4 left-1/3">
               <motion.div animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-red-500 rounded-full" />
               <motion.div animate={{ scale: [1, 1.8], opacity: [0.8, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} className="absolute inset-0 bg-red-500 rounded-full" />
               
               <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 border border-red-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                 <Mic className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
               </div>
             </div>
          </div>
          
          {/* Terminal output */}
          <div className="absolute top-4 left-4 font-mono text-[8px] md:text-[10px] text-green-400">
             {">"} DETECTANDO VOZ...<br/>
             {">"} CANAL_02: <span className="text-red-400">ON_AIR</span><br/>
             {">"} FILA_FIFO: 01, 03<br/>
             {">"} RF_INTERFERENCE: <span className="text-zinc-500">NONE</span>
          </div>
        </div>
      )
    },
    { 
      title: "Câmeras Auto-Track", 
      icon: <Cctv className="w-5 h-5" />, 
      desc: "O corte de câmera deixa de ser manual. Ao apertar o botão do microfone, o Q-SYS direciona a câmera PTZ exata para o rosto do vereador em milissegundos. Enquadramento sempre perfeito.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex items-center justify-center relative overflow-hidden">
           {/* Camera targeting system */}
           <div className="absolute inset-4 md:inset-8 border border-zinc-800 rounded-xl overflow-hidden bg-black">
             {/* Video feed simulation */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
             
             {/* Crosshair / Targeting */}
             <motion.div 
               initial={{ x: -100, y: -50, scale: 2 }}
               animate={{ x: 0, y: 0, scale: 1 }}
               transition={{ duration: 1, delay: 0.5, type: "spring" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 border-2 border-purple-500/30"
             >
               {/* Crosshair corners */}
               <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-purple-400" />
               <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-purple-400" />
               <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-purple-400" />
               <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-purple-400" />
               
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono text-purple-400 whitespace-nowrap bg-purple-900/30 px-2 py-1 rounded">
                 TARGET LOCKED (MIC_02)
               </div>
               
               <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-purple-400/50 flex items-center justify-center"
               >
                 <div className="w-1 h-1 bg-purple-400 rounded-full" />
               </motion.div>
             </motion.div>
           </div>
        </div>
      )
    },
    { 
      title: "Transparência & Atas", 
      icon: <FileText className="w-5 h-5" />, 
      desc: "Hardware e software unidos. Cada voto nominal é registrado, computado no telão e uma Ata em PDF assinada digitalmente é gerada imediatamente para o Portal da Transparência.",
      visual: (
        <div className="w-full h-full bg-[#020202] flex flex-col md:flex-row gap-4 p-4 md:p-8">
           {/* Live chart */}
           <div className="w-full md:w-1/3 flex flex-col gap-4">
             <div className="h-24 md:h-full bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-end p-4 gap-2 relative overflow-hidden">
                <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-500">QUÓRUM</div>
                <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} transition={{ duration: 1 }} className="w-1/3 bg-green-500 rounded-t-sm shadow-[0_0_10px_rgba(34,197,94,0.3)] relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-green-400">14</span>
                </motion.div>
                <motion.div initial={{ height: 0 }} animate={{ height: '10%' }} transition={{ duration: 1 }} className="w-1/3 bg-zinc-500 rounded-t-sm relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400">00</span>
                </motion.div>
                <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} transition={{ duration: 1 }} className="w-1/3 bg-red-500 rounded-t-sm shadow-[0_0_10px_rgba(239,68,68,0.3)] relative">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-red-400">03</span>
                </motion.div>
             </div>
           </div>
           
           {/* Log feed */}
           <div className="w-full md:w-2/3 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 font-mono text-[8px] md:text-[10px] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 bg-zinc-950 p-2 border-b border-zinc-800 flex gap-2 items-center z-10">
                <Lock className="w-3 h-3 text-green-500" />
                <span className="text-zinc-400">LOG_DE_SESSÃO_CRIPTOGRAFADO</span>
              </div>
              
              <div className="mt-8 flex flex-col gap-3 relative h-full">
                <motion.div 
                   animate={{ y: [0, -50] }} 
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                   className="flex flex-col gap-3"
                >
                   <div className="text-green-400 truncate">[14:02:05] VOTO: SIM (Ver. João) - HASH: x8f9a...</div>
                   <div className="text-green-400 truncate">[14:02:07] VOTO: SIM (Ver. Maria) - HASH: c2b31...</div>
                   <div className="text-red-400 truncate">[14:02:11] VOTO: NÃO (Ver. Carlos) - HASH: a9d4e...</div>
                   <div className="text-green-400 truncate">[14:02:15] VOTO: SIM (Ver. Ana) - HASH: b5f2c...</div>
                   <div className="text-green-400 truncate">[14:02:18] VOTO: SIM (Ver. Pedro) - HASH: e1c8d...</div>
                </motion.div>
                
                {/* Overlay gradient for fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900/50 to-transparent pointer-events-none" />
              </div>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:h-[500px]">
      <div className="lg:col-span-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <div 
            key={i} 
            onClick={() => setActive(i)}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${active === i ? 'bg-zinc-900 border-white/10 shadow-xl' : 'bg-transparent border-transparent hover:bg-zinc-900/40'}`}
          >
            <div className="flex items-center gap-4 mb-2">
               <div className={`p-3 rounded-xl transition-colors ${active === i ? 'bg-white text-black' : 'bg-white/5 text-zinc-400'}`}>
                 {item.icon}
               </div>
               <h3 className={`text-xl font-bold transition-colors ${active === i ? 'text-white' : 'text-zinc-400'}`}>{item.title}</h3>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-zinc-400 text-sm leading-relaxed overflow-hidden"
                >
                  <div className="pt-2">{item.desc}</div>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-[#030303] shadow-2xl relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
          >
            {items[active].visual}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export function PlenariosLanding() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])


  // Scroll logic for Timeline
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] })

  const handleWhatsApp = async (origin: 'whatsapp_flutuante' | 'whatsapp_hero' | 'whatsapp_urgente' | 'whatsapp_footer') => {
    trackWhatsAppClick(origin, 'plenarios');
    const geo = await getUserGeo();
    logLead({
      type: 'whatsapp',
      source: location.pathname,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      timestamp: Date.now(),
      whatsappOrigin: origin
    });
    window.open("https://wa.me/5546920013151?text=Ol%C3%A1%21+Gostaria+de+falar+sobre+um+projeto+executivo+para+Plen%C3%A1rio%2FC%C3%A2mara.", "_blank");
  }

  // Form State for Gov Project Request
  const [formData, setFormData] = useState({ name: "", role: "", email: "", phone: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contato', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: "Landing Page Plenários - TR Licitação" })
      });
      if(response.ok) setIsSuccess(true);
    } catch(err) {
      console.error(err);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="dark min-h-screen bg-[#020202] text-white selection:bg-blue-500/30 font-sans">
      <Helmet>
        <title>Plenários e Câmaras Municipais | Sonus Pro Audio</title>
        <meta name="description" content="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários. Solicite um Termo de Referência ou Projeto Executivo." />
      </Helmet>
      <SEO 
        title="Plenários e Câmaras Municipais | Sonus Pro Audio"
        description="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários. Solicite um Termo de Referência."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Automação de Plenários e Câmaras Municipais",
          provider: { "@type": "Organization", name: "Sonus Pro Audio" },
          description: "Integração completa de áudio, câmeras PTZ e votação para câmaras de vereadores.",
          areaServed: { "@type": "Country", name: "Brasil" }
        }} 
      />
      
      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* IMMERSIVE HERO — 3D Display                   */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center border-b border-white/5 overflow-hidden bg-[#020202]">
        {/* Futuristic Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top_left,black_40%,transparent_80%)]" />
        
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center pt-24 lg:pt-0">
          
          {/* LEFT COLUMN - TYPOGRAPHY & CTAS */}
          <div className="w-full lg:w-1/2 relative z-20 flex flex-col items-start pt-10 pb-20 lg:py-0">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8 border-l-2 border-blue-500 pl-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">Projetos Executivos de Engenharia</span>
              </div>
            </FadeIn>
            
            <Reveal>
              <h1 className="text-[14vw] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] font-black tracking-tighter leading-[0.85] uppercase text-white">
                Plenário
                <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.9)', WebkitTextStrokeWidth: 'max(1px, 0.1vw)' }}>
                  Do Futuro
                </span>
              </h1>
            </Reveal>
            
            <FadeIn delay={0.2} className="max-w-lg mt-10">
              <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed border-l border-white/10 pl-6">
                A arquitetura do som perfeito aliada ao corte de câmeras autônomo. 
                <strong className="text-white font-medium"> Votação eletrônica nominal</strong> integrada e imune a fraudes para o setor público.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto">
              <Button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="h-16 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-none text-sm font-bold tracking-widest uppercase transition-all shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:translate-y-1 hover:translate-x-1 border border-blue-500">
                Termo de Referência
              </Button>
              <Button onClick={() => handleWhatsApp('whatsapp_hero')} variant="outline" className="h-16 px-8 bg-transparent border-white/20 text-white hover:bg-white/5 rounded-none text-sm font-bold tracking-widest uppercase transition-all shadow-none">
                Falar com Especialista
              </Button>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN - 3D LED WALL */}
          <div className="w-full lg:absolute lg:right-[-5%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[60%] z-10 mt-10 lg:mt-0 pointer-events-none">
            <FadeIn delay={0.4}>
              <VotingLedWall3D />
            </FadeIn>
          </div>
          
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* AUTHORITY BADGE                              */}
      {/* ══════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20 border-b border-blue-500/20 py-4 relative z-20 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs text-blue-300/80 font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
            A mesma tecnologia aprovada por: Congresso Nacional • STF • ONU
          </p>
        </div>
      </div>

      <div className="bg-[#020202] py-8 relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 hover:opacity-70 transition-opacity duration-500">
          <img src="/shure-logo.png" alt="Shure" className="h-6 md:h-8 object-contain brightness-0 invert" loading="lazy" />
          <img src="/qsys-logo.png" alt="Q-SYS" className="h-5 md:h-7 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/qsc.png" alt="QSC" className="h-6 md:h-8 object-contain brightness-0 invert" loading="lazy" />
          <img src="/marcas/sennheiser.svg" alt="Sennheiser" className="h-5 md:h-7 object-contain brightness-0 invert" loading="lazy" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* BRUTALIST PAIN POINTS (White Block)          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-zinc-50 text-black relative overflow-hidden">
        {/* Subtle noise texture on white */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-multiply pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-20 leading-[0.9]">
              O Custo Político<br/>da <span className="text-red-600">Obsolescência.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: "01", title: "Microfonia e Caos", desc: "Equipamentos amadores captam o ruído inteiro da sala. Parlamentares precisam gritar, o áudio da TV Câmara fica ininteligível e a sessão perde o decoro institucional." },
              { num: "02", title: "Risco de Recontagem", desc: "Votar levantando a mão ou usar sistemas instáveis gera lentidão e dúvidas no resultado. Sem registro digital criptografado, a transparência pública é comprometida." },
              { num: "03", title: "Falta de Compliance", desc: "Ministério Público e Tribunais de Contas exigem registros claros, acessibilidade e transmissões nítidas. Um plenário analógico deixa a Câmara vulnerável a apontamentos." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative pt-8 border-t-8 border-black group overflow-hidden bg-white/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  <span className="absolute -bottom-8 -right-4 text-[120px] font-black text-black/[0.03] leading-none pointer-events-none group-hover:scale-110 group-hover:text-black/[0.05] transition-all duration-700 select-none">
                    {item.num}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-600 text-lg relative z-10 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* INTERACTIVE BLUEPRINT                        */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#020202] text-white relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">Engenharia de Ponta.</h2>
          </Reveal>
          <p className="text-lg md:text-xl text-zinc-400 mb-16 max-w-2xl font-light">
            Não vendemos caixas de som avulsas. Projetamos um ecossistema inteligente, integrado e livre de falhas para o setor público.
          </p>
          
          <PlenaryBlueprint />
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* DIRECT COMPARISON X-RAY                      */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter">A Diferença é Brutal.</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Padrão Antigo */}
            <FadeIn>
              <div className="relative p-[1px] rounded-3xl overflow-hidden group h-full">
                <div className="absolute inset-0 bg-red-900/30 group-hover:bg-red-800/50 transition-colors duration-500" />
                <div className="relative bg-[#0a0505] p-8 md:p-12 rounded-[23px] h-full">
                  <div className="flex items-center gap-4 mb-10 border-b border-red-900/30 pb-6">
                    <div className="p-3 bg-red-950 rounded-xl text-red-500"><X className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-red-400">O Padrão Antigo</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Cabeamento analógico cruzando o chão e mesas', 
                      'Microfonia constante exigindo interrupção da sessão', 
                      'Operador de vídeo precisando adivinhar quem vai falar', 
                      'Votação simbólica sujeita a contestações e erros'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 items-start text-zinc-400">
                        <div className="mt-1 shrink-0"><X className="w-4 h-4 text-red-500/50" /></div>
                        <span className="text-sm md:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Padrão Sonus */}
            <FadeIn delay={0.2}>
              <div className="relative p-[1px] rounded-3xl overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 opacity-30 group-hover:opacity-100 animate-[spin_4s_linear_infinite] transition-opacity duration-500" />
                <div className="relative bg-[#02050a] p-8 md:p-12 rounded-[23px] h-full shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                  <div className="flex items-center gap-4 mb-10 border-b border-blue-900/30 pb-6">
                    <div className="p-3 bg-blue-950 rounded-xl text-blue-400"><CheckCircle2 className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-blue-400">O Padrão Sonus</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Áudio e Vídeo digitais tráfegando via cabo de rede IP (Dante)', 
                      'Captação direcional hiper-nítida e livre de interferências', 
                      'Câmeras PTZ cortam sozinhas para quem está com o microfone aberto', 
                      'Painel integrado que emite a ata oficial assinada em PDF'
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 items-start text-zinc-200">
                        <div className="mt-1 shrink-0 bg-blue-500/20 rounded-full p-0.5"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                        <span className="text-sm md:text-base font-medium leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ILLUMINATED VERTICAL TIMELINE                */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#020202] relative" ref={timelineRef}>
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter">Processo de Implantação.</h2>
          </Reveal>
          
          <div className="relative">
            {/* The vertical base line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
            {/* The animated glow line */}
            <motion.div 
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent md:-translate-x-1/2 origin-top shadow-[0_0_15px_#3b82f6]"
              style={{ scaleY: timelineProgress }}
            />

            <div className="space-y-16">
              {[
                { step: "01", title: "Levantamento & TR", desc: "Nossos engenheiros mapeiam o plenário e ajudam o setor de compras na formulação do Termo de Referência técnico correto." },
                { step: "02", title: "Projeto Executivo", desc: "Desenho da arquitetura de rede, plantas de cabeamento estruturado e design das interfaces touchscreen." },
                { step: "03", title: "Instalação Cirúrgica", desc: "A execução ocorre durante o recesso parlamentar ou janelas livres, garantindo zero impacto na agenda legislativa." },
                { step: "04", title: "Sessão Inaugural e SLA", desc: "Acompanhamos as primeiras sessões presencialmente e ativamos o monitoramento remoto 24/7 (Q-SYS Reflect)." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group">
                  {/* Icon Node */}
                  <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full border-4 border-[#020202] bg-zinc-900 flex items-center justify-center -translate-x-[19px] md:-translate-x-1/2 z-10 transition-colors duration-500 group-hover:bg-blue-600 group-hover:border-blue-400">
                    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-white">{item.step}</span>
                  </div>
                  
                  {/* Content Box */}
                  <div className="w-[calc(100%-4rem)] ml-[4rem] md:ml-0 md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 group-hover:border-blue-500/30 transition-all duration-500 group-hover:bg-white/[0.04]">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FORM: PROJETO EXECUTIVO / LICITAÇÃO          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#050505] relative border-t border-white/5" id="contato">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Solicite um Projeto Executivo</h2>
              <p className="text-zinc-400 text-lg">Ideal para Câmaras Municipais que precisam iniciar um Termo de Referência (TR) para licitação.</p>
            </div>

            {isSuccess ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                <p className="text-zinc-400">Nossa equipe técnica entrará em contato em breve para agendar uma reunião de alinhamento do projeto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} tabIndex={-1} autoComplete="off" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Nome do Contato</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="João da Silva" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Órgão Público / Cargo</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Câmara Municipal de..." value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">E-mail Institucional</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="joao@camara.leg.br" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="(00) 00000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Resumo da Necessidade</label>
                  <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Ex: Precisamos modernizar o áudio do plenário e implementar votação eletrônica..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando...</> : "Solicitar Contato Técnico"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FOOTER BLOCK (Lazy)                            */}
      {/* ══════════════════════════════════════════════ */}
      <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <WarrantyBanner 
          variant="qsys"
          title="3 Anos de Garantia e SLA"
          description="Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de garantia sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager."
        />
        <AeoFaq faqs={[
          {
            question: "Como o sistema ajuda na Transparência Pública?",
            answer: "O sistema integrado da Sonus gera atas digitais assinadas automaticamente, com o registro de cada voto e tempo de fala. Além disso, a transmissão para a TV Câmara e YouTube sai com qualidade broadcast (GC, cortes automáticos e áudio perfeito), garantindo que a população compreenda claramente cada sessão legislativa."
          },
          {
            question: "Vocês auxiliam na elaboração do Termo de Referência (TR)?",
            answer: "Sim. Nossos engenheiros de áudio e vídeo realizam o levantamento técnico arquitetônico da Câmara e entregam um projeto executivo detalhado. Esse documento possui as especificações técnicas exatas para garantir que o edital da licitação seja montado de forma segura, evitando a compra de equipamentos amadores."
          },
          {
            question: "É possível instalar o sistema sem interromper as sessões da Câmara?",
            answer: "Sim. Temos experiência em trabalhar no formato 'turn-key' durante os finais de semana ou no período de recesso parlamentar. A migração da tecnologia antiga para a nova é feita com planejamento cirúrgico para que nenhuma pauta seja atrasada por conta da obra técnica."
          }
        ]} />
        <TestimonialSection />
        <LPFooter />
        <WhatsAppButton message="Olá! Gostaria de iniciar um levantamento técnico para a minha Câmara Municipal." />
        <StickyCtaBar />
      </Suspense>
    </div>
  )
}
