import { useState } from "react"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { Link, useNavigate } from "react-router-dom"
import { 
  VolumeX, 
  Wrench, 
  EyeOff, 
  Settings2, 
  Mic2, 
  ShieldCheck, 
  Handshake, 
  ArrowRight,
  CheckCircle2,
  Video,
  Lightbulb,
  SlidersHorizontal
} from "lucide-react"

export function AuditoriosTeatros() {
  const navigate = useNavigate()
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    
    if (!turnstileToken) {
      setSubmitError("Por favor, aguarde a verificação de segurança (Turnstile).")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken })
      })

      if (response.ok) {
        navigate("/obrigado")
      } else {
        const errData = await response.json().catch(() => ({}))
        setSubmitError(errData.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente ou use o WhatsApp.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      setSubmitError("Erro de conexão. Verifique sua internet e tente novamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      <SEO 
        title="Áudio para Auditórios e Teatros | Sonus Pro AV" 
        description="Engenharia audiovisual de alta performance para grandes eventos. Integração Q-SYS e Shure com foco em inteligibilidade e falha zero." 
        url="https://sonusproaudio.com.br/auditorios-e-teatros"
      />

      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 md:px-6 z-10 min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src="/auditorio-sonus.jpg" className="w-full h-full object-cover opacity-30 object-[center_60%]" alt="Teatro com iluminação moderna" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
        </div>

        <div className="container max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-3/5 space-y-8 text-center md:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium tracking-wider text-zinc-300 uppercase">Engenharia Audiovisual para Grandes Públicos</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-[clamp(2.5rem,4vw,4.5rem)] font-bold tracking-tight text-white leading-[1.1]">
                Inteligibilidade Cristalina.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Zero Margem para Falhas
                </span> em Grandes Eventos.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mx-auto md:mx-0">
                Projetamos e integramos sistemas audiovisuais onde a pressão sonora de alta performance encontra o respeito absoluto à arquitetura do seu espaço.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a href="#consultoria" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(41,128,185,0.4)] transition-all transform hover:scale-105">
                  Solicitar Consultoria de Projeto
                </Button>
              </a>
              <p className="mt-4 text-xs text-zinc-500 font-medium">Fale diretamente com nossos engenheiros especialistas.</p>
            </FadeIn>
          </div>
          
          {/* Gráficos Sonoros (Decorativo) */}
          <div className="hidden md:flex w-full md:w-2/5 justify-center items-center">
            <FadeIn delay={0.4} className="relative h-[300px] w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
              <div className="relative z-10 flex items-center gap-3 h-32 opacity-80">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-4 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full animate-pulse"
                    style={{ 
                      height: `${Math.max(30, Math.random() * 100)}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. DORES / AGITAÇÃO */}
      <section className="py-24 bg-[#050505] relative z-10 px-4 md:px-6 border-t border-white/5">
        <div className="container max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              O preço de uma integração amadora<br className="hidden md:block" />
              é o <span className="text-red-500/90">fracasso do seu evento</span>.
            </h2>
            <p className="text-zinc-500 text-center max-w-2xl mx-auto mb-16 text-lg">
              Em ambientes críticos, improvisos custam caro.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1} className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                  <VolumeX className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Fadiga Auditiva</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Acústica mal dimensionada gera ecos, cortes e ruídos que cansam a audiência, destruindo a mensagem do palestrante e a experiência do público após longas horas.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <Wrench className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Dependência Técnica</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Sistemas complexos e desintegrados que exigem a presença constante da equipe de TI para "apertar botões" e resolver quedas no meio da apresentação.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors h-full">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                  <EyeOff className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Poluição Visual</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Caixas de som gigantescas e cabos expostos que arruínam o design de interiores e o teto do projeto arquitetônico em que milhões foram investidos.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. A SOLUÇÃO (ECOSSISTEMA) */}
      <section className="py-24 bg-gradient-to-b from-blue-950/20 to-[#050505] relative z-10 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Esquerda: Mockup */}
            <FadeIn className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#080808] border border-white/5 shadow-[0_0_50px_rgba(41,128,185,0.1)] flex items-center justify-center p-4 sm:p-8 group perspective-1000">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(41,128,185,0.4)_0,transparent_100%)]" />
                
                {/* iPad Mockup */}
                <div className="w-full max-w-lg aspect-[16/10] bg-zinc-950 border-[6px] border-zinc-800/80 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10 relative transform transition-all duration-700 md:group-hover:rotate-y-[-5deg] md:group-hover:rotate-x-[2deg] md:group-hover:scale-105">
                  
                  {/* Status Bar */}
                  <div className="h-6 sm:h-8 bg-zinc-900 flex items-center justify-between px-4 border-b border-zinc-800">
                    <span className="text-[8px] sm:text-[10px] font-bold text-zinc-400 tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Q-SYS SYSTEM ACTIVE
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-medium text-zinc-500">14:50</span>
                  </div>

                  {/* Interface */}
                  <div className="flex-1 p-3 sm:p-5 flex gap-3 sm:gap-5 bg-black relative">
                     {/* Background Tech Sutil */}
                     <div className="absolute inset-0 bg-[url('/qsys-tech-bg.png')] opacity-10 bg-cover bg-center mix-blend-screen pointer-events-none" />

                     {/* Left Sidebar (Scenes) */}
                     <div className="w-[35%] flex flex-col gap-2 sm:gap-3 z-10">
                       <div className="bg-primary/20 border border-primary/30 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-primary/30 transition-colors">
                         <span className="text-[10px] sm:text-xs font-bold text-white">Palestra</span>
                         <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                       </div>
                       <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-between text-zinc-500 cursor-pointer hover:bg-white/10 transition-colors">
                         <span className="text-[10px] sm:text-xs font-semibold">Cinema</span>
                       </div>
                       <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-between text-zinc-500 cursor-pointer hover:bg-white/10 transition-colors">
                         <span className="text-[10px] sm:text-xs font-semibold">Desligar Tudo</span>
                       </div>
                     </div>

                     {/* Right Content (Controls) */}
                     <div className="w-[65%] flex flex-col gap-2 sm:gap-4 z-10">
                        {/* Master Volume */}
                        <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] sm:text-xs font-semibold text-zinc-300 flex items-center gap-2">
                              <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" /> Master
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-primary">75%</span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-3/4 relative">
                               <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                            </div>
                          </div>
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            <Mic2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                            <span className="text-[8px] sm:text-[10px] font-bold text-emerald-400">Mics On</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 cursor-pointer hover:bg-white/10 transition-colors">
                            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" />
                            <span className="text-[8px] sm:text-[10px] font-medium text-zinc-500">Projetor Off</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 cursor-pointer hover:bg-white/10 transition-colors">
                            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                            <span className="text-[8px] sm:text-[10px] font-medium text-zinc-300">Luzes 50%</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 cursor-pointer hover:bg-white/10 transition-colors">
                            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
                            <span className="text-[8px] sm:text-[10px] font-medium text-zinc-400">Sistema</span>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Direita: Copy */}
            <FadeIn delay={0.2} className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Controle Total em<br />
                <span className="text-primary">Uma Única Tela.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Esqueça racks confusos e dezenas de controles remotos. Nossa metodologia unifica microfonação, processamento, caixas acústicas e vídeo em um ecossistema inteligente, invisível e à prova de falhas.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Settings2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
                      O Cérebro <span className="text-xs px-2 py-0.5 bg-white/10 rounded-md text-zinc-300">Q-SYS</span>
                    </h4>
                    <p className="text-zinc-500">O processamento central que gerencia todo o áudio e automação de forma fluida, robusta e escalável.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Mic2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
                      A Captação <span className="text-xs px-2 py-0.5 bg-white/10 rounded-md text-zinc-300">SHURE</span>
                    </h4>
                    <p className="text-zinc-500">O padrão ouro da indústria mundial garantindo que cada palavra seja captada com precisão cristalina, sem interferências.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 4. PROVA SOCIAL */}
      <section className="py-24 bg-[#050505] relative z-10 px-4 md:px-6">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="container max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Onde a Exigência é Máxima,<br />a Sonus é a Escolha.</h2>
          </FadeIn>

          <div className="space-y-12 md:space-y-24">
            
            {/* Caso 1: Teatro UNISEP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <FadeIn className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 relative group shadow-2xl">
                <img src="/auditorio-sonus.jpg" alt="Teatro UNISEP" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Teatro UNISEP</h3>
                  <p className="text-zinc-300 font-medium">O maior teatro do interior do Paraná</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="space-y-6">
                <div className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase px-3 py-1 rounded border border-primary/30 backdrop-blur-sm">O Desafio</div>
                <p className="text-xl text-zinc-300 leading-relaxed font-medium">Entregar pressão sonora e inteligibilidade de excelência sem agredir a obra.</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50" />
                  <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">A Solução Sonus</h4>
                  <p className="text-zinc-400 leading-relaxed">Implementamos um conjunto de caixas acústicas de altíssima fidelidade projetadas para serem virtualmente invisíveis aos olhos do público, respeitando 100% da identidade arquitetônica aprovada.</p>
                </div>
              </FadeIn>
            </div>

            {/* Caso 2: CRESOL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <FadeIn className="order-2 md:order-1 space-y-6">
                <div className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase px-3 py-1 rounded border border-primary/30 backdrop-blur-sm">O Desafio</div>
                <p className="text-xl text-zinc-300 leading-relaxed font-medium">Garantir conforto acústico e foco durante treinamentos e convenções extensas, mantendo um alto custo-benefício.</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50" />
                  <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">A Solução Sonus</h4>
                  <p className="text-zinc-400 leading-relaxed">Calibração perfeita do sistema de difusão sonora, garantindo que o som chegue limpo e na pressão exata na última fileira, evitando que os ouvidos doam após horas de evento para as mais de 400 pessoas.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="order-1 md:order-2 rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 relative group shadow-2xl">
                <img src="/cresol.jpg" alt="Auditório Sede Nacional CRESOL" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Sede Nacional CRESOL</h3>
                  <p className="text-zinc-300 font-medium">Auditório corporativo para 400 lugares</p>
                </div>
              </FadeIn>
            </div>

          </div>
          
          <div className="mt-16 text-center">
             <Link to="/projetos">
               <Button variant="outline" className="h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white font-medium text-lg transition-all">
                 Ver todos os Projetos <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* 5. AUTORIDADE */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5 relative z-10 px-4">
        <div className="container max-w-5xl mx-auto">
          <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">28 Anos de Engenharia Audiovisual Consolidada.</h2>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
                <div className="flex items-center justify-center md:justify-start gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">CNPJ Sólido</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                  <Handshake className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Parceria de Longo Prazo</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg text-zinc-400 leading-relaxed text-center md:text-left md:border-l-2 md:border-primary/50 md:pl-8">
                Não somos apenas vendedores de caixas de som. Atuamos como seu parceiro definitivo de tecnologia: do desenho da planta acústica à manutenção do seu espaço a longo prazo. O seu sucesso é o nosso único padrão aceitável.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. CONVERSÃO FINAL (Formulário) */}
      <section id="consultoria" className="py-24 relative z-10 px-4 md:px-6 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(41,128,185,0.1),transparent_50%)] pointer-events-none" />
        <div className="container max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Pronto para elevar o nível do seu espaço?</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Descreva brevemente seu projeto e nossa equipe de engenharia elaborará uma análise técnica para sua empresa.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
                  <Input required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                  <Input required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail Profissional</label>
                <Input required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@empresa.com.br" className="bg-black/50 border-white/10 focus-visible:ring-primary h-12 text-white" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Descreva o escopo do seu Auditório ou Teatro</label>
                <Textarea required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Capacidade de pessoas, problemas atuais, objetivos do projeto..." className="bg-black/50 border-white/10 focus-visible:ring-primary min-h-[150px] resize-none text-white" />
              </div>
              
              <div className="flex justify-center pt-2">
                <Turnstile 
                  siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                  onSuccess={(token) => setTurnstileToken(token)} 
                  options={{ theme: 'dark' }} 
                />
              </div>

              {submitError && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
                  {submitError}
                </div>
              )}

              <div className="pt-2">
                <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(41,128,185,0.4)] transition-all">
                  {isSubmitting ? "Enviando Solicitação..." : "Enviar Solicitação de Projeto"}
                </Button>
                <p className="text-center text-xs text-zinc-500 mt-4">
                  Seus dados estão seguros. Responderemos em até 24h úteis com máxima prioridade.
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
