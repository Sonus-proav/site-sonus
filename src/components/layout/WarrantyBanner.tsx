import { ShieldCheck } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"

interface WarrantyBannerProps {
  title?: string
  description?: string
}

export function WarrantyBanner({ title, description }: WarrantyBannerProps) {
  const defaultTitle = "3 Anos de Garantia de Instalação"
  const defaultDesc = "Confiamos plenamente na qualidade do nosso serviço. Todos os projetos executados pela Sonus Pro AV contam com 3 anos de garantia integral sobre qualquer defeito de infraestrutura ou instalação. O seu investimento está 100% seguro."
  
  return (
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
}
