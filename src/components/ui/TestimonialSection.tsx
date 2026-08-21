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

// Updated to match the requested "Pegada de cores" (Blue/Cyan/White)
const accentColors = [
  { gradient: "from-[#3b82f6] to-[#06b6d4]", border: "border-[#3b82f6]/30", glow: "rgba(59,130,246,0.2)", text: "text-[#60a5fa]" },
  { gradient: "from-[#0ea5e9] to-[#0284c7]", border: "border-[#0ea5e9]/30", glow: "rgba(14,165,233,0.2)", text: "text-[#38bdf8]" },
  { gradient: "from-[#06b6d4] to-[#0891b2]", border: "border-[#06b6d4]/30", glow: "rgba(6,182,212,0.2)", text: "text-[#22d3ee]" },
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
    <section className="py-24 md:py-32 relative bg-[#131b31] overflow-hidden">
      
      {/* Background Shapes matching the Sticky CTA Button aesthetic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: 'strict' }}>
        <div 
          className="absolute top-[10%] left-[10%] w-16 h-16 bg-[#3b82f6] opacity-30 animate-float-slow rounded-lg rotate-12" 
        />
        <div 
          className="absolute bottom-[20%] right-[15%] w-24 h-24 bg-[#06b6d4] opacity-20 animate-float-slow-reverse rounded-full" 
        />
        <div 
          className="absolute top-[40%] right-[25%] w-12 h-12 bg-[#0ea5e9] opacity-30 animate-float-slow rounded-md -rotate-12" 
          style={{ animationDelay: '3s' }} 
        />
        <div 
          className="absolute bottom-[10%] left-[20%] w-20 h-20 bg-[#3b82f6] opacity-20 animate-float-slow-reverse rounded-lg rotate-45" 
          style={{ animationDelay: '5s' }} 
        />
        
        {/* Soft radial glow matching the button's background */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-40 transition-colors duration-1000"
          style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 60%)` }}
        />
      </div>
      
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
              <span className={`font-mono text-xs uppercase tracking-[0.3em] ${accent.text} transition-colors duration-700 drop-shadow-md`}>
                Depoimentos
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 leading-[1.1] drop-shadow-lg">
                {title}
              </h2>
              <p className="text-blue-100/60 text-lg font-light mt-4 max-w-xl">
                {subtitle}
              </p>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-3">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-blue-400/20 flex items-center justify-center text-blue-100/50 hover:text-white hover:border-blue-400/50 transition-all duration-300 bg-blue-500/5"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-blue-400/20 flex items-center justify-center text-blue-100/50 hover:text-white hover:border-blue-400/50 transition-all duration-300 bg-blue-500/5"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-blue-200/50 font-mono text-sm ml-2">
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
                className={`relative rounded-[2rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-between overflow-hidden transition-colors duration-700 group`}
              >
                {/* 
                  === GLASS LAYERS COPIED FROM STICKY CTA BUTTON === 
                */}
                {/* Glass Layer 1: Blur */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none rounded-[2rem]"
                  style={{
                    backdropFilter: "blur(16px)",
                  }}
                />
                
                {/* Glass Layer 2: White tint */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none rounded-[2rem]"
                  style={{ background: "rgba(255, 255, 255, 0.08)" }}
                />

                {/* Glass Layer 3: Inner highlight/shadow */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none rounded-[2rem] overflow-hidden"
                  style={{
                    boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1)",
                  }}
                />
                
                {/* Subtle border glow */}
                <div className="absolute inset-0 z-0 pointer-events-none rounded-[2rem] border border-white/20" />


                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Text */}
                  <div className="mt-8 md:mt-10 relative">
                    {/* Giant quote mark */}
                    <div className="absolute -top-12 -left-6 opacity-[0.03] pointer-events-none">
                      <svg width="120" height="100" viewBox="0 0 80 60" fill="currentColor" className={accent.text}>
                        <path d="M0 40L16 0H32L20 40H32V60H0V40ZM48 40L64 0H80L68 40H80V60H48V40Z" />
                      </svg>
                    </div>
                    <p className="text-white/95 text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed font-light tracking-wide relative z-10 drop-shadow-md">
                      "{activeTestimonial.text}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-700`}>
                      {activeTestimonial.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-bold text-lg drop-shadow-sm">{activeTestimonial.name}</h4>
                        <CheckCircle2 className={`w-4 h-4 ${accent.text} transition-colors duration-700 drop-shadow-sm`} />
                      </div>
                      <p className="text-blue-100/70 text-sm">{activeTestimonial.role} • {activeTestimonial.company}</p>
                    </div>
                  </div>
                </div>
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
                  className="group cursor-pointer relative rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                >
                  {/* Glass Layer 1: Blur */}
                  <div
                    className="absolute inset-0 z-0 pointer-events-none rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backdropFilter: "blur(12px)",
                    }}
                  />
                  
                  {/* Glass Layer 2: White tint */}
                  <div
                    className="absolute inset-0 z-0 pointer-events-none rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  />

                  {/* Glass Layer 3: Inner highlight/shadow */}
                  <div
                    className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.05)",
                    }}
                  />
                  
                  {/* Subtle border glow */}
                  <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-500" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <p className="text-blue-100/60 text-sm leading-relaxed font-light group-hover:text-white/95 transition-colors duration-500 line-clamp-5">
                      "{t.text}"
                    </p>
                    
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5 group-hover:border-white/15 transition-colors duration-500">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sideAccent.gradient} opacity-40 group-hover:opacity-100 flex items-center justify-center text-white font-bold text-xs shadow-md transition-all duration-500`}>
                        {t.initials}
                      </div>
                      <div>
                        <h4 className="text-white/60 group-hover:text-white font-semibold text-sm transition-colors duration-500">{t.name}</h4>
                        <p className="text-blue-200/40 group-hover:text-blue-200/70 text-xs transition-colors duration-500">{t.role}</p>
                      </div>
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
                  ? `w-8 bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.5)]` 
                  : "w-1.5 bg-blue-100/10 hover:bg-blue-100/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
