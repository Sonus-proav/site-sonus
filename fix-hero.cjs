const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  '<section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 overflow-x-hidden px-4 border-b border-white/5">',
  '<section ref={heroRef} className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center overflow-x-hidden px-4 border-b border-white/5">'
);

content = content.replace(
  '<div className="w-full relative flex justify-center h-[500px] md:h-[600px] z-20">',
  '<div className="w-full relative flex justify-center h-[420px] sm:h-[500px] md:h-[600px] z-20 mt-8 lg:mt-0">'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
