const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({headless: 'new'});
  const p = await b.newPage();
  await p.goto('http://localhost:5173/projetos', {waitUntil: 'networkidle0'});
  await new Promise(r => setTimeout(r, 2000));
  const html = await p.evaluate(() => document.body.innerHTML);
  console.log("HTML length:", html.length);
  if (html.length < 500) console.log(html);
  await b.close();
  process.exit(0);
})();
