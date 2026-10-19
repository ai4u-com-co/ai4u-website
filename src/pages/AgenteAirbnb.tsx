import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { AIRBNB_PATH, MOMENTOS, CAPACIDADES, CONTROLES, AIRBNB_FAQ } from '../data/airbnb';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/faq.css';
import '../styles/pages/airbnb.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent('hola, quiero el agente para mis apartamentos de Airbnb')}`;

// Landing del agente para anfitriones de Airbnb. Nace del caso de Estudio Índigo; no es una integración oficial de Airbnb.
const AgenteAirbnb: React.FC = () => {
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead path={AIRBNB_PATH} />

      <header className="a4-page-head a4-wrap a4-bnb-head">
        <div>
          <nav className="a4-cap" aria-label="Ruta">
            <Link to={ROUTES.AGENTES} onClick={top}>Agentes</Link> · Hospitalidad
          </nav>
          <h1 className="a4-h-lg a4-bnb-title">Tu agente para Airbnb</h1>
          <p className="a4-lead">
            Acompaña cada reserva de principio a fin: escribe a tus huéspedes, los registra, avisa al aseo y te entrega las cuentas. Tú atiendes lo que de verdad necesita a una persona.
          </p>
          <p className="a4-bnb-actions">
            <a className="a4-pill" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
            <a className="a4-ghost" href="#recorrido">Ver el recorrido</a>
          </p>
        </div>

        <figure className="a4-bnb-chat" aria-label="Ejemplo ilustrativo de una conversación">
          <figcaption className="a4-cap">Ejemplo ilustrativo</figcaption>
          <p className="a4-bnb-msg in">¿Hay parqueadero para dos carros?</p>
          <p className="a4-bnb-msg out">Sí, el parqueadero es gratuito y queda en la entrada. Si necesitas algo más, el equipo te escribe enseguida.</p>
          <p className="a4-bnb-msg in">¿Y a qué hora puedo llegar?</p>
          <p className="a4-bnb-msg out">El check-in es desde las 3 p. m. Un rato antes te llegan las indicaciones y la guía de la casa.</p>
          <p className="a4-bnb-note a4-cap">Lo que no sabe, te lo pasa a ti</p>
        </figure>
      </header>

      <section className="a4-section a4-wrap" id="recorrido" aria-labelledby="bnb-recorrido">
        <div className="a4-sec-label"><span className="a4-cap">El recorrido de una reserva</span></div>
        <h2 className="a4-h-lg" id="bnb-recorrido" style={{ maxWidth: '14ch' }}>Siete momentos, cero mensajes a mano</h2>
        <ol className="a4-rows a4-bnb-steps">
          {MOMENTOS.map((m, i) => (
            <li className="a4-row three" key={m.titulo}>
              <span className="a4-cap">{String(i + 1).padStart(2, '0')} · {m.cuando}</span>
              <h3 className="a4-sub">{m.titulo}</h3>
              <p className="a4-sm">{m.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="bnb-hace">
        <div className="a4-sec-label"><span className="a4-cap">Qué hace</span></div>
        <h2 className="a4-h-lg" id="bnb-hace" style={{ maxWidth: '14ch' }}>Más que contestar mensajes</h2>
        <div className="a4-grid a4-bnb-grid">
          {CAPACIDADES.map((c) => (
            <article className="a4-bnb-card" key={c.titulo}>
              <h3 className="a4-sub">{c.titulo}</h3>
              <p className="a4-sm">{c.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="bnb-controlas">
        <div className="a4-sec-label"><span className="a4-cap">Quién decide</span></div>
        <h2 className="a4-h-lg" id="bnb-controlas" style={{ maxWidth: '14ch' }}>Lo que sigues controlando tú</h2>
        <ul className="a4-rows a4-bnb-list">
          {CONTROLES.map((c) => (
            <li className="a4-row" key={c}><p className="a4-sm" style={{ gridColumn: '1 / -1' }}>{c}</p></li>
          ))}
        </ul>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="bnb-caso">
        <div className="a4-sec-label"><span className="a4-cap">Dónde ya funciona</span></div>
        <h2 className="a4-h-lg" id="bnb-caso" style={{ maxWidth: '14ch' }}>Nació en apartamentos de verdad</h2>
        <div className="a4-prose" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }}>
          <p>
            Este agente se construyó con Estudio Índigo, que administra apartamentos de alquiler corto en El Retiro, Antioquia. Cada pieza de esta página existe porque a ellos les hizo falta: el mensaje que nadie se acordaba de mandar, el aseo que se coordinaba por WhatsApp y las cuentas que se armaban a mano a fin de mes.
          </p>
          <p>
            <Link className="a4-pill" to={ROUTES.PORTFOLIO} onClick={top}>Ver el caso →</Link>
          </p>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Preguntas sobre el agente para Airbnb">
        <div className="a4-sec-label"><span className="a4-cap">Preguntas frecuentes</span></div>
        <div className="a4-rows">
          {AIRBNB_FAQ.map((f) => (
            <article className="a4-row a4-faq" key={f.question}>
              <h2 className="a4-faq-q">{f.question}</h2>
              <p className="a4-faq-a">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>Recupera tus fines de semana</h2>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
        <p className="a4-faq-related">
          <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Ver todos los agentes →</Link>
          <Link className="a4-ghost" to={ROUTES.SERVICES} onClick={top}>A tu medida →</Link>
        </p>
      </section>
    </div>
  );
};

export default AgenteAirbnb;
