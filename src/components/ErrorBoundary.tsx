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
    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 flex flex-col items-center justify-center p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Oops! Algo deu errado.</h1>
          <p className="mb-4">{this.state.error && this.state.error.toString()}</p>
          <pre className="bg-black/50 p-4 rounded overflow-auto w-full max-w-4xl text-sm">
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            className="mt-8 px-6 py-2 bg-white text-red-900 rounded font-bold"
            onClick={() => window.location.reload()}
          >
            Recarregar a Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
