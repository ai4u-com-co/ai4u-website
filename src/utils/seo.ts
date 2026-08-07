// Utilidades para SEO y Structured Data
import { Service } from '../types/service';

// Structured Data para página de inicio
export const getHomeStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AI4U",
  "url": "https://www.ai4u.com.co",
  "description": "Soluciones de Inteligencia Artificial personalizadas para tu negocio",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.ai4u.com.co/servicios?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// Structured Data para página de servicios
export const getServicesStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Servicios de Inteligencia Artificial",
  "description": "Catálogo completo de servicios de IA personalizados",
  "url": "https://www.ai4u.com.co/servicios",
  "numberOfItems": 4,
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "Operación",
      "description": "Eficiencia continua. Optimiza tiempo y recursos.",
      "url": "https://www.ai4u.com.co/servicios#OPERATION"
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "Estrategia",
      "description": "Data real. Decisiones con ventaja competitiva.",
      "url": "https://www.ai4u.com.co/servicios#STRATEGY"
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "Educación",
      "description": "Evolución humana. Tu equipo dominando la IA.",
      "url": "https://www.ai4u.com.co/servicios#EDUCATION"
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "Transformación",
      "description": "Infraestructura IA. Diseñada para escalar.",
      "url": "https://www.ai4u.com.co/servicios#TRANSFORMATION"
    }
  ]
});

// Structured Data para servicio individual
export const getServiceStructuredData = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "AI4U",
    "url": "https://www.ai4u.com.co"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Colombia"
  },
  "serviceType": service.category,
  "offers": {
    "@type": "Offer",
    "price": service.price || "Consultar",
    "priceCurrency": "COP",
    "availability": "https://schema.org/InStock"
  }
});

// Structured Data para página de casos de uso
export const getUseCasesStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Casos de Uso de IA",
  "description": "Casos de éxito y aplicaciones de inteligencia artificial",
  "url": "https://www.ai4u.com.co/casos-de-uso",
  "itemListElement": [
    {
      "@type": "CreativeWork",
      "position": 1,
      "name": "Automatización de Atención al Cliente",
      "description": "Chatbots inteligentes para atención 24/7"
    },
    {
      "@type": "CreativeWork",
      "position": 2,
      "name": "Análisis de Datos Empresariales",
      "description": "Machine Learning para insights de negocio"
    },
    {
      "@type": "CreativeWork",
      "position": 3,
      "name": "Optimización de Procesos",
      "description": "IA para mejorar eficiencia operacional"
    }
  ]
});

// Structured Data para FAQ
export const getFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Structured Data para breadcrumbs
export const getBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Meta tags optimizados por página
export const getPageMetaTags = (page: string) => {
  const metaTags = {
    home: {
      title: "AI4U - Recupera tu Tiempo con Equipos de Agentes de IA",
      description: "El tiempo es oro. Te ayudamos a crear y administrar tu equipo de agentes de IA para orquestar tu libertad operativa. Infraestructura privada y segura.",
      keywords: "infraestructura IA, agentes de IA, orquestación IA, digital workforce, AI4U, capa de inteligencia, automatización empresarial, Colombia"
    },
    services: {
      title: "Servicios de Inteligencia Artificial | AI4U",
      description: "Soluciones de IA organizadas en 4 ejes: Operación, Estrategia, Educación y Transformación. IA diseñada para resolver problemas reales.",
      keywords: "servicios IA, operación IA, estrategia IA, educación IA, transformación digital IA, agentes de IA"
    },
    why: {
      title: "¿Por qué AI4U? | Casos de Éxito e Infraestructura de IA",
      description: "Descubre por qué somos tu mejor aliado en IA. Explora nuestros casos de éxito y la metodología que genera resultados reales.",
      keywords: "por qué AI4U, casos de éxito IA, ventajas IA, experiencia inteligencia artificial, resultados IA, Colombia"
    },
    portfolio: {
      title: "Portafolio de Innovación | Proyectos de IA | AI4U",
      description: "Explora nuestro portafolio de innovación. Proyectos reales de IA aplicados a diferentes industrias: desde Fashion Tech hasta E-Mobility.",
      keywords: "portafolio innovación, proyectos IA, casos éxito IA, IA aplicada, Fashion Tech IA, E-Mobility IA"
    },
    agentes: {
      title: "Agentes de IA en Producción | AI4U",
      description: "Los agentes que hoy trabajan en operaciones reales: tickets, servicio al cliente, automatización de ERP y contenido. No es una demo, es lo que ya corre.",
      keywords: "agentes de IA, equipo de agentes, automatización IA, agentes en producción, AI4U"
    }
  };

  return metaTags[page as keyof typeof metaTags] || metaTags.home;
};

// Generar URL canónica
export const getCanonicalUrl = (path: string = '') => {
  const baseUrl = 'https://www.ai4u.com.co';
  return `${baseUrl}${path}`;
};

// Validar y limpiar meta description
export const cleanMetaDescription = (description: string, maxLength: number = 160) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
};

// Generar keywords optimizados
export const generateKeywords = (baseKeywords: string[], additionalKeywords: string[] = []) => {
  const allKeywords = [...baseKeywords, ...additionalKeywords];
  return allKeywords.join(', ');
}; 