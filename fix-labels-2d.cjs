const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Rewrite renderLabel to output 2D positioning
const newRenderFunc = `
  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, yHover: number, yIdle: number) => (
    <motion.div 
      className="absolute pointer-events-none hidden lg:block" 
      style={{ left: 254 }} // Exactly 180 * sqrt(2) which is the right-most edge of the isometric diamond
      animate={{ y: isHovered ? yHover : yIdle }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center -translate-y-1/2">
         <div className="flex items-center relative z-0">
           <div className={\`w-1.5 h-1.5 rounded-full \${dotColor} animate-pulse\`} style={{ boxShadow: "0 0 10px currentColor" }} />
           <div className={\`h-[1px] bg-gradient-to-r \${lineGradient} to-transparent opacity-60 \${widthClass}\`} />
         </div>
         <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">
           <p className={\`\${textCol} text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5\`}>{title}</p>
           <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
         </div>
      </div>
    </motion.div>
  )
`;

const oldRenderFuncStart = s.indexOf('  const renderLabel =');
const oldRenderFuncEnd = s.indexOf('  const handleMouseMove');
s = s.substring(0, oldRenderFuncStart) + newRenderFunc + s.substring(oldRenderFuncEnd);

// 2. Remove the old injected labels inside the 3D container
const oldInjectStart = s.indexOf('          {renderLabel(\'Network Layer\'');
const oldInjectEnd = s.indexOf('        </motion.div>\\r\\n      </motion.div>\\r\\n\\r\\n    </div>');
const oldInjectEnd2 = s.indexOf('        </motion.div>\\n      </motion.div>\\n\\n    </div>');
const endPos = oldInjectEnd !== -1 ? oldInjectEnd : oldInjectEnd2;

if (oldInjectStart !== -1 && endPos !== -1) {
  // We remove the old calls and close the 3D container
  s = s.substring(0, oldInjectStart) + '        </motion.div>\\n      </motion.div>\\n\\n';

  // 3. Inject the NEW 2D Overlay AFTER the 3D container
  const hudOverlay = \`
      {/* 2D HUD OVERLAY - mathematically locked to the 3D projection but rendered flat */}
      <motion.div 
         className="absolute inset-0 pointer-events-none hidden lg:block"
         animate={{ scale: isHovered ? 1.05 : 1 }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
         <div className="absolute top-1/2 left-1/2">
            {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-10', -130, -52)}
            {renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-16', -43, -17)}
            {renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-24', 43, 17)}
            {renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-32', 130, 52)}
         </div>
      </motion.div>

    </div>
  )
}
\`;
  
  s += hudOverlay;
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('2D Overlay constructed.');
