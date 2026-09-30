const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const labelsRegex = /\{\/\* Floating Labels connecting to the layers \(Z-indexed to float outside\) \*\/\}[\s\S]*?<\/div>\n\n    <\/div>/;

const newLabels = `{/* Floating Labels connecting to the layers (Z-indexed to float outside) */}
      <div className="absolute top-1/2 left-1/2 ml-[140px] xl:ml-[170px] -translate-y-1/2 flex flex-col gap-0 pointer-events-none hidden lg:flex z-50">
        
        <motion.div className="flex items-center" animate={{ y: isHovered ? -130 : -52 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center relative z-0">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse" />
            <div className="w-16 xl:w-20 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent opacity-60" />
          </div>
          <div className="bg-[#050505] border border-cyan-500/30 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10">
            <p className="text-cyan-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Control Layer</p>
            <p className="text-white font-medium text-[11px] font-mono">User Interface</p>
          </div>
        </motion.div>

        <motion.div className="flex items-center absolute top-0" animate={{ y: isHovered ? -43 : -17 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center relative z-0">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,1)] animate-pulse" />
            <div className="w-20 xl:w-28 h-[1px] bg-gradient-to-r from-violet-400 to-transparent opacity-60" />
          </div>
          <div className="bg-[#050505] border border-violet-500/30 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10">
            <p className="text-violet-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Video Layer</p>
            <p className="text-white font-medium text-[11px] font-mono">Camera Tracking</p>
          </div>
        </motion.div>

        <motion.div className="flex items-center absolute top-0" animate={{ y: isHovered ? 43 : 17 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center relative z-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse" />
            <div className="w-24 xl:w-36 h-[1px] bg-gradient-to-r from-emerald-400 to-transparent opacity-60" />
          </div>
          <div className="bg-[#050505] border border-emerald-500/30 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10">
            <p className="text-emerald-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Acoustic Layer</p>
            <p className="text-white font-medium text-[11px] font-mono">DSP Processing</p>
          </div>
        </motion.div>

        <motion.div className="flex items-center absolute top-0" animate={{ y: isHovered ? 104 : 52 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center relative z-0">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)] animate-pulse" />
            <div className="w-28 xl:w-44 h-[1px] bg-gradient-to-r from-blue-400 to-transparent opacity-60" />
          </div>
          <div className="bg-[#050505] border border-blue-500/30 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10">
            <p className="text-blue-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Network Layer</p>
            <p className="text-white font-medium text-[11px] font-mono">AV over IP Matrix</p>
          </div>
        </motion.div>

      </div>

    </div>`;

s = s.replace(labelsRegex, newLabels);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log("Labels aligned properly!");
