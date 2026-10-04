const fs = require('fs');
let s = fs.readFileSync('src/pages/BaresCasasNoturnas.tsx', 'utf8');

s = s.replace(
  'com um engenheiro de áudio sobre o som e o laudo',
  'com um especialista em áudio sobre o som e o laudo'
);

s = s.replace(
  'Falar com um Engenheiro de Áudio Agora',
  'Falar com um Especialista de Áudio Agora'
);

s = s.replace(
  'Engenharia de Áudio de Ponta a Ponta para o seu Negócio.',
  'Soluções de Áudio de Ponta a Ponta para o seu Negócio.'
);

fs.writeFileSync('src/pages/BaresCasasNoturnas.tsx', s);
