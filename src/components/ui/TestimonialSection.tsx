import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react"

export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  initials: string
}

interface TestimonialSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Felipe",
    role: "Gerente de TI",
    company: "Multinacional Corporativa",
    initials: "F",
    text: "A gente perdia pelo menos uns 15 minutos de cada reunião só tentando fazer o áudio funcionar nas salas antigas. O que a Sonus fez aqui foi absurdo: eles padronizaram tudo. Hoje a diretoria entra, aperta um único botão na tela e a videoconferência simplesmente liga. Zeramos os chamados no TI por conta de microfone mudo."
  },
  {
    name: "Pr. Leandro",
    role: "Pastor Presidente",
    company: "Comunidade Cristã",
    initials: "PL",
    text: "Sempre sofremos com o som reverberando na Igreja e a palavra não era entendida no fundo do templo. A Sonus não apenas trocou as caixas; eles desenharam um projeto acústico e de PA do zero. Hoje a palavra é clara como cristal, do primeiro ao último banco."
  },
  {
    name: "Ana",
    role: "Diretora Acadêmica",
    company: "Universidade Privada",
    initials: "A",
    text: "O Teatro do campus precisava de um sistema à altura dos grandes espetáculos e ao mesmo tempo simples o suficiente para eventos diários. A equipe da Sonus entregou um sistema robusto de áudio, painel de LED e iluminação que superou nossas expectativas. A execução da obra foi impecável."
  }
]

export function TestimonialSection({
  title = "A excelência em palavras.",
  subtitle = "O que dizem os líderes de tecnologia e operações que confiam na Sonus.",
  testimonials = defaultTestimonials
}: TestimonialSectionProps) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 md:py-32 relative bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Cinematic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      />
      
      {/* Subtle Radial Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="container px-4 md:px-8 max-w-7xl relative z-10 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-none"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-zinc-400 font-light"
            >
              {subtitle}
            </motion.p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative grid w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1 w-full"
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 relative overflow-hidden group h-full">
                <Quote className="absolute -top-6 -left-6 w-32 h-32 text-white/[0.03] rotate-12" />
                
                <div className="flex-1 relative z-10">
                  <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                    "{testimonials[active].text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 md:border-l md:border-white/10 md:pl-12 md:w-80 relative z-10 shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center text-white font-bold text-xl border border-white/10">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonials[active].name}</h4>
                    <p className="text-sm text-zinc-400">{testimonials[active].role}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-500/80">Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12 gap-3 relative z-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1)
                setActive(i)
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
