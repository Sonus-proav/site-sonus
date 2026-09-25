import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/CARLOS - PL/g, 'CARLOS - PRV');
content = content.replace(/party: "PT"/g, 'party: "PMU"');
content = content.replace(/party: "PL"/g, 'party: "PFC"');

fs.writeFileSync(path, content, 'utf8');
console.log('Partidos substituídos por siglas fictícias com sucesso!');
