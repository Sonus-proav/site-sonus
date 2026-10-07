const fs = require('fs');

let homePath = 'src/pages/Home.tsx';
let homeContent = fs.readFileSync(homePath, 'utf8');

// The line is: <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
homeContent = homeContent.replace(
  '<section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">',
  '<section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-x-clip bg-[#050505]">'
);

fs.writeFileSync(homePath, homeContent, 'utf8');
