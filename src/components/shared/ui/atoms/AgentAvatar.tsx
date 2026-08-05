import React from 'react';
import { Box } from '@mui/material';
import { generateAgentIdenticon } from '@/utils/pixelIdenticon';
import { AI4U_PALETTE } from '../tokens/palette';

interface AgentAvatarProps {
  /** Nombre del agente — misma cadena, mismo avatar siempre. */
  name: string;
  size?: number;
  /** Muestra la numeración interna (el seed) debajo del avatar, estilo etiqueta de byte. */
  showSeed?: boolean;
}

/**
 * Avatar pixel-art determinístico por agente — grilla de bloques 5x5,
 * espejada, coloreada con un acento de marca elegido por el propio nombre.
 * Sin librerías externas: un hash + un PRNG sembrado, renderizado en SVG.
 */
const AgentAvatar: React.FC<AgentAvatarProps> = ({ name, size = 64, showSeed = false }) => {
  const { grid, color, seed } = generateAgentIdenticon(name);
  const cells = grid.length;
  const cellSize = size / cells;
  const seedLabel = seed.toString(16).slice(0, 6).padStart(6, '0');

  return (
    <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <Box
        sx={{
          width: size,
          height: size,
          backgroundColor: AI4U_PALETTE.gray[900],
          border: `1px solid ${AI4U_PALETTE.gray[700]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" role="img" aria-label={`Avatar de ${name}`}>
          {grid.map((row, r) =>
            row.map((filled, c) =>
              filled ? (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={color}
                />
              ) : null
            )
          )}
        </svg>
      </Box>
      {showSeed && (
        <Box
          component="span"
          sx={{
            fontFamily: 'monospace',
            fontSize: '9px',
            letterSpacing: '0.05em',
            color: AI4U_PALETTE.gray[500],
          }}
        >
          0x{seedLabel}
        </Box>
      )}
    </Box>
  );
};

export default AgentAvatar;
