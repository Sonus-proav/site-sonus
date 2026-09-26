const fs = require('fs');
let c = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Remove the sharp 1px top highlight div from ControlCard
c = c.replace('<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />', '');

// 2. Add inset shadow to ControlCard to replace the top highlight gracefully
c = c.replace('className="w-full h-full rounded-[2rem] border border-white/20 bg-black/70 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-6 overflow-hidden flex flex-col justify-between"', 'className="w-full h-full rounded-[2rem] border border-white/20 bg-black/70 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(34,211,238,0.3)] p-6 overflow-hidden flex flex-col justify-between"');

// 3. Remove transformStyle: preserve-3d from the individual card wrappers, as it breaks overflow-hidden on some browsers.
c = c.replace('style={{ transformStyle: "preserve-3d" }}', ''); // This might replace the first one (the parent). We want to keep the parent.

// Let's do it safely with exact string replacement for the child
const childMotionDiv = `              style={{ transformStyle: "preserve-3d" }}\n            >\n              {CardContent}`;
const fixedChildMotionDiv = `            >\n              {CardContent}`;
c = c.replace(childMotionDiv, fixedChildMotionDiv);

fs.writeFileSync('src/components/ui/HeroVisual.tsx', c);
console.log("Fixed HeroVisual corners");
