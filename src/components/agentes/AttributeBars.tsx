import React from 'react';
import { Box } from '@mui/material';
import type { AgentAttributes } from '@/data/agents';
import { AGENTES_BRAND } from './theme';

interface AttributeBarsProps {
  atributos: AgentAttributes;
  /** Etiquetas cortas (para cartas chicas) o largas (para el drawer/detalle). */
  compact?: boolean;
  /** Muestra el número (sobre 10) al lado de la barra — solo en vistas con más espacio. */
  showValue?: boolean;
  color?: string;
}

const ROWS: { key: keyof AgentAttributes; short: string; long: string }[] = [
  { key: 'autonomia', short: 'AUTON.', long: 'AUTONOMÍA' },
  { key: 'velocidad', short: 'VELOC.', long: 'VELOCIDAD' },
  { key: 'alcance', short: 'ALCAN.', long: 'ALCANCE' },
];

const AttributeBars: React.FC<AttributeBarsProps> = ({ atributos, compact = false, showValue = false, color = AGENTES_BRAND.erieBlack }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: compact ? '5px' : '7px', width: '100%' }}>
      {ROWS.map((row) => (
        <Box key={row.key} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box
            sx={{
              width: compact ? 46 : 64,
              flexShrink: 0,
              fontSize: 9,
              letterSpacing: '0.04em',
              fontWeight: 800,
              color: AGENTES_BRAND.cadetGray,
            }}
          >
            {compact ? row.short : row.long}
          </Box>
          <Box sx={{ flex: 1, height: 6, borderRadius: '3px', bgcolor: 'rgba(23,23,23,0.12)', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${atributos[row.key]}%`, bgcolor: color }} />
          </Box>
          {showValue && (
            <Box sx={{ fontFamily: 'monospace', fontSize: 9, color: AGENTES_BRAND.cadetGray, width: 14, textAlign: 'right' }}>
              {Math.round(atributos[row.key] / 10)}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AttributeBars;
