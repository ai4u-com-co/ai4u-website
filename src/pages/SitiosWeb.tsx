import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { usePerformanceMonitoring } from '../hooks';
import { APP_CONFIG, ROUTES } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/sitios-web.css';

const waUrl = (message: string) =>
  `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(message)}`;

const PLANS = [
  {
    n: '01',
    name: 'Landing',
    desc: 'Una página, sin backend. Lista para publicar y empezar a recibir tráfico.',
    ctaText: 'Cotizar landing',
    message: 'Hola, quiero cotizar un sitio tipo landing (sin backend).',
  },
  {
    n: '02',
    name: 'Con backend',
    desc: 'Formulario, base de datos, lógica propia: la misma landing, con capacidad real detrás.',
    ctaText: 'Cotizar con backend',
    message: 'Hola, quiero cotizar un sitio con backend (formulario, base de datos, lógica propia).',
  },
];

const SITES = [
  {
    name: 'La Magdalena',
    desc: 'Estudio de storytelling de impacto social y ambiental.',
    url: 'https://www.lamagdalena.com.co',
    label: 'lamagdalena.com.co',
    image: '/assets/images/cases/screenshots/lamagdalena-site.jpg',
  },
  {
    name: 'Catalina Romero',
    desc: 'Portafolio de dirección de arte, estilismo y narrativa visual.',
    url: 'https://cromero.vercel.app/',
    label: 'cromero.vercel.app',
    image: '/assets/images/cases/screenshots/cromero-site.jpg',
  },
  {
    name: 'Nakoa',
    desc: 'Perfumería de autor: lo invisible del territorio, en frasco.',
    url: 'https://nakoa-web.vercel.app/',
    label: 'nakoa-web.vercel.app',
    image: '/assets/images/cases/screenshots/nakoa-site.jpg',
  },
];

const SitiosWeb: React.FC = () => {
  usePerformanceMonitoring('sitios-web', { lcp: 2500, fcp: 1800 });
  const winsRef = React.useRef<HTMLDivElement>(null);

  // Sin cursor (táctil) no hay hover: se mueve solo la vista previa más a la vista.
  React.useEffect(() => {
    const root = winsRef.current;
    if (!root || !window.matchMedia('(hover: none)').matches || !('IntersectionObserver' in window)) return;
    const wins = Array.from(root.querySelectorAll<HTMLElement>('.a4-sw-win'));
    const ratios = new Map<HTMLElement, number>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.set(e.target as HTMLElement, e.intersectionRatio));
      let best: HTMLElement | null = null;
      let bestRatio = 0.5;
      ratios.forEach((r, el) => { if (r > bestRatio) { best = el; bestRatio = r; } });
      wins.forEach((w) => w.classList.toggle('is-active', w === best));
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    wins.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title="Sitios Web | AI4U"
        description="Landing pages y sitios con backend, arquitectura de alto rendimiento, entregados en días. Cotización por WhatsApp."
        canonical="https://www.ai4u.com.co/sitios-web"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Ai4U · Sitios web</p>
        <h1 className="a4-display">Sitios<br />web</h1>
        <p className="a4-lead">Plataformas web de alto rendimiento. Arquitectura optimizada, sin vueltas: entregado y tuyo.</p>
      </header>

      <section className="a4-section a4-wrap" aria-label="Opciones">
        <div className="a4-sec-label"><span className="a4-cap">Qué construimos</span></div>
        <div className="a4-grid two-col">
          {PLANS.map((plan) => (
            <article className="a4-card" key={plan.n}>
              <p className="a4-cap a4-num">{plan.n}</p>
              <h2 className="a4-h-sm">{plan.name}</h2>
              <p className="a4-sm">{plan.desc}</p>
              <a className="a4-ghost" href={waUrl(plan.message)} target="_blank" rel="noopener noreferrer" style={{ justifySelf: 'start' }}>
                {plan.ctaText} →
              </a>
            </article>
          ))}
        </div>
        <ul className="a4-points" style={{ marginTop: 30 }}>
          <li>Optimización SEO y LCP</li>
          <li>Entrega en ~14 días</li>
        </ul>
      </section>

      <section className="a4-section a4-wrap" aria-label="Sitios que hemos construido">
        <div className="a4-sec-label"><span className="a4-cap">Sitios que hemos construido</span></div>
        <div className="a4-sw-wins" ref={winsRef}>
          {SITES.map((site) => (
            <a key={site.name} className="a4-sw-win" href={site.url} target="_blank" rel="noopener noreferrer">
              <div className="a4-sw-bar">
                <span className="a4-sw-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="a4-cap a4-num">{site.label}</span>
              </div>
              <div
                className="a4-sw-shot"
                role="img"
                aria-label={`Recorrido del landing de ${site.name}`}
                style={{ backgroundImage: `url(${site.image})` }}
              />
              <div className="a4-sw-meta">
                <h3 className="a4-sub">{site.name}</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  <p className="a4-sm">{site.desc}</p>
                  <span className="a4-cap">Visitar {site.label} →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '12ch' }}>¿Lo construimos?</h2>
        <div style={{ marginTop: 32 }}>
          <a className="a4-ghost" href={waUrl(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
            Escríbenos por WhatsApp →
          </a>
        </div>
        <p className="a4-cap" style={{ marginTop: 40 }}>Sigue explorando</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 28px' }}>
          <Link className="a4-ghost" to={ROUTES.ORDER_LOADER} onClick={top}>orderLoader →</Link>
          <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Agentes →</Link>
          <Link className="a4-ghost" to={ROUTES.PORTFOLIO} onClick={top}>Portafolio →</Link>
        </div>
      </section>
    </div>
  );
};

export default SitiosWeb;
