/**
 * VEROEFFENTLICHUNGS-PAKET
 *
 *   node scripts/texte.mjs 03-opc
 *
 * Schreibt ausgabe/<id>-veroeffentlichen.txt mit fertigen Texten fuer
 * YouTube Shorts, TikTok und Instagram Reels sowie Titelbilder in voller
 * Aufloesung (ausgabe/<id>-cover.png, bei Kurzfassung auch <id>-kurz-cover.png).
 *
 * Plattform-Regeln (Recherche 13.11.2026):
 *  - YouTube Shorts: Titel <= 100 Zeichen, Suchbegriff nach vorn, #shorts.
 *    Erfolg = Anteil "angesehen statt weggewischt" -> Kurzfassung (~35-55 s) hochladen.
 *  - TikTok: Creator Rewards nur fuer Videos ab 1 Minute -> lange Fassung.
 *    Bildunterschrift = Suchtext (TikTok-Suche), 3-5 Hashtags. Titelbild waehlen.
 *  - Instagram Reels: lange oder kurze Fassung, Titelbild 4:5-Ausschnitt mittig.
 *  - Ueberall: KI-Stimme ist synthetisch -> bei YouTube "Veraenderte oder synthetische
 *    Inhalte" nur noetig, wenn realistisch wirkende Personen/Ereignisse; TikTok-Label
 *    "KI-generiert" setzen, sobald KI-Avatar (Kaan) im Bild ist.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

const KOK = path.resolve(import.meta.dirname, '..');
const id = process.argv[2];
if (!id) throw new Error('Thema angeben: node scripts/texte.mjs 03-opc');

const { thema } = await import(pathToFileURL(path.join(KOK, 'src', 'themen', `${id}.ts`)).href);
const hashtags = (thema.beschreibung.match(/#[\p{L}\p{N}_]+/gu) ?? []).filter((h) => h !== '#shorts');
const fliesstext = thema.beschreibung
  .split('\n')
  .filter((z) => !/^\s*#/.test(z))
  .join('\n')
  .trim();
const ersterAbsatz = fliesstext.split('\n\n')[0];
const titelOhneShorts = thema.titel.replace(/\s*#shorts/gi, '').trim();

const ytTitel = (titelOhneShorts.length > 90 ? titelOhneShorts.slice(0, 89) + '…' : titelOhneShorts) + ' #shorts';
const tiktok = `${titelOhneShorts}\n\n${ersterAbsatz}\n\n${hashtags.slice(0, 5).join(' ')}`;
const quellenBlock = (thema.quellen ?? []).map((q) => `- ${q}`).join('\n');

const text = `VEROEFFENTLICHEN: ${thema.id}
${'='.repeat(60)}

YOUTUBE SHORTS  (Datei: ausgabe/${thema.id}${thema.kurzfassung ? '-kurz' : ''}.mp4)
Titel (${ytTitel.length}/100):
${ytTitel}

Beschreibung:
${fliesstext}

Quellen:
${quellenBlock}

${['#shorts', ...hashtags].join(' ')}

Tags (YouTube Studio, kommagetrennt):
${thema.tags.join(', ')}

${'-'.repeat(60)}
TIKTOK  (Datei: ausgabe/${thema.id}.mp4${thema.kurzfassung ? ' - lange Fassung, ab 1 Minute fuer Creator Rewards' : ''})
Bildunterschrift (${tiktok.length}/4000):
${tiktok}

Titelbild: ausgabe/${thema.id}-cover.png hochladen oder Bild 1 waehlen.

${'-'.repeat(60)}
INSTAGRAM REELS  (Datei: ausgabe/${thema.id}.mp4 oder -kurz.mp4)
${titelOhneShorts}

${fliesstext}

${hashtags.slice(0, 5).join(' ')}

${'-'.repeat(60)}
CHECKLISTE
[ ] Erste Stunde: Kommentare beantworten (Signal fuer die Verteilung)
[ ] YouTube Studio > Analytics > "Angesehen vs. weggewischt" nach 48 h pruefen
[ ] Gleiches Video NICHT mit TikTok-Wasserzeichen auf YouTube/Instagram hochladen
[ ] Posten nur von dir selbst - Claude laedt nichts hoch
`;

await fs.mkdir(path.join(KOK, 'ausgabe'), { recursive: true });
const datei = path.join(KOK, 'ausgabe', `${thema.id}-veroeffentlichen.txt`);
await fs.writeFile(datei, text);
console.log(`\n  Texte -> ${path.relative(KOK, datei)}`);

// Titelbilder: Hook-Schlagzeile voll sichtbar (~1 s nach Szenenstart)
const serveUrl = await bundle({ entryPoint: path.join(KOK, 'src', 'index.ts') });
for (const compId of [thema.id, ...(thema.kurzfassung ? [`${thema.id}-kurz`] : [])]) {
  const comp = await selectComposition({ serveUrl, id: compId });
  const out = path.join(KOK, 'ausgabe', `${compId}-cover.png`);
  await renderStill({ composition: comp, serveUrl, frame: 30, output: out });
  console.log(`  Titelbild -> ${path.relative(KOK, out)}`);
}
console.log('');
