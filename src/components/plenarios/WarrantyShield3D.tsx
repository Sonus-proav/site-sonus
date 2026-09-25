import { useRef, useEffect, useState, memo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShieldCheck, Wifi, Clock, Wrench } from 'lucide-react';

export const WarrantyShield3D = memo(function WarrantyShield3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.3 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const features = [
    { icon: Wifi, label: 'Monitoramento Remoto 24/7', desc: 'Via Q-SYS Reflect' },
    { icon: Clock, label: 'SLA Garantido', desc: 'Nenhuma sessão suspensa' },
    { icon: Wrench, label: 'Suporte Preventivo', desc: 'Falhas resolvidas antes de acontecerem' },
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-20 md:py-32 overflow-hidden bg-[#020205]"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(16,185,129,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.04)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: 3D FLOATING SHIELD ── */}
          <div className="flex justify-center" style={{ perspective: '1200px' }}>
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-72 md:w-80 md:h-[22rem] cursor-default group/shield"
            >
              {/* Floating shadow underneath */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-[100%] bg-emerald-500/20 blur-xl"
                animate={isInView ? { 
                  scaleX: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3] 
                } : {}}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              />

              {/* Main 3D card */}
              <div 
                className="absolute inset-0 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#0a1a15] via-[#061210] to-[#020a08] shadow-[0_20px_60px_rgba(16,185,129,0.15),0_0_0_1px_rgba(16,185,129,0.1)] overflow-hidden"
                style={{ transform: 'translateZ(0px)' }}
              >
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.08)_0%,transparent_60%)] opacity-0 group-hover/shield:opacity-100 transition-opacity duration-700" />

                {/* Circuit lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 300 350">
                  <path d="M 50 0 L 50 80 L 150 80" stroke="currentColor" fill="none" strokeWidth="1" className="text-emerald-400" />
                  <path d="M 250 0 L 250 120 L 150 120" stroke="currentColor" fill="none" strokeWidth="1" className="text-emerald-400" />
                  <path d="M 0 200 L 80 200 L 80 280 L 150 280" stroke="currentColor" fill="none" strokeWidth="1" className="text-emerald-400" />
                  <path d="M 300 250 L 220 250 L 220 300 L 150 300" stroke="currentColor" fill="none" strokeWidth="1" className="text-emerald-400" />
                  <circle cx="150" cy="80" r="3" className="fill-emerald-400" />
                  <circle cx="150" cy="120" r="3" className="fill-emerald-400" />
                  <circle cx="150" cy="280" r="3" className="fill-emerald-400" />
                  <circle cx="150" cy="300" r="3" className="fill-emerald-400" />
                </svg>

                {/* Central shield emblem */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* Pulsing halo behind */}
                  <motion.div 
                    className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full"
                    animate={isInView ? { 
                      boxShadow: [
                        '0 0 30px rgba(16,185,129,0.1), 0 0 60px rgba(16,185,129,0.05)',
                        '0 0 40px rgba(16,185,129,0.2), 0 0 80px rgba(16,185,129,0.1)',
                        '0 0 30px rgba(16,185,129,0.1), 0 0 60px rgba(16,185,129,0.05)'
                      ]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  />

                  {/* Shield icon with scan line */}
                  <div className="relative">
                    <ShieldCheck 
                      className="w-20 h-20 md:w-28 md:h-28 text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]" 
                      strokeWidth={1} 
                    />
                    {/* Scan line across shield */}
                    {isInView && (
                      <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                      />
                    )}
                  </div>

                  {/* Big number */}
                  <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-6xl md:text-7xl font-black text-white tracking-tighter font-mono">3</span>
                      <span className="text-lg md:text-xl font-bold text-emerald-400 uppercase tracking-widest">Anos</span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase mt-1">Garantia Total</div>
                  </motion.div>
                </div>

                {/* Reflected edge highlight */}
                <div 
                  className="absolute inset-0 rounded-3xl" 
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, transparent 80%, rgba(255,255,255,0.02) 100%)',
                    transform: 'translateZ(1px)' 
                  }} 
                />
              </div>

              {/* Depth layers for parallax */}
              <motion.div 
                className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm"
                style={{ transform: 'translateZ(40px)' }}
                animate={isInView ? { y: [0, -6, 0] } : {}}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              >
                <Wifi className="w-5 h-5 md:w-7 md:h-7 text-emerald-400" />
              </motion.div>

              <motion.div 
                className="absolute -left-3 bottom-16 w-10 h-10 md:w-14 md:h-14 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm"
                style={{ transform: 'translateZ(30px)' }}
                animate={isInView ? { y: [0, 8, 0] } : {}}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              >
                <Wrench className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT: CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Proteção Ativa</span>
            </div>

            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              3 Anos de Garantia
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">e SLA Blindado</span>
            </h3>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de garantia sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager.
            </p>

            {/* Feature pills */}
            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                  className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] transition-all duration-500 group/pill"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover/pill:bg-emerald-500/20 transition-colors">
                    <f.icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm md:text-base block">{f.label}</span>
                    <span className="text-zinc-500 text-xs md:text-sm">{f.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});
