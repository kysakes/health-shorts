import type { Thema } from '../typen';

const LILA = '#B98CFF';
const GELB = '#FFC83D';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * TRAUBENKERNEXTRAKT / OPC - Fassung 3 (15.11.2026), positiver Ton, ruhiger Look.
 * Nutzerwunsch: OPC positiv darstellen, "es gibt jede Menge Studien", Stil-Referenz
 * Robert Franz (nur Vermittlung: direkte Ansprache, Bilder). Inhalte NUR belegt,
 * keine Heilversprechen (HCVO / YouTube-Richtlinie), Formulierung "in Studien".
 *
 * Quellen:
 *  - Zhang et al. 2016, Medicine 95:e4247: 16 RCTs, n=810, systolisch -6,1 mmHg,
 *    diastolisch -2,8 mmHg; deutlicher bei Uebergewicht/metabolischem Syndrom
 *  - He, Li, MacGregor 2013, BMJ 346:f1325: weniger Salz -> systolisch ~-5,4 mmHg
 *  - Anjom-Shoae et al. 2020, Br J Nutr: 11 RCTs, LDL und Triglyceride gesenkt
 *  - Asbaghi et al. 2020, Phytother Res 34:239: Nuechternglukose, LDL, CRP gesenkt
 *  - Clifton 2004, J Biomed Biotechnol 2004:272: Gefaessfunktion (FMD) +1,1 % absolut
 *  - Sano et al. 2013, J Sci Food Agric 93:457: weniger Beinschwellung nach 6 h Sitzen
 *  - Yamakoshi et al. 2004, Phytother Res 18:895: Chloasma bei 10 von 12 Frauen gebessert
 *  - Drugs.com / NCCIH: gut vertraeglich, Nebenwirkungen aehnlich haeufig wie Placebo;
 *    Vorsicht Gerinnungshemmer/OP; Schwangerschaft: keine Daten
 */
export const thema: Thema = {
  id: '03-opc',
  titel: 'OPC aus Traubenkernen: Das zeigen die Studien 🍇 #shorts',
  quelleKurz: 'Quellen: Meta-Analysen · Studien · NIH',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  // YouTube-Shorts-Fassung (~55 s)
  kurzfassung: [1, 3, 4, 5, 6, 8, 11, 13],
  beschreibung:
    'OPC aus Traubenkernen gehört zu den am besten untersuchten Pflanzenstoffen. Was zeigen die Studien ' +
    'bei Blutdruck, Cholesterin, Blutzucker, Entzündungswerten, Gefäßen, geschwollenen Beinen und Haut? ' +
    'Und worauf solltest du achten?\n\n' +
    'Quellen: Zhang et al. 2016 (Medicine), He et al. 2013 (BMJ), Anjom-Shoae et al. 2020 (Br J Nutr), ' +
    'Asbaghi et al. 2020 (Phytother Res), Clifton 2004, Sano et al. 2013, Yamakoshi et al. 2004, NCCIH (NIH).\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung. ' +
    'Wer Medikamente nimmt, klärt Nahrungsergänzung mit Arzt oder Apotheke.\n\n' +
    '#shorts #opc #traubenkernextrakt #nahrungsergänzung #mryfacts',
  tags: ['opc', 'traubenkernextrakt', 'opc wirkung', 'opc studien', 'opc traubenkern', 'blutdruck', 'nahrungsergänzungsmittel'],
  quellen: [
    'https://pubmed.ncbi.nlm.nih.gov/27537554/',
    'https://doi.org/10.1136/bmj.f1325',
    'https://doi.org/10.1017/S0007114520000902',
    'https://pubmed.ncbi.nlm.nih.gov/31880030/',
    'https://pubmed.ncbi.nlm.nih.gov/15577189/',
    'https://pubmed.ncbi.nlm.nih.gov/22752876/',
    'https://doi.org/10.1002/ptr.1537',
    'https://www.nccih.nih.gov/health/grape-seed-extract',
  ],

  szenen: [
    // 1 HOOK
    {
      text: 'OPC aus Traubenkernen gehört zu den am besten untersuchten *Pflanzenstoffen*. Was zeigen die Studien?',
      farbe: LILA,
      pause: 0.3,
      fotos: [
        { suche: 'red grapes vineyard close up', video: true },
        { suche: 'capsules supplement bottle', video: true, wort: 'Studien' },
      ],
      schlagzeile: { oben: 'OPC:', unten: 'Das zeigen Studien' },
    },
    // 2 Was ist das
    {
      text: 'Die Traube schützt damit ihre Kerne, wie ein *Rostschutz*. Und genau diese Schutzstoffe wurden in Dutzenden Studien am Menschen getestet.',
      farbe: LILA,
      fotos: [
        { suche: 'grapes macro water drops', video: true },
        { suche: 'scientist laboratory research', video: true, wort: 'Studien' },
      ],
    },
    // 3 Blutdruck
    {
      text: 'Am stärksten untersucht: der *Blutdruck*. Eine Auswertung von 16 Studien fand rund 6 Punkte weniger beim oberen Wert.',
      farbe: GRUEN,
      fotos: [
        { suche: 'blood pressure monitor arm', video: true },
        { suche: 'doctor patient consultation', video: true, wort: 'Auswertung' },
      ],
      bild: {
        typ: 'balken',
        max: 7,
        items: [
          { label: 'OBERER WERT', wert: 6.1, anzeige: '−6 mmHg', farbe: GRUEN, wort: '6' },
          { label: 'UNTERER WERT', wert: 2.8, anzeige: '−3 mmHg', farbe: BLAU, wort: 'Wert' },
        ],
      },
    },
    // 4 Vergleich
    {
      text: 'Zum Vergleich: Das ist etwa so viel, wie *weniger Salz* bei Bluthochdruck bringt. Am deutlichsten war der Effekt bei Übergewicht.',
      farbe: GRUEN,
      fotos: [
        { suche: 'salt shaker food', video: true },
        { suche: 'man measuring waist', video: true, wort: 'Übergewicht' },
      ],
      studie: { titel: 'Medicine · 2016 · 16 Studien', zeile: 'Oberer Wert: rund −6 mmHg', wort: 'Vergleich' },
    },
    // 5 Cholesterin
    {
      text: 'Auch beim *LDL*, dem schlechten Cholesterin, und bei den Blutfetten zeigen zwei große Auswertungen eine Senkung.',
      farbe: GELB,
      fotos: [
        { suche: 'blood sample tube laboratory', video: true },
        { suche: 'healthy breakfast table', video: true, wort: 'Blutfetten' },
      ],
      studie: { titel: 'Br J Nutr · 2020 · 11 Studien', zeile: 'LDL und Blutfette gesenkt', wort: 'Auswertungen' },
    },
    // 6 Entzuendung + Zucker
    {
      text: 'Dazu sanken in Studien der Entzündungswert *CRP* und der Nüchternblutzucker.',
      farbe: GELB,
      fotos: [
        { suche: 'blood glucose meter finger', video: true },
        { suche: 'doctor reading results', video: true, wort: 'Nüchternblutzucker' },
      ],
      studie: { titel: 'Phytother Res · 2020', zeile: 'CRP und Blutzucker gesenkt', wort: 'CRP' },
    },
    // 7 Gefaesse
    {
      text: 'Und die Gefäße? In einer Studie mit Risikopatienten konnten sich die Blutgefäße nach OPC *besser weiten*.',
      farbe: ROT,
      fotos: [
        { suche: 'heart blood vessels animation', video: true },
        { suche: 'senior man walking park', video: true, wort: 'weiten' },
      ],
    },
    // 8 Beine
    {
      text: 'Spannend für alle mit Bürojob: Bei Frauen schwollen die *Beine* nach sechs Stunden Sitzen deutlich weniger an.',
      farbe: BLAU,
      fotos: [
        { suche: 'woman working office desk', video: true },
        { suche: 'woman legs walking', video: true, wort: 'Beine' },
      ],
      studie: { titel: 'Sano et al. · 2013', zeile: 'Weniger Beinschwellung beim Sitzen', wort: 'Frauen' },
    },
    // 9 Haut
    {
      text: 'Sogar die Haut: Bei Pigmentflecken im Gesicht besserte sich das Hautbild bei *10 von 12* Frauen.',
      farbe: LILA,
      fotos: [{ suche: 'woman face skin mirror', video: true }],
      bild: { typ: 'zaehler', von: 0, bis: 10, nach: ' von 12', farbe: LILA, unter: 'FRAUEN MIT BESSERUNG', wort: '10' },
    },
    // 10 Vertraeglichkeit
    {
      text: 'Und die Verträglichkeit? In Studien traten Nebenwirkungen etwa *so selten* auf wie beim Scheinmittel.',
      farbe: GRUEN,
      fotos: [{ suche: 'woman smiling morning kitchen', video: true }],
    },
    // 11 Vorsicht
    {
      text: 'Wichtig nur: Wer *Blutverdünner* nimmt oder eine Operation vor sich hat, spricht vorher mit dem Arzt.',
      farbe: ROT,
      pause: 0.4,
      fotos: [
        { suche: 'pharmacist pharmacy counter', video: true },
        { suche: 'doctor talking with patient', video: true, wort: 'Arzt' },
      ],
      studie: { titel: 'NCCIH · NIH', zeile: 'Blutverdünner: Blutungsrisiko', wort: 'Blutverdünner' },
    },
    // 12 Schwangerschaft
    {
      text: 'Und für Schwangerschaft und Stillzeit fehlen noch *Daten*.',
      farbe: ROT,
      fotos: [{ suche: 'pregnant woman belly', video: true }],
    },
    // 13 Schluss
    {
      text: 'OPC ist also kein Wundermittel. Aber ein Pflanzenstoff mit *messbaren* Effekten und vielen Studien dahinter.',
      farbe: LILA,
      pause: 0.9,
      fotos: [{ suche: 'grapes vineyard sunset', video: true }],
      schlagzeile: { oben: 'Gut untersucht.', unten: 'Messbare Effekte.', farbeUnten: LILA, wort: 'messbaren' },
    },
  ],
};
