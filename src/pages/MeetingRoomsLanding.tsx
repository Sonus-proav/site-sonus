import { useState, useEffect } from "react"
import { FadeIn } from "@/components/ui/FadeIn"
import { Button } from "@/components/ui/button"
import { Video, Mic, Cast, PhoneCall, Users, PhoneOff, MicOff, CheckCircle2, Camera, Wifi, Volume2, Target, Focus } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"

export function MeetingRoomsLanding() {
  const [activeTab, setActiveTab] = useState("Videoconferência")
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected">("idle")
  const [callTimer, setCallTimer] = useState(0)
  const [micMuted, setMicMuted] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState(0)
  const [presentationActive, setPresentationActive] = useState(false)
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (callState === "connected") {
      interval = setInterval(() => setCallTimer(p => p + 1), 1000)
    } else {
      setCallTimer(0)
    }
    return () => clearInterval(interval)
  }, [callState])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setActiveSpeaker(Math.floor(Math.random() * 4))
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com o especialista Q-SYS sobre Salas de Reunião Corporativas.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Helmet>
        <title>Salas de Reunião de Alto Padrão | Shure + Q-SYS | Sonus</title>
        <meta name="description" content="Salas de Reunião sem fios na mesa. Integração Q-SYS com microfones de teto Shure e câmeras Auto-Tracking." />
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-300">Integração Q-SYS + Shure + Auto-Tracking</span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 leading-[1.1]">
            Salas de Reunião <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Sem Fios e Sem Falhas.</span>
          </h1>

          <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-zinc-400 font-light max-w-2xl text-balance leading-relaxed">
            Elimine a bagunça da mesa. Captação de áudio invisível pelo teto, câmeras que seguem quem fala automaticamente e início de reunião com 1 único toque.
          </p>

          {/* Interactive Mockup Container */}
          <div className="w-full max-w-4xl mt-12 mb-8 perspective-1000 group">
            <div className="w-full bg-gradient-to-b from-zinc-800 to-black rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border border-white/10 relative transform-gpu transition-transform duration-700 hover:rotate-x-0 rotate-x-2">
              
              {/* Fake Bezel and Camera */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-6 md:h-8 bg-black rounded-b-3xl z-30 flex items-center justify-center gap-2 border-b border-x border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>

              {/* Screen Content */}
              <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative flex flex-col z-20">
                
                {/* Status Bar */}
                <div className="h-8 md:h-12 bg-black/40 flex items-center justify-between px-6 shrink-0 border-b border-white/5 relative z-10 backdrop-blur-md">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">Boardroom 1</span>
                  <div className="flex items-center gap-4 text-zinc-400">
                    <Wifi className="w-3.5 h-3.5" />
                    <span className="text-[10px] md:text-xs font-medium">10:00 AM</span>
                  </div>
                </div>

                {/* Main Interactive Dashboard */}
                <div className="flex-1 flex flex-col md:flex-row p-3 md:p-6 gap-3 md:gap-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
                  
                  {/* Sidebar */}
                  <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden shrink-0">
                    <div className="flex flex-row md:flex-col gap-2 md:gap-3 shrink-0">
                      {[
                        { icon: <Video className="w-5 h-5" />, label: "Videoconferência" },
                        { icon: <Mic className="w-5 h-5" />, label: "Microfones Shure" },
                        { icon: <Camera className="w-5 h-5" />, label: "Câmeras Auto-Track" },
                        { icon: <Cast className="w-5 h-5" />, label: "Apresentação sem Fio" },
                      ].map((item, i) => (
                        <button key={i} onClick={() => setActiveTab(item.label)} aria-label={item.label} className={`flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all min-h-[48px] min-w-[48px] shrink-0 ${activeTab === item.label ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-1 ring-blue-400' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/5'}`}>
                          <div className="shrink-0">{item.icon}</div>
                          <span className="hidden md:block font-medium text-[clamp(12px,1.5vw,14px)] text-left leading-tight">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dashboard Área Interativa */}
                  {activeTab === "Videoconferência" ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
                      {callState === "idle" ? (
                        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
                          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-blue-500/50">
                            <Users className="w-10 h-10 text-blue-400" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Reunião de Diretoria</h2>
                          <p className="text-zinc-400 text-sm mb-8 text-center">A sala está pronta. Inicie a reunião de Teams/Zoom com um toque.</p>
                          <button onClick={() => { setCallState("ringing"); setTimeout(() => setCallState("connected"), 2000) }} className="w-full h-16 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                            <Video className="w-6 h-6" /> Ingressar Agora
                          </button>
                        </div>
                      ) : callState === "ringing" ? (
                        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center shadow-2xl">
                          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-blue-500/50 animate-pulse">
                            <PhoneCall className="w-10 h-10 text-blue-400 animate-bounce" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Conectando...</h2>
                          <p className="text-zinc-400 text-sm mb-8">Negociando vídeo e áudio com a nuvem</p>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden relative">
                          {/* Fake Meeting Video Area */}
                          <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                            <div className="relative z-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
                              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                              <span className="font-mono text-xl tracking-wider text-zinc-200">{formatTime(callTimer)}</span>
                            </div>
                          </div>
                          {/* Call Controls */}
                          <div className="h-24 bg-zinc-900/80 border-t border-white/10 flex items-center justify-center gap-4 md:gap-8 px-6">
                            <button onClick={() => setMicMuted(!micMuted)} className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${micMuted ? 'bg-red-500/20 text-red-500 ring-1 ring-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              {micMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                            </button>
                            <button onClick={() => setCallState("idle")} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95">
                              <PhoneOff className="w-8 h-8" />
                            </button>
                            <button className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all bg-white/10 text-white hover:bg-white/20">
                              <Volume2 className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : activeTab === "Microfones Shure" ? (
                    <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                       <div className="flex-1 bg-black/50 border border-white/5 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
                         {/* Radar/Table Simulation */}
                         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.8)_0%,transparent_60%)] pointer-events-none" />
                         
                         <h3 className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-zinc-400 z-20 flex items-center gap-2">
                           <Target className="w-4 h-4 text-emerald-400" />
                           Matriz Dinâmica (MXA920)
                         </h3>

                         <div className="relative w-64 h-40 md:w-80 md:h-48 border-2 border-white/10 rounded-[3rem] flex items-center justify-center">
                            {/* Fake Table */}
                            <div className="absolute inset-2 bg-white/5 rounded-[2.5rem] backdrop-blur-sm" />
                            
                            {/* Fake Ceiling Mic directly above */}
                            <div className="absolute -top-12 w-12 h-12 border border-emerald-500/30 rounded-md bg-emerald-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            </div>

                            {/* Audio Lobes / Speakers */}
                            {[
                              { id: 0, pos: "-top-6 left-1/4" },
                              { id: 1, pos: "-top-6 right-1/4" },
                              { id: 2, pos: "-bottom-6 left-1/4" },
                              { id: 3, pos: "-bottom-6 right-1/4" },
                            ].map(speaker => (
                              <div key={speaker.id} className={`absolute ${speaker.pos} flex flex-col items-center transition-all duration-500`}>
                                <div className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${activeSpeaker === speaker.id ? 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110' : 'border-white/10 bg-black'}`}>
                                  <Users className={`w-5 h-5 transition-colors ${activeSpeaker === speaker.id ? 'text-emerald-400' : 'text-zinc-600'}`} />
                                </div>
                                {/* Visualization of sound wave capturing */}
                                {activeSpeaker === speaker.id && (
                                  <div className="absolute -z-10 w-24 h-24 border border-emerald-500/30 rounded-full animate-ping opacity-50" />
                                )}
                              </div>
                            ))}
                            
                            <div className="relative z-10 text-center mt-6">
                               <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                 Lóbulo Direcionado ao Locutor {activeSpeaker + 1}
                               </p>
                            </div>
                         </div>
                       </div>
                    </div>
                  ) : activeTab === "Câmeras Auto-Track" ? (
                    <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                      <div className="flex-1 bg-black rounded-3xl border border-white/5 relative overflow-hidden group">
                        {/* Fake Camera Feed Background */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity transition-all duration-1000 ease-in-out" 
                             style={{ 
                               transform: activeSpeaker === 0 ? 'scale(1.5) translate(10%, 10%)' : 
                                          activeSpeaker === 1 ? 'scale(1.5) translate(-10%, 10%)' :
                                          activeSpeaker === 2 ? 'scale(1.5) translate(10%, -10%)' :
                                          'scale(1.5) translate(-10%, -10%)'
                             }}>
                        </div>
                        
                        {/* Auto-tracking UI Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <div className="w-48 h-48 border-[2px] border-blue-500/50 rounded-lg relative transition-all duration-1000"
                                style={{
                                   transform: activeSpeaker === 0 ? 'translate(-20%, -20%)' : 
                                              activeSpeaker === 1 ? 'translate(20%, -20%)' :
                                              activeSpeaker === 2 ? 'translate(-20%, 20%)' :
                                              'translate(20%, 20%)'
                                }}>
                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-400" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-400" />
                                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-400" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-400" />
                                
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/20 px-2 py-0.5 rounded text-[8px] font-bold text-blue-300 uppercase backdrop-blur-md border border-blue-500/30">
                                  <Focus className="w-3 h-3" /> Auto Track
                                </div>
                           </div>
                        </div>

                        <div className="absolute bottom-6 left-6 text-[10px] md:text-xs text-white/70 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md font-medium">
                          Posição comandada pelo Microfone Shure
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300 gap-6 md:gap-8 p-4 text-center">
                       <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800/50 rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl relative">
                          <Cast className={`w-12 h-12 md:w-16 md:h-16 transition-all ${presentationActive ? 'text-blue-400 animate-pulse' : 'text-zinc-500'}`} />
                          <div className={`absolute -bottom-4 text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-3 md:px-4 py-1 rounded-full transition-all ${presentationActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-zinc-700 text-zinc-300'}`}>
                            {presentationActive ? "Compartilhando" : "Pronto para Conectar"}
                          </div>
                       </div>
                       
                       <div className="max-w-sm">
                         <h3 className="text-lg md:text-xl font-bold mb-2">Apresentação sem Fio</h3>
                         <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                           Aperte o botão do Barco ClickShare ou conecte-se via Miracast/Airplay. O sistema Q-SYS ligará a TV automaticamente e exibirá sua tela.
                         </p>
                       </div>
                       
                       <button onClick={() => setPresentationActive(!presentationActive)} className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all ${presentationActive ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}>
                         {presentationActive ? "Parar Compartilhamento" : "Simular Apresentação"}
                       </button>
                    </div>
                  )}
                </div>
                
                {/* Reflexo de Tela (Glossy Overlay) */}
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="pt-8 w-full sm:w-auto">
            <Button onClick={handleWhatsApp} size="lg" className="h-16 px-4 md:px-10 text-[clamp(14px,2vw,20px)] font-bold rounded-full bg-white text-blue-700 hover:bg-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all w-full flex items-center justify-center whitespace-nowrap">
              Consultoria Corporativa Sonus
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8 text-white/60 text-sm font-medium pb-24">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Soluções Microsoft Teams Rooms</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Integração Zoom Rooms</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Design sem cabos visíveis</span>
          </div>
        </FadeIn>
      </section>

      {/* Floating WhatsApp Button directed to Specialist */}
      <WhatsAppButton 
        phone="5546920013151" 
        message="Olá! Gostaria de falar com o especialista Q-SYS sobre Salas de Reunião." 
      />
    </div>
  )
}
