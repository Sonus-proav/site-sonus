import { collection, doc, getDocs, deleteDoc, writeBatch, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import defaultProjects from "../../data/projects.json";

export interface Project {
  id: number;
  title: string;
  category: "auditórios" | "teatros" | "igrejas" | "corporativos" | string;
  image: string;
  images?: string[]; 
  seoAlt?: string;
  description?: string;
  order?: number;
  isHidden?: boolean;
}

export async function uploadImageToStorage(file: File): Promise<string> {
  // Cria um nome único usando timestamp para evitar conflitos
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const storageRef = ref(storage, `projects/${filename}`);
  
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

// Proxy de Redimensionamento Global: Transforma imagens de 3MB em WebP de 30KB on-the-fly
export function optimizeImageUrl(url: string, width: number = 800): string {
  if (!url || !url.includes("firebasestorage.googleapis.com")) return url;
  
  // Usa o CDN gratuito wsrv.nl (antigo images.weserv.nl)
  // &output=webp &q=80 para forçar compressão next-gen
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=80`;
}

let projectsCache: Project[] | null = null;
let cachePromise: Promise<Project[]> | null = null;

export function getCachedProjects(): Project[] | null {
  return projectsCache;
}

export async function getProjects(): Promise<Project[]> {
  // Se já temos a promessa rodando, espera ela
  if (cachePromise) return cachePromise;
  
  // Se já temos o cache, retorna na hora
  if (projectsCache) return projectsCache;

  cachePromise = (async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      
      if (querySnapshot.empty) {
        console.log("Migrando banco de dados para o Firebase...");
        const batch = writeBatch(db);
        defaultProjects.forEach((proj, index) => {
          const p = { ...proj, order: index } as Project;
          const docRef = doc(db, "projects", p.id.toString());
          batch.set(docRef, p);
        });
        await batch.commit();
        
        const projects = defaultProjects as Project[];
        projectsCache = projects.map((p, i) => ({ ...p, order: i }));
        return projectsCache;
      }

      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push(doc.data() as Project);
      });
      
      projectsCache = projects.sort((a, b) => (a.order || 0) - (b.order || 0));
      return projectsCache;
    } catch (error) {
      console.error("Erro ao buscar projetos do Firebase:", error);
      return defaultProjects as Project[];
    } finally {
      // Limpa a promessa para que futuras chamadas não travem se der erro
      cachePromise = null;
    }
  })();

  return cachePromise;
}

// Invalida o cache
export function invalidateCache() {
  projectsCache = null;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    // Atualiza a ordem e salva todos os projetos
    projects.forEach((proj, index) => {
      proj.order = index;
      const docRef = doc(db, "projects", proj.id.toString());
      batch.set(docRef, proj);
    });
    await batch.commit();
    invalidateCache();
  } catch (error) {
    console.error("Erro ao salvar projetos no Firebase:", error);
  }
}

export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  const projects = await getProjects();
  const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
  const newProject = { ...project, id: maxId + 1, order: 0 } as Project;
  
  if (project.images && project.images.length > 0) {
    newProject.image = project.images[0];
  }
  
  // Coloca o novo projeto no topo e salva o array inteiro para recalcular as ordens
  projects.unshift(newProject);
  await saveProjects(projects);
  invalidateCache();
  return newProject;
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<void> {
  try {
    if (updates.images && updates.images.length > 0) {
      updates.image = updates.images[0];
    }
    
    // Atualiza apenas o documento específico no Firebase, super rápido!
    await updateDoc(doc(db, "projects", id.toString()), updates);
    invalidateCache();
  } catch (error) {
    console.error("Erro ao atualizar o projeto no Firebase:", error);
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await deleteDoc(doc(db, "projects", id.toString()));
    invalidateCache();
  } catch (err) {
    console.error("Erro ao deletar do Firebase", err);
  }
}
