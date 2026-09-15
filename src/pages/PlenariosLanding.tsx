import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Mic, Video, LayoutDashboard, CheckCircle2, Cctv, Cpu, Radio, Youtube, Users, ShieldCheck, Clock } from "lucide-react"

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
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]"></div>
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
                Transparência, ordem e clareza. Integramos áudio de alta precisão, câmeras robóticas automáticas e sistemas de votação em uma única tela touch intuitiva.
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
                    document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Conheça o Sistema
                </Button>
              </div>
            </FadeIn>

            {/* Expanded Hero Visuals (Complex Mockup) */}
            <FadeIn delay={0.2} className="relative w-full">
              <div className="relative w-full aspect-[4/3] flex flex-col items-center justify-center">
                
                {/* Main Control Panel Mockup */}
                <motion.div 
                  initial={{ y: 30, opacity: 0, rotateX: 15 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute z-20 w-full max-w-lg bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
                  style={{ transformPerspective: 1200 }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-400" /> Painel do Presidente
                      </h3>
                      <p className="text-xs text-zinc-500">Sessão Ordinária 042 • Quórum: 15/15</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs font-medium animate-pulse">GRAVANDO</span>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-medium">AO VIVO</span>
                    </div>
                  </div>
                  
                  {/* Voting Stats Visual */}
                  <div className="bg-white/[0.03] rounded-2xl p-4 mb-6 border border-white/5">
                    <h4 className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">Votação em Andamento: PL 142/2026</h4>
                    <div className="flex h-3 w-full rounded-full overflow-hidden mb-2">
                      <div className="bg-green-500 w-[75%]"></div>
                      <div className="bg-red-500 w-[15%]"></div>
                      <div className="bg-zinc-500 w-[10%]"></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-green-400">Sim: 12</span>
                      <span className="text-red-400">Não: 2</span>
                      <span className="text-zinc-400">Abs: 1</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-4 rounded-2xl border border-red-500/40 bg-red-500/10 cursor-pointer hover:bg-red-500/20 transition-all flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                      <Mic className="w-6 h-6 text-red-400 mb-2" />
                      <div className="text-sm font-bold text-white">Cortar Microfones</div>
                      <div className="text-[10px] text-red-300/70 mt-1">Silencia todos imediatamente</div>
                    </div>
                    <div className="glass-card p-4 rounded-2xl border border-blue-500/40 bg-blue-500/10 cursor-pointer hover:bg-blue-500/20 transition-all flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                      <LayoutDashboard className="w-6 h-6 text-blue-400 mb-2" />
                      <div className="text-sm font-bold text-white">Encerrar Votação</div>
                      <div className="text-[10px] text-blue-300/70 mt-1">Publica resultados no telão</div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm text-zinc-300">Tribuna: <span className="font-semibold text-white">Ver. João Silva</span></span>
                    </div>
                    <span className="text-2xl font-mono text-red-400 font-bold">02:14</span>
                  </div>
                </motion.div>

                {/* Decorative Elements behind mockup */}
                <div className="absolute w-[140%] h-[140%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent rounded-full animate-spin-slow pointer-events-none"></div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Seção Benefícios: Por que modernizar? */}
      <section id="beneficios" className="py-24 bg-zinc-950/30 border-y border-white/5">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que modernizar o Legislativo?</h2>
            <p className="text-zinc-400">A tecnologia como pilar da transparência, eficiência e ordem pública.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparência Total</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Relatórios nominais de votação gerados automaticamente, áudio cristalino para os arquivos públicos e transmissão de vídeo em alta definição com legendas instantâneas (GC).
              </p>
            </div>
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ordem no Plenário</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Chega de interrupções cruzadas. O Presidente tem o poder de definir a fila de fala, acionar cronômetros rígidos e silenciar microfones com um único toque na tela.
              </p>
            </div>
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Estética e Confiabilidade</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Substituímos emaranhados de cabos analógicos e equipamentos que travam por um sistema digital em rede (Dante). O plenário fica limpo, imponente e à prova de falhas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Automação de Câmeras (Interactive UX Section) */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              A Câmera Segue a Voz. <br/>
              <span className="text-zinc-500">Automaticamente.</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Sem necessidade de operadores. Quando um parlamentar aciona o microfone, o processador Q-SYS envia as coordenadas espaciais para as Câmeras Robóticas (PTZ) que cortam a imagem em fração de segundos.
            </p>
          </div>

          {/* Interactive Plenary Simulation (CSS-based) */}
          <div className="max-w-5xl mx-auto glass-card-strong rounded-[2.5rem] p-8 md:p-16 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-30 pointer-events-none">
              <pre className="text-[10px] font-mono text-blue-400">
                {`> QSYS_CORE_ACTIVE
> TRACKING_ENGINE: ONLINE
> MIC_04_REQUEST_SPEAK: TRUE
> PTZ_CAM_1: PAN 45, TILT 12
> EXECUTE_VIDEO_SWITCH: DONE`}
              </pre>
            </div>

            <div className="flex flex-col items-center gap-12 relative z-10 mt-8">
              {/* Camera Icon */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <Cctv className="w-10 h-10 text-blue-400" />
                </div>
                {/* Visual Cone representation (pure css) */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[80px] md:border-l-[150px] border-l-transparent border-r-[80px] md:border-r-[150px] border-r-transparent border-b-[120px] md:border-b-[180px] border-b-blue-500/20 pointer-events-none transition-transform duration-1000 ease-in-out origin-top"></div>
              </div>

              {/* Plenary Desks */}
              <div className="w-full flex justify-between items-end gap-2 mt-12 md:mt-16 px-4 md:px-12">
                {/* Desk 1 */}
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20 hover:scale-105 cursor-pointer hover:bg-zinc-800">
                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-zinc-500">Bancada Esquerda</span>
                </div>

                {/* President Desk */}
                <div className="flex flex-col items-center gap-4 group -mt-12 md:-mt-20 z-10">
                  <div className="w-32 h-24 md:w-48 md:h-32 rounded-3xl bg-zinc-900 border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.25)] flex flex-col items-center justify-center transition-all">
                    <Mic className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-2" />
                    <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">Mic Aberto</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white">Mesa Diretora</span>
                </div>

                {/* Desk 3 */}
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20 hover:scale-105 cursor-pointer hover:bg-zinc-800">
                    <Mic className="w-6 h-6 md:w-8 md:h-8 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-zinc-500">Bancada Direita</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                <p className="text-xs text-blue-400 font-medium tracking-wide">
                  Passe o mouse ou clique nas bancadas para simular o corte de câmera (Interatividade em desenvolvimento)
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Ecossistema de Soluções */}
      <section className="py-24 relative bg-zinc-950/50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Poder de Fogo: <br className="md:hidden"/>O <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecossistema</span>.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Votação (Grande) */}
            <div className="glass-card md:col-span-2 lg:col-span-2 p-8 md:p-10 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-colors"></div>
              
              <div className="relative z-10 mb-8">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Software de Votação e Pautas</h3>
                <p className="text-zinc-400 max-w-md">
                  Integramos o hardware de áudio ao software de gestão legislativa. Telões de LED gigantes mostram a pauta atual, o cronômetro do orador e o quadro de presença.
                </p>
              </div>

              {/* Visual Element inside Card */}
              <div className="relative z-10 w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                  <span className="text-sm font-semibold text-zinc-300">Quadro de Votação Nominal</span>
                  <span className="text-xs text-indigo-400">Sincronizado</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Vereador Carlos M.</span>
                    <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">SIM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Vereadora Ana P.</span>
                    <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">SIM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Vereador Roberto F.</span>
                    <span className="text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded">NÃO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Microfones Shure */}
            <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] group-hover:bg-red-500/20 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Radio className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Discussão Shure</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  A linha Microflex® (MXC/MXCW) é padrão internacional. Garante que os discursos sejam ouvidos com perfeição.
                </p>
              </div>

              <ul className="space-y-2 relative z-10 mt-auto">
                <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-red-400 rounded-full"></div> Sem interferência de celular (GSM/5G)</li>
                <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-red-400 rounded-full"></div> Anel de LED (Indica quem fala)</li>
                <li className="text-xs text-zinc-400 flex items-center gap-2"><div className="w-1 h-1 bg-red-400 rounded-full"></div> Alto-falante na própria base</li>
              </ul>
            </div>

            {/* Card 3: Transmissão */}
            <div className="glass-card p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-[50px]"></div>
              <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-red-600/20">
                <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white relative z-10">Streaming Oficial</h3>
              <p className="text-sm text-zinc-400 relative z-10 mb-6">
                Envie o áudio mixado perfeitamente e o corte de câmeras direto para a internet. 
              </p>
              {/* Fake GC Graphic */}
              <div className="w-full bg-zinc-900 rounded-lg p-3 border border-white/5 relative z-10 flex flex-col gap-1">
                <div className="w-16 h-2 bg-red-500 rounded-sm"></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Ver. João da Silva</span>
                <span className="text-[9px] text-zinc-500">Uso da Tribuna</span>
              </div>
            </div>

            {/* Card 4: Q-SYS Core */}
            <div className="glass-card md:col-span-2 p-8 rounded-3xl border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
                  <Cpu className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Processamento Q-SYS (Cabo Único)</h3>
                <p className="text-sm text-zinc-400 max-w-sm">
                  Esqueça armários gigantes cheios de equipamentos analógicos. Um único Core processa áudio, roteia vídeo de câmeras e gerencia as telas touch via cabos de rede (Dante/AES67).
                </p>
              </div>
              
              {/* Diagram Graphic */}
              <div className="w-full md:w-48 h-32 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1)_0%,transparent_70%)]"></div>
                 <div className="flex items-center gap-4 relative z-10">
                   <div className="w-8 h-8 rounded bg-zinc-800 border border-white/10 flex items-center justify-center"><Mic className="w-4 h-4 text-zinc-400"/></div>
                   <div className="h-[1px] w-8 bg-emerald-500/50"></div>
                   <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                     <Cpu className="w-6 h-6 text-emerald-400"/>
                   </div>
                   <div className="h-[1px] w-8 bg-emerald-500/50"></div>
                   <div className="w-8 h-8 rounded bg-zinc-800 border border-white/10 flex items-center justify-center"><Video className="w-4 h-4 text-zinc-400"/></div>
                 </div>
              </div>
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
