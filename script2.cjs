const fs = require('fs');
let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

s = s.replace(
  '{/* =======================================\\n              LAYER 2',
  `{renderLabel('Network Layer', 'AV over IP Matrix', 'bg-blue-400', 'from-blue-400', 'text-blue-400', 'w-44')}\\n          {/* =======================================\\n              LAYER 2`
);

s = s.replace(
  '{/* =======================================\\n              LAYER 3',
  `{renderLabel('Acoustic Layer', 'DSP Processing', 'bg-emerald-400', 'from-emerald-400', 'text-emerald-400', 'w-36')}\\n          {/* =======================================\\n              LAYER 3`
);

s = s.replace(
  '{/* =======================================\\n              LAYER 4',
  `{renderLabel('Video Layer', 'Camera Tracking', 'bg-violet-400', 'from-violet-400', 'text-violet-400', 'w-28')}\\n          {/* =======================================\\n              LAYER 4`
);

// For layer 4, we inject at the end of it
s = s.replace(
  '</motion.div>\\n        </motion.div>\\n      </motion.div>',
  `  {renderLabel('Control Layer', 'User Interface', 'bg-cyan-400', 'from-cyan-400', 'text-cyan-400', 'w-20')}\\n          </motion.div>\\n        </motion.div>\\n      </motion.div>`
);

// Delete the old labels
const oldStart = s.indexOf('{/* Floating Labels connecting to the layers');
if(oldStart !== -1) {
  s = s.substring(0, oldStart) + '\\n    </div>\\n  )\\n}';
}

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
