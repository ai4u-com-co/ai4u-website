import React, { useEffect, useRef, useState } from 'react';
import { NIVELES, type Agent, type AgentStatus } from '@/data/agents';
import { generateAgentIdenticon, generateAgentFace, formatAgentCode } from '@/utils/pixelIdenticon';
import FaceTile from './FaceTile';
import ToolBadges from './ToolBadges';

interface AgentCardProps {
  agent: Agent;
  onRecruit: (agent: Agent) => void;
  /** Llega por enlace (?agente=): la tarjeta aparece dada vuelta y a la vista. */
  startFlipped?: boolean;
}

export const STATUS_LABEL: Record<AgentStatus, string> = {
  produccion: 'En producción',
  piloto: 'En piloto',
  interno: 'Interno Ai4U',
};

/** Tres cuadros: cuántos están llenos dice el nivel de supervisión. */
export const Pips: React.FC<{ nivel: 1 | 2 | 3 }> = ({ nivel }) => (
  <span className="a4-agentes-pips" role="img" aria-label={`Nivel ${nivel} de 3`}>
    {[1, 2, 3].map((i) => <i key={i} className={i <= nivel ? 'on' : ''} />)}
  </span>
);

// Tarjeta de jugador: el frente dice quién es y qué hace; el reverso es su ficha de negocio.
const AgentCard: React.FC<AgentCardProps> = ({ agent, onRecruit, startFlipped = false }) => {
  const { seed } = generateAgentIdenticon(agent.name);
  const { color } = generateAgentFace(agent.name);
  const [flipped, setFlipped] = useState(startFlipped);
  const ref = useRef<HTMLElement>(null);
  const isPiloto = agent.status === 'piloto';
  const nivel = NIVELES[agent.nivel];

  useEffect(() => {
    if (!startFlipped) return;
    setFlipped(true);
    ref.current?.scrollIntoView({ block: 'center' });
  }, [startFlipped]);

  return (
    <article ref={ref} className={`a4-flip${isPiloto ? ' is-piloto' : ''}${flipped ? ' is-flipped' : ''}`} style={{ ['--agent' as string]: color }}>
      <div className="a4-flip-inner">
        <div className="a4-face a4-face-front">
          <div className="a4-agentes-card-top">
            <span className="a4-cap a4-num">{formatAgentCode(seed)}</span>
            <span className="a4-cap">{agent.clase}</span>
          </div>
          <FaceTile name={agent.name} className="a4-photo" />
          <div>
            <h3 className="a4-sub a4-agentes-name" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)' }}>{agent.name}</h3>
            <span className={`a4-agentes-status ${agent.status}`} style={{ marginTop: 8 }}>{STATUS_LABEL[agent.status]}</span>
          </div>
          <p className="a4-agentes-level">
            <Pips nivel={agent.nivel} />
            <span className="a4-cap">Nivel {agent.nivel} · {nivel.nombre}</span>
          </p>
          <p className="a4-sm">{agent.pitch}</p>
          <div className="a4-agentes-card-foot">
            <span />
            <button type="button" className="a4-pill" aria-expanded={flipped} aria-label={`Dar vuelta: ficha de negocio de ${agent.name}`} onClick={() => setFlipped(true)}>
              Dar vuelta ↻
            </button>
          </div>
        </div>

        <div className="a4-face a4-face-back">
          <div className="a4-agentes-card-top">
            <span className="a4-cap a4-num">{formatAgentCode(seed)}</span>
            <span className="a4-cap">Ficha de negocio</span>
          </div>
          <p className="a4-sub a4-agentes-name" style={{ fontSize: 'clamp(18px, 1.6vw, 22px)' }}>{agent.name}</p>
          <dl className="a4-ficha">
            <div><dt className="a4-cap">Recibe</dt><dd>{agent.recibe}</dd></div>
            <div><dt className="a4-cap">Entrega</dt><dd>{agent.entrega}</dd></div>
            <div><dt className="a4-cap">Lo revisa</dt><dd>{agent.revisa}</dd></div>
            <div><dt className="a4-cap">Nivel {agent.nivel} · {nivel.nombre}</dt><dd>{nivel.descripcion}</dd></div>
            <div><dt className="a4-cap">Horario</dt><dd>{agent.horario}</dd></div>
          </dl>
          <ToolBadges tools={agent.tools} label="Se conecta con" />
          <div className="a4-agentes-card-foot">
            <button type="button" className="a4-ghost" onClick={() => setFlipped(false)}>← Frente</button>
            <button type="button" className="a4-pill" onClick={() => onRecruit(agent)}>Reclutar →</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AgentCard;
