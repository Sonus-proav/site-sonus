const { exec } = require('child_process');
const puppeteer = require('puppeteer');

(async () => {
  const server = exec('npx serve dist -p 3000');
  await new Promise(r => setTimeout(r, 3000));

  const b = await puppeteer.launch({headless: 'new'});
  const p = await b.newPage();
  p.on('pageerror', e => console.log('REACT_CRASH:', e.message));
  p.on('console', m => {
    if (m.type() === 'error') console.log('REACT_ERROR:', m.text());
  });

  await p.goto('http://localhost:3000', {waitUntil: 'networkidle0', timeout: 15000});
  const html = await p.evaluate(() => document.body.innerHTML);
  console.log("Prod HTML length:", html.length);
  
  await p.goto('http://localhost:3000/projetos', {waitUntil: 'networkidle0', timeout: 15000});
  const html2 = await p.evaluate(() => document.body.innerHTML);
  console.log("Prod Projetos HTML length:", html2.length);

  await b.close();
  server.kill();
  process.exit(0);
})();
