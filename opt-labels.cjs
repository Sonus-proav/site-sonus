const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// Remover completamente o backdrop-blur-sm para poupar a GPU
s = s.replace(/backdrop-blur-sm/g, '');

// Trocar o bg-[#050505]/95 para fundo sólido bg-[#050505] para o contraste ficar perfeito e o navegador não precisar calcular opacidade composta
s = s.replace(/bg-\\[#050505\\]\\/95/g, 'bg-[#050505]');

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Otimização aplicada!');
