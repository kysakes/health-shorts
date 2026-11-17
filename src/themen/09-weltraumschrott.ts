import type { Thema } from '../typen';

const BLAU = '#5AA9FF';
const GELB = '#FFC83D';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';
const LILA = '#B98CFF';

/**
 * WELTRAUMSCHROTT (17.11.2026), ruhiger Look, Ziel ~2 min + Kurzfassung.
 * Quellen:
 *  - ESA DISCOS Environment Statistics, Stand 13.11.2026: ~47 270 regelmaessig verfolgte
 *    Objekte; ~15 800 funktionierende Satelliten; >660 Fragmentationen; 4 bestaetigte
 *    Kollisionen; MASTER-8 (02/2026): 68 450 Objekte >10 cm, 1,5 Mio. 1-10 cm, 230 Mio. 1 mm-1 cm
 *  - ESA Space Environment Report 2026 (14.09.2026, Daten bis Ende 2025): >300 Starts 2025,
 *    >4000 neue Nutzlasten; >3 intakte Objekte treten taeglich wieder ein; "Even if no new
 *    satellites were launched, the debris population would continue to increase"
 *  - ESA "About space debris": Iridium-33/Kosmos-2251 am 10.02.2009 mit 11,7 km/s; Kessler-Syndrom;
 *    oberhalb 800 km bleiben Objekte "for many decades"
 *  - ESA 2016: 7-mm-Einschlag im Cupola-Fenster der ISS, vermutlich Farbsplitter/Metallteilchen
 *  - Fengyun-1C-ASAT-Test China 2007: >3000 katalogisierte Truemmer; Russland Kosmos 1408 (2021)
 *  - Long March 5B, Mai 2020: Truemmer in Doerfern der Elfenbeinkueste, keine Verletzten
 *  - Point Nemo: >260 versenkte Raumfahrzeuge; ISS-Absturz um 2030 mit SpaceX-Deorbit-Fahrzeug (NASA 2024)
 *  - Starlink: >10 000 Satelliten (Okt. 2026), Entsorgung binnen 5 Jahren, 1-2 Wiedereintritte/Tag
 *  - Ferreira et al. 2024, Geophys. Res. Lett.: Aluminiumoxid aus verglühenden Satelliten,
 *    moegliche Ozon-Wirkung (noch Forschungsgegenstand)
 *  - Astroscale ADRAS-J: 2024 bis auf 15 m an H-IIA-Oberstufe; ADRAS-J2 (Einfangen) geplant 2027
 */
export const thema: Thema = {
  id: '09-weltraumschrott',
  titel: 'Weltraumschrott: Wo landet der Müll im All? 🛰️ #shorts',
  quelleKurz: 'Quellen: ESA · NASA · Studien',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.11 },
  ruhig: true,
  kurzfassung: [1, 2, 5, 7, 10, 11, 12, 17],
  beschreibung:
    'Jeden Tag starten Raketen. SpaceX, China, die USA: Über 4000 neue Satelliten kamen allein 2025 dazu. ' +
    'Aber was passiert mit dem Schrott im All? Wie viel kreist da oben, was verglüht, was fällt runter, ' +
    'und warum wächst der Müll laut ESA sogar ohne neue Starts weiter?\n\n' +
    'Quellen: ESA Space Environment Report 2026, ESA DISCOS-Statistik (Stand 13.11.2026), ESA Space Debris Office, ' +
    'NASA, Ferreira et al. 2024 (Geophysical Research Letters), Astroscale.\n' +
    'Videos: Pexels.\n\n' +
    '#shorts #weltraumschrott #spacex #weltall #mryfacts',
  tags: ['weltraumschrott', 'space debris', 'weltraummüll', 'starlink', 'spacex', 'satelliten', 'kessler syndrom', 'esa'],
  quellen: [
    'https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2026',
    'https://sdup.esoc.esa.int/discosweb/statistics/',
    'https://www.esa.int/Space_Safety/Space_Debris/About_space_debris',
    'https://doi.org/10.1029/2024GL109280',
    'https://www.astroscale.com/news/astroscales-adras-j-mission-completes-operations-begins-deorbit',
  ],

  szenen: [
    // 1 HOOK
    {
      text: 'Jeden Tag starten Raketen ins All. Aber wo bleibt eigentlich der ganze *Müll* da oben?',
      farbe: BLAU,
      pause: 0.3,
      fotos: [
        { suche: 'rocket launch crowd', video: true, pexelsId: 29170339 },
        { suche: 'earth from space orbit', video: true, wort: 'Müll' },
      ],
      schlagzeile: { oben: 'Weltraumschrott:', unten: 'Wo landet er?' },
    },
    // 2 Zahl
    {
      text: 'Die ESA verfolgt rund *47.000* Objekte im Orbit. Nur etwa 15.800 davon sind funktionierende Satelliten.',
      farbe: BLAU,
      fotos: [
        { suche: 'radar dish antenna', video: true },
        { suche: 'satellite orbit earth', video: true, wort: 'Satelliten' },
      ],
      bild: { typ: 'zaehler', von: 0, bis: 47000, farbe: BLAU, unter: 'OBJEKTE IM ORBIT', wort: '47.000' },
    },
    // 3 Herkunft
    {
      text: 'Der Rest ist Schrott: tote Satelliten, alte Raketenstufen und Trümmer von über *660* Explosionen.',
      farbe: GELB,
      fotos: [
        { suche: 'scrap metal pile', video: true },
        { suche: 'rocket stage separation', video: true, wort: 'Raketenstufen' },
      ],
    },
    // 4 klein
    {
      text: 'Dazu kommen rund *anderthalb Millionen* kleinere Teile, zu klein zum Verfolgen.',
      farbe: GELB,
      fotos: [{ suche: 'stars night sky timelapse', video: true }],
      studie: { titel: 'ESA · Stand 2026', zeile: '1,5 Mio. Teile von 1 bis 10 cm', wort: 'Millionen' },
    },
    // 5 Tempo
    {
      text: 'Klingt harmlos? Da oben fliegt alles mit rund *28.000* Kilometern pro Stunde. Schon ein Farbsplitter schlug einen Krater ins Fenster der ISS.',
      farbe: ROT,
      fotos: [
        { suche: 'international space station orbit', video: true },
        { suche: 'cracked glass close up', video: true, wort: 'Farbsplitter' },
      ],
      bild: { typ: 'zaehler', von: 0, bis: 28000, nach: ' km/h', farbe: ROT, unter: 'TEMPO IM ORBIT', wort: '28.000' },
    },
    // 6 Kollision 2009 + Abschuss-Tests
    {
      text: 'Dazu kommen Waffentests: China schoss 2007 einen eigenen Satelliten ab und erzeugte damit über *3000* Trümmer.',
      farbe: ROT,
      fotos: [
        { suche: 'radar screen', video: true },
        { suche: 'debris floating dark', video: true, wort: 'Trümmer' },
      ],
    },
    // 7 Kessler
    {
      text: 'Forscher warnen vor einer *Kettenreaktion*: Trümmer treffen Satelliten und machen daraus neue Trümmer.',
      farbe: LILA,
      fotos: [{ suche: 'dominoes falling', video: true }],
      schlagzeile: { oben: 'Kessler-Effekt:', unten: 'Kettenreaktion', wort: 'Kettenreaktion' },
    },
    // 9 ESA-Zitat
    {
      text: 'Laut ESA würde der Schrott sogar weiter wachsen, wenn ab heute *keine einzige* Rakete mehr starten würde.',
      farbe: LILA,
      fotos: [{ suche: 'earth at night from space', video: true }],
      studie: { titel: 'ESA-Bericht · 2026', zeile: 'Schrott wächst auch ohne neue Starts', wort: 'ESA' },
    },
    // 10 Boom
    {
      text: 'Und es wird voller: 2025 kamen über 4000 Satelliten dazu. Allein SpaceX stellt mit Starlink *zwei von drei* aktiven.',
      farbe: GRUEN,
      fotos: [
        { suche: 'rocket trail night', video: true, pexelsId: 34767731 },
        { suche: 'satellites night sky train', video: true, wort: 'Starlink' },
      ],
      bild: {
        typ: 'balken',
        max: 10500,
        items: [
          { label: 'STARLINK', wert: 10000, anzeige: '≈ 10.000', farbe: GRUEN, wort: 'Starlink' },
          { label: 'ALLE ANDEREN', wert: 5800, anzeige: '≈ 5.800', farbe: BLAU, wort: 'zwei' },
        ],
      },
    },
    // 11 Antwort: Bremsen
    {
      text: 'Was passiert also mit dem Müll? Weiter unten bremst die dünne Luft alles ab. Mehr als *drei* große Objekte stürzen täglich zurück.',
      farbe: BLAU,
      fotos: [
        { suche: 'earth atmosphere from space', video: true },
        { suche: 'meteor shooting star', video: true, wort: 'stürzen' },
      ],
    },
    // 12 Verglühen
    {
      text: 'Die meisten davon *verglühen* in der Atmosphäre, wie eine Sternschnuppe.',
      farbe: GELB,
      fotos: [{ suche: 'meteor shower night sky', video: true }],
    },
    // 13 Nicht alles verbrennt
    {
      text: 'Aber nicht alles verbrennt. 2020 fielen Trümmer einer chinesischen Rakete auf Dörfer an der *Elfenbeinküste*. Verletzt wurde zum Glück niemand.',
      farbe: ROT,
      pause: 0.3,
      fotos: [
        { suche: 'african village', video: true },
        { suche: 'metal debris ground', video: true, wort: 'Elfenbeinküste' },
      ],
    },
    // 14 Point Nemo
    {
      text: 'Große Raumschiffe steuert man deshalb gezielt zum *Point Nemo* im Pazifik. Um 2030 soll dort auch die ISS versinken.',
      farbe: BLAU,
      fotos: [
        { suche: 'pacific ocean aerial', video: true },
        { suche: 'astronaut space station', video: true, wort: 'ISS' },
      ],
    },
    // 15 Weiter oben
    {
      text: 'Weiter oben bremst kaum etwas. Dort kreist Schrott *Jahrzehnte* bis Jahrhunderte.',
      farbe: LILA,
      fotos: [{ suche: 'satellite orbiting earth', video: true }],
    },
    // 16 Ozon
    {
      text: 'Und auch Verglühen hat einen Preis: Dabei entsteht Aluminiumoxid. Ob das der *Ozonschicht* schadet, wird gerade erforscht.',
      farbe: GELB,
      fotos: [
        { suche: 'upper atmosphere sky', video: true },
        { suche: 'scientist laboratory research', video: true, wort: 'Ozonschicht' },
      ],
      studie: { titel: 'Geophys. Res. Lett. · 2024', zeile: 'Aluminiumoxid in der Atmosphäre', wort: 'Aluminiumoxid' },
    },
    // 17 Aufraeumen
    {
      text: 'Und aufräumen? Ein japanischer Satellit kam schon bis auf *15 Meter* an eine alte Raketenstufe heran. Einfangen soll sie erst die nächste Mission.',
      farbe: GRUEN,
      fotos: [
        { suche: 'robotic arm space', video: true },
        { suche: 'satellite close up', video: true, wort: 'Raketenstufe' },
      ],
    },
    // 18 Schluss
    {
      text: 'Der Müll im All verschwindet also nicht einfach. Er verglüht, landet im Meer, oder kreist noch *Jahrhunderte* über uns.',
      farbe: BLAU,
      pause: 0.9,
      fotos: [{ suche: 'earth above clouds', video: true, pexelsId: 35236416 }],
      schlagzeile: { oben: 'Verglüht. Versenkt.', unten: 'Oder bleibt oben.', farbeUnten: BLAU, wort: 'Jahrhunderte' },
    },
  ],
};
