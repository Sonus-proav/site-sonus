const fs = require('fs');

function replaceInFile(filePath, target, replaceText) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(target, replaceText);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Footer.tsx
replaceInFile(
  'src/components/layout/Footer.tsx',
  /Venda de equipamentos e execução de instalação opcionais \(nacional\)\./g,
  'Fornecemos os equipamentos e executamos a instalação presencial onde o seu projeto precisar.'
);

// 2. LPFooter.tsx (Wait, LPFooter has a slightly different phrase? No, we replaced it identically in purge-regions.cjs)
// Wait, the purge-regions.cjs actually replaced: 
// { target: /Atendimento especializado em todo o Sul do Brasil \(Paran.*, Santa Catarina e Rio Grande do Sul\)\./g, replace: '...' }
// BUT LPFooter.tsx actually had: "Atendimento especializado em todo o Sul do Brasil:" and "Cobertura ativa no Paran..." 
// Let's just do a global replace for the exact string across all files.

const files = [
  'src/components/layout/Footer.tsx',
  'src/components/layout/LPFooter.tsx' // If it exists there
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(
      /Venda de equipamentos e execução de instalação opcionais \(nacional\)\./g,
      'Fornecemos os equipamentos e executamos a instalação presencial onde o seu projeto precisar.'
    );
    fs.writeFileSync(f, content, 'utf8');
  }
});

// 3. MeetingRoomsLanding.tsx
replaceInFile(
  'src/pages/MeetingRoomsLanding.tsx',
  'no PR, SC e RS | Sonus"',
  '| Sonus"'
);

