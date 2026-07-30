import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useColors } from '../../../../hooks';

interface MoireTextProps extends BoxProps {
  children: React.ReactNode;
  /** Color de las líneas concéntricas; por defecto el texto de la superficie actual. */
  color?: string;
}

/**
 * Palabra/frase construida con líneas concéntricas finas (efecto moiré / curvas de
 * nivel) en vez de un relleno sólido — arquetipo "moire-warp" de los referentes
 * suizo/brutalistas. Requiere -webkit-background-clip: text, soportado en todos los
 * navegadores modernos (Chrome/Safari/Edge/Firefox 49+).
 */
const MoireText: React.FC<MoireTextProps> = ({ children, color, sx, ...props }) => {
  const colors = useColors();
  const lineColor = color || colors.contrast.text.primary;

  return (
    <Box
      component="span"
      {...props}
      sx={{
        fontWeight: 900,
        lineHeight: 0.86,
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        display: 'inline-block',
        backgroundImage: `repeating-radial-gradient(circle at 30% 40%, ${lineColor} 0px, ${lineColor} 1.4px, transparent 2.6px, transparent 6px)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default MoireText;
