/**
 * THEMEN-FORMAT
 *
 * Ein Short = Liste von Szenen. Jede Szene hat einen gesprochenen Satz (`text`)
 * und eine Grafik (`bild`). Die Laenge ergibt sich aus der Sprachaufnahme.
 *
 * Im Text:  *Wort*  = Schluesselwort, wird im Untertitel farbig.
 * Felder namens `wort` verknuepfen eine Animation mit dem Moment, in dem
 * dieses Wort gesprochen wird (z. B. Kandidat erscheint bei "Tablette").
 */

export type IconName =
  | 'sonne'
  | 'essen'
  | 'kapsel'
  | 'dose'
  | 'ei'
  | 'hering'
  | 'lachs'
  | 'blut';

export type Bild =
  | {
      typ: 'zaehler';
      von: number;
      bis: number;
      nach?: string;
      farbe: string;
      icon?: IconName;
      unter?: string;
      /** Zaehlen startet, wenn dieses Wort faellt */
      wort?: string;
    }
  | {
      typ: 'versus';
      items: { icon: IconName; label: string; farbe: string; wort?: string }[];
    }
  | {
      typ: 'icon';
      icon: IconName;
      label?: string;
      chip?: string;
      chipFarbe?: string;
      chipWort?: string;
    }
  | {
      typ: 'balken';
      max: number;
      items: { label: string; wert: number; anzeige: string; farbe: string; wort?: string }[];
    }
  | {
      typ: 'raster';
      gruppen: {
        icon: IconName;
        anzahl: number;
        spalten: number;
        label: string;
        farbe: string;
        wort?: string;
      }[];
    }
  | { typ: 'monate'; aus: number[]; wort?: string; /** 12 Monatskuerzel, Standard Deutsch */ namen?: string[] }
  | { typ: 'speicher'; label: string; farbe: string; /** Ueberschrift, Standard "VITAMIN-D-SPEICHER" */ titel?: string }
  | {
      typ: 'podest';
      plaetze: { icon: IconName; label: string; farbe: string; rang: 1 | 2 | 3; notiz?: string }[];
    };

export type Szene = {
  /** Gesprochen + Untertitel. *Wort* = farbig */
  text: string;
  /** Grafik. Darf fehlen, wenn die Szene nur Clip + Schlagzeile zeigt */
  bild?: Bild;
  /** Riesige 2-Zeilen-Schlagzeile: oben weiss, unten rot. Ohne bild gross in der Mitte */
  schlagzeile?: { oben: string; unten?: string; farbeOben?: string; farbeUnten?: string; wort?: string };
  /** Etikett oben ("RUNDE 1 · DIE MENGE"). Wechsel = Wisch-Uebergang */
  runde?: string;
  /** Farbe fuer *markierte* Woerter */
  farbe?: string;
  /** Einzelne Woerter in eigener Farbe: { Sonne: '#FFC83D' } */
  farben?: Record<string, string>;
  /** Stempel, der beim Wort `wort` auf die Grafik knallt */
  stempel?: { text: string; farbe: string; wort?: string; /** Hoehe in px, Standard 820 */ y?: number };
  /** Extra-Pause nach dem Satz (Sekunden) */
  pause?: number;
  /** Hintergrundfotos (Pexels, englische Suchbegriffe). Mehrere = Wechsel beim Wort `wort` */
  fotos?: {
    suche: string;
    wort?: string;
    /** true = Pexels-Videoclip statt Foto */
    video?: boolean;
    /** Fester Pexels-Clip (ID aus der Vorschau), statt erster Suchtreffer */
    pexelsId?: number;
  }[];
  /** Studien-Karte: Quelle sichtbar im Bild, faehrt beim Wort `wort` ein */
  studie?: { titel: string; zeile?: string; wort?: string };
};

/** public/fotos/<id>/fotos.json - Schluessel "szene-foto" (0-basiert) */
export type Fotos = Record<string, { datei: string; fotograf: string }>;

export type Thema = {
  id: string;
  titel: string;
  /** Grosser Titel in der ersten Szene (Hook ohne Ton). | = Zeilenumbruch, *Wort* = Akzent */
  hook?: string;
  hookFarbe?: string;
  /** Sprache von Stimme + Text. Standard 'de' */
  sprache?: 'de' | 'tr';
  /** Kurze Quellenangabe, dauerhaft klein unter dem Logo (schafft Vertrauen) */
  quelleKurz?: string;
  /** Hintergrundmusik aus public/musik/ (selbst erzeugt, lizenzfrei) */
  musik?: { datei: string; lautstaerke: number };
  /** Ruhiger Look: keine Partikel, kein Wackeln, kein Unschaerfe-Einstieg, sanfte Schlagzeilen/Karten */
  ruhig?: boolean;
  /**
   * Kurzfassung fuer YouTube Shorts (Szenen-Nummern ab 1). Erzeugt zusaetzlich die
   * Komposition "<id>-kurz" aus denselben Aufnahmen. Lange Fassung (>60 s) = TikTok
   * (Creator Rewards nur ab 1 Minute), kurze (~35-55 s) = YouTube Shorts (Durchsehrate).
   */
  kurzfassung?: number[];
  beschreibung: string;
  tags: string[];
  quellen: string[];
  szenen: Szene[];
};

export type Zeiten = {
  szenen: { datei: string; dauer: number; woerter: { pos: number; start: number }[] }[];
};
