import React from 'react';
import { Composition, staticFile } from 'remotion';
import { T } from './tema';
import { Video, gesamtFrames } from './Video';
import type { Fotos, Thema, Zeiten } from './typen';

// --- THEMEN HIER EINTRAGEN ---
import { thema as t01 } from './themen/01-vitamin-d';
import { thema as t01tr } from './themen/01-vitamin-d-tr';
import { thema as t01neu } from './themen/01-vitamin-d-neu';
import { thema as t02 } from './themen/02-koffein';
import { thema as t03 } from './themen/03-opc';
import { thema as t04 } from './themen/04-bittersalz';
import { thema as t05 } from './themen/05-vitamin-d';
import { thema as t06 } from './themen/06-vitamin-c';
import { thema as t07 } from './themen/07-zink';
import { thema as t08 } from './themen/08-msm';
import { thema as t09 } from './themen/09-weltraumschrott';

const THEMEN: Thema[] = [t01, t01tr, t01neu, t02, t03, t04, t05, t06, t07, t08, t09];

const jsonLaden = async <X,>(pfad: string): Promise<X | null> => {
  try {
    const r = await fetch(staticFile(pfad));
    return r.ok ? ((await r.json()) as X) : null;
  } catch {
    return null;
  }
};

/**
 * Lange Fassung = alle Szenen. Kurzfassung = nur die Szenen aus `thema.kurzfassung`
 * (1-basiert), mit denselben Aufnahmen/Clips: Zeiten und Foto-Schluessel werden
 * auf die neuen Szenen-Nummern umgeschrieben. thema.id bleibt gleich (Dateipfade).
 */
const fassungen = (thema: Thema) => {
  const lang = { compId: thema.id, auswahl: null as number[] | null };
  if (!thema.kurzfassung?.length) return [lang];
  return [lang, { compId: `${thema.id}-kurz`, auswahl: thema.kurzfassung.map((n) => n - 1) }];
};

export const RemotionRoot: React.FC = () => (
  <>
    {THEMEN.flatMap((thema) =>
      fassungen(thema).map(({ compId, auswahl }) => (
        <Composition
          key={compId}
          id={compId}
          component={Video}
          width={T.breite}
          height={T.hoehe}
          fps={T.fps}
          durationInFrames={300}
          defaultProps={{ thema, zeiten: null as Zeiten | null, fotos: null as Fotos | null }}
          calculateMetadata={async ({ props }) => {
            const zeitenAlle = await jsonLaden<Zeiten>(`ton/${props.thema.id}/zeiten.json`);
            const fotosAlle = await jsonLaden<Fotos>(`fotos/${props.thema.id}/fotos.json`);
            if (!auswahl) {
              return {
                durationInFrames: gesamtFrames(props.thema, zeitenAlle),
                props: { ...props, zeiten: zeitenAlle, fotos: fotosAlle },
              };
            }
            const themaKurz: Thema = { ...props.thema, szenen: auswahl.map((i) => props.thema.szenen[i]) };
            const zeiten = zeitenAlle ? { szenen: auswahl.map((i) => zeitenAlle.szenen[i]) } : null;
            const fotos: Fotos = {};
            auswahl.forEach((alt, neu) => {
              for (const [schluessel, wert] of Object.entries(fotosAlle ?? {})) {
                const [s, k] = schluessel.split('-');
                if (Number(s) === alt) fotos[`${neu}-${k}`] = wert;
              }
            });
            return {
              durationInFrames: gesamtFrames(themaKurz, zeiten),
              props: { ...props, thema: themaKurz, zeiten, fotos },
            };
          }}
        />
      )),
    )}
  </>
);
