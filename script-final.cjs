const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const inverseCode = `
  const invRotateX = useTransform(rotateX, x => -x)
  const invRotateY = useTransform(rotateY, y => -y)
  const invRotateZ = useTransform(rotateZ, z => -z)

  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string) => (
    <div className="absolute top-1/2 -right-8 -translate-y-1/2 translate-x-full flex items-center pointer-events-none hidden lg:flex" style={{ transformOrigin: 'left center' }}>
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

s = s.replace('  const handleMouseMove', inverseCode);

const layer4Label = `
            </div>
            {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-16')}
          </motion.div>
        </motion.div>
      </motion.div>`;

// Need to match exactly how the file ends before the old labels
// The file has:
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//
//       {/* Floating Labels connecting...

const idx = s.indexOf('{/* Floating Labels connecting to the layers');
const beforeLabels = s.substring(0, idx);

// Find the last occurrence of </motion.div> before idx
let lastMotionDiv = beforeLabels.lastIndexOf('</motion.div>');
lastMotionDiv = beforeLabels.lastIndexOf('</motion.div>', lastMotionDiv - 1);
lastMotionDiv = beforeLabels.lastIndexOf('</motion.div>', lastMotionDiv - 1);
// lastMotionDiv now points to the closing of LAYER 4's top motion.div

const injectionPoint = beforeLabels.lastIndexOf('</div>', lastMotionDiv);

let finalS = beforeLabels.substring(0, injectionPoint + 6) + `
            {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-16')}
` + beforeLabels.substring(injectionPoint + 6);

finalS = finalS + `
    </div>
  )
}
`;

// Also inject into layers 1, 2, 3
finalS = finalS.replace(
  '{/* =======================================\r\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-40')}\r\n          {/* =======================================\r\n              LAYER 2`
);
finalS = finalS.replace(
  '{/* =======================================\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-40')}\n          {/* =======================================\n              LAYER 2`
);

finalS = finalS.replace(
  '{/* =======================================\r\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-32')}\r\n          {/* =======================================\r\n              LAYER 3`
);
finalS = finalS.replace(
  '{/* =======================================\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-32')}\n          {/* =======================================\n              LAYER 3`
);

finalS = finalS.replace(
  '{/* =======================================\r\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-24')}\r\n          {/* =======================================\r\n              LAYER 4`
);
finalS = finalS.replace(
  '{/* =======================================\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-24')}\n          {/* =======================================\n              LAYER 4`
);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', finalS);
console.log('Done securely!');
