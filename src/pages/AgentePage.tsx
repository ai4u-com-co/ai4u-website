import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import FaceTile from '../components/agentes/FaceTile';
import { STATUS_LABEL, Pips } from '../components/agentes/AgentCard';
import { ALL_AGENTS, NIVELES } from '../data/agents';
import { TOOLS } from '../data/tools';
import { agentPath, agentFaq, cap } from '../data/agentPages';
import { slugify } from '../utils/slug';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/faq.css';
import '../styles/pages/agentes.css';
import '../styles/pages/agente.css';

// Ficha completa de un agente: la misma información de su tarjeta, en una página que se pueda enlazar, buscar y citar.
const AgentePage: React.FC = () => {
  const { slug = '' } = useParams();
  const agent = ALL_AGENTS.find((a) => slugify(a.name) === slug);
  if (!agent) return <Navigate to={ROUTES.AGENTES} replace />;

  const top = () => scrollToTop('auto');
  const nivel = NIVELES[agent.nivel];
  const faq = agentFaq(agent);
  const parecidos = ALL_AGENTS.filter((a) => a.category === agent.category && a.name !== agent.name).slice(0, 4);
  const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(`hola, quiero el agente ${agent.name}`)}`;

  return (
    <div className="a4 a4-page">
      <SEOHead path={agentPath(agent)} />

      <header className="a4-page-head a4-wrap a4-agente-head">
        <div>
          <nav className="a4-cap" aria-label="Ruta">
            <Link to={ROUTES.AGENTES} onClick={top}>Agentes</Link> · {agent.clase}
          </nav>
          <h1 className="a4-h-lg a4-agente-title">{cap(agent.name)}</h1>
          <p className="a4-lead">{cap(agent.pitch)}</p>
          <p className="a4-agente-meta">
            <span className={`a4-agentes-status ${agent.status}`}>{STATUS_LABEL[agent.status]}</span>
            <span className="a4-agentes-level"><Pips nivel={agent.nivel} /><span className="a4-cap">Nivel {agent.nivel} · {nivel.nombre}</span></span>
          </p>
        </div>
        <FaceTile name={agent.name} className="a4-agente-face" />
      </header>

      <section className="a4-section a4-wrap" aria-label="Cómo trabaja">
        <div className="a4-sec-label"><span className="a4-cap">Cómo trabaja</span></div>
        <dl className="a4-rows a4-agente-rows">
          <div className="a4-row"><dt className="a4-cap">Recibe</dt><dd>{agent.recibe}</dd></div>
          <div className="a4-row"><dt className="a4-cap">Entrega</dt><dd>{agent.entrega}</dd></div>
          <div className="a4-row"><dt className="a4-cap">Lo revisa</dt><dd>{agent.revisa}</dd></div>
          <div className="a4-row"><dt className="a4-cap">Supervisión</dt><dd>Nivel {agent.nivel} · {nivel.nombre}: {nivel.descripcion}.</dd></div>
          <div className="a4-row"><dt className="a4-cap">Horario</dt><dd>{agent.horario}</dd></div>
          {agent.tools.length > 0 && (
            <div className="a4-row"><dt className="a4-cap">Se conecta con</dt><dd>{agent.tools.map((t) => TOOLS[t].label).join(', ')}</dd></div>
          )}
        </dl>
      </section>

      <section className="a4-section a4-wrap" aria-label="Preguntas sobre este agente">
        <div className="a4-sec-label"><span className="a4-cap">Preguntas sobre este agente</span></div>
        <div className="a4-rows">
          {faq.map((f) => (
            <article className="a4-row a4-faq" key={f.question}>
              <h2 className="a4-faq-q">{f.question}</h2>
              <p className="a4-faq-a">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Lo quieres en tu equipo?</h2>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
        {parecidos.length > 0 && (
          <>
            <p className="a4-cap" style={{ marginTop: 40 }}>Otros agentes de esta área</p>
            <div className="a4-faq-related">
              {parecidos.map((a) => (
                <Link key={a.name} className="a4-ghost" to={agentPath(a)} onClick={top}>{cap(a.name)} →</Link>
              ))}
            </div>
          </>
        )}
        <div className="a4-faq-related" style={{ marginTop: 16 }}>
          <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Ver todos los agentes →</Link>
        </div>
      </section>
    </div>
  );
};

export default AgentePage;
