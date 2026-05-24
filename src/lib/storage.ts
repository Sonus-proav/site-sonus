import defaultProjects from "../../data/projects.json";

export interface Project {
  id: number;
  title: string;
  category: "auditórios" | "teatros" | "igrejas" | "corporativos" | string;
  image: string;
  images?: string[]; // Suporte para o carrossel
  seoAlt?: string;
  description?: string;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch('/api/projects');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API Local indisponível. Usando dados estáticos de fallback.");
  }
  return defaultProjects as Project[];
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects)
    });
  } catch (err) {
    console.error("Falha ao salvar projetos na API Local", err);
  }
}

export async function addProject(project: Omit<Project, "id">): Promise<Project> {
  const projects = await getProjects();
  const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
  const newProject = { ...project, id: maxId + 1 } as Project;
  
  if (project.images && project.images.length > 0) {
    newProject.image = project.images[0];
  }
  
  projects.unshift(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    const updated = { ...projects[index], ...updates };
    if (updated.images && updated.images.length > 0) {
      updated.image = updated.images[0];
    }
    projects[index] = updated;
    await saveProjects(projects);
  }
}

export async function deleteProject(id: number): Promise<void> {
  let projects = await getProjects();
  projects = projects.filter(p => p.id !== id);
  await saveProjects(projects);
}
