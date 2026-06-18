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
    <section className="bg-gradient-to-b from-[#020202] to-[#0a0a0a] py-16 md:py-24 border-y border-white/[0.03] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 bg-white/[0.02] p-5 rounded-full border border-white/[0.05] shadow-inner">
            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-zinc-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-5">
            {title || defaultTitle}
          </h3>
          <p className="text-zinc-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-balance">
            {description || defaultDesc}
          </p>
        </FadeIn>
      </div>
    </section>
  )

  const renderChurch = () => (
    <section className="bg-[#050505] py-16 md:py-20 border-y border-amber-900/20 relative overflow-hidden">
      {/* Warm Stage Light Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
          <div className="shrink-0 relative">
            <ShieldCheck className="w-14 h-14 md:w-16 md:h-16 text-amber-500 relative z-10" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-amber-50 mb-3 font-serif">
              {title || defaultTitle}
            </h3>
            <p className="text-amber-100/60 max-w-3xl text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderAuditorium = () => (
    <section className="bg-[#030303] py-16 md:py-20 border-t border-red-900/20 relative overflow-hidden">
      {/* Dramatic Red Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left bg-zinc-950/50 p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="bg-red-950/20 p-5 rounded-full border border-red-900/30 shrink-0">
            <Target className="w-12 h-12 md:w-14 md:h-14 text-red-500" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              {title || defaultTitle}
            </h3>
            <p className="text-zinc-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-balance">
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
