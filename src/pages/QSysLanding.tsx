import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Cpu, Layers, Settings, ChevronRight, Video, Mic, Sliders, CheckCircle2, Play } from "lucide-react"
import { Helmet } from "react-helmet-async"

export function QSysLanding() {
  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de saber mais sobre o Ecossistema Q-SYS para o meu projeto.`
    window.open(`https://wa.me/554635237192?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Helmet>
        <title>Ecossistema Q-SYS | Automação e Controle Absoluto | Sonus</title>
        <meta name="description" content="Projetos profissionais com o Ecossistema Q-SYS. Controle de áudio, vídeo e automação centralizada com interface de alto padrão." />
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[150px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-6 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <FadeIn className="max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-300">Integração Certificada Sonus + Q-SYS</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-[1.1]">
            O Futuro do Controle <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Audiovisual.</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-3xl text-balance leading-relaxed">
            Áudio, vídeo e automação processados de forma centralizada por software. A plataforma mais poderosa e flexível para auditórios, espaços corporativos e grandes templos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
            <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
              Solicite um Orçamento
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-xl text-lg font-medium transition-all">
              Conheça o Sistema <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </FadeIn>

        {/* Hero Image / Touch Panel Mockup */}
        <FadeIn delay={0.2} className="w-full max-w-6xl mx-auto mt-20 relative">
          <div className="relative rounded-[2.5rem] p-4 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="rounded-[2rem] overflow-hidden bg-black relative aspect-video md:aspect-[21/9]">
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="text-center space-y-6 p-8">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-2xl mx-auto flex items-center justify-center border border-white/5">
                    <Sliders className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Interface Q-SYS Touch</div>
                  <h3 className="text-2xl md:text-3xl text-white font-bold">Design Personalizado pela Sonus</h3>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Feature Grid - Glassmorphism */}
      <section className="py-32 px-4 md:px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Por que escolher o Ecossistema Q-SYS?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light text-balance">
              Abandone a complexidade de dezenas de equipamentos desconectados. O Q-SYS unifica tudo em um único cérebro digital, infinitamente expansível.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-blue-400" />,
                title: "Processamento por Software",
                desc: "Construído sobre infraestrutura de TI padrão (Intel/Linux), eliminando o hardware proprietário engessado. Mais poder, menos caixas."
              },
              {
                icon: <Layers className="w-8 h-8 text-cyan-400" />,
                title: "Áudio, Vídeo e Controle",
                desc: "O único ecossistema que trata áudio, vídeo de rede (AV-over-IP) e automação de controle em um único motor, nativamente."
              },
              {
                icon: <Settings className="w-8 h-8 text-purple-400" />,
                title: "Automação Ilimitada",
                desc: "Integre iluminação, ar-condicionado, cortinas e painéis de LED através de plugins, gerenciando tudo em telas Touch customizadas."
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] transition-colors duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios - Horizontal Layout */}
      <section className="py-32 px-4 md:px-6 z-10 relative bg-white/5 border-y border-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm border border-blue-500/20">
                Experiência de Usuário
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Um Toque. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">A Sala Perfeita.</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Imagine entrar em um auditório, tocar no painel de controle e automaticamente: as luzes dimerizam, as cortinas fecham, os microfones ativam, o projetor liga e a câmera foca no palco. 
                <br /><br />
                A Sonus desenha a interface sob medida para que qualquer pessoa consiga operar sistemas complexos com a facilidade de usar um smartphone.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: <Mic className="w-5 h-5" />, text: "Cancelamento de Eco Acústico (AEC) Inteligente" },
                  { icon: <Video className="w-5 h-5" />, text: "Câmeras PTZ com Rastreamento de Voz Automático" },
                  { icon: <Sliders className="w-5 h-5" />, text: "Telas Touch com a Identidade Visual da sua Empresa" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-zinc-300 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div className="p-2 bg-white/10 rounded-lg text-blue-400">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="relative">
              <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-zinc-800 to-black p-1 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="w-full h-full rounded-[2.8rem] bg-zinc-950 border border-white/5 overflow-hidden flex flex-col relative z-10">
                  {/* Faux UI */}
                  <div className="h-16 border-b border-white/10 flex items-center px-8 bg-white/[0.02]">
                    <div className="font-semibold text-lg text-zinc-200">Painel de Controle</div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-500/30 transition-colors">
                        <Play className="w-8 h-8 text-blue-400" />
                        <span className="font-medium text-blue-200 text-sm">Modo Apresentação</span>
                      </div>
                      <div className="h-32 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
                        <Video className="w-8 h-8 text-zinc-400" />
                        <span className="font-medium text-zinc-300 text-sm">Videoconferência</span>
                      </div>
                    </div>
                    <div className="space-y-4 pt-6">
                      <div className="flex justify-between text-sm text-zinc-400 font-medium">
                        <span>Volume Principal</span>
                        <span>75%</span>
                      </div>
                      <div className="h-4 bg-black rounded-full overflow-hidden border border-white/10">
                        <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-6 z-10 relative">
        <FadeIn className="max-w-4xl mx-auto">
          <div className="rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-600 to-purple-700 text-center relative overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(37,99,235,0.3)]">
            {/* Glass Highlights */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-b-[100%] blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Engenharia de Ponta.<br />
                Padrão Sonus de Qualidade.
              </h2>
              <p className="text-xl text-white/80 font-light max-w-2xl text-balance">
                Não somos apenas revendedores, somos engenheiros. Desenhamos a arquitetura de rede, programamos a automação e customizamos a interface gráfica para a realidade do seu espaço.
              </p>
              
              <div className="pt-8 w-full sm:w-auto">
                <Button onClick={handleWhatsApp} size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-white text-blue-700 hover:bg-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all w-full sm:w-auto">
                  Consultoria Gratuita Q-SYS
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-8 text-white/60 text-sm font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Certificação Q-SYS Nível 2</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Projetos em todo Brasil</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Programação LUA Customizada</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
