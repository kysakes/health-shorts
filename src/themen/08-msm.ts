import type { Thema } from '../typen';

const GELB = '#FFC83D';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';
const LILA = '#B98CFF';

/**
 * MSM / METHYLSULFONYLMETHAN (15.11.2026), ruhiger Look, Ziel ~2 min.
 * Quellen:
 *  - Kim et al. 2006, Osteoarthritis Cartilage 14:286: 50 Teilnehmende, Knie-Arthrose,
 *    2x 3 g/Tag, 12 Wochen -> WOMAC-Schmerz und Funktion besser als Placebo;
 *    Autoren: Pilotstudie, Nutzen/Sicherheit bei Langzeitgebrauch nicht bestaetigt
 *  - Debbi et al. 2011, BMC Complement Altern Med 11:50: 49 Patienten, Funktion leicht besser,
 *    Schmerz kein Unterschied; klinische Bedeutung unklar
 *  - Schwefel: Aufnahme ueber schwefelhaltige Aminosaeuren (Eiweiss)
 *  - Leitlinien Knie-Arthrose: Bewegung/Training als Basistherapie
 */
export const thema: Thema = {
  id: '08-msm',
  titel: 'MSM für die Gelenke: Was Studien wirklich zeigen #shorts',
  quelleKurz: 'Quellen: Studien 2006 · 2011',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 4, 5, 6, 7, 8, 9, 14],
  beschreibung:
    'MSM soll Gelenke schmieren und Arthrose-Schmerzen lindern. Was steckt hinter dem Schwefel-Pulver, ' +
    'was zeigen die beiden bekanntesten Studien und was hilft bei Knie-Arthrose nachweislich?\n\n' +
    'Quellen: Kim et al. 2006 (Osteoarthritis and Cartilage), Debbi et al. 2011 (BMC Complementary and Alternative Medicine), ' +
    'Leitlinien zur Gonarthrose.\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #msm #arthrose #gelenke #mryfacts',
  tags: ['msm', 'msm gelenke', 'methylsulfonylmethan', 'arthrose', 'knie arthrose', 'gelenkschmerzen', 'nahrungsergänzungsmittel'],
  quellen: [
    'https://pubmed.ncbi.nlm.nih.gov/16309928/',
    'https://pubmed.ncbi.nlm.nih.gov/21708034/',
  ],

  szenen: [
    {
      text: 'MSM soll Gelenke schmieren und *Arthrose*-Schmerzen lindern. Was steckt wirklich dahinter?',
      farbe: LILA,
      pause: 0.3,
      fotos: [{ suche: 'man knee pain', video: true }],
      schlagzeile: { oben: 'MSM:', unten: 'Hilfe für die Gelenke?' },
    },
    {
      text: 'MSM steht für Methylsulfonylmethan, eine *Schwefelverbindung*. In kleinen Mengen steckt sie auch in Milch, Kaffee und Gemüse.',
      farbe: LILA,
      fotos: [
        { suche: 'white powder spoon', video: true },
        { suche: 'milk pouring glass', video: true, wort: 'Milch' },
      ],
    },
    {
      text: 'Verkauft wird es vor allem gegen *Gelenkschmerzen*, aber auch für schöne Haut und Haare.',
      farbe: LILA,
      fotos: [
        { suche: 'elderly man stairs knee', video: true },
        { suche: 'woman hair skin healthy', video: true, wort: 'Haut' },
      ],
    },
    {
      text: 'Die Idee dahinter: Gelenkknorpel braucht *Schwefel*. Also soll mehr Schwefel mehr helfen.',
      farbe: GELB,
      fotos: [{ suche: 'knee joint model', video: true }],
    },
    {
      text: 'Nur: Einen echten Schwefelmangel gibt es kaum. Wer genug *Eiweiß* isst, bekommt Schwefel automatisch mit.',
      farbe: GRUEN,
      fotos: [
        { suche: 'eggs breakfast', video: true },
        { suche: 'beans lentils bowl', video: true, wort: 'Eiweiß' },
      ],
    },
    {
      text: 'Und die Studien? Die bekannteste stammt von 2006: 50 Menschen mit *Knie-Arthrose*, zwölf Wochen lang.',
      farbe: BLAU,
      fotos: [{ suche: 'doctor examining knee', video: true }],
      studie: { titel: 'Kim et al. · 2006', zeile: '50 Teilnehmer, 12 Wochen', wort: 'Studien' },
    },
    {
      text: 'Mit MSM hatten sie etwas *weniger Schmerzen* und waren beweglicher als mit einem Scheinmittel.',
      farbe: GRUEN,
      fotos: [{ suche: 'elderly woman walking park', video: true }],
    },
    {
      text: 'Aber die Forscher selbst schrieben: Das ist nur eine *Pilotstudie*. Nutzen und Sicherheit auf Dauer sind damit nicht bestätigt.',
      farbe: ROT,
      pause: 0.4,
      fotos: [{ suche: 'scientist writing notes', video: true }],
      schlagzeile: { oben: 'Nur eine', unten: 'Pilotstudie.', wort: 'Pilotstudie' },
    },
    {
      text: 'Eine zweite Studie von 2011 mit 49 Patienten fand bei den Schmerzen *keinen* Unterschied. Nur die Beweglichkeit wurde etwas besser.',
      farbe: ROT,
      fotos: [{ suche: 'physiotherapy knee exercise', video: true }],
      studie: { titel: 'Debbi et al. · 2011', zeile: 'Schmerz: kein Unterschied', wort: 'Studie' },
    },
    {
      text: 'Die Forscher nannten die Verbesserungen klein. Ob man sie im *Alltag* spürt, ist unklar.',
      farbe: GELB,
      fotos: [{ suche: 'woman walking city', video: true }],
    },
    {
      text: 'Zum Vergleich: Bei Knie-Arthrose gilt laut Leitlinien vor allem *Bewegung* als Basis der Behandlung.',
      farbe: GRUEN,
      fotos: [
        { suche: 'senior cycling', video: true },
        { suche: 'strength training legs', video: true, wort: 'Bewegung' },
      ],
    },
    {
      text: 'Nebenwirkungen? In Studien wurden vor allem *Magenbeschwerden* und Kopfschmerzen berichtet.',
      farbe: GELB,
      fotos: [{ suche: 'man stomach pain', video: true }],
    },
    {
      text: 'Und zu Wechselwirkungen mit Medikamenten gibt es kaum Daten. Wer Tabletten nimmt, fragt besser in der *Apotheke*.',
      farbe: GELB,
      fotos: [{ suche: 'pharmacist pharmacy counter', video: true }],
    },
    {
      text: 'MSM ist also kein Gelenk-Wunder. Zwei kleine Studien, kleine Effekte. *Bewegung* bleibt das bessere Mittel.',
      farbe: LILA,
      pause: 0.9,
      fotos: [{ suche: 'people walking nature trail', video: true }],
      schlagzeile: { oben: 'Zwei kleine Studien.', unten: 'Kein Gelenk-Wunder.', farbeUnten: LILA, wort: 'Gelenk' },
    },
  ],
};
