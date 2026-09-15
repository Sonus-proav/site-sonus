import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Mic, Video, LayoutDashboard, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StickyCtaBar } from "@/components/ui/StickyCtaBar"
import { FadeIn } from "@/components/ui/FadeIn"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { logLead, getUserGeo } from "@/lib/analytics"
import { trackWhatsAppClick } from "@/lib/metaPixel"

export function PlenariosLanding() {
  const location = useLocation();

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
    window.open("https://wa.me/5546920013151?text=Ol%C3%A1%21+Gostaria+de+falar+sobre+um+projeto+para+Plen%C3%A1rio%2FC%C3%A2mara.", "_blank");
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 pt-20">
      <Helmet>
        <title>Plenários e Câmaras Municipais | Sonus Pro Audio</title>
        <meta name="description" content="Sistemas de áudio, automação de câmeras e votação eletrônica para Plenários, Câmaras de Vereadores e Assembleias. Controle tudo em uma única interface touchscreen com Q-SYS e Shure." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="noise-overlay opacity-30"></div>
        
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] mb-8">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm font-medium tracking-wide text-zinc-300">Poder Público & Legislativo</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                A Nova Era das <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-indigo-400 to-blue-500 text-glow-blue">
                  Sessões Legislativas.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
                Áudio perfeito, rastreamento de câmeras automático e sistema de votação eletrônica integrado. O controle absoluto do plenário, na ponta dos dedos do Presidente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="shimmer-btn bg-white text-black hover:bg-zinc-200 text-base h-14 px-8 rounded-full"
                  onClick={() => handleWhatsApp('whatsapp_hero')}
                >
                  Agendar Consultoria
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="glass-card text-white hover:bg-white/10 border-white/20 text-base h-14 px-8 rounded-full"
                  onClick={() => {
                    document.getElementById('automacao')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Ver como funciona
                </Button>
              </div>
            </FadeIn>

            {/* Hero Visuals (Mockup) */}
            <FadeIn delay={0.2}>
              <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
                {/* Interface Mockup */}
                <motion.div 
                  initial={{ y: 20, opacity: 0, rotateX: 10 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute z-10 w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                  style={{ transformPerspective: 1000 }}
                >
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-300">Controle da Mesa</h3>
                      <p className="text-xs text-zinc-500">Sessão Plenária 042</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-4 rounded-2xl border border-red-500/30 bg-red-500/10 cursor-pointer hover:bg-red-500/20 transition-colors flex flex-col items-center justify-center text-center">
                      <Mic className="w-6 h-6 text-red-400 mb-2" />
                      <div className="text-sm font-medium">Mute All</div>
                    </div>
                    <div className="glass-card p-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-colors flex flex-col items-center justify-center text-center">
                      <LayoutDashboard className="w-6 h-6 text-blue-400 mb-2" />
                      <div className="text-sm font-medium">Abrir Votação</div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5">
                    <span className="text-sm text-zinc-400">Tempo de Tribuna</span>
                    <span className="text-xl font-mono text-white">03:00</span>
                  </div>
                </motion.div>

                {/* Decorative Elements behind mockup */}
                <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent rounded-full animate-spin-slow"></div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Automação de Câmeras (Interactive UX Section) */}
      <section id="automacao" className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              A Câmera Segue a Voz. <br/>
              <span className="text-zinc-500">Instantaneamente.</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Esqueça o operador de câmera manual. Com a inteligência Q-SYS integrada aos microfones Shure, as câmeras PTZ cortam e focam automaticamente em quem apertou o botão para falar.
            </p>
          </div>

          {/* Interactive Plenary Simulation (CSS-based) */}
          <div className="max-w-4xl mx-auto glass-card-strong rounded-3xl p-8 md:p-16 border-white/10 relative">
            <div className="flex flex-col items-center gap-12">
              
              {/* Camera Icon */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center relative z-10">
                  <Video className="w-8 h-8 text-blue-400" />
                </div>
                {/* Visual Cone representation (pure css) */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[60px] md:border-l-[100px] border-l-transparent border-r-[60px] md:border-r-[100px] border-r-transparent border-b-[100px] md:border-b-[150px] border-b-blue-500/20 pointer-events-none transition-transform duration-700 origin-top"></div>
              </div>

              {/* Plenary Desks */}
              <div className="w-full flex justify-between gap-4 mt-8 md:mt-12">
                {/* Desk 1 */}
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20 hover:scale-105 cursor-pointer">
                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-hover:text-red-400 transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-zinc-500">Bancada</span>
                </div>

                {/* President Desk */}
                <div className="flex flex-col items-center gap-4 group -mt-8 md:-mt-12">
                  <div className="w-28 h-20 md:w-32 md:h-24 rounded-2xl bg-zinc-900 border border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.2)] flex items-center justify-center transition-all">
                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white">Mesa Diretora</span>
                </div>

                {/* Desk 3 */}
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20 hover:scale-105 cursor-pointer">
                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-hover:text-red-400 transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-zinc-500">Bancada</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 text-center mt-4">
                * Demonstração conceitual. A lente foca no orador em milissegundos sem intervenção humana.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Ecossistema de Soluções */}
      <section className="py-24 relative bg-zinc-950/50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Tudo em um único <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecossistema.</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Votação (Grande) */}
            <div className="glass-card md:col-span-2 lg:col-span-2 p-8 md:p-10 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-colors"></div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">Painel de Votação e Pautas</h3>
              <p className="text-zinc-400 mb-8 max-w-md relative z-10">
                Gerencie quórum, pautas do dia, tempo de fala e votos nominais diretamente da tela touch. Os resultados são exibidos automaticamente nos telões do plenário e na transmissão.
              </p>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Biometria ou Senha (Segurança total)
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Sim / Não / Abster com contagem em tempo real
                </li>
              </ul>
            </div>

            {/* Card 2: Microfones Shure */}
            <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] group-hover:bg-red-500/20 transition-colors"></div>
              <h3 className="text-xl font-bold mb-4 text-white relative z-10">Sistemas de Discussão Shure</h3>
              <p className="text-sm text-zinc-400 mb-6 relative z-10">
                Tecnologia Microflex® (MXCW). Áudio imune a interferências de celular 5G, com botões físicos de solicitação de fala e alto-falante integrado na própria base.
              </p>
            </div>

            {/* Card 3: Transmissão */}
            <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-xl font-bold mb-4 text-white">Streaming & Gravação</h3>
              <p className="text-sm text-zinc-400">
                Transmissão direta para o YouTube da Câmara, Facebook ou TV Legislativa, com gerador de caracteres (GC) automático mostrando o nome de quem está falando.
              </p>
            </div>

            {/* Card 4: Q-SYS Core */}
            <div className="glass-card md:col-span-2 p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-xl font-bold mb-4 text-white">Processamento Q-SYS (Cabo Único)</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Substitua dezenas de equipamentos antigos (matrizes, processadores, controladores) por um único cérebro digital conectado via cabo de rede (Cat6). Menos cabos, zero ruído, infinitamente mais flexível.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="glass-card-strong bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-[3rem] p-12 md:p-20 text-center border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 noise-overlay opacity-30"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Pronto para modernizar a sua Câmara?
              </h2>
              <p className="text-lg text-zinc-300 mb-10">
                Nossos especialistas desenvolvem o projeto executivo, implementam a tecnologia e treinam a sua equipe. Tudo com garantia e suporte contínuo.
              </p>
              
              <Button 
                size="lg" 
                className="shimmer-btn bg-white text-black hover:bg-zinc-200 text-lg h-14 px-8 rounded-full font-semibold"
                onClick={() => handleWhatsApp('whatsapp_footer')}
              >
                Falar com um Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton message="Olá! Gostaria de falar sobre um projeto para Plenário/Câmara de Vereadores." />
      <StickyCtaBar />
    </div>
  )
}
