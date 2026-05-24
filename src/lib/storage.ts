import { collection, doc, getDocs, deleteDoc, writeBatch, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
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

export async function getProjects(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    
    // Se o banco estiver vazio, migramos os dados antigos automaticamente
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
      return projects.map((p, i) => ({ ...p, order: i }));
    }

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      projects.push(doc.data() as Project);
    });
    
    // Retorna os projetos ordenados pela ordem definida no Admin
    return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Erro ao buscar projetos do Firebase:", error);
    return defaultProjects as Project[];
  }
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
  return newProject;
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<void> {
  try {
    if (updates.images && updates.images.length > 0) {
      updates.image = updates.images[0];
    }
    
    // Atualiza apenas o documento específico no Firebase, super rápido!
    await updateDoc(doc(db, "projects", id.toString()), updates);
  } catch (error) {
    console.error("Erro ao atualizar o projeto no Firebase:", error);
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await deleteDoc(doc(db, "projects", id.toString()));
  } catch (err) {
    console.error("Erro ao deletar do Firebase", err);
  }
}
