const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// The lines and circles running infinitely
s = s.replace(/animate=\{\{ x: \["-100%", "100%"\] \}\}/g, 'animate={isDesktop ? { x: ["-100%", "100%"] } : {}}');
s = s.replace(/animate=\{\{ y: \["-100%", "100%"\] \}\}/g, 'animate={isDesktop ? { y: ["-100%", "100%"] } : {}}');
s = s.replace(/animate=\{\{ scale: \[1, 3\], opacity: \[0.8, 0\] \}\}/g, 'animate={isDesktop ? { scale: [1, 3], opacity: [0.8, 0] } : {}}');
s = s.replace(/animate=\{\{ pathLength: \[0, 1, 0\], pathOffset: \[0, 1, 1\] \}\}/g, 'animate={isDesktop ? { pathLength: [0, 1, 0], pathOffset: [0, 1, 1] } : {}}');

// The random height audio bars
const audioBars = /animate=\{\{ height: \[`\$\{20 \+ Math\.random\(\) \* 80\}%`, `\$\{20 \+ Math\.random\(\) \* 80\}%`, `\$\{20 \+ Math\.random\(\) \* 80\}%`\] \}\}/g;
s = s.replace(audioBars, 'animate={isDesktop ? { height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] } : { height: "50%" }}');

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Hero infinite loops stopped on mobile');
