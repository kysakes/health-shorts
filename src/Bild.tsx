import React from 'react';
import { Easing, interpolate, interpolateColors, spring } from 'remotion';
import { T, sek } from './tema';
import { Icon } from './icons';
import type { Bild as BildT } from './typen';

/**
 * DIE GRAFIK-BAUSTEINE
 * Jeder Typ aus typen.ts hat hier seine Animation.
 * f = Frame innerhalb der Szene, wann(wort) = Frame, in dem das Wort faellt.
 */

type Props = {
  bild: BildT;
  f: number;
  dauer: number;
  wann: (wort?: string) => number | undefined;
  akzent: string;
};

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const pop = (f: number, ab: number, weich = false) =>
  spring({
    frame: f - ab,
    fps: T.fps,
    config: weich ? { damping: 16, stiffness: 120 } : { damping: 11, stiffness: 190 },
  });

export const Chip: React.FC<{ text: string; farbe: string; gross?: boolean; style?: React.CSSProperties }> = ({
  text,
  farbe,
  gross,
  style,
}) => (
  <div
    style={{
      display: 'inline-block',
      background: farbe,
      color: '#0B1018',
      fontFamily: T.font,
      fontWeight: 900,
      fontSize: gross ? 58 : 40,
      letterSpacing: '0.04em',
      padding: gross ? '14px 36px 12px' : '10px 26px 8px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      boxShadow: `0 10px 40px ${farbe}55`,
      ...style,
    }}
  >
    {text}
  </div>
);

const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  x,
  y,
  children,
  style,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style }}>
    {children}
  </div>
);

const schweben = (f: number, phase = 0) => Math.sin((f + phase) / 18) * 8;

export const Bild: React.FC<Props> = ({ bild, f, dauer, wann, akzent }) => {
  switch (bild.typ) {
    /* ---------------- ZAEHLER: Zahl laeuft hoch ---------------- */
    case 'zaehler': {
      const ab = wann(bild.wort) ?? sek(0.15);
      const p = interpolate(f, [ab, ab + sek(1.3)], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });
      const wert = Math.round(bild.von + (bild.bis - bild.von) * p).toLocaleString('de-DE');
      // Lange Endwerte ("28.000 km/h") verkleinern, damit sie in 1080 px passen
      const laenge = bild.bis.toLocaleString('de-DE').length + 0.55 * (bild.nach ?? '').length;
      const groesse = Math.min(1, 7 / laenge);
      const fertig = pop(f, ab + sek(1.3));
      const s = pop(f, 0);
      return (
        <>
          {bild.icon && (
            <Abs x={540} y={440 + schweben(f)} style={{ transform: `translate(-50%,-50%) scale(${s})` }}>
              <Icon name={bild.icon} size={300} t={f} />
            </Abs>
          )}
          <Abs x={540} y={bild.icon ? 800 : 720}>
            <div
              style={{
                fontFamily: T.font,
                fontWeight: 900,
                fontSize: Math.round(250 * groesse),
                lineHeight: 1,
                color: bild.farbe,
                textShadow: `0 0 70px ${bild.farbe}77`,
                transform: `scale(${(0.6 + 0.4 * s) * (1 + 0.08 * Math.sin(fertig * Math.PI))})`,
                whiteSpace: 'nowrap',
              }}
            >
              {wert}
              <span style={{ fontSize: Math.round(130 * groesse) }}>{bild.nach ?? ''}</span>
            </div>
          </Abs>
          {bild.unter && (
            <Abs x={540} y={1010} style={{ transform: `translate(-50%,-50%) scale(${fertig})` }}>
              <Chip text={bild.unter} farbe={bild.farbe} />
            </Abs>
          )}
        </>
      );
    }

    /* ---------------- VERSUS: drei Kandidaten ---------------- */
    case 'versus': {
      const n = bild.items.length;
      const xs = n === 2 ? [300, 780] : [190, 540, 890];
      const zeiten = bild.items.map((it, i) => wann(it.wort ?? it.label) ?? sek(0.3 + i * 0.5));
      return (
        <>
          {bild.items.map((it, i) => {
            const s = pop(f, zeiten[i]);
            return (
              <React.Fragment key={i}>
                <Abs x={xs[i]} y={520} style={{ transform: `translate(-50%,-50%) scale(${s})` }}>
                  <Chip text={it.label} farbe={it.farbe} />
                </Abs>
                <Abs
                  x={xs[i]}
                  y={720 + schweben(f, i * 20)}
                  style={{ transform: `translate(-50%,-50%) scale(${s}) rotate(${(1 - s) * -30}deg)` }}
                >
                  <Icon name={it.icon} size={250} t={f} />
                </Abs>
                {i > 0 && (
                  <Abs
                    x={(xs[i - 1] + xs[i]) / 2}
                    y={720}
                    style={{ transform: `translate(-50%,-50%) scale(${pop(f, zeiten[i] - 3)})` }}
                  >
                    <div
                      style={{
                        fontFamily: T.font,
                        fontWeight: 900,
                        fontStyle: 'italic',
                        fontSize: 76,
                        color: T.pink,
                        textShadow: `0 0 30px ${T.pink}88`,
                      }}
                    >
                      VS
                    </div>
                  </Abs>
                )}
              </React.Fragment>
            );
          })}
        </>
      );
    }

    /* ---------------- ICON: ein grosses Motiv + Chip ---------------- */
    case 'icon': {
      const s = pop(f, 0);
      const chipAb = wann(bild.chipWort) ?? sek(0.6);
      return (
        <>
          {bild.label && (
            <Abs x={540} y={400} style={{ opacity: interpolate(f, [4, 14], [0, 1], CLAMP) }}>
              <div
                style={{
                  fontFamily: T.font,
                  fontWeight: 900,
                  fontSize: 40,
                  letterSpacing: '0.1em',
                  color: T.grau,
                  whiteSpace: 'nowrap',
                }}
              >
                {bild.label}
              </div>
            </Abs>
          )}
          <Abs
            x={540}
            y={720 + schweben(f)}
            style={{ transform: `translate(-50%,-50%) scale(${s}) rotate(${(1 - s) * 20}deg)` }}
          >
            <Icon name={bild.icon} size={400} t={f} />
          </Abs>
          {bild.chip && (
            <Abs x={540} y={1020} style={{ transform: `translate(-50%,-50%) scale(${pop(f, chipAb)})` }}>
              <Chip text={bild.chip} farbe={bild.chipFarbe ?? akzent} gross />
            </Abs>
          )}
        </>
      );
    }

    /* ---------------- BALKEN: Vergleich in der Laenge ---------------- */
    case 'balken': {
      const BREITE = 920;
      return (
        <>
          {bild.items.map((it, i) => {
            const ab = wann(it.wort) ?? sek(0.3 + i * 0.9);
            const p = interpolate(f, [ab, ab + sek(0.9)], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });
            const y = 520 + i * 260;
            const sicht = interpolate(f, [ab - 6, ab], [0, 1], CLAMP);
            return (
              <div key={i} style={{ position: 'absolute', left: T.rand, top: y, width: BREITE, opacity: sicht }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontFamily: T.font,
                    fontWeight: 900,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontSize: 38, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}>{it.label}</span>
                  <span style={{ display: 'inline-block', fontSize: 72, color: it.farbe, transform: `scale(${pop(f, ab + sek(0.7))})` }}>
                    {it.anzeige}
                  </span>
                </div>
                <div style={{ height: 110, borderRadius: 26, background: T.karte, border: `3px solid ${T.linie}` }}>
                  <div
                    style={{
                      height: '100%',
                      width: Math.max(0.035, (it.wert / bild.max) * p) * (BREITE - 6),
                      borderRadius: 24,
                      background: `linear-gradient(180deg, ${it.farbe}, ${it.farbe}CC)`,
                      boxShadow: `0 0 50px ${it.farbe}66`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </>
      );
    }

    /* ---------------- RASTER: Mengen zum Anfassen ---------------- */
    case 'raster': {
      const n = bild.gruppen.length;
      const spalte = 960 / n;
      return (
        <>
          {bild.gruppen.map((g, gi) => {
            const ab = wann(g.wort) ?? sek(0.3 + gi * 1.2);
            const cx = 60 + spalte * (gi + 0.5);
            const zeilen = Math.ceil(g.anzahl / g.spalten);
            const groesse = g.anzahl === 1 ? 230 : Math.min(84, (spalte - 30) / g.spalten - 6);
            const hoehe = zeilen * (groesse + 8);
            return (
              <React.Fragment key={gi}>
                <div
                  style={{
                    position: 'absolute',
                    left: cx - (g.spalten * (groesse + 8)) / 2,
                    top: 760 - hoehe / 2 - 40,
                    width: g.spalten * (groesse + 8),
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {Array.from({ length: g.anzahl }).map((_, k) => {
                    const s = pop(f, ab + k * 2);
                    return (
                      <div key={k} style={{ transform: `scale(${s})` }}>
                        <Icon name={g.icon} size={groesse} t={f + k * 5} />
                      </div>
                    );
                  })}
                </div>
                <Abs x={cx} y={1010} style={{ transform: `translate(-50%,-50%) scale(${pop(f, ab + 4)})` }}>
                  <Chip text={g.label} farbe={g.farbe} style={{ fontSize: 34, padding: '8px 18px 6px' }} />
                </Abs>
              </React.Fragment>
            );
          })}
        </>
      );
    }

    /* ---------------- MONATE: Kalender, Wintermonate werden blau ---------------- */
    case 'monate': {
      const namen = bild.namen ?? ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
      const ab = wann(bild.wort) ?? sek(0.8);
      const aus = bild.aus.map((m, k) => ({ m, bei: ab + k * 4 }));
      const anteilAus = interpolate(f, [ab, ab + bild.aus.length * 4], [0, 1], CLAMP);
      return (
        <>
          <Abs
            x={540}
            y={400}
            style={{
              transform: `translate(-50%,-50%) scale(${pop(f, 0) * (1 - 0.35 * anteilAus)})`,
              opacity: 1 - 0.55 * anteilAus,
              filter: `saturate(${1 - 0.7 * anteilAus})`,
            }}
          >
            <Icon name="sonne" size={220} t={f} />
          </Abs>
          <div
            style={{
              position: 'absolute',
              left: 110,
              top: 570,
              width: 860,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
          >
            {namen.map((n, i) => {
              const a = aus.find((x) => x.m === i);
              const k = a ? interpolate(f, [a.bei, a.bei + 6], [0, 1], CLAMP) : 0;
              const s = pop(f, 4 + i * 1.5);
              const farbe = interpolateColors(k, [0, 1], [T.gelb, T.blau]);
              return (
                <div
                  key={i}
                  style={{
                    height: 130,
                    borderRadius: 24,
                    background: `${farbe}22`,
                    border: `4px solid ${farbe}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: T.font,
                    fontWeight: 900,
                    fontSize: 48,
                    color: farbe,
                    transform: `scale(${s * (1 + 0.12 * Math.sin(k * Math.PI))})`,
                  }}
                >
                  {n}
                </div>
              );
            })}
          </div>
        </>
      );
    }

    /* ---------------- SPEICHER: Akku leert sich langsam ---------------- */
    case 'speicher': {
      const s = pop(f, 0);
      const p = interpolate(f, [sek(0.5), dauer], [1, 0.42], { ...CLAMP, easing: Easing.inOut(Easing.quad) });
      const farbe = interpolateColors(p, [0.42, 1], [T.orange, bild.farbe]);
      return (
        <>
          <Abs x={540} y={480} style={{ opacity: interpolate(f, [4, 14], [0, 1], CLAMP) }}>
            <div
              style={{ fontFamily: T.font, fontWeight: 900, fontSize: 40, letterSpacing: '0.1em', color: T.grau }}
            >
              {bild.titel ?? 'VITAMIN-D-SPEICHER'}
            </div>
          </Abs>
          <div
            style={{
              position: 'absolute',
              left: 170,
              top: 580,
              width: 700,
              height: 300,
              borderRadius: 44,
              border: `14px solid ${T.weiss}`,
              padding: 16,
              transform: `scale(${s})`,
            }}
          >
            <div
              style={{
                width: `${p * 100}%`,
                height: '100%',
                borderRadius: 24,
                background: farbe,
                boxShadow: `0 0 60px ${farbe}88`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -48,
                top: 85,
                width: 30,
                height: 100,
                borderRadius: '0 16px 16px 0',
                background: T.weiss,
              }}
            />
          </div>
          <Abs x={540} y={1010} style={{ transform: `translate(-50%,-50%) scale(${pop(f, sek(0.6))})` }}>
            <Chip text={bild.label} farbe={bild.farbe} gross />
          </Abs>
        </>
      );
    }

    /* ---------------- PODEST: das Ergebnis ---------------- */
    case 'podest': {
      const slot = { 1: { x: 540, h: 400 }, 2: { x: 250, h: 290 }, 3: { x: 830, h: 200 } } as const;
      const boden = 1180;
      const reihenfolge = [3, 2, 1];
      const eins = bild.plaetze.find((p) => p.rang === 1);
      const einsAb = wann(eins?.label) ?? sek(1.0);
      return (
        <>
          {/* Strahlen hinter Platz 1 */}
          <div
            style={{
              position: 'absolute',
              left: 540 - 700,
              top: boden - 400 - 140 - 700,
              width: 1400,
              height: 1400,
              borderRadius: '50%',
              background: `repeating-conic-gradient(from ${f * 0.8}deg, ${eins?.farbe ?? T.gelb}33 0deg 9deg, transparent 9deg 22deg)`,
              WebkitMaskImage: 'radial-gradient(circle, #000 0%, #0000 62%)',
              opacity: interpolate(f, [einsAb, einsAb + 10], [0, 1], CLAMP),
            }}
          />
          {bild.plaetze.map((pl) => {
            const sl = slot[pl.rang];
            const ab = pl.rang === 1 ? einsAb : sek(0.2 + reihenfolge.indexOf(pl.rang) * 0.35);
            const s = pop(f, ab, true);
            const top = boden - sl.h * s;
            return (
              <React.Fragment key={pl.rang}>
                <div
                  style={{
                    position: 'absolute',
                    left: sl.x - 140,
                    top,
                    width: 280,
                    height: sl.h * s,
                    borderRadius: '22px 22px 0 0',
                    background: `linear-gradient(180deg, ${pl.farbe}, ${pl.farbe}99)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 18,
                    overflow: 'hidden',
                    fontFamily: T.font,
                    fontWeight: 900,
                    color: '#0B1018',
                  }}
                >
                  <div style={{ fontSize: 110, lineHeight: 1 }}>{pl.rang}</div>
                  <div style={{ fontSize: 34, letterSpacing: '0.05em' }}>{pl.label}</div>
                </div>
                <Abs
                  x={sl.x}
                  y={top - 110 + (pl.rang === 1 ? schweben(f) : 0)}
                  style={{ transform: `translate(-50%,-50%) scale(${pop(f, ab + 6)})` }}
                >
                  <Icon name={pl.icon} size={pl.rang === 1 ? 210 : 170} t={f} />
                </Abs>
                {pl.notiz && (
                  <Abs
                    x={sl.x}
                    y={top - 250}
                    style={{ transform: `translate(-50%,-50%) scale(${pop(f, ab + 14)})` }}
                  >
                    <Chip text={pl.notiz} farbe={pl.farbe} />
                  </Abs>
                )}
              </React.Fragment>
            );
          })}
        </>
      );
    }
  }
};

/* ---------------- STEMPEL: knallt auf die Grafik ---------------- */
export const Stempel: React.FC<{ text: string; farbe: string; f: number; ab: number; y?: number }> = ({
  text,
  farbe,
  f,
  ab,
  y,
}) => {
  if (f < ab) return null;
  const s = spring({ frame: f - ab, fps: T.fps, config: { damping: 9, stiffness: 240 } });
  return (
    <Abs
      x={540}
      y={y ?? T.bildMitte + 60}
      style={{
        transform: `translate(-50%,-50%) rotate(-9deg) scale(${2.6 - 1.6 * s})`,
        opacity: interpolate(f - ab, [0, 3], [0, 1], CLAMP),
      }}
    >
      <div
        style={{
          fontFamily: T.font,
          fontWeight: 900,
          fontSize: 92,
          letterSpacing: '0.04em',
          color: farbe,
          border: `10px solid ${farbe}`,
          borderRadius: 20,
          padding: '12px 40px 8px',
          background: '#0B1018D9',
          whiteSpace: 'nowrap',
          boxShadow: `0 0 60px ${farbe}55`,
        }}
      >
        {text}
      </div>
    </Abs>
  );
};
