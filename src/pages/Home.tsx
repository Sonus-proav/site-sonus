import { useState } from "react"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Play, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

export function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const phoneNumber = "554635237192"
    const text = `*Novo Pedido de Orçamento - Sonus*
*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*E-mail:* ${formData.email}

*Descrição do Projeto:*
${formData.message}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Imagem de Fundo com Baixa Opacidade */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          style={{
            backgroundImage: "url('/sobre-sonus.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Máscaras de degradê para mesclar a imagem suavemente com o fundo */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/60 dark:from-black/60 via-transparent to-slate-50 dark:to-black transition-colors duration-300" />
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-slate-50/80 dark:from-black/80 via-transparent to-slate-50/80 dark:to-black/80 transition-colors duration-300" />

        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] opacity-40 pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-40 pointer-events-none z-0" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <FadeIn className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-primary mb-4 backdrop-blur-md transition-colors duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium tracking-wide">28 Anos de Tradição e Inovação</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-black dark:text-white leading-tight transition-colors duration-300">
              Som e Vídeo que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Transformam Ambientes</span>
            </h1>
            
            <div className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed space-y-3 sm:space-y-4 px-2 text-balance transition-colors duration-300">
              <p className="font-normal text-zinc-800 dark:text-zinc-300">
                Há 28 anos projetando e implantando o melhor.
              </p>
              <p>
                Projetos personalizados e automatizados para Auditórios, Igrejas, Reunião Online, Salas de Treinamento e Teatros.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <a href="#contato" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base font-semibold px-8 h-14 rounded-full shadow-[0_0_20px_rgba(41,128,185,0.4)] hover:shadow-[0_0_30px_rgba(41,128,185,0.6)] transition-all">
                  Inicie Seu Projeto Conosco
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/projetos" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base font-medium px-8 h-14 rounded-full bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all">
                  <Play className="mr-2 h-5 w-5 text-primary" />
                  Explore Nossos Projetos
                </Button>
              </Link>
            </div>
          </FadeIn>
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
                  Com <strong className="text-zinc-900 dark:text-white font-medium">28 anos de atuação sólida</strong> e <strong className="text-zinc-900 dark:text-white font-medium">CNPJ original</strong> no mercado audiovisual, a Sonus não apenas entrega equipamentos, mas <strong className="text-primary font-medium">engenha soluções</strong>. Nossos 28 anos de mercado são a sua garantia de que entendemos a complexidade de cada ambiente — Seja em um grande <strong className="text-zinc-900 dark:text-white font-medium">auditório, igreja ou uma sala de reunião</strong>, treinamento e videoconferência de uma multinacional.
                </p>
                <p>
                  Nossa trajetória une a solidez da experiência prática com a agilidade para adotar as inovações tecnológicas mais confiáveis. Nosso compromisso não termina na entrega, nós somos <strong className="text-primary font-medium">parceiros do seu sucesso</strong> em cada projeto.
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
              <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(41,128,185,0.3)] transition-all">
                Enviar
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
