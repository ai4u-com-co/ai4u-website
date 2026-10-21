import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/constants';
import { scrollToTop } from '../../../../utils/helpers';
import {
  type Prefs, type Texto, TEXTOS, DEFAULTS, load, save, apply, isDefault,
  splitSentences, pickVoice, textToRead,
} from '../../../../utils/accesibilidad';
import '../../../../styles/site-v2.css';
import '../../../../styles/accesibilidad.css';

type Lectura = 'inactiva' | 'leyendo' | 'pausada';

// Un solo diálogo por página (lo monta Layout); los botones de cabecera y pie lo abren con este evento.
const OPEN_EVENT = 'ai4u:a11y-open';
export const abrirPanel = () => window.dispatchEvent(new CustomEvent(OPEN_EVENT));

/** Botón «Accesibilidad» para cabecera y pie. */
export const AccesibilidadBoton: React.FC = () => (
  <button type="button" className="a4-ghost a4-a11y-btn" onClick={abrirPanel} aria-haspopup="dialog" aria-controls="a4-a11y">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4.5" r="1.8" fill="currentColor" stroke="none" />
      <path d="M4 9h16M12 9v6M12 15l-3.5 5.5M12 15l3.5 5.5" />
    </svg>
    <span>Accesibilidad</span>
  </button>
);

// Panel de preferencias de lectura. Es un <dialog> nativo: el navegador atrapa el foco, cierra con Esc y
// devuelve el foco al botón que lo abrió. Nada de aquí cambia el diseño por defecto: todo es opcional y
// vive en el navegador de la persona (ver utils/accesibilidad.ts).
const AccesibilidadPanel: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [lectura, setLectura] = useState<Lectura>('inactiva');
  const [velocidad, setVelocidad] = useState(1);
  const [aviso, setAviso] = useState('');
  // Anuncio para lectores de pantalla que vive fuera del diálogo: sigue oyéndose cuando el panel se cierra para leer.
  const [anuncio, setAnuncio] = useState('');
  const puedeLeer = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => { const p = load(); setPrefs(p); apply(p); }, []);
  useEffect(() => {
    const onOpen = () => { const d = dialogRef.current; if (d && !d.open) d.showModal(); };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs(prev => { const next = { ...prev, ...patch }; apply(next); save(next); return next; });
  }, []);

  const restablecer = () => { update({ ...DEFAULTS }); setAviso('Preferencias restablecidas.'); };

  const close = () => dialogRef.current?.close();

  // ---- lectura en voz alta ----
  const detener = useCallback(() => {
    if (puedeLeer) window.speechSynthesis.cancel();
    setLectura('inactiva');
    setAnuncio('Lectura detenida.');
  }, [puedeLeer]);

  const leer = () => {
    if (!puedeLeer) return;
    const synth = window.speechSynthesis;
    if (lectura === 'pausada') { synth.resume(); setLectura('leyendo'); return; }
    synth.cancel();
    const frases = splitSentences(textToRead());
    if (!frases.length) { setAviso('No hay texto para leer en esta página.'); return; }
    const voz = pickVoice(synth.getVoices());
    frases.forEach((f, i) => {
      const u = new SpeechSynthesisUtterance(f);
      u.lang = voz?.lang ?? 'es-CO';
      if (voz) u.voice = voz;
      u.rate = velocidad;
      if (i === frases.length - 1) u.onend = () => setLectura('inactiva');
      u.onerror = () => setLectura('inactiva');
      synth.speak(u);
    });
    setLectura('leyendo');
    setAnuncio(voz ? `Leyendo en voz alta con la voz ${voz.name}. Abajo a la izquierda tienes pausar y detener.` : 'Leyendo en voz alta con la voz por defecto del dispositivo (no tiene una voz en español instalada). Abajo a la izquierda tienes pausar y detener.');
    // Cerrar el panel para que la persona pueda seleccionar texto y seguir navegando mientras escucha.
    close();
  };
  const pausar = () => { window.speechSynthesis.pause(); setLectura('pausada'); setAnuncio('Lectura en pausa.'); };
  const continuar = () => { window.speechSynthesis.resume(); setLectura('leyendo'); setAnuncio('Lectura reanudada.'); };

  useEffect(() => () => { if (puedeLeer) window.speechSynthesis.cancel(); }, [puedeLeer]);

  const opcion = (k: keyof Omit<Prefs, 'texto'>, titulo: string, texto: string) => (
    <button type="button" className="a4-a11y-opt" aria-pressed={prefs[k]} onClick={() => update({ [k]: !prefs[k] } as Partial<Prefs>)}>
      <span className="a4-a11y-opt-t">{titulo}</span>
      <span className="a4-a11y-opt-d">{texto}</span>
    </button>
  );

  return (
    <>
      <dialog id="a4-a11y" ref={dialogRef} className="a4 a4-a11y" aria-labelledby="a4-a11y-title" onClose={() => setAviso('')}>
        <div className="a4-a11y-head">
          <div>
            <p className="a4-cap">Preferencias de lectura</p>
            <h2 className="a4-sub" id="a4-a11y-title">Ajusta el sitio a tu gusto</h2>
          </div>
          <button type="button" className="a4-ghost" onClick={close}>Cerrar −</button>
        </div>

        <div className="a4-a11y-body">
          <fieldset className="a4-a11y-group">
            <legend className="a4-cap">Tamaño del texto</legend>
            <div className="a4-a11y-row" role="group" aria-label="Tamaño del texto">
              {TEXTOS.map(t => (
                <button key={t} type="button" className="a4-a11y-size" aria-pressed={prefs.texto === t} onClick={() => update({ texto: t as Texto })}>
                  {t === 100 ? 'Normal' : `${t} %`}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="a4-a11y-group">
            <legend className="a4-cap">Lectura</legend>
            <div className="a4-a11y-opts">
              {opcion('contraste', 'Contraste alto', 'Texto negro sobre blanco y enlaces subrayados.')}
              {opcion('espaciado', 'Más espacio', 'Interlineado amplio y espacio entre letras y párrafos.')}
              {opcion('fuente', 'Fuente simple', 'Letra del sistema, sin ornamentos.')}
              {opcion('movimiento', 'Sin movimiento', 'Quita animaciones y transiciones.')}
            </div>
          </fieldset>

          <fieldset className="a4-a11y-group">
            <legend className="a4-cap">Leer en voz alta</legend>
            {puedeLeer ? (
              <>
                <p className="a4-sm a4-a11y-help">Lee el texto que tengas seleccionado o, si no hay selección, toda la página. Usa la voz de tu dispositivo: no se envía nada a internet.</p>
                <div className="a4-a11y-row">
                  {lectura === 'leyendo'
                    ? <button type="button" className="a4-pill" onClick={pausar}>Pausar</button>
                    : <button type="button" className="a4-pill" onClick={leer}>{lectura === 'pausada' ? 'Continuar' : 'Leer'}</button>}
                  <button type="button" className="a4-pill" onClick={detener} disabled={lectura === 'inactiva'}>Detener</button>
                  <label className="a4-a11y-vel">
                    <span className="a4-cap">Velocidad</span>
                    <select className="a4-input" value={velocidad} onChange={e => setVelocidad(Number(e.target.value))}>
                      <option value={0.8}>Lenta</option>
                      <option value={1}>Normal</option>
                      <option value={1.25}>Rápida</option>
                    </select>
                  </label>
                </div>
              </>
            ) : (
              <p className="a4-sm a4-a11y-help">Este navegador no puede leer en voz alta. Prueba con Chrome, Edge, Safari o Firefox actualizados, o con el lector de pantalla de tu dispositivo.</p>
            )}
          </fieldset>

          <p className="a4-sm a4-a11y-status" role="status" aria-live="polite">{aviso}</p>
        </div>

        <div className="a4-a11y-foot">
          <button type="button" className="a4-ghost" onClick={restablecer} disabled={isDefault(prefs)}>Restablecer</button>
          <Link className="a4-ghost" to={ROUTES.ACCESIBILIDAD} onClick={() => { close(); scrollToTop('auto'); }}>Declaración de accesibilidad →</Link>
        </div>
      </dialog>

      <p className="a4-sr-only" role="status" aria-live="polite">{anuncio}</p>
      {lectura !== 'inactiva' && (
        <div className="a4 a4-a11y-bar" role="group" aria-label="Lectura en voz alta">
          <span aria-hidden="true">{lectura === 'leyendo' ? 'Leyendo…' : 'En pausa'}</span>
          {lectura === 'leyendo'
            ? <button type="button" onClick={pausar}>Pausar</button>
            : <button type="button" onClick={continuar}>Continuar</button>}
          <button type="button" onClick={detener}>Detener</button>
        </div>
      )}
    </>
  );
};

export default AccesibilidadPanel;
