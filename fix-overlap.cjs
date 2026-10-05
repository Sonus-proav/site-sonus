const fs = require('fs');
let content = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

content = content.replace(
  /<div className="flex-1 w-full relative min-h-\[300px\]">[\s\S]*?<\/div>\s*<\/div>/,
  `<div className="w-full relative px-0 pb-4 flex-1">
                           <div className="w-full h-full scale-95 origin-top">
                             <ClubHeatmap />
                           </div>
                        </div>`
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', content, 'utf8');
