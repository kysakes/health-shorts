/**
 * FOTOS VON PEXELS
 *
 *   node scripts/fotos.mjs 01-vitamin-d-tr          # fehlende Fotos holen
 *   node scripts/fotos.mjs 01-vitamin-d-tr --neu    # alle neu suchen
 *
 * Liest `fotos: [{ suche }]` jeder Szene, laedt Hochkant-Fotos nach
 * public/fotos/<id>/ und schreibt fotos.json (Datei + Fotograf fuer die Credits).
 * Schwachen Treffer ersetzen: Suchbegriff im Thema aendern, Script erneut starten.
 * Pexels-Lizenz: kostenlos, kommerziell nutzbar, Namensnennung freiwillig.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const KOK = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const neu = args.includes('--neu');
if (!id) throw new Error('Thema angeben: node scripts/fotos.mjs 01-vitamin-d-tr');

// Key: Umgebung, sonst dauerhafte Benutzervariable (setx) aus der Registry
let KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  KEY = execFileSync('powershell', [
    '-NoProfile',
    '-Command',
    "[Environment]::GetEnvironmentVariable('PEXELS_API_KEY','User')",
  ])
    .toString()
    .trim();
}
if (!KEY) throw new Error('PEXELS_API_KEY fehlt (setx PEXELS_API_KEY ...)');

const { thema } = await import(pathToFileURL(path.join(KOK, 'src', 'themen', `${id}.ts`)).href);
const ziel = path.join(KOK, 'public', 'fotos', id);
await fs.mkdir(ziel, { recursive: true });
const liste = path.join(ziel, 'fotos.json');
let alt = {};
if (!neu) alt = JSON.parse(await fs.readFile(liste, 'utf8').catch(() => '{}'));

const benutzt = new Set(Object.values(alt).map((f) => f.pexelsId));
const ergebnis = {};

/**
 * Pexels-Clips sind oft riesig (20 Mbit/s, 15-30 s). Remotion liest sie Bild fuer
 * Bild aus -> langsam, Zeitlimits. Darum: auf 10 s kuerzen, 30 fps, 1080 breit,
 * normale Bitrate, Keyframe jede Sekunde, ohne Ton.
 */
const clipOptimieren = (roh, ziel) =>
  execFileSync(
    'npx',
    ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', roh, '-t', '10', '-an', '-vf', 'scale=1080:-2', '-r', '30',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-g', '30', '-pix_fmt', 'yuv420p', ziel],
    { cwd: KOK, shell: true },
  );

// Schon vorhandene, noch nicht optimierte Clips nachziehen
for (const f of Object.values(alt)) {
  if (f.video && !f.optimiert) {
    const p = path.join(ziel, f.datei);
    await fs.rename(p, p + '.roh');
    clipOptimieren(p + '.roh', p);
    await fs.unlink(p + '.roh');
    f.optimiert = true;
    console.log(`  optimiert  ${f.datei}`);
  }
}

for (const [i, s] of thema.szenen.entries()) {
  for (const [k, foto] of (s.fotos ?? []).entries()) {
    const schluessel = `${i}-${k}`;
    if (alt[schluessel]?.suche === foto.suche && !!alt[schluessel]?.video === !!foto.video) {
      ergebnis[schluessel] = alt[schluessel];
      continue;
    }
    const q = encodeURIComponent(foto.suche);
    const url = foto.video
      ? `https://api.pexels.com/videos/search?query=${q}&orientation=portrait&size=medium&per_page=15`
      : `https://api.pexels.com/v1/search?query=${q}&orientation=portrait&per_page=15`;
    const r = await fetch(url, { headers: { Authorization: KEY } });
    if (!r.ok) throw new Error(`Pexels ${r.status} bei "${foto.suche}"`);
    const antwort = await r.json();
    // Videos: nur Clips mit passender Hochkant-Datei (1080 breit) und mind. 5 s
    const passendeDatei = (v) =>
      (v.video_files ?? [])
        .filter((d) => d.file_type === 'video/mp4' && d.height > d.width && d.width >= 720 && d.width <= 1440)
        .sort((a, b) => Math.abs(a.width - 1080) - Math.abs(b.width - 1080))[0];
    const treffer = foto.video
      ? (antwort.videos ?? []).filter((v) => v.duration >= 5 && passendeDatei(v))
      : antwort.photos ?? [];
    const wahl = treffer.find((p) => !benutzt.has(p.id)) ?? treffer[0];
    if (!wahl) {
      console.log(`  ${schluessel}  KEIN TREFFER  "${foto.suche}"`);
      continue;
    }
    benutzt.add(wahl.id);
    // Fotos: 1440 breit reicht fuer 1080er-Video mit Zoom-Spielraum
    const bildUrl = foto.video ? passendeDatei(wahl).link : `${wahl.src.original}?auto=compress&cs=tinysrgb&w=1440`;
    if (foto.video) wahl.photographer = wahl.user?.name ?? 'Pexels';
    const datei = `s${String(i + 1).padStart(2, '0')}-${k + 1}-${wahl.id}.${foto.video ? 'mp4' : 'jpg'}`;
    const b = await fetch(bildUrl, { signal: AbortSignal.timeout(120000) });
    const daten = Buffer.from(await b.arrayBuffer());
    if (!b.ok || daten.length < 10000) throw new Error(`Download fehlgeschlagen: ${bildUrl}`);
    if (foto.video) {
      await fs.writeFile(path.join(ziel, datei + '.roh'), daten);
      clipOptimieren(path.join(ziel, datei + '.roh'), path.join(ziel, datei));
      await fs.unlink(path.join(ziel, datei + '.roh'));
    } else {
      await fs.writeFile(path.join(ziel, datei), daten);
    }
    ergebnis[schluessel] = {
      datei,
      suche: foto.suche,
      pexelsId: wahl.id,
      video: !!foto.video,
      optimiert: !!foto.video,
      fotograf: wahl.photographer,
      link: wahl.url,
    };
    console.log(`  ${schluessel}  ${(daten.length / 1024).toFixed(0)} KB  "${foto.suche}"  (${wahl.photographer})`);
  }
}

await fs.writeFile(liste, JSON.stringify(ergebnis, null, 2));
console.log(`\n  ${Object.keys(ergebnis).length} Fotos -> public/fotos/${id}/\n`);
