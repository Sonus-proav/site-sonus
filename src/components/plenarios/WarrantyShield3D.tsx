import { useRef, useEffect, useState, memo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { ShieldCheck, Wifi, Clock, Wrench } from 'lucide-react';

export const WarrantyShield3D = memo(function WarrantyShield3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Motion values for automatic idle animation (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for all 3D effects
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  // Tilt ?" up to 30 degrees for deep 3D
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);

  // Specular highlight ?" realistic light reflection
  const specularX = useTransform(mouseX, [-0.5, 0.5], ['100%', '0%']);
  const specularY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  // Dynamic shadow
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-40px', '40px']), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['-20px', '40px']), springConfig);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
    }, { threshold: 0.25 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // AUTOMATIC IDLE ANIMATION (No mouse tracking)
  useEffect(() => {
    if (isInView) {
      // Gently tilt around automatically in a seamless loop
      const controlsX = animate(mouseX, [0, 0.25, 0, -0.25, 0], { duration: 10, repeat: Infinity, ease: "easeInOut" });
      const controlsY = animate(mouseY, [0, 0.15, 0, -0.15, 0], { duration: 7, repeat: Infinity, ease: "easeInOut" });
      return () => {
        controlsX.stop();
        controlsY.stop();
      };
    }
  }, [isInView, mouseX, mouseY]);

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

  // SVG Data URI for masking the scan line perfectly to the shield icon's interior
  const shieldMaskUri = `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E")`;

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden bg-[#020205]"
    >
      {/* Ambient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 35% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.06)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

          {/* "?"? LEFT: TRUE 3D SHIELD "?"? */}
          <div className="flex justify-center items-center" style={{ perspective: '1000px', perspectiveOrigin: 'center center' }}>
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-72 md:w-80 md:h-[22rem] cursor-default"
            >
              {/* "?"? DEPTH SHADOW "?"? */}
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-12 rounded-[100%] pointer-events-none"
                initial={{ z: -100 }}
                style={{
                  x: shadowX,
                  y: shadowY,
                  background: 'radial-gradient(ellipse, rgba(16,185,129,0.5) 0%, transparent 70%)',
                  
                }}
                animate={isInView ? { opacity: [0.4, 0.7, 0.4] } : {}}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              />

              {/* "?"? LAYER -1: BACK PLATE (Deep Z) "?"? */}
              <div 
                className="absolute inset-0 rounded-3xl border border-emerald-500/20 bg-[#030b08]"
                style={{ transform: 'translateZ(-40px) scale(0.95)' }}
              />
              <div 
                className="absolute inset-0 rounded-3xl border border-emerald-500/30 bg-[#030f0a]/90"
                style={{ transform: 'translateZ(-20px) scale(0.98)' }}
              />

              {/* "?"? LAYER 0: MAIN CARD BASE "?"? */}
              <div
                className="absolute inset-0 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-[#0a1f18] via-[#051410] to-[#020a08] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden"
                style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
              >
                {/* Shimmer sweep */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(16,185,129,0.1) 42%, rgba(56,189,248,0.1) 48%, rgba(16,185,129,0.05) 52%, transparent 58%)',
                    backgroundSize: '300% 100%',
                    animation: 'warranty-shimmer 3s ease-in-out infinite',
                    willChange: 'background-position',
                  }}
                />

                {/* Specular light tracking */}
                <motion.div
                  className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
                  style={{
                    left: specularX,
                    top: specularY,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />

                {/* Circuit paths */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 350" style={{ transform: 'translateZ(10px)' }}>
                  {circuitPaths.map((d, i) => (
                    <motion.path key={i} d={d} stroke="rgba(16,185,129,0.25)" fill="none" strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={hasAnimated ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 0.8 + i * 0.25, ease: 'easeInOut' }}
                    />
                  ))}
                  {isInView && (
                    <circle r="3" fill="rgba(16,185,129,1)" style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,1))", willChange: "transform" }}>
                      <animateMotion dur="5s" repeatCount="indefinite"
                        path="M 150 40 C 250 40 280 180 250 280 C 220 350 80 350 50 280 C 20 180 50 40 150 40" />
                    </circle>
                  )}
                  
                </svg>
              </div>

              {/* "?"? LAYER 1: CENTER CONTENT (Popped out) "?"? */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                {/* Rings */}
                {isInView && (
                  <>
                    <div className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-emerald-500/20" style={{ animation: 'warranty-ring 3s ease-in-out infinite', willChange: 'transform, opacity' }} />
                    <div className="absolute w-52 h-52 md:w-60 md:h-60 rounded-full border border-emerald-500/10" style={{ animation: 'warranty-ring 3s ease-in-out infinite 0.7s', willChange: 'transform, opacity' }} />
                  </>
                )}

                {/* Shield Icon */}
                <motion.div
                  className="relative flex items-center justify-center"
                  
                  initial={{ scale: 0, rotateY: -180, z: 20 }}
                  animate={hasAnimated ? { scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                  <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-emerald-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter drop-shadow-lg" strokeWidth={1} />
                  
                  {/* Holographic Scan Line - MASKED STRICTLY TO THE SHIELD */}
                  {isInView && (
                    <div 
                      className="absolute inset-0 overflow-hidden" 
                      style={{ 
                        WebkitMaskImage: shieldMaskUri,
                        WebkitMaskSize: '100% 100%',
                        WebkitMaskRepeat: 'no-repeat',
                        maskImage: shieldMaskUri,
                        maskSize: '100% 100%',
                        maskRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute left-0 right-0 h-10" style={{
                        background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.3) 40%, rgba(16,185,129,0.9) 50%, rgba(16,185,129,0.3) 60%, transparent)',
                        animation: 'warranty-scan 2.5s ease-in-out infinite',
                        willChange: 'transform',
                      }} />
                    </div>
                  )}
                </motion.div>

                {/* Text Content */}
                <motion.div className="mt-8 text-center bg-black/70 px-6 py-2 rounded-2xl border border-white/5"
                  
                  initial={{ opacity: 0, y: 20, z: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <div className="flex items-baseline justify-center gap-2 drop-shadow-xl">
                    <span className="text-6xl md:text-7xl font-black text-white tracking-tighter font-mono">
                      <CountUp target={3} delay={1000} active={hasAnimated} />
                    </span>
                    <motion.span className="text-xl md:text-2xl font-bold text-emerald-400 uppercase tracking-widest"
                      initial={{ opacity: 0, x: -10 }}
                      animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1.7, duration: 0.5 }}
                    >
                      Anos
                    </motion.span>
                  </div>
                  <motion.div className="text-sm text-zinc-400 font-mono tracking-[0.3em] uppercase mt-1"
                    initial={{ opacity: 0 }}
                    animate={hasAnimated ? { opacity: 1 } : {}}
                    transition={{ delay: 1.9 }}
                  >
                    Garantia Total
                  </motion.div>
                </motion.div>
              </div>

              {/* "?"? LAYER 2: FLOATING ICONS (Max Z) "?"? */}
              {/* Wifi icon */}
              <motion.div
                className="absolute -right-8 -top-8 w-16 h-16 md:w-20 md:h-20 bg-[#021f14] rounded-2xl border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                
                initial={{ opacity: 0, scale: 0, y: 20, z: 80 }}
                animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
              >
                <Wifi className="w-8 h-8 text-emerald-400" />
                {isInView && <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,1)]" style={{ animation: 'warranty-orbit 3s linear infinite', willChange: 'transform' }} />}
              </motion.div>

              {/* Wrench icon */}
              <motion.div
                className="absolute -left-8 top-1/3 w-14 h-14 md:w-16 md:h-16 bg-[#031526] rounded-2xl border-2 border-blue-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                
                initial={{ opacity: 0, scale: 0, x: -20, z: 100 }}
                animate={hasAnimated ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
              >
                <Wrench className="w-6 h-6 text-blue-400" />
                {isInView && <div className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,1)]" style={{ animation: 'warranty-orbit 4s linear infinite reverse', willChange: 'transform' }} />}
              </motion.div>

              {/* Clock icon */}
              <motion.div
                className="absolute right-4 -bottom-6 w-12 h-12 md:w-14 md:h-14 bg-[#031c26] rounded-xl border-2 border-cyan-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                
                initial={{ opacity: 0, scale: 0, z: 60 }}
                animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.8, type: 'spring', stiffness: 150 }}
              >
                <Clock className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </motion.div>
          </div>

          {/* "?"? RIGHT: CONTENT "?"? */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left mt-12 lg:mt-0"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {isInView && (
                <motion.div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
              {!isInView && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
              <span className="text-emerald-400 text-xs md:text-sm font-bold tracking-widest uppercase">Sistema de Proteção Ativa</span>
            </motion.div>

            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              3 Anos de Garantia
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-2">e SLA Blindado.</span>
            </h3>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de garantia total sobre a instalação e suporte remoto contínuo via Q-SYS Reflect Enterprise Manager.
            </p>

            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={hasAnimated ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8, transition: { duration: 0.25 } }}
                  className="flex items-center gap-5 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-colors duration-500 group/pill cursor-default"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover/pill:bg-emerald-500/20 group-hover/pill:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <f.icon className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-base md:text-lg block mb-0.5">{f.label}</span>
                    <span className="text-zinc-500 text-sm md:text-base">{f.desc}</span>
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
