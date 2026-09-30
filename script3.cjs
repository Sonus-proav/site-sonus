const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const renderLabel = `
  const invRotateX = useTransform(rotateX, x => -x)
  const invRotateY = useTransform(rotateY, y => -y)
  const invRotateZ = useTransform(rotateZ, z => -z)

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

// We replace the EXACT ending of the motion.divs for the layers
s = s.replace(
  '{/* =======================================\\r\\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-44')}
          {/* =======================================\\r\\n              LAYER 2`
);
s = s.replace(
  '{/* =======================================\\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-44')}
          {/* =======================================\\n              LAYER 2`
);


s = s.replace(
  '{/* =======================================\\r\\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-36')}
          {/* =======================================\\r\\n              LAYER 3`
);
s = s.replace(
  '{/* =======================================\\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-36')}
          {/* =======================================\\n              LAYER 3`
);


s = s.replace(
  '{/* =======================================\\r\\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-28')}
          {/* =======================================\\r\\n              LAYER 4`
);
s = s.replace(
  '{/* =======================================\\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-28')}
          {/* =======================================\\n              LAYER 4`
);

// For layer 4, we inject at the end of it
s = s.replace(
  '            </div>\\r\\n          </motion.div>\\r\\n        </motion.div>\\r\\n      </motion.div>',
  `            </div>
            {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-20')}
          </motion.div>
        </motion.div>
      </motion.div>`
);
s = s.replace(
  '            </div>\\n          </motion.div>\\n        </motion.div>\\n      </motion.div>',
  `            </div>
            {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-20')}
          </motion.div>
        </motion.div>
      </motion.div>`
);


// Delete old labels
const oldStart = s.indexOf('{/* Floating Labels connecting to the layers');
if(oldStart !== -1) {
  const ending = '    </div>\\r\\n  )\\r\\n}';
  const ending2 = '    </div>\\n  )\\n}';
  s = s.substring(0, oldStart) + (s.includes('\\r\\n') ? ending : ending2);
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
