import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react"
import type { Project } from "@/lib/storage"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Omit<Project, "id">) => Promise<void>
  initialData?: Project | null
}

import imageCompression from 'browser-image-compression';

const compressImage = async (file: File): Promise<string> => {
  try {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp'
    };
    
    const compressedFile = await imageCompression(file, options);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

export function ProjectModal({ isOpen, onClose, onSave, initialData }: ProjectModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("auditórios")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([""])
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title)
        setCategory(initialData.category)
        setDescription(initialData.description || "")
        setImages(initialData.images && initialData.images.length > 0 ? initialData.images : [initialData.image])
      } else {
        setTitle("")
        setCategory("auditórios")
        setDescription("")
        setImages([""])
      }
    }
  }, [isOpen, initialData])

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsCompressing(true)
      try {
        const compressedBase64 = await compressImage(file)
        const newImages = [...images]
        newImages[index] = compressedBase64
        setImages(newImages)
      } catch (err) {
        console.error("Erro ao comprimir imagem", err)
        alert("Ocorreu um erro ao processar a imagem. Tente outra.")
      } finally {
        setIsCompressing(false)
      }
    }
  }

  const addImageField = () => {
    if (images.length < 4) {
      setImages([...images, ""])
    }
  }

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    if (newImages.length === 0) newImages.push("")
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanImages = images.filter(img => img.trim() !== "")
    
    if (cleanImages.length === 0) {
      alert("Faça o upload de pelo menos uma imagem.")
      return
    }

    setIsSaving(true)
    try {
      await onSave({
        title,
        category,
        description,
        image: cleanImages[0],
        images: cleanImages,
        seoAlt: `Projeto de ${category} - ${title}`
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">
            {initialData ? "Editar Projeto" : "Novo Projeto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Título do Projeto</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: Auditório Master..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Categoria</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="auditórios">Auditórios</option>
                <option value="teatros">Teatros</option>
                <option value="igrejas">Igrejas e Templos</option>
                <option value="corporativos">Corporativos</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Descrição (Opcional)</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] resize-none"
                placeholder="Detalhes técnicos, equipamentos utilizados..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">Imagens (Upload) - Máx 4</label>
                {images.length < 4 && (
                  <button 
                    type="button" 
                    onClick={addImageField}
                    className="text-xs font-medium text-primary hover:text-blue-400 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Mais Foto
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group rounded-xl border border-white/10 bg-black/50 overflow-hidden aspect-video flex flex-col items-center justify-center">
                    {img ? (
                      <>
                        <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <label className="cursor-pointer p-2 bg-primary/20 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors">
                            <Upload className="w-5 h-5" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                          </label>
                          {images.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-zinc-500 hover:text-primary hover:bg-white/5 transition-colors">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-medium">Clique para Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(index, e)} />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500">
                O sistema irá comprimir a imagem automaticamente para poupar a memória do seu navegador. O upload ficará super rápido!
              </p>
            </div>

            <button 
              type="submit"
              disabled={isCompressing || isSaving}
              className="w-full h-14 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(41,128,185,0.3)] mt-8"
            >
              {isCompressing ? "Processando Imagem..." : isSaving ? "Salvando no Banco..." : "Salvar Projeto"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
