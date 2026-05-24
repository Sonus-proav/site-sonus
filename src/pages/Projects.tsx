import { FadeIn } from "@/components/ui/FadeIn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProjects, type Project } from "@/lib/storage"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function Projects() {
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => {
      setProjectsData(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container px-4 md:px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Nosso Portfólio Profissional
          </h1>
          <p className="text-lg text-zinc-400 font-light">
            Explore nossa galeria de projetos e descubra como transformamos espaços comuns em ambientes extraordinários com soluções audiovisuais de última geração.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs defaultValue="todos" className="w-full flex flex-col items-center">
            <TabsList className="bg-black/50 border border-white/10 backdrop-blur-md p-1 rounded-full h-auto flex flex-wrap justify-center gap-1 mb-12">
              <TabsTrigger value="todos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-400">Todos</TabsTrigger>
              <TabsTrigger value="auditórios" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-400">Auditórios</TabsTrigger>
              <TabsTrigger value="teatros" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-400">Teatros</TabsTrigger>
              <TabsTrigger value="igrejas" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-400">Igrejas e Templos</TabsTrigger>
              <TabsTrigger value="corporativos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-400">Corporativos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="w-full mt-0">
              <ProjectGrid filter="todos" projects={projectsData} loading={isLoading} />
            </TabsContent>
            <TabsContent value="auditórios" className="w-full mt-0">
              <ProjectGrid filter="auditórios" projects={projectsData} loading={isLoading} />
            </TabsContent>
            <TabsContent value="teatros" className="w-full mt-0">
              <ProjectGrid filter="teatros" projects={projectsData} loading={isLoading} />
            </TabsContent>
            <TabsContent value="igrejas" className="w-full mt-0">
              <ProjectGrid filter="igrejas" projects={projectsData} loading={isLoading} />
            </TabsContent>
            <TabsContent value="corporativos" className="w-full mt-0">
              <ProjectGrid filter="corporativos" projects={projectsData} loading={isLoading} />
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </div>
  )
}

function ProjectGrid({ filter, projects, loading }: { filter: string, projects: Project[], loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[4/3] rounded-2xl" />
        ))}
      </div>
    )
  }

  const filteredProjects = filter === "todos" 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const hasMultipleImages = project.images && project.images.length > 1
  const images = hasMultipleImages ? project.images! : [project.image]

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsImageLoaded(false)
    setCurrentImgIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsImageLoaded(false)
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Link to={`/projetos/${project.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/10 cursor-pointer h-full"
      >
        <div className="relative w-full h-full overflow-hidden">
          {!isImageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none z-0" />
          )}
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImgIndex}
              src={images[currentImgIndex]} 
              alt={project.seoAlt || project.title}
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
              onLoad={() => setIsImageLoaded(true)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isImageLoaded ? 1 : 0, scale: isImageLoaded ? 1 : 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-10"
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-100">
            {project.category}
          </p>
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <span className="text-white font-medium text-sm inline-flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-200">
            Ver projeto <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Carousel Controls */}
        {hasMultipleImages && (
          <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
            <button 
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImgIndex ? 'bg-primary w-3' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}
      </motion.article>
    </Link>
  )
}
