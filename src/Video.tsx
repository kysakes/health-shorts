import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { T, sek } from './tema';
import type { Fotos, Szene, Thema, Zeiten } from './typen';
import { FotoEbene, Partikel, StudienKarte } from './Foto';
import { Schlagzeile } from './Schlagzeile';
import { schaetzDauer, wannWort, woerter } from './woerter';
import { Bild, Stempel, pop } from './Bild';
import { Untertitel } from './Untertitel';

/**
 * VIDEO-MOTOR
 * Szenenlaenge = Sprechdauer + Pause. Hintergrund und Logo laufen durch,
 * Szenen wechseln hart; neue Runde = Wisch-Uebergang.
 */

export const szenenFrames = (thema: Thema, zeiten: Zeiten | null) =>
  thema.szenen.map((s, i) => sek((zeiten?.szenen[i]?.dauer ?? schaetzDauer(s.text)) + (s.pause ?? T.pauseNachSzene)));

export const gesamtFrames = (thema: Thema, zeiten: Zeiten | null) =>
  szenenFrames(thema, zeiten).reduce((a, b) => a + b, 0);

const Hintergrund: React.FC = () => (
  <AbsoluteFill
    style={{ background: `radial-gradient(ellipse 90% 60% at 50% 40%, ${T.bgInnen} 0%, ${T.bgAussen} 75%)` }}
  />
);

const Logo: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: 56,
      top: 70,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: T.font,
      fontWeight: 900,
      fontSize: 30,
      letterSpacing: '0.14em',
      color: T.weiss,
      opacity: 0.85,
    }}
  >
    <div style={{ width: 18, height: 18, borderRadius: 9, background: T.gruen, boxShadow: `0 0 16px ${T.gruen}` }} />
    {T.marke}
  </div>
);

const Wisch: React.FC<{ farbe: string }> = ({ farbe }) => {
  const f = useCurrentFrame();
  if (f > 16) return null;
  const x = interpolate(f, [0, 16], [1300, -2300]);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: x,
          width: 1700,
          height: 2400,
          transform: 'skewX(-18deg)',
          display: 'flex',
        }}
      >
        <div style={{ flex: 1, background: T.pink }} />
        <div style={{ flex: 2, background: farbe }} />
        <div style={{ flex: 1, background: T.pink }} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * HOOK-TITEL: steht ab Frame 0 gross oben im ersten Bild. Viele schauen ohne Ton;
 * in den ersten 1-2 Sekunden muss klar sein, worum es geht.
 */
const HookTitel: React.FC<{ text: string; farbe: string }> = ({ text, farbe }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 170,
        left: 60,
        right: 60,
        textAlign: 'center',
        fontFamily: T.font,
        fontWeight: 900,
        fontSize: 78,
        lineHeight: 1.05,
        color: T.weiss,
        letterSpacing: '-0.01em',
        textShadow: '0 8px 0 #0009',
        transform: `scale(${0.92 + 0.08 * pop(f, 0)})`,
      }}
    >
      {text.split('|').map((zeile, i) => (
        <div key={i}>
          {zeile
            .trim()
            .split(/(\*[^*]+\*)/)
            .map((teil, k) =>
              teil.startsWith('*') ? (
                <span key={k} style={{ color: farbe }}>
                  {teil.slice(1, -1)}
                </span>
              ) : (
                <span key={k}>{teil}</span>
              ),
            )}
        </div>
      ))}
    </div>
  );
};

const SzeneView: React.FC<{
  szene: Szene;
  zeit: Zeiten['szenen'][number] | undefined;
  thema: Thema;
  dauer: number;
  neueRunde: boolean;
  hook?: string;
  nr: number;
  fotos: Fotos | null;
}> = ({ szene, zeit, thema, dauer, neueRunde, hook, nr, fotos }) => {
  const f = useCurrentFrame();
  const akzent = szene.farbe ?? T.gelb;
  const liste = woerter(szene, zeit, akzent);
  const wann = (w?: string) => {
    const s = wannWort(liste, w);
    return s === undefined ? undefined : Math.round(s * T.fps);
  };
  const stempelAb = szene.stempel ? wann(szene.stempel.wort) ?? Math.round(dauer * 0.55) : undefined;
  const schlagAb = szene.schlagzeile ? wann(szene.schlagzeile.wort) ?? 0 : undefined;
  // Wackeln beim Stempel und bei der Schlagzeile
  const wackelBei = (ab?: number) => {
    const d = ab !== undefined ? f - ab : -1;
    return d >= 0 && d < 12 ? Math.sin(d * 2.4) * 16 * (1 - d / 12) : 0;
  };
  const ruhig = !!thema.ruhig;
  const wackeln = ruhig ? 0 : wackelBei(stempelAb) + wackelBei(schlagAb) * 0.8;

  // Einstieg: kurzer Zoom aus der Unschaerfe (ruhig: nur weiche Blende der Grafik)
  const rein = interpolate(f, [0, 8], [1, 0], { extrapolateRight: 'clamp' });
  const studieAb = szene.studie ? wann(szene.studie.wort) ?? sek(0.8) : undefined;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={
          ruhig ? undefined : { transform: `scale(${1 + rein * 0.08})`, filter: rein > 0.02 ? `blur(${rein * 12}px)` : undefined }
        }
      >
        <FotoEbene szene={szene} nr={nr} themaId={thema.id} fotos={fotos} dauer={dauer} wann={wann} ruhig={ruhig} />
      </AbsoluteFill>
      {!ruhig && <Partikel farbe={akzent} />}
      {/* farbiger Schein hinter der Grafik */}
      {!ruhig && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle 520px at 50% ${T.bildMitte}px, ${akzent}24, transparent 70%)`,
          }}
        />
      )}
      {hook && <HookTitel text={hook} farbe={thema.hookFarbe ?? akzent} />}
      <AbsoluteFill
        style={{
          transform: `translate(${wackeln}px, ${wackeln * 0.4 + (hook ? 140 : 0)}px) scale(${ruhig ? 1 : 1.12 * (1 + rein * 0.1)})`,
          transformOrigin: `50% ${T.bildMitte}px`,
          opacity: 1 - rein,
        }}
      >
        {szene.bild && <Bild bild={szene.bild} f={f} dauer={dauer} wann={wann} akzent={akzent} />}
        {szene.stempel && stempelAb !== undefined && (
          <Stempel text={szene.stempel.text} farbe={szene.stempel.farbe} f={f} ab={stempelAb} y={szene.stempel.y} />
        )}
      </AbsoluteFill>

      {szene.runde && (
        <div
          style={{
            position: 'absolute',
            top: 190,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${neueRunde ? pop(f, 10) : 1})`,
          }}
        >
          <div
            style={{
              fontFamily: T.font,
              fontWeight: 900,
              fontSize: 38,
              letterSpacing: '0.1em',
              color: T.weiss,
              background: T.karte,
              border: `4px solid ${akzent}`,
              borderRadius: 999,
              padding: '12px 34px 10px',
            }}
          >
            {szene.runde}
          </div>
        </div>
      )}

      {szene.schlagzeile && schlagAb !== undefined && (
        <div style={{ position: 'absolute', inset: 0, transform: `translate(${wackeln}px, ${wackeln * 0.4}px)` }}>
          <Schlagzeile {...szene.schlagzeile} ab={schlagAb} oberhalb={!!szene.bild} sanft={ruhig} />
        </div>
      )}

      {szene.studie && studieAb !== undefined && (
        <StudienKarte
          titel={szene.studie.titel}
          zeile={szene.studie.zeile}
          farbe={akzent}
          ab={studieAb}
          y={hook ? 1150 : 168}
          sanft={ruhig}
        />
      )}

      <Untertitel liste={liste} akzent={akzent} />

      {zeit && <Audio src={staticFile(`ton/${thema.id}/${zeit.datei}`)} />}
      {neueRunde ? (
        <Audio src={staticFile('sfx/gecis.wav')} volume={0.5} />
      ) : ruhig ? (
        <Audio src={staticFile('sfx/gecis.wav')} volume={0.07} />
      ) : (
        <Audio src={staticFile(szene.fotos?.length ? 'sfx/gecis.wav' : 'sfx/pop.wav')} volume={szene.fotos?.length ? 0.16 : 0.3} />
      )}
      {stempelAb !== undefined && (
        <Sequence from={stempelAb} layout="none">
          <Audio src={staticFile('sfx/gum.wav')} volume={0.7} />
        </Sequence>
      )}
      {schlagAb !== undefined && (
        <Sequence from={schlagAb} layout="none">
          <Audio src={staticFile('sfx/gum.wav')} volume={ruhig ? 0.3 : 0.55} />
        </Sequence>
      )}
      {szene.bild?.typ === 'podest' && (
        <Sequence from={wann(szene.bild.plaetze.find((p) => p.rang === 1)?.label) ?? sek(1)} layout="none">
          <Audio src={staticFile('sfx/ding.wav')} volume={0.6} />
        </Sequence>
      )}

      {neueRunde && <Wisch farbe={akzent} />}
    </AbsoluteFill>
  );
};

export const Video: React.FC<{ thema: Thema; zeiten: Zeiten | null; fotos: Fotos | null }> = ({ thema, zeiten, fotos }) => {
  const frames = szenenFrames(thema, zeiten);
  const gesamt = frames.reduce((a, b) => a + b, 0);
  return (
    <AbsoluteFill style={{ backgroundColor: T.bgAussen }}>
      <Hintergrund />
      <Series>
        {thema.szenen.map((szene, i) => (
          <Series.Sequence key={i} durationInFrames={frames[i]}>
            <SzeneView
              szene={szene}
              zeit={zeiten?.szenen[i]}
              thema={thema}
              dauer={frames[i]}
              neueRunde={!!szene.runde && i > 0 && szene.runde !== thema.szenen[i - 1].runde}
              hook={i === 0 ? thema.hook : undefined}
              nr={i}
              fotos={fotos}
            />
          </Series.Sequence>
        ))}
      </Series>
      {thema.musik && (
        <Audio
          src={staticFile(`musik/${thema.musik.datei}`)}
          volume={(fr) =>
            thema.musik!.lautstaerke * interpolate(fr, [0, 20, gesamt - 45, gesamt], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          }
        />
      )}
      <Logo />
      {thema.quelleKurz && (
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 112,
            fontFamily: T.font,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: '0.04em',
            color: T.grau,
          }}
        >
          {thema.quelleKurz}
        </div>
      )}
    </AbsoluteFill>
  );
};
