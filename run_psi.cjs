const fs = require('fs');

const API_KEY = process.env.PSI_API_KEY || ''; // A chave é opcional, mas sem ela há limite de cota. Se não tiver, vai sem.
const BASE_URL = 'https://sonusproaudio.com.br';
const PAGES = [
  '/',
  '/projetos',
  '/qsys',
  '/salas-reuniao',
  '/auditorios-e-teatros',
  '/igrejas-e-templos'
];

async function runTest(url, strategy) {
  const apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}${API_KEY ? `&key=${API_KEY}` : ''}`;
  
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    
    if (data.error) {
      console.error(`Erro em ${url} (${strategy}):`, data.error.message);
      return null;
    }

    const lighthouse = data.lighthouseResult;
    const categories = lighthouse.categories;
    const metrics = lighthouse.audits;

    return {
      url,
      strategy,
      score: Math.round(categories.performance.score * 100),
      lcp: metrics['largest-contentful-paint'].displayValue,
      fcp: metrics['first-contentful-paint'].displayValue,
      cls: metrics['cumulative-layout-shift'].displayValue,
      tbt: metrics['total-blocking-time'].displayValue,
      speedIndex: metrics['speed-index'].displayValue,
    };
  } catch (error) {
    console.error(`Falha ao buscar ${url} (${strategy}):`, error);
    return null;
  }
}

async function main() {
  console.log('Iniciando Testes de PageSpeed (Pode demorar vários minutos)...\n');
  const results = [];

  for (const page of PAGES) {
    const fullUrl = BASE_URL + page;
    console.log(`Testando: ${fullUrl}`);
    
    console.log(` - Mobile...`);
    const mobileResult = await runTest(fullUrl, 'MOBILE');
    if (mobileResult) results.push(mobileResult);
    
    // Pequeno delay para evitar Rate Limiting da API gratuita
    await new Promise(r => setTimeout(r, 2000));
    
    console.log(` - Desktop...`);
    const desktopResult = await runTest(fullUrl, 'DESKTOP');
    if (desktopResult) results.push(desktopResult);
    
    await new Promise(r => setTimeout(r, 2000));
  }

  const output = JSON.stringify(results, null, 2);
  fs.writeFileSync('psi_results.json', output);
  console.log('\nTestes concluídos. Resultados salvos em psi_results.json');
}

main();
