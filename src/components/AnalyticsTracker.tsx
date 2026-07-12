import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { logPageView, updateTimeSpent } from "@/lib/analytics";
import { useEngagedSession } from "@/hooks/useEngagedSession";

// Variável global fora do componente para manter o cache de localização
// e evitar bater na API toda hora que o usuário trocar de página (SPA)
let cachedLocation: { city: string, region: string } | null = null;

export function AnalyticsTracker() {
  useEngagedSession(60); // Inicia o rastreador global de leitura profunda
  const location = useLocation();
  const currentDocId = useRef<string | null>(null);
  const startTime = useRef<number>(Date.now());

  // Detecta se é mobile ou desktop de forma simples
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Mobile";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
  };

  const fetchUserLocation = async () => {
    if (cachedLocation) return cachedLocation;
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      cachedLocation = {
        city: data.city || "Desconhecida",
        region: data.region || "Desconhecida"
      };
      return cachedLocation;
    } catch (error) {
      console.warn("Analytics: Falha ao obter localização", error);
      return { city: "Desconhecida", region: "Desconhecida" };
    }
  };

  useEffect(() => {
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

      const loc = await fetchUserLocation();
      const docId = await logPageView({
        path: currentPath,
        city: loc.city,
        region: loc.region,
        timestamp: Date.now(),
        device: getDeviceType()
      });
      
      currentDocId.current = docId;
    };

    recordView();

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
