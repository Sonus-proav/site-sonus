const fs = require('fs');

let content = fs.readFileSync('src/components/ui/TestimonialSection.tsx', 'utf8');

// Felipe
content = content.replace(
  'name: "Felipe Rodrigues",',
  'name: "Felipe",'
);
content = content.replace(
  'role: "Gerente de Infraestrutura",',
  'role: "Gerente de TI",'
);
content = content.replace(
  'initials: "FR",',
  'initials: "F",'
);

// Pr. Leandro
content = content.replace(
  'name: "Pr. Leandro Costa",',
  'name: "Pr. Leandro",'
);
content = content.replace(
  'initials: "LC",',
  'initials: "PL",'
);

// Ana
content = content.replace(
  'name: "Ana Slvia Lins",', // Using regex due to encoding issue
  'name: "Ana",'
);
// In case the encoding is different:
content = content.replace(
  /name:\s*"Ana S.*lvia Lins",/,
  'name: "Ana",'
);
content = content.replace(
  'initials: "AS",',
  'initials: "A",'
);


fs.writeFileSync('src/components/ui/TestimonialSection.tsx', content, 'utf8');
