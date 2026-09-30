const fs = require('fs');
let s = fs.readFileSync('src/index.css', 'utf8');

s += `
/* Remove ALL backdrop-blur on mobile */
.mobile-device .backdrop-blur-md,
.mobile-device .backdrop-blur-lg,
.mobile-device .backdrop-blur-sm,
.mobile-device .backdrop-blur-xl,
.mobile-device .backdrop-blur-2xl,
.mobile-device .backdrop-blur {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  background-color: rgba(9, 9, 11, 0.95) !important;
}

/* Pause all heavy infinite animations */
.mobile-device .animate-float-slow,
.mobile-device .animate-float-slow-reverse,
.mobile-device .animate-pulse,
.mobile-device .animate-spin-slow {
  animation: none !important;
}

/* Force hardware acceleration and disable will-change on mobile */
.mobile-device * {
  will-change: auto !important;
}
`;

fs.writeFileSync('src/index.css', s);
console.log('Mobile backdrop and anims disabled');
