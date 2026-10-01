import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { CASES } from '../data/cases';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/portfolio.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Ruta /portafolio, mostrada como "Casos": se conserva la URL por continuidad en buscadores.
const Portfolio = () => {
  const metaTags = getPageMetaTags('portfolio');
  const relatedLinks = getRelatedLinks(ROUTES.PORTFOLIO);
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/portafolio"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Casos · {CASES.length} empresas</p>
        <h1 className="a4-display">Casos</h1>
        <p className="a4-lead">Empresas que ya trabajan con agentes de Ai4U.</p>
      </header>

      <section className="a4-section a4-wrap" aria-label="Casos">
        <div className="a4-cases">
          {CASES.map((c, index) => (
            <article className="a4-case" key={c.id} id={c.id}>
              <div className="a4-case-head">
                <span className="a4-cap a4-num">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="a4-h-sm">{c.name}</h2>
                <p className="a4-cap">{c.sector}</p>
              </div>
              <div className="a4-case-body">
                <p>{c.resumen}</p>
                {c.website && (
                  <a className="a4-ghost" href={c.website} target="_blank" rel="noopener noreferrer" style={{ justifySelf: 'start' }}>Visitar sitio →</a>
                )}
              </div>
            </article>
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
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Cuál sería tu caso?</h2>
        <div style={{ marginTop: 24 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
