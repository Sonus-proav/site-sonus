import { useState, useEffect } from "react"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WarrantyBanner } from "@/components/layout/WarrantyBanner"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { Link } from "react-router-dom"
import { getProjects, optimizeImageUrl, type Project } from "@/lib/publicStorage"
import { 
  VolumeX, 
  Settings2, 
  Video,
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Church,
  MicOff,
  SlidersHorizontal
} from "lucide-react"

export function IgrejasTemplos() {
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "", // Cargo na Igreja
    churchName: "", // Nome da Igreja
    capacity: "", // Capacidade de Fiéis
    phone: "",
    email: "",
    message: "",
    honeypot: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(data => {
      const igrejas = data.filter(p => !p.isHidden && p.category.toLowerCase().includes("igrejas"))
      setProjects(igrejas)
    }).catch(err => console.error("Erro ao carregar projetos de igrejas", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    
    // Fallback de segurança: Se o Turnstile falhar (ex: AdBlocker), passa um bypass para não bloquear clientes reais.
    const finalToken = turnstileToken || "bypass_token";

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Igrejas e Templos" })
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          role: "",
          churchName: "",
          capacity: "",
          phone: "",
          email: "",
          message: "",
          honeypot: ""
        })
      } else {
        const errorData = await response.json().catch(() => null)
        setSubmitError(errorData?.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente.")
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Por favor, verifique sua internet e tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com um especialista sobre o som da minha Igreja.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  const painPoints = [
    {
      icon: <VolumeX className="w-8 h-8 text-amber-500" />,
      title: "A Palavra Incompreendida",
      description: "Excesso de reverberação (eco) e som embolado que fazem os fiéis perderem partes essenciais da pregação."
    },
    {
      icon: <MicOff className="w-8 h-8 text-amber-500" />,
      title: "Louvor com Interrupções",
      description: "Microfonias inesperadas, chiados e falhas técnicas que quebram o clima espiritual nos momentos mais importantes."
    },
    {
      icon: <SlidersHorizontal className="w-8 h-8 text-amber-500" />,
      title: "Sistemas Complexos Demais",
      description: "Mesas de som cheias de botões que deixam a equipe de voluntários insegura e geram erros frequentes durante o culto."
    }
  ]

  const solutions = [
    {
      title: "Soluções na Medida Certa",
      description: "De sistemas de áudio simples, fáceis de operar por voluntários, até tecnologias avançadas como QSC e Q-SYS — os mesmos sistemas que sonorizam o gigantesco Santuário Nacional de Nossa Senhora Aparecida. Entregamos exatamente o que a sua igreja precisa.",
      icon: <Settings2 className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Arquitetura Respeitada",
      description: "Nossas caixas de som e projetos acústicos são desenhados para não poluir o visual do altar ou esconder seus vitrais. Tecnologia invisível para uma experiência elevada.",
      icon: <Church className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Integração de Vídeo para Transmissões",
      description: "Soluções completas com câmeras PTZ robóticas e áudio integrados para transmissões ao vivo de cultos e missas com qualidade de TV.",
      icon: <Video className="w-6 h-6 text-amber-400" />
    }
  ]

  const fallbackPortfolio: any[] = [
    {
      title: "Matriz de Xanxerê",
      state: "SC",
      image: "/interior-matriz-xanxere.jpg",
      description: "Projeto completo de sonorização focado na inteligibilidade da palavra falada, respeitando a arquitetura histórica do templo e proporcionando cobertura sonora uniforme para todos os fiéis."
    },
    {
      title: "Matriz de Concórdia",
      state: "SC",
      image: "/concordia.jpg",
      description: "Modernização do sistema de áudio com alinhamento acústico para reduzir a reverberação natural (eco), garantindo clareza absoluta desde a primeira até a última fileira de bancos."
    },
    {
      title: "Matriz de Pato Branco",
      state: "PR",
      image: "/pato-branco.jpg",
      description: "Implementação de tecnologia de processamento digital, eliminando microfonias indesejadas e facilitando o controle diário do áudio para a equipe de voluntários durante os cultos e louvores."
    }
  ]

  const displayPortfolio = projects.length > 0 ? projects : fallbackPortfolio

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      <SEO 
        title="Sonorização para Igrejas e Templos | Sonus Pro AV" 
        description="A mensagem de fé precisa ser ouvida com clareza. Soluções audiovisuais premium para igrejas, com foco em inteligibilidade e operação simplificada para voluntários." 
        image="/interior-matriz-xanxere.jpg"
        url="https://sonusproaudio.com.br/igrejas-e-templos"
        keywords="sonorização para igrejas, som para templo religioso, projeto acústico igreja matriz, resolver eco na igreja, sistema de som para louvor, automação Q-SYS igreja, sonorização templo, projeto de som igreja"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sonorização para Igrejas e Templos",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Sonus Pro AV"
          },
          "description": "Projetos acústicos e de sonorização focados na inteligibilidade para igrejas e templos.",
          "areaServed": "Brazil"
        }}
      />

      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center text-center min-h-[90vh] justify-center border-b border-white/5">
          <FadeIn className="max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <Church className="w-4 h-4" />
              <span>Soluções para o Nicho Religioso</span>
            </div>
            
            <h1 className="text-4xl md:text-4xl md:text-6xl lg:text-7xl text-balance font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500 leading-tight pb-2">
              A mensagem de fé precisa ser ouvida com clareza em todos os cantos do templo.
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
              O fim das microfonias, do som embolado e da complexidade. Entregamos excelência acústica com <strong className="text-white font-medium">controle simplificado</strong> para que seus voluntários operem sem medo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button 
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-medium shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)] transition-all hover:scale-105 h-auto whitespace-normal"
              >
                Agendar Consultoria para Meu Templo
                <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto rounded-full px-6 py-4 md:px-8 md:py-6 text-base md:text-lg font-medium border-white/10 hover:bg-white/5 h-auto"
              >
                Falar no WhatsApp
              </Button>
            </div>
          </FadeIn>
        </section>

        {/* Agitação - Dores */}
        <section className="py-12 md:py-24 px-4 bg-zinc-950/50 border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
                Os maiores obstáculos para uma <br className="hidden md:block"/><span className="text-amber-500">experiência espiritual imersiva</span>
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {painPoints.map((point, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:bg-white/[0.07] transition-colors duration-300 group">
                    <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {point.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{point.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{point.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Solução */}
        <section className="py-12 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <FadeIn>
                <h2 className="text-3xl md:text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                  A Tecnologia que <span className="text-amber-500">Serve ao Propósito</span>
                </h2>
                <p className="text-xl text-zinc-400 mb-10 font-light leading-relaxed">
                  Transformamos a complexidade de um sistema profissional em uma interface simples, elegante e invisível aos olhos, mas perfeitamente nítida aos ouvidos.
                </p>
                
                <div className="space-y-8">
                  {solutions.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1 bg-amber-500/10 p-3 rounded-xl h-fit border border-amber-500/20">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2} className="relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900 relative shadow-2xl">
                  {/* Placeholder for Church Audio System Image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-transparent z-10 mix-blend-overlay" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
                    <SlidersHorizontal className="w-24 h-24 text-amber-500/20 mb-6" />
                    <p className="text-zinc-500 font-medium">Interface Touch Q-SYS Simplificada</p>
                    <div className="mt-8 bg-amber-500/20 border border-amber-500/30 px-6 py-3 rounded-full text-amber-400 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Modo Culto de Domingo Ativado
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Prova Social */}
        <section className="py-12 md:py-24 px-4 bg-zinc-950/80 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-3xl md:text-5xl font-bold mb-6 tracking-tight">Nosso Histórico de Fé</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                A Sonus tem sido a escolha de confiança para a modernização acústica das maiores paróquias e matrizes da nossa região. Projetos entregues com respeito ao sagrado e excelência técnica.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPortfolio.map((item, index) => (
                <FadeIn key={item.id || index} delay={index * 0.1} className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col hover:bg-white/[0.07] transition-all duration-300 group shadow-lg">
                    {/* Imagem do Projeto */}
                    <div className="relative aspect-video overflow-hidden bg-zinc-900 flex items-center justify-center border-b border-white/5">
                      <img 
                        src={optimizeImageUrl(item.image)} 
                        alt={item.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Crect fill='%23111' width='800' height='400'/%3E%3Ctext fill='%23555' x='50%25' y='50%25' font-family='sans-serif' font-size='24' text-anchor='middle' alignment-baseline='middle'%3EImagem a Caminho%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      {/* Gradiente sobre a imagem */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Badge do Estado */}
                      {item.state && (
                        <div className="absolute bottom-4 left-4">
                          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-semibold text-white shadow-sm tracking-wide uppercase">
                            {item.state}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Conteúdo Textual */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-sm flex-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            
            <FadeIn delay={0.4} className="mt-16 text-center">
              <Link to="/projetos" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
                Ver Portfólio Completo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Autoridade */}
        <section className="py-12 md:py-24 px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <FadeIn>
              <ShieldCheck className="w-16 h-16 text-amber-500 mx-auto mb-8" />
              <h2 className="text-3xl md:text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                28 Anos de Tradição e Excelência
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-12">
                Nós não empurramos caixas de som. Entregamos um <strong className="text-white">projeto acústico avançado</strong> focado no conforto dos fiéis e na durabilidade do dízimo investido, evitando que sua igreja precise refazer o som a cada 5 anos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Warranty Banner (Estratégico) */}
        <WarrantyBanner 
          variant="church"
          title="3 Anos de Garantia para o Seu Ministério"
          description="Sabemos da importância de cada investimento feito pela igreja. Por isso, entregamos 3 anos de garantia total sobre qualquer defeito de instalação. Infraestrutura segura para que a mensagem seja sempre transmitida com clareza."
        />

        {/* CTA / Formulário */}
        <section id="contato" className="py-12 md:py-24 px-4 relative">
          <div className="absolute inset-0 bg-amber-900/10 blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-3xl md:text-5xl font-bold mb-4 tracking-tight">Pronto para elevar a mensagem?</h2>
              <p className="text-zinc-400 text-lg">Preencha os dados abaixo e agende uma consultoria especializada para o seu templo.</p>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-6 md:p-12 shadow-2xl">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Solicitação Enviada!</h3>
                  <p className="text-zinc-400 mb-8">Nossa equipe de especialistas entrará em contato em breve para entender as necessidades da sua igreja.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
                    Enviar nova solicitação
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Honeypot Invisível */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-zinc-300">Nome Completo</label>
                      <Input 
                        id="name" 
                        required 
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium text-zinc-300">Cargo na Igreja</label>
                      <Input 
                        id="role" 
                        required 
                        placeholder="Ex: Pastor, Padre, Técnico, Conselho"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="churchName" className="text-sm font-medium text-zinc-300">Nome da Igreja / Templo</label>
                      <Input 
                        id="churchName" 
                        required 
                        placeholder="Ex: Igreja Matriz São José"
                        value={formData.churchName}
                        onChange={(e) => setFormData({...formData, churchName: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="capacity" className="text-sm font-medium text-zinc-300">Capacidade de Fiéis (Aprox.)</label>
                      <Input 
                        id="capacity" 
                        required 
                        placeholder="Ex: 500 pessoas"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
                      <Input 
                        id="phone" 
                        required 
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-zinc-300">E-mail Profissional</label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-black/50 border-white/10 focus-visible:ring-amber-500 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-zinc-300">Descrição do Problema Atual</label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="Conte um pouco sobre as dificuldades com o som ou vídeo atualmente..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-black/50 border-white/10 focus-visible:ring-amber-500 min-h-[120px] rounded-xl resize-none"
                    />
                  </div>

                  <div className="flex justify-center pt-2 min-h-[65px]">
                    <Turnstile 
                      siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                      onSuccess={(token) => {
                        setSubmitError("");
                        setTurnstileToken(token);
                      }}
                      onError={() => setSubmitError("Erro ao carregar o sistema de segurança. Verifique se o domínio está liberado no Cloudflare ou desative seu Adblocker.")}
                      onExpire={() => setTurnstileToken("")}
                      options={{ theme: 'auto' }} 
                    />
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>{submitError}</p>
                    </div>
                  )}

                  <Button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white h-14 rounded-xl text-lg font-medium shadow-[0_0_20px_-5px_rgba(217,119,6,0.4)] transition-all hover:scale-[1.02]"
                  >
                    {isSubmitting ? "Enviando Solicitação..." : "Falar com um Especialista de Som"}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
