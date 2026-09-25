import fs from 'fs';

let c2 = fs.readFileSync('src/pages/Solucoes.tsx', 'utf8');
c2 = c2.replace(
  'const { scrollYProgress } = useScroll({\n    target: containerRef,\n    offset: ["start end", "start start"]\n  });',
  ''
);
fs.writeFileSync('src/pages/Solucoes.tsx', c2, 'utf8');
console.log('Fixed scrollYProgress');
