const fs = require('fs');
let s = fs.readFileSync('src/components/ui/SpotlightCard.tsx', 'utf8');
s = s.replace('const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {', `const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;`);
fs.writeFileSync('src/components/ui/SpotlightCard.tsx', s);

let s2 = fs.readFileSync('src/components/ui/Magnetic.tsx', 'utf8');
s2 = s2.replace('const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {', `const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;`);
fs.writeFileSync('src/components/ui/Magnetic.tsx', s2);

console.log('Mouse move events disabled on mobile');
