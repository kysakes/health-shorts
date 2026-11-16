import type { Thema } from '../typen';

const GELB = '#FFC83D';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';
const SILBER = '#B8C4D6';

/**
 * ZINK (15.11.2026), ruhiger Look, Ziel ~2 min.
 * Quellen:
 *  - EU-Verordnung 432/2012: zugelassene Angaben fuer Zink (u. a. Immunsystem, Haut, Haare, Naegel)
 *  - Nault et al. 2024, Cochrane CD014914: 34 Studien, 8.526 Teilnehmer; Vorbeugung kaum/kein
 *    Unterschied; Behandlung ab Symptomen ~2,4 Tage kuerzer (geringe Vertrauenswuerdigkeit);
 *    mehr nicht-schwere Nebenwirkungen (Geschmack, Uebelkeit)
 *  - EFSA/SCF: tolerierbare Hoechstmenge 25 mg/Tag (Erwachsene); zu viel -> Kupfermangel, Anaemie
 *  - DGE 2019: Referenzwerte abhaengig von Phytat: Maenner 11-16 mg, Frauen 7-10 mg
 */
export const thema: Thema = {
  id: '07-zink',
  titel: 'Zink gegen Erkältung: Schutz oder Risiko? #shorts',
  quelleKurz: 'Quellen: Cochrane · EFSA · DGE',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 3, 4, 5, 7, 8, 13],
  beschreibung:
    'Zink ist wichtig fürs Immunsystem – das ist offiziell anerkannt. Aber verhindert es Erkältungen? ' +
    'Was die Cochrane-Auswertung 2024 zeigt und warum zu viel Zink einen Kupfermangel auslösen kann.\n\n' +
    'Quellen: Nault et al. 2024 (Cochrane), EU-Verordnung 432/2012, EFSA (Höchstmenge), DGE (Referenzwerte).\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #zink #erkältung #immunsystem #mryfacts',
  tags: ['zink', 'zink erkältung', 'zink überdosierung', 'zink lebensmittel', 'kupfermangel', 'immunsystem', 'gesundheit'],
  quellen: [
    'https://doi.org/10.1002/14651858.CD014914.pub2',
    'https://eur-lex.europa.eu/eli/reg/2012/432/oj',
    'https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf',
    'https://www.dge.de/wissenschaft/referenzwerte/zink/',
  ],

  szenen: [
    {
      text: 'Zink gegen Erkältung: Hilft das wirklich? Oder *schadet* zu viel davon sogar?',
      farbe: SILBER,
      pause: 0.3,
      fotos: [{ suche: 'woman sick tea blanket', video: true }],
      schlagzeile: { oben: 'Zink:', unten: 'Schutz oder Risiko?' },
    },
    {
      text: 'Zink ist ein Spurenelement. Dein Körper braucht es für *hunderte* Enzyme, für Haut, Haare und das Immunsystem.',
      farbe: SILBER,
      fotos: [
        { suche: 'cells microscope animation', video: true },
        { suche: 'woman hair skin healthy', video: true, wort: 'Haut' },
      ],
    },
    {
      text: 'Und anders als bei vielen Mitteln ist das *offiziell* anerkannt. Die EU erlaubt etwa die Aussage: Zink trägt zu einem normalen Immunsystem bei.',
      farbe: GRUEN,
      fotos: [{ suche: 'european union flag', video: true }],
      studie: { titel: 'EU · zugelassene Aussagen', zeile: 'Zink: Immunsystem, Haut, Haare', wort: 'offiziell' },
    },
    {
      text: 'Aber verhindert Zink eine Erkältung? Eine große Cochrane-Auswertung mit 34 Studien sagt: *kaum* ein Unterschied.',
      farbe: ROT,
      fotos: [{ suche: 'scientist data research', video: true }],
      studie: { titel: 'Cochrane · 2024 · 34 Studien', zeile: 'Vorbeugen: kaum ein Unterschied', wort: 'Cochrane' },
    },
    {
      text: 'Anders, wenn die Erkältung schon da ist: Mit Zink war sie im Schnitt gut *zwei Tage* kürzer.',
      farbe: GRUEN,
      pause: 0.4,
      fotos: [{ suche: 'calendar days', video: true }],
      schlagzeile: { oben: 'Gut 2 Tage', unten: 'kürzer krank', farbeUnten: GRUEN, wort: 'zwei' },
    },
    {
      text: 'Aber: Die Beweislage dafür ist *schwach*. Und viele bekamen einen metallischen Geschmack oder Übelkeit.',
      farbe: GELB,
      fotos: [{ suche: 'woman nausea', video: true }],
    },
    {
      text: 'Mehr ist auch hier nicht besser. Die EFSA setzt die Obergrenze bei *25 Milligramm* am Tag.',
      farbe: ROT,
      fotos: [{ suche: 'pills bottle pouring', video: true }],
      bild: { typ: 'zaehler', von: 0, bis: 25, nach: ' mg', farbe: ROT, icon: 'dose', unter: 'OBERGRENZE PRO TAG', wort: '25' },
    },
    {
      text: 'Wer dauerhaft zu viel nimmt, riskiert einen *Kupfermangel*. Zink verdrängt Kupfer im Darm, im schlimmsten Fall bis zur Blutarmut.',
      farbe: ROT,
      fotos: [{ suche: 'tired woman exhausted', video: true }],
    },
    {
      text: 'Wie viel brauchst du? Das hängt vom Essen ab: Männer *11 bis 16*, Frauen 7 bis 10 Milligramm.',
      farbe: BLAU,
      fotos: [{ suche: 'healthy food table', video: true }],
    },
    {
      text: 'Der Grund ist Phytat aus Vollkorn und Hülsenfrüchten. Es *bindet* Zink. Je mehr davon, desto mehr Zink brauchst du.',
      farbe: BLAU,
      fotos: [
        { suche: 'whole grain bread', video: true },
        { suche: 'lentils beans cooking', video: true, wort: 'Hülsenfrüchten' },
      ],
    },
    {
      text: 'Viel Zink steckt in *Austern*, Rindfleisch, Käse, Haferflocken und Kürbiskernen.',
      farbe: GRUEN,
      fotos: [
        { suche: 'oysters plate', video: true },
        { suche: 'beef steak cooking', video: true, wort: 'Rindfleisch' },
        { suche: 'oatmeal bowl', video: true, wort: 'Haferflocken' },
      ],
    },
    {
      text: 'Wer vegetarisch isst, braucht wegen des Phytats oft *etwas mehr*.',
      farbe: GRUEN,
      fotos: [{ suche: 'vegetarian meal', video: true }],
    },
    {
      text: 'Zink ist also wichtig, aber kein *Erkältungsschutz*. Und mehr als 25 Milligramm am Tag sind dauerhaft zu viel.',
      farbe: SILBER,
      pause: 0.9,
      fotos: [{ suche: 'sunrise nature calm', video: true }],
      schlagzeile: { oben: 'Wichtig: ja.', unten: 'Viel hilft viel: nein.', farbeUnten: SILBER, wort: 'kein' },
    },
  ],
};
