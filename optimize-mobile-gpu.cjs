const fs = require('fs');

// Optimize AboutExperience
let about = fs.readFileSync('src/components/ui/AboutExperience.tsx', 'utf8');
about = about.replace('backdrop-blur-2xl', 'backdrop-blur-md md:backdrop-blur-2xl');
about = about.replace('backdrop-blur-md', 'backdrop-blur-sm md:backdrop-blur-md');
fs.writeFileSync('src/components/ui/AboutExperience.tsx', about);

// Optimize ClientMarquee
let marquee = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');
marquee = marquee.replace(/blur-\[120px\]/g, 'blur-[60px] md:blur-[120px]');
marquee = marquee.replace(/backdrop-blur-md/g, 'backdrop-blur-sm md:backdrop-blur-md');
fs.writeFileSync('src/components/ui/ClientMarquee.tsx', marquee);

// Optimize SocialProofBar
let proof = fs.readFileSync('src/components/ui/SocialProofBar.tsx', 'utf8');
proof = proof.replace(/backdrop-blur-md/g, 'backdrop-blur-sm md:backdrop-blur-md');
fs.writeFileSync('src/components/ui/SocialProofBar.tsx', proof);

console.log("Optimizations applied");
