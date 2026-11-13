import type { Thema } from '../typen';

const GELB = '#FFC83D';
const ORANGE = '#FF8A4C';
const BLAU = '#5AA9FF';
const GRUEN = '#3EE08F';
const ROT = '#FF4D5E';

/**
 * TUERKISCHE FASSUNG von 01-vitamin-d (kuerzer, ~60 s).
 * Hook nach Recherche tuerkischer Top-Shorts: "Herkes yanlış biliyor" (alle irren sich),
 * Quelle dauerhaft im Bild (Vertrauen ohne Arzt-Gesicht).
 *
 * Zahlen:
 *  - Eigenbildung bis 80-90 %, 5-25 min, Speicher in Fett/Muskel, Sonne: keine
 *    Ueberdosis  -> BfR FAQ Vitamin D
 *  - Bedarf 15 µg/Tag (Erwachsene, "adequate intake") -> EFSA 2016
 *    (statt der deutschen 20 µg der DGE)
 *  - 15 µg = ~9 Eier (2,9 µg/100 g, ~58 g essbar), 59 g Salzhering (25,6 µg/100 g),
 *    357 g Raeucherlachs (4,2 µg/100 g) -> Gehalte BfR-Tabelle
 *  - Winter: bei ~42° N keine Vitamin-D-Bildung von November bis Februar
 *    (Webb, Kline, Holick 1988, J Clin Endocrinol Metab 67:373). Tuerkei liegt
 *    zwischen 36° und 42° N -> "çoğu yerinde" (in den meisten Gegenden)
 *  - Obergrenze 100 µg/Tag (tolerable upper intake level) -> EFSA
 */
export const thema: Thema = {
  id: '01-vitamin-d-tr',
  sprache: 'tr',
  titel: 'Güneş mi, yemek mi, hap mı? D vitaminini nereden alıyorsun? ☀️ #shorts',
  hook: 'D VİTAMİNİ|*YEMEKLE YETMEZ*',
  hookFarbe: GELB,
  quelleKurz: 'Kaynak: EFSA · BfR',
  musik: { datei: 'lofi-1.wav', lautstaerke: 0.13 },
  beschreibung:
    'Herkes yanlış biliyor: D vitamininin çoğu yemekten değil, güneşten gelir. ' +
    'Güneş, yemek ve hap karşılaştırması: miktar, kış ve risk.\n\n' +
    'Kaynaklar: EFSA (Avrupa Gıda Güvenliği Otoritesi), BfR (Alman Federal Risk Değerlendirme Enstitüsü), ' +
    'Webb ve ark. 1988.\nFotoğraflar: Pexels.\n' +
    'Genel bilgi amaçlıdır, tıbbi tavsiye değildir.\n\n' +
    '#shorts #dvitamini #sağlık #beslenme #mryfacts',
  tags: ['d vitamini', 'd vitamini eksikliği', 'd vitamini güneş', 'd vitamini takviyesi', 'sağlık', 'beslenme', 'vitamin'],
  quellen: [
    'https://www.bfr.bund.de/fragen-und-antworten/thema/ausgewaehlte-fragen-und-antworten-zu-vitamin-d/',
    'https://www.efsa.europa.eu/en/efsajournal/pub/4547',
    'https://doi.org/10.1210/jcem-67-2-373',
  ],

  szenen: [
    {
      fotos: [{ suche: 'woman face sunlight closed eyes' }, { suche: 'sun rays through clouds', wort: 'Güneş' }],
      studie: { titel: 'BfR · Almanya', zeile: 'Vücudun ürettiği pay: %80–90', wort: 'yüzde' },
      text: 'Herkes yanlış biliyor. Vücudun, D vitamininin *yüzde doksanına* kadarını kendisi üretiyor. *Güneş ışığıyla*.',
      farbe: GELB,
      bild: { typ: 'zaehler', von: 0, bis: 90, nach: '%', farbe: GELB, icon: 'sonne', unter: 'KENDİ ÜRETİMİN', wort: 'doksanına' },
    },
    {
      fotos: [{ suche: 'sunny beach summer', wort: 'Güneş' }, { suche: 'fried eggs breakfast table', wort: 'yemek' }, { suche: 'vitamin capsules hand', wort: 'hap' }],
      text: 'Peki en çok hangisi işe yarar? *Güneş*, *yemek* yoksa *hap*?',
      farben: { Güneş: GELB, yemek: ORANGE, hap: BLAU },
      pause: 0.6,
      bild: {
        typ: 'versus',
        items: [
          { icon: 'sonne', label: 'GÜNEŞ', farbe: GELB },
          { icon: 'essen', label: 'YEMEK', farbe: ORANGE },
          { icon: 'kapsel', label: 'HAP', farbe: BLAU },
        ],
      },
    },
    {
      fotos: [{ suche: 'woman arms sunlight park' }],
      studie: { titel: 'BfR · Almanya', zeile: 'Yüz, eller, kollar · 5–25 dk', wort: '5' },
      text: 'Haftada birkaç kez yüzün, ellerin ve kolların güneş görsün. *5 ila 25 dakika* yeterli.',
      farbe: GELB,
      bild: { typ: 'icon', icon: 'sonne', label: 'HAFTADA BİRKAÇ KEZ', chip: '5–25 DK', chipFarbe: GELB, chipWort: '5' },
    },
    {
      fotos: [{ suche: 'eggs in carton' , wort: '9' }, { suche: 'herring fish market', wort: '60' }, { suche: 'smoked salmon slices', wort: '360' }],
      studie: { titel: 'EFSA · 2016', zeile: 'Günlük yeterli alım: 15 µg', wort: '15' },
      text: 'Günde *15 mikrogram* için yaklaşık *9 yumurta* gerekir. Ya da *60 gram* tuzlu ringa. Füme somon? Tam *360 gram*.',
      farbe: ORANGE,
      pause: 0.7,
      bild: {
        typ: 'raster',
        gruppen: [
          { icon: 'ei', anzahl: 9, spalten: 3, label: '9 YUMURTA', farbe: ORANGE, wort: '9' },
          { icon: 'hering', anzahl: 1, spalten: 1, label: '60 g RİNGA', farbe: BLAU, wort: '60' },
          { icon: 'lachs', anzahl: 1, spalten: 1, label: '360 g SOMON', farbe: ROT, wort: '360' },
        ],
      },
    },
    {
      fotos: [{ suche: 'winter city grey sky snow' }],
      studie: { titel: 'Webb ve ark. · 1988', zeile: '42° kuzey: Kasım–Şubat üretim yok', wort: 'Kasımdan' },
      text: 'Ya kışın? *Kasımdan şubata* güneş, Türkiye’nin çoğu yerinde D vitamini için *çok zayıf*.',
      farbe: BLAU,
      bild: {
        typ: 'monate',
        aus: [10, 11, 0, 1],
        wort: 'Kasımdan',
        namen: ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'],
      },
    },
    {
      fotos: [{ suche: 'athlete muscles back dark' }],
      studie: { titel: 'BfR · Almanya', zeile: 'Depo: yağ ve kas dokusu', wort: 'yağ' },
      text: 'Ama deposu hemen boşalmaz. Vücut D vitaminini *yağ ve kas dokusunda* saklar.',
      farbe: GRUEN,
      bild: { typ: 'speicher', titel: 'D VİTAMİNİ DEPOSU', label: 'YAĞ & KAS', farbe: GRUEN },
    },
    {
      fotos: [{ suche: 'man enjoying sun summer' }],
      text: 'Güneşten D vitamini *zehirlenmesi olmaz*.',
      farbe: GRUEN,
      pause: 0.7,
      bild: { typ: 'icon', icon: 'sonne' },
      stempel: { text: 'AŞIRI DOZ YOK', farbe: GRUEN, wort: 'zehirlenmesi' },
    },
    {
      fotos: [{ suche: 'pills bottle spilled table' }],
      studie: { titel: 'EFSA · 2023', zeile: 'Üst sınır: günde 100 µg', wort: '100' },
      text: 'Haptan olur. Uzun süre günde *100 mikrogramın üstü* risklidir.',
      farbe: ROT,
      pause: 0.7,
      bild: { typ: 'zaehler', von: 0, bis: 100, nach: ' µg', farbe: ROT, icon: 'dose', unter: 'GÜNDE · UZUN SÜRE', wort: '100' },
      stempel: { text: 'RİSK', farbe: ROT, wort: 'risklidir', y: 450 },
    },
    {
      runde: 'SONUÇ',
      fotos: [{ suche: 'golden hour field sunshine' }],
      text: 'Sonuç: Yazın açık ara kazanan *güneş*. Sadece yemekle yetmez.',
      farbe: GELB,
      pause: 0.9,
      bild: {
        typ: 'podest',
        plaetze: [
          { icon: 'sonne', label: 'GÜNEŞ', farbe: GELB, rang: 1, notiz: 'YAZIN' },
          { icon: 'kapsel', label: 'HAP', farbe: BLAU, rang: 2 },
          { icon: 'essen', label: 'YEMEK', farbe: ORANGE, rang: 3 },
        ],
      },
    },
    {
      runde: 'SONUÇ',
      fotos: [{ suche: 'blood sample tube laboratory' }],
      text: 'Kışın eksiğin var mı? Bunu sadece *kan tahlili* söyler.',
      farbe: ROT,
      pause: 0.7,
      bild: { typ: 'icon', icon: 'blut', chip: 'KAN TAHLİLİ', chipFarbe: ROT, chipWort: 'kan' },
    },
  ],
};
