import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'AI4U - Inteligencia Artificial para tu Negocio',
  description = 'AI4U es la primera capa de inteligencia de tu empresa. Equipos de agentes de IA que trabajan como parte de tu equipo.',
  keywords = 'inteligencia artificial, IA, automatización, agentes de IA, capa de inteligencia, AI empresarial, Colombia',
  canonical,
  ogImage = 'https://www.ai4u.com.co/assets/images/whatsapp-share.png',
  ogType = 'website',
  structuredData,
  noIndex = false,
  noFollow = false,
}) => {
  const fullTitle = title.includes('AI4U') ? title : `${title} | AI4U`;
  const fullCanonical = canonical || window.location.href;
  const robotsContent = noIndex || noFollow 
    ? `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="AI4U - Inteligencia Artificial para tu Negocio" />
      <meta property="og:site_name" content="AI4U" />
      <meta property="og:locale" content="es_CO" />

      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content="AI4U - Inteligencia Artificial para tu Negocio" />
      <meta property="twitter:site" content="@ai4u_co" />
      <meta property="twitter:creator" content="@ai4u_co" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead; 