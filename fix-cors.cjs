const fs = require('fs');
let content = fs.readFileSync('src/components/admin/DeployButton.tsx', 'utf8');

const target = `    try {
      const response = await fetch(webhookUrl, { method: "POST" })
      if (!response.ok) throw new Error("Falha no disparo")
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {`;

const replacement = `    try {
      // Usando mode: 'no-cors' porque a API da Cloudflare não envia cabeçalhos CORS para o navegador.
      // Isso envia a requisição POST com sucesso, mas o navegador bloqueia a leitura da resposta (opaca).
      await fetch(webhookUrl, { method: "POST", mode: "no-cors" })
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/admin/DeployButton.tsx', content, 'utf8');
