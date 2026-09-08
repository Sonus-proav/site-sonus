import { useEffect } from "react";

/**
 * Hook que detecta hardware de baixa performance e adiciona a classe 'reduced-perf' ao <html>.
 * 
 * Critérios de detecção:
 * - CPU com 4 ou menos cores (navigator.hardwareConcurrency)
 * - RAM menor que 4GB (navigator.deviceMemory)
 * - Preferência do sistema por menos movimento (prefers-reduced-motion)
 * - Navegador não-Chromium (Firefox/Safari renderizam backdrop-blur via CPU)
 * 
 * Quando ativado, as regras CSS em index.css desabilitam efeitos pesados automaticamente.
 */
export function useReducedPerformance() {
  useEffect(() => {
    const html = document.documentElement;

    // 1. O usuário pediu explicitamente menos animações
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. CPU fraca (4 cores ou menos = workstation antiga, Celeron, Pentium, i3 antigo)
    const weakCPU = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    // 3. Pouca RAM (< 4GB — comum em máquinas corporativas)
    const lowMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false;

    // 4. Navegador sem aceleração de backdrop-blur eficiente (não-Chromium)
    // Antigamente verificava isso, mas agora dependemos do teste de GPU.

    // 5. Benchmark rápido: mede o tempo de um repaint com blur
    let slowGPU = false;
    try {
      const testEl = document.createElement("div");
      testEl.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:200px;height:200px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(0,0,0,0.5);";
      document.body.appendChild(testEl);
      const start = performance.now();
      // Força o navegador a computar o estilo e layout
      void testEl.offsetHeight;
      void getComputedStyle(testEl).backdropFilter;
      const elapsed = performance.now() - start;
      document.body.removeChild(testEl);
      // Se demorou mais de 50ms só pra computar o estilo, a GPU é fraca
      slowGPU = elapsed > 50;
    } catch (e) {
      // Ignora se falhar
    }

    // Decisão final:
    // Só ativa o modo leve se:
    // 1. O usuário pediu menos animação explicitamente no SO
    // 2. A GPU falhou grosseiramente no teste de tempo (>100ms em vez de 50ms)
    // 3. A máquina tem menos de 4GB de RAM (certeza absoluta que é fraca)
    // 4. Se a CPU for muito fraca (< 4 cores)
    
    if (prefersReducedMotion || (slowGPU && weakCPU) || lowMemory || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)) {
      html.classList.add("reduced-perf");
    }
  }, []);
}
