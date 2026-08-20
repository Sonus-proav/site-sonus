import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"

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
    name: "Felipe Rodrigues",
    role: "Gerente de Infraestrutura",
    company: "Multinacional Corporativa",
    initials: "FR",
    text: "A gente perdia pelo menos uns 15 minutos de cada reunião só tentando fazer o áudio funcionar nas salas antigas. O que a Sonus fez aqui foi absurdo: eles padronizaram tudo. Hoje a diretoria entra, aperta um único botão na tela e a videoconferência simplesmente liga. Zeramos os chamados no TI por conta de microfone mudo."
  },
  {
    name: "Pr. Leandro Costa",
    role: "Pastor Presidente",
    company: "Comunidade Cristã",
    initials: "LC",
    text: "Sempre sofríamos com aquele som embolado na igreja, onde a pessoa que estava lá no fundo não entendia metade da pregação e as caixas viviam dando microfonia. O projeto da Sonus mudou a história do nosso ministério. O som ficou tão limpo e potente que até a equipe de voluntários trabalha com mais alegria, porque o sistema é super fácil de mexer."
  },
  {
    name: "Dra. Helena Vanz",
    role: "Diretora Acadêmica",
    company: "Centro Universitário",
    initials: "HV",
    text: "Tínhamos muito receio de investir alto no auditório e acabar com um sistema tão complexo que nenhum professor saberia usar. A Sonus entregou uma automação tão inteligente que hoje qualquer convidado sobe no palco, toca no painelzinho e as luzes, o projetor e o microfone se ajustam sozinhos. Valeu cada centavo."
  }
]

const accentColors = [
  { gradient: "from-blue-500 to-cyan-400", border: "border-blue-500/30", glow: "rgba(59,130,246,0.15)", text: "text-blue-400" },
  { gradient: "from-emerald-500 to-teal-400", border: "border-emerald-500/30", glow: "rgba(16,185,129,0.15)", text: "text-emerald-400" },
  { gradient: "from-violet-500 to-purple-400", border: "border-violet-500/30", glow: "rgba(139,92,246,0.15)", text: "text-violet-400" },
]

export function TestimonialSection({ 
  title = "O que dizem nossos clientes", 
  subtitle = "Histórias reais de transformação acústica e tecnológica",
  testimonials = defaultTestimonials 
}: TestimonialSectionProps) {
  const [active, setActive] = useState(0)

  const next = () => setActive((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const activeTestimonial = testimonials[active]
  const accent = accentColors[active % accentColors.length]
  const sideTestimonials = testimonials.filter((_, i) => i !== active)

  return (
    <section className="py-24 md:py-32 relative bg-[#050505] overflow-hidden">
      {/* Ambient glow that follows the active accent */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none opacity-40 transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse at center, ${accent.glow} 0%, transparent 70%)` }}
      />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <span className={`font-mono text-xs uppercase tracking-[0.3em] ${accent.text} transition-colors duration-700`}>
                Depoimentos Verificados
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 leading-[1.1]">
                {title}
              </h2>
              <p className="text-zinc-500 text-lg font-light mt-4 max-w-xl">
                {subtitle}
              </p>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-zinc-600 font-mono text-sm ml-2">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content Grid: Hero Left + Side Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* === HERO TESTIMONIAL (Left, 3 cols) === */}
          <div className="lg:col-span-3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative rounded-[2rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-between border ${accent.border} transition-colors duration-700`}
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
                }}
              >
                {/* Giant quote mark */}
                <div className="absolute top-6 left-8 md:top-8 md:left-12">
                  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="opacity-10">
                    <path d="M0 40L16 0H32L20 40H32V60H0V40ZM48 40L64 0H80L68 40H80V60H48V40Z" 
                      className={accent.text} fill="currentColor" />
                  </svg>
                </div>

                {/* Text */}
                <div className="mt-16 md:mt-20">
                  <p className="text-white/90 text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed font-light tracking-wide">
                    "{activeTestimonial.text}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-700`}>
                    {activeTestimonial.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-bold text-lg">{activeTestimonial.name}</h4>
                      <CheckCircle2 className={`w-4 h-4 ${accent.text} transition-colors duration-700`} />
                    </div>
                    <p className="text-zinc-500 text-sm">{activeTestimonial.role} • {activeTestimonial.company}</p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r ${accent.gradient} opacity-30`} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* === SIDE TESTIMONIALS (Right, 2 cols) === */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {sideTestimonials.map((t, i) => {
              const realIndex = testimonials.indexOf(t)
              const sideAccent = accentColors[realIndex % accentColors.length]
              
              return (
                <motion.div
                  key={realIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onClick={() => setActive(realIndex)}
                  className="group cursor-pointer relative rounded-2xl p-6 md:p-8 border border-white/5 hover:border-white/15 transition-all duration-500 flex-1 flex flex-col justify-between"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)"
                  }}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${sideAccent.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300 line-clamp-5">
                    "{t.text}"
                  </p>
                  
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sideAccent.gradient} opacity-60 group-hover:opacity-100 flex items-center justify-center text-white font-bold text-xs shadow-md transition-all duration-500`}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-white/80 group-hover:text-white font-semibold text-sm transition-colors duration-300">{t.name}</h4>
                      <p className="text-zinc-600 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active 
                  ? `w-8 bg-gradient-to-r ${accent.gradient}` 
                  : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
