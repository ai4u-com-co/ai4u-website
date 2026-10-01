import React from 'react';
import type { AgentAttributes } from '@/data/agents';

interface AttributeBarsProps {
  atributos: AgentAttributes;
  /** Etiquetas cortas (tarjetas) o largas (drawer). */
  compact?: boolean;
  /** Muestra el número (sobre 10) al lado de la barra. */
  showValue?: boolean;
}

const ROWS: { key: keyof AgentAttributes; short: string; long: string }[] = [
  { key: 'autonomia', short: 'Auton.', long: 'Autonomía' },
  { key: 'velocidad', short: 'Veloc.', long: 'Velocidad' },
  { key: 'alcance', short: 'Alcan.', long: 'Alcance' },
];

const AttributeBars: React.FC<AttributeBarsProps> = ({ atributos, compact = false, showValue = false }) => (
  <div className="a4-agentes-bars">
    {ROWS.map((row) => (
      <div key={row.key} className="a4-agentes-bar-row">
        <span className="a4-cap">{compact ? row.short : row.long}</span>
        <div className="track"><div className="fill" style={{ width: `${atributos[row.key]}%` }} /></div>
        {showValue ? <span className="a4-cap a4-num">{Math.round(atributos[row.key] / 10)}</span> : <span />}
      </div>
    ))}
  </div>
);

export default AttributeBars;
