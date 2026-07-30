import React from 'react';
import { Box } from '@mui/material';
import { useColors } from '../../../../hooks';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface RegistrationMarksProps {
  /** Esquinas donde dibujar la cruz de registro. Default: las 4. */
  corners?: Corner[];
  /** Si además de las cruces se dibuja un círculo vacío en la primera y última esquina. */
  circles?: boolean;
  /** Color de las marcas; por defecto el texto de la superficie actual. */
  color?: string;
  /** Separación desde el borde del contenedor relative. */
  inset?: number;
}

const CORNER_STYLES: Record<Corner, React.CSSProperties> = {
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },
};

/**
 * Marcas de registro de imprenta (cruces + círculos vacíos) — vocabulario tomado
 * de los referentes suizo/brutalistas. Puramente decorativo: aria-hidden.
 * El padre debe tener position: relative (o similar) para que el absolute funcione.
 */
const RegistrationMarks: React.FC<RegistrationMarksProps> = ({
  corners = ['tl', 'tr', 'bl', 'br'],
  circles = false,
  color,
  inset = 24,
}) => {
  const colors = useColors();
  const markColor = color || colors.contrast.text.primary;

  return (
    <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {corners.map((corner) => (
        <Box
          key={corner}
          sx={{
            position: 'absolute',
            width: 22,
            height: 22,
            opacity: 0.5,
            color: markColor,
            ...CORNER_STYLES[corner],
            margin: `${inset}px`,
            '&::before, &::after': { content: '""', position: 'absolute', background: 'currentColor' },
            '&::before': { width: '100%', height: '1px', top: '50%', left: 0 },
            '&::after': { width: '1px', height: '100%', left: '50%', top: 0 },
          }}
        />
      ))}
      {circles && (corners.includes('tl') || corners.includes('tr')) && (
        <Box
          sx={{
            position: 'absolute', width: 12, height: 12, borderRadius: '50%',
            border: `1.4px solid ${markColor}`, opacity: 0.5,
            top: inset + 34, left: corners.includes('tl') ? inset + 5 : undefined,
            right: !corners.includes('tl') && corners.includes('tr') ? inset + 5 : undefined,
          }}
        />
      )}
      {circles && (corners.includes('bl') || corners.includes('br')) && (
        <Box
          sx={{
            position: 'absolute', width: 12, height: 12, borderRadius: '50%',
            border: `1.4px solid ${markColor}`, opacity: 0.5,
            bottom: inset + 34, right: corners.includes('br') ? inset + 5 : undefined,
            left: !corners.includes('br') && corners.includes('bl') ? inset + 5 : undefined,
          }}
        />
      )}
    </Box>
  );
};

export default RegistrationMarks;
