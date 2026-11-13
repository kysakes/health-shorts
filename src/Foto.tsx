import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { T } from './tema';
import type { Fotos, Szene } from './typen';

/**
 * FOTO-EBENE
 * Echtes Foto formatfuellend, langsamer Zoom (Ken Burns), kleiner Zoom-Stoss bei
 * jedem Fotowechsel. Wechsel passiert in dem Moment, in dem `wort` gesprochen wird.
 * Dunkler Verlauf oben/unten, damit Grafik und Untertitel lesbar bleiben.
 */

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const FotoEbene: React.FC<{
  szene: Szene;
  nr: number;
  themaId: string;
  fotos: Fotos | null;
  dauer: number;
  wann: (w?: string) => number | undefined;
  /** Ruhiger Look: kaum Zoom-Stoss beim Wechsel */
  ruhig?: boolean;
}> = ({ szene, nr, themaId, fotos, dauer, wann, ruhig }) => {
  const f = useCurrentFrame();
  const liste = szene.fotos ?? [];
  const eintraege = liste
    .map((p, k) => ({
      k,
      datei: fotos?.[`${nr}-${k}`]?.datei,
      ab: k === 0 ? 0 : wann(p.wort) ?? Math.round((dauer * k) / liste.length),
    }))
    .filter((e) => e.datei);
  if (!eintraege.length) return null;

  return (
    <AbsoluteFill>
      {eintraege.map(({ k, datei, ab }) => {
        const lokal = f - ab;
        if (lokal < -6) return null;
        const stoss = spring({ frame: lokal, fps: T.fps, config: { damping: 18, stiffness: 140 } });
        const richtung = (nr + k) % 2 ? 1 : -1;
        const fortschritt = Math.max(0, lokal) / (dauer + 30);
        const zoom = 1.08 + (ruhig ? 0.06 : 0.1) * fortschritt + (ruhig ? 0.015 : 0.07) * (1 - stoss);
        return (
          <AbsoluteFill
            key={k}
            style={{ opacity: k === 0 ? 1 : interpolate(lokal, [-4, 4], [0, 1], CLAMP), overflow: 'hidden' }}
          >
            {datei!.endsWith('.mp4') ? (
              // Videoclip (Pexels): laeuft ab dem Wechsel, ohne Ton, etwas weniger Zoom
              <Sequence from={ab} layout="none">
                <OffthreadVideo
                  src={staticFile(`fotos/${themaId}/${datei}`)}
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${zoom - 0.04})`,
                  }}
                />
              </Sequence>
            ) : (
              <Img
                src={staticFile(`fotos/${themaId}/${datei}`)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${zoom}) translateX(${richtung * 30 * fortschritt}px)`,
                }}
              />
            )}
          </AbsoluteFill>
        );
      })}
      {/* Lesbarkeit: oben leicht, Mitte hinter der Grafik, unten fast schwarz */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,12,19,0.7) 0%, rgba(8,12,19,0.12) 22%, rgba(8,12,19,0.18) 48%, rgba(8,12,19,0.88) 66%, #080C13 82%)',
        }}
      />
      {szene.bild && (
        <AbsoluteFill
          style={{ background: `radial-gradient(circle 720px at 50% ${T.bildMitte}px, rgba(8,12,19,0.68), transparent 78%)` }}
        />
      )}
    </AbsoluteFill>
  );
};

/** Schwebende Lichtpartikel - immer etwas Bewegung im Bild */
export const Partikel: React.FC<{ farbe: string }> = ({ farbe }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 28 }, (_, i) => {
        const x = random(`x${i}`) * T.breite;
        const tempo = 0.4 + random(`v${i}`) * 1.1;
        const y = (((random(`y${i}`) * T.hoehe - f * tempo) % T.hoehe) + T.hoehe) % T.hoehe;
        const g = 3 + random(`g${i}`) * 7;
        const flackern = 0.5 + 0.5 * Math.sin(f / 18 + i);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + Math.sin(f / 40 + i) * 14,
              top: y,
              width: g,
              height: g,
              borderRadius: g,
              background: i % 3 ? '#ffffff' : farbe,
              opacity: (0.12 + random(`o${i}`) * 0.3) * flackern,
              boxShadow: `0 0 ${g * 2}px ${i % 3 ? '#ffffff' : farbe}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Studien-Karte: zeigt die Quelle der Zahl, faehrt von links ein */
export const StudienKarte: React.FC<{
  titel: string;
  zeile?: string;
  farbe: string;
  ab: number;
  y: number;
  /** Ruhiger Look: blendet ein statt reinzufahren */
  sanft?: boolean;
}> = ({ titel, zeile, farbe, ab, y, sanft }) => {
  const f = useCurrentFrame();
  const s = spring({
    frame: f - ab,
    fps: T.fps,
    config: sanft ? { damping: 200, stiffness: 100 } : { damping: 16, stiffness: 170 },
  });
  if (f < ab) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'center',
        transform: sanft ? `translateY(${(1 - s) * 24}px)` : `translateX(${(1 - s) * -700}px)`,
        opacity: s,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          background: 'rgba(16,22,33,0.88)',
          border: '2px solid rgba(255,255,255,0.12)',
          borderLeft: `10px solid ${farbe}`,
          borderRadius: 22,
          padding: '16px 30px 16px 22px',
          boxShadow: '0 18px 40px rgba(0,0,0,0.5)',
          fontFamily: T.font,
        }}
      >
        {/* Dokument-Symbol */}
        <svg width="46" height="56" viewBox="0 0 46 56">
          <path d="M4 4h26l12 12v36H4z" fill="none" stroke={farbe} strokeWidth="4" strokeLinejoin="round" />
          <path d="M30 4v12h12" fill="none" stroke={farbe} strokeWidth="4" strokeLinejoin="round" />
          <path d="M12 28h22M12 36h22M12 44h14" stroke={T.weiss} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        </svg>
        <div>
          <div style={{ fontWeight: 900, fontSize: 28, letterSpacing: '0.08em', color: farbe }}>{titel}</div>
          {zeile && <div style={{ fontWeight: 800, fontSize: 36, color: T.weiss, marginTop: 2 }}>{zeile}</div>}
        </div>
      </div>
    </div>
  );
};
