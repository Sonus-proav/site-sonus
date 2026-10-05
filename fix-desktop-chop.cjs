const fs = require('fs');

// 1. Fix BaresCasasNoturnas.tsx grid rows
let baresContent = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');
baresContent = baresContent.replace(
  'auto-rows-auto md:auto-rows-[400px]',
  'auto-rows-auto'
);
fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', baresContent, 'utf8');

// 2. Fix ClubHeatmap.tsx legend card
let heatmapContent = fs.readFileSync('src/components/bares/ClubHeatmap.tsx', 'utf8');
heatmapContent = heatmapContent.replace(
  /className="mt-6 p-4 rounded-xl border border-white\/10 bg-zinc-950\/90  flex items-start gap-4 max-w-\[280px\] sm:max-w-\[340px\] mx-auto w-full shadow-2xl relative overflow-hidden"/g,
  'className="mt-6 p-4 rounded-xl border border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-[280px] sm:max-w-[340px] mx-auto w-full shadow-2xl relative"'
);

// We should also replace the missing space version if the replace failed
heatmapContent = heatmapContent.replace(
  /className="mt-6 p-4 rounded-xl border border-white\/10 bg-zinc-950\/90 flex items-start gap-4 max-w-\[280px\] sm:max-w-\[340px\] mx-auto w-full shadow-2xl relative overflow-hidden"/g,
  'className="mt-6 p-4 rounded-xl border border-white/10 bg-zinc-950/90 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-[280px] sm:max-w-[340px] mx-auto w-full shadow-2xl relative"'
);

fs.writeFileSync('src/components/bares/ClubHeatmap.tsx', heatmapContent, 'utf8');
