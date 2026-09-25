import fs from 'fs';

const path = 'src/components/plenarios/WarrantyShield3D.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix the normal divs
content = content.replace(
  "style={{ z: 40, transformStyle: 'preserve-3d' }}",
  "style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}"
);

// Fix the motion.div shadow
content = content.replace(
  "z: -100, // pushing shadow far back",
  "" // Remove from style
);
content = content.replace(
  "className=\"absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-12 rounded-[100%] blur-3xl pointer-events-none\"",
  "className=\"absolute -bottom-16 left-1/2 -translate-x-1/2 w-full h-12 rounded-[100%] blur-3xl pointer-events-none\"\n                initial={{ z: -100 }}"
);

// Fix the text content motion.div
content = content.replace(
  "style={{ z: 30 }} // Text floats above shield",
  "" // Remove from style
);
content = content.replace(
  "initial={{ opacity: 0, y: 20 }}",
  "initial={{ opacity: 0, y: 20, z: 30 }}"
);

// Fix shield icon motion.div
content = content.replace(
  "style={{ z: 20 }} // Pops out even more from layer 1",
  "" // Remove from style
);
content = content.replace(
  "initial={{ scale: 0, rotateY: -180 }}",
  "initial={{ scale: 0, rotateY: -180, z: 20 }}"
);

// Fix Wifi icon
content = content.replace(
  "style={{ z: 80 }}",
  ""
);
content = content.replace(
  "initial={{ opacity: 0, scale: 0, y: 20 }}",
  "initial={{ opacity: 0, scale: 0, y: 20, z: 80 }}"
);

// Fix Wrench icon
content = content.replace(
  "style={{ z: 100 }}",
  ""
);
content = content.replace(
  "initial={{ opacity: 0, scale: 0, x: -20 }}",
  "initial={{ opacity: 0, scale: 0, x: -20, z: 100 }}"
);

// Fix Clock icon
content = content.replace(
  "style={{ z: 60 }}",
  ""
);
content = content.replace(
  "initial={{ opacity: 0, scale: 0 }}",
  "initial={{ opacity: 0, scale: 0, z: 60 }}"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed invalid Z styles');
