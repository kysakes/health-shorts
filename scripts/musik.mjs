/**
 * LO-FI-HINTERGRUNDMUSIK - komplett selbst erzeugt, keine Lizenzfragen.
 *
 *   node scripts/musik.mjs            -> public/musik/lofi-1.wav (150 s)
 *   node scripts/musik.mjs 2          -> andere Variante (anderer Seed/Akkorde)
 *
 * E-Piano-Akkorde (Dm9 - G13 - Cmaj9 - Am9), weicher Bass, leise Drums mit Swing,
 * Vinyl-Knistern, warmer Tiefpass. Bewusst ruhig: liegt UNTER der Stimme.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const KOK = path.resolve(import.meta.dirname, '..');
const variante = Number(process.argv[2] ?? 1);
const RATE = 44100;
const LAENGE = 150;
const BPM = variante === 2 ? 70 : 76;
const SCHLAG = 60 / BPM;
const TAKT = SCHLAG * 4;

const puffer = new Float32Array(RATE * LAENGE);
let saat = 1234 + variante * 999;
const zufall = () => ((saat = (saat * 16807) % 2147483647) / 2147483647);
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

/** Klang ab Sekunde `ab` fuer `dauer` Sekunden aufaddieren */
const add = (ab, dauer, fn) => {
  const s0 = Math.round(ab * RATE);
  const n = Math.round(dauer * RATE);
  for (let i = 0; i < n && s0 + i < puffer.length; i++) puffer[s0 + i] += fn(i / RATE);
};

// E-Piano: wenige Obertoene, die schneller ausklingen als der Grundton
const ePiano = (ab, midi, laut) => {
  const f = hz(midi) * (1 + (zufall() - 0.5) * 0.002);
  add(ab, 3.2, (t) => {
    const an = Math.min(1, t / 0.008);
    let x = 0;
    x += Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 1.2);
    x += 0.32 * Math.sin(2 * Math.PI * 2 * f * t) * Math.exp(-t * 2.6);
    x += 0.1 * Math.sin(2 * Math.PI * 3 * f * t) * Math.exp(-t * 4);
    x += 0.04 * Math.sin(2 * Math.PI * 7 * f * t) * Math.exp(-t * 14); // "Tine"-Anschlag
    return laut * an * x * (1 + 0.12 * Math.sin(2 * Math.PI * 4.6 * t));
  });
};

const bass = (ab, midi, dauer) => {
  const f = hz(midi);
  add(ab, dauer, (t) => {
    const an = Math.min(1, t / 0.015);
    const aus = Math.min(1, (dauer - t) / 0.08);
    return 0.42 * an * aus * Math.exp(-t * 0.9) * (Math.sin(2 * Math.PI * f * t) + 0.15 * Math.sin(4 * Math.PI * f * t));
  });
};

const kick = (ab, laut = 1) =>
  add(ab, 0.45, (t) => {
    const f = 45 + 75 * Math.exp(-t * 28);
    return 0.75 * laut * Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 9);
  });

const snare = (ab) => {
  let tp = 0;
  add(ab, 0.35, (t) => {
    tp += 0.35 * ((zufall() * 2 - 1) - tp); // weiches Rauschen
    return 0.22 * tp * Math.exp(-t * 16) + 0.12 * Math.sin(2 * Math.PI * 185 * t) * Math.exp(-t * 30);
  });
};

const hihat = (ab, laut) => {
  let alt = 0;
  add(ab, 0.08, (t) => {
    const r = zufall() * 2 - 1;
    const hp = r - alt; // Hochpass
    alt = r;
    return laut * 0.07 * hp * Math.exp(-t * 55);
  });
};

// Akkorde: [Bass, Voicing...]
const AKKORDE =
  variante === 2
    ? [
        [41, 52, 55, 60, 64], // Fmaj7
        [40, 50, 55, 59, 62], // Em7
        [38, 48, 53, 57, 60], // Dm7
        [36, 47, 52, 55, 59], // Cmaj7
      ]
    : [
        [38, 53, 57, 60, 64], // Dm9
        [43, 53, 59, 64, 69], // G13
        [36, 52, 55, 59, 62], // Cmaj9
        [45, 55, 59, 60, 64], // Am9
      ];

const takte = Math.ceil(LAENGE / TAKT);
for (let k = 0; k < takte; k++) {
  const t0 = k * TAKT;
  const [b, ...akkord] = AKKORDE[k % AKKORDE.length];
  // Akkord leicht "geschlagen", zweiter weicherer Anschlag auf 3-und
  akkord.forEach((m, i) => ePiano(t0 + i * 0.018, m, 0.16));
  akkord.slice(1).forEach((m, i) => ePiano(t0 + SCHLAG * 2.5 + i * 0.012, m, 0.08));
  bass(t0, b, SCHLAG * 2.2);
  bass(t0 + SCHLAG * 2, b, SCHLAG * 1.9);

  // Drums erst ab Takt 2 -> sanfter Einstieg
  if (k >= 1) {
    kick(t0);
    kick(t0 + SCHLAG * 1.75, 0.5);
    kick(t0 + SCHLAG * 2);
    snare(t0 + SCHLAG);
    snare(t0 + SCHLAG * 3);
    for (let a = 0; a < 8; a++) {
      const swing = a % 2 ? SCHLAG * 0.09 : 0;
      hihat(t0 + (a * SCHLAG) / 2 + swing, a % 2 ? 0.6 : 1);
    }
  }
}

// Vinyl: leises Rauschen + vereinzeltes Knistern
let braun = 0;
for (let i = 0; i < puffer.length; i++) {
  braun = 0.995 * braun + 0.005 * (zufall() * 2 - 1);
  puffer[i] += braun * 0.6;
  if (zufall() < 0.00012) puffer[i] += (zufall() - 0.5) * 0.25;
}

// Warmer Tiefpass + sanfte Saettigung + Normalisieren
let lp = 0;
let spitze = 0;
for (let i = 0; i < puffer.length; i++) {
  lp += 0.38 * (puffer[i] - lp);
  puffer[i] = Math.tanh(lp * 1.4);
  spitze = Math.max(spitze, Math.abs(puffer[i]));
}
const norm = 0.89 / spitze;

// 16-bit-Mono-WAV schreiben
const daten = Buffer.alloc(44 + puffer.length * 2);
daten.write('RIFF', 0);
daten.writeUInt32LE(36 + puffer.length * 2, 4);
daten.write('WAVEfmt ', 8);
daten.writeUInt32LE(16, 16);
daten.writeUInt16LE(1, 20);
daten.writeUInt16LE(1, 22);
daten.writeUInt32LE(RATE, 24);
daten.writeUInt32LE(RATE * 2, 28);
daten.writeUInt16LE(2, 32);
daten.writeUInt16LE(16, 34);
daten.write('data', 36);
daten.writeUInt32LE(puffer.length * 2, 40);
for (let i = 0; i < puffer.length; i++) daten.writeInt16LE(Math.round(puffer[i] * norm * 32767), 44 + i * 2);

const ziel = path.join(KOK, 'public', 'musik');
await fs.mkdir(ziel, { recursive: true });
await fs.writeFile(path.join(ziel, `lofi-${variante}.wav`), daten);
console.log(`  public/musik/lofi-${variante}.wav  (${LAENGE} s, ${BPM} BPM)`);
