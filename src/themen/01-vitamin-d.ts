import type { Thema } from '../typen';

// Farben hier direkt (das Sprach-Script liest diese Datei ohne Bundler)
const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * Format: Vergleich ohne Runden-Etiketten (Wunsch 06.11.2026).
 * Alle Zahlen: BfR, "Ausgewaehlte Fragen und Antworten zu Vitamin D"
 *  - Eigenbildung 80-90 %, Ernaehrung 10-20 %
 *  - Gesicht/Haende/Arme, mehrmals pro Woche, 5-25 min
 *  - Okt-Maerz Sonne in DE zu schwach; Speicher in Fett- und Muskelgewebe
 *  - uebliche Ernaehrung: 2-4 µg/Tag; ohne Eigenbildung 20 µg/Tag
 *  - Hering gesalzen 25,6 µg, Lachs geraeuchert 4,2 µg, Ei 2,9 µg je 100 g
 *    -> 20 µg = 78 g Hering, 476 g Raeucherlachs, ~12 Eier (à ~58 g essbar)
 *  - Sonne: keine Ueberdosierung moeglich; oral langfristig > 100 µg/Tag riskant
 *  - BfR-Hoechstmengenvorschlag NEM: 20 µg pro Tagesdosis (Stellungnahme 007/2024)
 */
export const thema: Thema = {
  id: '01-vitamin-d',
  titel: 'Sonne vs. Essen vs. Tablette: Woher kommt dein Vitamin D? ☀️ #shorts',
  hook: 'WOHER KOMMT DEIN|*VITAMIN D?*',
  hookFarbe: GELB,
  beschreibung:
    'Bis zu 90 % deines Vitamin D macht dein Körper selbst. Aber was ist im Winter? ' +
    'Menge, Winter, Risiko im Vergleich. Plus: Warum Räucherlachs schlechter abschneidet als gedacht.\n\n' +
    'Quelle: Bundesinstitut für Risikobewertung (BfR), FAQ Vitamin D.\n' +
    'Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #vitamind #gesundheit #ernährung #mryfacts',
  tags: ['vitamin d', 'vitamin d mangel', 'vitamin d winter', 'sonne vitamin d', 'vitamin d tabletten', 'nahrungsergänzungsmittel', 'gesundheit', 'ernährung'],
  quellen: ['https://www.bfr.bund.de/fragen-und-antworten/thema/ausgewaehlte-fragen-und-antworten-zu-vitamin-d/'],

  szenen: [
    {
      text: 'Bis zu *90 Prozent* deines Vitamin D macht dein Körper selbst. Aus *Sonnenlicht*.',
      farbe: GELB,
      bild: { typ: 'zaehler', von: 0, bis: 90, nach: '%', farbe: GELB, icon: 'sonne', unter: 'SELBST GEMACHT', wort: '90' },
    },
    {
      text: 'Aber was bringt *wirklich* was? *Sonne*, *Essen* oder *Tablette*?',
      farben: { Sonne: GELB, Essen: ORANGE, Tablette: BLAU },
      pause: 0.6,
      bild: {
        typ: 'versus',
        items: [
          { icon: 'sonne', label: 'SONNE', farbe: GELB },
          { icon: 'essen', label: 'ESSEN', farbe: ORANGE },
          { icon: 'kapsel', label: 'TABLETTE', farbe: BLAU },
        ],
      },
    },

    {
      text: 'Gesicht, Hände und Arme in die Sonne, mehrmals pro Woche. *5 bis 25 Minuten* reichen.',
      farbe: GELB,
      bild: { typ: 'icon', icon: 'sonne', label: 'MEHRMALS PRO WOCHE', chip: '5–25 MIN', chipFarbe: GELB, chipWort: '5' },
    },
    {
      text: 'Übers Essen kommen in Deutschland nur *2 bis 4 Mikrogramm* am Tag rein. Ohne Sonne bräuchtest du *20*.',
      farbe: ORANGE,
      bild: {
        typ: 'balken',
        max: 20,
        items: [
          { label: 'ÜBERS ESSEN', wert: 3, anzeige: '2–4 µg', farbe: ORANGE, wort: 'Essen' },
          { label: 'BEDARF OHNE SONNE', wert: 20, anzeige: '20 µg', farbe: GRUEN, wort: 'Ohne' },
        ],
      },
    },
    {
      text: 'Für 20 Mikrogramm: rund *12 Eier*. Oder *80 Gramm* Salzhering. Räucherlachs? Fast ein *halbes Kilo*.',
      farbe: ORANGE,
      pause: 0.7,
      bild: {
        typ: 'raster',
        gruppen: [
          { icon: 'ei', anzahl: 12, spalten: 4, label: '12 EIER', farbe: ORANGE, wort: '12' },
          { icon: 'hering', anzahl: 1, spalten: 1, label: '80 g HERING', farbe: BLAU, wort: '80' },
          { icon: 'lachs', anzahl: 1, spalten: 1, label: '480 g LACHS', farbe: ROT, wort: 'halbes' },
        ],
      },
    },

    {
      text: 'Und im Winter? Von *Oktober bis März* ist die Sonne in Deutschland zu schwach.',
      farbe: BLAU,
      bild: { typ: 'monate', aus: [9, 10, 11, 0, 1, 2], wort: 'Oktober' },
    },
    {
      text: 'Ganz leer bist du dann aber nicht. Dein Körper speichert Vitamin D in *Fett und Muskeln*.',
      farbe: GRUEN,
      bild: { typ: 'speicher', label: 'FETT & MUSKELN', farbe: GRUEN },
    },

    {
      text: 'Mit Sonne kannst du Vitamin D *nicht überdosieren*.',
      farbe: GRUEN,
      bild: { typ: 'icon', icon: 'sonne' },
      stempel: { text: 'KEINE ÜBERDOSIS', farbe: GRUEN, wort: 'überdosieren' },
      pause: 0.7,
    },
    {
      text: 'Mit Tabletten schon. Ab dauerhaft *über 100 Mikrogramm* am Tag drohen Nebenwirkungen.',
      farbe: ROT,
      bild: { typ: 'zaehler', von: 0, bis: 100, nach: ' µg', farbe: ROT, icon: 'dose', unter: 'PRO TAG · DAUERHAFT', wort: '100' },
      stempel: { text: 'RISIKO', farbe: ROT, wort: 'Nebenwirkungen', y: 450 },
      pause: 0.7,
    },
    {
      text: 'Das BfR schlägt für Nahrungsergänzung höchstens *20 Mikrogramm* pro Tag vor. Manche Präparate haben viel mehr.',
      farbe: BLAU,
      bild: { typ: 'icon', icon: 'dose', label: 'VORSCHLAG BfR', chip: 'MAX. 20 µg / TAG', chipFarbe: BLAU, chipWort: '20' },
    },

    // ---------------- ERGEBNIS ----------------
    {
      runde: 'DAS ERGEBNIS',
      text: 'Das Ergebnis: Im Sommer gewinnt klar die *Sonne*. Essen allein reicht kaum.',
      farbe: GELB,
      bild: {
        typ: 'podest',
        plaetze: [
          { icon: 'sonne', label: 'SONNE', farbe: GELB, rang: 1, notiz: 'IM SOMMER' },
          { icon: 'kapsel', label: 'TABLETTE', farbe: BLAU, rang: 2 },
          { icon: 'essen', label: 'ESSEN', farbe: ORANGE, rang: 3 },
        ],
      },
      pause: 0.9,
    },
    {
      runde: 'DAS ERGEBNIS',
      text: 'Ob dir im Winter etwas fehlt, zeigt nur ein *Bluttest*.',
      farbe: ROT,
      bild: { typ: 'icon', icon: 'blut', chip: 'BLUTTEST', chipFarbe: ROT, chipWort: 'Bluttest' },
      pause: 0.7,
    },
  ],
};
