import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { getProjects, optimizeImageUrl } from './lib/publicStorage.ts'

// Auto-recarregar a página caso haja erro de cache do Vite (ex: após atualizarmos o servidor)
window.addEventListener('vite:preloadError', () => {
  const hasReloaded = sessionStorage.getItem('vite_reloaded');
  if (!hasReloaded) {
    sessionStorage.setItem('vite_reloaded', 'true');
    window.location.reload();
  }
});

// Inicia o fetch paralelo ao boot do React para zerar o delay de rede
getProjects().then(projects => {
  // Preload agressivo da imagem LCP (First Project) antes mesmo do React renderizar a tela!
  if (projects && projects.length > 0 && window.location.pathname === "/projetos") {
    const firstImage = optimizeImageUrl(projects[0].image, 800);
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = firstImage;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }
}).catch(() => {});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
