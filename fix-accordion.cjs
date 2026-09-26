const fs = require('fs');

let c = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// 1. Fix Igrejas icon (from DollarSign to Volume2)
c = c.replace(
  '<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>'
);

// 2. Fix Q-SYS icon (to Cpu) and remove logo prop
c = c.replace('logo: "/qsys-logo.png",', '');
c = c.replace(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>'
);

// 3. Remove conditional rendering for item.logo
c = c.replace(
  /\{item\.logo && isActive \? \([\s\S]*?<img src=\{item\.logo\}.*?\/>[\s\S]*?\) : \([\s\S]*?item\.icon[\s\S]*?\)\}/,
  '{item.icon}'
);

// 4. Optimize GPU properties
c = c.replace('grayscale-0 mix-blend-normal', 'grayscale-0');
c = c.replace('grayscale mix-blend-luminosity', 'grayscale');
c = c.replace('mix-blend-overlay', 'opacity-30');

// 5. Lighten Framer Motion transition for better performance
c = c.replace('transition={{ type: "spring", stiffness: 200, damping: 25 }}', 'transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}');

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', c);
console.log("Optimizations done.");
