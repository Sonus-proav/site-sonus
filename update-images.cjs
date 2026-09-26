const fs = require('fs');

let c = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// Update Plenarios image
c = c.replace(
  'id: "plenarios",\n    title: "Plenários e Câmaras",\n    subtitle: "Votação Digital",\n    description: "Captação irretocável para o legislativo. Microfones parlamentares integrados com câmera tracking automático e votação blindada.",\n    image: "/auditorio-sonus.webp",',
  'id: "plenarios",\n    title: "Plenários e Câmaras",\n    subtitle: "Votação Digital",\n    description: "Captação irretocável para o legislativo. Microfones parlamentares integrados com câmera tracking automático e votação blindada.",\n    image: "/plenarios/painel-sessoes.png",'
);

// Update Igrejas image
c = c.replace(
  'id: "igrejas",\n    title: "Igrejas e Templos",\n    subtitle: "Palavra Clara",\n    description: "Acústica controlada para atingir todos os fiéis com clareza. Da voz falada ao louvor com banda completa, sem microfonia.",\n    image: "/sobre-sonus.webp",',
  'id: "igrejas",\n    title: "Igrejas e Templos",\n    subtitle: "Palavra Clara",\n    description: "Acústica controlada para atingir todos os fiéis com clareza. Da voz falada ao louvor com banda completa, sem microfonia.",\n    image: "/interior-matriz-xanxere.webp",'
);

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', c);
console.log("Images updated.");
