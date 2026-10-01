import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent('hola, quiero ver cómo va mi empresa en un dashboard')}`;

// Lo que se ve en un dashboard de Ai4U. Sin cifras: cada empresa ve las suyas.
const VISTAS = [
  { n: '01', name: 'Ventas', desc: 'Por cliente, vendedor y mes, comparado con el año anterior.' },
  { n: '02', name: 'Cartera', desc: 'Quién debe, cuánto y desde cuándo, ordenado por lo que más pesa.' },
  { n: '03', name: 'Producción', desc: 'Qué se está produciendo y qué va atrasado, también en pantallas junto a cada máquina.' },
  { n: '04', name: 'Cumplimiento de entregas', desc: 'Lo prometido frente a lo entregado, por línea de producto.' },
  { n: '05', name: 'Finanzas', desc: 'Estado de resultados y principales cuentas al día, con el detalle a un clic.' },
];

const ADEMAS = [
  { n: '01', name: 'Alertas', desc: 'Te avisan cuando una cifra se sale de lo normal, para que alguien actúe a tiempo.' },
  { n: '02', name: 'Asistente del dashboard', desc: 'Un copiloto dentro del panel, siempre con el estado real de tu operación.' },
];

// Preguntas de ejemplo, sin cifras: el chat responde con los datos de cada empresa.
const PREGUNTAS = [
  '¿Cuánto vendimos este mes, por vendedor?',
  '¿Qué clientes tienen la cartera más vencida?',
  '¿Qué órdenes de producción van atrasadas?',
  '¿Cuánto inventario tenemos de este artículo?',
];

const Rows: React.FC<{ items: { n: string; name: string; desc: string }[] }> = ({ items }) => (
  <div className="a4-rows">
    {items.map((item) => (
      <div className="a4-row" key={item.n}>
        <div>
          <span className="a4-cap a4-num">{item.n}</span>
          <h3 className="a4-sub" style={{ marginTop: 8 }}>{item.name}</h3>
        </div>
        <p className="a4-sm">{item.desc}</p>
      </div>
    ))}
  </div>
);

const Dashboards: React.FC = () => {
  const metaTags = getPageMetaTags('dashboards');
  const relatedLinks = getRelatedLinks(ROUTES.DASHBOARDS);
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/dashboards"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Dashboards · Ai4U</p>
        <h1 className="a4-display">Cómo va<br />tu empresa</h1>
        <p className="a4-lead a4-sm">Ventas, cartera, producción y cumplimiento en un solo lugar, siempre al día, y un chat para preguntarle lo que quieras a tu empresa. Sin pedir reportes.</p>
      </header>

      <section className="a4-section a4-wrap" aria-labelledby="chat">
        <div className="a4-card wide" style={{ gap: 22 }}>
          <p className="a4-cap">Lo más poderoso</p>
          <h2 className="a4-h-lg" id="chat" style={{ maxWidth: '16ch' }}>Chatea con tu empresa</h2>
          <p style={{ maxWidth: '60ch' }}>Un chat conectado a tus bases de datos y a tu sistema de gestión. Le hablas como a una persona y consulta y actúa sobre tus datos en tiempo real, sin pedirle nada a nadie ni esperar un reporte.</p>
          <ul className="a4-prompts" aria-label="Ejemplos de preguntas">
            {PREGUNTAS.map((q) => <li key={q}>{q}</li>)}
          </ul>
          <p className="a4-note">Las respuestas salen de los datos de tu empresa, no de un ejemplo.</p>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="que-ves">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Qué ves</span></div>
        <div className="a4-two">
          <div className="a4-stack">
            <h2 className="a4-h-sm" id="que-ves">La información que hoy armas a mano</h2>
            <p className="a4-sm">Los dashboards leen directamente de los sistemas que ya usas. Los datos son los de tu empresa, no los de un ejemplo.</p>
          </div>
          <Rows items={VISTAS} />
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="ademas">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Además</span></div>
        <div className="a4-two">
          <div className="a4-stack">
            <h2 className="a4-h-sm" id="ademas">No solo mirar: actuar</h2>
            <p className="a4-sm">Un dashboard sirve cuando alguien se entera a tiempo. Por eso se ve, se pregunta y avisa.</p>
          </div>
          <Rows items={ADEMAS} />
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="como-se-conecta">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Cómo funciona</span></div>
        <h2 className="a4-h-lg" id="como-se-conecta" style={{ maxWidth: '14ch' }}>Se conecta a lo que ya usas</h2>
        <div className="a4-flow" role="img" aria-label="Tu sistema, dashboard, tu equipo" style={{ marginTop: 32 }}>
          <b>Tu sistema</b><em /><b>Dashboard</b><em /><b>Alerta a tu equipo</b>
        </div>
        <p className="a4-sm" style={{ marginTop: 24, maxWidth: 560 }}>No cambias tu forma de trabajar ni migras datos. El dashboard se arma sobre tu operación y una persona revisa que lo que ves sea lo que pasa.</p>
      </section>

      <section className="a4-section a4-wrap" aria-label="Dónde ya funciona">
        <div className="a4-card" style={{ gap: 22 }}>
          <p className="a4-cap">Ya funciona</p>
          <h2 className="a4-h-sm">En empresas reales</h2>
          <p className="a4-sm" style={{ maxWidth: 520 }}>Empresas de manufactura y de contenido ya ven su operación en dashboards de Ai4U.</p>
          <div>
            <Link className="a4-pill" to={ROUTES.PORTFOLIO} onClick={top}>Ver los casos →</Link>
          </div>
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Qué quieres ver?</h2>
        <p className="a4-sm" style={{ marginTop: 24 }}>Cuéntanos qué cifras te gustaría tener a la mano y cómo las armas hoy.</p>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
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

export default Dashboards;
