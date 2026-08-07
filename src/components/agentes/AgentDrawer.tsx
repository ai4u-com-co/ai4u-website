import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '../shared/ui/atoms';
import type { Agent, AgentStatus } from '@/data/agents';
import { generateAgentIdenticon, formatAgentCode } from '@/utils/pixelIdenticon';
import AttributeBars from './AttributeBars';
import ToolBadges from './ToolBadges';
import { AGENTES_BRAND } from './theme';

interface AgentDrawerProps {
  agent: Agent;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRecruit: (agent: Agent) => void;
}

const STATUS_HEADER: Record<AgentStatus, string> = {
  produccion: AGENTES_BRAND.hotOrange,
  interno: AGENTES_BRAND.moderateBlue,
  piloto: AGENTES_BRAND.cadetGray,
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  produccion: '✓ en producción',
  piloto: '▲ en piloto',
  interno: '◆ interno ai4u',
};

const AgentDrawer: React.FC<AgentDrawerProps> = ({ agent, onClose, onPrev, onNext, onRecruit }) => {
  const { grid, color: faceColor, seed } = generateAgentIdenticon(agent.name);
  const headerColor = STATUS_HEADER[agent.status];

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
      <Box
        onClick={onClose}
        sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(23,23,23,0.35)', zIndex: 40, backdropFilter: 'blur(1.5px)' }}
      />
      <Box
        role="dialog"
        aria-label={`Ficha de ${agent.name}`}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', sm: 380 },
          bgcolor: AGENTES_BRAND.white,
          borderLeft: `2px solid ${AGENTES_BRAND.erieBlack}`,
          boxShadow: '-4px 0 24px rgba(0,0,0,0.18)',
          zIndex: 41,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ fontFamily: 'monospace', fontSize: 10, color: AGENTES_BRAND.cadetGray }}>
            {formatAgentCode(seed)} · nivel {agent.nivel}
          </Box>
          <IconButton size="small" onClick={onClose} aria-label="cerrar">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Box sx={{ width: 76, height: 76, flexShrink: 0, bgcolor: AGENTES_BRAND.erieBlack }}>
            <svg width={76} height={76} viewBox="0 0 9 9" shapeRendering="crispEdges" role="img" aria-label={`Avatar de ${agent.name}`}>
              {grid.map((row, r) => row.map((filled, c) => (filled ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={faceColor} /> : null)))}
            </svg>
          </Box>
          <Box>
            <Box sx={{ fontSize: 19, fontWeight: 900, lineHeight: 1.1, textTransform: 'lowercase' }}>{agent.name}</Box>
            <Box sx={{ fontSize: 9, letterSpacing: '0.06em', fontWeight: 800, textTransform: 'uppercase', color: AGENTES_BRAND.cadetGray, mt: '3px' }}>
              {agent.clase}
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                mt: '6px',
                fontSize: 9.5,
                fontWeight: 700,
                border: `1.5px solid ${headerColor}`,
                color: headerColor,
                borderRadius: '999px',
                padding: '2px 8px',
              }}
            >
              {STATUS_LABEL[agent.status]}
            </Box>
          </Box>
        </Box>

        <Box sx={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(23,23,23,0.82)' }}>{agent.pitch}</Box>

        <AttributeBars atributos={agent.atributos} showValue color={headerColor} />

        <ToolBadges tools={agent.tools} size={28} />

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', pt: '8px' }}>
          <Button variant="primary" size="small" onClick={() => onRecruit(agent)}>
            reclutar este agente
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', fontFamily: 'monospace', fontSize: 9, color: AGENTES_BRAND.cadetGray }}>
            <Box component="button" onClick={onPrev} sx={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', p: 0 }}>
              ← anterior
            </Box>
            <Box component="button" onClick={onNext} sx={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', p: 0 }}>
              siguiente →
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AgentDrawer;
