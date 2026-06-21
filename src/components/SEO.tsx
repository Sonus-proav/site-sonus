import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  keywords?: string;
  schema?: object;
}

export function SEO({ 
  title, 
  description, 
  image = 'https://sonusproaudio.com.br/sobre-sonus.jpg', 
  url = 'https://sonusproaudio.com.br',
  type = 'website',
  noindex = false,
  keywords,
  schema
}: SEOProps) {
  const absoluteImage = image.startsWith('http') ? image : `https://sonusproaudio.com.br${image.startsWith('/') ? '' : '/'}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />

      {/* JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
