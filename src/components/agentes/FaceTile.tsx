import React from 'react';
import { generateAgentFace, type FaceFill } from '@/utils/pixelIdenticon';

const FILL: Record<Exclude<FaceFill, 'color'>, string> = { paper: '#ffffff', ink: '#1d1d1d' };

interface FaceTileProps {
  name: string;
  className?: string;
}

// Rostro de píxeles sobre el color del agente. Determinista por nombre: sin estado, sin red.
const FaceTile: React.FC<FaceTileProps> = ({ name, className = '' }) => {
  const face = generateAgentFace(name);
  return (
    <div className={`a4-facetile ${className}`.trim()} style={{ background: face.color }}>
      <svg viewBox="0 0 11 11" role="img" aria-label={`Rostro de ${name}`} shapeRendering="crispEdges">
        {face.rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill === 'color' ? face.color : FILL[r.fill]} />
        ))}
      </svg>
    </div>
  );
};

export default FaceTile;
