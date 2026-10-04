/**
 * Classifica o aparelho em 3 níveis de desempenho para decidir o quanto de
 * efeito (principalmente WebGL) vale a pena carregar.
 *
 *  - "high":   desktop/notebook decente  -> 3D completo
 *  - "medium": celular ou máquina modesta -> 3D leve (menos pixels, sem extras)
 *  - "low":    aparelho fraco, economia de dados, movimento reduzido ou sem
 *              GPU de verdade (renderização por software) -> nem baixa o 3D,
 *              mostra um pôster leve em SVG.
 */
export type PerfTier = "high" | "medium" | "low"

let cached: PerfTier | null = null

/** WebGL real? `failIfMajorPerformanceCaveat` recusa renderização por software (SwiftShader/LLVMpipe). */
function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl =
      (canvas.getContext("webgl2") as WebGLRenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null)
    if (!gl) return false
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return true
  } catch {
    return false
  }
}

export function getPerfTier(): PerfTier {
  if (cached) return cached
  if (typeof window === "undefined" || typeof navigator === "undefined") return "low"

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }

  const cores = nav.hardwareConcurrency || 4
  const memory = nav.deviceMemory ?? 4 // Safari/Firefox não expõem: assume 4GB
  const effectiveType = nav.connection?.effectiveType ?? ""
  const saveData = !!nav.connection?.saveData || /(^|-)(2g|3g)$/.test(effectiveType)
  const reducedMotion = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(nav.userAgent)
  const forcedLite = document.documentElement.classList.contains("reduced-perf")

  let tier: PerfTier
  
  // Apenas bloqueia WebGL se for mobile E muito fraco, ou sem suporte total a hardware.
  // Desktops parrudos sempre devem pegar high ou medium.
  if (!hasHardwareWebGL()) {
    tier = "low"
  } else if (isMobile && (memory < 3 || cores <= 4 || saveData)) {
    tier = "low"
  } else if (isMobile || reducedMotion || forcedLite || memory < 4 || cores <= 4) {
    tier = "medium"
  } else {
    tier = "high"
  }

  cached = tier
  return tier
}
