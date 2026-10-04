const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

// 1. Text Profissionalize wrapping
content = content.replace(
  '<h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white drop-shadow-xl">',
  '<h2 className="text-[2.5rem] sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white drop-shadow-xl break-words sm:break-normal hyphens-auto">'
);

// 2. Reduce padding on the Bento grids for Phase 1, Phase 2, Phase 3 cards
// Phase 1
content = content.replace(
  '<div className="p-8 pb-0 relative z-10">',
  '<div className="p-5 md:p-8 pb-0 relative z-10">'
);
// Phase 2
content = content.replace(
  '<div className="p-8 relative z-10 flex flex-col items-center text-center">',
  '<div className="p-5 md:p-8 relative z-10 flex flex-col items-center text-center">'
);
// Phase 3
content = content.replace(
  '<div className="p-8 relative z-10 flex flex-col items-center text-center">',
  '<div className="p-5 md:p-8 relative z-10 flex flex-col items-center text-center">'
);

// StageBoxVisual padding
content = content.replace(
  'justify-center p-8 bg-gradient-to-br',
  'justify-center p-4 md:p-8 bg-gradient-to-br'
);
// CertificadoART padding
content = content.replace(
  'justify-center p-8 bg-gradient-to-br',
  'justify-center p-4 md:p-8 bg-gradient-to-br'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
