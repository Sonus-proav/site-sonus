const fs = require('fs');

let homePath = 'src/pages/Home.tsx';
let homeContent = fs.readFileSync(homePath, 'utf8');

const target = `<section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
        {/* Vibrant Gradient Orbs (Controlled, not overpowering) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3" />`;

const replacement = `<section className="relative min-h-screen flex items-center pt-28 pb-20 bg-[#050505]">
        {/* Background Wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] pointer-events-none -translate-x-1/3 translate-y-1/3" />
        </div>`;

homeContent = homeContent.replace(target, replacement);
fs.writeFileSync(homePath, homeContent, 'utf8');
