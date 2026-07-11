const urls = [
  'https://sonusproaudio.com.br/',
  'https://sonusproaudio.com.br/projetos',
  'https://sonusproaudio.com.br/auditorios-e-teatros',
  'https://sonusproaudio.com.br/igrejas-e-templos',
  'https://sonusproaudio.com.br/links'
];
const strategies = ['mobile', 'desktop'];

async function run() {
  console.log('Iniciando auditoria no PageSpeed API...');
  for (const url of urls) {
    for (const strategy of strategies) {
      try {
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance`;
        const res = await fetch(apiUrl);
        if (res.status === 429) {
          console.log(`[429] Rate Limit atingido para ${url} (${strategy})`);
          // Espera 10 segundos para tentar burlar o limite
          await new Promise(r => setTimeout(r, 10000));
          continue;
        }
        const data = await res.json();
        const score = data.lighthouseResult?.categories?.performance?.score * 100;
        console.log(`[${strategy.toUpperCase()}] ${url.padEnd(50)} -> Score: ${score || 'N/A'}`);
      } catch (err) {
        console.error(`Erro em ${url} (${strategy}):`, err.message);
      }
    }
  }
}
run();
