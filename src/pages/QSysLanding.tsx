import { useState } from "react"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Cpu, Layers, Settings, ChevronRight, Video, Mic, Sliders, CheckCircle2, Play, BrainCircuit, Wifi, Battery, Thermometer, Lightbulb, Volume2, Camera, MonitorPlay, Power, Lock, Unlock, ShieldCheck } from "lucide-react"
import { Helmet } from "react-helmet-async"

export function QSysLanding() {
  const [activeScene, setActiveScene] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(75)
  const [showAdminKeypad, setShowAdminKeypad] = useState(false)
  const [adminPin, setAdminPin] = useState("")
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [activeFauxScene, setActiveFauxScene] = useState<"presentation" | "video">("presentation")

  const scenesData = [
    { title: "Apresentação", color: "from-blue-600 to-cyan-500", temp: "22°", light: "40%", vol: 75, activeColor: "rgba(56,189,248,1)" },
    { title: "Videochamada", color: "from-purple-600 to-pink-500", temp: "20°", light: "70%", vol: 60, activeColor: "rgba(236,72,153,1)" },
    { title: "Modo Cinema", color: "from-amber-500 to-orange-500", temp: "24°", light: "10%", vol: 85, activeColor: "rgba(249,115,22,1)" },
    { title: "Iluminação Total", color: "from-zinc-500 to-zinc-700", temp: "23°", light: "100%", vol: 50, activeColor: "rgba(161,161,170,1)" },
  ]

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      </div>

      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex items-center justify-between">
        <a href="/" className="hover:opacity-80 transition-opacity" aria-label="Voltar para a Página Inicial">
          <img src="/logo.png" alt="Logo Sonus" width="120" height="32" className="h-6 md:h-8 w-auto brightness-0 invert opacity-90" />
        </a>
      </header>

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

          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-[1.1]">
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
        <FadeIn delay={0.2} className="w-full max-w-5xl mx-auto mt-20 relative">
          <div className="relative rounded-[2.5rem] p-2 md:p-4 bg-white/[0.08] border border-white/20 shadow-2xl ring-1 ring-white/10 group">
            {/* Efeito de brilho de tela no fundo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-500/20 opacity-50 rounded-[2.5rem]" />
            
            <div className="rounded-[2rem] overflow-hidden bg-zinc-950 relative w-full flex flex-col border border-white/10 shadow-inner min-h-[600px]">
              
              <div className="h-10 md:h-14 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                  <span className="font-semibold text-zinc-300 text-[clamp(10px,1.5vw,14px)] tracking-widest uppercase">Auditório Principal</span>
                </div>
                <div className="flex items-center gap-3 md:gap-5 text-zinc-400">
                  <Wifi className="w-4 h-4" aria-label="Sinal WiFi" />
                  <Battery className="w-4 h-4" aria-label="Bateria" />
                  <span className="text-[clamp(10px,1.5vw,14px)] font-bold text-zinc-300">14:30</span>
                </div>
              </div>

              {/* Main Content Dashboard */}
              <div className="flex-1 flex flex-col md:flex-row p-3 md:p-6 gap-3 md:gap-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
                
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden shrink-0">
                  <div className="flex flex-row md:flex-col gap-2 md:gap-3 shrink-0">
                    {[
                      { icon: <MonitorPlay className="w-5 h-5 md:w-6 md:h-6" />, label: "Cenários", active: true },
                      { icon: <Volume2 className="w-5 h-5 md:w-6 md:h-6" />, label: "Áudio" },
                      { icon: <Camera className="w-5 h-5 md:w-6 md:h-6" />, label: "Câmeras PTZ" },
                      { icon: <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />, label: "Iluminação" },
                      { icon: <Thermometer className="w-5 h-5 md:w-6 md:h-6" />, label: "Climatização" },
                    ].map((item, i) => (
                      <button key={i} aria-label={item.label} className={`flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all min-h-[48px] min-w-[48px] shrink-0 ${item.active ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5'}`}>
                        <div className="shrink-0">{item.icon}</div>
                        <span className="hidden md:block font-medium text-[clamp(12px,1.5vw,16px)]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="md:mt-auto flex flex-row md:flex-col gap-2 md:gap-3 shrink-0 border-l md:border-l-0 md:border-t border-white/10 pl-2 md:pl-0 md:pt-4 ml-1 md:ml-0">
                    <button 
                      onClick={() => setShowAdminKeypad(!showAdminKeypad)}
                      aria-label="Painel Administrativo"
                      className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 min-h-[48px] min-w-[48px] shrink-0 rounded-xl md:rounded-2xl transition-all border ${showAdminKeypad ? 'bg-zinc-800 text-white border-zinc-600 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-black/20 text-zinc-400 hover:bg-white/10 hover:text-white border-transparent hover:border-white/5'}`}
                    >
                      {isAdminUnlocked ? <Unlock className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-green-400" /> : <Lock className="w-5 h-5 md:w-6 md:h-6 shrink-0" />}
                      <span className="hidden md:block font-bold">Admin</span>
                    </button>
                    <button aria-label="Desligar Sala" className="w-full min-h-[48px] min-w-[48px] shrink-0 flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20">
                      <Power className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                      <span className="hidden md:block font-bold">Desligar Sala</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Área Interativa */}
                {showAdminKeypad ? (
                  <div className="flex-1 flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 relative overflow-hidden">
                    {!isAdminUnlocked ? (
                      <div className="max-w-[240px] w-full animate-in fade-in zoom-in duration-300">
                        <div className="text-center mb-4">
                          <h3 className="text-zinc-300 font-bold tracking-widest uppercase mb-1 text-sm">Acesso Restrito</h3>
                          <p className="text-zinc-400 text-[10px] uppercase tracking-widest">Insira o PIN (1234)</p>
                        </div>
                        
                        <div className={`flex justify-center gap-3 mb-6 transition-transform ${pinError ? 'translate-x-1' : ''}`}>
                          {[0,1,2,3].map(idx => (
                            <div key={idx} className={`w-3 h-3 rounded-full border-2 transition-all ${idx < adminPin.length ? (pinError ? 'bg-red-500 border-red-500' : 'bg-blue-500 border-blue-500') : 'border-zinc-700 bg-transparent'}`} />
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          {[1,2,3,4,5,6,7,8,9].map(num => (
                            <button key={num} onClick={() => {
                              if (adminPin.length < 4) {
                                const newPin = adminPin + num.toString();
                                setAdminPin(newPin);
                                if (newPin.length === 4) {
                                  if (newPin === "1234") {
                                    setTimeout(() => setIsAdminUnlocked(true), 300);
                                  } else {
                                    setPinError(true);
                                    setTimeout(() => { setAdminPin(""); setPinError(false); }, 800);
                                  }
                                }
                              }
                            }} aria-label={`Dígito ${num}`} className="min-h-[48px] h-10 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 active:bg-blue-600 active:scale-95 transition-all text-lg font-medium text-white border border-white/5">
                              {num}
                            </button>
                          ))}
                          <button onClick={() => setAdminPin("")} aria-label="Limpar Senha" className="min-h-[48px] h-10 md:h-12 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:scale-95 transition-all text-red-400 flex items-center justify-center border border-red-500/20 font-bold">
                            C
                          </button>
                          <button onClick={() => {
                            if (adminPin.length < 4) {
                                const newPin = adminPin + "0";
                                setAdminPin(newPin);
                                if (newPin.length === 4) {
                                  if (newPin === "1234") {
                                    setTimeout(() => setIsAdminUnlocked(true), 300);
                                  } else {
                                    setPinError(true);
                                    setTimeout(() => { setAdminPin(""); setPinError(false); }, 800);
                                  }
                                }
                              }
                          }} aria-label="Dígito 0" className="min-h-[48px] h-10 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 active:bg-blue-600 active:scale-95 transition-all text-lg font-medium text-white border border-white/5">
                            0
                          </button>
                          <button onClick={() => setShowAdminKeypad(false)} aria-label="Fechar Teclado Numérico" className="min-h-[48px] h-10 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-zinc-400 flex items-center justify-center border border-white/5 font-bold">
                            X
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-2 md:gap-3 text-green-400">
                            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="font-bold tracking-widest uppercase text-xs md:text-sm">Modo Engenharia</span>
                          </div>
                          <button aria-label="Sair do Modo de Engenharia" onClick={() => { setIsAdminUnlocked(false); setShowAdminKeypad(false); setAdminPin(""); }} className="text-zinc-400 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase border border-zinc-700 px-3 py-1 rounded-full min-h-[32px]">
                            Sair
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 md:gap-4 flex-1">
                          {[
                            { title: "Diagnóstico de Rede", status: "Online", color: "text-green-400" },
                            { title: "Calibração DSP", status: "Ideal", color: "text-blue-400" },
                            { title: "Update de Firmware", status: "v4.2.1", color: "text-zinc-400" },
                            { title: "Matriz de Vídeo", status: "Ativa", color: "text-purple-400" },
                            { title: "Logs do Sistema", status: "Limpo", color: "text-zinc-400" },
                            { title: "Reiniciar Core", status: "Pronto", color: "text-red-400" },
                          ].map((cfg, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-3 md:p-4 flex flex-col justify-between hover:bg-white/[0.05] transition-colors cursor-pointer active:scale-95 group">
                              <span className="text-[10px] md:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{cfg.title}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${cfg.color}`}>{cfg.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 animate-in fade-in duration-300">
                  {/* Cenários Rápidos */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col">
                    <h3 className="text-zinc-400 font-semibold mb-3 md:mb-4 tracking-widest uppercase text-[10px] md:text-xs">Cenários Rápidos</h3>
                    <div className="grid grid-cols-2 gap-2 md:gap-3 flex-1">
                      {scenesData.map((scene, i) => (
                        <div 
                          key={i} 
                          onClick={() => {
                            setActiveScene(i);
                            setCurrentVolume(scene.vol);
                          }}
                          className={`relative rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col justify-end overflow-hidden cursor-pointer group transition-all duration-300 ${activeScene === i ? 'ring-2 ring-white shadow-lg scale-[1.02]' : 'border border-white/10 hover:border-white/30'}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${scene.color} transition-opacity duration-500`} style={{ opacity: activeScene === i ? 0.3 : 0.1 }} />
                          <div className={`absolute inset-0 bg-gradient-to-br ${scene.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                          <span className="relative z-10 font-bold text-[clamp(10px,1.2vw,14px)] text-zinc-100 leading-tight">{scene.title}</span>
                          {activeScene === i && <div className="absolute top-2 right-2 md:top-3 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white transition-all" style={{ boxShadow: `0 0 10px ${scene.activeColor}` }} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controles Ativos */}
                  <div className="flex flex-col gap-3 md:gap-6">
                    {/* Volume Control */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-3 md:mb-5">
                        <span className="text-zinc-400 font-semibold uppercase tracking-widest text-[clamp(9px,1.2vw,12px)]">Volume Mestre</span>
                        <span className="text-blue-400 font-black text-[clamp(14px,1.5vw,20px)] transition-all duration-300">{currentVolume}%</span>
                      </div>
                      <div 
                        className="h-8 md:h-12 bg-black/60 rounded-full p-1 border border-white/10 relative cursor-pointer shadow-inner group"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                          const newVol = Math.round((x / rect.width) * 100);
                          setCurrentVolume(newVol);
                        }}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full relative shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-end pr-1 transition-all duration-300 ease-out" 
                          style={{ width: `${currentVolume}%` }}
                        >
                          <div className="w-6 h-6 md:w-10 md:h-10 bg-white rounded-full shadow-md scale-95 group-active:scale-110 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Sensores / Clima */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6 flex-1">
                      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20"><Thermometer className="w-12 h-12 text-orange-500" /></div>
                        <Thermometer className="w-6 h-6 md:w-8 md:h-8 text-orange-400 relative z-10" />
                        <span className="text-[clamp(16px,2vw,30px)] font-black text-white relative z-10 transition-all duration-500">{scenesData[activeScene].temp}</span>
                        <span className="text-[clamp(9px,1vw,12px)] text-orange-200/60 font-bold uppercase tracking-widest relative z-10">Clima</span>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-400/10 to-amber-500/5 border border-yellow-400/20 rounded-2xl md:rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20"><Lightbulb className="w-12 h-12 text-yellow-400" /></div>
                        <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 relative z-10" />
                        <span className="text-[clamp(16px,2vw,30px)] font-black text-white relative z-10 transition-all duration-500">{scenesData[activeScene].light}</span>
                        <span className="text-[clamp(9px,1vw,12px)] text-yellow-200/60 font-bold uppercase tracking-widest relative z-10">Luzes</span>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
              
              {/* Reflexo de Tela (Glossy Overlay) */}
              <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Feature Grid - Glassmorphism */}
      <section className="py-32 px-4 md:px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Por que escolher o Ecossistema Q-SYS?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light text-balance">
              Abandone a complexidade de dezenas de equipamentos desconectados. O Q-SYS unifica tudo em um único cérebro digital, infinitamente expansível.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-blue-400" />,
                title: "Processamento por Software",
                desc: "Construído sobre infraestrutura de TI padrão (Intel/Linux), eliminando hardware engessado. Mais poder, menos caixas."
              },
              {
                icon: <Layers className="w-8 h-8 text-cyan-400" />,
                title: "Áudio, Vídeo e Controle",
                desc: "O único ecossistema que trata áudio, vídeo de rede e automação em um único motor, nativamente."
              },
              {
                icon: <Settings className="w-8 h-8 text-purple-400" />,
                title: "Automação Ilimitada",
                desc: "Integre iluminação, ar-condicionado, cortinas e painéis de LED gerenciando tudo em telas Touch customizadas."
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-emerald-400" />,
                title: "IA e Sensores Inteligentes",
                desc: "Câmeras com rastreamento por Inteligência Artificial e sensores que preparam a sala automaticamente antes de você entrar."
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full rounded-3xl p-8 bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-colors duration-300 group shadow-lg">
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
      <section className="py-32 px-4 md:px-6 z-10 relative bg-white/[0.03] border-y border-white/5 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm border border-blue-500/20">
                Experiência de Usuário
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
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
                  { icon: <BrainCircuit className="w-5 h-5" />, text: "Câmeras PTZ com Rastreamento IA e Facial" },
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent mix-blend-screen" />
                <div className="w-full h-full rounded-[2.8rem] bg-zinc-950 border border-white/5 overflow-hidden flex flex-col relative z-10 shadow-inner">
                  {/* Faux UI */}
                  <div className="h-16 border-b border-white/10 flex items-center px-8 bg-white/[0.02]">
                    <div className="font-semibold text-lg text-zinc-200">Painel de Controle</div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div onClick={() => setActiveFauxScene("presentation")} className={`h-32 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center px-2 ${activeFauxScene === "presentation" ? 'bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                        <Play className={`w-8 h-8 transition-colors ${activeFauxScene === "presentation" ? 'text-blue-400' : 'text-zinc-500'}`} />
                        <span className={`font-medium text-[clamp(10px,1.2vw,14px)] transition-colors ${activeFauxScene === "presentation" ? 'text-blue-200' : 'text-zinc-400'}`}>Modo Apresentação</span>
                      </div>
                      <div onClick={() => setActiveFauxScene("video")} className={`h-32 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center px-2 ${activeFauxScene === "video" ? 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                        <Video className={`w-8 h-8 transition-colors ${activeFauxScene === "video" ? 'text-purple-400' : 'text-zinc-500'}`} />
                        <span className={`font-medium text-[clamp(10px,1.2vw,14px)] transition-colors ${activeFauxScene === "video" ? 'text-purple-200' : 'text-zinc-400'}`}>Videochamada</span>
                      </div>
                    </div>
                    <div className="space-y-4 pt-6">
                      <div className="flex justify-between text-sm text-zinc-400 font-medium">
                        <span>Volume Principal</span>
                        <span className="transition-all duration-500">{activeFauxScene === "presentation" ? '75%' : '60%'}</span>
                      </div>
                      <div className="h-4 bg-black rounded-full overflow-hidden border border-white/10">
                        <div className={`h-full transition-all duration-1000 ease-out rounded-full ${activeFauxScene === "presentation" ? 'w-[75%] bg-gradient-to-r from-blue-500 to-cyan-400' : 'w-[60%] bg-gradient-to-r from-purple-500 to-pink-400'}`} />
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
          <div className="rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-600 to-purple-700 text-center relative overflow-hidden border border-white/20 shadow-2xl">
            {/* Glass Highlights */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Engenharia de Ponta.<br />
                Padrão Sonus de Qualidade.
              </h2>
              <p className="text-xl text-white/80 font-light max-w-2xl text-balance">
                Não somos apenas revendedores, somos engenheiros. Desenhamos a arquitetura de rede, programamos a automação e customizamos a interface gráfica para a realidade do seu espaço.
              </p>
              
              <div className="pt-8 w-full sm:w-auto">
                <Button onClick={handleWhatsApp} size="lg" className="h-16 px-4 md:px-10 text-[clamp(14px,2vw,20px)] font-bold rounded-full bg-white text-blue-700 hover:bg-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all w-full flex items-center justify-center whitespace-nowrap">
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

      {/* Minimal Footer */}
      <footer className="py-8 text-center text-zinc-400 text-sm border-t border-white/5 relative z-10 bg-black/20">
        <p>&copy; {new Date().getFullYear()} Sonus Áudio e Vídeo Profissional. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
