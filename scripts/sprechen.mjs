/**
 * VERTONUNG
 *
 *   npm run sprechen 01-vitamin-d               # Windows-Stimme (offline, gratis)
 *   npm run sprechen 01-vitamin-d -- --eleven   # ElevenLabs (beste Qualitaet, braucht .env)
 *   npm run sprechen 01-vitamin-d -- --edge     # Microsoft Edge TTS (gratis, wenn der Dienst mitspielt)
 *   npm run sprechen 01-vitamin-d -- --neu      # alles neu, Cache ignorieren
 *
 * Pro Szene entsteht eine Audiodatei plus Wort-Zeitstempel. Daraus berechnet
 * das Video die Szenenlaenge UND die Wort-fuer-Wort-Untertitel. Du schreibst
 * nur den Text - Timing passiert von selbst.
 *
 * Ausgabe: public/ton/<id>/szene-XX.(wav|mp3) + zeiten.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

const run = promisify(execFile);
import { piperSprechen } from './piper.mjs';
import { aussprechen } from './aussprache.mjs';
import { hoeren, abgleichen } from './whisper.mjs';
const hoercheck = [];
const KOK = path.resolve(import.meta.dirname, '..');

const AYAR = {
  // Stefan = maennlich, Katja = weiblich
  windows: {
    stimme: process.env.WIN_STIMME || 'Stefan',
    // Tempo + Pausen wie bei Erklaer-Creators: ruhig sprechen, nach jedem Satz
    // kurz wirken lassen, vor der Pointe (*Schluesselwort*) einen Spannungs-Moment.
    // Recherche (Shorts-Guides 2026): Erklaer-Tempo ~125-145 Woerter/min,
    // gezielte Pausen 0,3-0,5 s; alles ueber ~0,5 s wirkt wie Leerlauf.
    tempo: '1.06',
    grundton: '+6%',
    atempause: '380ms', // Satzende, ohne die abfallende Satzmelodie
    kommapause: '160ms', // Komma / Gedankenstrich
    spannung: '300ms', // vor jedem *Schluesselwort*
    betonung: { pitch: '+22%', volume: '+40%', rate: '-12%' },
  },
  // Piper: lokale Neuralstimme. tempo = length_scale (kleiner = schneller)
  // whisper: Wortzeiten per Whisper abhoeren (exakt) statt schaetzen + Hoercheck
  piper: { tempo: { de: 1.07, tr: 0.95 }, satzpause: 0.35, stimmen: { tr: 'tr_TR-dfki-medium', de: 'de_DE-thorsten-high' }, whisper: true },
  edge: { stimme: process.env.EDGE_STIMME || 'de-DE-ConradNeural', tempo: '+8%' },
  eleven: {
    modell: 'eleven_multilingual_v2',
    ton: { stability: 0.4, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
  },
};

const stopp = (m) => {
  console.error(`\n  FEHLER: ${m}\n`);
  process.exit(1);
};

// .env ohne Paket einlesen
try {
  const roh = await fs.readFile(path.join(KOK, '.env'), 'utf8');
  for (const z of roh.split('\n')) {
    const m = z.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = (m[2] ?? '').replace(/^["']|["']$/g, '').trim();
  }
} catch {}

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const neu = args.includes('--neu');
const motor = args.includes('--eleven') ? 'eleven' : args.includes('--edge') ? 'edge' : args.includes('--piper') ? 'piper' : 'windows';
if (!id) stopp('Thema angeben, z. B.:  npm run sprechen 01-vitamin-d');

const datei = path.join(KOK, 'src', 'themen', `${id}.ts`);
const { thema } = await import(pathToFileURL(datei).href);
if (!thema?.szenen) stopp(`${id}.ts exportiert kein 'thema'.`);

// Genau dieser Text geht an die Stimme (ohne *Markierungen* und Satzzeichen).
// Dieselbe Funktion nutzt das Video fuer die Untertitel-Zuordnung.
const { sprechText, sprechTeile } = await import(pathToFileURL(path.join(KOK, 'src', 'woerter.ts')).href);

/**
 * SSML fuer die Windows-Stimme: insgesamt etwas hoeher (wacher), *Schluesselwoerter*
 * hoeher, lauter, langsamer -> mehr Ausdruck. Liefert ausserdem die Zuordnung
 * SSML-Position -> Position im reinen Sprechtext (fuer die Untertitel).
 */
// Sprache des Themas -> Windows-Stimme (beide maennlich)
const SPRACHEN = {
  de: { lang: 'de-DE', stimme: 'Stefan' },
  tr: { lang: 'tr-TR', stimme: 'Tolga' },
};
const SPRACHE = SPRACHEN[thema.sprache ?? 'de'];
if (!process.env.WIN_STIMME) AYAR.windows.stimme = SPRACHE.stimme;

const ESC = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ssmlBauen = (roh) => {
  const v = AYAR.windows;
  let x = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${SPRACHE.lang}"><prosody pitch="${v.grundton}">`;
  const karte = [];
  let plain = 0;
  const teile = sprechTeile(roh);
  for (const [i, t] of teile.entries()) {
    if (i) x += ' ';
    // Spannungspause vor einer Pointe - nicht, wenn eh gerade eine Pause war
    const davor = teile[i - 1];
    if (t.hl && i > 0 && !davor.hl && !davor.atem && !davor.komma) x += `<break time="${v.spannung}"/>`;
    if (t.hl) x += `<prosody pitch="${v.betonung.pitch}" volume="${v.betonung.volume}" rate="${v.betonung.rate}">`;
    karte.push({ ssml: x.length, plain });
    x += ESC(t.w);
    if (t.hl) x += '</prosody>';
    if (t.atem && i < teile.length - 1) x += `<break time="${v.atempause}"/>`;
    else if (t.komma) x += `<break time="${v.kommapause}"/>`;
    plain += t.w.length + 1;
  }
  return { ssml: x + '</prosody></speak>', karte };
};
const ssmlZuPlain = (karte, p) => {
  let best = karte[0];
  for (const k of karte) if (k.ssml <= p) best = k;
  return best.plain;
};

const ziel = path.join(KOK, 'public', 'ton', thema.id);
await fs.mkdir(ziel, { recursive: true });

const cachePfad = path.join(ziel, '.cache.json');
let cache = {};
if (!neu) {
  try {
    cache = JSON.parse(await fs.readFile(cachePfad, 'utf8'));
  } catch {}
}

console.log(`\n  ${thema.titel}\n  ${thema.szenen.length} Szenen | Stimme: ${motor}\n`);

const ergebnis = { szenen: [] };
const neuerCache = {};
const tmp = path.join(ziel, '.text.txt');

for (const [i, s] of thema.szenen.entries()) {
  const nr = String(i + 1).padStart(2, '0');
  const text = sprechText(s.text);
  const endung = motor === 'windows' || motor === 'piper' ? 'wav' : 'mp3';
  // Markierungen (*Wort*) gehoeren in den Hash: sie steuern die Betonung.
  const hash = crypto.createHash('sha1').update(aussprechen(s.text, thema.sprache) + motor + JSON.stringify(AYAR[motor])).digest('hex');
  // Hash im Dateinamen: neue Aufnahme = neue Datei, nichts wird ueberschrieben
  // (alte Dateien sind teils gesperrt, z. B. solange Studio/Player sie offen hat).
  const audio = `szene-${nr}-${hash.slice(0, 8)}.${endung}`;

  let info;
  if (cache[nr]?.hash === hash) {
    info = cache[nr].info;
    console.log(`  ${nr}  unverändert  ${info.dauer.toFixed(2)}s`);
  } else {
    const jsonTmp = path.join(ziel, `.szene-${nr}.json`);
    if (motor === 'windows') {
      const { ssml, karte } = ssmlBauen(s.text);
      await fs.writeFile(tmp, ssml, 'utf8');
      await run('powershell', [
        '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(KOK, 'scripts', 'stimme-windows.ps1'),
        '-Stimme', AYAR.windows.stimme, '-Tempo', AYAR.windows.tempo,
        '-Wav', path.join(ziel, audio), '-Json', jsonTmp, '-TextDatei', tmp,
      ]);
      info = JSON.parse((await fs.readFile(jsonTmp, 'utf8')).replace(/^﻿/, ''));
      for (const w of info.woerter) w.pos = ssmlZuPlain(karte, w.pos);
    } else if (motor === 'piper') {
      const sprache = thema.sprache ?? 'de';
      const original = sprechTeile(s.text);
      // Aussprache-Woerterbuch nur fuer die Stimme (Untertitel bleiben unveraendert)
      const teile = original.map((t) => ({
        ...t,
        laenge: t.w.length,
        w: aussprechen(t.w, sprache),
        roh: aussprechen(t.roh, sprache),
      }));
      info = await piperSprechen({
        modell: path.join(KOK, 'werkzeug', 'stimmen', AYAR.piper.stimmen[sprache] + '.onnx'),
        teile,
        wavZiel: path.join(ziel, audio),
        tmpOrdner: path.join(ziel, '.woerter'),
        tempo: AYAR.piper.tempo[sprache],
        satzpause: AYAR.piper.satzpause,
      });
      if (AYAR.piper.whisper) {
        try {
          const gehoert = await hoeren(path.join(ziel, audio), sprache);
          const zuordnung = abgleichen(
            original.map((t, k) => ({ original: t.w, gesprochen: teile[k].w })),
            gehoert,
          );
          const marken = [];
          let pos = 0;
          zuordnung.forEach((z, k) => {
            if (z.start !== undefined) marken.push({ pos, start: Math.max(0, z.start - 0.03) });
            pos += original[k].w.length + 1;
          });
          // Nur uebernehmen, wenn Whisper den Grossteil gefunden hat
          if (marken.length >= original.length * 0.6) info.woerter = marken;
          zuordnung.forEach((z, k) => {
            if (original[k].w.length > 2 && z.sim < 0.75)
              hoercheck.push(`  Szene ${nr}: "${original[k].w}" -> gehoert ${z.gehoert ? `"${z.gehoert}"` : '(nichts zugeordnet)'}`);
          });
          console.log(`      Whisper: ${marken.length}/${original.length} Woerter exakt`);
        } catch (e) {
          console.log(`      Whisper fehlgeschlagen (${e.message.split('\n')[0]}) - Schaetzung bleibt`);
        }
      }
    } else if (motor === 'edge') {
      await run('py', [path.join(KOK, 'scripts', 'tts.py'), AYAR.edge.stimme, AYAR.edge.tempo, path.join(ziel, audio), jsonTmp, text]);
      info = JSON.parse(await fs.readFile(jsonTmp, 'utf8'));
      // Edge liefert keine Zeichenposition -> der Reihe nach im Text suchen
      let ab = 0;
      for (const w of info.woerter) {
        const p = text.indexOf(w.w, ab);
        w.pos = p >= 0 ? p : ab;
        ab = p >= 0 ? p + w.w.length : ab;
      }
    } else {
      info = await eleven(text, path.join(ziel, audio));
    }
    await fs.unlink(jsonTmp).catch(() => {});
    info.woerter = (info.woerter || []).map((w) => ({ pos: w.pos, start: w.start }));
    console.log(`  ${nr}  neu  ${info.dauer.toFixed(2)}s  ${text.slice(0, 50)}…`);
  }
  neuerCache[nr] = { hash, info };
  ergebnis.szenen.push({ datei: audio, ...info });
}

await fs.unlink(tmp).catch(() => {});
await fs.writeFile(path.join(ziel, 'zeiten.json'), JSON.stringify(ergebnis));
await fs.writeFile(cachePfad, JSON.stringify(neuerCache));
const summe = ergebnis.szenen.reduce((t, s) => t + s.dauer, 0);
console.log(`\n  Sprechzeit gesamt: ${summe.toFixed(1)} s`);
if (hoercheck.length) {
  const bericht = ['HOERCHECK (Whisper hat diese Woerter anders verstanden - Aussprache pruefen):', ...hoercheck].join('\n');
  console.log('\n' + bericht);
  await fs.writeFile(path.join(ziel, 'hoercheck.txt'), bericht + '\n');
}
console.log(`  Weiter:  npm run render ${thema.id}\n`);

/** ElevenLabs mit Zeichen-Zeitstempeln -> Wortanfaenge. */
async function eleven(text, ziel) {
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) stopp('ELEVENLABS_API_KEY und ELEVENLABS_VOICE_ID in .env eintragen.');
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: AYAR.eleven.modell, voice_settings: AYAR.eleven.ton }),
  });
  if (!r.ok) stopp(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const d = await r.json();
  await fs.writeFile(ziel, Buffer.from(d.audio_base64, 'base64'));
  const z = d.alignment.characters;
  const st = d.alignment.character_start_times_seconds;
  const en = d.alignment.character_end_times_seconds;
  const woerter = [];
  for (let i = 0; i < z.length; i++) {
    if (z[i] !== ' ' && (i === 0 || z[i - 1] === ' ')) woerter.push({ pos: i, start: st[i] });
  }
  return { dauer: en[en.length - 1] + 0.15, woerter };
}
