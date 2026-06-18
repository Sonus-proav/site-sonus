import { useEffect, useState, useRef } from "react"
import { Reorder } from "framer-motion"
import { FadeIn } from "@/components/ui/FadeIn"
import { Plus, Edit3, Trash2, Home, GripVertical, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { type Project, getProjects, deleteProject, addProject, updateProject, saveProjects } from "@/lib/storage"
import { ProjectModal } from "@/components/admin/ProjectModal"

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const latestProjects = useRef<Project[]>([])

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data)
      latestProjects.current = data
    })
  }, [])

  const handleReorder = (newOrder: Project[]) => {
    setProjects(newOrder)
    latestProjects.current = newOrder
  }

  const handleDragEnd = async () => {
    await saveProjects(latestProjects.current)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      await deleteProject(id)
      setProjects(await getProjects())
    }
  }

  const [togglingId, setTogglingId] = useState<number | null>(null)

  const handleToggleVisibility = async (project: Project) => {
    if (togglingId === project.id) return; // Evita cliques duplos rápidos
    
    try {
      setTogglingId(project.id)
      
      // 1. Atualização Otimista (Instantânea na UI)
      const isHiddenNow = !project.isHidden;
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, isHidden: isHiddenNow } : p))
      
      // 2. Persiste no Firebase no background
      await updateProject(project.id, { isHidden: isHiddenNow })
    } finally {
      setTogglingId(null)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleSave = async (projectData: Omit<Project, "id">) => {
    try {
      if (editingProject) {
        // Optimistic update for edit
        const updatedProject = { ...projectData, id: editingProject.id };
        setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject as Project : p));
        setIsModalOpen(false);
        
        await updateProject(editingProject.id, projectData);
      } else {
        // Optimistic update for add
        // Generate a temporary ID that is definitely higher than current ones
        const tempId = Math.max(...projects.map(p => p.id), 0) + 1;
        const newProject = { ...projectData, id: tempId };
        setProjects(prev => [newProject as Project, ...prev]);
        setIsModalOpen(false);
        
        await addProject(projectData);
      }
      
      // Sync back with the exact state from DB
      const freshData = await getProjects();
      setProjects(freshData);
      latestProjects.current = freshData;
    } catch (error) {
      console.error("Erro fatal ao salvar no banco", error);
      alert("Erro ao salvar! As alterações foram revertidas. Tente novamente.");
      // Rollback on failure
      const revertedData = await getProjects();
      setProjects(revertedData);
      latestProjects.current = revertedData;
      throw error; // Let ProjectModal know it failed
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Painel de Controle</h1>
            <p className="text-zinc-400">Gerenciamento de Portfólio Sonus</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" /> Ver Site
            </Link>
            <button 
              onClick={handleAddNew}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-6 rounded-full flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(41,128,185,0.3)]"
            >
              <Plus className="w-5 h-5" /> Novo Projeto
            </button>
          </div>
        </FadeIn>

        {/* Projects Grid/Table */}
        <FadeIn delay={0.1}>
          <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/50 text-zinc-400 text-sm uppercase tracking-wider">
                    <th className="p-4 md:p-6 w-10"></th>
                    <th className="p-4 md:p-6 font-medium">Imagem</th>
                    <th className="p-4 md:p-6 font-medium">Título</th>
                    <th className="p-4 md:p-6 font-medium">Categoria</th>
                    <th className="p-4 md:p-6 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <Reorder.Group as="tbody" axis="y" values={projects} onReorder={handleReorder} className="divide-y divide-white/5">
                  {projects.map((project) => (
                    <Reorder.Item 
                      as="tr"
                      key={project.id}
                      value={project}
                      onDragEnd={handleDragEnd}
                      className="hover:bg-white/[0.02] transition-colors group bg-zinc-950/50"
                    >
                      <td className="p-4 md:p-6 text-zinc-600 cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5 hover:text-white transition-colors" />
                      </td>
                      <td className="p-4 md:p-6">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover pointer-events-none" />
                        </div>
                      </td>
                      <td className="p-4 md:p-6 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span className={project.isHidden ? "opacity-50 line-through" : ""}>{project.title}</span>
                          {project.isHidden && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              Oculto
                            </span>
                          )}
                        </div>
                        {project.images && project.images.length > 1 && (
                          <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {project.images.length} fotos
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-zinc-400 uppercase text-xs tracking-wider">
                        {project.category}
                        {project.state && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-white/10">
                            {project.state}
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-right space-x-2 relative z-10 flex justify-end">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleToggleVisibility(project); }}
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${project.isHidden ? 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20' : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                          title={project.isHidden ? "Mostrar no site" : "Ocultar do site"}
                        >
                          {project.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEdit(project); }}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </Reorder.Item>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500">
                        Nenhum projeto encontrado.
                      </td>
                    </tr>
                  )}
                </Reorder.Group>
              </table>
            </div>
          </div>
        </FadeIn>

      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={editingProject} 
      />
    </div>
  )
}
