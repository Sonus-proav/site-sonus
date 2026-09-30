const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Remove invRotate variables
s = s.replace(/  const invRotateX = useTransform\(rotateX, x => -x\)\r?\n/g, '');
s = s.replace(/  const invRotateY = useTransform\(rotateY, y => -y\)\r?\n/g, '');
s = s.replace(/  const invRotateZ = useTransform\(rotateZ, z => -z\)\r?\n/g, '');

// 2. Replace renderLabel
const oldRenderFuncStart = s.indexOf('  const renderLabel =');
const oldRenderFuncEnd = s.indexOf('  const handleMouseMove');

if (oldRenderFuncStart !== -1 && oldRenderFuncEnd !== -1) {
  const newRenderFunc = `  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, zHover: number, zIdle: number) => (
    <motion.div 
      className="absolute bottom-0 right-0 pointer-events-none hidden lg:flex" 
      animate={{ translateZ: isHovered ? zHover : zIdle }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ transform: "rotateZ(45deg) rotateX(-60deg)", transformOrigin: 'left center' }} className="flex items-center">
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
  s = s.substring(0, oldRenderFuncStart) + newRenderFunc + s.substring(oldRenderFuncEnd);
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Done replacing renderLabel');
