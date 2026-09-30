const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

const target = 'const getProjection = (rx: number, ry: number, rz: number, crz: number, h: number, zBase: number, zHover: number) => {';
const replacement = `const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  const getProjection = (rx: number, ry: number, rz: number, crz: number, h: number, zBase: number, zHover: number) => {
    if (!isDesktop) return { x: 0, y: 0 };`;

s = s.replace(target, replacement);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('HeroVisual optimized!');
