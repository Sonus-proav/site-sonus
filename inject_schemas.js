import fs from 'fs';

// Auditorios
let aFile = 'src/pages/AuditoriosTeatros.tsx';
let aContent = fs.readFileSync(aFile, 'utf8');

const auditoriosSchema = `
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sonorização e Automação para Auditórios e Teatros",
    "provider": { "@type": "Organization", "name": "Sonus Pro AV" },
    "description": "Projetos avançados de acústica, sonorização imersiva e vídeo de alta resolução para grandes auditórios e teatros.",
    "areaServed": { "@type": "Country", "name": "Brasil" },
    "category": "Integração Audiovisual"
  };
`;

if (!aContent.includes('const schema = {')) {
  aContent = aContent.replace(
    'return (\n    <div className="flex flex-col min-h-screen',
    auditoriosSchema + '\n  return (\n    <div className="flex flex-col min-h-screen'
  );
  aContent = aContent.replace(
    '<SEO \n        title="Sonorização para Auditórios',
    '<SEO schema={schema}\n        title="Sonorização para Auditórios'
  );
  aContent = aContent.replace(
    '<SEO \n        title="Sonorizaǜo para Auditrios',
    '<SEO schema={schema}\n        title="Sonorizaǜo para Auditrios'
  );
  fs.writeFileSync(aFile, aContent, 'utf8');
}

// Igrejas
let iFile = 'src/pages/IgrejasTemplos.tsx';
let iContent = fs.readFileSync(iFile, 'utf8');

const igrejasSchema = `
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sonorização e Acústica para Igrejas e Templos",
    "provider": { "@type": "Organization", "name": "Sonus Pro AV" },
    "description": "Engenharia de áudio para templos religiosos garantindo 100% de inteligibilidade da palavra falada, transmissão ao vivo e operação simplificada.",
    "areaServed": { "@type": "Country", "name": "Brasil" },
    "category": "Integração Audiovisual"
  };
`;

if (!iContent.includes('const schema = {')) {
  iContent = iContent.replace(
    'return (\n    <div className="flex flex-col min-h-screen',
    igrejasSchema + '\n  return (\n    <div className="flex flex-col min-h-screen'
  );
  iContent = iContent.replace(
    '<SEO \n        title="Sonorização para Igrejas',
    '<SEO schema={schema}\n        title="Sonorização para Igrejas'
  );
  iContent = iContent.replace(
    '<SEO \n        title="Sonorizaǜo para Igrejas',
    '<SEO schema={schema}\n        title="Sonorizaǜo para Igrejas'
  );
  fs.writeFileSync(iFile, iContent, 'utf8');
}

console.log('Schemas injected');
