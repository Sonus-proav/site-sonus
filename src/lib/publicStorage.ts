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
  problem?: string;
  solution?: string;
  tags?: string[];
}

export function optimizeImageUrl(url: string, width: number = 800): string {
  if (!url || !url.includes("firebasestorage.googleapis.com")) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=60`;
}

let projectsCache: Project[] | null = null;
let cachePromise: Promise<Project[]> | null = null;

export function getCachedProjects(): Project[] | null {
  return projectsCache;
}

export async function getProjects(): Promise<Project[]> {
  if (cachePromise) return cachePromise;
  if (projectsCache) return projectsCache;

  cachePromise = (async () => {
    try {
      // Uso da REST API nativa para evitar os 300KB do Firebase SDK!
      const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
      if (!res.ok) throw new Error("Falha na API");
      const json = await res.json();
      
      if (!json.documents || json.documents.length === 0) {
        throw new Error("Vazio");
      }

      const projects: Project[] = json.documents.map((doc: any) => {
        const f = doc.fields;
        const images = f.images?.arrayValue?.values ? f.images.arrayValue.values.map((v: any) => v.stringValue) : [];
        const tags = f.tags?.arrayValue?.values ? f.tags.arrayValue.values.map((v: any) => v.stringValue) : [];
        return {
          id: parseInt(f.id?.integerValue || f.id?.stringValue || "0"),
          title: f.title?.stringValue || "",
          category: f.category?.stringValue || "",
          image: f.image?.stringValue || "",
          images: images,
          seoAlt: f.seoAlt?.stringValue || "",
          description: f.description?.stringValue || "",
          order: parseInt(f.order?.integerValue || "0"),
          isHidden: f.isHidden?.booleanValue || false,
          problem: f.problem?.stringValue || "",
          solution: f.solution?.stringValue || "",
          tags: tags
        };
      });

      projectsCache = projects.sort((a, b) => (a.order || 0) - (b.order || 0));
      return projectsCache;
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      // Retorna array vazio para evitar crash - o usuário verá a mensagem "sem projetos"
      projectsCache = [];
      return [];
    } finally {
      cachePromise = null;
    }
  })();

  return cachePromise;
}
