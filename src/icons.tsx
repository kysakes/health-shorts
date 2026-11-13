import React from 'react';
import type { IconName } from './typen';
import { T } from './tema';

/**
 * FLACHE VEKTOR-ICONS
 * Alle im Raster 200x200, leichte Schattierung fuer Tiefe.
 * Neues Icon: hier eine Funktion ergaenzen + Namen in typen.ts eintragen.
 */

type P = { t: number }; // t = Frame, fuer kleine Eigenbewegungen

const Sonne: React.FC<P> = ({ t }) => (
  <g>
    <g transform={`rotate(${t * 0.6} 100 100)`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={94}
          y={8}
          width={12}
          height={30}
          rx={6}
          fill="#FFC83D"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
    </g>
    <circle cx={100} cy={100} r={56} fill="#FFB020" />
    <circle cx={100} cy={100} r={48} fill="#FFC83D" />
    <circle cx={84} cy={84} r={14} fill="#FFE08A" opacity={0.9} />
  </g>
);

const Essen: React.FC<P> = () => (
  <g>
    <ellipse cx={100} cy={112} rx={88} ry={70} fill="#0006" />
    <circle cx={100} cy={100} r={84} fill="#DDE4EC" />
    <circle cx={100} cy={100} r={64} fill="#F4F7FA" />
    {/* Spiegelei */}
    <path
      d="M62 92c-6-22 18-34 34-26 14-12 40-4 38 16 16 8 12 34-8 36-6 16-34 18-44 6-20 4-32-18-20-32z"
      fill="#FFFFFF"
    />
    <circle cx={100} cy={100} r={20} fill="#FFB020" />
    <circle cx={94} cy={94} r={6} fill="#FFE08A" />
  </g>
);

const Kapsel: React.FC<P> = () => (
  <g transform="rotate(-35 100 100)">
    <rect x={40} y={70} width={120} height={60} rx={30} fill="#EEF2F7" />
    <path d="M70 70h30v60H70a30 30 0 0 1 0-60z" fill="#5AA9FF" />
    <rect x={52} y={80} width={40} height={10} rx={5} fill="#FFFFFF" opacity={0.55} />
    <rect x={108} y={80} width={36} height={10} rx={5} fill="#FFFFFF" opacity={0.8} />
  </g>
);

const Dose: React.FC<P> = () => (
  <g>
    <rect x={56} y={22} width={88} height={32} rx={8} fill="#5AA9FF" />
    <rect x={56} y={46} width={88} height={8} fill="#3B86D9" />
    <rect x={44} y={54} width={112} height={128} rx={18} fill="#F2F5F9" />
    <rect x={44} y={54} width={22} height={128} rx={10} fill="#FFFFFF" opacity={0.7} />
    <rect x={56} y={90} width={88} height={56} rx={8} fill="#5AA9FF" />
    <text
      x={100}
      y={131}
      textAnchor="middle"
      fontSize={34}
      fontWeight={900}
      fill="#FFFFFF"
      fontFamily={T.font}
    >
      D3
    </text>
  </g>
);

const Ei: React.FC<P> = () => (
  <g>
    <path d="M100 18c34 0 62 56 62 98a62 62 0 0 1-124 0c0-42 28-98 62-98z" fill="#F2DDB8" />
    <path d="M100 18c34 0 62 56 62 98 0 30-20 54-48 60 18-12 30-34 30-60 0-40-20-86-44-98z" fill="#E2C597" />
    <ellipse cx={78} cy={72} rx={12} ry={20} fill="#FFF6E6" opacity={0.85} />
  </g>
);

const Hering: React.FC<P> = ({ t }) => {
  const s = Math.sin(t / 6) * 6;
  return (
    <g>
      <path d={`M150 100l40 ${-34 + s}v${68 - 2 * s}z`} fill="#7F98B3" />
      <path d="M14 100c22-42 92-56 140 0-48 56-118 42-140 0z" fill="#A9BED3" />
      <path d="M14 100c22 30 92 44 140 0H14z" fill="#E4ECF4" />
      <path d="M70 70c10 18 10 42 0 60" stroke="#7F98B3" strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={42} cy={92} r={8} fill="#1A2433" />
      <circle cx={40} cy={90} r={3} fill="#FFFFFF" />
    </g>
  );
};

const Lachs: React.FC<P> = () => (
  <g>
    <path d="M30 70c30-40 120-48 150-6 10 50-30 100-80 104C50 170 18 120 30 70z" fill="#9AA6B4" />
    <path d="M40 74c28-34 108-40 132-4 8 44-26 86-72 90-44-2-70-46-60-86z" fill="#FF8A65" />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${58 + i * 26} 60c-14 30-14 70 6 100`}
        stroke="#FFD2C2"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
    ))}
  </g>
);

const Blut: React.FC<P> = () => (
  <g>
    <path d="M100 14c26 40 64 74 64 112a64 64 0 0 1-128 0c0-38 38-72 64-112z" fill="#E5394F" />
    <path d="M100 14c26 40 64 74 64 112 0 30-20 56-50 62 22-14 34-36 34-62 0-34-26-70-48-112z" fill="#C42638" />
    <ellipse cx={74} cy={124} rx={12} ry={22} fill="#FF8A98" opacity={0.85} />
  </g>
);

const MAP: Record<IconName, React.FC<P>> = {
  sonne: Sonne,
  essen: Essen,
  kapsel: Kapsel,
  dose: Dose,
  ei: Ei,
  hering: Hering,
  lachs: Lachs,
  blut: Blut,
};

export const Icon: React.FC<{ name: IconName; size: number; t?: number; style?: React.CSSProperties }> = ({
  name,
  size,
  t = 0,
  style,
}) => {
  const C = MAP[name];
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible', ...style }}>
      <C t={t} />
    </svg>
  );
};
