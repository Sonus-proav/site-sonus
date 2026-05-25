import { useParams, Link } from "react-router-dom"
import { FadeIn } from "@/components/ui/FadeIn"
import { ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react"
import { getProjects, getCachedProjects, type Project } from "@/lib/publicStorage"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SEO } from "../components/SEO"
import { Helmet } from "react-helmet-async"

export function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(() => {
    const cached = getCachedProjects()
    return cached ? cached.find(p => p.id === Number(id)) || null : null
  })
  const [loading, setLoading] = useState(!getCachedProjects())
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    if (!getCachedProjects()) {
      getProjects().then(projects => {
        setProject(projects.find(p => p.id === Number(id)) || null)
        setLoading(false)
      })
    }
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="container px-4 md:px-6">
          <Skeleton className="w-48 h-10 rounded-full mb-8" />
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
            <div className="flex flex-col h-full justify-center">
              <div className="bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 p-8 md:p-12 rounded-3xl transition-colors duration-300">
                <Skeleton className="w-32 h-4 mb-4" />
                <Skeleton className="w-3/4 h-10 mb-4" />
                <Skeleton className="w-full h-32" />
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  const hasMultipleImages = project?.images && project.images.length > 1

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center">
        <SEO 
          title="Projeto não encontrado | Sonus" 
          description="O projeto que você está procurando não existe." 
        />
        <h1 className="text-3xl text-black dark:text-white font-bold mb-4 transition-colors duration-300">Projeto não encontrado</h1>
        <Link to="/projetos" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar aos projetos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <SEO 
        title={`${project.title} | Portfólio Sonus`} 
        description={project.description?.substring(0, 155) + "..." || "Conheça mais este incrível projeto audiovisual realizado pela Sonus."} 
        image={project.image}
        url={`https://sonusproaudio.com.br/projetos/${project.id}`}
        type="article"
      />
      <Helmet>
        {/* Preload de todas as imagens do carrossel para troca instantânea */}
        {hasMultipleImages && project.images!.map((img, i) => (
          <link rel="preload" as="image" href={img} key={i} />
        ))}
      </Helmet>
      <div className="container px-4 md:px-6">
        
        <FadeIn>
          <Link 
            to="/projetos" 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 text-primary transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Voltar para Projetos</span>
          </Link>
        </FadeIn>

        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 relative group transition-colors duration-300">
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImgIndex}
                  src={hasMultipleImages ? project.images![currentImgIndex] : project.image} 
                  alt={project.seoAlt || project.title}
                  width={1200}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 pointer-events-none" />

              {/* Controles do Carrossel */}
              {hasMultipleImages && (
                <>
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={() => setCurrentImgIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length)}
                      aria-label="Imagem anterior"
                      className="p-3 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentImgIndex((prev) => (prev + 1) % project.images!.length)}
                      aria-label="Próxima imagem"
                      className="p-3 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Pontinhos do Carrossel */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    {project.images!.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentImgIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImgIndex ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white'}`} 
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </FadeIn>

          {/* Right Column: Content */}
          <FadeIn delay={0.2} className="flex flex-col h-full justify-center">
            <div className="bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
                <span className="text-primary font-medium text-sm tracking-widest uppercase">
                  {project.category}
                </span>
                {project.tags && project.tags.map((tag, i) => (
                  <span key={i} className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-black dark:text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-8 leading-snug transition-colors duration-300 relative z-10">
                {project.title}
              </h1>
              
              <div className="space-y-8 text-zinc-600 dark:text-zinc-400 font-light leading-relaxed text-lg transition-colors duration-300 relative z-10">
                
                {/* Desafio (Problema) */}
                {project.problem && (
                  <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-6">
                    <h3 className="text-orange-600 dark:text-orange-400 font-bold text-xl mb-3 flex items-center gap-2">
                      <span className="bg-orange-500/20 p-2 rounded-lg"><AlertCircle className="w-5 h-5" /></span>
                      O Desafio
                    </h3>
                    <p className="whitespace-pre-wrap text-black/80 dark:text-white/80">{project.problem}</p>
                  </div>
                )}

                {/* Solução Sonus */}
                {project.solution && (
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
                    <h3 className="text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-3 flex items-center gap-2">
                      <span className="bg-emerald-500/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5" /></span>
                      A Solução Sonus
                    </h3>
                    <p className="whitespace-pre-wrap text-black/80 dark:text-white/80">{project.solution}</p>
                  </div>
                )}

                {/* Descrição Técnica Adicional (Opcional) */}
                {project.description && (
                  <div>
                    <h3 className="text-black dark:text-white font-semibold text-lg mb-2">Visão Geral</h3>
                    <p className="whitespace-pre-wrap">{project.description}</p>
                  </div>
                )}

                {!project.description && !project.problem && !project.solution && (
                  <p className="italic opacity-50">Nenhum detalhe disponível para este projeto.</p>
                )}
              </div>
            </div>
          </FadeIn>
        </article>

      </div>
    </div>
  )
}
