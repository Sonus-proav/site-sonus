const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Remove the old separate labels block at the bottom
const oldStart = s.indexOf('{/* Floating Labels connecting to the layers (Z-indexed to float outside) */}');
if (oldStart !== -1) {
  // Find where it ends
  const endMarker = '    </div>\\n  )\\n}';
  const endMarker2 = '    </div>\\r\\n  )\\r\\n}';
  let hasR = s.includes('\\r\\n');
  
  s = s.substring(0, oldStart) + (hasR ? endMarker2 : endMarker);
}

// 2. Inject the inverse transforms at the top
if (!s.includes('const invRotateX')) {
  s = s.replace(
    'const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])',
    \`const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])
  const invRotateX = useTransform(rotateX, x => -x)
  const invRotateY = useTransform(rotateY, y => -y)
  const invRotateZ = useTransform(rotateZ, z => -z)\`
  );
}

// 3. Define the renderLabel function
const renderLabelFunc = \`
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
               <div className={\\\`w-1.5 h-1.5 rounded-full \${dotColor} animate-pulse\\\`} style={{ boxShadow: "0 0 10px currentColor" }} />
               <div className={\\\`h-[1px] bg-gradient-to-r \${lineGradient} to-transparent opacity-60 \${widthClass}\\\`} />
             </div>
             <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">
               <p className={\\\`\${textCol} text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5\\\`}>{title}</p>
               <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>
             </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
\`;

if (!s.includes('const renderLabel =')) {
  s = s.replace('  const handleMouseMove =', renderLabelFunc + '\\n  const handleMouseMove =');
}

// 4. Inject the labels right before the end of the 3D Isometric Container
// The container ends right before the old labels block that we removed, meaning it's the 3rd to last </motion.div>

const closingTags = \`        </motion.div>
      </motion.div>

    </div>\`;

const injection = \`        
          {renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-32', -150, -60)}
          {renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-24', -50, -20)}
          {renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-16', 50, 20)}
          {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-8', 150, 60)}
        </motion.div>
      </motion.div>

    </div>\`;

s = s.replace(closingTags, injection);

// Let's also check for \r\n
const closingTagsRN = \`        </motion.div>\\r\\n      </motion.div>\\r\\n\\r\\n    </div>\`;
const injectionRN = \`        
          {renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-32', -150, -60)}
          {renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-24', -50, -20)}
          {renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-16', 50, 20)}
          {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-8', 150, 60)}
        </motion.div>\\r\\n      </motion.div>\\r\\n\\r\\n    </div>\`;

s = s.replace(closingTagsRN, injectionRN);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Done!');
