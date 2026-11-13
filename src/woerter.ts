import type { Szene, Zeiten } from './typen';

/**
 * Text -> Woerter mit Startzeit (Sekunden ab Szenenbeginn).
 *
 * Die Stimme bekommt den Text ohne Sternchen. Die Zeitstempel kommen mit
 * Zeichenposition zurueck, darueber ordnen wir sie den Woertern zu.
 * Ohne Aufnahme wird gleichmaessig verteilt (stille Vorschau).
 */

export type Wort = { w: string; hl: boolean; farbe?: string; start: number; pos: number };

/**
 * Satzzeichen fliegen fuer die Stimme raus: An Punkt, Komma, Strich usw.
 * setzen die TTS-Stimmen sonst eine Betonung/Pause, die abgehackt klingt.
 * Die Untertitel behalten die Zeichen. Achtung: "2–4" wuerde zu "24" -
 * im Text also "2 bis 4" schreiben.
 */
const ZEICHEN = /[.,:;!?…–—\-()"'„“”‚‘’*]/g;
const sprechWort = (w: string) => w.replace(ZEICHEN, '');

/** Gesprochene Woerter mit Markierung (*Wort* = betonen). */
export const sprechTeile = (t: string) => {
  let markiert = false;
  const out: { w: string; roh: string; hl: boolean; atem: boolean; komma: boolean }[] = [];
  for (const tok of t.replace(/\s+/g, ' ').trim().split(' ')) {
    const hl = markiert || tok.startsWith('*');
    if ((tok.match(/\*/g) || []).length % 2 === 1) markiert = !markiert;
    const w = sprechWort(tok);
    // atem = Satzende: kurze Pause statt Stimmsenkung
    // roh = mit Satzzeichen (fuer Stimmen, die damit natuerlich klingen, z. B. Piper)
    if (w) out.push({ w, roh: tok.replace(/\*/g, ''), hl, atem: /[.?!:]\**$/.test(tok), komma: /[,;–—]\**$/.test(tok) });
  }
  return out;
};

export const sprechText = (t: string) =>
  sprechTeile(t)
    .map((x) => x.w)
    .join(' ');

const kern = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

/** Geschaetzte Sprechdauer ohne Aufnahme (~2,6 Woerter/s). */
export const schaetzDauer = (text: string) => Math.max(1.6, sprechText(text).split(' ').length / 2.6 + 0.3);

export const woerter = (
  szene: Szene,
  zeit: Zeiten['szenen'][number] | undefined,
  standardFarbe: string,
): Wort[] => {
  const roh = szene.text.replace(/\s+/g, ' ').trim();
  const sauber = sprechText(roh);
  const dauer = zeit?.dauer ?? schaetzDauer(roh);

  let markiert = false;
  let pos = 0;
  const liste: Wort[] = [];
  for (const t of roh.split(' ')) {
    const sterne = (t.match(/\*/g) || []).length;
    const hl = markiert || t.startsWith('*');
    if (sterne % 2 === 1) markiert = !markiert;
    const w = t.replace(/\*/g, '');
    const eigene = szene.farben?.[w.replace(/[^\p{L}\p{N}]/gu, '')];
    liste.push({ w, hl: hl || !!eigene, farbe: eigene ?? (hl ? szene.farbe ?? standardFarbe : undefined), start: NaN, pos });
    // Position bezieht sich auf den Sprechtext (ohne Satzzeichen)
    const gesprochen = sprechWort(w);
    if (gesprochen) pos += gesprochen.length + 1;
  }

  const marken = [...(zeit?.woerter ?? [])].sort((a, b) => a.pos - b.pos);
  if (marken.length) {
    liste.forEach((w, i) => {
      const bis = liste[i + 1]?.pos ?? Infinity;
      const m = marken.find((x) => x.pos >= w.pos && x.pos < bis);
      if (m) w.start = m.start;
    });
  }
  // Luecken fuellen: lineare Verteilung zwischen bekannten Punkten
  liste.forEach((w, i) => {
    if (!Number.isNaN(w.start)) return;
    const vor = [...liste.slice(0, i)].reverse().find((x) => !Number.isNaN(x.start));
    const nach = liste.slice(i + 1).find((x) => !Number.isNaN(x.start));
    const a = vor ? vor.start : 0;
    const b = nach ? nach.start : dauer * 0.92;
    const pa = vor ? vor.pos : 0;
    const pb = nach ? nach.pos : sauber.length;
    w.start = a + ((w.pos - pa) / Math.max(1, pb - pa)) * (b - a);
  });
  return liste;
};

/** Sekunde, in der ein Wort (Anfang genuegt) gesprochen wird. */
export const wannWort = (liste: Wort[], wort?: string): number | undefined => {
  if (!wort) return undefined;
  const k = kern(wort);
  return liste.find((w) => kern(w.w).startsWith(k))?.start;
};
