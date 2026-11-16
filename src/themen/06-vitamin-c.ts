import type { Thema } from '../typen';

const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * VITAMIN C (15.11.2026), ruhiger Look, Ziel ~2 min.
 * Quellen:
 *  - Hemilae & Chalker 2013, Cochrane CD000980: regelmaessig -> keine weniger Erkaeltungen
 *    (29 Vergleiche, 11.306 Teilnehmer); Dauer -8 % Erwachsene, -14 % Kinder;
 *    erst bei Symptomen: kein konsistenter Effekt; extreme Belastung (Marathon) Risiko halbiert
 *  - Linus Pauling 1970 "Vitamin C and the Common Cold"
 *  - BfR (Vitamin C – je mehr, desto besser?): DGE 110 mg Maenner / 95 mg Frauen,
 *    Raucher 155 mg; rote Paprika ~140 mg/100 g, Orange ~46 mg/100 g; hohe Mengen
 *    schuetzen nicht vor Erkaeltung
 *  - Levine et al. 1996 (PNAS): Aufnahme sinkt bei hohen Einzeldosen, Rest im Urin
 *  - Thomas et al. 2013 (JAMA Intern Med 173:386): Maenner mit Vitamin-C-Praeparaten
 *    ~doppeltes Nierenstein-Risiko (Schweden)
 */
export const thema: Thema = {
  id: '06-vitamin-c',
  titel: 'Vitamin C gegen Erkältung? Was Studien zeigen 🍊 #shorts',
  quelleKurz: 'Quellen: Cochrane · BfR · DGE',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 4, 5, 6, 7, 9, 11, 14],
  beschreibung:
    'Vitamin C gegen Erkältung – seit über 50 Jahren ein Klassiker. Was die große Cochrane-Auswertung zeigt, ' +
    'warum Paprika die Orange schlägt und warum Hochdosis-Tabletten nicht mehr bringen.\n\n' +
    'Quellen: Hemilä & Chalker 2013 (Cochrane), BfR (Vitamin C), DGE, Levine et al. 1996, Thomas et al. 2013 (JAMA Intern Med).\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #vitaminc #erkältung #gesundheit #mryfacts',
  tags: ['vitamin c', 'vitamin c erkältung', 'vitamin c paprika', 'vitamin c hochdosiert', 'immunsystem', 'erkältung', 'gesundheit'],
  quellen: [
    'https://doi.org/10.1002/14651858.CD000980.pub4',
    'https://www.bfr.bund.de/veroeffentlichung/vitamin-c-je-mehr-desto-besser/',
    'https://www.bfr.bund.de/fragen-und-antworten/thema/vitamin-c-steckt-nicht-nur-in-obst-und-gemuese/',
    'https://doi.org/10.1001/jamainternmed.2013.2296',
  ],

  szenen: [
    {
      text: 'Vitamin C gegen Erkältung? Seit über 50 Jahren schwört man darauf. Die *Studien* sehen das anders.',
      farbe: ORANGE,
      pause: 0.3,
      fotos: [{ suche: 'orange juice glass', video: true }],
      schlagzeile: { oben: 'Vitamin C:', unten: 'Hilft es bei Erkältung?' },
    },
    {
      text: 'Den Hype startete der Nobelpreisträger Linus Pauling. 1970 empfahl er *riesige* Mengen gegen Schnupfen.',
      farbe: ORANGE,
      fotos: [
        { suche: 'old books library', video: true },
        { suche: 'woman sneezing tissue', video: true, wort: 'Schnupfen' },
      ],
    },
    {
      text: 'Jahrzehnte später fassten Forscher die Studien zusammen. Allein zur Vorbeugung über *11.000 Menschen*.',
      farbe: BLAU,
      fotos: [{ suche: 'scientist data research', video: true }],
      studie: { titel: 'Cochrane · 2013', zeile: 'Über 11.000 Teilnehmer', wort: 'Forscher' },
    },
    {
      text: 'Das Ergebnis: Wer täglich Vitamin C nimmt, erkältet sich *genauso oft* wie ohne.',
      farbe: ROT,
      pause: 0.5,
      fotos: [{ suche: 'sick woman blanket couch', video: true }],
      schlagzeile: { oben: 'Nicht seltener', unten: 'erkältet.', wort: 'genauso' },
    },
    {
      text: 'Die Erkältung dauert nur etwas kürzer: bei Erwachsenen um *8 Prozent*. Bei einer Woche Schnupfen sind das etwa 13 Stunden.',
      farbe: GELB,
      fotos: [{ suche: 'clock time passing', video: true }],
      bild: { typ: 'zaehler', von: 0, bis: 8, nach: '%', farbe: GELB, unter: 'KÜRZER KRANK', wort: '8' },
    },
    {
      text: 'Und wer erst Vitamin C nimmt, wenn die Nase schon läuft? Dann zeigte sich in Studien *kein* klarer Vorteil.',
      farbe: ROT,
      fotos: [{ suche: 'man blowing nose', video: true }],
    },
    {
      text: 'Eine Ausnahme gibt es: Bei extremer Belastung, etwa bei *Marathonläufern*, halbierte sich das Erkältungsrisiko.',
      farbe: GRUEN,
      fotos: [{ suche: 'marathon runners race', video: true }],
    },
    {
      text: 'Wie viel brauchst du überhaupt? Männer *110*, Frauen 95 Milligramm am Tag.',
      farbe: BLAU,
      fotos: [{ suche: 'fresh vegetables market', video: true }],
    },
    {
      text: 'Das schafft schon eine rote *Paprika*. Sie hat pro 100 Gramm dreimal so viel Vitamin C wie eine Orange.',
      farbe: ROT,
      fotos: [
        { suche: 'red bell pepper', video: true },
        { suche: 'oranges fruit', video: true, wort: 'Orange' },
      ],
      bild: {
        typ: 'balken',
        max: 140,
        items: [
          { label: 'ROTE PAPRIKA · 100 g', wert: 140, anzeige: '140 mg', farbe: ROT, wort: 'Paprika' },
          { label: 'ORANGE · 100 g', wert: 46, anzeige: '46 mg', farbe: ORANGE, wort: 'Orange' },
        ],
      },
    },
    {
      text: 'Und Hochdosis-Tabletten mit 1000 Milligramm? Je mehr du auf einmal nimmst, desto *weniger* nimmt der Darm auf.',
      farbe: GELB,
      fotos: [{ suche: 'effervescent tablet glass', video: true }],
    },
    {
      text: 'Der Rest landet im *Urin*. Und bei Männern war zusätzliches Vitamin C in einer Studie mit doppelt so vielen Nierensteinen verbunden.',
      farbe: ROT,
      pause: 0.4,
      fotos: [{ suche: 'doctor patient consultation', video: true }],
      studie: { titel: 'JAMA Intern Med · 2013', zeile: 'Männer: doppelt so viele Nierensteine', wort: 'Männern' },
    },
    {
      text: 'Raucher brauchen übrigens mehr, rund *155 Milligramm*. Rauchen verbraucht Vitamin C.',
      farbe: BLAU,
      fotos: [{ suche: 'cigarette smoke', video: true }],
    },
    {
      text: 'Laut Bundesinstitut für Risikobewertung schützen hohe Mengen aus Tabletten *nicht* vor Erkältungen.',
      farbe: ROT,
      fotos: [{ suche: 'pills bottle pouring', video: true }],
      studie: { titel: 'BfR · Bundesinstitut', zeile: 'Hochdosis schützt nicht vor Erkältung', wort: 'schützen' },
    },
    {
      text: 'Vitamin C ist also wichtig, aber kein Erkältungsschutz. Eine rote Paprika deckt deinen *Tagesbedarf*.',
      farbe: ORANGE,
      pause: 0.9,
      fotos: [{ suche: 'healthy salad bowl', video: true }],
      schlagzeile: { oben: 'Wichtig: ja.', unten: 'Wundermittel: nein.', farbeUnten: ORANGE, wort: 'kein' },
    },
  ],
};
