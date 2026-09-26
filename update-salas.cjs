const fs = require('fs');
let c = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

c = c.replace(
  'id: "salas",\n    title: "Salas Corporativas",\n    subtitle: "Videoconferência Nativa",\n    description: "Automação invisível. Reuniões híbridas que começam com um toque, sem cabos pela mesa e sem falhas de conexão.",\n    image: "/sobre-sonus.webp",',
  'id: "salas",\n    title: "Salas Corporativas",\n    subtitle: "Videoconferência Nativa",\n    description: "Automação invisível. Reuniões híbridas que começam com um toque, sem cabos pela mesa e sem falhas de conexão.",\n    image: "/salas-corporativas.webp",'
);

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', c);
