import React, { useEffect } from 'react';
import type { Agent } from '@/data/agents';
import { generateAgentIdenticon, formatAgentCode } from '@/utils/pixelIdenticon';
import Identicon from './Identicon';
import AttributeBars from './AttributeBars';
import ToolBadges from './ToolBadges';
import { STATUS_LABEL } from './AgentCard';

interface AgentDrawerProps {
  agent: Agent;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRecruit: (agent: Agent) => void;
}

const AgentDrawer: React.FC<AgentDrawerProps> = ({ agent, onClose, onPrev, onNext, onRecruit }) => {
  const { seed } = generateAgentIdenticon(agent.name);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <>
      <div className="a4 a4-agentes-scrim" onClick={onClose} />
      <div className="a4 a4-agentes-drawer" role="dialog" aria-label={`Ficha de ${agent.name}`}>
        <div className="a4-agentes-drawer-head">
          <span className="a4-cap a4-num">{formatAgentCode(seed)} · nivel {agent.nivel}</span>
          <button type="button" className="a4-agentes-close" onClick={onClose} aria-label="Cerrar">×</button>
        </div>

        <div className="a4-agentes-card-id">
          <Identicon name={agent.name} />
          <div>
            <h2 className="a4-sub a4-agentes-name">{agent.name}</h2>
            <p className="a4-cap" style={{ marginTop: 6 }}>{agent.clase}</p>
            <span className={`a4-agentes-status ${agent.status}`} style={{ marginTop: 8 }}>{STATUS_LABEL[agent.status]}</span>
          </div>
        </div>

        <p className="a4-sm">{agent.pitch}</p>
        <AttributeBars atributos={agent.atributos} showValue />
        <ToolBadges tools={agent.tools} />

        <button type="button" className="a4-pill" style={{ justifyContent: 'center' }} onClick={() => onRecruit(agent)}>
          Reclutar este agente →
        </button>
        <div className="a4-agentes-drawer-nav">
          <button type="button" className="a4-ghost" onClick={onPrev}>← Anterior</button>
          <button type="button" className="a4-ghost" onClick={onNext}>Siguiente →</button>
        </div>
      </div>
    </>
  );
};

export default AgentDrawer;
