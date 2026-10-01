import React from 'react';
import { generateAgentFace, FACE_COLS, FACE_ROWS } from '@/utils/pixelIdenticon';

interface FaceTileProps {
  name: string;
  className?: string;
}

// Robot de traje y corbata sobre el color del agente. Determinista por nombre: sin estado, sin red.
const FaceTile: React.FC<FaceTileProps> = ({ name, className = '' }) => {
  const face = generateAgentFace(name);
  return (
    <div className={`a4-facetile ${className}`.trim()} style={{ background: face.color }}>
      <svg viewBox={`0 0 ${FACE_COLS} ${FACE_ROWS}`} role="img" aria-label={`Avatar de ${name}`} shapeRendering="crispEdges">
        {face.rects.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill === 'color' ? face.color : r.fill} />
        ))}
      </svg>
    </div>
  );
};

export default FaceTile;
