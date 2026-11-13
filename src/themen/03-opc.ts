import type { Thema } from '../typen';

const LILA = '#B98CFF';
const GELB = '#FFC83D';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * OPC / TRAUBENKERNEXTRAKT (13.11.2026), ruhiger Look, Ziel 80-100 s.
 *
 * Quellen:
 *  - Verbraucherzentrale (Klartext NEM): keine zugelassenen gesundheitsbezogenen Angaben
 *    fuer OPC; antioxidative Wirkung nur in Zell- und Tierversuchen; Extrakte nicht
 *    standardisiert. verbraucherzentrale.de/faq/lebensmittel/werbung-zu-opcpraeparaten-22598
 *  - EFSA NDA-Gutachten "cause and effect not established": Cholesterin (2009, OPC Premium),
 *    chronisch-venoese Insuffizienz (2010, OPC Plus), Dunkeladaptation (2011),
 *    Blutdruck (2021, MegaNatural-BP)
 *  - Zhang et al. 2016, Medicine 95:e4247: Meta-Analyse 16 RCTs, n=810,
 *    systolisch -6,08 mmHg (KI -10,7 bis -1,4)
 *  - Feringa et al. 2011, J Am Diet Assoc 111:1173: 9 Studien, n=390, systolisch -1,54 mmHg
 *  - Tao et al. 2019, Compr Rev Food Sci Food Saf 18:971: Proanthocyanidine kaum
 *    aufgenommen (nur Mono-/Di-/Trimere), Hauptwirkort vermutlich der Darm
 *  - NCCIH (NIH): moeglicherweise unsicher bei Blutungsstoerungen, vor Operationen,
 *    mit Gerinnungshemmern
 *  - Hammerstone et al. 2000, J Nutr 130:2086: Aepfel/Kakao reich an Procyanidinen,
 *    stark sortenabhaengig
 *  - Geschichte: Jacques Cartier, Winter 1535/36 am St.-Lorenz-Strom, Skorbut, Tee
 *    ("Annedda") der Irokesen; Masquelier isolierte ab den 1940ern OPC
 */
export const thema: Thema = {
  id: '03-opc',
  titel: 'OPC: 20-mal stärker als Vitamin C? 🍇 #shorts',
  quelleKurz: 'Quellen: EFSA · Verbraucherzentrale · Studien',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  // YouTube-Shorts-Fassung (~53 s): ohne Herkunft + Geschichte, Kern = Mythos -> Belege -> Zulassung
  kurzfassung: [1, 7, 8, 9, 10, 11, 12, 14, 16],
  beschreibung:
    'OPC aus Traubenkernen wird als Super-Antioxidans verkauft – angeblich 20-mal stärker als Vitamin C. ' +
    'Woher die Zahl kommt, was Studien am Menschen zeigen und warum in der EU keine einzige Gesundheitsaussage zugelassen ist.\n\n' +
    'Quellen: Verbraucherzentrale (Werbung zu OPC-Präparaten), EFSA-Gutachten 2009–2021, ' +
    'Zhang et al. 2016 (Medicine), Feringa et al. 2011 (J Am Diet Assoc), Tao et al. 2019, NCCIH.\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung. ' +
    'Wer Medikamente nimmt, klärt Nahrungsergänzung mit Arzt oder Apotheke.\n\n' +
    '#shorts #opc #nahrungsergänzung #gesundheit #mryfacts',
  tags: ['opc', 'traubenkernextrakt', 'opc traubenkern', 'antioxidantien', 'nahrungsergänzungsmittel', 'blutdruck', 'gesundheit'],
  quellen: [
    'https://www.verbraucherzentrale.de/faq/lebensmittel/werbung-zu-opcpraeparaten-22598',
    'https://pubmed.ncbi.nlm.nih.gov/27537554/',
    'https://www.nccih.nih.gov/health/grape-seed-extract',
    'https://doi.org/10.1111/1541-4337.12444',
    'https://pubmed.ncbi.nlm.nih.gov/10917927/',
  ],

  szenen: [
    // HOOK
    {
      text: 'OPC soll *20-mal stärker* sein als Vitamin C. Aber stimmt das?',
      farbe: LILA,
      pause: 0.3,
      fotos: [{ suche: 'red grapes vineyard close up', video: true }],
      schlagzeile: { oben: '20-mal stärker', unten: 'als Vitamin C?' },
    },
    {
      text: 'OPC steht für oligomere *Proanthocyanidine*. Klingt kompliziert, sind aber Pflanzenstoffe.',
      farbe: LILA,
      fotos: [
        { suche: 'grapes macro water drops', video: true },
        { suche: 'green leaves sunlight', video: true, wort: 'Pflanzenstoffe' },
      ],
    },
    {
      text: 'Sie stecken in *Traubenkernen*, in Äpfeln mit Schale und in Kakao.',
      farbe: LILA,
      fotos: [
        { suche: 'grapes cut in half', video: true },
        { suche: 'red apple', video: true, wort: 'Äpfeln' },
        { suche: 'cocoa beans', video: true, wort: 'Kakao' },
      ],
    },
    // Geschichte
    {
      text: 'Die Geschichte beginnt *1535*. Seefahrer Jacques Cartier steckt im kanadischen Eis fest, seine Männer haben Skorbut.',
      farbe: BLAU,
      fotos: [
        { suche: 'old sailing ship ocean', video: true },
        { suche: 'frozen river winter', video: true, wort: 'Eis' },
      ],
    },
    {
      text: 'Einheimische kochen ihnen einen Tee aus Baumrinde, und sie werden gesund. Heute wissen wir: Das lag am *Vitamin C*.',
      farbe: GELB,
      fotos: [
        { suche: 'pine tree bark close up', video: true },
        { suche: 'steaming mug of tea hands', video: true, wort: 'gesund' },
      ],
    },
    {
      text: 'Rund *400 Jahre* später isoliert der Franzose Jacques Masquelier aus Kiefernrinde die Stoffe, die heute als OPC verkauft werden.',
      farbe: BLAU,
      fotos: [
        { suche: 'old books library', video: true },
        { suche: 'scientist microscope', video: true, wort: 'Kiefernrinde' },
      ],
    },
    // Die 20-mal-Zahl
    {
      text: 'Und die *20-mal stärker*? Die Zahl stammt aus dem *Reagenzglas*.',
      farbe: ROT,
      pause: 0.4,
      fotos: [{ suche: 'test tubes laboratory', video: true }],
      schlagzeile: { oben: 'Nur im', unten: 'Reagenzglas', wort: 'Reagenzglas' },
    },
    {
      text: 'Dort fängt OPC freie Radikale ab. Ob das im Körper genauso klappt, ist *nicht belegt*.',
      farbe: ROT,
      fotos: [
        { suche: 'petri dish microscope', video: true },
        { suche: 'woman thinking', video: true, wort: 'Körper' },
      ],
      studie: { titel: 'Verbraucherzentrale', zeile: 'Wirkung nur in Zell- und Tierversuchen', wort: 'Körper' },
    },
    // Aufnahme
    {
      text: 'Denn dein Körper nimmt OPC *kaum* auf. Der Großteil landet im Darm, wo Bakterien es zerlegen.',
      farbe: GELB,
      fotos: [
        { suche: 'woman taking capsule', video: true },
        { suche: 'bacteria microscope', video: true, wort: 'Darm' },
      ],
      studie: { titel: 'Tao et al. · 2019', zeile: 'Kaum Aufnahme, Wirkort wohl der Darm', wort: 'Großteil' },
    },
    // Studien am Menschen
    {
      text: 'Und am Menschen? Beim *Blutdruck* gibt es zumindest Hinweise.',
      farbe: GRUEN,
      fotos: [{ suche: 'blood pressure monitor arm', video: true }],
    },
    {
      text: 'Eine Auswertung fand rund *6 Punkte* weniger beim oberen Wert, eine andere nur *anderthalb*.',
      farbe: GRUEN,
      fotos: [{ suche: 'doctor patient consultation', video: true }],
      bild: {
        typ: 'balken',
        max: 6.5,
        items: [
          { label: '2016 · 16 STUDIEN', wert: 6.1, anzeige: '−6 mmHg', farbe: GRUEN, wort: '6' },
          { label: '2011 · 9 STUDIEN', wert: 1.5, anzeige: '−1,5 mmHg', farbe: GELB, wort: 'anderthalb' },
        ],
      },
    },
    // Rechtslage
    {
      text: 'Zu wenig für die EU. Dort ist *keine einzige* Gesundheitsaussage für OPC zugelassen.',
      farbe: ROT,
      pause: 0.5,
      fotos: [{ suche: 'european union flag', video: true }],
      schlagzeile: { oben: 'Zugelassene Aussagen:', unten: 'null', wort: 'keine' },
    },
    {
      text: 'Die EFSA prüfte Venen, Cholesterin und Blutdruck. Jedes Mal: *nicht belegt*.',
      farbe: ROT,
      fotos: [{ suche: 'documents office desk', video: true }],
      studie: { titel: 'EFSA · 2009 bis 2021', zeile: 'Venen, Cholesterin, Blutdruck: nicht belegt', wort: 'prüfte' },
    },
    // Sicherheit
    {
      text: 'Und Vorsicht: Wer Blutverdünner nimmt, bespricht OPC besser vorher mit dem *Arzt*.',
      farbe: GELB,
      pause: 0.4,
      fotos: [
        { suche: 'pharmacist pharmacy counter', video: true },
        { suche: 'doctor talking with patient', video: true, wort: 'Arzt' },
      ],
    },
    {
      text: 'Übrigens: Auch ein *Apfel* mit Schale liefert OPC.',
      farbe: GRUEN,
      fotos: [{ suche: 'woman biting apple', video: true }],
    },
    {
      text: 'Am Ende bleibt: viel Reagenzglas, aber wenig *Beweise* am Menschen.',
      farbe: LILA,
      pause: 0.9,
      fotos: [{ suche: 'grapes vineyard sunset', video: true }],
      schlagzeile: { oben: 'Viel Reagenzglas.', unten: 'Wenig Beweis.', farbeUnten: LILA, wort: 'wenig' },
    },
  ],
};
