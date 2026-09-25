import fs from 'fs';

const cssPath = 'src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('@keyframes float-subtle')) {
  const newAnimation = `
@keyframes float-subtle {
  0%, 100% { transform: translateY(0px) rotate(2deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}
@keyframes float-subtle-hover {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(0deg); }
}
@keyframes blink-colon {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;
  cssContent = cssContent + newAnimation;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Added float-subtle to index.css');
}

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Act 1 - Salvar Sessões
content = content.replace(
  '<div className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] md:text-xs font-bold py-2.5 rounded-xl text-center transition-colors cursor-default">',
  '<div className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] md:text-xs font-bold py-2.5 rounded-xl text-center transition-colors cursor-default relative overflow-hidden">\n                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer-sweep_3s_infinite]"></div>'
);

// 2. Act 2 - Top bar "AO VIVO" indicator
content = content.replace(
  '<div className="w-1 h-6 bg-green-500 rounded-full" />',
  '<div className="w-1.5 h-6 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />'
);

// 3. Act 2 - Timer 19:22:20
content = content.replace(
  '>19:22:20<',
  '>19:22<span className="animate-[blink-colon_1s_infinite]">:</span>20<'
);

// 4. Act 2 - Tribuna indicator
content = content.replace(
  '>Tribuna (Orador)<',
  '><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1.5 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>Tribuna (Orador)<'
);

// 5. Act 2 - 00:20
content = content.replace(
  '>00:20<',
  '>00<span className="animate-[blink-colon_1s_infinite]">:</span>20<'
);

// 6. Act 2 - Votação Aberta shimmer
content = content.replace(
  '<div className="bg-blue-600 text-white text-center py-2.5 md:py-3 rounded-xl font-black text-sm md:text-lg tracking-wider uppercase">',
  '<div className="bg-blue-600 text-white text-center py-2.5 md:py-3 rounded-xl font-black text-sm md:text-lg tracking-wider uppercase relative overflow-hidden">\n                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer-sweep_2.5s_infinite]"></div>'
);

// 7. Act 3 - Hash scanning effect
content = content.replace(
  '<div className="mt-4 bg-green-500/5 border border-green-500/15 rounded-xl p-3 flex items-center gap-3">',
  '<div className="mt-4 bg-green-500/5 border border-green-500/15 rounded-xl p-3 flex items-center gap-3 relative overflow-hidden group/hash">\n                      <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-green-500/10 to-transparent -translate-y-full animate-[slide-up-fade_3s_infinite]" />'
);

content = content.replace(
  '<Lock className="w-4 h-4 text-green-400" />',
  '<Lock className="w-4 h-4 text-green-400 group-hover/hash:animate-pulse" />'
);

// 8. Autonomy Block - Floating effect
content = content.replace(
  '<div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-xl transform rotate-2 group-hover:rotate-0 transition-all duration-700">',
  '<div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-700" style={{ animation: "float-subtle 4s ease-in-out infinite" }} onMouseEnter={(e) => e.currentTarget.style.animation = "float-subtle-hover 4s ease-in-out infinite"} onMouseLeave={(e) => e.currentTarget.style.animation = "float-subtle 4s ease-in-out infinite"}>'
);

// 9. Autonomy Block - Salvar Nuvem shimmer
content = content.replace(
  '<div className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-[9px] md:text-[10px] font-bold py-2 rounded-lg text-center mt-2 cursor-pointer flex justify-center items-center gap-1.5">',
  '<div className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-[9px] md:text-[10px] font-bold py-2 rounded-lg text-center mt-2 cursor-pointer flex justify-center items-center gap-1.5 relative overflow-hidden">\n                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer-sweep_3s_infinite]"></div>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Animations applied!');
