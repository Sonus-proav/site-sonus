import fs from 'fs';

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

if (!content.includes('path: "/solucoes"')) {
  content = content.replace(
    '{ name: "Início", path: "/" },',
    '{ name: "Início", path: "/" },\n    { name: "Especialidades", path: "/solucoes" },'
  );
  // Same for the other variants if there are encoding issues with "Início"
  content = content.replace(
    '{ name: "In\ufffdcio", path: "/" },',
    '{ name: "In\ufffdcio", path: "/" },\n    { name: "Especialidades", path: "/solucoes" },'
  );

  fs.writeFileSync('src/components/layout/Navbar.tsx', content, 'utf8');
}
console.log('Navbar updated');
