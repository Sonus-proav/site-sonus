import { FadeIn } from "@/components/ui/FadeIn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProjects, getCachedProjects, optimizeImageUrl, type Project } from "@/lib/publicStorage"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { SEO } from "../components/SEO"

export function Projects() {
  const [projectsData, setProjectsData] = useState<Project[]>(getCachedProjects() || [])
  const [isLoading, setIsLoading] = useState(!getCachedProjects())

  useEffect(() => {
    if (!getCachedProjects()) {
      getProjects().then(data => {
        setProjectsData(data)
        setIsLoading(false)
      }).catch(() => {
        setProjectsData([])
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEO 
        title="Portfólio de Projetos Audiovisuais | Sonus Pro AV" 
        description="Conheça nossos cases de sucesso em sonorização e automação corporativa para empresas, auditórios e igrejas." 
        url="https://sonusproaudio.com.br/projetos"
      />
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-6 transition-colors duration-300">
            Nosso Portfólio Profissional
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light transition-colors duration-300">
            Explore nossa galeria de projetos e descubra como transformamos espaços comuns em ambientes extraordinários com soluções audiovisuais de última geração.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs defaultValue="todos" className="w-full flex flex-col items-center">
            <TabsList className="bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 backdrop-blur-md p-1 rounded-full h-auto flex flex-wrap justify-center gap-1 mb-12 transition-colors duration-300">
              <TabsTrigger value="todos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-300">Todos</TabsTrigger>
              <TabsTrigger value="auditórios" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-300">Auditórios</TabsTrigger>
              <TabsTrigger value="teatros" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-300">Teatros</TabsTrigger>
              <TabsTrigger value="igrejas" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-300">Igrejas e Templos</TabsTrigger>
              <TabsTrigger value="corporativos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-300">Corporativos</TabsTrigger>
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
  const [visibleCount, setVisibleCount] = useState(6)

  // Reseta o contador quando muda o filtro
  useEffect(() => {
    setVisibleCount(6)
  }, [filter])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[4/3] rounded-2xl" />
        ))}
      </div>
    )
  }

  const visibleProjects = projects.filter(p => !p.isHidden)

  const filteredProjects = filter === "todos" 
    ? visibleProjects 
    : visibleProjects.filter(p => p.category === filter)

  const currentProjects = filteredProjects.slice(0, visibleCount)

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {currentProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      {visibleCount < filteredProjects.length && (
        <FadeIn delay={0.1} className="mt-12">
          <Button 
            onClick={() => setVisibleCount(v => v + 6)}
            size="lg" 
            variant="outline" 
            className="text-base font-medium px-8 h-12 rounded-full bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all"
          >
            Carregar mais projetos
          </Button>
        </FadeIn>
      )}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const hasMultipleImages = project.images && project.images.length > 1
  const images = hasMultipleImages ? project.images! : [project.image]
  const [imgSrc, setImgSrc] = useState(() => optimizeImageUrl(images[0], 800))

  useEffect(() => {
    setImgSrc(optimizeImageUrl(images[currentImgIndex], 800))
  }, [currentImgIndex, images])

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
        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 cursor-pointer h-full will-change-transform transition-colors duration-300"
      >
        <div className="relative w-full h-full overflow-hidden">
          {!isImageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-none z-0" />
          )}
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImgIndex}
              src={imgSrc} 
              alt={project.seoAlt || project.title}
              width={800}
              height={600}
              loading={index < 4 ? "eager" : "lazy"}
              fetchPriority={index < 4 ? "high" : "auto"}
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => {
                // Fallback para a URL original sem o proxy se o wsrv.nl bloquear (ex: Referer do Google)
                if (imgSrc.includes('wsrv.nl')) {
                  setImgSrc(images[currentImgIndex])
                } else {
                  setIsImageLoaded(true) // Evita skeleton infinito se até o original falhar
                }
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isImageLoaded ? 1 : 0, scale: isImageLoaded ? 1 : 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 z-10 will-change-transform"
            />
          </AnimatePresence>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="absolute top-4 left-4 z-30 flex flex-wrap gap-2 pointer-events-none">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="bg-primary/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 pt-16 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-none z-20">
          <div className="mb-2 md:mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-100 hidden md:block">
            <span className="inline-block bg-black/50 text-zinc-200 text-[10px] md:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md shadow-lg">
              {project.category}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 md:line-clamp-3">{project.title}</h3>
          
          {project.problem ? (
            <div className="mt-1 mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-[150ms]">
               <span className="inline-block bg-primary/20 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 mb-1.5 backdrop-blur-sm">O Desafio</span>
               <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 leading-relaxed">{project.problem}</p>
            </div>
          ) : null}

          <span className="text-white font-medium text-sm inline-flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-200 mt-auto">
            {project.problem ? 'Ver Solução' : 'Ver projeto'} <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Carousel Controls */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30 pointer-events-auto">
            <button 
              onClick={prevImage}
              aria-label="Imagem anterior"
              className="p-1.5 rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              aria-label="Próxima imagem"
              className="p-1.5 rounded-full bg-black/50 hover:bg-primary text-white backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 flex gap-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImgIndex ? 'bg-primary w-3' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}

        {/* Preload invisível das imagens secundárias para troca sem Skeleton */}
        {hasMultipleImages && (
          <div className="hidden">
            {images.map((img, i) => (
              i !== currentImgIndex && <img key={i} src={optimizeImageUrl(img, 800)} alt="preload" width={800} height={600} loading="eager" decoding="async" referrerPolicy="no-referrer" />
            ))}
          </div>
        )}
      </motion.article>
    </Link>
  )
}
