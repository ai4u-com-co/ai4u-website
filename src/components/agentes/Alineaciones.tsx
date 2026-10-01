import React from 'react';
import { CASES } from '@/data/cases';

interface AlineacionesProps {
  onSelect: (agente: string) => void;
}

// Cada cliente es un equipo: los agentes que ya juegan juntos en su operación.
const Alineaciones: React.FC<AlineacionesProps> = ({ onSelect }) => (
  <section className="a4-section" aria-labelledby="alineaciones">
    <p className="a4-cap" style={{ marginBottom: 24 }}>Alineaciones</p>
    <h2 className="a4-h-lg" id="alineaciones" style={{ maxWidth: '14ch' }}>Así juega cada empresa</h2>
    <p className="a4-sm" style={{ margin: '24px 0 0', maxWidth: '56ch' }}>
      Los agentes que ya trabajan juntos en cada cliente. Toca uno para ver su tarjeta.
    </p>
    <div className="a4-lineups">
      {CASES.map((c, i) => (
        <div className="a4-lineup" key={c.id}>
          <div className="a4-lineup-head">
            <span className="a4-cap a4-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="a4-sub">{c.name}</h3>
          </div>
          <ul className="a4-lineup-list">
            {c.agentes.map((a) => (
              <li key={a}>
                <button type="button" className="a4-lineup-chip" onClick={() => onSelect(a)}>{a}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Alineaciones;
