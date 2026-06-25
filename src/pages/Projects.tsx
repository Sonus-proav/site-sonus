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
    getProjects().then(data => {
      setProjectsData(data)
      setIsLoading(false)
    }).catch(() => {
      setProjectsData([])
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEO 
        title="Portfólio de Projetos Audiovisuais | Sonus Pro AV" 
        description="Conheça nossos cases de sucesso em sonorização e automação corporativa para empresas, auditórios e igrejas." 
        image="/pato-branco.jpg"
        url="https://sonusproaudio.com.br/projetos"
      />
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-10 md:py-20">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white mb-6 transition-colors duration-300">
            Nosso Portfólio Profissional
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light transition-colors duration-300">
            Explore nossa galeria de projetos e descubra como transformamos espaços comuns em ambientes extraordinários com soluções audiovisuais de última geração.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs defaultValue="todos" className="w-full flex flex-col items-center">
            <TabsList className="bg-white/50 dark:bg-white/10 border border-black/10 dark:border-white/20 backdrop-blur-md p-1 rounded-full h-auto flex flex-wrap justify-center gap-1 mb-12 transition-colors duration-300 shadow-lg">
              <TabsTrigger value="todos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-300">Todos</TabsTrigger>
              <TabsTrigger value="auditórios" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-300">Auditórios</TabsTrigger>
              <TabsTrigger value="teatros" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-300">Teatros</TabsTrigger>
              <TabsTrigger value="igrejas" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-300">Igrejas e Templos</TabsTrigger>
              <TabsTrigger value="corporativos" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-300">Corporativos</TabsTrigger>
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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full space-y-6">
        {currentProjects.map((project, index) => (
          <div key={project.id} className="break-inside-avoid">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
      
      {visibleCount < filteredProjects.length && (
        <FadeIn delay={0.1} className="mt-12">
          <Button 
            onClick={() => setVisibleCount(v => v + 6)}
            size="lg" 
            variant="outline" 
            className="text-base font-medium px-8 h-12 rounded-full bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white transition-all"
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

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setIsImageLoaded(false)
    setCurrentImgIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setIsImageLoaded(false)
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe && hasMultipleImages) {
      nextImage()
    } else if (isRightSwipe && hasMultipleImages) {
      prevImage()
    }
  }

  const isTall = index % 5 === 0 || index % 5 === 3;
  const heightClass = isTall ? "aspect-[3/4]" : "aspect-square md:aspect-[4/3]";

  return (
    <Link to={`/projetos/${project.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
        className={`group relative rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-[#05060A] border border-black/5 dark:border-white/5 cursor-pointer transition-colors duration-300 [transform:translateZ(0)] will-change-transform ${heightClass}`}
      >
        <div 
          className="relative w-full h-full overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
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
                  if (imgSrc.includes('wsrv.nl')) {
                    setImgSrc(images[currentImgIndex])
                  } else {
                    setIsImageLoaded(true)
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isImageLoaded ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 z-10 [transform:translateZ(0)]"
              />
          </AnimatePresence>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="absolute top-4 left-4 z-30 flex flex-wrap gap-2 pointer-events-none">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="bg-black/70 border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="bg-primary border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none z-10 transition-opacity duration-300" />

        {/* Conteúdo ancorado na base e que cresce livremente para cima, com proteção para não encostar nas tags */}
        <div className="absolute inset-0 p-5 pt-16 pb-8 md:p-6 md:pt-16 md:pb-10 flex flex-col pointer-events-none z-20">
          <div className="mt-auto flex flex-col shrink-0 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mb-1 md:mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:delay-100 hidden md:block shrink-0">
              <span className="inline-block bg-black/70 text-zinc-200 text-[10px] md:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                {project.category}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2 md:line-clamp-3 leading-tight shrink-0">{project.title}</h3>
            
            <div className="hidden md:block overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 shrink-0 mt-0 group-hover:mt-1">
              {project.problem ? (
                <div className="mb-2">
                   <span className="inline-block bg-primary/30 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-primary/30 mb-1">O Desafio</span>
                   <p className="text-zinc-300 text-sm line-clamp-2 leading-snug">{project.problem}</p>
                </div>
              ) : (
                <p className="text-zinc-300 text-sm line-clamp-3 mb-2 leading-snug">{project.description}</p>
              )}

              <span className="text-primary hover:text-white font-medium text-sm inline-flex items-center gap-2 transition-colors duration-300 uppercase tracking-wider group/link mb-1 md:mb-0">
                {project.problem ? 'Ver Solução' : 'Ver Projeto'} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30 pointer-events-auto">
            <button 
              onClick={prevImage}
              aria-label="Imagem anterior"
              className="p-1.5 rounded-full bg-black/70 hover:bg-primary text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              aria-label="Próxima imagem"
              className="p-1.5 rounded-full bg-black/70 hover:bg-primary text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 flex gap-1.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImgIndex ? 'bg-primary w-4' : 'bg-white/50'}`} 
              />
            ))}
          </div>
        )}

        {/* Removido o preload invisível que sobrecarregava a rede e a memória no celular */}
      </motion.article>
    </Link>
  )
}
