import type { Thema } from '../typen';

const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * VITAMIN D - 2-Minuten-Fassung (15.11.2026), ruhiger Look.
 * Quellen:
 *  - RKI 2016 (Journal of Health Monitoring): 30,2 % der Erwachsenen mangelhaft versorgt
 *  - BfR FAQ Vitamin D: Eigenbildung 80-90 %, Nahrung 2-4 µg/Tag, Sommer 5-25 min Sonne
 *  - DGE: 20 µg/Tag ohne Eigenbildung
 *  - Webb, Kline, Holick 1988 (JCEM 67:373): 52° N keine Bildung Okt-Maerz
 *  - Manson et al. 2019 (NEJM 380:33), VITAL: 25.871 Erwachsene, 2000 IE/Tag ->
 *    kein Schutz vor invasivem Krebs oder schweren Herz-Kreislauf-Ereignissen
 *  - Verbraucherzentrale: Nutzen fuer Stuerze/Brueche bei Aelteren mit Risiko belegt,
 *    bei Juengeren ohne Mangel kein Effekt
 *  - EFSA 2023: Hoechstmenge 100 µg/Tag (Hyperkalzaemie)
 */
export const thema: Thema = {
  id: '05-vitamin-d',
  titel: 'Vitamin D: Hilft die Tablette wirklich? ☀️ #shorts',
  quelleKurz: 'Quellen: RKI · BfR · DGE · EFSA',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 3, 6, 8, 9, 11, 13, 15],
  beschreibung:
    'Fast jeder Dritte in Deutschland ist mangelhaft mit Vitamin D versorgt. Warum Essen kaum hilft, ' +
    'was im Winter passiert, was die große VITAL-Studie zeigt und ab wann Tabletten riskant werden.\n\n' +
    'Quellen: RKI (2016), BfR (FAQ Vitamin D), DGE, Webb et al. 1988, Manson et al. 2019 (NEJM, VITAL), ' +
    'Verbraucherzentrale, EFSA (2023).\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #vitamind #gesundheit #ernährung #mryfacts',
  tags: ['vitamin d', 'vitamin d mangel', 'vitamin d winter', 'vitamin d tabletten', 'vital studie', 'sonne vitamin d', 'gesundheit'],
  quellen: [
    'https://edoc.rki.de/handle/176904/2492',
    'https://www.bfr.bund.de/fragen-und-antworten/thema/ausgewaehlte-fragen-und-antworten-zu-vitamin-d/',
    'https://www.dge.de/wissenschaft/referenzwerte/vitamin-d/',
    'https://doi.org/10.1056/NEJMoa1809944',
    'https://www.verbraucherzentrale.de/wissen/lebensmittel/nahrungsergaenzungsmittel/vitamin-dversorgung-in-deutschland-80200',
    'https://www.efsa.europa.eu/en/efsajournal/pub/8145',
  ],

  szenen: [
    {
      text: 'Fast jeder Dritte hier hat zu wenig *Vitamin D*. Aber hilft eine Tablette wirklich?',
      farbe: GELB,
      pause: 0.3,
      fotos: [{ suche: 'woman face sunlight', video: true }],
      schlagzeile: { oben: 'Vitamin D:', unten: 'Hilft die Tablette?' },
    },
    {
      text: 'Laut Robert Koch-Institut ist fast jeder dritte Erwachsene *mangelhaft* versorgt. Vor allem im Winter.',
      farbe: BLAU,
      fotos: [{ suche: 'winter city grey people', video: true }],
      studie: { titel: 'Robert Koch-Institut · 2016', zeile: '30 % mangelhaft versorgt', wort: 'mangelhaft' },
    },
    {
      text: 'Dabei macht dein Körper bis zu *90 Prozent* selbst. Aus Sonnenlicht auf der Haut.',
      farbe: GELB,
      fotos: [
        { suche: 'woman arms sun skin', video: true },
        { suche: 'sun rays through trees', video: true, wort: 'Sonnenlicht' },
      ],
      bild: { typ: 'zaehler', von: 0, bis: 90, nach: '%', farbe: GELB, icon: 'sonne', unter: 'SELBST GEMACHT', wort: '90' },
    },
    {
      text: 'Übers Essen kommen nur *2 bis 4 Mikrogramm* am Tag. Ohne Sonne bräuchtest du 20.',
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
    },
    {
      text: 'Das wären zwölf Eier oder ein halbes Kilo *Räucherlachs*. Jeden Tag.',
      farbe: ORANGE,
      fotos: [
        { suche: 'eggs carton kitchen', video: true },
        { suche: 'salmon fillet', video: true, wort: 'Räucherlachs' },
      ],
    },
    {
      text: 'Das Problem: Von *Oktober bis März* steht die Sonne bei uns zu tief. Die Haut bildet dann kaum Vitamin D.',
      farbe: BLAU,
      fotos: [{ suche: 'winter low sun snow', video: true }],
      bild: { typ: 'monate', aus: [9, 10, 11, 0, 1, 2], wort: 'Oktober' },
    },
    {
      text: 'Ganz leer läufst du trotzdem nicht. Dein Körper speichert Vitamin D aus dem Sommer in *Fett und Muskeln*.',
      farbe: GRUEN,
      fotos: [{ suche: 'athlete training gym', video: true }],
    },
    {
      text: 'Und schützt eine Tablette vor Krebs oder Herzinfarkt? Die große VITAL-Studie mit über 25.000 gesunden Erwachsenen fand: *nein*.',
      farbe: ROT,
      pause: 0.4,
      fotos: [
        { suche: 'vitamin capsules hand', video: true },
        { suche: 'scientist data research', video: true, wort: 'Studie' },
      ],
      studie: { titel: 'VITAL-Studie · 2019', zeile: 'Kein Schutz vor Krebs und Herzinfarkt', wort: 'Studie' },
    },
    {
      text: 'Anders bei älteren Menschen mit erhöhtem Risiko: Hier kann Vitamin D *Stürze* und Knochenbrüche verringern.',
      farbe: GRUEN,
      fotos: [{ suche: 'elderly woman walking park', video: true }],
    },
    {
      text: 'Wer jung und gesund ist und keinen Mangel hat, profitiert in Studien dagegen *kaum*.',
      farbe: BLAU,
      fotos: [{ suche: 'young people running outdoors', video: true }],
    },
    {
      text: 'Mehr ist auch nicht besser. Dauerhaft über *100 Mikrogramm* am Tag können schaden.',
      farbe: ROT,
      fotos: [{ suche: 'pills bottle pouring', video: true }],
      bild: { typ: 'zaehler', von: 0, bis: 100, nach: ' µg', farbe: ROT, icon: 'dose', unter: 'PRO TAG · DAUERHAFT', wort: '100' },
    },
    {
      text: 'Zu viel Vitamin D lässt das *Kalzium* im Blut steigen. Das kann Nieren und Herz belasten.',
      farbe: ROT,
      fotos: [{ suche: 'doctor patient consultation', video: true }],
    },
    {
      text: 'Mit Sonne kannst du dagegen nicht überdosieren. Die Haut *regelt* die Bildung selbst.',
      farbe: GRUEN,
      pause: 0.4,
      fotos: [{ suche: 'man relaxing sun beach', video: true }],
      schlagzeile: { oben: 'Sonne:', unten: 'keine Überdosis', farbeUnten: GRUEN, wort: 'nicht' },
    },
    {
      text: 'Aber Vorsicht vor Sonnenbrand: Im Sommer reichen schon *5 bis 25 Minuten* am Tag, je nach Hauttyp.',
      farbe: GELB,
      fotos: [{ suche: 'sunscreen skin beach', video: true }],
      studie: { titel: 'BfR', zeile: 'Sommer: 5–25 Minuten genügen', wort: 'Minuten' },
    },
    {
      text: 'Ob dir im Winter wirklich etwas fehlt, zeigt nur ein *Bluttest* beim Arzt.',
      farbe: ROT,
      pause: 0.9,
      fotos: [{ suche: 'blood test tube laboratory', video: true }],
      schlagzeile: { oben: 'Nicht raten.', unten: 'Messen lassen.', wort: 'Bluttest' },
    },
  ],
};
