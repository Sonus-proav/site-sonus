import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { logPageView, updateTimeSpent, getUserGeo, flushPendingLeads } from "@/lib/analytics";
import { whenIdle } from "@/lib/firestoreLazy";
import { trackSpaPageView } from "@/lib/pageTracking";
import { useEngagedSession } from "@/hooks/useEngagedSession";
import { useReducedPerformance } from "@/hooks/useReducedPerformance";

export function AnalyticsTracker() {
  useReducedPerformance();
  useEngagedSession(60); // Inicia o rastreador global de leitura profunda
  const location = useLocation();
  const currentDocId = useRef<string | null>(null);
  const startTime = useRef<number>(0); // definido no efeito de rota (evita chamar Date.now() durante o render)

  // Detecta se é mobile ou desktop de forma simples
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Mobile";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
  };

// ── PageView SPA (GTM dataLayer + Meta Pixel) a CADA troca de rota ──────────────
  // A carga inicial já é registrada pelo index.html; aqui tratamos toda navegação interna
  // (links, botão voltar/avançar), que não gera hard reload.
  const lastTrackedKey = useRef<string | null>(null);
  const lastTrackedUrl = useRef<string>("");
  const routeKey = location.pathname + location.search;

  useEffect(() => {
    if (lastTrackedKey.current === null) {
      // 1ª execução = carga inicial (já contada pelo index.html)
      lastTrackedKey.current = routeKey;
      lastTrackedUrl.current = window.location.href;
      return;
    }
    if (lastTrackedKey.current === routeKey) return; // StrictMode / re-render sem mudança de rota
    lastTrackedKey.current = routeKey;

    if (location.pathname.startsWith("/admin")) return; // painel admin não entra nas métricas

    // Pequeno debounce (150ms): deixa o <Helmet> atualizar document.title e descarta
    // redirecionamentos instantâneos (ex.: NotFoundRedirect) que não são páginas vistas de verdade.
    const referrer = lastTrackedUrl.current;
    const timer = setTimeout(() => {
      trackSpaPageView({ referrer });
      lastTrackedUrl.current = window.location.href;
    }, 150);

    return () => clearTimeout(timer);
  }, [routeKey, location.pathname]);

  // Removemos fetchUserLocation duplicado. Usaremos getUserGeo direto do analytics.ts
  useEffect(() => {
    // 1. Guardião de UTMs (Salva na memória se a URL tiver parâmetros de campanha)
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmCampaign = params.get('utm_campaign');
    const utmMedium = params.get('utm_medium');
    
    if (utmSource || utmCampaign || utmMedium) {
      const utms = {
        source: utmSource || '',
        campaign: utmCampaign || '',
        medium: utmMedium || '',
        date: new Date().toISOString()
      };
      localStorage.setItem('sonus_utms', JSON.stringify(utms));
    }

    // Quando a URL muda, registramos a saída da página ANTERIOR (se houver)
    if (currentDocId.current) {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      updateTimeSpent(currentDocId.current, timeSpent);
    }

    // Reinicia o relógio
    startTime.current = Date.now();
    const currentPath = location.pathname;

    // Registra a NOVA página (dispara de forma assíncrona para não travar a UI)
    const recordView = async () => {
      // Ignora rotas de admin
      if (currentPath.startsWith("/admin")) return;

      const loc = await getUserGeo();
      const docId = await logPageView({
        path: currentPath,
        city: loc.city,
        region: loc.region,
        timestamp: Date.now(),
        device: getDeviceType()
      });
      
      currentDocId.current = docId;
    };

    // Firestore carrega sob demanda: registra a visita em tempo ocioso (fora do caminho crítico)
    // e, já com o Firestore pronto, reenvia leads pendentes de visitas anteriores.
    whenIdle(() => {
      recordView();
      flushPendingLeads();
    });

    // Tratamento caso o usuário feche a aba do navegador
    const handleBeforeUnload = () => {
      if (currentDocId.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        updateTimeSpent(currentDocId.current, timeSpent);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);

  return null; // Este componente não renderiza nada na tela!
}
