import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Magnetic } from "@/components/ui/Magnetic";

interface SolutionCard3DProps {
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  link: string;
  icon: LucideIcon;
  themeColor: string;
  reverse?: boolean;
}

export function SolutionCard3D({ 
  title, 
  headline, 
  description, 
  ctaText, 
  link, 
  icon: Icon, 
  themeColor,
  reverse = false 
}: SolutionCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 w-full`}
    >
      {/* 3D Card Interactive Visual */}
      <div 
        className="w-full lg:w-1/2 flex justify-center"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
          className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] rounded-[2rem] border border-white/5 bg-zinc-950/50 cursor-pointer group"
        >
          {/* Ambient Glow */}
          <div 
            className="absolute inset-0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: themeColor }}
          />
          
          {/* Glass Card Base */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden z-10">
            
            {/* Dynamic Specular Highlight */}
            <motion.div
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${useTransform(springX, [0, 1], [0, 100])}% ${useTransform(springY, [0, 1], [0, 100])}%, rgba(255,255,255,0.1) 0%, transparent 40%)`
              }}
            />
            
            {/* Color Accent Layer */}
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color"
              style={{
                background: `radial-gradient(circle at ${useTransform(springX, [0, 1], [0, 100])}% ${useTransform(springY, [0, 1], [0, 100])}%, ${themeColor} 0%, transparent 60%)`
              }}
            />
            
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
            
            {/* 3D Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none" style={{ transform: "translateZ(40px)" }}>
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 border border-white/10 bg-black/50 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                style={{ boxShadow: `0 20px 40px -10px ${themeColor}40` }}
              >
                <Icon className="w-12 h-12" style={{ color: themeColor }} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">{title}</h3>
            </div>
            
            {/* Front Floating Layer (Extruded text) */}
            <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none" style={{ transform: "translateZ(80px)" }}>
              <span className="text-sm font-mono tracking-widest uppercase text-white/50">{headline.split(' ')[0]} {headline.split(' ')[1]}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copy Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }} />
          <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">{title}</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
          {headline}
        </h2>
        
        <p className="text-lg text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
          {description}
        </p>
        
        <Magnetic>
          <Link to={link} className="inline-block">
            <button 
              className="group h-14 px-8 rounded-full border border-white/20 bg-transparent hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </Magnetic>
      </div>
    </div>
  );
}
