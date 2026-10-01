import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/shared/ui/atoms';
import { usePerformanceMonitoring } from '@/hooks';
import { getServicesStructuredData, getPageMetaTags } from '@/utils/seo';
import { getRelatedLinks } from '@/data/internalLinkingStrategy';
import { ROUTES, APP_CONFIG } from '@/utils/constants';
import { scrollToTop } from '@/utils/helpers';
import '@/styles/site-v2.css';
import '@/styles/pages/services.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Qué construimos a la medida de cada operación.
const QUE_CONSTRUIMOS = [
  { n: '01', name: 'Software y automatizaciones', desc: 'El proceso que más tiempo te cuesta, resuelto: pedidos, cotizaciones, facturación, planeación de producción.', to: undefined as string | undefined },
  { n: '02', name: 'Conexión con tus sistemas', desc: 'Tu sistema de gestión, tu correo y WhatsApp trabajando juntos para que la información fluya sin digitar.', to: undefined },
  { n: '03', name: 'Dashboards a tu medida', desc: 'Las cifras que necesitas, siempre al día y con alertas.', to: ROUTES.DASHBOARDS },
  { n: '04', name: 'Sitios web', desc: 'Sitios y tiendas con diseño propio, hechos para trabajar por ti.', to: ROUTES.SITIOS_WEB },
];

// Cómo trabajamos: de entender la operación a dejarla funcionando.
const STEPS = [
  { n: '01', t: 'Diagnóstico', d: 'Entendemos tu operación y escogemos lo que más tiempo te cuesta.' },
  { n: '02', t: 'Construcción', d: 'Lo armamos contigo, reutilizando lo que ya funciona.' },
  { n: '03', t: 'Puesta en marcha', d: 'Entra a trabajar con una persona revisando lo que importa.' },
  { n: '04', t: 'Mantenimiento', d: 'Lo mantenemos funcionando y lo mejoramos con tu operación.' },
];

// Cosas que ya construimos a la medida de un cliente.
const EJEMPLOS = [
  { cliente: 'Tamaprint', name: 'Cotizador', desc: 'Cotiza al instante y deja la cotización lista en el sistema.' },
  { cliente: 'Flexoimpresos', name: 'Planeador de producción', desc: 'Ordena las órdenes por máquina y las muestra en una pantalla junto a cada una.' },
  { cliente: 'Tamaprint', name: 'Creación de artículos', desc: 'Crea el artículo nuevo y su lista de materiales según la tecnología, sin armarlo a mano.' },
  { cliente: 'Tamaprint', name: 'Revisión de artes', desc: 'Revisa el arte antes de producir y avisa si algo debe corregirse.' },
  { cliente: 'La Magdalena', name: 'Transcriptor de audios', desc: 'Convierte grabaciones largas en texto, con quién dijo qué y a qué hora.' },
  { cliente: 'Estudio Índigo', name: 'Atención a huéspedes', desc: 'Responde mensajes, mantiene calendarios al día y avisa al equipo de aseo.' },
];

const Services: React.FC = () => {
  usePerformanceMonitoring('services', { lcp: 2500, fcp: 1800 });

  const metaTags = getPageMetaTags('services');
  const structuredData = getServicesStructuredData();
  const relatedLinks = getRelatedLinks(ROUTES.SERVICES).slice(0, 3);
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/servicios"
        structuredData={structuredData}
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">A tu medida · Ai4U</p>
        <h1 className="a4-display">A tu<br />medida</h1>
        <p className="a4-lead a4-sm">Lo que no existe, lo construimos. Software, automatizaciones y sitios web pensados para tu operación, y después los mantenemos funcionando.</p>
      </header>

      <section className="a4-section a4-wrap" aria-labelledby="que-construimos">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Qué construimos</span></div>
        <div className="a4-two">
          <div className="a4-stack">
            <h2 className="a4-h-sm" id="que-construimos">Empezamos por el proceso que más tiempo te cuesta</h2>
            <p className="a4-sm">Si ya existe un agente o un dashboard que lo resuelve, lo usamos. Si no existe, lo construimos.</p>
          </div>
          <div className="a4-rows">
            {QUE_CONSTRUIMOS.map((item) => (
              <div className="a4-row" key={item.n}>
                <div>
                  <span className="a4-cap a4-num">{item.n}</span>
                  <h3 className="a4-sub" style={{ marginTop: 8 }}>{item.name}</h3>
                </div>
                <div className="a4-stack">
                  <p className="a4-sm">{item.desc}</p>
                  {item.to && (
                    <Link className="a4-ghost" to={item.to} onClick={top} style={{ justifySelf: 'start' }}>Ver más →</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="como-trabajamos">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Cómo trabajamos</span></div>
        <h2 className="a4-h-lg" id="como-trabajamos" style={{ maxWidth: '16ch' }}>De entender a dejarlo funcionando</h2>
        <div className="a4-services-steps">
          {STEPS.map((step) => (
            <div className="a4-card" key={step.n}>
              <span className="a4-cap a4-num">{step.n}</span>
              <h3 className="a4-sub">{step.t}</h3>
              <p className="a4-sm">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="ya-hicimos">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Lo que ya hicimos</span></div>
        <h2 className="a4-h-lg" id="ya-hicimos" style={{ maxWidth: '14ch' }}>A la medida de cada cliente</h2>
        <div className="a4-rows" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
          {EJEMPLOS.map((e) => (
            <div className="a4-row three" key={e.name}>
              <span className="a4-cap">{e.cliente}</span>
              <h3 className="a4-sub">{e.name}</h3>
              <p className="a4-sm">{e.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: '30px 0 0' }}>
          <Link className="a4-pill" to={ROUTES.PORTFOLIO} onClick={top}>Ver los casos →</Link>
        </p>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Qué te quita más tiempo?</h2>
        <p className="a4-sm" style={{ marginTop: 24 }}>Lo escuchamos y te decimos cómo lo resolveríamos.</p>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp →</a>
        </div>
        {relatedLinks.length > 0 && (
          <>
            <p className="a4-cap" style={{ marginTop: 40 }}>Sigue explorando</p>
            <div className="a4-services-related">
              {relatedLinks.map((l) => (
                <Link key={l.to} className="a4-ghost" to={l.to} onClick={top}>{l.label} →</Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Services;
