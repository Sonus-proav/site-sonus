import fs from 'fs';

let iFile = 'src/pages/IgrejasTemplos.tsx';
let iContent = fs.readFileSync(iFile, 'utf8');

if (!iContent.includes('schema={schema}')) {
  iContent = iContent.replace(
    '<SEO \n        title=',
    '<SEO schema={schema}\n        title='
  );
  iContent = iContent.replace(
    '<SEO\n        title=',
    '<SEO schema={schema}\n        title='
  );
  iContent = iContent.replace(
    '<SEO title=',
    '<SEO schema={schema}\n        title='
  );
  
  // Also check if schema variable is defined
  if (!iContent.includes('const schema = {')) {
    const igrejasSchema = `\n  const schema = {\n    "@context": "https://schema.org",\n    "@type": "Service",\n    "name": "Sonorização e Acústica para Igrejas e Templos",\n    "provider": { "@type": "Organization", "name": "Sonus Pro AV" },\n    "description": "Engenharia de áudio para templos religiosos garantindo 100% de inteligibilidade da palavra falada.",\n    "areaServed": { "@type": "Country", "name": "Brasil" },\n    "category": "Integração Audiovisual"\n  };\n`;
    iContent = iContent.replace(
      'return (\n    <div className="flex flex-col min-h-screen',
      igrejasSchema + '\n  return (\n    <div className="flex flex-col min-h-screen'
    );
  }
  
  fs.writeFileSync(iFile, iContent, 'utf8');
}
console.log('Igrejas fixed');
