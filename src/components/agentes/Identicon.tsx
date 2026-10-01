import React from 'react';

// Avatar determinista por nombre (misma construcción que Home): rejilla 9×9 simétrica, tinta sobre papel.
const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
};
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const Identicon: React.FC<{ name: string }> = ({ name }) => {
  const N = 9;
  const next = rng(hash(name));
  const cells: JSX.Element[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < 5; x++) {
      if (next() > 0.5) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
        if (x < 4) cells.push(<rect key={`m${x}-${y}`} x={N - 1 - x} y={y} width={1} height={1} />);
      }
    }
  }
  return (
    <div className="a4-agentes-ident">
      <svg viewBox="-1 -1 11 11" role="img" aria-label={`Avatar de ${name}`} fill="#171717" shapeRendering="crispEdges">
        {cells}
      </svg>
    </div>
  );
};

export default Identicon;
