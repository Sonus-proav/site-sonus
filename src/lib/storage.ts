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
    console.error("Falha ao buscar projetos da API Local", err);
  }
  return [
    { id: 1, title: "Auditório da Cresol", category: "auditórios", image: "https://images.unsplash.com/photo-1507676184212-d0330a151f93?q=80&w=2069&auto=format&fit=crop" },
    { id: 2, title: "Sala de video conferência | Cresol", category: "corporativos", image: "/cresol.jpg" },
    { id: 3, title: "Igreja Matriz de Xanxerê - SC", category: "igrejas", image: "/xanxere.jpg" },
    { id: 4, title: "Auditório Cesul", category: "auditórios", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop" },
    { id: 5, title: "Centro Admin | Cresol Dois Vizinhos", category: "corporativos", image: "/cresol-dv.png" },
    { id: 6, title: "Matriz de São Miguel do Oeste", category: "igrejas", image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=2070&auto=format&fit=crop" }
  ];
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
