/**
 * PageViews de navegação SPA (React Router) para Google Tag Manager (dataLayer) e Meta Pixel (fbq).
 *
 * - A carga INICIAL é registrada pelo próprio index.html (gtm.js + fbq PageView).
 * - Cada TROCA DE ROTA chama `trackSpaPageView`, que:
 *     1. empurra `{ event: 'page_view', ... }` no dataLayer;
 *     2. enfileira `fbq('track', 'PageView')` (o pixel tem o rastreio automático de pushState desativado
 *        no index.html, então este é o único disparo — sem duplicidade e sem perder rotas);
 *     3. garante que os scripts de terceiros (carregados de forma diferida) comecem a baixar agora.
 *   Como `dataLayer` e `fbq` são filas criadas no index.html, nada se perde mesmo que gtm.js/fbevents.js
 *   ainda não tenham terminado de carregar: ambos reprocessam a fila na ordem ao ficarem prontos.
 */
interface TrackingWindow extends Window {
  dataLayer?: Record<string, unknown>[];
  fbq?: (...args: unknown[]) => void;
  __sonusLoadThirdParty?: () => void;
}

export function trackSpaPageView(opts: { referrer?: string } = {}) {
  try {
    const w = window as TrackingWindow;

    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "page_view",
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
      page_referrer: opts.referrer || document.referrer || "",
    });

    if (typeof w.fbq === "function") {
      w.fbq("track", "PageView");
    }

    if (typeof w.__sonusLoadThirdParty === "function") {
      w.__sonusLoadThirdParty();
    }
  } catch (err) {
    console.warn("Falha ao registrar pageview SPA:", err);
  }
}
