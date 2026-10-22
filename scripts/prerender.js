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

const PORT = 3000;
const app = express();
const distPath = path.join(__dirname, '../dist');
const cleanTemplatePath = path.join(distPath, 'clean_template.html');

// Serve arquivos estáticos da pasta dist
app.use(express.static(distPath));

// Fallback SPA: SEMPRE serve o template original limpo gerado pelo Vite,
// NUNCA o index.html sobrescrito com tags de outras páginas!
app.use((req, res) => {
  if (fs.existsSync(cleanTemplatePath)) {
    return res.sendFile(cleanTemplatePath);
  }
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
  
  // Salva no dist para deploy e no public para backup
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapXml);
  console.log('[Sitemap] sitemap.xml gerado com sucesso!');
}

async function prerender() {
  console.log('Iniciando build de rotas dinâmicas a partir do Firebase...');
  
  // 1. Cria uma cópia limpa do template original antes de qualquer renderização
  const originalIndex = path.join(distPath, 'index.html');
  const fallback404 = path.join(distPath, '404.html');
  
  if (fs.existsSync(originalIndex)) {
    fs.copyFileSync(originalIndex, cleanTemplatePath);
    fs.copyFileSync(originalIndex, fallback404);
    console.log('✅ Salvo template limpo e fallback 404.html');
  } else {
    console.error('❌ dist/index.html não encontrado!');
    process.exit(1);
  }

  // Busca os projetos diretamente da base de dados oficial (Firebase REST API)
  let projectRoutes = [];
  try {
    const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
    if (res.ok) {
      const json = await res.json();
      if (json.documents && json.documents.length > 0) {
        const visibleProjects = json.documents.filter(doc => {
          return !(doc.fields.isHidden?.booleanValue === true);
        });
        projectRoutes = visibleProjects.map(doc => {
          const id = parseInt(doc.fields.id?.integerValue || doc.fields.id?.stringValue || "0");
          return `/projetos/${id}`;
        });
        console.log(`[Banco de Dados] Encontrados ${projectRoutes.length} projetos visíveis.`);
      }
    } else {
      console.error('[Erro Firebase] Resposta não OK:', res.status);
    }
  } catch (e) {
    console.error('[Erro Firebase] Falha ao buscar projetos na API:', e);
  }

  const routes = [...baseRoutes, ...projectRoutes];

  console.log('Iniciando servidor estático local para prerenderização...');
  const server = app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-zygote'
      ]
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

      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle2', timeout: 15000 });
      } catch (err) {
        console.warn(`[Prerender] Aviso ao carregar ${route} (continuando):`, err.message);
      }
      await new Promise(r => setTimeout(r, 600));
      const html = await page.content();
      
      const isHome = route === '/';
      
      if (isHome) {
        // Grava a Home diretamente em dist/index.html
        fs.writeFileSync(path.join(distPath, 'index.html'), html);
        console.log(`✅ Salvo: ${path.join(distPath, 'index.html')}`);
      } else {
        // Grava tanto em /rota/index.html quanto em /rota.html
        // Isso resolve completamente o conflito de 308 redirect no Cloudflare Pages!
        let routeDir = path.join(distPath, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        const dirIndexFile = path.join(routeDir, 'index.html');
        fs.writeFileSync(dirIndexFile, html);

        const cleanRoute = route.replace(/^\//, '');
        const directHtmlFile = path.join(distPath, `${cleanRoute}.html`);
        const parentDir = path.dirname(directHtmlFile);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        fs.writeFileSync(directHtmlFile, html);
        console.log(`✅ Salvo: ${dirIndexFile} e ${directHtmlFile}`);
      }
      
      await page.close();
    }

    await browser.close();
    server.close();
    
    // Remove o clean_template temporário
    if (fs.existsSync(cleanTemplatePath)) {
      fs.unlinkSync(cleanTemplatePath);
    }
    
    generateSitemap(routes);
    
    console.log('🎉 Prerenderização concluída com sucesso!');
  });
}

prerender().catch(err => {
  console.error('Erro na prerenderização:', err);
  process.exit(1);
});
