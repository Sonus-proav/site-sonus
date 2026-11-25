export const SITE_URL = "https://sonusproaudio.com.br";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SONUS_ORGANIZATION = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: "Sonus Pro Audio",
  legalName: "Sonus Pro Audio e Video",
  alternateName: ["Sonus Pro AV", "Sonus Pro Audio e Video", "Sonus"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  taxID: "02.484.642/0001-39",
  telephone: "+5546920013151",
  email: "sonusproaudio@gmail.com",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Curitiba, 2187",
    addressLocality: "Francisco Beltrão",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "Country", name: "Brazil" },
    { "@type": "Continent", name: "Latin America" },
  ],
  knowsAbout: [
    "Engenharia Audiovisual",
    "Ecossistema Q-SYS",
    "Q-SYS Reflect",
    "Q-SYS VisionSuite",
    "Projetos Acústicos",
    "Automação Corporativa e Educacional",
    "Salas de Aula Híbridas (HyFlex)",
    "Estúdios de Podcast Autônomos",
    "Videoconferência Corporativa",
    "Plenários e Câmaras Legislativas",
    "Dante Audio over IP",
  ],
  sameAs: [
    "https://instagram.com/sonus.av",
    "https://br.linkedin.com/company/sonus-pro-av",
  ],
} as const;

export const SONUS_WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Sonus Pro Audio",
  alternateName: "Sonus Pro AV",
  inLanguage: "pt-BR",
  publisher: { "@id": ORG_ID },
} as const;

export const SONUS_OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Soluções de Tecnologia e Engenharia Audiovisual",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Engenharia Audiovisual para Educação e Ensino Híbrido Q-SYS",
        url: `${SITE_URL}/educacao`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Estúdios e Salas de Podcast 100% Autônomos",
        url: `${SITE_URL}/podcasts`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Design, Programação e Integração Q-SYS",
        url: `${SITE_URL}/qsys`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Salas Corporativas de Videoconferência e Automação",
        url: `${SITE_URL}/salas-reuniao`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sonorização e Acústica de Auditórios e Teatros",
        url: `${SITE_URL}/auditorios-e-teatros`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Automação de Plenários e Câmaras Municipais",
        url: `${SITE_URL}/plenarios-e-camaras`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sonorização e Engenharia Acústica para Igrejas e Templos",
        url: `${SITE_URL}/igrejas-e-templos`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sonorização Profissional e Laudo Acústico para Bares e Casas Noturnas",
        url: `${SITE_URL}/bares-e-casas-noturnas`,
      },
    },
  ],
} as const;

export function buildBreadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function buildGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [SONUS_ORGANIZATION, SONUS_WEBSITE, ...nodes],
  };
}
