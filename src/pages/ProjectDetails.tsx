import { useParams, Link } from "react-router-dom"
import { FadeIn } from "@/components/ui/FadeIn"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { getProjects, type Project } from "@/lib/storage"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    getProjects().then(projects => {
      setProject(projects.find(p => p.id === Number(id)) || null)
      setLoading(false)
    })
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="container px-4 md:px-6">
          <Skeleton className="w-48 h-10 rounded-full mb-8" />
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
            <div className="flex flex-col h-full justify-center">
              <div className="bg-black/40 border border-white/10 p-8 md:p-12 rounded-3xl">
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
        <h1 className="text-3xl text-white font-bold mb-4">Projeto não encontrado</h1>
        <Link to="/projetos" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar aos projetos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container px-4 md:px-6">
        
        <FadeIn>
          <Link 
            to="/projetos" 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 text-primary transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Voltar para Projetos</span>
          </Link>
        </FadeIn>

        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10 relative group">
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImgIndex}
                  src={hasMultipleImages ? project.images![currentImgIndex] : project.image} 
                  alt={project.seoAlt || project.title}
                  loading="lazy"
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
                      className="p-3 rounded-full bg-black/60 hover:bg-primary text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentImgIndex((prev) => (prev + 1) % project.images!.length)}
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
            <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                {project.category}
              </p>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-snug">
                {project.title}
              </h1>
              
              <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg whitespace-pre-wrap">
                {project.description ? (
                  <p>{project.description}</p>
                ) : (
                  <p className="italic opacity-50">Nenhuma descrição detalhada disponível para este projeto.</p>
                )}
              </div>
            </div>
          </FadeIn>
        </article>

      </div>
    </div>
  )
}
