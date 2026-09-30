const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// Replace framer-motion imports to include useTime
const framerFix = "import { motion, useTransform, useSpring, useMotionValue, useTime } from \"framer-motion\"";
s = s.replace(/import { motion,.*? } from "framer-motion"/, framerFix);

// Remove the useAnimationFrame block
const animStart = s.indexOf('  useAnimationFrame(() => {');
const animEnd = s.indexOf('  const renderAnchoredLabel');
if (animStart > -1 && animEnd > -1) {
    s = s.substring(0, animStart) + s.substring(animEnd);
}

// Remove refs block
const refsStart = s.indexOf('  const anchors = {');
const refsEnd = s.indexOf('  useAnimationFrame(() => {');
if (refsStart > -1 && refsEnd > -1) {
    s = s.substring(0, refsStart) + s.substring(refsEnd);
}
// Clean up any remaining anchors in DOM
s = s.replace(/<div ref=\{anchors\.\w+\} className="absolute right-3 bottom-3 w-1 h-1" \/>\r?\n?/g, '');
s = s.replace(/<div ref=\{anchors\.\w+\} className="absolute right-3 bottom-3 w-1 h-1"\/>\r?\n?/g, '');

// Re-inject the Math Projection logic
const mathLogic = `
  const time = useTime();
  // The continuous spin completes 360deg in 120s (120000ms)
  const continuousRotateZ = useTransform(time, (t) => (t / 120000) * 360);

  const getProjection = (rx: number, ry: number, rz: number, contRz: number, h: number, zBase: number, zHover: number) => {
    const z = zBase + (zHover - zBase) * h;
    
    // Pixel-perfect visual edge for 360x360 box with 40px rounded corners
    const x0 = 168, y0 = 168; 
    
    const radX = rx * Math.PI / 180;
    const radY = ry * Math.PI / 180;
    
    // Combine mouse rotation and continuous rotation
    const totalRz = rz + contRz;
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
`;

// Inject the math logic before handleMouseMove
const hookEnd = s.indexOf('  const handleMouseMove');
s = s.substring(0, hookEnd) + mathLogic + '\n' + s.substring(hookEnd);

// Replace the renderAnchoredLabel with renderProjectedLabel
const overlayStart = s.indexOf('{/* 2D HUD OVERLAY');
const newOverlay = 
'{/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}\n' +
'      <div className="absolute inset-0 pointer-events-none hidden lg:block">\n' +
'         <div className="absolute top-1/2 left-1/2">\n' +
'            {renderProjectedLabel(\'Control Layer\', \'User Interface\', \'bg-cyan-400\', \'from-cyan-400\', \'text-cyan-400\', \'w-10\', 150, 60)}\n' +
'            {renderProjectedLabel(\'Video Layer\', \'Camera Tracking\', \'bg-violet-400\', \'from-violet-400\', \'text-violet-400\', \'w-16\', 50, 20)}\n' +
'            {renderProjectedLabel(\'Acoustic Layer\', \'DSP Processing\', \'bg-emerald-400\', \'from-emerald-400\', \'text-emerald-400\', \'w-24\', -50, -20)}\n' +
'            {renderProjectedLabel(\'Network Layer\', \'AV over IP Matrix\', \'bg-blue-400\', \'from-blue-400\', \'text-blue-400\', \'w-32\', -150, -60)}\n' +
'         </div>\n' +
'      </div>\n\n' +
'    </div>\n' +
'  )\n' +
'}\n';

// We must remove the old renderAnchoredLabel function definition first!
const oldFuncStart = s.indexOf('  const renderAnchoredLabel');
if (oldFuncStart > -1) {
   const oldFuncEnd = s.indexOf('  return (', oldFuncStart);
   s = s.substring(0, oldFuncStart) + s.substring(oldFuncEnd);
}

s = s.substring(0, s.indexOf('{/* 2D HUD OVERLAY')) + newOverlay;

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Math Projection Restored!');
