const fs = require('fs');

let s = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace Badge
s = s.replace(
  'Inteligência Audiovisual Aplicada',
  'Integração Audiovisual Premium'
);

// Replace H1
s = s.replace(
  'Integração <br className="hidden md:block" />',
  'O Poder da <br className="hidden md:block" />'
);
s = s.replace(
  'Invisível.</span>',
  'Precisão Absoluta.</span>'
);

// Replace P
s = s.replace(
  'Projetos acústicos e eletrônicos de alta performance para <span className="font-semibold text-white">Salas Corporativas, Plenários e Auditórios</span>. Quando a conexão é crítica, a tecnologia deve desaparecer.',
  'Elevamos a infraestrutura do seu ambiente ao máximo nível de excelência tecnológica. Inteligência audiovisual avançada e acústica impecável, orquestradas para <span className="font-semibold text-white">instituições que não fazem concessões</span> e exigem controle total do seu espaço.'
);

// Let's slightly reduce the H1 size from 5.5rem to 5rem to accommodate the longer text "Precisão Absoluta" gracefully if needed.
s = s.replace('lg:text-[5.5rem]', 'lg:text-[5rem]');

fs.writeFileSync('src/pages/Home.tsx', s);
console.log("Hero Copy updated successfully!");
