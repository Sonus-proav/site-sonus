const fs = require('fs');

const file1 = 'src/pages/BaresCasasNoturnas.tsx';
let content = fs.readFileSync(file1, 'utf8');

// StageBoxVisual
content = content.replace(
  'overflow-hidden transform perspective-[1000px] rotateX(20deg) rotateY(-15deg) rotateZ(5deg) group-hover:rotateX(15deg) group-hover:rotateY(-10deg) group-hover:rotateZ(0deg) transition-all duration-700',
  'overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,1)]'
);

// CertificadoART
content = content.replace(
  'initial={{ rotateY: -15, rotateX: 10, scale: 0.9 }}',
  'initial={{ y: 20, opacity: 0 }}'
);
content = content.replace(
  'whileInView={{ rotateY: 5, rotateX: 0, scale: 1 }}',
  'whileInView={{ y: 0, opacity: 1 }}'
);
content = content.replace(
  'transition={{ duration: 1, type: "spring" }}',
  'transition={{ duration: 0.7, ease: "easeOut" }}\n        viewport={{ once: true }}'
);
content = content.replace(
  'relative border border-zinc-200"',
  'relative border border-zinc-200 transition-transform duration-500 group-hover:scale-105"'
);
content = content.replace(
  'initial={{ scale: 0, rotate: -45 }}',
  'initial={{ scale: 0 }}'
);
content = content.replace(
  'whileInView={{ scale: 1, rotate: 12 }}',
  'whileInView={{ scale: 1 }}'
);

fs.writeFileSync(file1, content, 'utf8');

const file2 = 'src/components/bares/ClubHeatmap.tsx';
let content2 = fs.readFileSync(file2, 'utf8');

content2 = content2.replace(
  'perspective-[1000px]',
  ''
);
content2 = content2.replace(
  'initial={{ rotateX: 45, rotateZ: -15, scale: 0.9 }}',
  'initial={{ scale: 0.9, y: 20, opacity: 0 }}'
);
content2 = content2.replace(
  'whileInView={{ rotateX: 35, rotateZ: -10, scale: 1 }}',
  'whileInView={{ scale: 1, y: 0, opacity: 1 }}'
);
content2 = content2.replace(
  'style={{ transformStyle: "preserve-3d" }}',
  ''
);
content2 = content2.replace(
  'style={{ left: zone.x, top: zone.y, transformStyle: "preserve-3d" }}',
  'style={{ left: zone.x, top: zone.y }}'
);
content2 = content2.replace(
  'style={{ transform: "translateZ(10px)" }}',
  ''
);
content2 = content2.replace(
  'style={{ transform: "rotateX(-35deg) rotateZ(10deg) translateZ(30px)" }} // Counter-rotate so text faces camera',
  ''
);

fs.writeFileSync(file2, content2, 'utf8');
