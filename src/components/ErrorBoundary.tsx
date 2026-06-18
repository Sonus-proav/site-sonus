import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    
    const isChunkError = error.message && (
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Importing a module script failed') ||
      error.name === 'ChunkLoadError'
    )

    if (isChunkError) {
      const hasReloaded = sessionStorage.getItem('chunk-error-reloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk-error-reloaded', 'true');
        window.location.reload();
        return;
      }
    }

    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-black flex flex-col items-center justify-center p-8 text-black dark:text-white transition-colors duration-300">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3">Ops! Algo deu errado.</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-sm">
              Houve um problema ao carregar esta página. Tente recarregar.
            </p>
            <button
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
              onClick={() => window.location.reload()}
            >
              Recarregar a Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
