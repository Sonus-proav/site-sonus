import { Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type LazyExoticComponent, type ReactNode } from "react"
import { getPerfTier, type PerfTier } from "@/lib/devicePerf"
import { useInView } from "./useInView"

export interface Lazy3DProps {
  tier: PerfTier
  onReady: () => void
}

interface Props {
  Component: LazyExoticComponent<ComponentType<Lazy3DProps>>
  /** Visual leve mostrado na hora (e como visual final em aparelhos fracos). */
  poster: ReactNode
  /** true = acima da dobra: carrega assim que a página terminar de carregar e o navegador estiver ocioso. */
  eager?: boolean
}

/** Executa quando a página terminou de carregar E o navegador está ocioso (não compete com LCP/interação). */
function whenIdle(cb: () => void, timeout: number) {
  const run = () => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout })
    else setTimeout(cb, 200)
  }
  if (document.readyState === "complete") run()
  else window.addEventListener("load", run, { once: true })
}

/**
 * Mostra o pôster imediatamente e só carrega o WebGL (chunk de ~1MB) se:
 *  1) o aparelho aguenta (tier != "low"),
 *  2) o elemento está perto da tela,
 *  3) o navegador está ocioso.
 * Quando o 3D renderiza o primeiro frame, faz crossfade pôster -> 3D.
 */
export function Lazy3D({ Component, poster, eager = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const near = useInView(wrapRef, eager ? "0px" : "500px")
  const tier = useMemo(() => getPerfTier(), [])
  const [mount, setMount] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (tier === "low" || !near || mount) return
    let cancelled = false
    whenIdle(() => {
      if (!cancelled) setMount(true)
    }, eager ? 1500 : 400)
    return () => {
      cancelled = true
    }
  }, [tier, near, mount, eager])

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <div aria-hidden={ready} className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        {poster}
      </div>
      {mount && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Suspense fallback={null}>
            <Component tier={tier} onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
