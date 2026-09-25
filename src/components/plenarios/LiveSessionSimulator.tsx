import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, MinusCircle } from 'lucide-react';

export const LiveSessionSimulator = memo(function LiveSessionSimulator() {
  const [phase, setPhase] = useState<'idle' | 'voting' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(20);
  const [votes, setVotes] = useState<Record<number, string>>({});
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to start sequence and track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting && phase === 'idle') {
        setTimeout(() => setPhase('voting'), 1000);
      }
    }, { threshold: 0.2 });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [phase]);

  // Game loop (only ticks when in view to save battery/CPU)
  useEffect(() => {
    if (phase !== 'voting' || !isInView) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Timeline of votes - we only run them if we haven't received them yet
    const sequence = [
      { seat: 1, targetTime: 18, vote: 'SIM' },
      { seat: 5, targetTime: 16, vote: 'SIM' },
      { seat: 6, targetTime: 13, vote: 'NÃO' },
      { seat: 3, targetTime: 10, vote: 'ABS' },
      { seat: 2, targetTime: 7, vote: 'SIM' },
      { seat: 4, targetTime: 3, vote: 'SIM' },
    ];

    sequence.forEach(s => {
      if (timeLeft === s.targetTime && !votes[s.seat]) {
        setVotes(prev => ({...prev, [s.seat]: s.vote}));
      }
    });

    return () => clearInterval(timer);
  }, [phase, isInView, timeLeft, votes]);

  const simCount = Object.values(votes).filter(v => v === 'SIM').length;
  const naoCount = Object.values(votes).filter(v => v === 'NÃO').length;
  const absCount = Object.values(votes).filter(v => v === 'ABS').length;

  const parliamentarians = [
    { seat: 1, name: "JONAS", party: "PMU" },
    { seat: 2, name: "MARIA", party: "PRV" },
    { seat: 3, name: "MARCOS", party: "PFC" },
    { seat: 4, name: "PAULO", party: "PMU" },
    { seat: 5, name: "ANA", party: "PFC" },
    { seat: 6, name: "JOTA", party: "PQD" },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#030712] border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] group font-sans" style={{ willChange: 'transform, opacity' }}>
      
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30" />
      
      {/* Sweeping Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10 bg-black/40 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
            {isInView && (
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
              />
            )}
            {!isInView && <div className="w-2 h-2 rounded-full bg-red-500" />}
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Ao Vivo</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider hidden sm:block">10ª Sessão Ordinária</span>
        </div>
        <div className="text-zinc-500 font-mono text-sm">
          {phase === 'idle' ? 'AGUARDANDO INÍCIO...' : 
           phase === 'voting' ? <span className="text-blue-400">RECEBENDO DADOS...</span> : 
           <span className="text-green-400">SESSÃO ENCERRADA</span>}
        </div>
      </div>

      <div className="relative z-10 p-6 md:p-10 grid lg:grid-cols-[1fr_300px] gap-8">
        
        {/* ── LEFT: MAIN DASHBOARD ── */}
        <div className="space-y-8">
          
          <div className="bg-gradient-to-r from-blue-900/20 to-transparent border-l-2 border-blue-500 p-6 rounded-r-2xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" /> Tribuna
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">JOTA - PQD</h3>
            <p className="text-zinc-500 mt-1">Pauta 1 — Votação Nominal em Andamento</p>
          </div>

          <div className="space-y-3">
            <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Log de Votos em Tempo Real</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {parliamentarians.map((p) => {
                const myVote = votes[p.seat];
                return (
                  <motion.div 
                    key={p.seat}
                    layout
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ 
                      opacity: myVote ? 1 : 0.5, 
                      scale: myVote ? 1 : 0.98,
                      borderColor: myVote === 'SIM' ? 'rgba(34,197,94,0.4)' : myVote === 'NÃO' ? 'rgba(239,68,68,0.4)' : myVote === 'ABS' ? 'rgba(161,161,170,0.4)' : 'rgba(255,255,255,0.05)'
                    }}
                    style={{ willChange: 'transform, opacity' }}
                    className="bg-black/50 border rounded-xl p-3 md:p-4 flex flex-col justify-between min-h-[90px]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-zinc-500 font-mono block">Assento {p.seat}</span>
                        <div className="w-4 h-4 flex-shrink-0">
                          <AnimatePresence mode="popLayout">
                            {!myVote ? (
                              <motion.div key="waiting" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, scale:0.5}}>
                                {isInView ? (
                                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-4 h-4 border-[1.5px] border-zinc-700 border-t-zinc-400 rounded-full" />
                                ) : (
                                  <div className="w-4 h-4 border-[1.5px] border-zinc-700 border-t-zinc-400 rounded-full" />
                                )}
                              </motion.div>
                            ) : myVote === 'SIM' ? (
                              <motion.div key="sim" initial={{scale:0}} animate={{scale:1}} className="text-green-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </motion.div>
                            ) : myVote === 'NÃO' ? (
                              <motion.div key="nao" initial={{scale:0}} animate={{scale:1}} className="text-red-400">
                                <XCircle className="w-4 h-4" />
                              </motion.div>
                            ) : (
                              <motion.div key="abs" initial={{scale:0}} animate={{scale:1}} className="text-zinc-400">
                                <MinusCircle className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-zinc-600 block">{p.party}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: VOTING CONSOLE ── */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-[#0a0f20] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden group/timer">
            <motion.div 
              className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/timer:opacity-100 transition-opacity" 
            />
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 z-10">Tempo Restante</span>
            <div className="text-5xl md:text-6xl font-black font-mono tracking-tighter text-white z-10 flex items-center justify-center w-full">
              00
              {isInView ? (
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>:</motion.span>
              ) : <span>:</span>}
              {timeLeft.toString().padStart(2, '0')}
            </div>
            
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden z-10">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / 20) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
                style={{ willChange: 'width' }}
              />
            </div>
          </div>

          <div className="bg-[#0a0f20] border border-white/5 rounded-3xl p-6 flex-1 flex flex-col justify-center">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 text-center">Apuração Automática</span>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold tracking-wider text-sm">SIM</span>
                <motion.span key={simCount} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-black text-white">{simCount}</motion.span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" animate={{ width: `${(simCount / 6) * 100}%` }} transition={{ type: 'spring' }} style={{ willChange: 'width' }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-red-400 font-bold tracking-wider text-sm">NÃO</span>
                <motion.span key={naoCount} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-black text-white">{naoCount}</motion.span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" animate={{ width: `${(naoCount / 6) * 100}%` }} transition={{ type: 'spring' }} style={{ willChange: 'width' }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-zinc-400 font-bold tracking-wider text-sm">ABS</span>
                <motion.span key={absCount} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-black text-white">{absCount}</motion.span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-zinc-500 shadow-[0_0_10px_rgba(161,161,170,0.5)]" animate={{ width: `${(absCount / 6) * 100}%` }} transition={{ type: 'spring' }} style={{ willChange: 'width' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
});
