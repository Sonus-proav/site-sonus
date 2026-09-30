const fs = require('fs');

let s = fs.readFileSync('src/components/ui/HeroVisual.tsx', 'utf8');

// 1. Re-add invRotates
if (!s.includes('const invRotateX')) {
  s = s.replace(
    'const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])',
    'const rotateZ = useTransform(mouseX, [-1, 1], [-35, -55])\n' +
    '  const invRotateX = useTransform(rotateX, x => -x)\n' +
    '  const invRotateY = useTransform(rotateY, y => -y)\n' +
    '  const invRotateZ = useTransform(rotateZ, z => -z)'
  );
}

// 2. Rewrite renderLabel
const newRenderLabel = 
'  const renderLabel = (title: string, subtitle: string, dotColor: string, lineGradient: string, textCol: string, widthClass: string, zHover: number, zIdle: number) => (\n' +
'    <motion.div \n' +
'      className="absolute bottom-4 right-4 pointer-events-none hidden lg:block" \n' +
'      style={{ transformStyle: "preserve-3d" }} \n' +
'      animate={{ translateZ: isHovered ? zHover : zIdle }}\n' +
'      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}\n' +
'    >\n' +
'      <motion.div style={{ rotateZ: invRotateZ, transformOrigin: "left center" }}>\n' +
'        <motion.div style={{ rotateY: invRotateY, transformOrigin: "left center" }}>\n' +
'          <motion.div style={{ rotateX: invRotateX, transformOrigin: "left center" }} className="flex items-center">\n' +
'             <div className="flex items-center relative z-0">\n' +
'               <div className={"w-1.5 h-1.5 rounded-full " + dotColor + " animate-pulse"} style={{ boxShadow: "0 0 10px currentColor" }} />\n' +
'               <div className={"h-[1px] bg-gradient-to-r " + lineGradient + " to-transparent opacity-60 " + widthClass} />\n' +
'             </div>\n' +
'             <div className="bg-[#050505] border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] -ml-4 relative z-10 whitespace-nowrap">\n' +
'               <p className={textCol + " text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5"}>{title}</p>\n' +
'               <p className="text-white font-medium text-[11px] font-mono">{subtitle}</p>\n' +
'             </div>\n' +
'          </motion.div>\n' +
'        </motion.div>\n' +
'      </motion.div>\n' +
'    </motion.div>\n' +
'  )\n\n';

const oldRenderStart = s.indexOf('  const renderLabel =');
const oldRenderEnd = s.indexOf('  const handleMouseMove');
s = s.substring(0, oldRenderStart) + newRenderLabel + s.substring(oldRenderEnd);

// 3. Remove 2D Overlay
const overlayStart = s.indexOf('      {/* 2D HUD OVERLAY');
if (overlayStart !== -1) {
    const endStr = '    </div>\r\n  )\r\n}';
    const endStr2 = '    </div>\n  )\n}';
    s = s.substring(0, overlayStart) + (s.includes('\r\n') ? endStr : endStr2);
}

// 4. Inject 3D Siblings at the end of the 3D container
const injection = 
'          {renderLabel(\'Network Layer\', \'AV over IP Matrix\', \'bg-blue-400\', \'from-blue-400\', \'text-blue-400\', \'w-24\', -150, -60)}\n' +
'          {renderLabel(\'Acoustic Layer\', \'DSP Processing\', \'bg-emerald-400\', \'from-emerald-400\', \'text-emerald-400\', \'w-16\', -50, -20)}\n' +
'          {renderLabel(\'Video Layer\', \'Camera Tracking\', \'bg-violet-400\', \'from-violet-400\', \'text-violet-400\', \'w-10\', 50, 20)}\n' +
'          {renderLabel(\'Control Layer\', \'User Interface\', \'bg-cyan-400\', \'from-cyan-400\', \'text-cyan-400\', \'w-4\', 150, 60)}\n' +
'        </motion.div>\n' +
'      </motion.div>\n';

const injectionRN = 
'          {renderLabel(\'Network Layer\', \'AV over IP Matrix\', \'bg-blue-400\', \'from-blue-400\', \'text-blue-400\', \'w-24\', -150, -60)}\r\n' +
'          {renderLabel(\'Acoustic Layer\', \'DSP Processing\', \'bg-emerald-400\', \'from-emerald-400\', \'text-emerald-400\', \'w-16\', -50, -20)}\r\n' +
'          {renderLabel(\'Video Layer\', \'Camera Tracking\', \'bg-violet-400\', \'from-violet-400\', \'text-violet-400\', \'w-10\', 50, 20)}\r\n' +
'          {renderLabel(\'Control Layer\', \'User Interface\', \'bg-cyan-400\', \'from-cyan-400\', \'text-cyan-400\', \'w-4\', 150, 60)}\r\n' +
'        </motion.div>\r\n      </motion.div>\r\n';

s = s.replace('        </motion.div>\r\n      </motion.div>\r\n\r\n    </div>', injectionRN + '\r\n    </div>');
s = s.replace('        </motion.div>\n      </motion.div>\n\n    </div>', injection + '\n    </div>');

fs.writeFileSync('src/components/ui/HeroVisual.tsx', s);
console.log('Script ran successfully!');
