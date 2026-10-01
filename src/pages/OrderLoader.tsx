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

const STEPS = [
  { n: '01', name: 'Llega el correo', desc: 'Un pedido entra a la bandeja del cliente, en el formato que sea: PDF, Excel, texto plano.' },
  { n: '02', name: 'orderLoader lo lee', desc: 'Extrae artículos, cantidades, cliente, fechas. Sin plantilla fija, sin digitación manual.' },
  { n: '03', name: 'Crea el pedido en tu ERP', desc: 'La orden queda lista para producción en tu ERP, sin que nadie la haya tipeado.' },
];

const FACTS = [
  { n: '2', label: 'Plantas en producción', detail: 'Tamaprint y Flexoimpresos, mismo motor, sin bifurcar código.' },
  { n: '24/7', label: 'Sin turnos', detail: 'Corre solo, todos los días, no espera a que alguien lo revise.' },
  { n: '0', label: 'Digitación manual', detail: 'El pedido nace en tu ERP directo desde el correo del cliente.' },
];

const OrderLoader: React.FC = () => {
  usePerformanceMonitoring('orderloader', { lcp: 2500, fcp: 1800 });
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead
        title="orderLoader | AI4U"
        description="El correo del pedido entra, la orden sale creada en tu ERP. Sin digitación manual, corriendo 24/7 en plantas de manufactura reales."
        canonical="https://www.ai4u.com.co/orderloader"
      />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Ai4U · Producto</p>
        <h1 className="a4-display" style={{ overflowWrap: 'anywhere' }}>orderLoader</h1>
        <p className="a4-lead">
          Un agente lee los correos de pedidos y los crea en tu ERP, sin que nadie los digite. Es el producto que originó a Ai4U y hoy corre en dos plantas reales.
        </p>
        <div className="a4-flow" role="img" aria-label="Correo, agente, ERP"><b>Correo</b><em /><b>Agente</b><em /><b>ERP</b></div>
      </header>

      <section className="a4-section a4-wrap" aria-label="Cómo funciona">
        <div className="a4-sec-label"><span className="a4-cap">Cómo funciona</span></div>
        <div className="a4-grid">
          {STEPS.map((step) => (
            <article className="a4-card" key={step.n}>
              <p className="a4-cap a4-num">{step.n}</p>
              <h2 className="a4-sub">{step.name}</h2>
              <p className="a4-sm">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="En producción">
        <div className="a4-sec-label"><span className="a4-cap">En producción, no en demo</span></div>
        <div className="a4-ol-facts">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <p className="a4-ol-big a4-num">{fact.n}</p>
              <p className="a4-cap">{fact.label}</p>
              <p className="a4-sm">{fact.detail}</p>
            </div>
          ))}
        </div>
        <ul className="a4-points" style={{ marginTop: 30 }}>
          <li>Mismo motor, configuración por planta, sin bifurcar código por cliente</li>
          <li>Se conecta a tu ERP por una única vía propia y controlada</li>
        </ul>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Tu equipo sigue digitando pedidos?</h2>
        <div style={{ marginTop: 32 }}>
          <a className="a4-ghost" href={waUrl('hola, vi orderLoader en la web y quiero saber más')} target="_blank" rel="noopener noreferrer">
            Escríbenos por WhatsApp →
          </a>
        </div>
        <p className="a4-cap" style={{ marginTop: 40 }}>Sigue explorando</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 28px' }}>
          <Link className="a4-ghost" to={ROUTES.SITIOS_WEB} onClick={top}>Sitios web →</Link>
          <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Agentes →</Link>
          <Link className="a4-ghost" to={ROUTES.PORTFOLIO} onClick={top}>Portafolio →</Link>
        </div>
      </section>
    </div>
  );
};

export default OrderLoader;
