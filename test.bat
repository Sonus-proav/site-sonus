@echo off
start /B npm run dev
ping 127.0.0.1 -n 5 > nul
call npm install --no-save puppeteer
node -e "const puppeteer = require('puppeteer'); (async () => { try { const b = await puppeteer.launch({headless: 'new'}); const p = await b.newPage(); p.on('pageerror', e => console.log('REACT_ERROR:', e.message)); p.on('console', m => { if(m.type() === 'error') console.log('CONSOLE_ERROR:', m.text()) }); await p.goto('http://localhost:5173/projetos', {waitUntil: 'networkidle0'}); await new Promise(r => setTimeout(r, 2000)); await b.close(); process.exit(0); } catch (err) { console.error('SCRIPT_ERROR:', err.message); process.exit(1); } })();"
