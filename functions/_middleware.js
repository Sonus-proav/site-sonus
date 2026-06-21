export async function onRequest(context) {
  // Passa a requisição adiante para pegar a resposta original (o index.html ou outro asset)
  const response = await context.next();
  
  // Se não for um HTML, retornamos imediatamente sem modificar (poupa recursos)
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const url = new URL(context.request.url);
  const path = url.pathname;

  // Dicionário base de SEO
  const seoData = {
    "/": { title: "Sonus Pro AV | Projetos de Sonorização e Automação Corporativa", desc: "Especialistas em integração audiovisual de alta performance. Projetos de sonorização, acústica e automação para empresas, auditórios e igrejas. 28 anos de mercado.", img: "/sobre-sonus.jpg" },
    "/igrejas-e-templos": { title: "Sonorização para Igrejas e Templos | Sonus Pro AV", desc: "A mensagem de fé precisa ser ouvida com clareza. Soluções audiovisuais premium para igrejas, com foco em inteligibilidade e operação simplificada para voluntários.", img: "/interior-matriz-xanxere.jpg" },
    "/auditorios-e-teatros": { title: "Áudio para Auditórios e Teatros | Sonus Pro AV", desc: "Soluções audiovisuais de alta performance para grandes eventos. Integração Q-SYS e Shure com foco em inteligibilidade e falha zero.", img: "/auditorio-sonus.jpg" },
    "/salas-reuniao": { title: "Automação de Salas de Reunião e Videoconferência | Sonus Pro AV", desc: "Projetos de captação de áudio invisível, acústica e automação para salas de diretoria. Instalação premium certificada Microsoft Teams e Zoom Rooms.", img: "/salas-corporativas.jpg" },
    "/qsys": { title: "Integração e Instalação Q-SYS | Automação AV | Sonus Pro AV", desc: "Integração audiovisual com o ecossistema Q-SYS. Controle de áudio, vídeo e automação corporativa centralizada, sem limite de escalabilidade.", img: "/qsys-tech-bg.png" },
    "/projetos": { title: "Portfólio de Projetos Audiovisuais | Sonus Pro AV", desc: "Conheça nossos cases de sucesso em sonorização e automação corporativa para empresas, auditórios e igrejas.", img: "/pato-branco.jpg" },
  };

  let meta = seoData[path];

  // Tratar rota dinâmica de projetos individuais (ex: /projetos/12)
  if (path.startsWith("/projetos/") && path.length > 10) {
    const projectId = path.split("/")[2];
    try {
      // Fazemos o fetch na API pública do Firestore sem precisar do SDK pesado do Firebase
      const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
      if (res.ok) {
        const json = await res.json();
        const docs = json.documents || [];
        const projectDoc = docs.find(d => {
          const idVal = d.fields.id?.integerValue || d.fields.id?.stringValue;
          return idVal == projectId;
        });
        
        if (projectDoc) {
          meta = {
            title: `${projectDoc.fields.title?.stringValue || 'Projeto'} | Portfólio Sonus`,
            desc: (projectDoc.fields.description?.stringValue || "Conheça mais este incrível projeto audiovisual realizado pela Sonus.").substring(0, 155) + "...",
            img: projectDoc.fields.image?.stringValue || "/pato-branco.jpg"
          };
        }
      }
    } catch (e) {
      // Falha silenciosa: usa o fallback
    }
  }

  // Fallback final se a rota não estiver mapeada
  if (!meta) meta = seoData["/"];

  const absoluteImg = meta.img.startsWith("http") ? meta.img : `https://sonusproaudio.com.br${meta.img.startsWith('/') ? '' : '/'}${meta.img}`;

  // Usamos o HTMLRewriter nativo do Cloudflare para sobrescrever as meta tags em milissegundos
  class MetaHandler {
    element(element) {
      const name = element.getAttribute("name");
      const prop = element.getAttribute("property");

      if (name === "title" || prop === "og:title" || prop === "twitter:title") {
        element.setAttribute("content", meta.title);
      }
      if (name === "description" || prop === "og:description" || prop === "twitter:description") {
        element.setAttribute("content", meta.desc);
      }
      if (prop === "og:image" || prop === "twitter:image") {
        element.setAttribute("content", absoluteImg);
      }
    }
  }

  class TitleHandler {
    element(element) {
      element.setInnerContent(meta.title);
    }
  }

  return new HTMLRewriter()
    .on('title', new TitleHandler())
    .on('meta', new MetaHandler())
    .transform(response);
}
