/**
 * PIPER (lokale Neuralstimme, offline, gratis)
 *
 * Piper liefert keine Wort-Zeitstempel. Wir rechnen sie aus:
 *  1. ganze Szene natuerlich sprechen (MIT Satzzeichen -> fluessige Satzmelodie)
 *  2. jedes Wort einzeln sprechen -> relative Wortlaengen
 *  3. Pausen in der Szene erkennen -> Satz-/Kommagrenzen darauf einrasten
 *  4. innerhalb jeder Phrase die Woerter nach ihrer Laenge verteilen
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';

const KOK = path.resolve(import.meta.dirname, '..');
const EXE = path.join(KOK, 'werkzeug', 'piper', 'piper.exe');

const piper = (modell, eingabe, args) =>
  new Promise((ok, nein) => {
    const p = execFile(EXE, ['-m', modell, ...args], { maxBuffer: 1 << 26 }, (e) => (e ? nein(e) : ok()));
    p.stdin.end(Buffer.from(eingabe, 'utf8'));
  });

/** 16-bit-PCM-WAV -> { rate, proben (Float32) } */
export const wavLesen = async (datei) => {
  const b = await fs.readFile(datei);
  let o = 12;
  let rate = 22050;
  while (o < b.length - 8) {
    const id = b.toString('ascii', o, o + 4);
    const n = b.readUInt32LE(o + 4);
    if (id === 'fmt ') rate = b.readUInt32LE(o + 12);
    if (id === 'data') {
      const proben = new Float32Array(n / 2);
      for (let i = 0; i < proben.length; i++) proben[i] = b.readInt16LE(o + 8 + i * 2) / 32768;
      return { rate, proben };
    }
    o += 8 + n + (n % 2);
  }
  throw new Error(`kein data-Block in ${datei}`);
};

/** Lautstaerke je 10 ms -> stimmhaft ja/nein */
const stimmhaft = ({ rate, proben }) => {
  const fenster = Math.round(rate / 100);
  const rms = [];
  for (let i = 0; i < proben.length; i += fenster) {
    let s = 0;
    const ende = Math.min(proben.length, i + fenster);
    for (let k = i; k < ende; k++) s += proben[k] * proben[k];
    rms.push(Math.sqrt(s / (ende - i)));
  }
  const spitze = Math.max(...rms);
  return rms.map((r) => r > spitze * 0.04);
};

/** Laenge des stimmhaften Teils (Sekunden) */
const sprechLaenge = (wav) => {
  const v = stimmhaft(wav);
  const a = v.indexOf(true);
  const e = v.lastIndexOf(true);
  return a < 0 ? 0.1 : (e - a + 1) / 100;
};

/** Pausen >= minDauer: [{ von, bis }] in Sekunden */
const pausenFinden = (wav, minDauer = 0.07) => {
  const v = stimmhaft(wav);
  const p = [];
  let ab = -1;
  for (let i = 0; i < v.length; i++) {
    if (!v[i] && ab < 0) ab = i;
    if (v[i] && ab >= 0) {
      if ((i - ab) / 100 >= minDauer) p.push({ von: ab / 100, bis: i / 100 });
      ab = -1;
    }
  }
  return { pausen: p, start: v.indexOf(true) / 100, ende: (v.lastIndexOf(true) + 1) / 100 };
};

/**
 * teile: [{ w (ohne Satzzeichen), roh (mit Satzzeichen), atem, komma, laenge (Originallaenge von w) }]
 * Liefert { dauer, woerter: [{ pos, start }] } - pos = Position im sprechText.
 */
export async function piperSprechen({ modell, teile, wavZiel, tmpOrdner, tempo = 1, satzpause = 0.3 }) {
  const args = ['--length_scale', String(tempo), '--sentence_silence', String(satzpause)];
  // 1. ganze Szene
  const satz = teile.map((t) => t.roh).join(' ');
  await piper(modell, satz, [...args, '-f', wavZiel]);
  const wav = await wavLesen(wavZiel);
  const dauer = wav.proben.length / wav.rate;

  // 2. Woerter einzeln (eine Zeile = eine Datei)
  await fs.rm(tmpOrdner, { recursive: true, force: true });
  await fs.mkdir(tmpOrdner, { recursive: true });
  await piper(modell, teile.map((t) => t.w).join('\n') + '\n', [...args, '--output_dir', tmpOrdner]);
  const dateien = (await fs.readdir(tmpOrdner)).filter((d) => d.endsWith('.wav'));
  // Piper benennt nach Zeitstempel -> nach Erstellungszeit sortieren
  const mitZeit = await Promise.all(
    dateien.map(async (d) => ({ d, t: (await fs.stat(path.join(tmpOrdner, d))).mtimeMs })),
  );
  mitZeit.sort((a, b) => a.t - b.t || a.d.localeCompare(b.d));
  const gewicht = [];
  for (const [i, t] of teile.entries()) {
    const f = mitZeit[i];
    gewicht.push(f ? sprechLaenge(await wavLesen(path.join(tmpOrdner, f.d))) : t.w.length * 0.07);
  }
  await fs.rm(tmpOrdner, { recursive: true, force: true });

  // 3. Phrasen (bis Komma/Satzende) und ihre erwarteten Laengen
  const phrasen = [];
  let akt = [];
  for (const [i, t] of teile.entries()) {
    akt.push(i);
    if (t.atem || t.komma || i === teile.length - 1) {
      phrasen.push(akt);
      akt = [];
    }
  }
  const { pausen, start, ende } = pausenFinden(wav);
  const summe = gewicht.reduce((a, b) => a + b, 0);
  const pausenZeit = pausen.filter((p) => p.von > start && p.bis < ende).reduce((a, p) => a + p.bis - p.von, 0);
  const faktor = Math.max(0.3, (ende - start - pausenZeit) / summe);

  // Grenzen: erwartete Position, dann auf die naechste echte Pause einrasten
  const grenzen = [{ a: start }];
  let t = start;
  for (let k = 0; k < phrasen.length - 1; k++) {
    t += phrasen[k].reduce((s, i) => s + gewicht[i], 0) * faktor;
    const kandidat = pausen
      .filter((p) => p.von > grenzen[k].a + 0.15 && Math.abs(p.von - t) < 0.6)
      .sort((x, y) => Math.abs(x.von - t) - Math.abs(y.von - t))[0];
    if (kandidat) {
      grenzen[k].e = kandidat.von;
      grenzen.push({ a: kandidat.bis });
      t = kandidat.bis;
    } else {
      grenzen[k].e = t;
      grenzen.push({ a: t });
    }
  }
  grenzen[grenzen.length - 1].e = ende;

  // 4. Woerter in ihrer Phrase verteilen
  const woerter = [];
  let pos = 0;
  for (const [k, ph] of phrasen.entries()) {
    const { a, e } = grenzen[k];
    const g = ph.reduce((s, i) => s + gewicht[i], 0);
    let x = a;
    for (const i of ph) {
      woerter.push({ pos, start: Math.max(0, x - 0.03) });
      x += ((e - a) * gewicht[i]) / g;
      // Position im ORIGINAL-Text (Untertitel), nicht in der Ersatzschreibweise
      pos += (teile[i].laenge ?? teile[i].w.length) + 1;
    }
  }
  return { dauer, woerter };
}
