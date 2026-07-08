import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

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
    name: "Carlos Eduardo",
    role: "Diretor de TI",
    company: "Grupo Corporativo",
    initials: "CE",
    text: "Antes da Sonus, nossas reuniões eram um caos técnico diário. A padronização que fizeram em nossas 15 salas mudou completamente a experiência. O sistema apenas funciona, sem fricção."
  },
  {
    name: "Pr. Marcos Silva",
    role: "Pastor Sênior",
    company: "Igreja Matriz",
    initials: "MS",
    text: "O projeto acústico transformou nosso templo. A clareza da palavra agora chega a todos os fiéis, do altar até o último banco. Os voluntários operam a mesa sem medo algum."
  },
  {
    name: "Juliana Mendes",
    role: "Pró-Reitora",
    company: "Centro Universitário",
    initials: "JM",
    text: "O auditório se tornou o espaço mais disputado do campus. A automação Q-SYS permite que qualquer professor chegue, aperte um botão e comece sua palestra com áudio e vídeo impecáveis."
  }
]

export function TestimonialSection({ 
  title = "O que dizem nossos clientes", 
  subtitle = "Histórias reais de transformação acústica e tecnológica",
  testimonials = defaultTestimonials 
}: TestimonialSectionProps) {
  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg md:text-xl font-light"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-500 flex flex-col h-full group"
            >
              <div className="flex text-amber-400 mb-6 gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <Quote className="w-10 h-10 text-white/5 mb-4 group-hover:text-blue-500/20 transition-colors duration-500" />
              
              <p className="text-zinc-300 leading-relaxed font-light flex-grow mb-8 text-sm md:text-base">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base">{t.name}</h4>
                  <p className="text-zinc-500 text-xs md:text-sm">{t.role} • {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
