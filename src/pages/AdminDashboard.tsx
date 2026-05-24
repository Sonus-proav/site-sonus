import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/FadeIn"
import { Plus, Edit3, Trash2, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { type Project, getProjects, deleteProject, addProject, updateProject } from "@/lib/storage"
import { ProjectModal } from "@/components/admin/ProjectModal"

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      await deleteProject(id)
      setProjects(await getProjects())
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
    if (editingProject) {
      await updateProject(editingProject.id, projectData)
    } else {
      await addProject(projectData)
    }
    setProjects(await getProjects())
    setIsModalOpen(false)
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
                    <th className="p-4 md:p-6 font-medium">Imagem</th>
                    <th className="p-4 md:p-6 font-medium">Título</th>
                    <th className="p-4 md:p-6 font-medium">Categoria</th>
                    <th className="p-4 md:p-6 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((project) => (
                    <motion.tr 
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4 md:p-6">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4 md:p-6 font-medium text-white">
                        {project.title}
                        {project.images && project.images.length > 1 && (
                          <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {project.images.length} fotos
                          </span>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-zinc-400 uppercase text-xs tracking-wider">
                        {project.category}
                      </td>
                      <td className="p-4 md:p-6 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-zinc-500">
                        Nenhum projeto encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
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
