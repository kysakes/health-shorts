/**
 * RENDER
 *   npm run render 01-vitamin-d             # fertiges MP4 (1080x1920)
 *   npm run render 01-vitamin-d -- --schnell # halbe Aufloesung zum Kontrollieren
 *
 * Ausgabe: ausgabe/<id>.mp4  (Remotion bringt ffmpeg selbst mit)
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';

const KOK = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const schnell = args.includes('--schnell');
if (!id) {
  console.error('\n  Thema angeben:  npm run render 01-vitamin-d\n');
  process.exit(1);
}

await fs.mkdir(path.join(KOK, 'ausgabe'), { recursive: true });
const aus = path.join('ausgabe', `${id}${schnell ? '-entwurf' : ''}.mp4`);
// Eigener Temp-Ordner im Projekt: Im Windows-Temp verschwand bei langen Renders der
// (bis zum Schluss leere) Ordner fuers Ton-Abmischen -> Abbruch ganz am Ende.
const temp = path.join(KOK, 'ausgabe', '.temp');
await fs.mkdir(temp, { recursive: true });
const p = spawn(
  'npx',
  ['remotion', 'render', 'src/index.ts', id, aus, ...(schnell ? ['--scale=0.5', '--crf=28'] : [])],
  { cwd: KOK, stdio: 'inherit', shell: process.platform === 'win32', env: { ...process.env, TEMP: temp, TMP: temp } },
);
p.on('exit', (c) => {
  if (c === 0) console.log(`\n  Fertig: ${aus}\n`);
  process.exit(c ?? 1);
});
