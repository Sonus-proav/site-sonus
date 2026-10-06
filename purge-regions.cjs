const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  // 1. JSON-LD areaServed arrays in various formats
  {
    target: /"areaServed":\s*\["Paran.*",\s*"Santa Catarina",\s*"Rio Grande do Sul",\s*"Brasil"\]/g,
    replace: '"areaServed": [ { "@type": "Country", "name": "Brazil" }, { "@type": "Continent", "name": "Latin America" } ]'
  },
  {
    target: /areaServed:\s*\["Paran.*",\s*"Santa Catarina",\s*"Rio Grande do Sul",\s*"Brasil"\]/g,
    replace: 'areaServed: [ { "@type": "Country", "name": "Brazil" }, { "@type": "Continent", "name": "Latin America" } ]'
  },
  {
    target: /"areaServed":\s*\[\s*\{\s*"@type":\s*"State",\s*"name":\s*"Paran.*"\s*\},\s*\{\s*"@type":\s*"State",\s*"name":\s*"Santa Catarina"\s*\},\s*\{\s*"@type":\s*"State",\s*"name":\s*"Rio Grande do Sul"\s*\}\s*\]/g,
    replace: '"areaServed": [ { "@type": "Country", "name": "Brazil" }, { "@type": "Continent", "name": "Latin America" } ]'
  },
  
  // 2. Footer.tsx and LPFooter.tsx
  {
    target: /Atendimento especializado em todo o Sul do Brasil \(Paran.*, Santa Catarina e Rio Grande do Sul\)\./g,
    replace: 'Projetos e consultoria acústica para todo o Brasil e América Latina. Venda de equipamentos e execução de instalação opcionais (nacional).'
  },
  {
    target: /Atendimento especializado em todo o Sul do Brasil:/g,
    replace: 'Atendimento especializado em todo o Brasil e LATAM:'
  },
  {
    target: /Cobertura ativa no <strong>Paran.*<\/strong> \(Curitiba.*\) e <strong>Rio Grande do Sul<\/strong> \(Porto Alegre.*\)\./g,
    replace: 'Nosso modelo de Inteligência Audiovisual permite que você contrate o <strong>Projeto e Consultoria</strong> independente de onde estiver (Brasil e LATAM). Após a entrega técnica, a <strong>execução e instalação</strong> podem ser contratadas conosco ou com parceiros locais indicados.'
  },
  
  // 3. AboutExperience.tsx
  {
    target: /erradicar o amadorismo t.*cnico<\/strong> no Sul do Brasil\./g,
    replace: 'erradicar o amadorismo técnico</strong> do mercado audiovisual.'
  },

  // 4. LPs (Igrejas, Salas, Bares)
  {
    target: /igrejas no Paran.*, Santa Catarina e Rio Grande do Sul/g,
    replace: 'igrejas em todo o Brasil'
  },
  {
    target: /em todo o <strong>Paran.*, Santa Catarina e Rio Grande do Sul<\/strong>/g,
    replace: 'em todo o <strong>Brasil e América Latina</strong>'
  },
  {
    target: /automa..o no Paran.*, Santa Catarina e Rio Grande do Sul\."/g,
    replace: 'automação para empresas em todo o Brasil."'
  },
  {
    target: /projetos, venda e instala..o de sonoriza..o, ac.stica e.* para/gi,
    replace: 'Projetos, venda e instalação de sonorização, acústica e salas de videoconferência para'
  },
  
  // 5. SEO keywords in BaresCasasNoturnas
  {
    target: /sonoriza..o de bares paran.*, laudo ac.stico casa noturna, projeto de .udio boates santa catarina, dsp para bares, ac.stica de igrejas sudoeste paran.*, sonoriza..o profissional maring.* cascavel/g,
    replace: 'sonorização de bares, laudo acústico casa noturna, projeto de áudio boates, dsp para bares, projeto de acústica nacional, sonorização profissional'
  }
];

let changedFiles = 0;

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.target, r.replace);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
      changedFiles++;
    }
  }
});

console.log('Total files updated:', changedFiles);
