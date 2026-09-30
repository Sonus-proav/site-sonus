const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const newRenderFunc = 
'  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, yHover: number, yIdle: number) => (\n' +
'    <motion.div \n' +
'      className="absolute pointer-events-none hidden lg:block" \n' +
'      style={{ left: 254 }} \n' +
'      animate={{ y: isHovered ? yHover : yIdle }}\n' +
'      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}\n' +
'    >\n' +
'      <div className="flex items-center -translate-y-1/2">\n' +
'         <div className="flex items-center relative z-0">\n' +
'           <div className={"w-1.5 h-1.5 rounded-full " + dotColor + " animate-pulse"} style={{ boxShadow: "0 0 10px currentColor" }} />\n' +
'           <div className={"h-[1px] bg-gradient-to-r " + lineGradient + " to-transparent opacity-60 " + widthClass} />\n' +
'         </div>\n' +
'         <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">\n' +
'           <p className={textCol + " text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"}>{title}</p>\n' +
'           <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>\n' +
'         </div>\n' +
'      </div>\n' +
'    </motion.div>\n' +
'  )\n\n';

const oldRenderFuncStart = s.indexOf('  const renderLabel =');
const oldRenderFuncEnd = s.indexOf('  const handleMouseMove');
s = s.substring(0, oldRenderFuncStart) + newRenderFunc + s.substring(oldRenderFuncEnd);

const oldInjectStart = s.indexOf('          {renderLabel(\'Network Layer\'');
const endPos = s.lastIndexOf('    </div>');

s = s.substring(0, oldInjectStart) + '        </motion.div>\n      </motion.div>\n\n';

const hudOverlay = 
'      {/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}\n' +
'      <motion.div \n' +
'         className="absolute inset-0 pointer-events-none hidden lg:block"\n' +
'         animate={{ scale: isHovered ? 1.05 : 1 }}\n' +
'         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}\n' +
'      >\n' +
'         <div className="absolute top-1/2 left-1/2">\n' +
'            {renderLabel(\'Control Layer\', \'User Interface\', \'bg-cyan-400\', \'from-cyan-400\', \'text-cyan-400\', \'w-10\', -130, -52)}\n' +
'            {renderLabel(\'Video Layer\', \'Camera Tracking\', \'bg-violet-400\', \'from-violet-400\', \'text-violet-400\', \'w-16\', -43, -17)}\n' +
'            {renderLabel(\'Acoustic Layer\', \'DSP Processing\', \'bg-emerald-400\', \'from-emerald-400\', \'text-emerald-400\', \'w-24\', 43, 17)}\n' +
'            {renderLabel(\'Network Layer\', \'AV over IP Matrix\', \'bg-blue-400\', \'from-blue-400\', \'text-blue-400\', \'w-32\', 130, 52)}\n' +
'         </div>\n' +
'      </motion.div>\n\n' +
'    </div>\n' +
'  )\n' +
'}\n';

s += hudOverlay;

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Success');
