/**
 * STANDBILDER ZUM PRUEFEN
 *   node scripts/standbilder.mjs 01-vitamin-d            # Mitte + Ende jeder Szene
 *   node scripts/standbilder.mjs 01-vitamin-d 120 480    # bestimmte Frames
 *
 * Ausgabe: ausgabe/<id>-standbilder/*.png (Viertelgroesse) + Uebersicht.png
 * Schneller als ein ganzes Video zu rendern, wenn man nur das Layout sehen will.
 */
import path from 'node:path';
import fs from 'node:fs/promises';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

const KOK = path.resolve(import.meta.dirname, '..');
const [id, ...framesArg] = process.argv.slice(2);
if (!id) {
  console.error('Thema angeben: node scripts/standbilder.mjs 01-vitamin-d');
  process.exit(1);
}

const serveUrl = await bundle({ entryPoint: path.join(KOK, 'src', 'index.ts') });
const comp = await selectComposition({ serveUrl, id });

let frames = framesArg.map(Number);
if (!frames.length) {
  // Szenengrenzen aus den Props berechnen: je Szene 55 % und 92 %
  const { szenen } = comp.props.thema;
  const zeiten = comp.props.zeiten;
  let start = 0;
  szenen.forEach((s, i) => {
    const dauer = Math.round(((zeiten?.szenen[i]?.dauer ?? 4) + (s.pause ?? 0.4)) * 30);
    frames.push(start + Math.round(dauer * 0.55), start + Math.round(dauer * 0.92));
    start += dauer;
  });
}

const ziel = path.join(KOK, 'ausgabe', `${id}-standbilder`);
await fs.mkdir(ziel, { recursive: true });
for (const f of frames) {
  const out = path.join(ziel, `f${String(f).padStart(5, '0')}.png`);
  await renderStill({ composition: comp, serveUrl, frame: f, output: out, scale: 0.25 });
  console.log('  ', path.relative(KOK, out));
}
