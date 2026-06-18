import { ShieldCheck } from "lucide-react"
import { FadeIn } from "@/components/ui/FadeIn"

export function WarrantyBanner() {
  return (
    <section className="bg-black/40 py-12 md:py-16 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="bg-primary/10 p-5 rounded-full border border-primary/20 shrink-0 relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <ShieldCheck className="w-12 h-12 md:w-14 md:h-14 text-primary relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
              3 Anos de Garantia de Instalação
            </h3>
            <p className="text-zinc-400 max-w-3xl text-lg md:text-xl font-light leading-relaxed text-balance">
              Confiamos plenamente na qualidade da nossa engenharia. Todos os projetos executados pela Sonus Pro AV contam com <strong className="text-white font-medium">3 anos de garantia integral</strong> sobre qualquer defeito de infraestrutura ou instalação. O seu investimento está 100% seguro.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
