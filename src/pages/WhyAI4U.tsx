import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { usePerformanceMonitoring } from '../hooks';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { clients } from '../data/clients';
import { APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/why.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const ROLES = ['Fundador de AI4U', 'Cofundador de Matt Movilidad', 'Especialista en Automatización'];

const BENEFITS = [
  { title: 'Diagnóstico gratuito', text: 'Identificamos oportunidades reales sin costo.' },
  { title: 'IA que evoluciona', text: 'Aprende y mejora con tu negocio.' },
  { title: 'Resultados medibles', text: 'Definimos contigo qué se mide y lo revisamos juntos.' },
];

// Hechos cualitativos y verdaderos, sin promesas numéricas.
const FACTS = [
  { value: '24/7', label: 'Agentes trabajando, incluso mientras tú no estás' },
  { value: 'Menos', label: 'Tiempo en tareas repetitivas: tu equipo se enfoca en lo que importa' },
  { value: 'En vivo', label: 'La información de tu negocio, lista para decidir' },
];

const WhyAI4U = () => {
  usePerformanceMonitoring('why-ai4u', { lcp: 2500, fcp: 1800 });
  const metaTags = getPageMetaTags('why');
  const relatedLinks = getRelatedLinks('/por-que-ai4u');
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/por-que-ai4u"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Por qué Ai4U</p>
        <h1 className="a4-display">La parte<br />humana<br />de la IA</h1>
      </header>

      <section className="a4-section a4-wrap" aria-label="Fundador">
        <div className="a4-two">
          <figure className="a4-why-fig">
            <img loading="lazy" width={800} height={900} src="/assets/images/mariano.jpeg" alt="Mariano, fundador de Ai4U" />
            <figcaption className="a4-cap">Mariano · Fundador</figcaption>
          </figure>
          <div className="a4-stack" style={{ gap: 28 }}>
            <p className="a4-cap">Quién está detrás</p>
            <div className="a4-rows">
              {ROLES.map(r => <div key={r} className="a4-row" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}><span className="k">{r}</span></div>)}
            </div>
            <p style={{ margin: 0 }}>Experiencia en startups, movilidad y tecnología. Soluciones que funcionan.</p>
            <a className="a4-ghost" href="https://www.linkedin.com/in/mariano3/" target="_blank" rel="noopener noreferrer" style={{ justifySelf: 'start' }}>LinkedIn →</a>
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Qué nos hace diferentes">
        <div className="a4-sec-label"><span className="a4-cap">Qué nos hace diferentes</span></div>
        <div className="a4-cards" style={{ marginTop: 0 }}>
          {BENEFITS.map((b, i) => (
            <article key={b.title} className="a4-card" style={{ gridColumn: 'span 2' }}>
              <p className="a4-cap a4-num">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="a4-h-sm">{b.title}</h3>
              <p className="a4-sm">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Nuestros clientes">
        <p className="a4-cap">Nuestros clientes</p>
        <div className="a4-why-clients">
          {clients.map(c => (
            <div key={c.id}>
              <div className="logo"><img loading="lazy" src={c.logo} alt={c.name} /></div>
              <div>
                <b>{c.name}</b>
                <span className="a4-cap" style={{ marginTop: 4 }}>{c.sector}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="a4-sm" style={{ marginTop: 24 }}>Alianzas en innovación que perduran.</p>
      </section>

      <section className="a4-section a4-wrap" aria-label="Resultados">
        <div className="a4-two">
          <div className="a4-stack">
            <p className="a4-cap">Resultados</p>
            <h2 className="a4-h-lg">Resultados que hablan</h2>
            <p className="a4-sm">IA que genera crecimiento real y tangible.</p>
            <div className="a4-why-orb" aria-hidden="true"><div className="a4-sphere" /></div>
          </div>
          <div className="a4-rows">
            {FACTS.map(f => (
              <div key={f.value} className="a4-row">
                <span className="a4-why-stat">{f.value}</span>
                <p className="a4-sm" style={{ fontSize: 17 }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Conoce más">
        <p className="a4-cap">Conoce más sobre nuestro trabajo</p>
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
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Listo para ser el próximo éxito?</h2>
        <div style={{ marginTop: 24 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
      </section>
    </div>
  );
};

export default WhyAI4U;
