import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { T } from './tema';
import type { Wort } from './woerter';

/**
 * Wort-fuer-Wort-Untertitel.
 * Der Satz wird in kurze Zeilen zerlegt; immer nur die aktuelle Zeile steht da,
 * jedes Wort ploppt in dem Moment auf, in dem es gesprochen wird.
 */
const MAX_ZEICHEN = 17;

const zeilen = (liste: Wort[]) => {
  const out: Wort[][] = [];
  let akt: Wort[] = [];
  let len = 0;
  for (const w of liste) {
    if (akt.length && len + w.w.length > MAX_ZEICHEN) {
      out.push(akt);
      akt = [];
      len = 0;
    }
    akt.push(w);
    len += w.w.length + 1;
    if (/[.!?:]$/.test(w.w)) {
      out.push(akt);
      akt = [];
      len = 0;
    }
  }
  if (akt.length) out.push(akt);
  return out;
};

export const Untertitel: React.FC<{ liste: Wort[]; akzent: string }> = ({ liste, akzent }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const z = zeilen(liste);
  let idx = 0;
  z.forEach((zeile, i) => {
    if (zeile[0].start <= t + 0.02) idx = i;
  });
  const zeile = z[idx];
  // Karaoke: das gerade gesprochene Wort bekommt eine farbige Box
  let aktiv = -1;
  zeile.forEach((w, i) => {
    if (w.start <= t + 0.02) aktiv = i;
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: T.untertitelY,
        left: 130, // rechts liegen bei TikTok/Shorts Like-/Kommentar-Buttons
        right: 130,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '6px 10px',
        fontFamily: T.font,
        fontWeight: 900,
        fontSize: 82,
        lineHeight: 1.15,
        color: T.weiss,
        textShadow: '0 6px 0 #0008, 0 0 30px #000a',
        letterSpacing: '-0.01em',
      }}
    >
      {zeile.map((w, i) => {
        const ab = Math.round(w.start * fps);
        const s = spring({ frame: f - ab, fps, config: { damping: 14, stiffness: 260 }, durationInFrames: 8 });
        const sichtbar = f >= ab;
        const istAktiv = i === aktiv;
        const box = w.farbe ?? akzent;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: sichtbar ? 1 : 0,
              transform: `translateY(${(1 - s) * 18}px) scale(${(0.85 + 0.15 * s) * (istAktiv ? 1.06 : 1)})`,
              color: istAktiv ? '#0B0F16' : w.farbe ?? T.weiss,
              background: istAktiv ? box : 'transparent',
              textShadow: istAktiv ? 'none' : undefined,
              borderRadius: 18,
              padding: '0 12px',
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};
