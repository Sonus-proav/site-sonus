import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('import("./pages/Solucoes")')) {
  content = content.replace(
    'const LinksPage = React.lazy(() => import("./pages/LinksPage").then(module => ({ default: module.LinksPage })))',
    'const LinksPage = React.lazy(() => import("./pages/LinksPage").then(module => ({ default: module.LinksPage })))\nconst Solucoes = React.lazy(() => import("./pages/Solucoes").then(module => ({ default: module.Solucoes })))'
  );

  content = content.replace(
    '<Route path="igrejas-e-templos" element={<IgrejasTemplos />} />',
    '<Route path="igrejas-e-templos" element={<IgrejasTemplos />} />\n            <Route path="solucoes" element={<Solucoes />} />'
  );

  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
console.log('App.tsx updated');
