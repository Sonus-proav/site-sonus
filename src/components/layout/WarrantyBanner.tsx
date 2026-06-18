import { ShieldCheck, Cpu, Target } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"

interface WarrantyBannerProps {
  title?: string
  description?: string
  variant?: 'qsys' | 'corporate' | 'church' | 'auditorium' | 'default'
}

export function WarrantyBanner({ title, description, variant = 'default' }: WarrantyBannerProps) {
  const defaultTitle = "3 Anos de Garantia de Instalação"
  const defaultDesc = "Confiamos plenamente na qualidade do nosso serviço. Todos os projetos executados pela Sonus Pro AV contam com 3 anos de garantia integral sobre qualquer defeito de infraestrutura ou instalação. O seu investimento está 100% seguro."
  
  const renderQsys = () => (
    <section className="py-12 md:py-16 border-y border-cyan-500/10 relative overflow-hidden bg-[#020617]">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-cyan-900/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 shrink-0 relative shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Cpu className="w-12 h-12 md:w-14 md:h-14 text-cyan-400 relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 mb-3 uppercase">
              {title || defaultTitle}
            </h3>
            <p className="text-cyan-100/60 max-w-3xl text-lg font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderCorporate = () => (
    <section className="bg-[#050505] py-16 md:py-24 border-y border-white/[0.08] relative overflow-hidden group">
      {/* Moving scanner line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent -translate-y-full group-hover:translate-y-full duration-[3s] ease-in-out transition-transform" />
      {/* Subtle metallic radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-zinc-300/10 blur-2xl rounded-full" />
            <div className="bg-gradient-to-b from-zinc-800 to-black p-5 rounded-full border border-zinc-600/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative z-10 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-zinc-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1} />
            </div>
          </div>
          <h3 className="text-2xl md:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-5 uppercase">
            {title || defaultTitle}
          </h3>
          <p className="text-zinc-400/80 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-balance">
            {description || defaultDesc}
          </p>
        </FadeIn>
      </div>
    </section>
  )

  const renderChurch = () => (
    <section className="bg-[#030201] py-16 md:py-24 border-y border-amber-900/40 relative overflow-hidden">
      {/* Volumetric Light Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[conic-gradient(from_180deg_at_50%_-20%,rgba(245,158,11,0.15)_0deg,transparent_40deg,transparent_320deg,rgba(245,158,11,0.15)_360deg)] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.08)_0%,transparent_60%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 text-center md:text-left">
          <div className="shrink-0 relative group cursor-default">
            {/* Pulsing divine halo */}
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-3xl group-hover:bg-amber-500/50 transition-colors duration-1000 animate-pulse" />
            <div className="relative z-10 bg-gradient-to-b from-amber-950/80 to-black p-6 rounded-full border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <ShieldCheck className="w-14 h-14 md:w-16 md:h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 mb-4 font-serif">
              {title || defaultTitle}
            </h3>
            <p className="text-amber-100/70 max-w-3xl text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderAuditorium = () => (
    <section className="bg-[#020000] py-16 md:py-24 border-y border-red-900/30 relative overflow-hidden group">
      {/* Cinematic Spotlights */}
      <div className="absolute top-0 left-0 w-[500px] h-[800px] bg-[conic-gradient(from_140deg_at_0%_0%,rgba(220,38,38,0.1)_0deg,transparent_30deg)] pointer-events-none transform origin-top-left group-hover:rotate-6 transition-transform duration-[5s] ease-in-out mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[500px] h-[800px] bg-[conic-gradient(from_220deg_at_100%_0%,transparent_330deg,rgba(153,27,27,0.1)_360deg)] pointer-events-none transform origin-top-right group-hover:-rotate-6 transition-transform duration-[5s] ease-in-out mix-blend-screen" />
      
      {/* Fog/Noise overlay texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left bg-gradient-to-br from-red-950/40 to-black p-8 md:p-14 rounded-3xl border border-red-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="relative shrink-0 perspective-1000">
            {/* Isometric glowing neon box */}
            <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full" />
            <div className="bg-red-950/80 p-6 rounded-2xl border-2 border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.4),inset_0_0_20px_rgba(220,38,38,0.4)] transform rotate-12 hover:rotate-0 transition-transform duration-500 flex items-center justify-center relative z-10">
              <Target className="w-12 h-12 md:w-16 md:h-16 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,1)]" strokeWidth={1.5} />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-red-200 mb-5 uppercase drop-shadow-md">
              {title || defaultTitle}
            </h3>
            <p className="text-red-100/60 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderDefault = () => (
    <section className="bg-black/40 py-10 md:py-16 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="bg-primary/10 p-5 rounded-full border border-primary/20 shrink-0 relative shadow-[0_0_30px_rgba(41,128,185,0.2)]">
            <ShieldCheck className="w-12 h-12 md:w-14 md:h-14 text-primary relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
              {title || defaultTitle}
            </h3>
            <p className="text-zinc-400 max-w-3xl text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  if (variant === 'qsys') return renderQsys()
  if (variant === 'corporate') return renderCorporate()
  if (variant === 'church') return renderChurch()
  if (variant === 'auditorium') return renderAuditorium()
  return renderDefault()
}
