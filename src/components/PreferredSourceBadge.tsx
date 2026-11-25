import { memo } from "react"
import { ArrowUpRight } from "lucide-react"

export interface PreferredSourceBadgeProps {
  siteUrl?: string
  variant?: "compact" | "editorial"
  placement?: string
  className?: string
}

/**
 * Normaliza a URL do site para o formato exigido pelo Google Preferred Sources:
 * remove protocolo, prefixo `www.` e quaisquer caminhos/query/hash, mantendo
 * apenas o domínio (ou subdomínio real elegível).
 */
export function extractPreferredSourceDomain(
  siteUrl = "https://www.sonusproaudio.com.br"
): string {
  return siteUrl
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
}

/**
 * Gera o deeplink oficial do Google Search Central para Fontes Preferidas:
 * https://www.google.com/preferences/source?q=<dominio>
 */
export function buildPreferredSourceUrl(
  siteUrl = "https://www.sonusproaudio.com.br"
): string {
  const cleanDomain = extractPreferredSourceDomain(siteUrl)
  return `https://www.google.com/preferences/source?q=${encodeURIComponent(cleanDomain)}`
}

function GoogleGIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-[18px] h-[18px] shrink-0"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.275c0-.85-.075-1.675-.215-2.475H12v4.69h6.45c-.28 1.495-1.125 2.765-2.395 3.615v3.005h3.875c2.265-2.085 3.56-5.16 3.56-8.835Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.955-1.075 7.94-2.91l-3.875-3.005c-1.075.72-2.45 1.15-4.065 1.15-3.125 0-5.77-2.11-6.715-4.945H1.28v3.1C3.255 21.31 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.285 14.29A7.21 7.21 0 0 1 4.91 12c0-.795.135-1.57.375-2.29V6.61H1.28A11.99 11.99 0 0 0 0 12c0 1.935.465 3.765 1.28 5.39l4.005-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.775c1.765 0 3.345.605 4.59 1.795l3.44-3.44C17.95 1.19 15.235 0 12 0 7.31 0 3.255 2.69 1.28 6.61l4.005 3.1c.945-2.835 3.59-4.935 6.715-4.935Z"
      />
    </svg>
  )
}

export const PreferredSourceBadge = memo(function PreferredSourceBadge({
  siteUrl = "https://www.sonusproaudio.com.br",
  variant = "compact",
  placement = "footer",
  className = "",
}: PreferredSourceBadgeProps) {
  const href = buildPreferredSourceUrl(siteUrl)

  const handleClick = () => {
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> }
    win.dataLayer = win.dataLayer || []
    win.dataLayer.push({ event: "google_preferred_source_click", placement })
  }

  const buttonClasses =
    "group inline-flex items-center justify-center gap-2.5 min-h-[44px] sm:min-h-[40px] px-4 py-2 rounded-full bg-[#12141c] hover:bg-[#181b26] border border-white/15 hover:border-cyan-400/45 text-zinc-100 hover:text-white text-xs sm:text-[13px] font-medium tracking-[0.01em] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.09)] transition-[transform,opacity,border-color,background-color] duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 max-w-full min-w-0"

  const badgeLink = (extraClassName = "") => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Adicionar a Sonus Pro Audio às Fontes Preferidas na Pesquisa Google (abre em nova aba)"
      title="Adicionar a Sonus às Fontes Preferidas do Google"
      onClick={handleClick}
      className={`${buttonClasses} ${extraClassName}`.trim()}
    >
      <GoogleGIcon />
      <span className="truncate">Adicionar a Fontes Preferidas</span>
      <ArrowUpRight
        className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none shrink-0"
        aria-hidden="true"
      />
    </a>
  )

  if (variant === "editorial") {
    return (
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-2xl border border-white/[0.08] bg-[#0b0d14]/90 px-4 py-3.5 sm:px-5 sm:py-4 ${className}`.trim()}
      >
        <div className="min-w-0 space-y-1">
          <span className="block text-[10.5px] font-mono uppercase tracking-wider text-cyan-400">
            Pesquisa Google &amp; Modo IA
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Priorize os conteúdos e estudos técnicos da Sonus nas suas buscas.
          </p>
        </div>
        {badgeLink("shrink-0 w-full sm:w-auto")}
      </div>
    )
  }

  return badgeLink(className)
})
