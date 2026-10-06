import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rotas estáticas
const baseRoutes = [
  '/',
  '/projetos',
  '/auditorios-e-teatros',
  '/plenarios-e-camaras',
  '/igrejas-e-templos',
  '/salas-reuniao',
  '/bares-e-casas-noturnas',
  '/solucoes',
  '/qsys',
  '/links',
];

// Lê os projetos do JSON e adiciona à lista de rotas
let projectRoutes = [];
try {
  const projectsData = fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf-8');
  const projects = JSON.parse(projectsData);
  projectRoutes = projects.map(p => `/projetos/${p.id}`);
  console.log(`[Sitemap] Foram encontrados ${projectRoutes.length} projetos dinâmicos.`);
} catch (e) {
  console.error('[Erro] Falha ao ler data/projects.json', e);
}

const routes = [...baseRoutes, ...projectRoutes];

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

// Função para gerar o sitemap.xml
function generateSitemap(allRoutes) {
  const baseUrl = 'https://sonusproaudio.com.br';
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of allRoutes) {
    let priority = '0.8';
    let changefreq = 'monthly';
    
    if (route === '/') { 
      priority = '1.0'; 
      changefreq = 'weekly'; 
    } else if (route.startsWith('/projetos/')) { 
      priority = '0.7'; 
      changefreq = 'monthly'; 
    } else if (['/bares-e-casas-noturnas', '/igrejas-e-templos', '/auditorios-e-teatros', '/salas-reuniao', '/plenarios-e-camaras'].includes(route)) {
      priority = '0.9';
    } else if (route === '/links') {
      priority = '0.5';
    }

    sitemapXml += `
  <url>
    <loc>${baseUrl}${route === '/' ? '' : route}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }
  sitemapXml += `\n</urlset>`;
  
  // Salva no dist para deploy e no public para backup no repositório
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapXml);
  console.log('[Sitemap] sitemap.xml gerado com sucesso!');
}

async function prerender() {
  console.log('Iniciando servidor estático local para prerenderização...');
  const server = app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    
    // Backup original index.html as 404.html before it gets overwritten by '/' route
    const originalIndex = path.join(distPath, 'index.html');
    const fallback404 = path.join(distPath, '404.html');
    if (fs.existsSync(originalIndex)) {
      fs.copyFileSync(originalIndex, fallback404);
      console.log('✅ Salvo fallback 404.html');
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const route of routes) {
      console.log(`Prerenderizando a rota: ${route}...`);
      const page = await browser.newPage();
      
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const url = req.url();
        if (url.includes('google-analytics') || url.includes('facebook') || url.includes('googletagmanager')) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1000));
      const html = await page.content();
      
      const isHome = route === '/';
      let routePath = path.join(distPath, route);
      
      if (!isHome && !fs.existsSync(routePath)) {
        fs.mkdirSync(routePath, { recursive: true });
      }

      const filePath = isHome ? path.join(distPath, 'index.html') : path.join(routePath, 'index.html');
      
      fs.writeFileSync(filePath, html);
      console.log(`✅ Salvo: ${filePath}`);
      
      await page.close();
    }

    await browser.close();
    server.close();
    
    // Gera o Sitemap com todas as rotas processadas
    generateSitemap(routes);
    
    console.log('🎉 Prerenderização concluída com sucesso!');
  });
}

prerender().catch(err => {
  console.error('Erro na prerenderização:', err);
  process.exit(1);
});
