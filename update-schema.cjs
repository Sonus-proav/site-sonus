const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const replacement = `"addressRegion": "PR"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Brazil"
      },
      {
        "@type": "Continent",
        "name": "Latin America"
      }
    ],`;

content = content.replace(/"addressRegion": "PR"\s*},/m, replacement);
fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
