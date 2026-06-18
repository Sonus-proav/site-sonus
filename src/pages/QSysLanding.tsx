import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { FadeIn } from "@/components/ui/FadeIn"
import { Cpu, Layers, Settings, ChevronRight, Video, Mic, Sliders, CheckCircle2, Play, BrainCircuit, Wifi, Battery, Thermometer, Lightbulb, Volume2, Camera, MonitorPlay, Power, Lock, Unlock, ShieldCheck, ChevronUp, ChevronDown, ChevronLeft, VolumeX, MicOff, Target, Plus, Minus, Fan, Globe, Zap, Bot } from "lucide-react"
import { SEO } from "../components/SEO"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
export function QSysLanding() {
  const [activeScene, setActiveScene] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(75)
  const [showAdminKeypad, setShowAdminKeypad] = useState(false)
  const [adminPin, setAdminPin] = useState("")
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [activeFauxScene, setActiveFauxScene] = useState<"presentation" | "video">("presentation")

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    setIsSubmitting(true)
    setSubmitError("")
    
    const finalToken = turnstileToken || "bypass_token"

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Q-SYS" })
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" })
      } else {
        const err = await response.json()
        setSubmitError(err.error || "Erro ao enviar a mensagem.")
      }
    } catch (error) {
      setSubmitError("Erro de conexão. Tente novamente ou use o WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // New States for Interactive Tabs
  const [activeTab, setActiveTab] = useState("Cenários")
  const [audioLevels, setAudioLevels] = useState({ mic1: 80, mic2: 60, pc: 100 })
  const [lightLevels, setLightLevels] = useState({ palco: 100, plateia: 40, sanca: 80 })
  const [hvacTemp, setHvacTemp] = useState(22)
  const [cameraPreset, setCameraPreset] = useState("Palco")
  const [activeCamera, setActiveCamera] = useState("CAM 1")
  const [aiTracking, setAiTracking] = useState(false)

  const scenesData = [
    { title: "Apresentação", color: "from-blue-600 to-cyan-500", temp: "22°", light: "40%", vol: 75, activeColor: "rgba(56,189,248,1)" },
    { title: "Videochamada", color: "from-purple-600 to-pink-500", temp: "20°", light: "70%", vol: 60, activeColor: "rgba(236,72,153,1)" },
    { title: "Modo Cinema", color: "from-amber-500 to-orange-500", temp: "24°", light: "10%", vol: 85, activeColor: "rgba(249,115,22,1)" },
    { title: "Iluminação Total", color: "from-zinc-500 to-zinc-700", temp: "23°", light: "100%", vol: 50, activeColor: "rgba(161,161,170,1)" },
  ]

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com o especialista Q-SYS sobre o meu projeto.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <SEO 
        title="Integração e Instalação Q-SYS | Automação AV | Sonus Pro AV" 
        description="Integração audiovisual com o ecossistema Q-SYS. Controle de áudio, vídeo e automação corporativa centralizada, sem limite de escalabilidade." 
        url="https://sonusproaudio.com.br/qsys"
      />

      {/* Soundwave Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
        <div className="absolute inset-0 bg-[#050505]" />
        <img src="/soundwave-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]/90" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-6 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] shadow-[0_4px_24px_rgba(0,0,0,0.2)] mb-6 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className=" absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-300">Integração Certificada Sonus + Q-SYS</span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-[1.1]">
            O Cérebro da Sua <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-glow-blue">Infraestrutura Audiovisual.</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-3xl text-balance leading-relaxed">
            Q-SYS consolida áudio, vídeo e controle em uma única plataforma baseada em software. Esqueça o pesadelo das matrizes antigas e hardware isolado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
            <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all ">
              Dimensionar Meu Projeto Q-SYS
            </Button>
            <Button onClick={() => document.getElementById('painel-interativo')?.scrollIntoView({ behavior: 'smooth' })} size="lg" variant="outline" className="h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white text-lg font-medium transition-all">
              Conheça o Sistema <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Hero Image / Touch Panel Mockup */}
        <div id="painel-interativo" className="w-full max-w-5xl mx-auto mt-20 relative transform-gpu animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <div className="relative rounded-[2.5rem] p-2 md:p-4 bg-white/[0.06] border border-white/[0.15] shadow-2xl md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08] group">
            {/* Efeito de brilho de tela no fundo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-500/20 opacity-50 rounded-[2.5rem]" />
            
            <div className="rounded-[2rem] overflow-hidden bg-zinc-950 relative w-full flex flex-col border border-white/10 shadow-inner min-h-[600px] ">
              
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
                <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 px-1 md:px-0 [&::-webkit-scrollbar]:hidden shrink-0">
                  <div className="flex flex-row md:flex-col gap-2 md:gap-3 shrink-0">
                    {[
                      { icon: <MonitorPlay className="w-5 h-5 md:w-6 md:h-6" />, label: "Cenários", id: "Cenários" },
                      { icon: <Volume2 className="w-5 h-5 md:w-6 md:h-6" />, label: "Áudio", id: "Áudio" },
                      { icon: <Camera className="w-5 h-5 md:w-6 md:h-6" />, label: "Câmeras PTZ", id: "Câmeras PTZ" },
                      { icon: <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />, label: "Iluminação", id: "Iluminação" },
                      { icon: <Thermometer className="w-5 h-5 md:w-6 md:h-6" />, label: "Climatização", id: "Climatização" },
                    ].map((item, i) => (
                      <button key={i} onClick={() => setActiveTab(item.id)} aria-label={item.label} className={`flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all min-h-[48px] min-w-[48px] shrink-0 ${activeTab === item.id ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-1 ring-blue-400' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5'}`}>
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
                            <span className="font-bold tracking-widest uppercase text-xs md:text-sm">Modo Técnico</span>
                          </div>
                          <button aria-label="Sair do Modo Técnico" onClick={() => { setIsAdminUnlocked(false); setShowAdminKeypad(false); setAdminPin(""); }} className="text-zinc-400 hover:text-white transition-colors text-[10px] md:text-xs font-bold uppercase border border-zinc-700 px-3 py-1 rounded-full min-h-[32px]">
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
                ) : activeTab === "Cenários" ? (
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
                            setHvacTemp(parseInt(scene.temp));
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
                        className="h-8 md:h-12 bg-black/60 rounded-full p-1 border border-white/10 relative cursor-pointer shadow-inner group touch-none"
                        onPointerDown={(e) => {
                          e.currentTarget.setPointerCapture(e.pointerId);
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                          setCurrentVolume(Math.round((x / rect.width) * 100));
                        }}
                        onPointerMove={(e) => {
                          if (e.buttons !== 1) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                          setCurrentVolume(Math.round((x / rect.width) * 100));
                        }}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full relative md:shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-end pr-1 transition-all duration-200 ease-out" 
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
                        <span className="text-[clamp(16px,2vw,30px)] font-black text-white relative z-10 transition-all duration-500">{hvacTemp}°</span>
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
                ) : activeTab === "Áudio" ? (
                  <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <h3 className="text-zinc-400 font-semibold tracking-widest uppercase text-[10px] md:text-xs mb-4 text-center md:text-left">Mixer de Áudio</h3>
                    <div className="flex justify-around flex-1 items-end gap-2 md:gap-4 pb-4">
                      {/* Mixer Channel 1 */}
                      <div className="flex flex-col items-center gap-4 w-16 md:w-24">
                        <div className="flex-1 w-8 md:w-14 bg-black/60 rounded-full p-1 border border-white/10 relative flex flex-col justify-end overflow-hidden group cursor-pointer touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, mic1: Math.round((1 - y/rect.height)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, mic1: Math.round((1 - y/rect.height)*100)})) }}>
                          <div className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-full transition-all duration-200 md:shadow-[0_0_15px_rgba(52,211,153,0.3)]" style={{ height: `${audioLevels.mic1}%` }} />
                          <div className="absolute w-full bottom-0 h-full flex flex-col justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity items-center pointer-events-none"><span className="text-xs font-bold text-white drop-shadow-md">{audioLevels.mic1}</span></div>
                        </div>
                        <button onClick={() => setAudioLevels(p => ({...p, mic1: p.mic1 === 0 ? 80 : 0}))} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center active:scale-95 transition-all ${audioLevels.mic1 === 0 ? 'bg-red-500/20 ring-1 ring-red-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                          {audioLevels.mic1 === 0 ? <MicOff className="w-5 h-5 md:w-6 md:h-6 text-red-400" /> : <Mic className="w-5 h-5 md:w-6 md:h-6 text-zinc-300" />}
                        </button>
                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Mic 1</span>
                      </div>
                      {/* Mixer Channel 2 */}
                      <div className="flex flex-col items-center gap-4 w-16 md:w-24">
                        <div className="flex-1 w-8 md:w-14 bg-black/60 rounded-full p-1 border border-white/10 relative flex flex-col justify-end overflow-hidden group cursor-pointer touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, mic2: Math.round((1 - y/rect.height)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, mic2: Math.round((1 - y/rect.height)*100)})) }}>
                          <div className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-full transition-all duration-200 md:shadow-[0_0_15px_rgba(52,211,153,0.3)]" style={{ height: `${audioLevels.mic2}%` }} />
                          <div className="absolute w-full bottom-0 h-full flex flex-col justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity items-center pointer-events-none"><span className="text-xs font-bold text-white drop-shadow-md">{audioLevels.mic2}</span></div>
                        </div>
                        <button onClick={() => setAudioLevels(p => ({...p, mic2: p.mic2 === 0 ? 60 : 0}))} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center active:scale-95 transition-all ${audioLevels.mic2 === 0 ? 'bg-red-500/20 ring-1 ring-red-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                          {audioLevels.mic2 === 0 ? <MicOff className="w-5 h-5 md:w-6 md:h-6 text-red-400" /> : <Mic className="w-5 h-5 md:w-6 md:h-6 text-zinc-300" />}
                        </button>
                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Mic 2</span>
                      </div>
                      {/* Mixer Channel 3 (PC) */}
                      <div className="flex flex-col items-center gap-4 w-16 md:w-24">
                        <div className="flex-1 w-8 md:w-14 bg-black/60 rounded-full p-1 border border-white/10 relative flex flex-col justify-end overflow-hidden group cursor-pointer touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, pc: Math.round((1 - y/rect.height)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height)); setAudioLevels(p => ({...p, pc: Math.round((1 - y/rect.height)*100)})) }}>
                          <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-200 md:shadow-[0_0_15px_rgba(56,189,248,0.3)]" style={{ height: `${audioLevels.pc}%` }} />
                          <div className="absolute w-full bottom-0 h-full flex flex-col justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity items-center pointer-events-none"><span className="text-xs font-bold text-white drop-shadow-md">{audioLevels.pc}</span></div>
                        </div>
                        <button onClick={() => setAudioLevels(p => ({...p, pc: p.pc === 0 ? 100 : 0}))} className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center active:scale-95 transition-all ${audioLevels.pc === 0 ? 'bg-red-500/20 ring-1 ring-red-500/50' : 'bg-white/5 hover:bg-white/10'}`}>
                          {audioLevels.pc === 0 ? <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-red-400" /> : <MonitorPlay className="w-5 h-5 md:w-6 md:h-6 text-zinc-300" />}
                        </button>
                        <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">PC</span>
                      </div>
                    </div>
                  </div>
                ) : activeTab === "Câmeras PTZ" ? (
                  <div className="flex-1 flex flex-col gap-3 md:gap-4 animate-in fade-in duration-300 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden pb-4 md:pb-0">
                    <div className="flex-1 bg-black/80 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] md:min-h-[250px] shadow-inner shrink-0">
                      <img src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop" loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-all duration-1000 ease-in-out pointer-events-none will-change-transform ${aiTracking ? 'scale-125' : ''}`} style={{ transform: aiTracking ? 'scale(1.2) translateY(-5%)' : cameraPreset === 'Palco' ? 'scale(1.2) translateX(-5%)' : cameraPreset === 'Plateia' ? 'scale(1.1) translateY(10%)' : 'scale(1.4) translateY(-10%)' }} alt="Camera Auto-Track" />
                      
                      {aiTracking && (
                         <div className="absolute inset-0 bg-purple-500/10 pointer-events-none animate-pulse" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      
                      {/* OSD Info */}
                      <div className="absolute top-3 left-3 md:top-6 md:left-6 flex flex-wrap gap-2 z-20 pointer-events-none pr-3">
                        <div className="px-2 py-1 bg-red-500/90 rounded text-[10px] font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.5)] shrink-0"><div className="w-2 h-2 rounded-full bg-white animate-pulse" /> REC</div>
                        <div className="px-2 py-1 bg-black/60 rounded border border-white/10 uppercase text-[10px] font-bold text-zinc-300 shrink-0">{activeCamera}</div>
                        {aiTracking && (
                           <div className="px-2 py-1 bg-purple-600/90 rounded border border-purple-400 uppercase text-[10px] font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-1 shrink-0">
                             <Bot className="w-3 h-3" /> IA ON
                           </div>
                        )}
                      </div>
                      
                      {/* Center Crosshair (Subtle) */}
                      {!aiTracking && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white/10 rounded-full flex items-center justify-center pointer-events-none">
                          <div className="w-1 h-1 bg-red-500/50 rounded-full" />
                        </div>
                      )}

                      {/* AI Face Tracking Box overlay */}
                      {aiTracking && (
                         <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 md:w-32 md:h-40 border-2 border-purple-500/50 rounded-lg pointer-events-none flex flex-col justify-end p-1 transition-all duration-[3s] ease-in-out" style={{ transform: 'translate(-40%, -40%) scale(1.1)' }}>
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-purple-400 absolute top-0 left-0" />
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-purple-400 absolute top-0 right-0" />
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-purple-400 absolute bottom-0 left-0" />
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-purple-400 absolute bottom-0 right-0" />
                            <span className="text-[8px] font-bold text-purple-400 bg-black/60 px-1 rounded inline-block w-max">Tracking: CEO</span>
                         </div>
                      )}

                      {/* D-Pad PTZ Controls */}
                      <div className={`relative z-10 flex flex-col items-center justify-center gap-2 md:gap-4 w-full mt-auto mb-4 md:mb-6 transition-all duration-500 ${aiTracking ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 active:bg-blue-600 active:scale-90 transition-all"><ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
                        <div className="flex gap-6 md:gap-12 items-center">
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 active:bg-blue-600 active:scale-90 transition-all"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center cursor-pointer hover:bg-blue-600/50 active:scale-90 transition-all"><Target className="w-4 h-4 md:w-6 md:h-6 text-blue-400" /></div>
                          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 active:bg-blue-600 active:scale-90 transition-all"><ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
                        </div>
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 active:bg-blue-600 active:scale-90 transition-all"><ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:gap-3 shrink-0">
                      <div className="flex flex-col xl:flex-row gap-2 md:gap-3">
                        {/* Selector Câmeras */}
                        <div className="flex-1 grid grid-cols-3 gap-1 md:gap-2 p-1 bg-black/40 rounded-xl border border-white/5 relative">
                           {aiTracking && <div className="absolute inset-0 z-10 cursor-not-allowed" title="Controle assumido pela IA" />}
                           {['CAM 1', 'CAM 2', 'CAM 3'].map(cam => (
                             <button key={cam} disabled={aiTracking} onClick={() => setActiveCamera(cam)} className={`h-10 md:h-12 rounded-lg transition-all text-[10px] md:text-xs font-bold tracking-wider ${aiTracking ? 'opacity-30 cursor-not-allowed text-zinc-600' : activeCamera === cam ? 'bg-white/10 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}>{cam.replace('CAM', 'Câmera')}</button>
                           ))}
                        </div>
                        {/* Selector Presets */}
                        <div className="flex-1 grid grid-cols-3 gap-1 md:gap-2 p-1 bg-black/40 rounded-xl border border-white/5 relative">
                           {aiTracking && <div className="absolute inset-0 z-10 cursor-not-allowed" title="Controle assumido pela IA" />}
                           {['Palco', 'Mesa', 'Plateia'].map(preset => (
                             <button key={preset} disabled={aiTracking} onClick={() => {setCameraPreset(preset); setAiTracking(false);}} className={`h-10 md:h-12 rounded-lg transition-all text-[10px] md:text-xs font-bold tracking-wider uppercase truncate px-1 ${aiTracking ? 'opacity-30 cursor-not-allowed text-zinc-600' : cameraPreset === preset ? 'bg-blue-600/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)] border border-blue-500/30' : 'text-zinc-500 hover:text-zinc-300'}`}>{preset}</button>
                           ))}
                        </div>
                      </div>

                      {/* Botão Controle IA */}
                      <button onClick={() => setAiTracking(!aiTracking)} className={`relative w-full h-12 md:h-14 rounded-xl overflow-hidden group transition-all duration-300 border ${aiTracking ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'border-white/10 hover:border-purple-500/50'}`}>
                         <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 transition-opacity duration-500 ${aiTracking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                         <div className="relative h-full w-full flex items-center justify-center gap-2 md:gap-3 px-2 md:px-4">
                           <Bot className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 shrink-0 ${aiTracking ? 'text-purple-300' : 'text-zinc-400 group-hover:text-purple-400'}`} /> 
                           <span className={`text-[9px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 truncate ${aiTracking ? 'text-purple-100' : 'text-zinc-400 group-hover:text-purple-200'}`}>
                             {aiTracking ? 'Rastreamento por IA (Ativo)' : 'Controle Automático por IA'}
                           </span>
                         </div>
                      </button>
                    </div>
                  </div>
                ) : activeTab === "Iluminação" ? (
                  <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <h3 className="text-zinc-400 font-semibold tracking-widest uppercase text-[10px] md:text-xs mb-2">Zonas de Iluminação</h3>
                    <div className="flex flex-col gap-6 md:gap-8 justify-center flex-1">
                      {/* Zona 1 */}
                      <div>
                        <div className="flex justify-between items-center mb-3 text-[10px] md:text-xs font-bold uppercase tracking-widest"><span className="text-zinc-300 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-500" /> Luzes do Palco</span><span className="text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-md">{lightLevels.palco}%</span></div>
                        <div className="h-8 md:h-10 bg-black/60 rounded-full p-1.5 border border-white/10 cursor-pointer group shadow-inner touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, palco: Math.round((x/rect.width)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, palco: Math.round((x/rect.width)*100)})) }}>
                          <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-full transition-all duration-200 relative md:shadow-[0_0_15px_rgba(250,204,21,0.4)] flex justify-end items-center pr-1" style={{ width: `${lightLevels.palco}%` }}>
                            <div className="w-5 h-5 md:w-7 md:h-7 bg-white rounded-full shadow-md scale-90 group-active:scale-100 transition-transform" />
                          </div>
                        </div>
                      </div>
                      {/* Zona 2 */}
                      <div>
                        <div className="flex justify-between items-center mb-3 text-[10px] md:text-xs font-bold uppercase tracking-widest"><span className="text-zinc-300 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500" /> Luzes da Plateia</span><span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">{lightLevels.plateia}%</span></div>
                        <div className="h-8 md:h-10 bg-black/60 rounded-full p-1.5 border border-white/10 cursor-pointer group shadow-inner touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, plateia: Math.round((x/rect.width)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, plateia: Math.round((x/rect.width)*100)})) }}>
                          <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full transition-all duration-200 relative md:shadow-[0_0_15px_rgba(251,191,36,0.4)] flex justify-end items-center pr-1" style={{ width: `${lightLevels.plateia}%` }}>
                            <div className="w-5 h-5 md:w-7 md:h-7 bg-white rounded-full shadow-md scale-90 group-active:scale-100 transition-transform" />
                          </div>
                        </div>
                      </div>
                      {/* Zona 3 */}
                      <div>
                        <div className="flex justify-between items-center mb-3 text-[10px] md:text-xs font-bold uppercase tracking-widest"><span className="text-zinc-300 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-blue-500" /> Sancas Decorativas</span><span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">{lightLevels.sanca}%</span></div>
                        <div className="h-8 md:h-10 bg-black/60 rounded-full p-1.5 border border-white/10 cursor-pointer group shadow-inner touch-none" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, sanca: Math.round((x/rect.width)*100)})) }} onPointerMove={(e) => { if (e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width)); setLightLevels(p => ({...p, sanca: Math.round((x/rect.width)*100)})) }}>
                          <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-200 relative md:shadow-[0_0_15px_rgba(56,189,248,0.4)] flex justify-end items-center pr-1" style={{ width: `${lightLevels.sanca}%` }}>
                            <div className="w-5 h-5 md:w-7 md:h-7 bg-white rounded-full shadow-md scale-90 group-active:scale-100 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 gap-8 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-6">
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-[10px] border-black/60 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative flex items-center justify-center bg-gradient-to-b from-zinc-800 to-black overflow-hidden ring-1 ring-white/5">
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)] transition-opacity duration-1000 ${hvacTemp < 21 ? 'opacity-100' : 'opacity-0'}`} />
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.3)_0%,transparent_70%)] transition-opacity duration-1000 ${hvacTemp > 24 ? 'opacity-100' : 'opacity-0'}`} />
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] transition-opacity duration-1000 ${hvacTemp >= 21 && hvacTemp <= 24 ? 'opacity-100' : 'opacity-0'}`} />
                      <div className="flex flex-col items-center z-10 relative">
                        <span className="text-zinc-400 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Setpoint</span>
                        <div className="flex items-start text-white">
                          <span className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums">{hvacTemp}</span>
                          <span className="text-3xl md:text-4xl mt-2 font-light text-zinc-400">°C</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-black/50 border border-white/10 mt-3 flex items-center gap-2">
                          <Thermometer className={`w-3.5 h-3.5 ${hvacTemp < 21 ? 'text-blue-400' : hvacTemp > 24 ? 'text-orange-400' : 'text-emerald-400'}`} /> 
                          <span className="text-zinc-300 text-xs font-bold uppercase tracking-widest">Atual: {hvacTemp > 22 ? hvacTemp - 1 : hvacTemp < 20 ? hvacTemp + 1 : 22}°C</span>
                        </div>
                      </div>
                      
                      {/* Decorative tick marks */}
                      {[...Array(40)].map((_, i) => (
                        <div key={i} className="absolute w-1 h-3 bg-white/10" style={{ transform: `rotate(${i * 9}deg) translateY(-100px)` }} />
                      ))}
                    </div>
                    
                    <div className="flex gap-4 md:gap-8">
                      <button onClick={() => setHvacTemp(prev => Math.max(16, prev - 1))} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-black/40 hover:bg-black/60 active:scale-95 border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-blue-400 transition-all shadow-lg group">
                        <Minus className="w-8 h-8 md:w-10 md:h-10 group-active:text-blue-300" />
                      </button>
                      <button className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-blue-600/10 active:scale-95 border border-blue-500/30 flex items-center justify-center text-blue-300 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <Fan className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
                      </button>
                      <button onClick={() => setHvacTemp(prev => Math.min(30, prev + 1))} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-black/40 hover:bg-black/60 active:scale-95 border border-white/10 hover:border-orange-500/50 flex items-center justify-center text-orange-400 transition-all shadow-lg group">
                        <Plus className="w-8 h-8 md:w-10 md:h-10 group-active:text-orange-300" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Reflexo de Tela (Glossy Overlay) */}
              <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            </div>
          </div>
          </div>
      </section>

      {/* Trust Bar / Certificações e Ecossistema */}
      <section className="relative py-16 px-4 border-t border-b border-white/5 bg-white/[0.02] z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          {/* Certificações Sonus */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6 text-center">Equipe Técnica Oficialmente Certificada Q-SYS</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-90">
              <img src="/certificados/qsys-level-1.png" alt="Q-SYS Level 1 Certified" className="h-10 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" />
              <img src="/certificados/qsys-visionsuite.png" alt="Q-SYS Visionsuite Certified" className="h-10 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" />
              <img src="/certificados/qsys-sales.png" alt="Q-SYS Sales Professional" className="h-10 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          <div className="w-full h-px bg-white/5 max-w-sm mx-auto"></div>

          {/* Ecossistema */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6 text-center">Integração Nativa Garantida</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">Microsoft Teams</span>
              <img src="/zoom-logo.png" alt="Zoom" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
              <img src="/google-meet-logo.png" alt="Google Meet" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
              <img src="/shure-logo.png" alt="Shure" className="h-5 md:h-8 w-auto object-contain brightness-0 invert" />
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">BARCO</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid - Glassmorphism */}
      <section className="py-32 px-4 md:px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 leading-normal">
              Por que escolher o Ecossistema Q-SYS?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light text-balance">
              Abandone a complexidade de dezenas de equipamentos desconectados. O Q-SYS unifica tudo em um único cérebro digital, infinitamente expansível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-blue-400" />,
                title: "Fim da Obsolescência",
                desc: "Diferente de matrizes físicas engessadas, o Q-SYS é um software. Atualize remotamente como um servidor de TI e economize milhares em hardware."
              },
              {
                icon: <Layers className="w-8 h-8 text-cyan-400" />,
                title: "Tudo em Um Só Lugar",
                desc: "A única plataforma corporativa que processa e comanda microfones, câmeras, vídeo e luz de forma nativa e sem gambiarras."
              },
              {
                icon: <Settings className="w-8 h-8 text-purple-400" />,
                title: "Padronização Corporativa",
                desc: "O mesmo painel de controle na mesa da presidência e na sala rápida. Curva de aprendizado zero para a sua equipe."
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-emerald-400" />,
                title: "Salas que Pensam",
                desc: "Sensores preparam a sala antes de você entrar. Câmeras com IA rastreiam o orador. Fim dos chamados para o TI ligar o projetor."
              }
            ].map((feature, i) => (
              <div key={i}>
                <div className="h-full rounded-3xl p-8 glass-card hover:bg-white/[0.10] hover:border-white/[0.15] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-500 group shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
              Quero Padronizar Minha Empresa
            </Button>
          </div>
        </div>
      </section>

      {/* Global Success Cases */}
      <section className="py-24 px-4 md:px-6 z-10 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 leading-normal">
              Poder de Fogo em Escala Global
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light text-balance">
              O ecossistema Q-SYS é a espinha dorsal tecnológica das maiores infraestruturas do planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="h-full rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 group shadow-lg flex flex-col relative overflow-hidden">
                <div className="h-48 w-full relative overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop" alt="Camp Randall Stadium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400">
                      <Globe className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Operações em Escala Monumental</h3>
                  <p className="text-sm text-blue-300 font-medium mb-4">Estádio Camp Randall (Univ. Wisconsin)</p>
                  <p className="text-zinc-400 text-sm mb-6 flex-1">
                    <strong className="text-zinc-200">O Desafio:</strong> Distribuir áudio sem atrasos para mais de 80.000 torcedores e instalações atléticas pelo campus.<br/><br/>
                    <strong className="text-zinc-200">A Solução:</strong> Arquitetura de processamento 100% em rede, eliminando cabos analógicos e unificando o controle.
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-zinc-500 italic font-medium">Se gerencia o caos de um estádio lotado com perfeição, imagine a estabilidade no seu auditório.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 group shadow-lg flex flex-col relative overflow-hidden">
                <div className="h-48 w-full relative overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" alt="Vienna University" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Agilidade e Missão Crítica</h3>
                  <p className="text-sm text-emerald-300 font-medium mb-4">Vienna Univ. of Economics & Business</p>
                  <p className="text-zinc-400 text-sm mb-6 flex-1">
                    <strong className="text-zinc-200">O Desafio:</strong> Modernizar dezenas de auditórios gigantes para ensino remoto simultâneo em tempo recorde.<br/><br/>
                    <strong className="text-zinc-200">A Solução:</strong> Implementação nativa de TI permitiu equipar todos os espaços com AV integrado em apenas 4 semanas.
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-zinc-500 italic font-medium">Implementado na velocidade da TI, reduzindo severamente o tempo de obra e pausas na operação.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-500 group shadow-lg flex flex-col relative overflow-hidden">
                <div className="h-48 w-full relative overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop" alt="FC Twente Stadium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-400">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">Controle Simplificado</h3>
                  <p className="text-sm text-purple-300 font-medium mb-4">FC Twente Football Stadium (Holanda)</p>
                  <p className="text-zinc-400 text-sm mb-6 flex-1">
                    <strong className="text-zinc-200">O Desafio:</strong> Sistema AV com altíssima fidelidade sonora, mantendo a operação fácil para qualquer funcionário.<br/><br/>
                    <strong className="text-zinc-200">A Solução:</strong> Painéis de toque hiper-intuitivos que roteiam áudios complexos com apenas dois toques na tela.
                  </p>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-zinc-500 italic font-medium">Tecnologia avançada com interface amigável. O CEO não precisa chamar o TI para iniciar reuniões.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios - Horizontal Layout */}
      <section className="py-32 px-4 md:px-6 z-10 relative bg-white/[0.02] border-y border-white/[0.06] shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm border border-blue-500/20">
                Experiência de Usuário
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Um Toque. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">A Sala Perfeita.</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Imagine entrar na sala do conselho, tocar em "Reunião" no painel e automaticamente: as cortinas fecham, as luzes dimerizam, o ar liga em 22 graus, os microfones ativam e o Microsoft Teams entra na chamada. 
                <br /><br />
                Tudo desenhado com a identidade visual da sua empresa para que qualquer executivo comande a sala com a facilidade de usar um smartphone.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: <Mic className="w-5 h-5" />, text: "Cancelamento de Eco Acústico (AEC) Inteligente" },
                  { icon: <BrainCircuit className="w-5 h-5" />, text: "Câmeras PTZ com Rastreamento IA e Facial" },
                  { icon: <Sliders className="w-5 h-5" />, text: "Telas Touch com a Identidade Visual da sua Empresa" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-zinc-300 bg-black/20 p-4 rounded-2xl border border-white/5">
                    <div className="p-2 bg-white/10 rounded-lg text-blue-400">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-zinc-800 to-black p-1 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent" />
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
            </div>
          </div>
          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all hover:scale-105 active:scale-95">
              Agendar Consultoria Especializada
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-6 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[3rem] p-12 md:p-20 glass-card-strong bg-gradient-to-br from-blue-600/40 to-purple-700/40 text-center relative overflow-hidden border border-white/20 shadow-2xl">
            {/* Glass Highlights */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-8 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Tecnologia de Ponta.<br />
                Padrão Sonus de Qualidade.
              </h2>
              <p className="text-xl text-white/80 font-light max-w-2xl text-balance">
                Paz de espírito corporativa. Desenhamos a arquitetura, integramos a tecnologia e entregamos as chaves com a garantia de que suas reuniões críticas não vão mais falhar.
              </p>
              
              <div className="pt-8 w-full sm:w-auto">
                <Button onClick={handleWhatsApp} size="lg" className="h-16 px-4 md:px-10 text-[clamp(14px,2vw,20px)] font-bold rounded-full bg-white text-blue-700 hover:bg-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all w-full flex items-center justify-center whitespace-nowrap ">
                  Consultoria Gratuita Q-SYS
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-8 text-white/60 text-sm font-medium">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Certificação Q-SYS Oficial</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Projetos em todo Brasil</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Interfaces com a sua Identidade Visual</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden transition-colors duration-300">
        <div className="container px-4 md:px-6 relative z-10">
          <FadeIn className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 transition-colors duration-300">
              Vamos conversar sobre o seu <span className="text-blue-500">Projeto</span>?
            </h2>
            <p className="text-zinc-400 text-lg transition-colors duration-300">
              Preencha o formulário abaixo e nossos especialistas entrarão em contato para entender suas necessidades e desenhar a arquitetura ideal.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-3xl mx-auto bg-zinc-950/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transition-colors duration-300">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Solicitação Enviada!</h3>
                <p className="text-zinc-400 mb-8">Nossa equipe entrará em contato em breve para prosseguirmos.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
                  Enviar nova solicitação
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="honeypot" tabIndex={-1} value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-300 transition-colors duration-300">Nome Completo</label>
                    <Input required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-black/50 border-white/10 focus-visible:ring-blue-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-300 transition-colors duration-300">Telefone / WhatsApp</label>
                    <Input required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-black/50 border-white/10 focus-visible:ring-blue-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300 transition-colors duration-300">E-mail Profissional</label>
                  <Input required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com.br" className="bg-black/50 border-white/10 focus-visible:ring-blue-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-300 transition-colors duration-300">Descrição do Projeto</label>
                  <Textarea required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Conte-nos sobre a necessidade da sua empresa..." className="bg-black/50 border-white/10 focus-visible:ring-blue-500 min-h-[150px] resize-none text-white transition-colors duration-300 rounded-xl" />
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
                    options={{ theme: 'dark' }} 
                  />
                </div>
                
                {submitError && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
                    {submitError}
                  </div>
                )}

                <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <div className="dark relative z-10 w-full bg-black">
        <Footer />
      </div>
      
      {/* Floating WhatsApp Button directed to Q-SYS Specialist */}
      <WhatsAppButton 
        phone="5546920013151" 
        message="Olá! Gostaria de falar com o especialista Q-SYS." 
      />
    </div>
  )
}
