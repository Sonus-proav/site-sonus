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

  const current = testimonials[active]
  const navBtn =
    "w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0 transition-[transform,border-color,background-color,color] duration-300"

  return (
    <section className="py-24 md:py-36 relative bg-gradient-to-b from-[#050505] via-[#08090e] to-[#050505] overflow-hidden">
      {/* Hairline top divider with glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] max-w-3xl h-24 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.10)_0%,transparent_70%)] pointer-events-none" />

      {/* Architectural grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.025] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }}
      />

      <div className="container px-4 md:px-8 max-w-6xl relative z-10 mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-14 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-cyan-400 mb-5"
            >
              <span className="w-6 h-px bg-cyan-400/60" /> Prova Social
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.06]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-xl"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-mono text-zinc-500 mr-2 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button onClick={handlePrev} className={navBtn} aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={handleNext} className={navBtn} aria-label="Próximo">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative grid w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1 w-full"
            >
              {/* Gradient hairline frame for depth */}
              <div className="group rounded-[1.75rem] p-px bg-gradient-to-br from-white/20 via-white/[0.06] to-cyan-400/20 hover:from-cyan-400/40 hover:to-blue-500/30 transition-colors duration-500 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                <div className="relative rounded-[calc(1.75rem-1px)] bg-gradient-to-b from-[#0e1017] to-[#080a0f] overflow-hidden grid md:grid-cols-12">
                  <Quote className="absolute top-6 right-6 md:top-8 md:right-10 w-24 h-24 text-cyan-400/[0.06] pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  {/* Quote body */}
                  <div className="md:col-span-8 p-8 sm:p-10 md:p-14 relative z-10 flex flex-col justify-center">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6">
                      Depoimento de Cliente
                    </span>
                    <p className="text-lg sm:text-xl md:text-[1.65rem] text-zinc-100 leading-[1.55] font-light tracking-tight">
                      <span className="text-cyan-400 font-serif text-3xl leading-none mr-1 align-top">“</span>
                      {current.text}
                      <span className="text-cyan-400 font-serif text-3xl leading-none ml-1 align-bottom">”</span>
                    </p>
                  </div>

                  {/* Author panel */}
                  <div className="md:col-span-4 relative z-10 p-8 sm:p-10 md:p-12 bg-white/[0.025] border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-400/10 flex items-center justify-center text-white font-black text-xl border border-cyan-400/30 shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)] shrink-0">
                        {current.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xl leading-tight">{current.name}</h4>
                        <p className="text-sm text-zinc-300 mt-0.5">{current.role}</p>
                        <p className="text-xs text-zinc-500 mt-0.5 truncate">{current.company}</p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-white/15 to-transparent" />
                    <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                        Cliente Verificado
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12 gap-2.5 relative z-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1)
                setActive(i)
              }}
              className="h-6 flex items-center"
              aria-label={`Ir para depoimento ${i + 1}`}
            >
              <span
                className={`block h-1.5 w-12 rounded-full origin-center transition-[transform,opacity,background-color] duration-500 ${
                  i === active ? "bg-cyan-400 opacity-100 scale-x-100" : "bg-white opacity-20 scale-x-[0.33] hover:opacity-40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
