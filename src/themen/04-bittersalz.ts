import type { Thema } from '../typen';

const GELB = '#FFC83D';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';
const TUERKIS = '#4FD1C5';

/**
 * BITTERSALZ (15.11.2026), ruhiger Look, Ziel ~2 min.
 * Quellen:
 *  - Sies & Brooker 2005, Lancet 365:1388: "Gallensteine" nach Leberreinigung = Seifensteine,
 *    ~75 % Fettsaeuren, kein Cholesterin/Bilirubin/Calcium
 *  - Fallbericht 2024, Front Med 11:1416956: lebensbedrohliche Hypermagnesiaemie nach
 *    Bittersalz-Einnahme bei normaler Nierenfunktion (60-jaehrige Frau, Nierenersatztherapie)
 *  - Groeber et al. 2017, Nutrients 9:813: transdermale Magnesium-Aufnahme nicht belegt
 *  - Full Fact (Gallbladder flush): keine verlaesslichen Belege fuer Steinabgang
 *  - Magnesiumsulfat: in Deutschland als Abfuehrmittel (Arzneimittel) erhaeltlich
 */
export const thema: Thema = {
  id: '04-bittersalz',
  titel: 'Bittersalz-Leberreinigung: Was da wirklich rauskommt 🧂 #shorts',
  quelleKurz: 'Quellen: Lancet · Studien · Fallberichte',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 4, 5, 7, 8, 9, 11, 13, 16],
  beschreibung:
    'Bittersalz soll die Leber reinigen und Gallensteine ausspülen. Was steckt wirklich in den „Steinen“, ' +
    'die nach einer Leberreinigung in der Toilette liegen? Und wann wird Bittersalz gefährlich?\n\n' +
    'Quellen: Sies & Brooker 2005 (The Lancet), Fallbericht Frontiers in Medicine 2024, Gröber et al. 2017 (Nutrients), Full Fact.\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #bittersalz #leberreinigung #gesundheit #mryfacts',
  tags: ['bittersalz', 'leberreinigung', 'gallensteine', 'magnesiumsulfat', 'bittersalz bad', 'epsom salz', 'gesundheit'],
  quellen: [
    'https://pubmed.ncbi.nlm.nih.gov/15836886/',
    'https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2024.1416956/full',
    'https://pmc.ncbi.nlm.nih.gov/articles/PMC5579607',
    'https://fullfact.org/health/gallbladder-flush-stones-alternative-therapy/',
  ],

  szenen: [
    {
      text: 'Bittersalz soll deine *Leber* reinigen und Gallensteine ausspülen. Aber was kommt da wirklich raus?',
      farbe: TUERKIS,
      pause: 0.3,
      fotos: [{ suche: 'salt crystals macro', video: true }],
      schlagzeile: { oben: 'Bittersalz:', unten: 'Leberreinigung?' },
    },
    {
      text: 'Bittersalz ist Magnesiumsulfat. Seinen Namen hat es vom *bitteren* Geschmack.',
      farbe: TUERKIS,
      fotos: [
        { suche: 'white salt spoon', video: true },
        { suche: 'woman tasting bitter face', video: true, wort: 'bitteren' },
      ],
    },
    {
      text: 'Auf Englisch heißt es Epsom-Salz, nach einer *Quelle* in der englischen Stadt Epsom.',
      farbe: TUERKIS,
      fotos: [{ suche: 'english countryside village', video: true }],
    },
    {
      text: 'In der Apotheke ist es ein zugelassenes *Abführmittel*. Es zieht Wasser in den Darm, der Stuhl wird weich.',
      farbe: GELB,
      fotos: [
        { suche: 'pharmacy shelves medicine', video: true },
        { suche: 'glass of water pouring', video: true, wort: 'Wasser' },
      ],
    },
    {
      text: 'Berühmt wurde es aber durch die *Leberreinigung*: erst fasten, dann Bittersalz, Olivenöl und Grapefruitsaft.',
      farbe: GELB,
      fotos: [
        { suche: 'olive oil pouring', video: true },
        { suche: 'grapefruit juice', video: true, wort: 'Grapefruitsaft' },
      ],
    },
    {
      text: 'Am nächsten Morgen liegen grüne Kügelchen in der Toilette. Viele halten sie für *Gallensteine*.',
      farbe: GELB,
      fotos: [{ suche: 'bathroom morning', video: true }],
    },
    {
      text: 'Forscher haben solche Kügelchen untersucht. Ergebnis: kein Cholesterin, kein Kalk, kein *Gallenfarbstoff*.',
      farbe: ROT,
      fotos: [{ suche: 'laboratory microscope scientist', video: true }],
      studie: { titel: 'The Lancet · 2005', zeile: '„Steine“ zu 75 % aus Fettsäuren', wort: 'untersucht' },
    },
    {
      text: 'Es waren *Seifensteine*. Sie entstehen im Darm aus dem Olivenöl selbst.',
      farbe: ROT,
      pause: 0.5,
      fotos: [{ suche: 'soap bubbles', video: true }],
      schlagzeile: { oben: 'Keine Gallensteine.', unten: 'Seifensteine.', wort: 'Seifensteine' },
    },
    {
      text: 'Und wer echte Gallensteine hat? Ärzte warnen: Die große Menge Fett lässt die Gallenblase kräftig zusammenziehen. Ein Stein kann dabei *steckenbleiben*.',
      farbe: ROT,
      fotos: [
        { suche: 'doctor ultrasound examination', video: true },
        { suche: 'man stomach pain', video: true, wort: 'steckenbleiben' },
      ],
    },
    {
      text: 'Dazu kommt das Salz selbst. Es löst Durchfall aus, und mit dem Wasser gehen auch *Mineralstoffe* verloren.',
      farbe: GELB,
      fotos: [{ suche: 'woman drinking water glass', video: true }],
    },
    {
      text: 'Im Extremfall wird es gefährlich: 2024 kam eine Frau nach Bittersalz mit einer schweren *Magnesiumvergiftung* auf die Intensivstation. Trotz gesunder Nieren.',
      farbe: ROT,
      pause: 0.4,
      fotos: [{ suche: 'hospital intensive care', video: true }],
      studie: { titel: 'Fallbericht · 2024', zeile: 'Lebensgefährlich viel Magnesium', wort: 'Magnesiumvergiftung' },
    },
    {
      text: 'Besonders riskant ist das bei schwachen *Nieren*. Denn sie müssen das Magnesium wieder loswerden.',
      farbe: ROT,
      fotos: [{ suche: 'doctor explaining patient', video: true }],
    },
    {
      text: 'Und das beliebte Bittersalz-Bad? Dass Magnesium dabei über die Haut ins Blut geht, ist laut einer Übersichtsarbeit *nicht belegt*.',
      farbe: BLAU,
      fotos: [{ suche: 'bath salt bathtub', video: true }],
      studie: { titel: 'Gröber et al. · 2017', zeile: 'Magnesium über die Haut: nicht belegt', wort: 'Übersichtsarbeit' },
    },
    {
      text: 'Entspannend ist das warme Wasser trotzdem. Nur eben nicht wegen des *Magnesiums*.',
      farbe: BLAU,
      fotos: [{ suche: 'relaxing bath candles', video: true }],
    },
    {
      text: 'Magnesium bekommst du übrigens gut über *Nüsse*, Vollkorn und Hülsenfrüchte.',
      farbe: GRUEN,
      fotos: [
        { suche: 'nuts mix bowl', video: true },
        { suche: 'lentils beans cooking', video: true, wort: 'Hülsenfrüchte' },
      ],
    },
    {
      text: 'Bittersalz ist also ein Abführmittel, kein Leberreiniger. Deine *Leber* reinigt sich selbst, jeden Tag.',
      farbe: TUERKIS,
      pause: 0.9,
      fotos: [{ suche: 'sunrise nature calm', video: true }],
      schlagzeile: { oben: 'Kein Leberreiniger.', unten: 'Ein Abführmittel.', farbeUnten: TUERKIS, wort: 'Abführmittel' },
    },
  ],
};
