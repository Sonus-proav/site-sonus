import { useState, useEffect } from "react"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { ChevronRight, Play, CheckCircle2, AlertCircle, Cpu } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SEO } from "../components/SEO"

export function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [show404, setShow404] = useState(false)

  useEffect(() => {
    if (location.state?.show404Toast) {
      setShow404(true)
      // Limpa o state para não mostrar novamente em caso de refresh
      navigate("/", { replace: true, state: {} })
    }
  }, [location, navigate])

  // Timer independente para não ser cancelado pelo navigate()
  useEffect(() => {
    if (show404) {
      const timer = setTimeout(() => setShow404(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [show404])

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
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Sonus Pro AV | Projetos de Sonorização e Automação Corporativa" 
        description="Especialistas em integração audiovisual de alta performance. Projetos de sonorização, acústica e automação para empresas, auditórios e igrejas. 28 anos de mercado." 
        url="https://sonusproaudio.com.br/"
      />
      
      {/* 404 Toast Notification */}
      {show404 && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-500 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Página não encontrada. Redirecionado para o Início.</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
        {/* Background dark gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] opacity-20 pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />
        
        <div className="container px-4 md:px-6 relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Impact Text */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 fill-mode-both">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-primary backdrop-blur-md shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium tracking-wide">28 Anos de Tradição e Inovação</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Áudio e Vídeo <br className="hidden md:block" />
                de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Alto Nível.</span>
              </h1>
              
              <div className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed space-y-4 max-w-lg">
                <p className="font-normal text-zinc-200">
                  Infraestrutura de peso para quem não aceita falhas.
                </p>
                <p className="text-base lg:text-lg">
                  Projetos personalizados e automatizados para Auditórios, Igrejas, Salas de Reunião e Teatros.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                <a href="#contato" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base font-semibold px-8 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(41,128,185,0.4)] hover:shadow-[0_0_30px_rgba(41,128,185,0.6)] transition-all">
                    Inicie Seu Projeto
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/projetos" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-base font-medium px-8 h-14 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md transition-all">
                    <Play className="mr-2 h-5 w-5 text-primary" />
                    Ver Portfólio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side: Bento Box Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-[550px] sm:h-[600px] lg:h-[650px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
              
              {/* Card 1: Large Image (Corporate/Auditorium) */}
              <Link to="/auditorios-e-teatros" className="col-span-2 row-span-1 rounded-[2rem] overflow-hidden relative group border border-white/5 shadow-2xl block cursor-pointer [transform:translateZ(0)] isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
                <img src="/auditorio-sonus.jpg" alt="Auditório Moderno" className="w-full h-full object-cover object-[center_65%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="relative w-3/4">
                    <h3 className="text-white font-bold text-2xl lg:text-3xl mb-1 relative z-10">Auditórios e Teatros</h3>
                    <p className="text-zinc-300 text-sm lg:text-base">Sonorização imersiva de grande escala</p>
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Q-SYS Certified */}
              <Link to="/qsys" className="col-span-1 row-span-1 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 bg-gradient-to-br from-blue-950/50 to-slate-900/80 border border-blue-500/20 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 cursor-pointer">
                {/* VU Meter Interativo (Áudio) */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-end gap-1 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1.5 bg-blue-400 rounded-t-sm h-2 group-hover:animate-pulse transition-all duration-300 group-hover:h-6"></div>
                  <div className="w-1.5 bg-blue-400 rounded-t-sm h-4 group-hover:animate-pulse transition-all duration-300 group-hover:h-3 delay-75"></div>
                  <div className="w-1.5 bg-blue-400 rounded-t-sm h-3 group-hover:animate-pulse transition-all duration-300 group-hover:h-8 delay-150"></div>
                  <div className="w-1.5 bg-blue-400 rounded-t-sm h-5 group-hover:animate-pulse transition-all duration-300 group-hover:h-4 delay-200"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 sm:mb-4 border border-blue-500/30 group-hover:scale-110 group-hover:bg-blue-500/40 transition-all duration-500">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1 group-hover:text-blue-300 transition-colors line-clamp-1">Q-SYS</h3>
                  <p className="text-blue-200/70 text-[10px] sm:text-xs lg:text-sm line-clamp-3 sm:line-clamp-none">O cérebro por trás das maiores automações e integrações audiovisuais do mundo!</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[10px] lg:text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    Processamento Central
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </Link>

              {/* Card 3: Salas de Reunião Image */}
              <Link to="/projetos/29" className="col-span-1 row-span-1 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group border border-white/5 shadow-xl block cursor-pointer [transform:translateZ(0)] isolate [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
                <img src="/salas-corporativas.jpg" alt="Sala de Reunião" className="w-full h-full object-cover object-[center_40%] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex justify-between items-end">
                  <div className="relative w-3/4">
                    <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-1 relative z-10">Salas Corporativas</h3>
                    <p className="text-zinc-400 text-[10px] sm:text-xs lg:text-sm">Videochamadas impecáveis</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </Link>

            </div>
            
          </div>
          
          {/* Trusted By / Client Logos Banner (Temporarily Disabled)
          <div className="w-full mt-16 mb-6 border-y border-white/5 py-10">
            <p className="text-center text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-[0.2em] mb-8">
              Empresas que confiam na Sonus
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 px-4">
              <img 
                src="/clientes/cresol.png" 
                alt="Cresol" 
                className="h-8 md:h-10 lg:h-12 object-contain filter grayscale brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-500" 
              />
              <img 
                src="/clientes/unoesc.png" 
                alt="UNOESC" 
                className="h-8 md:h-10 lg:h-12 object-contain filter grayscale brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-500" 
              />
              <img 
                src="/clientes/unipar.png" 
                alt="UNIPAR" 
                className="h-9 md:h-11 lg:h-14 object-contain filter grayscale brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-500" 
              />
              <img 
                src="/clientes/unisep.png" 
                alt="Unisep" 
                className="h-8 md:h-10 lg:h-12 object-contain filter grayscale brightness-0 invert opacity-40 hover:opacity-100 transition-opacity duration-500" 
              />
            </div>
          </div>
          */}
          
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/90 dark:from-black/80 to-transparent z-10 transition-colors duration-300" />
                <img 
                  src="/sobre-sonus.jpg" 
                  alt="Instalação de sistema de áudio e sonorização em auditório corporativo" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 z-20 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/10 p-6 rounded-2xl transition-colors duration-300">
                  <div className="text-5xl font-black text-primary mb-2">+28</div>
                  <div className="text-zinc-800 dark:text-zinc-300 font-medium transition-colors duration-300">Anos de Mercado<br/>CNPJ consolidado</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2} className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight transition-colors duration-300">
                Nossa História, <br />
                <span className="text-primary">Sua Segurança</span>
              </h2>
              <div className="space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg font-light transition-colors duration-300">
                <p>
                  Com 28 anos de atuação sólida e CNPJ original no mercado audiovisual, a Sonus não apenas entrega equipamentos, mas projeta soluções. Nossos 28 anos de mercado são a sua garantia de que entendemos a complexidade de cada ambiente - <strong className="text-zinc-900 dark:text-white font-medium">Seja em um grande auditório, igreja, teatro, sala de reunião, treinamento ou videoconferência de uma multinacional.</strong>
                </p>
                <p>
                  Nossa trajetória une a solidez da experiência prática com a agilidade para adotar as inovações tecnológicas mais confiáveis. Nosso compromisso não termina na entrega, nós somos parceiros do seu sucesso em cada projeto.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  "Projetos Customizados", 
                  "Equipe Especializada", 
                  "Suporte Premium", 
                  "Tecnologia de Ponta"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="text-zinc-800 dark:text-zinc-300 font-medium transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32 relative border-t border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300">
        {/* Imagem de Fundo da Cresol com Baixa Opacidade */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: "url('/cresol.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Máscara de degradê */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-slate-50 dark:from-black via-slate-50/80 dark:via-black/80 to-slate-50 dark:to-black transition-colors duration-300" />

        <div className="container px-4 md:px-6 relative z-10">
          <FadeIn className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6 transition-colors duration-300">
              Vamos conversar sobre o seu <span className="text-primary">Projeto</span>?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg transition-colors duration-300">
              Preencha o formulário abaixo e nossos especialistas entrarão em contato para entender suas necessidades e apresentar a melhor solução.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-3xl mx-auto bg-white/50 dark:bg-zinc-950/50 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transition-colors duration-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-300 transition-colors duration-300">Nome Completo</label>
                  <Input required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10 focus-visible:ring-primary h-12 text-black dark:text-white transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-zinc-800 dark:text-zinc-300 transition-colors duration-300">Telefone / WhatsApp</label>
                  <Input required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10 focus-visible:ring-primary h-12 text-black dark:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-300 transition-colors duration-300">E-mail Profissional</label>
                <Input required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com.br" className="bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10 focus-visible:ring-primary h-12 text-black dark:text-white transition-colors duration-300" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-800 dark:text-zinc-300 transition-colors duration-300">Descrição do Projeto</label>
                <Textarea required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Conte-nos sobre seu projeto..." className="bg-white/50 dark:bg-black/50 border-black/10 dark:border-white/10 focus-visible:ring-primary min-h-[150px] resize-none text-black dark:text-white transition-colors duration-300" />
              </div>

              <div className="flex justify-center pt-2">
                <Turnstile 
                  siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                  onSuccess={(token) => setTurnstileToken(token)} 
                  options={{ theme: 'auto' }} 
                />
              </div>
              
              {submitError && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
                  {submitError}
                </div>
              )}

              <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(41,128,185,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
