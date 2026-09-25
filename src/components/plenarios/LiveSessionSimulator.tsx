import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export function LiveSessionSimulator() {
  const [phase, setPhase] = useState<'idle' | 'voting' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(20);
  const [votes, setVotes] = useState<Record<number, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to start sequence
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && phase === 'idle') {
        setTimeout(() => setPhase('voting'), 1000);
      }
    }, { threshold: 0.6 });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [phase]);

  // Game loop
  useEffect(() => {
    if (phase !== 'voting') return;
    
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

    // Timeline of votes
    const sequence = [
      { seat: 1, delay: 2000, vote: 'SIM' },
      { seat: 4, delay: 5000, vote: 'NÃO' },
      { seat: 3, delay: 8500, vote: 'SIM' },
      { seat: 2, delay: 13000, vote: 'SIM' },
    ];

    const timeouts = sequence.map(s => 
      setTimeout(() => setVotes(prev => ({...prev, [s.seat]: s.vote})), s.delay)
    );

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [phase]);

  const simCount = Object.values(votes).filter(v => v === 'SIM').length;
  const naoCount = Object.values(votes).filter(v => v === 'NÃO').length;
  

  const parliamentarians = [
    { seat: 1, name: "JONAS", party: "PMU" },
    { seat: 2, name: "MARCOS", party: "PFC" },
    { seat: 3, name: "PAULO", party: "PMU" },
    { seat: 4, name: "JOTA", party: "PQD" },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[#030712] border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] group font-sans">
      
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30" />
      
      {/* Sweeping Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10 bg-black/40 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
            />
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

      <div className="relative z-10 p-6 md:p-10 grid md:grid-cols-[1fr_300px] gap-8">
        
        {/* ── LEFT: MAIN DASHBOARD ── */}
        <div className="space-y-8">
          
          {/* Active Speaker */}
          <div className="bg-gradient-to-r from-blue-900/20 to-transparent border-l-2 border-blue-500 p-6 rounded-r-2xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" /> Tribuna
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">JOTA - PQD</h3>
            <p className="text-zinc-500 mt-1">Pauta 1 — Votação Nominal em Andamento</p>
          </div>

          {/* Real-time Feed */}
          <div className="space-y-3">
            <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Log de Votos em Tempo Real</span>
            <div className="grid grid-cols-2 gap-3">
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
                      borderColor: myVote === 'SIM' ? 'rgba(34,197,94,0.4)' : myVote === 'NÃO' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.05)'
                    }}
                    className="bg-black/50 border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-zinc-500 font-mono block mb-1">Assento {p.seat}</span>
                      <span className="text-sm font-bold text-white">{p.name}</span>
                      <span className="text-xs text-zinc-600 ml-2">{p.party}</span>
                    </div>
                    
                    <div className="w-10 text-right">
                      <AnimatePresence mode="popLayout">
                        {!myVote ? (
                          <motion.div key="waiting" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, scale:0.5}} className="flex justify-end">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-4 h-4 border-2 border-zinc-700 border-t-zinc-400 rounded-full" />
                          </motion.div>
                        ) : myVote === 'SIM' ? (
                          <motion.div key="sim" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} className="text-green-400 font-bold flex items-center gap-1 justify-end">
                            SIM <CheckCircle2 className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <motion.div key="nao" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} className="text-red-400 font-bold flex items-center gap-1 justify-end">
                            NÃO <XCircle className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: VOTING CONSOLE ── */}
        <div className="flex flex-col gap-6">
          
          {/* Big Timer */}
          <div className="bg-[#0a0f20] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group/timer">
            <motion.div 
              className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/timer:opacity-100 transition-opacity" 
            />
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 z-10">Tempo Restante</span>
            <div className="text-6xl font-black font-mono tracking-tighter text-white z-10 flex items-center justify-center w-full">
              00<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>:</motion.span>{timeLeft.toString().padStart(2, '0')}
            </div>
            
            {/* Progress Bar under timer */}
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden z-10">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / 20) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>

          {/* Aggregated Counters */}
          <div className="bg-[#0a0f20] border border-white/5 rounded-3xl p-6 flex-1 flex flex-col justify-center">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 text-center">Apuração Automática</span>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold tracking-wider text-sm">SIM</span>
                <motion.span key={simCount} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-black text-white">{simCount}</motion.span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" animate={{ width: `${(simCount / 4) * 100}%` }} transition={{ type: 'spring' }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-red-400 font-bold tracking-wider text-sm">NÃO</span>
                <motion.span key={naoCount} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-black text-white">{naoCount}</motion.span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" animate={{ width: `${(naoCount / 4) * 100}%` }} transition={{ type: 'spring' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
