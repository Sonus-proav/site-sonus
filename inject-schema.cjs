const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const schemaStr = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sonus Pro AV",
  "image": "https://sonusproaudio.com.br/og-image.jpg",
  "url": "https://sonusproaudio.com.br",
  "telephone": "+5546920013151",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "PR"
  },
  "sameAs": [
    "https://www.instagram.com/sonusproaudio",
    "https://br.linkedin.com/company/sonus-pro-av"
  ]
}`;

// match the <SEO tag
content = content.replace(/<SEO[^>]+url="https:\/\/sonusproaudio\.com\.br"\s*\/>/m, `<SEO \n        title="Sonus Pro AV | Integração Audiovisual de Alto Padrão" \n        description="A tecnologia desaparece. A conexão importa. Projetos audiovisuais de precisão para Salas Corporativas, Plenários e Auditórios." \n        url="https://sonusproaudio.com.br"\n        schema={${schemaStr}}\n      />`);

fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
