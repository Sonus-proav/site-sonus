import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { getProjects, optimizeImageUrl } from './lib/publicStorage.ts'

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
