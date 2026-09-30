const fs = require('fs');

const s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');
let lines = s.split('\\n');

// 1. Inject inverse transforms
const rotateZLine = lines.findIndex(l => l.includes('const rotateZ ='));
if (rotateZLine !== -1) {
  lines.splice(rotateZLine + 1, 0, 
    '  const invRotateX = useTransform(rotateX, x => -x)',
    '  const invRotateY = useTransform(rotateY, y => -y)',
    '  const invRotateZ = useTransform(rotateZ, z => -z)'
  );
}

// 2. Inject renderLabel function right after
const insertLabelFuncLine = lines.findIndex(l => l.includes('const handleMouseMove ='));
if (insertLabelFuncLine !== -1) {
  lines.splice(insertLabelFuncLine, 0, `  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string) => (
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
  )`);
}

let modified = lines.join('\\n');

// 3. Remove the old separate labels block
const oldLabelsStart = modified.indexOf('{/* Floating Labels connecting to the layers (Z-indexed to float outside) */}');
const endContainer = modified.lastIndexOf('      </div>\\n\\n    </div>\\n  )\\n}');
if (oldLabelsStart !== -1) {
  modified = modified.substring(0, oldLabelsStart) + '    </div>\\n  )\\n}';
}

// 4. Inject labels directly into the 3D layers!
modified = modified.replace(
  '{/* =======================================\\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-44')}\\n          {/* =======================================\\n              LAYER 2`
);

modified = modified.replace(
  '{/* =======================================\\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-36')}\\n          {/* =======================================\\n              LAYER 3`
);

modified = modified.replace(
  '{/* =======================================\\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-28')}\\n          {/* =======================================\\n              LAYER 4`
);

modified = modified.replace(
  '</motion.div>\\n        </motion.div>\\n      </motion.div>\\n    </div>\\n  )\\n}',
  `  {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-20')}\\n          </motion.div>\\n        </motion.div>\\n      </motion.div>\\n    </div>\\n  )\\n}`
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', modified);
console.log('Script run successfully!');
