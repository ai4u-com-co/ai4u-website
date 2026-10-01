import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/shared/ui/atoms';
import { SuperAIModal } from '@/components/shared/ui/organisms';
import { useServicesContext } from '@/context';
import { usePerformanceMonitoring } from '@/hooks';
import { getServicesStructuredData, getPageMetaTags } from '@/utils/seo';
import { getRelatedLinks } from '@/data/internalLinkingStrategy';
import { APP_CONFIG } from '@/utils/constants';
import { scrollToTop } from '@/utils/helpers';
import '@/styles/site-v2.css';
import '@/styles/pages/services.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Camino 1 — cualquier empresa que ya tenga un ERP (SAP Business One incluido,
// pero no exclusivo). Nos conectamos directo — es tu primera línea de IA.
const ERP_ITEMS = [
  { n: '01', name: 'dashboards en vivo', desc: 'ventas, cartera, inventario y producción conectados en tiempo real a tu ERP.' },
  { n: '02', name: 'automatización de procesos', desc: 'pedidos, cartera, facturación — el proceso que más tiempo te cuesta, resuelto.' },
  { n: '03', name: 'agentes conectados a tu ERP', desc: 'chat, alertas y cobranza que hablan con la data real de tu sistema.' },
];

// Camino 2 — cualquier pyme, sin ERP, que quiere lo mismo: un equipo digital
// trabajando todos los días.
const PYME_ITEMS = [
  { n: '01', name: 'empleado de automatización', desc: 'mensualidad fija, entrega continua — el proceso que elijas, automatizado y mantenido.' },
  { n: '02', name: 'agentes especializados', desc: 'servicio al cliente, prospección o cobranza — un rol completo, no una herramienta.' },
];

// Grupos del laboratorio — por lo que hacen, no por su nombre interno.
const LAB_GROUPS: { label: string; category: string }[] = [
  { label: 'automatización', category: 'automation' },
  { label: 'analítica', category: 'analytics' },
  { label: 'asistentes ia', category: 'ai_assistant' },
  { label: 'e-commerce', category: 'ecommerce' },
  { label: 'consultoría', category: 'consulting' },
  { label: 'formación', category: 'training' },
];

const STEPS = [
  { n: '01', t: 'Diagnóstico', d: 'Oportunidades reales.' },
  { n: '02', t: 'Priorización', d: 'Foco en resultados.' },
  { n: '03', t: 'Desarrollo', d: 'IA a tu medida.' },
  { n: '04', t: 'Despliegue', d: 'Integración y soporte.' },
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

const Services: React.FC = () => {
  const [isSuperAIModalOpen, setIsSuperAIModalOpen] = useState(false);
  const { getFilteredServices } = useServicesContext();

  usePerformanceMonitoring('services', { lcp: 2500, fcp: 1800 });

  const metaTags = getPageMetaTags('services');
  const structuredData = getServicesStructuredData();
  const relatedLinks = getRelatedLinks('/servicios').slice(0, 3);
  const top = () => scrollToTop('auto');

  // Todo lo que también hemos construido — evidencia de rango, no la oferta
  // principal. Sitios web vive en su propia página. Agrupado por categoría real.
  const labServices = getFilteredServices().filter(s => s.id !== 'desarrollo-web');
  const labGroups = LAB_GROUPS
    .map(g => ({ ...g, items: labServices.filter(s => s.category === g.category) }))
    .filter(g => g.items.length > 0);

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
        <p className="a4-cap">Servicios · Ai4U</p>
        <h1 className="a4-display">Agentes<br />dentro de tu<br />operación</h1>
        <p className="a4-lead a4-sm">Dos caminos, un solo objetivo: que tu operación trabaje sola.</p>
      </header>

      <section className="a4-section a4-wrap" aria-labelledby="camino-1">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Camino 01</span></div>
        <div className="a4-two">
          <div className="a4-stack">
            <h2 className="a4-h-sm" id="camino-1">Si tu empresa ya tiene un ERP</h2>
            <p className="a4-sm">Nos conectamos directo a tu ERP y se vuelve tu primera línea de inteligencia artificial. Ya lo hicimos en producción para empresas que corren SAP Business One.</p>
          </div>
          <Rows items={ERP_ITEMS} />
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="camino-2">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Camino 02</span></div>
        <div className="a4-two">
          <div className="a4-stack">
            <h2 className="a4-h-sm" id="camino-2">Si no tienes un ERP, pero quieres lo mismo</h2>
            <p className="a4-sm">Un equipo digital trabajando todos los días, sin importar qué sistema uses hoy.</p>
          </div>
          <Rows items={PYME_ITEMS} />
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Todo incluido">
        <div className="a4-card" style={{ gap: 22 }}>
          <p className="a4-cap">Todo incluido</p>
          <h2 className="a4-h-sm">Los dos caminos, en uno solo</h2>
          <p className="a4-sm" style={{ maxWidth: 520 }}>Contrato mínimo de 1 año. El software siempre es de Ai4U y se cobra mientras siga corriendo.</p>
          <div>
            <a className="a4-pill" href={`https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent('Hola, quiero cotizar el plan Todo Incluido (los dos caminos en uno).')}`} target="_blank" rel="noopener noreferrer">Cotizar este plan →</a>
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="laboratorio">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Laboratorio</span></div>
        <h2 className="a4-h-lg" id="laboratorio" style={{ maxWidth: '14ch' }}>Lo que también hemos construido</h2>
        <p className="a4-sm" style={{ marginTop: 20, maxWidth: 560 }}>No es el catálogo principal: es la prueba de que, cuando hace falta, también lo resolvemos.</p>
        <div className="a4-services-lab">
          {labGroups.map((group) => (
            <div key={group.category}>
              <p className="a4-cap">{group.label}</p>
              <ul>
                {group.items.map((service) => (
                  <li key={service.id}>
                    {service.id === 'super-ai' ? (
                      <button type="button" onClick={() => setIsSuperAIModalOpen(true)}>{service.description}</button>
                    ) : (
                      <span className="a4-sm">{service.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="metodo">
        <div className="a4-sec-label"><span className="a4-cap a4-num">Método</span></div>
        <h2 className="a4-h-lg" id="metodo">Método directo</h2>
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

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '12ch' }}>¿Empezamos?</h2>
        <div style={{ marginTop: 24 }}>
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

      <SuperAIModal
        open={isSuperAIModalOpen}
        onClose={() => setIsSuperAIModalOpen(false)}
      />
    </div>
  );
};

export default Services;
