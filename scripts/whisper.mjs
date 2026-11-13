/**
 * WHISPER (lokal, offline, nur Prozessor) - exakte Wortzeiten + Hoercheck
 *
 * Piper liefert keine Zeitstempel. Whisper hoert die fertige Szene ab und sagt,
 * wann welches Wort beginnt. Die erkannten Woerter werden per Sequenz-Abgleich
 * den Skript-Woertern zugeordnet; nicht zuordenbare Woerter interpoliert
 * src/woerter.ts wie bisher.
 *
 * Hoercheck: Skript-Woerter, die Whisper deutlich anders verstanden hat, werden
 * gemeldet. Achtung: Whisper "korrigiert" oft still (hoert "Espresso", auch wenn
 * "Eschpresso" gesprochen wurde) - der Check findet grobe Fehler, nicht alle.
 *
 * Installation (einmalig, automatisch): whisper.cpp 1.5.5 (Windows-Binary, neuere
 * gibt es fuer Windows nicht) + Modell "small" (~470 MB) nach werkzeug/whisper.cpp
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { installWhisperCpp, downloadWhisperModel, transcribe, toCaptions } from '@remotion/install-whisper-cpp';

const KOK = path.resolve(import.meta.dirname, '..');
const ORDNER = path.join(KOK, 'werkzeug', 'whisper.cpp');
const VERSION = '1.5.5';
const MODELL = 'small';
const SPRACHE = { de: 'German', tr: 'Turkish' };

let bereit = false;
export async function whisperBereit() {
  if (bereit) return;
  await installWhisperCpp({ to: ORDNER, version: VERSION, printOutput: false });
  await downloadWhisperModel({ model: MODELL, folder: ORDNER, printOutput: true });
  bereit = true;
}

const norm = (w) =>
  w
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}]/gu, '');

const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const aehnlich = (a, b) => (!a.length || !b.length ? 0 : 1 - lev(a, b) / Math.max(a.length, b.length));

/** Szene abhoeren -> [{ w, start, ende }] in Sekunden */
export async function hoeren(wav, sprache = 'de') {
  await whisperBereit();
  wav = path.resolve(wav); // whisper.cpp laeuft in seinem eigenen Ordner -> absolute Pfade
  const w16 = wav.replace(/\.wav$/i, '') + '.16k.wav';
  execFileSync(
    'npx',
    ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', `"${wav}"`, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', `"${w16}"`],
    { cwd: KOK, shell: true },
  );
  try {
    const out = await transcribe({
      inputPath: w16,
      whisperPath: ORDNER,
      whisperCppVersion: VERSION,
      model: MODELL,
      tokenLevelTimestamps: true,
      language: SPRACHE[sprache] ?? 'German',
      printOutput: false,
    });
    const { captions } = toCaptions({ whisperCppOutput: out });
    // Tokens zu Woertern zusammensetzen: Leerzeichen am Anfang = neues Wort
    const woerter = [];
    for (const c of captions) {
      if (/^\s*\[.*\]\s*$/.test(c.text) || !c.text.trim()) continue;
      const zeit = (c.timestampMs ?? c.startMs) / 1000;
      if (c.text.startsWith(' ') || !woerter.length) woerter.push({ w: c.text.trim(), start: zeit, ende: c.endMs / 1000 });
      else {
        const letztes = woerter[woerter.length - 1];
        letztes.w += c.text;
        letztes.ende = c.endMs / 1000;
      }
    }
    return woerter;
  } finally {
    await fs.unlink(w16).catch(() => {});
  }
}

/**
 * Skript-Woerter (Original + gesprochene Ersatzschreibweise) mit gehoerten Woertern
 * abgleichen (Needleman-Wunsch). Liefert pro Skript-Wort { start? , gehoert?, sim }.
 */
export function abgleichen(skript, gehoert) {
  const S = skript.map((s) => [norm(s.original), norm(s.gesprochen)]);
  const H = gehoert.map((h) => norm(h.w));
  const sim = (i, j) => Math.max(aehnlich(S[i][0], H[j]), aehnlich(S[i][1], H[j]));
  const n = S.length;
  const m = H.length;
  const P = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) P[i][j] = Math.max(P[i - 1][j], P[i][j - 1], P[i - 1][j - 1] + (sim(i - 1, j - 1) - 0.45));
  const ergebnis = skript.map(() => ({ sim: 0 }));
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    const s = sim(i - 1, j - 1);
    if (Math.abs(P[i][j] - (P[i - 1][j - 1] + s - 0.45)) < 1e-9 && s > 0.45) {
      ergebnis[i - 1] = { start: gehoert[j - 1].start, gehoert: gehoert[j - 1].w, sim: s };
      i--;
      j--;
    } else if (P[i][j] === P[i - 1][j]) i--;
    else j--;
  }
  return ergebnis;
}
