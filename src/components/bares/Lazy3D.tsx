import { Component, Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type LazyExoticComponent, type ReactNode } from "react"
import { getPerfTier, type PerfTier } from "@/lib/devicePerf"
import { useInView } from "./useInView"

class WebGLErrorBoundary extends Component<
  { fallback?: ReactNode; onError?: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}

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
  const manualOnly = tier === "medium" && !eager

  useEffect(() => {
    if (tier === "low" || manualOnly || !near || mount) return
    let cancelled = false
    const delay = eager ? 800 : 400
    const timer = setTimeout(() => {
      if (!cancelled) setMount(true)
    }, delay)
    
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [tier, manualOnly, near, mount, eager])

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <div aria-hidden={ready} className={`absolute inset-0 transition-opacity duration-700 z-10 ${ready ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {poster}
        {manualOnly && !mount && (
          <button
            type="button"
            onClick={() => setMount(true)}
            className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black border border-white/20 text-[10px] font-mono uppercase tracking-wider text-zinc-200 transition-colors cursor-pointer"
          >
            Ativar 3D
          </button>
        )}
      </div>
      {mount && (
        <div className={`absolute inset-0 transition-opacity duration-700 z-0 ${ready ? "opacity-100" : "opacity-0"}`}>
          <WebGLErrorBoundary fallback={null} onError={() => setReady(false)}>
            <Suspense fallback={null}>
              <Component tier={tier} onReady={() => setReady(true)} />
            </Suspense>
          </WebGLErrorBoundary>
        </div>
      )}
    </div>
  )
}
