import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useColors } from '../../../../hooks';

interface HalftoneSwatchProps extends BoxProps {
  size?: number;
  dot?: number;
  color?: string;
}

/**
 * Muestra de halftone (Ben-Day dots) — swatch de textura de imprenta, arquetipo
 * "grid-editorial" de los referentes. Puramente decorativo: aria-hidden.
 */
const HalftoneSwatch: React.FC<HalftoneSwatchProps> = ({ size = 64, dot = 8, color, sx, ...props }) => {
  const colors = useColors();
  const dotColor = color || colors.contrast.text.primary;

  return (
    <Box
      aria-hidden="true"
      {...props}
      sx={{
        width: size,
        height: size,
        flex: 'none',
        opacity: 0.7,
        backgroundImage: `radial-gradient(circle, ${dotColor} 34%, transparent 35%)`,
        backgroundSize: `${dot}px ${dot}px`,
        ...sx,
      }}
    />
  );
};

export default HalftoneSwatch;
