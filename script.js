import fs from 'fs';

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const renderLabel = `
  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string) => (
    <div className="absolute top-1/2 -right-2 -translate-y-1/2 flex items-center pointer-events-none hidden lg:flex" style={{ transformOrigin: 'left center' }}>
      <motion.div style={{ rotateZ: invRotateZ, transformOrigin: 'left center' }}>
        <motion.div style={{ rotateY: invRotateY, transformOrigin: 'left center' }}>
          <motion.div style={{ rotateX: invRotateX, transformOrigin: 'left center' }} className="flex items-center">
             <div className="flex items-center relative z-0">
               <div className={\`w-1.5 h-1.5 rounded-full \${dotColor} animate-pulse\`} style={{ boxShadow: "0 0 10px currentColor" }} />
               <div className={\`h-[1px] bg-gradient-to-r \${lineGradient} to-transparent opacity-60 \${widthClass}\`} />
             </div>
             <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">
               <p className={\`\${textCol} text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5\`}>{title}</p>
               <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
             </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )

  const handleMouseMove`;

s = s.replace('  const handleMouseMove', renderLabel);

const oldLabelsStart = s.indexOf('{/* Floating Labels connecting to the layers (Z-indexed to float outside) */}');
const endContainer = s.lastIndexOf('      </div>\\n\\n    </div>\\n  )\\n}');
if (oldLabelsStart !== -1) {
  // We just remove it by taking substring up to oldLabelsStart and appending the end tags
  s = s.substring(0, oldLabelsStart) + '    </div>\\n  )\\n}';
  // Wait, I can just use a regex
}
fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
