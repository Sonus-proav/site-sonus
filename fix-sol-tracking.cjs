const fs = require('fs');
let s = fs.readFileSync('src/pages/Solucoes.tsx', 'utf8');

// Add GTM to Link
s = s.replace(
  '<Link to={dim.link} className="w-fit">',
  '<Link to={dim.link} onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "navigate_solucoes_slider", dimension: dim.title }); }} className="w-fit">'
);

// Add Schema (JSON-LD)
const schema = `{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Integração Audiovisual Corporativa",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sonus Pro Audio e Video"
    },
    "areaServed": "Brasil",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Soluções de Tecnologia Audiovisual",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plenários e Câmaras" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Salas Corporativas de Videoconferência" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sonorização de Auditórios e Teatros" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sonorização de Igrejas e Templos" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design e Programação Q-SYS" } }
      ]
    }
  }`;

s = s.replace(
  '<Helmet>\n        <title>Ecossistema de Soluções | Sonus Pro AV</title>\n      </Helmet>',
  `<Helmet>\n        <title>Ecossistema de Soluções | Sonus Pro AV</title>\n        <script type="application/ld+json">{JSON.stringify(${schema})}</script>\n      </Helmet>`
);

// Also correct encoding if there are any issues with 'ç' and 'õ'
s = s.split('Ecossistema de Solues').join('Ecossistema de Soluções');
s = s.split('Plenǭrios e Cǽmaras').join('Plenários e Câmaras');
s = s.split('A Soberania do Som e da Imagem.').join('A Soberania do Som e da Imagem.');
s = s.split('VideoconferǦncia de Alto Padrǜo.').join('Videoconferência de Alto Padrão.');
s = s.split('Auditrios e Teatros').join('Auditórios e Teatros');
s = s.split('Acǧstica Profissional em Grande Escala.').join('Acústica Profissional em Grande Escala.');
s = s.split('CǸrebro da Integraǜo').join('Cérebro da Integração');
s = s.split('Plenǭrios').join('Plenários');
s = s.split('VideoconferǦncia').join('Videoconferência');
s = s.split('Integraǜo').join('Integração');
s = s.split('Operaǜo').join('Operação');
s = s.split('incomparǭvel').join('incomparável');
s = s.split('tecnolgica').join('tecnológica');
s = s.split('reunies').join('reuniões');
s = s.split('eletrnica').join('eletrônica');
s = s.split('automǭticas').join('automáticas');
s = s.split('cǽmeras').join('câmeras');
s = s.split('robticas').join('robóticas');
s = s.split('?udio').join('Áudio');
s = s.split('vdeo').join('vídeo');
s = s.split('Sonorizaǜo').join('Sonorização');
s = s.split('espao').join('espaço');
s = s.split('ǧltimo').join('último');
s = s.split('CǸrebro').join('Cérebro');
s = s.split('ǭudio').join('áudio');
s = s.split('automaǜo').join('automação');
s = s.split('Olǭ!').join('Olá!');
s = s.split('solues').join('soluções');
s = s.split('fundaǜo').join('fundação');
s = s.split('crticos').join('críticos');
s = s.split('impecǭvel').join('impecável');
s = s.split('nǜo').join('não');
s = s.split('precisǜo').join('precisão');


fs.writeFileSync('src/pages/Solucoes.tsx', s);
console.log("Solucoes updated with Tracking, Schema and decoded characters");
