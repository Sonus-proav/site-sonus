import path from "path"
import fs from "fs"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const DATA_FILE = path.resolve(__dirname, 'data/projects.json');

const localDatabasePlugin = (): Plugin => ({
  name: 'local-database-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/projects') {
        
        // Garante que a pasta e o arquivo existam
        if (!fs.existsSync(path.dirname(DATA_FILE))) {
          fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
        }
        
        if (!fs.existsSync(DATA_FILE)) {
          // Os 6 projetos padrões para inicializar o banco
          const defaultData = [
            { id: 1, title: "Auditório da Cresol", category: "auditórios", image: "https://images.unsplash.com/photo-1507676184212-d0330a151f93?q=80&w=2069&auto=format&fit=crop", seoAlt: "Projeto de sonorização corporativa" },
            { id: 2, title: "Sala de video conferência | Cresol", category: "corporativos", image: "/cresol.jpg" },
            { id: 3, title: "Igreja Matriz de Xanxerê - SC", category: "igrejas", image: "/xanxere.jpg" },
            { id: 4, title: "Auditório Cesul", category: "auditórios", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop" },
            { id: 5, title: "Centro Admin | Cresol Dois Vizinhos", category: "corporativos", image: "/cresol-dv.png" },
            { id: 6, title: "Matriz de São Miguel do Oeste", category: "igrejas", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=2070&auto=format&fit=crop" }
          ];
          fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
        }

        // LER OS DADOS (GET)
        if (req.method === 'GET') {
          const data = fs.readFileSync(DATA_FILE, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
          return;
        }

        // SALVAR OS DADOS (POST)
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString() });
          req.on('end', () => {
            fs.writeFileSync(DATA_FILE, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localDatabasePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) {
            return 'firebase';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-helmet-async')) {
            return 'vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react')) {
            return 'ui';
          }
        }
      }
    }
  }
})
