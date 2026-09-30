const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Add refs and useAnimationFrame
const refsCode = `
  const anchors = {
    control: useRef<HTMLDivElement>(null),
    video: useRef<HTMLDivElement>(null),
    acoustic: useRef<HTMLDivElement>(null),
    network: useRef<HTMLDivElement>(null),
  };
  
  const coords = {
    control: { x: useMotionValue(0), y: useMotionValue(0) },
    video: { x: useMotionValue(0), y: useMotionValue(0) },
    acoustic: { x: useMotionValue(0), y: useMotionValue(0) },
    network: { x: useMotionValue(0), y: useMotionValue(0) },
  };

  useAnimationFrame(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    const updateCoord = (key: keyof typeof anchors) => {
      const el = anchors[key].current;
      if (el) {
        const r = el.getBoundingClientRect();
        // Calculate position relative to the container's center
        // Using +12 on X to give a tiny breathing room for the line dot
        coords[key].x.set(r.left - rect.left - rect.width / 2 + 15);
        coords[key].y.set(r.top - rect.top - rect.height / 2);
      }
    };

    updateCoord('control');
    updateCoord('video');
    updateCoord('acoustic');
    updateCoord('network');
  });

  const renderAnchoredLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, key: keyof typeof anchors) => {
    return (
      <motion.div 
        className="absolute pointer-events-none hidden lg:block" 
        style={{ x: coords[key].x, y: coords[key].y }}
      >
        <div className="flex items-center -translate-y-1/2">
           <div className="flex items-center relative z-0">
             <div className={"w-1.5 h-1.5 rounded-full " + dotColor + " animate-pulse"} style={{ boxShadow: "0 0 10px currentColor" }} />
             <div className={"h-[1px] bg-gradient-to-r " + lineGradient + " to-transparent opacity-60 " + widthClass} />
           </div>
           <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">
             <p className={textCol + " text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"}>{title}</p>
             <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
           </div>
        </div>
      </motion.div>
    );
  };
`;

const importFix = "import { useState, useEffect, useRef } from \"react\"";
const framerFix = "import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from \"framer-motion\"";

s = s.replace('import { useState, useEffect, useRef } from "react"', importFix);
s = s.replace(/import { motion,.*? } from "framer-motion"/, framerFix);

const oldHooksEnd = s.indexOf('const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])') + 57;
s = s.substring(0, oldHooksEnd) + '\n' + refsCode + s.substring(oldHooksEnd);

// Remove the old projected logic
const projStart = s.indexOf('  const hoverSpring = useSpring(0');
const projEnd = s.indexOf('  const handleMouseMove')
s = s.substring(0, projStart) + '\n' + s.substring(projEnd);

// Inject the anchor divs into the layers
s = s.replace(
  '<div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/50" />',
  '<div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/50" />\n            <div ref={anchors.network} className="absolute right-3 bottom-3 w-1 h-1" />'
);

s = s.replace(
  '<span className="text-[10px] font-mono text-emerald-500/50">Processing...</span>',
  '<span className="text-[10px] font-mono text-emerald-500/50">Processing...</span>\n              <div ref={anchors.acoustic} className="absolute right-3 bottom-3 w-1 h-1" />'
);

s = s.replace(
  '<span className="text-[11px] font-mono text-violet-400">TRACKING</span>',
  '<span className="text-[11px] font-mono text-violet-400">TRACKING</span>\n              <div ref={anchors.video} className="absolute right-3 bottom-3 w-1 h-1" />'
);

s = s.replace(
  '<span className="text-[11px] font-mono text-cyan-400 tracking-wider">MATRIX</span>',
  '<span className="text-[11px] font-mono text-cyan-400 tracking-wider">MATRIX</span>\n              <div ref={anchors.control} className="absolute right-3 bottom-3 w-1 h-1" />'
);

// Inject ref to container
s = s.replace(
  'className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center group perspective-[2000px] scale-90 md:scale-100"\r\n      onMouseMove',
  'className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center group perspective-[2000px] scale-90 md:scale-100"\r\n      ref={containerRef}\r\n      onMouseMove'
);
s = s.replace(
  'className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center group perspective-[2000px] scale-90 md:scale-100"\n      onMouseMove',
  'className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center group perspective-[2000px] scale-90 md:scale-100"\n      ref={containerRef}\n      onMouseMove'
);

// Update HUD overlay
const oldOverlayStart = s.indexOf('{/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}');
const newOverlay = 
'{/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}\n' +
'      <div className="absolute inset-0 pointer-events-none hidden lg:block">\n' +
'         <div className="absolute top-1/2 left-1/2">\n' +
'            {renderAnchoredLabel(\'Control Layer\', \'User Interface\', \'bg-cyan-400\', \'from-cyan-400\', \'text-cyan-400\', \'w-10\', \'control\')}\n' +
'            {renderAnchoredLabel(\'Video Layer\', \'Camera Tracking\', \'bg-violet-400\', \'from-violet-400\', \'text-violet-400\', \'w-16\', \'video\')}\n' +
'            {renderAnchoredLabel(\'Acoustic Layer\', \'DSP Processing\', \'bg-emerald-400\', \'from-emerald-400\', \'text-emerald-400\', \'w-24\', \'acoustic\')}\n' +
'            {renderAnchoredLabel(\'Network Layer\', \'AV over IP Matrix\', \'bg-blue-400\', \'from-blue-400\', \'text-blue-400\', \'w-32\', \'network\')}\n' +
'         </div>\n' +
'      </div>\n\n' +
'    </div>\n' +
'  )\n' +
'}\n';

s = s.substring(0, oldOverlayStart) + newOverlay;

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Done!');
