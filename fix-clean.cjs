const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const framerFix = "import { motion, useTransform, useSpring, useMotionValue, useTime } from \"framer-motion\"";
s = s.replace(/import { motion,.*? } from "framer-motion"/, framerFix);

const oldProjStart = s.indexOf('  const getProjection =');
const oldProjEnd = s.indexOf('  const handleMouseMove =');

const newLogic = `
  const time = useTime();
  // The continuous spin completes 360deg in 120s (120000ms)
  const continuousRotateZ = useTransform(time, (t) => (t / 120000) * 360);

  const getProjection = (rx: number, ry: number, rz: number, crz: number, h: number, zBase: number, zHover: number) => {
    const z = zBase + (zHover - zBase) * h;
    
    // Pixel-perfect visual edge for 360x360 box with 40px rounded corners
    const x0 = 168, y0 = 168; 
    
    const radX = rx * Math.PI / 180;
    const radY = ry * Math.PI / 180;
    
    // Combine mouse rotation and continuous rotation
    const totalRz = rz + crz;
    const radZ = totalRz * Math.PI / 180;

    // Apply Z rotation
    const x1 = x0 * Math.cos(radZ) - y0 * Math.sin(radZ);
    const y1 = x0 * Math.sin(radZ) + y0 * Math.cos(radZ);
    const z1 = z;

    // Apply Y rotation
    const x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
    const y2 = y1;
    const z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);

    // Apply X rotation
    const x3 = x2;
    const y3 = y2 * Math.cos(radX) - z2 * Math.sin(radX);
    const z3 = y2 * Math.sin(radX) + z2 * Math.cos(radX);

    // Apply Perspective
    const p = 2000;
    const scale = p / (p - z3);
    const parentScale = 1 + 0.05 * h;
    
    return { x: x3 * scale * parentScale, y: y3 * scale * parentScale };
  };

  const renderProjectedLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, zHover: number, zIdle: number) => {
    const x = useTransform(
      [rotateX, rotateY, rotateZ, continuousRotateZ, hoverSpring], 
      ([rx, ry, rz, crz, h]: any) => getProjection(rx, ry, rz, crz, h, zIdle, zHover).x
    );
    const y = useTransform(
      [rotateX, rotateY, rotateZ, continuousRotateZ, hoverSpring], 
      ([rx, ry, rz, crz, h]: any) => getProjection(rx, ry, rz, crz, h, zIdle, zHover).y
    );

    return (
      <motion.div 
        className="absolute pointer-events-none hidden lg:block z-50" 
        style={{ x, y }}
      >
        <div className="flex items-center -translate-y-1/2">
           <div className="flex items-center relative z-0">
             <div className={"w-1.5 h-1.5 rounded-full " + dotColor + " animate-pulse"} style={{ boxShadow: "0 0 10px currentColor" }} />
             <div className={"h-[1px] bg-gradient-to-r " + lineGradient + " to-transparent opacity-60 " + widthClass} />
           </div>
           <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap backdrop-blur-md">
             <p className={textCol + " text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"}>{title}</p>
             <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
           </div>
        </div>
      </motion.div>
    );
  };
\n`;

s = s.substring(0, oldProjStart) + newLogic + s.substring(oldProjEnd);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Math injection successful');
