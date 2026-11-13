import type { Thema } from '../typen';

const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * VITAMIN D - NEUE FASSUNG (12.11.2026), Stil angelehnt an grosse deutsche
 * Gesundheits-YouTuber (Analyse: recherche-exiledmedic/AUSWERTUNG.md):
 * Videoclips statt Icons auf leerem Grund, Schnitt beim gesprochenen Wort,
 * riesige weiss/rote Schlagzeilen, Studien-Karten. Ziel ~60 s.
 *
 * Zahlen wie 01-vitamin-d (BfR-FAQ Vitamin D), dazu:
 *  - DGE-Schaetzwert 20 µg/Tag ohne Eigenbildung
 *  - Webb, Kline, Holick 1988 (J Clin Endocrinol Metab 67:373): Edmonton, 52° N ->
 *    keine Vitamin-D-Bildung in der Haut von Oktober bis Maerz (DE liegt 47-55° N)
 *  - EFSA 2023: tolerierbare Hoechstmenge 100 µg/Tag (Erwachsene)
 */
export const thema: Thema = {
  id: '01-vitamin-d-neu',
  titel: 'Vitamin D aus dem Essen? Vergiss es. ☀️ #shorts',
  quelleKurz: 'Quellen: BfR · DGE · EFSA',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.12 },
  beschreibung:
    'Bis zu 90 % deines Vitamin D macht dein Körper selbst – aus Sonnenlicht. ' +
    'Übers Essen kommt nur ein Bruchteil. Was im Winter passiert und ab wann Tabletten riskant werden.\n\n' +
    'Quellen: BfR (FAQ Vitamin D), DGE (Referenzwert Vitamin D), EFSA (2023), Webb et al. 1988.\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #vitamind #gesundheit #ernährung #mryfacts',
  tags: ['vitamin d', 'vitamin d mangel', 'vitamin d winter', 'sonne vitamin d', 'vitamin d tabletten', 'gesundheit', 'ernährung'],
  quellen: [
    'https://www.bfr.bund.de/fragen-und-antworten/thema/ausgewaehlte-fragen-und-antworten-zu-vitamin-d/',
    'https://www.dge.de/wissenschaft/referenzwerte/vitamin-d/',
    'https://www.efsa.europa.eu/en/efsajournal/pub/8145',
    'https://doi.org/10.1210/jcem-67-2-373',
  ],

  szenen: [
    // HOOK: nur Clip + Schlagzeile, ab Bild 1
    {
      text: 'Vergiss Vitamin D aus dem *Essen*.',
      farbe: ROT,
      pause: 0.3,
      fotos: [{ suche: 'fried eggs pan cooking', video: true }],
      schlagzeile: { oben: 'Vitamin D', unten: 'aus dem Essen?' },
    },
    {
      text: 'Bis zu *90 Prozent* macht dein Körper selbst. Aus *Sonnenlicht*.',
      farbe: GELB,
      fotos: [
        { suche: 'woman face sunlight', video: true },
        { suche: 'sun rays through trees', video: true, wort: 'Sonnenlicht' },
      ],
      bild: { typ: 'zaehler', von: 0, bis: 90, nach: '%', farbe: GELB, icon: 'sonne', unter: 'SELBST GEMACHT', wort: '90' },
      studie: { titel: 'BfR · Bundesinstitut', zeile: 'Eigenbildung: 80–90 %', wort: 'Körper' },
    },
    {
      text: 'Übers Essen kommen nur *2 bis 4 Mikrogramm* am Tag. Ohne Sonne bräuchtest du *20*.',
      farbe: ORANGE,
      fotos: [{ suche: 'family dinner table food', video: true }],
      bild: {
        typ: 'balken',
        max: 20,
        items: [
          { label: 'ÜBERS ESSEN', wert: 3, anzeige: '2–4 µg', farbe: ORANGE, wort: 'Essen' },
          { label: 'BEDARF OHNE SONNE', wert: 20, anzeige: '20 µg', farbe: GRUEN, wort: 'Ohne' },
        ],
      },
      studie: { titel: 'DGE · Referenzwert', zeile: 'Ohne Sonne: 20 µg pro Tag', wort: 'Ohne' },
    },
    {
      text: 'Das wären *12 Eier*. Jeden Tag. Oder ein *halbes Kilo* Räucherlachs.',
      farbe: ORANGE,
      pause: 0.6,
      fotos: [
        { suche: 'eggs carton kitchen', video: true },
        { suche: 'salmon fillet', video: true, wort: 'halbes' },
      ],
      bild: {
        typ: 'raster',
        gruppen: [
          { icon: 'ei', anzahl: 12, spalten: 4, label: '12 EIER', farbe: ORANGE, wort: '12' },
          { icon: 'lachs', anzahl: 1, spalten: 1, label: '480 g LACHS', farbe: ROT, wort: 'halbes' },
        ],
      },
    },
    {
      text: 'Und im Winter? Von *Oktober bis März* reicht die Sonne in Deutschland nicht.',
      farbe: BLAU,
      fotos: [{ suche: 'winter city snow grey', video: true }],
      bild: { typ: 'monate', aus: [9, 10, 11, 0, 1, 2], wort: 'Oktober' },
      studie: { titel: 'Webb et al. · 1988', zeile: '52° Nord: Okt–März keine Bildung', wort: 'Oktober' },
    },
    {
      text: 'Ganz leer bist du nicht. Dein Körper speichert Vitamin D in *Fett und Muskeln*.',
      farbe: GRUEN,
      fotos: [{ suche: 'athlete training gym dark', video: true }],
      bild: { typ: 'speicher', label: 'FETT & MUSKELN', farbe: GRUEN },
    },
    // Schlagzeilen-Szene: nur Clip + riesiger Text
    {
      text: 'Mit Sonne kannst du *nicht überdosieren*.',
      farbe: GRUEN,
      pause: 0.5,
      fotos: [{ suche: 'man relaxing sun beach', video: true }],
      schlagzeile: { oben: 'Sonne:', unten: 'keine Überdosis', farbeUnten: GRUEN, wort: 'nicht' },
    },
    {
      text: 'Mit Tabletten schon. Dauerhaft *über 100 Mikrogramm* am Tag können schaden.',
      farbe: ROT,
      pause: 0.6,
      fotos: [{ suche: 'pills bottle pouring', video: true }],
      bild: { typ: 'zaehler', von: 0, bis: 100, nach: ' µg', farbe: ROT, icon: 'dose', unter: 'PRO TAG · DAUERHAFT', wort: '100' },
      studie: { titel: 'EFSA · 2023', zeile: 'Obergrenze: 100 µg pro Tag', wort: 'Tabletten' },
      stempel: { text: 'RISIKO', farbe: ROT, wort: 'schaden', y: 1150 },
    },
    {
      runde: 'DAS ERGEBNIS',
      text: 'Im Sommer gewinnt die *Sonne*. Essen allein reicht nicht.',
      farbe: GELB,
      pause: 0.7,
      fotos: [{ suche: 'golden hour field sunset', video: true }],
      bild: {
        typ: 'podest',
        plaetze: [
          { icon: 'sonne', label: 'SONNE', farbe: GELB, rang: 1, notiz: 'IM SOMMER' },
          { icon: 'kapsel', label: 'TABLETTE', farbe: BLAU, rang: 2 },
          { icon: 'essen', label: 'ESSEN', farbe: ORANGE, rang: 3 },
        ],
      },
    },
    {
      text: 'Ob dir im Winter etwas fehlt, zeigt nur ein *Bluttest*.',
      farbe: ROT,
      pause: 0.8,
      fotos: [{ suche: 'blood test tube laboratory', video: true }],
      schlagzeile: { oben: 'Nicht raten.', unten: 'Messen lassen.', wort: 'Bluttest' },
    },
  ],
};
