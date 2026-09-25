import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import for SpotlightCard if not exists
const importSpotlight = `import { SpotlightCard } from "@/components/ui/SpotlightCard";\n`;
if (!content.includes('SpotlightCard')) {
  const lastImportIndex = content.lastIndexOf('import ');
  const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
  content = content.substring(0, endOfLastImport) + importSpotlight + content.substring(endOfLastImport);
}

// Wrap Act 1 Mockup
content = content.replace(
  '<div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-700">',
  '<SpotlightCard className="p-0 border-white/10"><div className="bg-[#0b1120] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700">'
);
// Need to find the closing div of this specific one, it's safer to just replace the first `</div>` that closes it.
// Actually, it's easier to just do it via regex, but let's be careful.
// Let's replace the whole `div` block for Act 1 mockup.

// Instead, I'll use Magnetic for the text elements to give them some spring!
// The user asked for beautiful animations.
// `Reveal` and `FadeIn` are good, but we can do a floating particles background for the whole section.
// Wait, my `LiveSessionSimulator` component is going to be the absolute killer feature here. It literally runs a fake session!

