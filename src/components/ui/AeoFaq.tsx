import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    <section className="py-20 md:py-24 px-4 bg-[#050505] relative z-10 border-t border-white/5">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">{subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-6">
            {title}
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'bg-zinc-900 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-zinc-950/50 border-white/10 hover:border-white/20 hover:bg-zinc-900/50'}`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${openIndex === index ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${openIndex === index ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'border-white/10 text-zinc-500'}`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
