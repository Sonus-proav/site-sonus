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
              className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex text-amber-400 mb-6 gap-1" aria-hidden="true">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <Quote className="w-10 h-10 text-white/5 mb-4 group-hover:text-blue-500/20 transition-colors duration-500" aria-hidden="true" />
              
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
