const fs = require('fs');

let c = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// Replace plenarios image with bgElement
c = c.replace(
  'image: "/plenarios/painel-sessoes.png",',
  `bgElement: <div className="absolute inset-0 flex items-center justify-center opacity-20 scale-[2] group-hover:scale-[1.5] transition-transform duration-1000 -translate-y-20"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><polygon points="12 2 2 7 22 7"/><line x1="6" x2="6" y1="22" y2="7"/><line x1="18" x2="18" y1="22" y2="7"/><line x1="12" x2="12" y1="22" y2="7"/><line x1="2" x2="22" y1="22" y2="22"/></svg></div>,`
);

// Inject bgElement renderer into the layout
c = c.replace(
  '{item.image && (',
  '{item.bgElement}\n                  {item.image && ('
);

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', c);
