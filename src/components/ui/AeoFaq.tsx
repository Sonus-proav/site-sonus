import { useId, useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { FadeIn } from "@/components/ui/FadeIn"

export interface FaqItem {
  question: string;
  answer: string;
}

interface AeoFaqProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function AeoFaq({ faqs, title = "Perguntas Frequentes", subtitle = "Tire suas dúvidas sobre nossas soluções" }: AeoFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Gera o Schema JSON-LD para o Google (AEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section className="py-14 sm:py-20 md:py-24 px-4 bg-[#050505] relative z-10 border-t border-white/5">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <span className="text-blue-400 font-mono text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest">{subtitle}</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight">
            {title}
          </h2>
        </FadeIn>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const btnId = `${baseId}-faq-btn-${index}`
            const panelId = `${baseId}-faq-panel-${index}`
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'bg-zinc-900 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/50'}`}
                >
                  <h3 className="m-0">
                    <button 
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
                    >
                      <span className={`font-bold text-sm sm:text-lg md:text-xl sm:pr-4 leading-snug transition-colors ${isOpen ? 'text-white' : 'text-zinc-200 sm:text-zinc-300'}`}>
                        {faq.question}
                      </span>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${isOpen ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'border-white/15 text-zinc-400'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                  </h3>
                  
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 sm:pt-2 text-zinc-300 sm:text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal sm:font-light">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
