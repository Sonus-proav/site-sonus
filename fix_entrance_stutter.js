import fs from 'fs';

const path = 'src/components/plenarios/WarrantyShield3D.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Delay the idle animation start by 1.8s
const oldEffect = `  // AUTOMATIC IDLE ANIMATION (No mouse tracking)
  useEffect(() => {
    if (isInView) {
      // Gently tilt around automatically in a seamless loop
      const controlsX = animate(mouseX, [0, 0.25, 0, -0.25, 0], { duration: 10, repeat: Infinity, ease: "easeInOut" });
      const controlsY = animate(mouseY, [0, 0.15, 0, -0.15, 0], { duration: 7, repeat: Infinity, ease: "easeInOut" });
      return () => {
        controlsX.stop();
        controlsY.stop();
      };
    }
  }, [isInView, mouseX, mouseY]);`;

const newEffect = `  // AUTOMATIC IDLE ANIMATION (No mouse tracking)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let controlsX: any;
    let controlsY: any;

    if (isInView) {
      // Atrasamos o início do movimento 3D em 2 segundos para não "sufocar" a CPU
      // enquanto a animação de entrada (scale/y/opacity) e os ícones estão surgindo.
      timeoutId = setTimeout(() => {
        controlsX = animate(mouseX, [0, 0.25, 0, -0.25, 0], { duration: 10, repeat: Infinity, ease: "easeInOut" });
        controlsY = animate(mouseY, [0, 0.15, 0, -0.15, 0], { duration: 7, repeat: Infinity, ease: "easeInOut" });
      }, 1800);
    }
    return () => {
      clearTimeout(timeoutId);
      if (controlsX) controlsX.stop();
      if (controlsY) controlsY.stop();
    };
  }, [isInView, mouseX, mouseY]);`;

content = content.replace(oldEffect, newEffect);

// 2. Add willChange: 'transform, opacity' to the main shield wrapper
content = content.replace(
  "transformStyle: 'preserve-3d',\n                willChange: 'transform',",
  "transformStyle: 'preserve-3d',\n                willChange: 'transform, opacity',"
);

// If my previous script didn't add willChange: 'transform', add it now
if (!content.includes("willChange: 'transform, opacity',") && content.includes("transformStyle: 'preserve-3d',")) {
  content = content.replace(
    "transformStyle: 'preserve-3d',",
    "transformStyle: 'preserve-3d',\n                willChange: 'transform, opacity',"
  );
}

// 3. Make sure the entrance scale animation is smooth
content = content.replace(
  "transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}",
  "transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}" // Faster, snappier entrance
);

// 4. Delay the SVG circuit drawing slightly so it happens after the main pop
content = content.replace(
  "transition={{ duration: 2, delay: 0.8 + i * 0.25, ease: 'easeInOut' }}",
  "transition={{ duration: 1.5, delay: 1.2 + i * 0.2, ease: 'easeInOut' }}"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Entrance optimizations applied!');
