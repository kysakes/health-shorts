/**
 * KOMPLETT PRODUZIEREN (ein oder mehrere Themen, nacheinander)
 *
 *   node scripts/produzieren.mjs 04-bittersalz 05-vitamin-d
 *
 * Pro Thema: Stimme (Piper + Whisper) -> Clips (Pexels) -> Render Kurzfassung ->
 * Render lange Fassung -> Handy-Kopien (< 30 MB) -> Veroeffentlichungs-Paket.
 * Logs: ausgabe/<id>-produktion.log. Bricht ein Schritt ab, geht es mit dem
 * naechsten Thema weiter; am Ende steht eine Uebersicht.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const KOK = path.resolve(import.meta.dirname, '..');
const ids = process.argv.slice(2);
if (!ids.length) throw new Error('Themen angeben: node scripts/produzieren.mjs 04-bittersalz ...');
fs.mkdirSync(path.join(KOK, 'ausgabe'), { recursive: true });

const lauf = (log, befehl, args) => {
  fs.appendFileSync(log, `\n$ ${befehl} ${args.join(' ')}\n`);
  const r = spawnSync(befehl, args, { cwd: KOK, shell: true, encoding: 'utf8', maxBuffer: 1 << 28 });
  fs.appendFileSync(log, (r.stdout ?? '') + (r.stderr ?? ''));
  return r.status === 0;
};

const bericht = [];
for (const id of ids) {
  const log = path.join(KOK, 'ausgabe', `${id}-produktion.log`);
  fs.writeFileSync(log, `Produktion ${id} - ${new Date().toLocaleString('de-DE')}\n`);
  const { thema } = await import(pathToFileURL(path.join(KOK, 'src', 'themen', `${id}.ts`)).href);
  const fassungen = thema.kurzfassung ? [`${id}-kurz`, id] : [id];
  const schritte = [
    ['Stimme', 'node', ['scripts/sprechen.mjs', id, '--piper']],
    ['Clips', 'node', ['scripts/fotos.mjs', id]],
    ...fassungen.flatMap((f) => [
      [`Render ${f}`, 'node', ['scripts/render.mjs', f]],
      [`Handy ${f}`, 'npx', ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', `ausgabe/${f}.mp4`,
        '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-c:a', 'aac', '-b:a', '160k', `ausgabe/${f}-handy.mp4`]],
    ]),
    ['Texte', 'node', ['scripts/texte.mjs', id]],
  ];
  let ok = true;
  for (const [name, befehl, args] of schritte) {
    const t = Date.now();
    ok = lauf(log, befehl, args);
    console.log(`  ${id}  ${ok ? 'OK ' : 'FEHLER'}  ${name}  (${Math.round((Date.now() - t) / 60000)} min)`);
    if (!ok) break;
  }
  bericht.push(`${ok ? 'fertig ' : 'ABBRUCH'}  ${id}`);
}
console.log('\n' + bericht.join('\n') + '\n');
