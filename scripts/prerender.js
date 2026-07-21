import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rotas que queremos renderizar
const routes = [
  '/',
  '/projetos',
  '/auditorios-e-teatros',
  '/igrejas-e-templos',
  '/salas-reuniao',
  '/qsys',
  '/links',
];

const PORT = 3000;
const app = express();

// Serve a pasta dist finalizada pelo Vite
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Endpoint mock para os projetos carregarem durante o prerender
app.get('/api/projects', (req, res) => {
  const dataPath = path.join(__dirname, '../data/projects.json');
  if (fs.existsSync(dataPath)) {
    res.sendFile(dataPath);
  } else {
    res.json([]);
  }
});

// Fallback para SPA - qualquer rota joga para o index.html original
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

async function prerender() {
  console.log('Iniciando servidor estático local para prerenderização...');
  const server = app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const route of routes) {
      console.log(`Prerenderizando a rota: ${route}...`);
      const page = await browser.newPage();
      
      // Bloqueia requisições desnecessárias (como fontes e estilos externos pesados ou trackers) para ser mais rápido
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const url = req.url();
        if (url.includes('google-analytics') || url.includes('facebook') || url.includes('googletagmanager')) {
          req.abort();
        } else {
          req.continue();
        }
      });

      // Acessa a página e espera a rede ficar inativa (indicando que as chamadas do Firebase ou imagens carregaram)
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Espera extra garantida para animações de Skeleton desaparecerem (se houver)
      await new Promise(r => setTimeout(r, 1000));

      const html = await page.content();
      
      // Salva o HTML
      // Se for a rota "/", salvar no index.html
      // Se for "/projetos", salvar na pasta /projetos/index.html
      const isHome = route === '/';
      let routePath = path.join(distPath, route);
      
      if (!isHome && !fs.existsSync(routePath)) {
        fs.mkdirSync(routePath, { recursive: true });
      }

      const filePath = isHome ? path.join(distPath, 'index.html') : path.join(routePath, 'index.html');
      
      // Remove scripts extras do puppeteer caso injete, mas page.content() geralmente é o HTML real
      fs.writeFileSync(filePath, html);
      console.log(`✅ Salvo: ${filePath}`);
      
      await page.close();
    }

    await browser.close();
    server.close();
    console.log('🎉 Prerenderização concluída com sucesso!');
  });
}

prerender().catch(err => {
  console.error('Erro na prerenderização:', err);
  process.exit(1);
});
