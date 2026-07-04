import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Turnstile } from '@marsidev/react-turnstile'
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { FadeIn } from "@/components/ui/FadeIn"
import { Reveal } from "@/components/ui/Reveal"
import { Magnetic } from "@/components/ui/Magnetic"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { 
  Video, Mic, Cast, PhoneCall, Users, PhoneOff, MicOff, CheckCircle2, 
  Camera, Wifi, Target, ShieldCheck, 
  Settings, ChevronRight
} from "lucide-react"
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
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(stepInterval)
  }, [])

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", honeypot: "" })
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
      await addDoc(collection(db, "leads"), {
        ...formData, turnstileToken: finalToken, source: "Landing Page Salas de Reunião", status: "novo", createdAt: serverTimestamp()
      })
      await fetch('/api/contato', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken: finalToken, source: "Landing Page Salas de Reunião" })
      }).catch(e => console.log('Fetch API secundário falhou', e));

      window.location.href = '/obrigado';
    } catch (error) {
      setSubmitError("Ocorreu um erro ao enviar. Por favor, tente novamente ou nos chame no WhatsApp.")
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
    const clearAllTimeouts = () => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; };

    const runLoop = () => {
      if (!mounted) return;
      let nextSpeaker = Math.floor(Math.random() * 4);
      while (nextSpeaker === activeSpeakerRef.current) { nextSpeaker = Math.floor(Math.random() * 4); }
      
      activeSpeakerRef.current = nextSpeaker;
      setActiveSpeaker(nextSpeaker);
      const targetCam = (nextSpeaker === 0 || nextSpeaker === 1) ? 3 : 1;
      
      setCameraState({ liveCam: 2, movingCam: targetCam });
      
      const moveTimeout = setTimeout(() => {
        if (mounted) setCameraState({ liveCam: targetCam, movingCam: null });
      }, 1800);
      timeoutsRef.current.push(moveTimeout);

      const loopTimeout = setTimeout(runLoop, 6000);
      timeoutsRef.current.push(loopTimeout);
    };

    const initialTimeout = setTimeout(runLoop, 3000);
    timeoutsRef.current.push(initialTimeout);

    return () => { mounted = false; clearAllTimeouts(); };
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de falar com o especialista em Salas de Reunião Corporativas.`
    window.open(`https://wa.me/5546920013151?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      <SEO 
        title="Automação de Salas de Reunião | Sonus Pro AV" 
        description="Captação de áudio invisível, acústica e automação para salas de diretoria. Microsoft Teams e Zoom Rooms." 
        image="/salas-corporativas.jpg"
        url="https://sonusproaudio.com.br/salas-reuniao"
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <img fetchPriority="high" decoding="async" src="/soundwave-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]/90" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO — Split Screen Layout                     */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 lg:px-12 z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy & CTA */}
          <div className="space-y-8 max-w-2xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wider text-emerald-300 uppercase">O Padrão Ouro Corporativo</span>
              </div>
            </FadeIn>

            <Reveal>
              <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tighter leading-[0.9]">
                Fim do <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Improviso.
                </span>
              </h1>
            </Reveal>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed">
                Chega de perder os primeiros 15 minutos de reunião tentando fazer o áudio funcionar. 
                Sua sala integrada com captação invisível Shure, processamento Q-SYS e vídeo nativo para Teams e Zoom.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Magnetic>
                <Button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} size="lg" className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
                  Projetar Minha Sala
                </Button>
              </Magnetic>
              <Button onClick={handleWhatsApp} variant="outline" size="lg" className="h-14 px-8 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white text-lg transition-all">
                Ver Funcionando <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </FadeIn>
          </div>

          {/* Right: Interactive 3D Mockup */}
          <FadeIn delay={0.6} direction="left" className="relative w-full">
            <div className="w-full bg-zinc-900 rounded-[2.5rem] p-1.5 md:p-3 shadow-2xl border border-white/10 relative transform-gpu hover:scale-[1.02] transition-transform duration-700">
              
              {/* Fake Bezel */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-30 flex items-center justify-center gap-2 border-b border-x border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
              </div>

              {/* Screen Content */}
              <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-[#0a0a0a] rounded-[2rem] overflow-hidden relative flex flex-col z-20">
                
                {/* Status Bar */}
                <div className="h-10 bg-black/40 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Boardroom Alpha</span>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-mono font-medium">10:00 AM</span>
                  </div>
                </div>

                {/* Main Interactive Dashboard */}
                <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
                  
                  {/* Sidebar Nav */}
                  <div className="w-full md:w-16 flex flex-row md:flex-col gap-2 shrink-0">
                    {[
                      { icon: <Mic className="w-5 h-5" />, label: "Microfone Shure" },
                      { icon: <Video className="w-5 h-5" />, label: "Videoconferência" },
                      { icon: <Camera className="w-5 h-5" />, label: "Câmeras Auto-Track" },
                      { icon: <Cast className="w-5 h-5" />, label: "Apresentação sem Fio" },
                    ].map((item, i) => (
                      <button key={i} onClick={() => setActiveTab(item.label)} title={item.label} className={`flex items-center justify-center p-3 rounded-xl transition-all h-12 w-12 ${activeTab === item.label ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'}`}>
                        {item.icon}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Content */}
                  {activeTab === "Videoconferência" ? (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
                      {callState === "idle" ? (
                        <div className="text-center">
                          <button onClick={() => { setCallState("ringing"); setTimeout(() => setCallState("connected"), 2000) }} className="w-20 h-20 mx-auto rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
                            <Video className="w-8 h-8 text-white" />
                          </button>
                          <h2 className="text-xl font-bold mb-2">Reunião de Diretoria</h2>
                          <p className="text-zinc-400 text-xs">Toque para ingressar na chamada Teams.</p>
                        </div>
                      ) : callState === "ringing" ? (
                        <div className="text-center animate-pulse">
                          <PhoneCall className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
                          <h2 className="text-xl font-bold mb-2">Conectando...</h2>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col bg-black rounded-2xl overflow-hidden border border-white/10">
                          <div className="flex-1 relative flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="Chamada" />
                            <div className="relative z-10 bg-black/60 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span className="font-mono text-sm tracking-wider">{formatTime(callTimer)}</span>
                            </div>
                          </div>
                          <div className="h-16 bg-zinc-900 border-t border-white/10 flex items-center justify-center gap-4">
                            <button onClick={() => setMicMuted(!micMuted)} className={`w-10 h-10 rounded-full flex items-center justify-center ${micMuted ? 'bg-red-500 text-white' : 'bg-white/10'}`}>
                              {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setCallState("idle")} className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white">
                              <PhoneOff className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : activeTab === "Microfone Shure" ? (
                    <div className="flex-1 flex flex-col bg-black/40 border border-white/5 rounded-2xl p-4 relative overflow-hidden animate-in fade-in">
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Rastreamento IA Ativo</span>
                      </div>
                      
                      {/* Câmeras Status */}
                      <div className="flex flex-col gap-4 mt-8 z-20">
                        {[1, 2, 3].map(camId => {
                          const isLive = cameraState.liveCam === camId;
                          const isMoving = cameraState.movingCam === camId;
                          return (
                            <div key={camId} className="flex items-center gap-3 relative">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${isLive ? 'border-red-500 bg-red-500/20 scale-110' : isMoving ? 'border-yellow-500 bg-yellow-500/20' : 'border-white/10 bg-black'}`}>
                                <Camera className={`w-4 h-4 ${isLive ? 'text-red-400' : isMoving ? 'text-yellow-400' : 'text-zinc-600'}`} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase text-zinc-400">Cam {camId} {camId===2?'(Geral)':'(PTZ)'}</span>
                                <span className={`text-[8px] font-bold ${isLive?'text-red-500':isMoving?'text-yellow-500':'text-zinc-600'}`}>{isLive?'NO AR':isMoving?'MOVENDO':'STANDBY'}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Mesa e Lóbulos */}
                      <div className="absolute right-4 bottom-4 top-16 w-48 md:w-64 border-2 border-white/10 rounded-[3rem] flex items-center justify-center z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-emerald-500/30 rounded-md bg-emerald-500/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                        {[
                          { id: 0, pos: "-top-5 left-1/4" },
                          { id: 1, pos: "-top-5 right-1/4" },
                          { id: 2, pos: "-bottom-5 left-1/4" },
                          { id: 3, pos: "-bottom-5 right-1/4" },
                        ].map(speaker => (
                          <div key={speaker.id} className={`absolute ${speaker.pos} flex flex-col items-center transition-all z-10`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeSpeaker === speaker.id ? 'border-emerald-400 bg-emerald-400/20 scale-110' : 'border-white/10 bg-black'}`}>
                              <Users className={`w-4 h-4 ${activeSpeaker === speaker.id ? 'text-emerald-400' : 'text-zinc-600'}`} />
                            </div>
                            {activeSpeaker === speaker.id && <div className="absolute -z-10 w-16 h-16 border border-emerald-500/30 rounded-full animate-ping opacity-50" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in p-6">
                      <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                        <Target className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Simulação de {activeTab}</h3>
                      <p className="text-xs text-zinc-400">Recursos de automação interativa via Q-SYS executados perfeitamente pelo core processador, integrando vídeo, áudio e controle nativamente.</p>
                    </div>
                  )}
                </div>
                
                {/* Reflexo */}
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-white/5 bg-black/50 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
          <img src="/zoom-logo.png" alt="Zoom" className="h-6 object-contain brightness-0 invert" />
          <span className="font-bold tracking-tight text-xl">Microsoft Teams</span>
          <img src="/google-meet-logo.png" alt="Google Meet" className="h-6 object-contain brightness-0 invert" />
          <img src="/shure-logo.png" alt="Shure" className="h-6 object-contain brightness-0 invert" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* SOCIAL PROOF — CHAT HOLOGRÁFICO (Simulação)    */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 bg-[#0a0a0a] relative border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Do Caos à Clareza.</h2>
            <p className="text-zinc-400 text-lg">A evolução real de quem parou de usar gambiarras.</p>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-4 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* O Passado */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center font-bold shrink-0">DC</div>
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Diretor Comercial • 10:14 AM</span>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-lg">
                  Pessoal, já estamos 15 min na reunião com a filial de SP e o áudio da mesa não funciona. Alguém da TI pode vir na Boardroom? O cabo HDMI parece que quebrou.
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center font-bold shrink-0">TI</div>
              <div className="flex flex-col items-start max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">Suporte TI • 10:17 AM</span>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-lg">
                  Estou descendo. Aquela matriz antiga travou de novo, vou reiniciar o rack. Pede pra eles aguardarem 5 min.
                </div>
              </div>
            </div>

            <div className="py-6 flex items-center justify-center gap-4">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">6 Meses Depois - Padrão Sonus Aplicado</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* O Presente */}
            <div className="flex gap-4 justify-end">
              <div className="flex flex-col items-end max-w-[85%]">
                <span className="text-xs text-zinc-500 font-medium mb-1">CEO • 09:05 AM</span>
                <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-2xl rounded-tr-none p-4 text-sm text-emerald-100 shadow-lg">
                  Reunião de hoje foi perfeita. Apertei um botão na tela, a luz baixou e o Teams conectou. O áudio estava cristalino para quem estava remoto. Ótimo trabalho com a reforma da sala.
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold shrink-0">CE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* BENTO GRID OF BENEFITS                        */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              A Diferença da Instalação Premium
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Nós não vendemos caixas. Nós entregamos um ecossistema.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn className="md:col-span-2">
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">SLA Corporativo & Zero Downtime</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  Manutenção preventiva, monitoramento remoto de ativos via nuvem e atuação fora do horário comercial para não interromper a rotina da sua diretoria. Seu sistema nunca fica inoperante.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.1}>
              <SpotlightCard className="h-full rounded-3xl p-8 border border-white/10 bg-zinc-950/80">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Painéis Personalizados</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Telas de um toque desenhadas com a logo e cores da sua empresa. Sem curva de aprendizado para a equipe.
                </p>
              </SpotlightCard>
            </FadeIn>

            <FadeIn delay={0.2} className="md:col-span-3">
              <SpotlightCard className="rounded-3xl p-8 border border-white/10 bg-zinc-950/80 md:flex items-center justify-between gap-8">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                    <Mic className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Estudo Acústico 3D Gratuito</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    Antes de qualquer cabo ser passado, nossa engenharia desenha sua sala em software 3D para prever reverberações e definir a angulação exata dos microfones de teto.
                  </p>
                </div>
                <div className="md:w-1/2 bg-black rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=1000&auto=format&fit=crop" className="w-full h-48 object-cover rounded-xl opacity-50 grayscale" alt="Estudo" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-emerald-500/20 text-emerald-400 font-mono text-sm px-4 py-2 border border-emerald-500/30 rounded backdrop-blur">Simulação EASE Focus Finalizada</span>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TIMELINE - 4 PASSOS                           */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-4 bg-[#030303] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
              Do Zero à Primeira Chamada em <span className="text-emerald-500">4 Passos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mt-12">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-white/5 rounded-full overflow-hidden">
               <div className="absolute top-0 h-full w-1/4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] transition-all duration-1000 ease-in-out" style={{ left: `${(activeStep / 3) * 100}%`, transform: 'translateX(-50%)' }} />
            </div>
            
            {[
              { step: "01", title: "Consultoria", desc: "Mapeamento dos desafios arquitetônicos da diretoria." },
              { step: "02", title: "Projeto", desc: "Desenho da arquitetura de TI/AV em planta 3D." },
              { step: "03", title: "Instalação", desc: "Equipe atua sem interromper a rotina corporativa." },
              { step: "04", title: "SLA", desc: "Sala rodando lisa com suporte corporativo 24/7." }
            ].map((item, i) => (
              <div key={i} className={`relative z-10 p-6 rounded-3xl text-center transition-all duration-700 ${activeStep === i ? 'bg-zinc-900 border border-emerald-500/30 shadow-2xl -translate-y-2' : 'bg-transparent border-transparent'}`}>
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className={`relative w-full h-full rounded-full flex items-center justify-center text-2xl font-black transition-all ${activeStep === i ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-black border border-white/10 text-zinc-600'}`}>
                    {item.step}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeStep === i ? 'text-white' : 'text-zinc-500'}`}>{item.title}</h3>
                <p className={`text-sm ${activeStep === i ? 'text-zinc-300' : 'text-zinc-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WarrantyBanner variant="qsys" title="3 Anos de Garantia Premium" description="Confiamos plenamente na robustez das nossas instalações corporativas. 3 anos de garantia integral sobre infraestrutura." />

      {/* ══════════════════════════════════════════════ */}
      {/* CONTACT FORM                                  */}
      {/* ══════════════════════════════════════════════ */}
      <section id="contato" className="py-24 px-4 relative bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Otimize Sua <span className="text-emerald-500">Boardroom</span>
            </h2>
            <p className="text-zinc-400">Nossos engenheiros entrarão em contato para um diagnóstico sem compromisso.</p>
          </div>

          <SpotlightCard className="rounded-[2rem] p-6 md:p-12 border border-white/10 bg-zinc-950/50">
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Solicitação Recebida!</h3>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">Nova solicitação</Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={(e) => setFormData({...formData, honeypot: e.target.value})} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-zinc-400">Nome</label>
                    <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-black border-white/10 mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400">WhatsApp/Telefone</label>
                    <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-black border-white/10 mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-zinc-400">E-mail Profissional</label>
                  <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-black border-white/10 mt-1" />
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Quantas salas você precisa otimizar?</label>
                  <Textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-black border-white/10 mt-1 h-32" />
                </div>

                <div className="flex justify-center pt-2 min-h-[65px]">
                  <Turnstile siteKey="0x4AAAAAADmmjbWL-CsAzHC9" onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />
                </div>
                
                {submitError && <div className="text-red-500 text-sm text-center">{submitError}</div>}

                <Magnetic>
                  <Button disabled={isSubmitting} type="submit" size="lg" className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-lg font-bold">
                    {isSubmitting ? "Enviando..." : "Falar com Engenheiro"}
                  </Button>
                </Magnetic>
              </form>
            )}
          </SpotlightCard>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phone="5546920013151" message="Olá! Gostaria de falar sobre Automação de Salas de Reunião." />
    </div>
  )
}
