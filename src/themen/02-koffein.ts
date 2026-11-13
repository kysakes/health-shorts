import type { Thema } from '../typen';

const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * KOFFEIN (12.11.2026) - Test "ruhiger Look": Clips tragen das Video,
 * hoechstens EIN Element pro Szene (Grafik ODER Schlagzeile ODER Studien-Karte),
 * keine Partikel, kein Wackeln.
 *
 * Quellen:
 *  - EFSA 2015, Scientific Opinion on the safety of caffeine (EFSA Journal 13:4102):
 *    Erwachsene bis 400 mg/Tag, Einzeldosis bis 200 mg, Schwangere bis 200 mg/Tag.
 *    EFSA-Uebersicht: Espresso 60 ml ~80 mg, Filterkaffee 200 ml ~90 mg.
 *  - Drake et al. 2013, J Clin Sleep Med 9:1195: 400 mg Koffein 6 h vor dem
 *    Schlafen -> ueber 1 h weniger Schlaf.
 *  - Killer, Blannin, Jeukendrup 2014, PLoS One 9:e84154: 4 Tassen Kaffee/Tag
 *    hydrieren aehnlich wie Wasser (Maenner, moderate Mengen).
 *  - Halbwertszeit bei Erwachsenen meist 4-6 h (stark individuell).
 */
export const thema: Thema = {
  id: '02-koffein',
  titel: 'Dein Espresso ist nicht der starke Kaffee ☕ #shorts',
  quelleKurz: 'Quellen: EFSA · Studien',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.12 },
  ruhig: true,
  beschreibung:
    'Espresso schmeckt stark – aber pro Tasse hat Filterkaffee mehr Koffein. ' +
    'Was Koffein im Körper macht, wie lange es wirkt und was es mit deinem Schlaf anstellt.\n\n' +
    'Quellen: EFSA (2015, Sicherheit von Koffein), Drake et al. 2013 (J Clin Sleep Med), ' +
    'Killer et al. 2014 (PLoS One).\n' +
    'Videos: Pexels. Allgemeine Information, keine medizinische Beratung.\n\n' +
    '#shorts #koffein #kaffee #schlaf #mryfacts',
  tags: ['koffein', 'kaffee', 'espresso', 'filterkaffee', 'schlaf', 'kaffee entwässert', 'gesundheit'],
  quellen: [
    'https://www.efsa.europa.eu/de/efsajournal/pub/4102',
    'https://www.efsa.europa.eu/de/topics/topic/caffeine',
    'https://doi.org/10.5664/jcsm.3170',
    'https://doi.org/10.1371/journal.pone.0084154',
  ],

  szenen: [
    // HOOK: Clip + Schlagzeile
    {
      text: 'Dein Espresso ist *nicht* der starke Kaffee.',
      farbe: ROT,
      pause: 0.3,
      fotos: [{ suche: 'espresso shot pouring', video: true }],
      schlagzeile: { oben: 'Espresso', unten: 'der Stärkste?' },
    },
    {
      text: 'Klingt komisch? Ein Espresso hat rund *80 Milligramm* Koffein. Eine Tasse Filterkaffee sogar *90*.',
      farbe: ORANGE,
      fotos: [
        { suche: 'espresso cup cafe', video: true },
        { suche: 'filter coffee pour over', video: true, wort: 'Filterkaffee' },
      ],
      bild: {
        typ: 'balken',
        max: 100,
        items: [
          { label: 'ESPRESSO · 60 ml', wert: 80, anzeige: '80 mg', farbe: ORANGE, wort: '80' },
          { label: 'FILTERKAFFEE · 200 ml', wert: 90, anzeige: '90 mg', farbe: GELB, wort: '90' },
        ],
      },
    },
    {
      text: 'Espresso ist also nur konzentrierter. In der ganzen Tasse steckt *weniger*.',
      farbe: ORANGE,
      fotos: [{ suche: 'barista coffee shop', video: true }],
      studie: { titel: 'EFSA · Koffein', zeile: 'Espresso 80 mg · Filter 90 mg' },
    },
    {
      text: 'Und noch etwas: Koffein macht dich gar nicht wach. Es *blockiert* nur das Signal, dass du müde bist.',
      farbe: BLAU,
      fotos: [
        { suche: 'tired man yawning desk', video: true },
        { suche: 'woman drinking coffee morning window', video: true, wort: 'blockiert' },
      ],
    },
    {
      text: 'Das Problem: Nach *vier bis sechs Stunden* ist oft noch die Hälfte davon im Blut.',
      farbe: BLAU,
      fotos: [{ suche: 'clock time lapse', video: true }],
    },
    {
      text: 'Eine Studie zeigt, was das bedeutet: Eine hohe Dosis, *sechs Stunden* vor dem Zubettgehen, kostete über *eine Stunde* Schlaf.',
      farbe: BLAU,
      pause: 0.5,
      fotos: [
        { suche: 'woman awake bed night', video: true },
        { suche: 'night city lights', video: true, wort: 'Schlaf' },
      ],
      studie: { titel: 'Drake et al. · 2013', zeile: '6 h vorher: über 1 h weniger Schlaf' },
    },
    // Irrtum
    {
      text: 'Und entwässert Kaffee? *Nein.* Vier Tassen am Tag wirkten in einer Studie genauso wie Wasser.',
      farbe: GRUEN,
      pause: 0.4,
      fotos: [
        { suche: 'pouring glass of water', video: true },
        { suche: 'coffee cups table friends', video: true, wort: 'Vier' },
      ],
      schlagzeile: { oben: 'Kaffee entwässert?', unten: 'Nein.', farbeUnten: GRUEN, wort: 'Nein' },
    },
    {
      text: 'Als unbedenklich gelten für Erwachsene bis zu *400 Milligramm* am Tag, also etwa vier Tassen Filterkaffee. In der Schwangerschaft nur die *Hälfte*.',
      farbe: GELB,
      fotos: [
        { suche: 'coffee beans roasting', video: true },
        { suche: 'pregnant woman belly', video: true, wort: 'Schwangerschaft' },
      ],
      bild: {
        typ: 'balken',
        max: 400,
        items: [
          { label: 'ERWACHSENE', wert: 400, anzeige: '400 mg', farbe: GELB, wort: '400' },
          { label: 'SCHWANGERSCHAFT', wert: 200, anzeige: '200 mg', farbe: ROT, wort: 'Hälfte' },
        ],
      },
    },
    {
      text: 'Für deinen Schlaf zählt also nicht nur, wie viel du trinkst. Sondern auch, *wann*.',
      farbe: GELB,
      pause: 0.8,
      fotos: [{ suche: 'coffee cup sunset', video: true }],
      schlagzeile: { oben: 'Nicht nur wie viel.', unten: 'Sondern wann.', farbeUnten: GELB, wort: 'wann' },
    },
  ],
};
