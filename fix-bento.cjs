const fs = require('fs');
let s = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// Replace the animate={{ flex: ... }} with style={{ flex: ... }}
// The current code is:
/*
                  animate={{
                    flex: isActive ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? 5 : 4) : 1,
                  }}
*/
s = s.replace(
  `animate={{\n                    flex: isActive ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? 5 : 4) : 1,\n                  }}`,
  `style={{ flex: isActive ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? 5 : 4) : 1 }}`
);

// If there was any problem with exact whitespace matching, let's use regex:
s = s.replace(/animate=\{\{\s*flex: isActive \? \(typeof window !== 'undefined' && window\.innerWidth > 1024 \? 5 : 4\) : 1,\s*\}\}/, 
  `style={{ flex: isActive ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? 5 : 4) : 1 }}`);

// Let's also check if images inside have layout prop to prevent distortion. 
// If an image is inside a layout container, we should give it layout="position" or something.
// But usually object-cover handles it well enough if the container scales.

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', s);
console.log("BentoEspecialidades layout animation fixed!");
