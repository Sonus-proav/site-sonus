const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const projectedHUD = `
  const hoverSpring = useSpring(0, { stiffness: 50, damping: 15, mass: 1 });
  
  React.useEffect(() => {
    hoverSpring.set(isHovered ? 1 : 0);
  }, [isHovered, hoverSpring]);

  const getProjection = (rx: number, ry: number, rz: number, h: number, zBase: number, zHover: number) => {
    const z = zBase + (zHover - zBase) * h;
    const x0 = 160, y0 = 160; 
    const radX = rx * Math.PI / 180;
    const radY = ry * Math.PI / 180;
    const radZ = rz * Math.PI / 180;

    const x1 = x0 * Math.cos(radZ) - y0 * Math.sin(radZ);
    const y1 = x0 * Math.sin(radZ) + y0 * Math.cos(radZ);
    const z1 = z;

    const x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
    const y2 = y1;
    const z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);

    const x3 = x2;
    const y3 = y2 * Math.cos(radX) - z2 * Math.sin(radX);
    const z3 = y2 * Math.sin(radX) + z2 * Math.cos(radX);

    const p = 2000;
    const scale = p / (p - z3);
    const parentScale = 1 + 0.05 * h;

    return { x: x3 * scale * parentScale, y: y3 * scale * parentScale };
  };

  const renderProjectedLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, zHover: number, zIdle: number) => {
    const x = useTransform([rotateX, rotateY, rotateZ, hoverSpring], ([rx, ry, rz, h]: any) => getProjection(rx, ry, rz, h, zIdle, zHover).x);
    const y = useTransform([rotateX, rotateY, rotateZ, hoverSpring], ([rx, ry, rz, h]: any) => getProjection(rx, ry, rz, h, zIdle, zHover).y);

    return (
      <motion.div 
        className="absolute pointer-events-none hidden lg:block" 
        style={{ x, y }}
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

s = s.replace(/  const invRotateX = useTransform\(rotateX, x => -x\)\r?\n/g, '');
s = s.replace(/  const invRotateY = useTransform\(rotateY, y => -y\)\r?\n/g, '');
s = s.replace(/  const invRotateZ = useTransform\(rotateZ, z => -z\)\r?\n/g, '');

const oldRenderStart = s.indexOf('  const renderLabel =');
const oldRenderEnd = s.indexOf('  const handleMouseMove');
s = s.substring(0, oldRenderStart) + projectedHUD + s.substring(oldRenderEnd);

const oldInjectStart = s.indexOf('          {renderLabel(\'Network Layer\'');
const endPos = s.lastIndexOf('    </div>');

s = s.substring(0, oldInjectStart) + '        </motion.div>\n      </motion.div>\n\n';

const hudOverlay = 
'      {/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}\n' +
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

s += hudOverlay;

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Success');
