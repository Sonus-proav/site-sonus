import { useRef, useEffect, useState, memo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Wifi, Clock, Wrench } from 'lucide-react';

export const WarrantyShield3D = memo(function WarrantyShield3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef<number>(0);

  // Heavy-duty spring for dramatic tilt feel
  const springConfig = { stiffness: 100, damping: 15, mass: 0.8 };

  // Tilt — now 28 degrees for real depth drama
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [28, -28]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), springConfig);

  // Specular highlight — moves opposite to mouse = realistic light reflection
  const specularX = useTransform(mouseX, [-0.5, 0.5], ['75%', '25%']);
  const specularY = useTransform(mouseY, [-0.5, 0.5], ['25%', '75%']);

  // Parallax layers — each at different depth
  const layer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig); // deepest
  const layer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);
  const layer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig); // mid
  const layer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-7, 7]), springConfig);
  const layer3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);   // surface
  const layer3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3, 3]), springConfig);

  // Shadow shifts opposite to tilt direction
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-30px', '30px']), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['-20px', '20px']), springConfig);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
    }, { threshold: 0.25 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!shieldRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = shieldRef.current!.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    });
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const features = [
    { icon: Wifi, label: 'Monitoramento Remoto 24/7', desc: 'Via Q-SYS Reflect' },
    { icon: Clock, label: 'SLA Garantido', desc: 'Nenhuma sessão suspensa' },
    { icon: Wrench, label: 'Suporte Preventivo', desc: 'Falhas resolvidas antes de acontecerem' },
  ];

  const circuitPaths = [
    "M 50 0 L 50 80 L 150 80",
    "M 250 0 L 250 120 L 150 120",
    "M 0 200 L 80 200 L 80 280 L 150 280",
    "M 300 250 L 220 250 L 220 300 L 150 300",
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden bg-[#020205]"
    >
      {/* Ambient background — responds to hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isHovering ? {
          background: 'radial-gradient(ellipse at 35% 50%, rgba(16,185,129,0.1) 0%, transparent 55%)'
        } : {
          background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)'
        }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: TRUE 3D SHIELD ── */}
          <div className="flex justify-center items-center" style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
            <motion.div
              ref={shieldRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 25 }}
              animate={hasAnimated ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-72 md:w-80 md:h-[22rem] cursor-default"
            >
              {/* ── DEPTH SHADOW (moves opposite to tilt) ── */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-[100%] blur-2xl"
                style={{
                  x: shadowX,
                  y: shadowY,
                  background: 'radial-gradient(ellipse, rgba(16,185,129,0.35) 0%, transparent 70%)',
                  willChange: 'transform',
                }}
                animate={isInView ? { opacity: [0.3, 0.6, 0.3] } : {}}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              />

              {/* ── LAYER 0: BACK PLATE (deepest in Z) ── */}
              <motion.div
                style={{ x: layer1X, y: layer1Y, willChange: 'transform' }}
                className="absolute inset-0 rounded-3xl"
              >
                <div
                  className="absolute inset-0 rounded-3xl border border-emerald-500/10 bg-[#030f0a]"
                  style={{ transform: 'translateZ(-20px) scale(0.96)', filter: 'blur(0.5px)' }}
                />
                <div
                  className="absolute inset-0 rounded-3xl border border-emerald-500/5 bg-[#010805]"
                  style={{ transform: 'translateZ(-40px) scale(0.92)', filter: 'blur(1px)' }}
                />
              </motion.div>

              {/* ── LAYER 1: MAIN CARD ── */}
              <motion.div
                style={{ x: layer2X, y: layer2Y, willChange: 'transform' }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#0d2018] via-[#061510] to-[#020a08] shadow-[0_30px_80px_rgba(16,185,129,0.2),0_0_0_1px_rgba(16,185,129,0.12)] overflow-hidden"
                  style={{ transform: 'translateZ(0px)' }}
                >
                  {/* Holographic shimmer */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(16,185,129,0.08) 42%, rgba(56,189,248,0.07) 48%, rgba(16,185,129,0.04) 52%, transparent 58%)',
                      backgroundSize: '300% 100%',
                      animation: isHovering ? 'warranty-shimmer 2.5s ease-in-out infinite' : 'none',
                    }}
                  />

                  {/* Specular highlight — follows mouse in real time */}
                  <motion.div
                    className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
                    style={{
                      left: specularX,
                      top: specularY,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
                      willChange: 'left, top',
                    }}
                  />

                  {/* Circuit draw-in */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 350">
                    {circuitPaths.map((d, i) => (
                      <motion.path
                        key={i}
                        d={d}
                        stroke="rgba(16,185,129,0.2)"
                        fill="none"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={hasAnimated ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{
                          pathLength: { duration: 2, delay: 0.8 + i * 0.25, ease: 'easeInOut' },
                          opacity: { duration: 0.3, delay: 0.8 + i * 0.25 }
                        }}
                        style={{ willChange: 'stroke-dashoffset' }}
                      />
                    ))}
                    {[{ cx: 150, cy: 80, delay: 1.5 }, { cx: 150, cy: 120, delay: 1.8 }, { cx: 150, cy: 280, delay: 2.3 }, { cx: 150, cy: 300, delay: 2.6 }].map((dot, i) => (
                      <motion.circle key={i} cx={dot.cx} cy={dot.cy} r="3" fill="rgba(16,185,129,0.7)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={hasAnimated ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: dot.delay, type: 'spring', stiffness: 300 }}
                      />
                    ))}
                    {isInView && (
                      <circle r="2.5" fill="rgba(16,185,129,0.9)" filter="url(#glow)">
                        <animateMotion dur="6s" repeatCount="indefinite"
                          path="M 150 40 C 250 40 280 180 250 280 C 220 350 80 350 50 280 C 20 180 50 40 150 40" />
                      </circle>
                    )}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                  </svg>

                  {/* Shield + scan */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {isInView && (
                      <>
                        <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-emerald-500/10" style={{ animation: 'warranty-ring 3.5s ease-in-out infinite' }} />
                        <div className="absolute w-52 h-52 md:w-60 md:h-60 rounded-full border border-emerald-500/5" style={{ animation: 'warranty-ring 3.5s ease-in-out infinite 0.7s' }} />
                      </>
                    )}

                    <motion.div
                      className="relative"
                      initial={{ scale: 0, rotateY: -180 }}
                      animate={hasAnimated ? { scale: 1, rotateY: 0 } : {}}
                      transition={{ duration: 1.1, delay: 0.3, type: 'spring', stiffness: 120 }}
                    >
                      <ShieldCheck className="w-20 h-20 md:w-28 md:h-28 text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.7)]" strokeWidth={1} />
                      {isInView && (
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute left-0 right-0 h-8" style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.15) 40%, rgba(16,185,129,0.45) 50%, rgba(16,185,129,0.15) 60%, transparent)',
                            animation: 'warranty-scan 3s ease-in-out infinite',
                            willChange: 'transform',
                          }} />
                        </div>
                      )}
                    </motion.div>

                    <motion.div className="mt-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-6xl md:text-7xl font-black text-white tracking-tighter font-mono">
                          <CountUp target={3} delay={1000} active={hasAnimated} />
                        </span>
                        <motion.span className="text-lg md:text-xl font-bold text-emerald-400 uppercase tracking-widest"
                          initial={{ opacity: 0, x: -10 }}
                          animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 1.7, duration: 0.5 }}
                        >
                          Anos
                        </motion.span>
                      </div>
                      <motion.div className="text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase mt-1"
                        initial={{ opacity: 0 }}
                        animate={hasAnimated ? { opacity: 1 } : {}}
                        transition={{ delay: 1.9 }}
                      >
                        Garantia Total
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Glass edge highlight */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.03) 100%)',
                  }} />
                </div>
              </motion.div>

              {/* ── LAYER 2: FLOATING ICONS (highest Z = most parallax) ── */}
              <motion.div
                style={{ x: layer3X, y: layer3Y, willChange: 'transform' }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Wifi icon — top right */}
                <motion.div
                  className="absolute -right-5 -top-5 w-12 h-12 md:w-16 md:h-16 bg-emerald-950 rounded-2xl border border-emerald-500/30 flex items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.25),0_0_0_1px_rgba(16,185,129,0.1)]"
                  style={{ transform: 'translateZ(60px)' }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                >
                  <Wifi className="w-5 h-5 md:w-7 md:h-7 text-emerald-400" />
                  {isInView && (
                    <div className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,1)]" style={{ animation: 'warranty-orbit 4s linear infinite', willChange: 'transform' }} />
                  )}
                </motion.div>

                {/* Wrench icon — left middle */}
                <motion.div
                  className="absolute -left-5 top-1/3 w-10 h-10 md:w-14 md:h-14 bg-blue-950 rounded-2xl border border-blue-500/30 flex items-center justify-center shadow-[0_8px_32px_rgba(59,130,246,0.25)]"
                  style={{ transform: 'translateZ(50px)' }}
                  initial={{ opacity: 0, scale: 0, x: -20 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1, x: 0 } : {}}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                >
                  <Wrench className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                  {isInView && (
                    <div className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" style={{ animation: 'warranty-orbit 5s linear infinite reverse', willChange: 'transform' }} />
                  )}
                </motion.div>

                {/* Clock icon — bottom right */}
                <motion.div
                  className="absolute right-0 -bottom-4 w-10 h-10 md:w-12 md:h-12 bg-cyan-950 rounded-xl border border-cyan-500/30 flex items-center justify-center shadow-[0_8px_24px_rgba(34,211,238,0.2)]"
                  style={{ transform: 'translateZ(40px)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
                >
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT: CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {isInView && (
                <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              {!isInView && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Proteção Ativa</span>
            </motion.div>

            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              3 Anos de Garantia
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">e SLA Blindado</span>
            </h3>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de garantia sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager.
            </p>

            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={hasAnimated ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8, transition: { duration: 0.25 } }}
                  className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-emerald-500/25 hover:bg-emerald-500/[0.04] transition-colors duration-500 group/pill cursor-default"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover/pill:bg-emerald-500/20 group-hover/pill:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500">
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

function CountUp({ target, delay, active }: { target: number; delay: number; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setCount(current);
        if (current >= target) clearInterval(interval);
      }, 200);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, target, delay]);
  return <>{count}</>;
}
