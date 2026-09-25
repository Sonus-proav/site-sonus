import fs from 'fs';

const path = 'src/components/plenarios/WarrantyShield3D.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove blur-3xl from depth shadow, add will-change
content = content.replace(
  'className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-12 rounded-[100%] blur-3xl pointer-events-none"',
  'className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-12 rounded-[100%] pointer-events-none"'
);
content = content.replace(
  "z: -100, // pushing shadow far back\n                }}",
  "z: -100, // pushing shadow far back\n                  willChange: 'transform, opacity',\n                }}"
);

// 2. Remove backdrop-blur from back plates
content = content.replace(
  'className="absolute inset-0 rounded-3xl border border-emerald-500/20 bg-[#010805]/80 backdrop-blur-sm"',
  'className="absolute inset-0 rounded-3xl border border-emerald-500/20 bg-[#030b08]"'
);
content = content.replace(
  'className="absolute inset-0 rounded-3xl border border-emerald-500/30 bg-[#030f0a]/50 backdrop-blur-md"',
  'className="absolute inset-0 rounded-3xl border border-emerald-500/30 bg-[#030f0a]/90"'
);

// 3. Remove backdrop-blur from floating icons
content = content.replace(
  'className="absolute -right-8 -top-8 w-16 h-16 md:w-20 md:h-20 bg-emerald-950/80 backdrop-blur-md rounded-2xl border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"',
  'className="absolute -right-8 -top-8 w-16 h-16 md:w-20 md:h-20 bg-[#021f14] rounded-2xl border-2 border-emerald-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"'
);
content = content.replace(
  'className="absolute -left-8 top-1/3 w-14 h-14 md:w-16 md:h-16 bg-blue-950/80 backdrop-blur-md rounded-2xl border-2 border-blue-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"',
  'className="absolute -left-8 top-1/3 w-14 h-14 md:w-16 md:h-16 bg-[#031526] rounded-2xl border-2 border-blue-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"'
);
content = content.replace(
  'className="absolute right-4 -bottom-6 w-12 h-12 md:w-14 md:h-14 bg-cyan-950/80 backdrop-blur-md rounded-xl border-2 border-cyan-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"',
  'className="absolute right-4 -bottom-6 w-12 h-12 md:w-14 md:h-14 bg-[#031c26] rounded-xl border-2 border-cyan-500/40 flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)]"'
);
content = content.replace(
  'className="mt-8 text-center bg-black/40 px-6 py-2 rounded-2xl border border-white/5 backdrop-blur-md"',
  'className="mt-8 text-center bg-black/70 px-6 py-2 rounded-2xl border border-white/5"'
);

// 4. Remove SVG filter #glow
content = content.replace(
  '<circle r="3" fill="rgba(16,185,129,1)" filter="url(#glow)">',
  '<circle r="3" fill="rgba(16,185,129,1)" style={{ filter: "drop-shadow(0 0 4px rgba(16,185,129,1))", willChange: "transform" }}>'
);
content = content.replace(
  '<defs>\n                    <filter id="glow">\n                      <feGaussianBlur stdDeviation="4" result="blur" />\n                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>\n                    </filter>\n                  </defs>',
  ''
);

// 5. Add will-change to animations
content = content.replace(
  'transformStyle: \'preserve-3d\',',
  'transformStyle: \'preserve-3d\',\n                willChange: \'transform\','
);
content = content.replace(
  'animation: \'warranty-shimmer 3s ease-in-out infinite\',',
  'animation: \'warranty-shimmer 3s ease-in-out infinite\',\n                    willChange: \'background-position\','
);
content = content.replace(
  'animation: \'warranty-scan 2.5s ease-in-out infinite\',',
  'animation: \'warranty-scan 2.5s ease-in-out infinite\',\n                        willChange: \'transform\','
);

// 6. Set specific will-change for orbiting dots
content = content.replace(
  'style={{ animation: \'warranty-orbit 3s linear infinite\' }}',
  'style={{ animation: \'warranty-orbit 3s linear infinite\', willChange: \'transform\' }}'
);
content = content.replace(
  'style={{ animation: \'warranty-orbit 4s linear infinite reverse\' }}',
  'style={{ animation: \'warranty-orbit 4s linear infinite reverse\', willChange: \'transform\' }}'
);

// 7. Simplify rings animation by adding willChange
content = content.replace(
  'style={{ animation: \'warranty-ring 3s ease-in-out infinite\' }}',
  'style={{ animation: \'warranty-ring 3s ease-in-out infinite\', willChange: \'transform, opacity\' }}'
);
content = content.replace(
  'style={{ animation: \'warranty-ring 3s ease-in-out infinite 0.7s\' }}',
  'style={{ animation: \'warranty-ring 3s ease-in-out infinite 0.7s\', willChange: \'transform, opacity\' }}'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Optimizations applied!');
