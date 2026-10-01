import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, APP_CONFIG } from '../../utils/constants';
import { clients } from '../../data/clients';
import '../../styles/site-v2.css';
import '../../styles/pages/pitch.css';

export interface DeckSlide {
  title: string;
  subtitle?: string;
  content: string | string[];
  type: 'title' | 'content' | 'section' | 'product' | 'offer' | 'cta';
  category?: string;
  showClients?: boolean;
}

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const pad = (n: number) => String(n).padStart(2, '0');

/** Presentación de diapositivas con la piel v2. Conserva teclado (← → espacio, Esc), reproducción automática y contador. */
const PitchDeck: React.FC<{ slides: DeckSlide[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const navigate = useNavigate();
  const current = slides[currentSlide];

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % slides.length), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') navigate(ROUTES.HOME);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextSlide, prevSlide, navigate]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const progress = ((currentSlide + 1) / slides.length) * 100;
  const lines = Array.isArray(current.content) ? current.content : null;
  const isTitle = current.type === 'title';
  const isCta = current.type === 'cta';

  return (
    <div className="a4 a4-page a4-pitch">
      <div className="a4-pitch-bar" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <div className="a4-wrap">
        <div className="a4-pitch-top">
          <span className="a4-cap">Presentación</span>
          <span className="a4-cap a4-num">{pad(currentSlide + 1)} / {pad(slides.length)}</span>
        </div>

        <section className="a4-pitch-stage" key={currentSlide} aria-live="polite" aria-label={`Diapositiva ${currentSlide + 1} de ${slides.length}`}>
          {isTitle && (
            <div className="a4-pitch-orb" aria-hidden="true"><img alt="" src="/assets/images/isotipo-negro.png" /></div>
          )}
          {current.category && <p className="a4-cap">{current.category}</p>}
          <h1 className={`a4-h-lg a4-pitch-title${isTitle ? ' big' : ''}`}>{current.title}</h1>

          {current.type === 'section' ? (
            <div className="a4-two">
              <p className="a4-cap">{current.subtitle}</p>
              <p className="a4-pitch-lead">{current.content}</p>
            </div>
          ) : (
            <div className="a4-two">
              <div className="a4-stack">
                {current.subtitle && <h2 className="a4-sub">{current.subtitle}</h2>}
              </div>
              <div>
                {lines ? (
                  <div className="a4-rows">
                    {lines.map((line, i) => (
                      <div className="a4-row" key={i} style={{ gridTemplateColumns: 'minmax(0,auto) minmax(0,1fr)' }}>
                        <span className="a4-cap a4-num">{pad(i + 1)}</span>
                        <p style={{ margin: 0 }}>{line}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="a4-pitch-lead">{current.content}</p>
                )}
                {current.showClients && (
                  <div className="a4-logos">
                    {clients.filter((c) => c.id !== 'ai4u').map((c) => <div key={c.id}>{c.name}</div>)}
                  </div>
                )}
                {isCta && (
                  <p style={{ margin: '24px 0 0' }}>
                    <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="a4-pitch-foot">
        <div className="a4-pitch-ctrl" role="group" aria-label="Controles de la presentación">
          <button type="button" onClick={() => navigate(ROUTES.HOME)} aria-label="Ir al inicio">Inicio</button>
          <button type="button" onClick={prevSlide} aria-label="Diapositiva anterior">←</button>
          <button type="button" onClick={() => setIsPaused(!isPaused)} aria-pressed={!isPaused} aria-label={isPaused ? 'Reproducir' : 'Pausar'}>{isPaused ? 'Play' : 'Pausa'}</button>
          <button type="button" onClick={nextSlide} aria-label="Diapositiva siguiente">→</button>
          <span className="a4-num">{currentSlide + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
