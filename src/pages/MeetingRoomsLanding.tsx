import { useState, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { FadeIn } from "@/components/ui/FadeIn"
import { Video, Mic, Cast, PhoneCall, Users, PhoneOff, MicOff, CheckCircle2, Camera, Wifi, Volume2, Target, Focus, ShieldCheck, Zap, Wrench, XCircle, AlertCircle, Settings } from "lucide-react"
import { SEO } from "@/components/SEO"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { WarrantyBanner } from "@/components/layout/WarrantyBanner"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
export function MeetingRoomsLanding() {
  const [activeTab, setActiveTab] = useState("Microfone Shure")
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected">("idle")
  const [callTimer, setCallTimer] = useState(0)
  const [micMuted, setMicMuted] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState(0)
  const [cameraState, setCameraState] = useState({ liveCam: 2, movingCam: null as number | null })
  const [presentationActive, setPresentationActive] = useState(false)
  

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    if (!turnstileToken) {
      setSubmitError("Por favor, valide que você é humano.")
      return
    }
    
    setIsSubmitting(true)
    setSubmitError("")
    
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        source: "Landing Page Salas de Reunião",
        status: "novo",
        createdAt: serverTimestamp()
      })
      
      setIsSuccess(true)
      setFormData({ name: "", phone: "", email: "", message: "", honeypot: "" })
    } catch (error) {
      console.error("Error saving lead:", error)
      setSubmitError("Ocorreu um erro ao enviar. Por favor, tente novamente ou nos chame no WhatsApp.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (callState === "connected") {
      interval = setInterval(() => setCallTimer(p => p + 1), 1000)
    } else {
      setCallTimer(0)
    }
    return () => clearInterval(interval)
  }, [callState])

  const activeSpeakerRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let mounted = true;

    const clearAllTimeouts = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    const runLoop = () => {
      if (!mounted) return;
      
      let nextSpeaker = Math.floor(Math.random() * 4);
      while (nextSpeaker === activeSpeakerRef.current) {
         nextSpeaker = Math.floor(Math.random() * 4);
      }
      
      activeSpeakerRef.current = nextSpeaker;
      setActiveSpeaker(nextSpeaker);
      
      // Cam 1 -> Bottom (2, 3)
      // Cam 3 -> Top (0, 1)
      // Cam 2 -> Geral/Wide
      const targetCam = (nextSpeaker === 0 || nextSpeaker === 1) ? 3 : 1;
      
      setCameraState({ liveCam: 2, movingCam: targetCam });
      
      const moveTimeout = setTimeout(() => {
        if (mounted) {
          setCameraState({ liveCam: targetCam, movingCam: null });
        }
      }, 1800);
      timeoutsRef.current.push(moveTimeout);

      const loopTimeout = setTimeout(runLoop, 6000);
      timeoutsRef.current.push(loopTimeout);
    };

    const initialTimeout = setTimeout(runLoop, 3000);
    timeoutsRef.current.push(initialTimeout);

    return () => {
      mounted = false;
      clearAllTimeouts();
    };
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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 ">
      <SEO 
        title="Automação de Salas de Reunião e Videoconferência | Sonus Pro AV" 
        description="Projetos de captação de áudio invisível, acústica e automação para salas de diretoria. Instalação premium certificada Microsoft Teams e Zoom Rooms." 
        url="https://sonusproaudio.com.br/salas-reuniao"
        keywords="automação corporativa, sala de reunião inteligente, videoconferência profissional, integração Q-SYS, sonorização de escritório, sistema Zoom Rooms, Microsoft Teams Rooms, microfone de teto shure"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Automação de Salas de Reunião e Videoconferência",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Sonus Pro AV"
          },
          "description": "Automação e projetos audiovisuais para salas de reunião e ambientes corporativos.",
          "areaServed": "Brazil",
          "source": "Landing Page Salas Corporativas"
        }}
      />

      {/* Soundwave Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <img fetchPriority="high" src="/soundwave-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-6 z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.12]  shadow-[0_4px_24px_rgba(0,0,0,0.2)] mb-6 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className=" absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-300">O Padrão Ouro em Áudio Corporativo</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500 leading-tight pb-2">
            Reuniões Híbridas <br className="hidden md:block"/> Sem Falhas e Sem Atrasos.
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
            Chega de perder os primeiros 15 minutos de reunião tentando fazer o som funcionar. Integração perfeita com <strong className="text-white font-medium">Microsoft Teams, Zoom e Google Meet.</strong>
          </p>

          {/* Interactive Mockup Container */}
          <div className="w-full max-w-4xl mt-12 mb-8 perspective-1000 group">
            <div className="w-full bg-gradient-to-b from-zinc-800 to-black rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] border border-white/[0.12] relative transform-gpu transition-transform duration-700 hover:rotate-x-0 rotate-x-2">
              
              {/* Fake Bezel and Camera */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-6 md:h-8 bg-black rounded-b-3xl z-30 flex items-center justify-center gap-2 border-b border-x border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>

              {/* Screen Content */}
              <div className="w-full min-h-[550px] md:min-h-0 md:aspect-[16/9] bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative flex flex-col z-20 ">
                
                {/* Status Bar */}
                <div className="h-8 md:h-12 bg-black/40 flex items-center justify-between px-6 shrink-0 border-b border-white/5 relative z-10 ">
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
                        { icon: <Mic className="w-5 h-5" />, label: "Microfone Shure" },
                        { icon: <Video className="w-5 h-5" />, label: "Videoconferência" },
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
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" fetchPriority="high" loading="eager" decoding="sync" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Video Chamada" />
                            <div className="relative z-10 bg-black/60  px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
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
                  ) : activeTab === "Microfone Shure" ? (
                    <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                       <div className="flex-1 bg-black/50 border border-white/5 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 pt-20 pb-24 md:px-10 md:pt-16 md:pb-24 min-h-[450px]">
                         
                         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.8)_0%,transparent_60%)] pointer-events-none" />
                         
                         <h3 className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-zinc-400 z-20 flex items-center gap-2">
                           <Target className="w-4 h-4 text-emerald-400" />
                           Integração Shure + Q-SYS Auto Framing
                         </h3>

                         <div className="flex flex-row md:flex-col gap-6 md:gap-8 z-20 w-full md:w-auto overflow-x-auto md:overflow-visible pb-4 md:pb-0 justify-start shrink-0">
                           {[1, 2, 3].map(camId => {
                             const isLive = cameraState.liveCam === camId;
                             const isMoving = cameraState.movingCam === camId;
                             const isWide = camId === 2;

                             return (
                               <div key={camId} className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 relative min-w-[100px] md:min-w-0">
                                 <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 shrink-0 ${isLive ? 'border-red-500 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' : isMoving ? 'border-yellow-500 bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.4)] scale-100' : 'border-white/10 bg-black scale-100'}`}>
                                   <Camera className={`w-5 h-5 md:w-6 md:h-6 ${isLive ? 'text-red-400' : isMoving ? 'text-yellow-400 animate-pulse' : 'text-zinc-600'}`} />
                                 </div>
                                 <div className="flex flex-col text-center md:text-left w-[95px] shrink-0">
                                   <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${isLive ? 'text-red-400' : isMoving ? 'text-yellow-400' : 'text-zinc-500'}`}>
                                     {isWide ? 'Cam 2 (Geral)' : `Cam ${camId} (PTZ)`}
                                   </span>
                                   <span className={`text-[8px] font-bold mt-0.5 transition-colors duration-300 ${isLive ? 'text-red-500' : isMoving ? 'text-yellow-500' : 'text-zinc-600'}`}>
                                     {isLive ? 'NO AR' : isMoving ? 'ENQUADRANDO...' : 'STANDBY'}
                                   </span>
                                 </div>
                                 
                                 {isLive && !isWide && (
                                   <div className="hidden md:block absolute left-full ml-2 top-6 w-16 border-t-2 border-red-500/30 border-dashed origin-left pointer-events-none transition-all duration-500" style={{ transform: 'translateY(-50%)' }} />
                                 )}
                               </div>
                             )
                           })}
                         </div>

                         <div className="relative w-64 h-40 md:w-80 md:h-48 border-2 border-white/10 rounded-[3rem] flex items-center justify-center shrink-0 z-20 mt-4 md:mt-0">
                            <div className="absolute inset-2 bg-white/5 rounded-[2.5rem] " />
                            
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-emerald-500/30 rounded-md bg-emerald-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] z-30">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            </div>

                            {[
                              { id: 0, pos: "-top-6 left-1/4" },
                              { id: 1, pos: "-top-6 right-1/4" },
                              { id: 2, pos: "-bottom-6 left-1/4" },
                              { id: 3, pos: "-bottom-6 right-1/4" },
                            ].map(speaker => (
                              <div key={speaker.id} className={`absolute ${speaker.pos} flex flex-col items-center transition-all duration-500 z-10`}>
                                <div className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${activeSpeaker === speaker.id ? 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110' : 'border-white/10 bg-black scale-100'}`}>
                                  <Users className={`w-5 h-5 transition-colors duration-300 ${activeSpeaker === speaker.id ? 'text-emerald-400' : 'text-zinc-600'}`} />
                                </div>
                                {activeSpeaker === speaker.id && (
                                  <div className="absolute -z-10 w-24 h-24 border border-emerald-500/30 rounded-full animate-ping opacity-50" />
                                )}
                              </div>
                            ))}
                            
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[120%] text-center">
                               <p className="text-emerald-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-500/20 inline-block shadow-lg">
                                 Lóbulo direcionado ao Locutor {activeSpeaker + 1}
                               </p>
                            </div>
                         </div>
                       </div>
                    </div>
                  ) : activeTab === "Câmeras Auto-Track" ? (
                    <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                      <div className="flex-1 bg-black rounded-3xl border border-white/5 relative overflow-hidden group">
                        {/* Fake Camera Feed Background */}
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" loading="eager" fetchPriority="high" decoding="sync" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-all duration-1000 ease-in-out pointer-events-none" alt="Camera Feed"
                             style={{ 
                               transform: activeSpeaker === 0 ? 'scale(1.5) translate(10%, 10%)' : 
                                          activeSpeaker === 1 ? 'scale(1.5) translate(-10%, 10%)' :
                                          activeSpeaker === 2 ? 'scale(1.5) translate(10%, -10%)' :
                                          'scale(1.5) translate(-10%, -10%)'
                             }} />
                        
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
                                
                                <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/20 px-2 py-0.5 rounded text-[8px] font-bold text-blue-300 uppercase  border border-blue-500/30">
                                  <Focus className="w-3 h-3" /> Auto Track
                                </div>
                           </div>
                        </div>

                        <div className="absolute bottom-6 left-6 text-[10px] md:text-xs text-white/70 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10  font-medium">
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
            <Button onClick={handleWhatsApp} size="lg" className=" h-16 px-4 md:px-10 text-[clamp(14px,2vw,20px)] font-bold rounded-full bg-white text-blue-700 hover:bg-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105 transition-all w-full flex items-center justify-center whitespace-nowrap">
              Consultoria Online Gratuita
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8 text-white/60 text-sm font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Soluções Microsoft Teams Rooms</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Integração Zoom Rooms</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Design sem cabos visíveis</span>
          </div>
        </div>
      </section>

      {/* Trust Bar / Ecossistema - Moved Outside for Better Breathing Room */}
      <section className="relative py-12 px-4 border-t border-b border-white/5 bg-white/[0.01]  z-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-8 text-center">Ecossistema Oficial de Parceiros</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">Microsoft Teams</span>
            <img src="/zoom-logo.png" alt="Zoom" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
            <img src="/google-meet-logo.png" alt="Google Meet" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
            <img src="/shure-logo.png" alt="Shure" className="h-5 md:h-8 w-auto object-contain brightness-0 invert" />
            <img src="/qsys-logo.png" alt="Q-SYS" className="h-6 md:h-10 w-auto object-contain brightness-0 invert" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">BARCO</span>
          </div>
        </div>
      </section>

      {/* Scalability Section */}
      <section className="relative py-24 px-4 md:px-6 z-10 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight mb-6">
              Escalabilidade sem Limites.
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Do Huddle Room rápido à mesa de diretoria de 18 metros. A plataforma Q-SYS permite que a Sonus construa a acústica e automação perfeitas, independente da complexidade da sua sala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Huddle Room */}
            <div className="glass-card rounded-[2rem] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1000&auto=format&fit=crop" loading="lazy" decoding="async" className="h-64 w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" alt="Huddle Room" />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4">Salas Pequenas (Huddle)</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Para reuniões ágeis, focamos em sistemas All-in-One ou pequenos processadores Q-SYS Core Nano. Conexão rápida e BYOD, permitindo que a equipe conecte o laptop e comece a reunião em segundos, com áudio de classe empresarial.
                </p>
              </div>
            </div>

            {/* Medium Room */}
            <div className="glass-card rounded-[2rem] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop" loading="lazy" decoding="async" className="h-64 w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" alt="Salas de Conferência" />
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-4">Salas de Conferência</h3>
                <p className="text-zinc-400 leading-relaxed">
                  O padrão ouro corporativo. Um único microfone de teto Shure MXA920 cobre toda a sala, limpando a mesa de fios. O Q-SYS distribui o áudio perfeitamente e gerencia a câmera PTZ que segue o locutor ativamente.
                </p>
              </div>
            </div>

            {/* Large Room / 18m Boardroom */}
            <div className="col-span-1 md:col-span-2 glass-card-strong bg-gradient-to-br from-blue-900/10 to-emerald-900/5 rounded-[2rem] overflow-hidden group mt-4 relative">
              <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1600&auto=format&fit=crop" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" alt="Boardroom" />
              <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
                    Alta Tecnologia Sonus
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black leading-tight">
                    Boardrooms Extensas <br className="hidden lg:block" /> (Mesas de 18 Metros)
                  </h3>
                  <p className="text-zinc-300 text-lg leading-relaxed">
                    Aqui a distância se torna um desafio. Nossa tecnologia garante que o CEO na ponta da mesa ouça e seja ouvido perfeitamente por quem está a 18 metros de distância.
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    Sincronizamos uma malha de microfones invisíveis no teto para criar um ambiente imersivo. Quem está na sala fala em tom natural, e quem está no home office recebe o áudio cristalino e o vídeo focado de quem está falando, sem cortes ou ecos. O controle da sala inteira fica a um toque de distância.
                  </p>
                </div>
                
                {/* Tech Highlights */}
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                   <div className="bg-black/50  border border-white/10 p-5 rounded-2xl">
                     <div className="text-emerald-400 font-bold text-xl mb-1">Áudio Sincronizado</div>
                     <div className="text-zinc-400 text-xs">Transmissão em tempo real e sem falhas na rede da empresa.</div>
                   </div>
                   <div className="bg-black/50  border border-white/10 p-5 rounded-2xl">
                     <div className="text-blue-400 font-bold text-xl mb-1">Zero Eco Acústico</div>
                     <div className="text-zinc-400 text-xs">Processamento de estúdio para eliminar qualquer ruído ou reverberação.</div>
                   </div>
                   <div className="bg-black/50  border border-white/10 p-5 rounded-2xl">
                     <div className="text-purple-400 font-bold text-xl mb-1">Amplificação Natural</div>
                     <div className="text-zinc-400 text-xs">A voz de quem está longe chega suavemente pelas caixas acústicas da sala.</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-8">
            <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
              Solicitar Projeto para Minha Empresa
            </Button>
          </div>
        </div>
      </section>

      {/* Pain vs Solution Section */}
      <section className="relative py-24 px-4 md:px-6 z-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-black tracking-tight mb-4">
              O fim dos 15 minutos perdidos antes de cada reunião.
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Nosso método elimina a frustração do usuário final, garantindo que o tempo da diretoria seja gasto em decisões, não tentando fazer o áudio funcionar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="glass-card border-red-500/20 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-red-200">A Sala Comum</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <p className="text-zinc-400">Cabos HDMI, USB e adaptadores espalhados pela mesa e quebrando frequentemente.</p>
                </li>
                <li className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <p className="text-zinc-400">Microfones de mesa que não captam quem está no fundo ou sofrem interferência de cadernos e laptops.</p>
                </li>
                <li className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <p className="text-zinc-400">Quem está remoto (em home office) escuta ecos horríveis e se sente excluído da reunião.</p>
                </li>
              </ul>
            </div>

            {/* The Sonus Way */}
            <div className="glass-card border-emerald-500/20 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-200">A Sala Padrão Sonus</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <p className="text-zinc-300"><strong>Mesa Livre:</strong> Nenhum cabo visível. Tudo espelhado sem fio e com baterias carregadas indutivamente.</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <p className="text-zinc-300"><strong>Áudio Invisível:</strong> Microfones no teto filtram ruídos de ar condicionado e captam apenas a voz cristalina.</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                  <p className="text-zinc-300"><strong>Equidade:</strong> O Q-SYS enquadra quem fala. Todos na chamada remota vêem os gestos e expressões de perto.</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all hover:scale-105 active:scale-95">
              Quero o Padrão Sonus na Minha Empresa
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Bento Box */}
      <section className="relative py-24 px-4 md:px-6 z-10 bg-[#020202] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-black tracking-tight mb-4">
              Por que a <span className="text-blue-500">Sonus</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Nós não vendemos apenas caixas de equipamentos. Entregamos a sala pronta para uso, com tecnologia de ponta e respaldo técnico corporativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[250px]">
            <div className="min-h-[250px] md:min-h-0 md:col-span-2 glass-card bg-gradient-to-br from-blue-900/20 to-black rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group hover:bg-white/[0.08] hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-3 relative z-10">Estudo Acústico Prévio</h3>
              <p className="text-zinc-400 text-lg relative z-10 max-w-md">
                Desenhamos o comportamento do som em software 3D antes da instalação para garantir que sua sala não sofrerá com ecos ou reverberação.
              </p>
            </div>

            <div className="min-h-[250px] md:min-h-0 glass-card bg-gradient-to-br from-purple-900/20 to-black rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group hover:bg-white/[0.08] hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">SLA Corporativo</h3>
              <p className="text-zinc-400 text-sm relative z-10">
                Manutenção preventiva e corretiva com tempos de resposta garantidos em contrato.
              </p>
            </div>

            <div className="min-h-[250px] md:min-h-0 glass-card bg-gradient-to-br from-emerald-900/20 to-black rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group hover:bg-white/[0.08] hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Zero Downtime</h3>
              <p className="text-zinc-400 text-sm relative z-10">
                Instalação silenciosa e rápida fora de horário comercial, se necessário.
              </p>
            </div>

            <div className="min-h-[250px] md:min-h-0 md:col-span-2 glass-card bg-gradient-to-br from-zinc-900/50 to-black rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group hover:bg-white/[0.08] hover:scale-[1.01] transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" alt="Painéis" />
              <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-3 relative z-10">Painéis de Um Toque</h3>
              <p className="text-zinc-400 text-lg relative z-10 max-w-md">
                Interfaces simplificadas e desenhadas sob medida (com a logomarca da sua empresa). Qualquer executivo consegue iniciar a reunião sozinho.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all hover:scale-105 active:scale-95">
              Solicitar Estudo Acústico
            </Button>
          </div>
        </div>
      </section>

      {/* O Nosso Método */}
      <section className="relative py-24 px-4 md:px-6 z-10 bg-[#030303] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-black tracking-tight mb-4">
              Do Zero à Primeira Chamada em <span className="text-emerald-500">4 Passos</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Processo previsível para que a sua diretoria saiba exatamente o que será entregue, sem surpresas no meio do caminho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {[
              { step: "01", title: "Consultoria Inicial", desc: "Diagnóstico completo das necessidades da diretoria e mapeamento dos desafios arquitetônicos." },
              { step: "02", title: "Projeto Executivo", desc: "Desenho da arquitetura tecnológica focada em resolver os problemas de áudio e vídeo definitivamente." },
              { step: "03", title: "Zero Downtime", desc: "Instalação física limpa. Equipe técnica atua sem interromper a rotina do seu escritório." },
              { step: "04", title: "SLA Contínuo", desc: "Sala entregue rodando liso. Suporte corporativo e manutenção preventiva garantida." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 glass-card p-8 rounded-3xl text-center group hover:bg-white/[0.08] transition-colors">
                <div className="w-16 h-16 mx-auto bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-2xl font-black text-white/20 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all hover:scale-105 active:scale-95">
              Falar com Especialista Sonus
            </Button>
          </div>
        </div>
      </section>

      {/* Projetos Executados Section */}
      <section className="relative py-24 px-4 md:px-6 z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
               Nosso Portfólio
             </div>
            <h2 className="text-[clamp(2rem,3vw,3.5rem)] font-black tracking-tight mb-4">
              Tecnologia em Prática: Casos de Sucesso
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Veja como transformamos salas reais aplicando acústica de precisão e design minimalista.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="group relative rounded-3xl overflow-hidden bg-zinc-900 aspect-[4/5] md:aspect-[21/9]">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" alt="Sala de Reunião Cresol Baser" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20  rounded-full text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-wider border border-orange-500/20">Cresol Baser</span>
                  <span className="px-3 py-1 bg-blue-500/20  rounded-full text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-wider border border-blue-500/20">Projeto Q-SYS</span>
                  <span className="px-3 py-1 bg-zinc-800/80  rounded-full text-[10px] md:text-xs font-bold text-zinc-300 uppercase tracking-wider border border-white/10">Videoconferência</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Sala de Reunião dos Diretores</h3>
                <p className="text-zinc-300 text-sm md:text-base max-w-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  Projeto de alto padrão executado para a Cresol Baser, integrando videoconferência avançada e captação de áudio invisível para reuniões executivas e decisões estratégicas sem barreiras tecnológicas.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-16 relative z-10">
            <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 rounded-full bg-white hover:bg-zinc-200 text-black text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95">
              Transformar Minha Sala
            </Button>
          </div>
        </div>
      </section>

      {/* Warranty Banner (Estratégico) */}
      <WarrantyBanner 
        variant="corporate"
        title="3 Anos de Garantia nas Salas de Reunião"
        description="Garantimos a disponibilidade tecnológica das suas salas. Nossa instalação corporativa conta com 3 anos de cobertura total contra qualquer falha de infraestrutura. Reuniões sem interrupção e o investimento da sua empresa 100% protegido."
      />

      {/* Bottom CTA Banner (Holographic Glass Design) */}
      <section className="relative py-32 px-4 md:px-6 z-10 bg-zinc-950 overflow-hidden flex items-center justify-center min-h-[80vh]">
        {/* Ambient Glow Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]  mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">Suporte Dedicado</span>
            </div>
            
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight text-white mb-6 leading-[1.1]">
              Eleve o nível da <br className="hidden lg:block"/> sua comunicação.
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              Fale agora com nosso especialista. Desenhamos a arquitetura invisível e perfeita para sua sala de diretoria, sem cabos e sem ruídos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button onClick={handleWhatsApp} size="lg" className=" h-14 px-8 text-lg font-bold rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                Falar com Especialista
              </Button>
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Resposta em até 10 min
              </span>
            </div>
          </div>

          {/* Holographic Chat Window */}
          <div className="w-full max-w-[400px] shrink-0 perspective-1000 group">
            <div className="w-full h-[580px] bg-white/[0.02]  border border-white/[0.08] rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col relative transform-gpu transition-all duration-700 hover:rotate-y-0 rotate-y-[-12deg] rotate-x-[5deg]">
              
              {/* Glass Header */}
              <div className="bg-white/[0.02] border-b border-white/[0.05] p-6 flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 p-[1px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="Sonus" className="w-16 h-auto brightness-0 invert opacity-50" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    Sonus Pro AV
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse" />
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">Equipe de Projetos</div>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative z-0">
                {/* Background ambient inside chat */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-emerald-500/10 blur-[80px]" />
                
                {/* Sonus Message */}
                <div className="animate-chat-bubble flex items-end gap-2 relative" style={{ animationDelay: '500ms' }}>
                  <div className="bg-white/[0.05] text-zinc-200 text-sm p-4 rounded-2xl rounded-bl-sm max-w-[85%] border border-white/[0.05] shadow-lg  font-light leading-relaxed">
                    Olá! Vi que você tem interesse em atualizar a tecnologia das suas salas de reunião. Como posso ajudar?
                  </div>
                </div>
                
                {/* Client Message */}
                <div className="animate-chat-bubble flex items-end justify-end gap-2 relative mt-2" style={{ animationDelay: '2000ms' }}>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm p-4 rounded-2xl rounded-br-sm max-w-[85%] shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] font-medium leading-relaxed">
                    Precisamos de uma solução para nossa sala de diretoria. Atualmente o áudio está ruim nas chamadas.
                  </div>
                </div>
                
                {/* Sonus Message */}
                <div className="animate-chat-bubble flex items-end gap-2 relative mt-2" style={{ animationDelay: '4000ms' }}>
                  <div className="bg-white/[0.05] text-zinc-200 text-sm p-4 rounded-2xl rounded-bl-sm max-w-[85%] border border-white/[0.05] shadow-lg  font-light leading-relaxed">
                    Perfeito! Nós fazemos o projeto acústico e de captação invisível. Vamos agendar um call rápido para entendermos o espaço?
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-5 relative z-10 border-t border-white/[0.05] bg-black/20">
                <div className="h-12 bg-black/40 rounded-full border border-white/[0.08] flex items-center px-5 justify-between shadow-inner">
                  <span className="text-zinc-500 text-sm">Digite sua mensagem...</span>
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Holographic floor reflection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-emerald-500/20 blur-[30px] rounded-full transform rotate-x-60 pointer-events-none" />
          </div>
        </div>
      </section>

      
      {/* Contact Section */}
      <section id="contato" className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden transition-colors duration-300">
        <div className="container px-4 md:px-6 relative z-10">
          <FadeIn className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 transition-colors duration-300">
              Vamos conversar sobre o seu <span className="text-emerald-500">Projeto</span>?
            </h2>
            <p className="text-zinc-400 text-lg transition-colors duration-300">
              Preencha o formulário abaixo e nossos especialistas entrarão em contato para desenhar a arquitetura ideal para sua sala.
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
                    <Input required id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Seu Nome" className="bg-black/50 border-white/10 focus-visible:ring-emerald-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-zinc-300 transition-colors duration-300">Telefone / WhatsApp</label>
                    <Input required id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="(11) 90000-0000" className="bg-black/50 border-white/10 focus-visible:ring-emerald-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300 transition-colors duration-300">E-mail Corporativo</label>
                  <Input required id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com.br" className="bg-black/50 border-white/10 focus-visible:ring-emerald-500 h-12 text-white transition-colors duration-300 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-300 transition-colors duration-300">Como podemos ajudar?</label>
                  <Textarea required id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Ex: Precisamos de uma solução Microsoft Teams para nossa sala de diretoria..." className="bg-black/50 border-white/10 focus-visible:ring-emerald-500 min-h-[150px] resize-none text-white transition-colors duration-300 rounded-xl" />
                </div>

                <div className="flex justify-center pt-2 min-h-[65px]">
                  <Turnstile 
                    siteKey="0x4AAAAAADmmjbWL-CsAzHC9" 
                    onSuccess={(token) => {
                      setSubmitError("");
                      setTurnstileToken(token);
                    }}
                    onError={() => setSubmitError("Erro ao carregar o sistema de segurança. Verifique se o domínio está liberado ou desative seu Adblocker.")}
                    onExpire={() => setTurnstileToken("")}
                    options={{ theme: 'dark' }} 
                  />
                </div>
                
                {submitError && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20">
                    {submitError}
                  </div>
                )}

                <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Enviando..." : "Solicitar Contato"}
                </Button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

<div className="dark relative z-10 w-full bg-black">
        <Footer />
      </div>

      {/* Floating WhatsApp Button directed to Specialist */}
      <WhatsAppButton 
        phone="5546920013151" 
        message="Olá! Gostaria de falar com o especialista Q-SYS sobre Salas de Reunião." 
      />
    </div>
  )
}
