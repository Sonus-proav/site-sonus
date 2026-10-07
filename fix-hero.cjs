const fs = require('fs');

// 1. Fix Home.tsx (overflow issue)
let homePath = 'src/pages/Home.tsx';
let homeContent = fs.readFileSync(homePath, 'utf8');

const heroSectionTarget = `<section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
        {/* Vibrant Gradient Orbs (Controlled, not overpowering) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />`;

const heroSectionReplacement = `<section className="relative min-h-screen flex items-center pt-28 pb-20 bg-[#050505]">
        {/* Background Wrapper to prevent horizontal overflow without clipping vertical content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Vibrant Gradient Orbs (Controlled, not overpowering) */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none -translate-x-1/3 translate-y-1/3" />
        </div>`;

homeContent = homeContent.replace(heroSectionTarget, heroSectionReplacement);
fs.writeFileSync(homePath, homeContent, 'utf8');

// 2. Fix HeroVisual.tsx (exploded view on mobile)
let visualPath = 'src/components/ui/HeroVisual.tsx';
let visualContent = fs.readFileSync(visualPath, 'utf8');

// Layer 1
visualContent = visualContent.replace(
  /animate=\{\{ translateZ: isHovered \? -150 : -60 \}\}/g,
  'animate={{ translateZ: isHovered || !isDesktop ? -120 : -60 }}'
);
// Layer 2
visualContent = visualContent.replace(
  /animate=\{\{ translateZ: isHovered \? -50 : -20 \}\}/g,
  'animate={{ translateZ: isHovered || !isDesktop ? -40 : -20 }}'
);
// Layer 3
visualContent = visualContent.replace(
  /animate=\{\{ translateZ: isHovered \? 50 : 20 \}\}/g,
  'animate={{ translateZ: isHovered || !isDesktop ? 40 : 20 }}'
);
// Layer 4
visualContent = visualContent.replace(
  /animate=\{\{ translateZ: isHovered \? 150 : 60 \}\}/g,
  'animate={{ translateZ: isHovered || !isDesktop ? 120 : 60 }}'
);

fs.writeFileSync(visualPath, visualContent, 'utf8');
