import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { featuredProjects } from '../data/featuredProjects';
import { APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/portfolio.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Las categorías vienen en camelCase desde los datos; se muestran legibles.
const CATEGORY_LABELS: Record<string, string> = {
  manufactura: 'Manufactura',
  impactStorytelling: 'Storytelling de impacto',
  eMobility: 'Movilidad eléctrica',
  bienestarYEducacion: 'Bienestar y educación',
  arquitecturaYDiseno: 'Arquitectura y diseño',
  fashionTech: 'Fashion tech',
  eventosYBranding: 'Eventos y branding',
  gastronomia: 'Gastronomía',
};

const Portfolio = () => {
  const metaTags = getPageMetaTags('portfolio');
  const relatedLinks = getRelatedLinks('/portafolio');
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://ai4u.com.co/portafolio"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Casos · Ai4U</p>
        <h1 className="a4-display">Casos</h1>
        <p className="a4-lead">Cómo trabajan hoy las empresas que ya usan agentes de Ai4U.</p>
      </header>

      <section className="a4-section a4-wrap" aria-label="Proyectos">
        <div className="a4-portfolio-grid">
          {featuredProjects.map((project, index) => (
            <a
              key={project.id}
              className="a4-portfolio-card"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="a4-portfolio-top">
                <span className="a4-cap a4-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="a4-cap">{CATEGORY_LABELS[project.category] ?? project.category}</span>
              </div>
              <h2 className="a4-h-sm">{project.title}</h2>
              <img loading="lazy" width={1600} height={900} src={project.image} alt={`Captura de ${project.title}`} />
              <p className="a4-sm">{project.description}</p>
              <span className="a4-ghost">Ver proyecto →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Sigue explorando">
        <p className="a4-cap">Sigue explorando</p>
        <div className="a4-idx">
          {relatedLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={top}>
              <h3 className="a4-sub">{l.label}</h3>
              <p className="a4-sm">{l.context ?? ''}</p>
              <span className="a4-arr" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '12ch' }}>¿Lo construimos?</h2>
        <div style={{ marginTop: 24 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
