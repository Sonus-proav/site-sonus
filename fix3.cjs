const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const transforms = `
  const invRotateX = useTransform(rotateX, x => -x);
  const invRotateY = useTransform(rotateY, y => -y);
  const invRotateZ = useTransform(rotateZ, z => -z);
`;
s = s.replace('const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])', 'const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])' + transforms);

const renderFunc = `
  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, zHover: number, zIdle: number) => (
    <motion.div 
      className="absolute top-1/2 right-0 pointer-events-none" 
      style={{ transformStyle: "preserve-3d" }}
      animate={{ translateZ: isHovered ? zHover : zIdle }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ rotateZ: invRotateZ, transformOrigin: 'left center' }}>
        <motion.div style={{ rotateY: invRotateY, transformOrigin: 'left center' }}>
          <motion.div style={{ rotateX: invRotateX, transformOrigin: 'left center' }} className="flex items-center">
             <div className="flex items-center relative z-0">
               <div className={"w-1.5 h-1.5 rounded-full " + dotColor + " animate-pulse"} style={{ boxShadow: "0 0 10px currentColor" }} />
               <div className={"h-[1px] bg-gradient-to-r " + lineGradient + " to-transparent opacity-60 " + widthClass} />
             </div>
             <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">
               <p className={textCol + " text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"}>{title}</p>
               <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
             </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
`;
s = s.replace('  const handleMouseMove =', renderFunc + '\n  const handleMouseMove =');

const injectCalls = `
          {renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-32', -150, -60)}
          {renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-24', -50, -20)}
          {renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-16', 50, 20)}
          {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-8', 150, 60)}
        </motion.div>
      </motion.div>
`;

s = s.replace('        </motion.div>\r\n      </motion.div>\r\n\r\n      {/* Floating Labels', injectCalls + '\r\n\r\n      {/* Floating Labels');
s = s.replace('        </motion.div>\n      </motion.div>\n\n      {/* Floating Labels', injectCalls + '\n\n      {/* Floating Labels');

const oldStart = s.indexOf('{/* Floating Labels');
if(oldStart !== -1) {
    const endStr = '    </div>\r\n  )\r\n}';
    const endStr2 = '    </div>\n  )\n}';
    s = s.substring(0, oldStart) + (s.includes('\r\n') ? endStr : endStr2);
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Success');
