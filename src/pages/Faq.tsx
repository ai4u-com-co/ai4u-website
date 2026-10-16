import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { FAQ } from '../data/faq';
import { ROUTES, APP_CONFIG } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/faq.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Todas las respuestas van visibles (sin acordeón): lo que ve la persona es lo mismo que leen los buscadores
// y los asistentes de IA, y coincide con el FAQPage de los datos estructurados.
const Faq: React.FC = () => {
  const top = () => scrollToTop('auto');

  return (
    <div className="a4 a4-page">
      <SEOHead path="/preguntas-frecuentes" />

      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Ai4U · Preguntas frecuentes</p>
        <h1 className="a4-display">Preguntas<br />frecuentes</h1>
        <p className="a4-lead">Lo que más nos preguntan sobre Ai4U, los agentes de IA y cómo empezar.</p>
      </header>

      <section className="a4-section a4-wrap" aria-label="Preguntas y respuestas">
        <div className="a4-rows">
          {FAQ.map((f) => (
            <article className="a4-row a4-faq" key={f.id} id={f.id}>
              <h2 className="a4-faq-q">{f.question}</h2>
              <p className="a4-faq-a">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>¿Te quedó una pregunta?</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>Escríbenos</h2>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
        </div>
        <p className="a4-cap" style={{ marginTop: 40 }}>Sigue explorando</p>
        <div className="a4-faq-related">
          <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Agentes →</Link>
          <Link className="a4-ghost" to={ROUTES.SERVICES} onClick={top}>A tu medida →</Link>
          <Link className="a4-ghost" to={ROUTES.WHY_AI4U} onClick={top}>Nosotros →</Link>
        </div>
      </section>
    </div>
  );
};

export default Faq;
