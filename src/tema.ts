import { loadFont } from '@remotion/google-fonts/Nunito';

/**
 * DESIGN-SYSTEM
 *
 * Dunkler Grund, flache Vektor-Icons, eine Farbe pro "Kandidat".
 * Willst du den Look aendern: nur hier.
 */
const { fontFamily } = loadFont('normal', {
  weights: ['800', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const T = {
  breite: 1080,
  hoehe: 1920,
  fps: 30,

  font: fontFamily,
  marke: 'MRYFACTS',

  // Grund
  bgInnen: '#1A2433',
  bgAussen: '#080C13',
  karte: '#151E2B',
  linie: '#2A3647',

  // Text
  weiss: '#FFFFFF',
  grau: '#8B97A8',

  // Kandidaten / Akzente
  gelb: '#FFC83D',
  orange: '#FF8A4C',
  blau: '#5AA9FF',
  gruen: '#3EE08F',
  rot: '#FF4D5E',
  pink: '#FF7EB3',
  lila: '#A78BFA',

  // Layout (YouTube legt unten Titel/Kanal und rechts Buttons darueber)
  bildMitte: 760, // vertikale Mitte der Grafik
  untertitelY: 1250, // Oberkante Untertitel (TikTok/Shorts: unteres Viertel ist von Beschreibung + Buttons verdeckt)
  rand: 80,

  pauseNachSzene: 0.4, // Sekunden Luft zwischen Szenen (Grafik wirkt nach, < 0,5 s = kein Leerlauf)
} as const;

export const sek = (s: number) => Math.round(s * T.fps);
