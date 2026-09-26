import fs from 'fs';

let content = fs.readFileSync('src/components/plenarios/WarrantyShield3D.tsx', 'utf8');

// 1. Change Spring Config
content = content.replace(
  'const springConfig = { stiffness: 90, damping: 20, mass: 0.8 };',
  'const springConfig = { stiffness: 30, damping: 25, mass: 1.2 };'
);

// 2. Change Rotate Extents
content = content.replace(
  'const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [28, -28]), springConfig);',
  'const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);'
);
content = content.replace(
  'const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), springConfig);',
  'const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);'
);

// 3. Change Idle Animation Duration
content = content.replace(
  'controlsX = animate(mouseX, [0, 0.45, 0, -0.45, 0], { duration: 9, repeat: Infinity, ease: "easeInOut" });',
  'controlsX = animate(mouseX, [0, 0.45, 0, -0.45, 0], { duration: 16, repeat: Infinity, ease: "easeInOut" });'
);
content = content.replace(
  'controlsY = animate(mouseY, [0, 0.2, 0, -0.2, 0], { duration: 7, repeat: Infinity, ease: "easeInOut" });',
  'controlsY = animate(mouseY, [0, 0.25, 0, -0.25, 0], { duration: 12, repeat: Infinity, ease: "easeInOut" });'
);

fs.writeFileSync('src/components/plenarios/WarrantyShield3D.tsx', content, 'utf8');
console.log('Fixed shield physics');
