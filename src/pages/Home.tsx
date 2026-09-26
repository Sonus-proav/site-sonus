import { useEffect, lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"



import { SEO } from "../components/SEO"
import { Navbar } from "@/components/layout/Navbar"

const LPFooter = lazy(() => import("@/components/layout/LPFooter").then(m => ({ default: m.LPFooter })))

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
  
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

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
        No glowing orbs, no cheap gradients.
        Typography tension: Massive tight tracking vs tiny wide tracking.
      */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 xl:px-16 pt-32 pb-20 overflow-hidden">
        
        {/* Architectural Grid Background (Subtle) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8 md:mb-12"
          >
            <div className="w-2 h-2 bg-white" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Sonus Professional Audio & Video</span>
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

      {/* 
        DIMENSIONS BENTHIC GRID
        Sharp borders, pure graphite backgrounds.
      */}
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

      {/* 
        MINIMALIST FOOTER HOOK
      */}
      <section className="py-32 px-4 text-center border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-8">Pronto para blindar seu espaço?</h2>
        <a 
          href="https://wa.me/5546920013151" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block border-b-2 border-white pb-2 text-xl md:text-2xl font-medium hover:text-zinc-400 hover:border-zinc-400 transition-colors duration-300"
        >
          Falar com a Engenharia
        </a>
      </section>

      <Suspense fallback={null}>
        <LPFooter />
      </Suspense>
    </div>
  )
}
