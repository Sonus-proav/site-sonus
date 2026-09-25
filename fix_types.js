import fs from 'fs';

// Fix SolutionCard3D
let c1 = fs.readFileSync('src/components/ui/SolutionCard3D.tsx', 'utf8');
c1 = c1.replace(
  'import { LucideIcon, ArrowRight } from "lucide-react";',
  'import { ArrowRight } from "lucide-react";\nimport type { LucideIcon } from "lucide-react";'
);
c1 = c1.replace('const [isHovered, setIsHovered] = useState(false);\n  ', '');
c1 = c1.replace('onMouseEnter={() => setIsHovered(true)}', '');
c1 = c1.replace('setIsHovered(false);\n    mouseX.set(0.5);', 'mouseX.set(0.5);');
fs.writeFileSync('src/components/ui/SolutionCard3D.tsx', c1, 'utf8');

// Fix Solucoes.tsx
let c2 = fs.readFileSync('src/pages/Solucoes.tsx', 'utf8');
c2 = c2.replace('delay={0.2} threshold={0.2}', 'delay={0.2}');
fs.writeFileSync('src/pages/Solucoes.tsx', c2, 'utf8');

console.log('Fixed types and props');
