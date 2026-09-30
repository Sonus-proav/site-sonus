const fs = require('fs');
let s = fs.readFileSync('src/index.css', 'utf8');

s += `
/* =======================================
   Mobile Performance Tweaks
   ======================================= */
/* Oculta os orbs gigantes que destroem a GPU do mobile */
.mobile-device [class*="blur-\\[120px\\]"],
.mobile-device [class*="blur-\\[100px\\]"],
.mobile-device [class*="blur-\\[80px\\]"] {
  display: none !important;
}

/* Desabilita text-shadow pesados e brilhos de mouse em SpotlightCards no mobile */
.mobile-device .spotlight-glow {
  display: none !important;
}

/* Simplifica a renderização 3D - remove transformações de hover muito complexas */
.mobile-device [class*="hover\\:scale"] {
  transform: none !important;
  transition: none !important;
}

/* Desativa as ondas sonoras animadas por GPU no mobile */
.mobile-device .animate-gpu-soundwave {
  animation: none !important;
  opacity: 0.1 !important;
}
`;

fs.writeFileSync('src/index.css', s);
console.log('index.css optimized');
