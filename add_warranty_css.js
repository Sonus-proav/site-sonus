import fs from 'fs';

const path = 'src/index.css';
let content = fs.readFileSync(path, 'utf8');

const newKeyframes = `
  /* ── Warranty Shield 3D Animations (Pure CSS, GPU-accelerated) ── */
  @keyframes warranty-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes warranty-scan {
    0%, 100% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    50% { transform: translateY(200%); }
  }

  @keyframes warranty-ring {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.15); opacity: 0.1; }
  }

  @keyframes warranty-orbit {
    0% { transform: rotate(0deg) translateX(24px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(24px) rotate(-360deg); }
  }
`;

// Insert after blink-colon keyframe
const insertAfter = '@keyframes blink-colon {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0; }\n  }';
if (content.includes(insertAfter)) {
  content = content.replace(insertAfter, insertAfter + '\n' + newKeyframes);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Injected warranty keyframes!');
} else {
  // Fallback: append at end
  content += '\n' + newKeyframes;
  fs.writeFileSync(path, content, 'utf8');
  console.log('Appended warranty keyframes (fallback)');
}
