import React from 'react';
import { spring, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Anton';
import { fitText } from '@remotion/layout-utils';
import { T } from './tema';

const { fontFamily: ANTON } = loadFont('normal', { subsets: ['latin', 'latin-ext'] });

export const ROT_SCHLAG = '#FF3B3B';

/**
 * SCHLAGZEILE (Stil grosser Gesundheits-YouTuber)
 * Zwei Zeilen in Anton, dicke schwarze Kontur: oben weiss, unten rot.
 * Knallt beim Wort `wort` rein (Zeile 2 kurz danach), Bild wackelt mit.
 * Ohne Grafik steht sie gross in der Mitte, mit Grafik klein oben.
 */
export const Schlagzeile: React.FC<{
  oben: string;
  unten?: string;
  farbeOben?: string;
  farbeUnten?: string;
  ab: number;
  oberhalb: boolean;
  /** Ruhiger Look: kleiner Zoom statt Reinknallen */
  sanft?: boolean;
}> = ({ oben, unten, farbeOben, farbeUnten, ab, oberhalb, sanft }) => {
  const f = useCurrentFrame();
  if (f < ab) return null;
  const zeile = (text: string, farbe: string, start: number, groesse: number) => {
    const s = spring({
      frame: f - start,
      fps: T.fps,
      config: sanft ? { damping: 200, stiffness: 120 } : { damping: 12, stiffness: 220 },
    });
    const vonGross = sanft ? 0.12 : 0.5;
    if (f < start) return null;
    return (
      <div
        style={{
          fontFamily: ANTON,
          fontSize: groesse,
          lineHeight: 1.08,
          color: farbe,
          textTransform: 'uppercase',
          WebkitTextStroke: `${Math.round(groesse / 11)}px #000`,
          paintOrder: 'stroke fill',
          textShadow: '0 10px 0 rgba(0,0,0,0.55), 0 0 40px rgba(0,0,0,0.6)',
          transform: `scale(${1 + vonGross * (1 - s)})`,
          opacity: Math.min(1, s * 2),
        }}
      >
        {text}
      </div>
    );
  };
  // Lange Zeilen verkleinern statt umbrechen, jede Zeile fuer sich.
  // fitText misst die echte Anton-Breite (Grossbuchstaben); 940 px lassen Platz fuer die Kontur.
  const max = oberhalb ? 104 : 150;
  const groesse = (text: string) =>
    Math.min(max, Math.floor(fitText({ text: text.toUpperCase(), withinWidth: 940, fontFamily: ANTON }).fontSize));
  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        right: 50,
        top: oberhalb ? 205 : 600,
        textAlign: 'center',
      }}
    >
      {zeile(oben, farbeOben ?? T.weiss, ab, groesse(oben))}
      {unten && zeile(unten, farbeUnten ?? ROT_SCHLAG, ab + 6, groesse(unten))}
    </div>
  );
};
