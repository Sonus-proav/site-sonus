import fs from 'fs';

const path = 'src/components/plenarios/WarrantyShield3D.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace explicit translateZ strings with z property for Framer Motion or just don't mix them!
// Wait, for <div className="..."> I used style={{ transform: 'translateZ(-40px)' }} which is fine since it's not a <motion.div>!
// For <motion.div>, let's check:

content = content.replace(
  "transform: 'translateZ(-100px)', // pushing shadow far back",
  "z: -100, // pushing shadow far back"
);

// Any other <motion.div> with transform: 'translateZ'?
content = content.replace(
  "style={{ transform: 'translateZ(20px)' }} // Pops out even more from layer 1",
  "style={{ z: 20 }} // Pops out even more from layer 1"
);

content = content.replace(
  "style={{ transform: 'translateZ(30px)' }} // Text floats above shield",
  "style={{ z: 30 }} // Text floats above shield"
);

content = content.replace(
  "style={{ transform: 'translateZ(80px)' }}",
  "style={{ z: 80 }}"
);

content = content.replace(
  "style={{ transform: 'translateZ(100px)' }}",
  "style={{ z: 100 }}"
);

content = content.replace(
  "style={{ transform: 'translateZ(60px)' }}",
  "style={{ z: 60 }}"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed translateZ to z in motion.divs');
