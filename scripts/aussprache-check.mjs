/**
 * AUSSPRACHE PRUEFEN (vor dem Vertonen)
 *
 *   node scripts/aussprache-check.mjs 03-opc          # alle Woerter
 *   node scripts/aussprache-check.mjs 03-opc Koffein  # nur bestimmte Woerter testen
 *
 * Zeigt die eSpeak-Lautschrift, die Piper fuer jedes Wort benutzt – nach dem
 * Aussprache-Woerterbuch. Worauf achten:
 *   - "sp"/"st" am Wortanfang von Fremdwoertern -> ʃp/ʃt (Eschpresso)
 *   - Betonung (ˈ) auf der falschen Silbe (Koffein, Labor, Kakao)
 *   - kurzes ʊ statt langem uː in Blut-Komposita
 *   - Abkuerzungen (OPC, EU) und Jahreszahlen
 * Fehler mit Ersatzschreibweise in scripts/aussprache.mjs eintragen.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { aussprechen } from './aussprache.mjs';

const KOK = path.resolve(import.meta.dirname, '..');
const [id, ...nurWoerter] = process.argv.slice(2);
if (!id) throw new Error('Thema angeben: node scripts/aussprache-check.mjs 03-opc');

const { thema } = await import(pathToFileURL(path.join(KOK, 'src', 'themen', `${id}.ts`)).href);
const sprache = thema.sprache ?? 'de';
const stimme = { de: 'de_DE-thorsten-high', tr: 'tr_TR-dfki-medium' }[sprache];

const woerter = new Map(); // gesprochen -> geschrieben
const quelle = nurWoerter.length ? nurWoerter : thema.szenen.flatMap((s) => s.text.replace(/\*/g, '').split(/\s+/));
for (const roh of quelle) {
  const w = roh.replace(/[.,!?:;()„“"]/g, '');
  if (w) woerter.set(aussprechen(w, sprache), w);
}

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'aussprache-'));
const liste = [...woerter.keys()];
const log = await new Promise((ok, nein) => {
  const p = execFile(
    path.join(KOK, 'werkzeug', 'piper', 'piper.exe'),
    ['-m', path.join(KOK, 'werkzeug', 'stimmen', `${stimme}.onnx`), '--output_dir', tmp, '--debug'],
    { maxBuffer: 1 << 26 },
    (e, _out, err) => (e ? nein(e) : ok(err)),
  );
  p.stdin.end(liste.join('\n') + '\n');
});
await fs.rm(tmp, { recursive: true, force: true });

const laute = log
  .split('\n')
  .filter((z) => z.includes('Converting') && z.includes('to ids:'))
  .map((z) => z.replace(/.*to ids: /, '').trim());

const breite = Math.max(...liste.map((w) => w.length), 10);
console.log(`\n  ${liste.length} Woerter | Stimme ${stimme} | * = durch Woerterbuch ersetzt\n`);
liste.forEach((gesprochen, i) => {
  const geschrieben = woerter.get(gesprochen);
  const mark = gesprochen !== geschrieben ? '*' : ' ';
  console.log(`  ${mark} ${geschrieben.padEnd(breite)}  ${laute[i] ?? '?'}`);
});
console.log('');
