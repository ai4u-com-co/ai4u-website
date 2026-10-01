import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring';
import { useErrorTracking } from '../hooks';
import { getHomeStructuredData, getPageMetaTags } from '../utils/seo';
import { clients } from '../data/clients';
import { ALL_AGENTS } from '../data/agents';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;
const problemUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent('hola, quiero contarles qué me quita más tiempo en mi empresa')}`;

// Avatar determinista por nombre: rejilla 9×9 simétrica, tinta sobre papel.
const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
};
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const Identicon: React.FC<{ name: string }> = ({ name }) => {
  const N = 9;
  const next = rng(hash(name));
  const cells: JSX.Element[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < 5; x++) {
      if (next() > 0.5) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
        if (x < 4) cells.push(<rect key={`m${x}-${y}`} x={N - 1 - x} y={y} width={1} height={1} />);
      }
    }
  }
  return (
    <svg viewBox="-1 -1 11 11" role="img" aria-label={name} fill="#1d1d1d" shapeRendering="crispEdges">
      {cells}
    </svg>
  );
};

const SERVICES_INDEX: { title: string; text: string; to?: string; href?: string }[] = [
  { title: 'Agentes', text: 'Hacen el trabajo repetitivo, todo el día: leen pedidos y facturas, cobran la cartera y responden mensajes.', to: ROUTES.AGENTES },
  { title: 'Dashboards', text: 'Ves cómo va tu empresa sin pedir reportes y chateas con ella: le preguntas a tus datos y responde en tiempo real.', to: ROUTES.DASHBOARDS },
  { title: 'A tu medida', text: 'Lo que no existe, lo construimos: software y automatizaciones pensados para tu operación.', to: ROUTES.SERVICES },
  { title: 'Sitios web', text: 'Sitios y tiendas con diseño propio, hechos para trabajar por ti.', to: ROUTES.SITIOS_WEB },
];

const Home = () => {
  usePerformanceMonitoring('home', { lcp: 2000, fcp: 1500 });

  const { addContext } = useErrorTracking();
  React.useEffect(() => {
    addContext('page', 'home');
    addContext('userAgent', navigator.userAgent.substring(0, 100));
  }, [addContext]);

  const metaTags = getPageMetaTags('home');
  const structuredData = getHomeStructuredData();
  const shown = clients.filter(c => c.id !== 'ai4u');
  const top = () => scrollToTop('auto');

  return (
    <div className="a4">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/"
        structuredData={structuredData}
      />

      <section className="a4-hero a4-wrap" aria-label="Inicio">
        <div className="a4-orb" aria-hidden="true">
          <div className="a4-sphere"><img alt="" src="/assets/images/isotipo-negro.png" /></div>
          <i /><i /><i />
        </div>
        <div className="a4-hero-in">
          <p className="a4-cap">Ai4U · Inteligencia artificial para tu operación</p>
          <h1 className="a4-display a4-slab">Recupera<br /><span className="a4-soft">tu tiempo.</span></h1>
          <p className="a4-lead" style={{ maxWidth: 560 }}>Ai4U pone inteligencia artificial a trabajar en la operación de tu empresa. Los agentes hacen el trabajo repetitivo, los dashboards te muestran cómo va todo y, cuando hace falta, construimos a tu medida.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 28px' }}>
            <a className="a4-ghost" href={problemUrl} target="_blank" rel="noopener noreferrer">Cuéntanos tu problema →</a>
            <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Ver los agentes →</Link>
          </div>
        </div>
        <span className="a4-scroll a4-cap" aria-hidden="true">Scroll ↓</span>
      </section>

      <section className="a4-block a4-wrap">
        <div className="a4-two">
          <div className="a4-stack">
            <p className="a4-cap" style={{ fontSize: 15 }}>Ai4U, en una frase</p>
            <Link className="a4-ghost" to={ROUTES.WHY_AI4U} onClick={top} style={{ justifySelf: 'start' }}>Sobre Ai4U →</Link>
          </div>
          <p style={{ margin: 0 }}>
            Los agentes leen pedidos y facturas, cobran la cartera y responden mensajes. Los dashboards muestran ventas, cartera y producción. Lo que no existe, lo construimos a tu medida. Trabajan las 24 horas y una persona revisa lo que importa.
          </p>
        </div>
      </section>

      <section className="a4-block a4-wrap">
        <p className="a4-cap">Lo que hacemos</p>
        <div className="a4-idx">
          {SERVICES_INDEX.map(s => {
            const inner = (
              <>
                <h3 className="a4-sub">{s.title}</h3>
                <p className="a4-sm">{s.text}</p>
                <span className="a4-arr" aria-hidden="true">→</span>
              </>
            );
            return s.to ? (
              <Link key={s.title} to={s.to} onClick={top}>{inner}</Link>
            ) : (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer">{inner}</a>
            );
          })}
        </div>
      </section>

      <section className="a4-block a4-wrap">
        <p className="a4-cap">Trabajo reciente</p>
        <div className="a4-cards">
          <article className="a4-card">
            <p className="a4-cap">Producto</p>
            <h3 className="a4-h-sm">orderLoader</h3>
            <div className="a4-flow" role="img" aria-label="Correo, agente, tu sistema"><b>Correo</b><em /><b>Agente</b><em /><b>Tu sistema</b></div>
            <p className="a4-sm">Lee el pedido que llega por correo y lo crea en tu sistema. En producción en dos plantas, las 24 horas, sin digitación.</p>
            <Link className="a4-ghost" to={ROUTES.ORDER_LOADER} onClick={top} style={{ justifySelf: 'start' }}>Ver orderLoader →</Link>
          </article>
          <article className="a4-card">
            <p className="a4-cap">Catálogo</p>
            <h3 className="a4-h-sm">{ALL_AGENTS.length} agentes</h3>
            <div className="a4-avatars" aria-hidden="true">
              {ALL_AGENTS.map(a => <Identicon key={a.name} name={a.name} />)}
            </div>
            <p className="a4-sm">Pedidos, cobros, dashboards, planta, atención al cliente, contenido y la fábrica que construye a los demás.</p>
            <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top} style={{ justifySelf: 'start' }}>Ver el catálogo →</Link>
          </article>
          <article className="a4-card wide">
            <p className="a4-cap">Sitios web</p>
            <h3 className="a4-h-sm">Plataformas de alto rendimiento</h3>
            <div className="a4-shots">
              <figure>
                <img loading="lazy" width={1200} height={750} alt="Captura del sitio de La Magdalena: paisaje, sección Historias y obra literaria" src="/assets/images/cases/screenshots/lamagdalena-site.jpg" />
                <figcaption className="a4-cap">La Magdalena · lamagdalena.com.co</figcaption>
              </figure>
              <figure>
                <img loading="lazy" width={1200} height={750} alt="Captura del portafolio de dirección de arte de Catalina Romero" src="/assets/images/cases/screenshots/cromero-site.jpg" />
                <figcaption className="a4-cap">Catalina Romero · cromero.vercel.app</figcaption>
              </figure>
            </div>
            <Link className="a4-ghost" to={ROUTES.SITIOS_WEB} onClick={top} style={{ justifySelf: 'start' }}>Ver sitios web →</Link>
          </article>
        </div>
        <p style={{ margin: '30px 0 0' }}>
          <Link className="a4-pill" to={ROUTES.PORTFOLIO} onClick={top}>Todo el trabajo →</Link>
        </p>
      </section>

      <section className="a4-block a4-wrap">
        <p className="a4-cap">Ya trabajan con agentes</p>
        <div className="a4-logos">
          {shown.map(c => <div key={c.id}>{c.name}</div>)}
          <div><a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">¿Tu empresa? →</a></div>
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Qué te quita más tiempo?</h2>
        <p className="a4-sm" style={{ marginTop: 24 }}>Cuéntanos tu problema y te decimos qué agente lo resolvería.</p>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
        <div className="a4-contact a4-sm">
          <span className="a4-num">+57 302 490 6414</span>
          <span className="a4-num">hola@ai4u.com.co</span>
          <span>Medellín, Colombia</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
