/**
 * Pôsteres leves (SVG puro, ~2KB cada) dos modelos 3D.
 * - Aparecem instantaneamente (ótimo para LCP) enquanto o WebGL carrega.
 * - São o visual definitivo em aparelhos fracos, onde o 3D nem é baixado.
 */

export function SpeakerPoster() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 300 390" className="h-full max-h-[560px] w-auto" role="img" aria-label="Caixa de som profissional Sonus com woofer e corneta">
        <defs>
          <linearGradient id="sp-cab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c313b" />
            <stop offset="1" stopColor="#14161b" />
          </linearGradient>
          <linearGradient id="sp-baf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a404c" />
            <stop offset="1" stopColor="#262a33" />
          </linearGradient>
          <radialGradient id="sp-cone" cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#2a2f3a" />
            <stop offset="1" stopColor="#0c0d11" />
          </radialGradient>
          <radialGradient id="sp-dome" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#dfe5f0" />
            <stop offset="1" stopColor="#6c7587" />
          </radialGradient>
          <radialGradient id="sp-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="150" cy="378" rx="120" ry="10" fill="url(#sp-glow)" />
        <rect x="26" y="8" width="248" height="364" rx="18" fill="url(#sp-cab)" stroke="#444a58" strokeWidth="1.5" />
        <rect x="38" y="20" width="224" height="340" rx="12" fill="url(#sp-baf)" />
        <rect x="42" y="24" width="216" height="332" rx="10" fill="none" stroke="#3b82f6" strokeOpacity="0.25" strokeWidth="5" />
        <rect x="42" y="24" width="216" height="332" rx="10" fill="none" stroke="#60a5fa" strokeWidth="1.5" />

        {/* Corneta */}
        <rect x="62" y="44" width="176" height="70" rx="5" fill="#0d0f13" stroke="#c9d1de" strokeWidth="3" />
        <polygon points="62,44 238,44 192,108 108,108" fill="#171a21" />
        <rect x="136" y="70" width="28" height="14" rx="2" fill="#e0a93b" />

        {/* Woofer */}
        <circle cx="150" cy="235" r="96" fill="#0a0b0e" stroke="#c9d1de" strokeWidth="3" />
        <g className="sonus-thump">
          <circle cx="150" cy="235" r="88" fill="#0b0c0f" />
          <circle cx="150" cy="235" r="76" fill="url(#sp-cone)" />
          <circle cx="150" cy="235" r="58" fill="none" stroke="#0a0b0e" strokeWidth="2" />
          <circle cx="150" cy="235" r="42" fill="none" stroke="#0a0b0e" strokeWidth="2" />
          <circle cx="150" cy="235" r="26" fill="url(#sp-dome)" />
        </g>

        <text x="150" y="350" textAnchor="middle" fontSize="12" letterSpacing="5" fill="#cfd6e4" fontWeight="700">SONUS</text>
        <circle cx="222" cy="346" r="3.5" fill="#22c55e" />
      </svg>
    </div>
  )
}

export function ShieldPoster() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 230" className="h-full max-h-[320px] w-auto" role="img" aria-label="Selo de 3 anos de garantia Sonus">
        <defs>
          <linearGradient id="sh-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd98a" />
            <stop offset="0.5" stopColor="#f2b84b" />
            <stop offset="1" stopColor="#b9801f" />
          </linearGradient>
          <linearGradient id="sh-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b6fe0" />
            <stop offset="1" stopColor="#1a2f86" />
          </linearGradient>
        </defs>
        <path
          id="sh-path"
          d="M100 12 C130 30 160 32 182 28 L182 104 C182 154 142 194 100 216 C58 194 18 154 18 104 L18 28 C40 32 70 30 100 12 Z"
          fill="url(#sh-gold)"
        />
        <path
          d="M100 24 C126 40 152 42 170 39 L170 104 C170 146 136 181 100 200 C64 181 30 146 30 104 L30 39 C48 42 74 40 100 24 Z"
          fill="url(#sh-blue)"
        />
        <polyline points="66,92 90,116 136,68" fill="none" stroke="#fff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
        <text x="100" y="160" textAnchor="middle" fontSize="23" fontWeight="900" letterSpacing="1" fill="#fff">3 ANOS</text>
      </svg>
    </div>
  )
}
