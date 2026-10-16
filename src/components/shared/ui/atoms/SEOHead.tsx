import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, buildJsonLd, getSeoPage, pageUrl } from '../../../../utils/jsonld';

interface SEOHeadProps {
  /** Ruta de la página (debe estar en src/data/seoPages.json). De ahí salen título, descripción, canónica y datos estructurados. */
  path: string;
  noIndex?: boolean;
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/whatsapp-share.png`;

// Una sola fuente de metadatos por página. La canónica sale SIEMPRE de la ruta registrada y nunca de
// window.location: durante el prerender la URL es localhost y terminaba en la etiqueta canonical.
const SEOHead: React.FC<SEOHeadProps> = ({ path, noIndex = false, ogImage = DEFAULT_OG_IMAGE }) => {
  const page = getSeoPage(path);
  const url = pageUrl(path);
  const robots = noIndex
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="es-CO" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ai4U" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${page.name} · Ai4U`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@_ai4u_" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${page.name} · Ai4U`} />

      <script type="application/ld+json">{JSON.stringify(buildJsonLd(path))}</script>
    </Helmet>
  );
};

export default SEOHead;
