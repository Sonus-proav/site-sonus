export async function onRequest(context) {
  // Passa a requisição adiante para pegar a resposta original (o HTML pré-renderizado ou outro asset)
  const response = await context.next();

  // Se não for um HTML, retornamos imediatamente sem modificar (poupa recursos)
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const url = new URL(context.request.url);
  const cleanPath = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";

  // Rotas já pré-renderizadas no build pelo scripts/prerender.js (já possuem <SEO /> completo e exato)
  const prerenderedStaticRoutes = new Set([
    "/",
    "/projetos",
    "/auditorios-e-teatros",
    "/plenarios-e-camaras",
    "/igrejas-e-templos",
    "/salas-reuniao",
    "/bares-e-casas-noturnas",
    "/educacao",
    "/podcasts",
    "/solucoes",
    "/qsys",
    "/links",
  ]);

  if (response.status === 200 && prerenderedStaticRoutes.has(cleanPath)) {
    return response;
  }

  // Dicionário base de SEO (usado apenas em fallbacks SPA quando não há HTML pré-renderizado)
  const seoData = {
    "/": {
      title: "Sonus Pro AV | Integração de Áudio e Vídeo para Ambientes Profissionais",
      desc: "Projetamos e instalamos sistemas de som, videoconferência e automação. Transformamos auditórios, salas de reunião e plenários em espaços fáceis de usar e totalmente integrados à rede da empresa.",
      img: "/sobre-sonus.webp",
    },
    "/igrejas-e-templos": {
      title: "Engenharia de Áudio para Igrejas e Templos | Sonus Pro AV",
      desc: "Sistemas de sonorização focados na inteligibilidade da palavra falada e musical. Controle a pressão sonora e bloqueie microfonias.",
      img: "/interior-matriz-xanxere.webp",
    },
    "/auditorios-e-teatros": {
      title: "Engenharia Audiovisual para Auditórios | Sonus Pro AV",
      desc: "Infraestrutura de sonorização, roteamento de vídeo e automação projetada para eventos de grande porte, garantindo cobertura acústica uniforme.",
      img: "/auditorio-sonus.webp",
    },
    "/salas-reuniao": {
      title: "Videoconferência e Automação para Diretorias | Sonus Pro AV",
      desc: "Padronize suas salas de reunião corporativas. Integração nativa de áudio, vídeo e controle projetada para iniciar reuniões no horário previsto.",
      img: "/salas-corporativas.webp",
    },
    "/qsys": {
      title: "Plataforma Q-SYS: Integração AV em Rede | Sonus Pro AV",
      desc: "Processamento centralizado de Áudio, Vídeo e Controle (AV&C) baseado em software. Substitua múltiplos equipamentos analógicos por uma infraestrutura IP.",
      img: "/qsys-tech-bg.webp",
    },
    "/projetos": {
      title: "Portfólio de Projetos Audiovisuais | Sonus Pro AV",
      desc: "Conheça nossos cases de sucesso em sonorização e automação corporativa para empresas, auditórios e igrejas.",
      img: "/pato-branco.webp",
    },
    "/educacao": {
      title: "Engenharia Audiovisual para Educação e Ensino Híbrido Q-SYS | Sonus Pro AV",
      desc: "Padronização de salas de aula híbridas (HyFlex), auditórios, salas divisíveis e campus paging com ecossistema Q-SYS. Operação One-Touch para docentes e gestão remota Q-SYS Reflect para TI.",
      img: "/teatro-unisep.webp",
    },
    "/podcasts": {
      title: "Estúdios e Salas de Podcast 100% Autônomos com Q-SYS | Sonus Pro Audio",
      desc: "Projetos turn-key de estúdios de podcast corporativos e profissionais 100% autônomos. Automação Q-SYS em um toque, corte de câmera por voz e entrega automática em 9:16, 1:1 e 16:9.",
      img: "/mixer-vu-bg.webp",
    },
    "/plenarios-e-camaras": {
      title: "Integração Audiovisual para o Legislativo | Sonus Pro AV",
      desc: "Sistemas dedicados à organização do rito legislativo. Automação de corte de câmeras, gerenciamento de uso da palavra e painel de votação eletrônica nominal.",
      img: "/plenario-thumb.webp",
    },
    "/bares-e-casas-noturnas": {
      title: "Sonorização Profissional para Bares e Clubes | Sonus Pro AV",
      desc: "Infraestrutura de áudio de alta pressão sonora para a pista, com controle eletrônico rigoroso de limites de emissão.",
      img: "/soundwave-bg.webp",
    },
    "/solucoes": {
      title: "Ecossistema de Soluções | Sonus Pro AV",
      desc: "Conheça nossas verticais de tecnologia audiovisual: Educação, Estúdios de Podcast, Plenários, Salas Corporativas, Auditórios, Igrejas, Bares e Integração Q-SYS.",
      img: "/qsys-tech-bg.webp",
    },
  };

  let meta = seoData[cleanPath];

  // Tratar rota dinâmica de projetos individuais (ex: /projetos/12)
  if (cleanPath.startsWith("/projetos/") && cleanPath.length > 10) {
    // Se já existir arquivo HTML pré-renderizado no build, não sobrescreve
    if (response.status === 200) {
      return response;
    }

    const projectId = cleanPath.split("/")[2];
    try {
      // Fazemos o fetch na API pública do Firestore sem precisar do SDK pesado do Firebase
      const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
      if (res.ok) {
        const json = await res.json();
        const docs = json.documents || [];
        const projectDoc = docs.find((d) => {
          const idVal = d.fields.id?.integerValue || d.fields.id?.stringValue;
          return idVal == projectId;
        });

        if (projectDoc) {
          meta = {
            title: `${projectDoc.fields.title?.stringValue || "Projeto"} | Portfólio Sonus`,
            desc: (projectDoc.fields.description?.stringValue || "Conheça mais este incrível projeto audiovisual realizado pela Sonus.").substring(0, 155) + "...",
            img: projectDoc.fields.image?.stringValue || "/pato-branco.webp",
          };
        }
      }
    } catch (e) {
      // Falha silenciosa: não sobrescreve
    }
  }

  // Sem correspondência exata: retorna a resposta original sem sobrescrever com dados da Home
  if (!meta) return response;

  const absoluteImg = meta.img.startsWith("http")
    ? meta.img
    : `https://sonusproaudio.com.br${meta.img.startsWith("/") ? "" : "/"}${meta.img}`;

  // Usamos o HTMLRewriter nativo do Cloudflare para sobrescrever as meta tags em milissegundos
  class MetaHandler {
    element(element) {
      const name = element.getAttribute("name");
      const prop = element.getAttribute("property");

      if (name === "title" || prop === "og:title" || prop === "twitter:title" || name === "twitter:title") {
        element.setAttribute("content", meta.title);
      }
      if (name === "description" || prop === "og:description" || prop === "twitter:description" || name === "twitter:description") {
        element.setAttribute("content", meta.desc);
      }
      if (prop === "og:image" || prop === "twitter:image" || name === "twitter:image") {
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
    .on("title", new TitleHandler())
    .on("meta", new MetaHandler())
    .transform(response);
}
