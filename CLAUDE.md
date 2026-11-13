# health-shorts — animierte Gesundheits-Shorts aus Code

9:16-Videos (1080×1920, 30 fps) zu Vitaminen, Mineralien, Nahrungsergänzung,
Fitness. Vorbild für Format und Tempo: YouTube-Kanal **@faktenlupe** (Analyse unten).
Alles wird mit **Remotion** aus Code gebaut — kein Schnittprogramm.

**Sprache im Chat: Deutsch.** Videos auf Deutsch und **Türkisch** (`sprache: 'tr'` im
Thema → Windows-Stimme „Tolga“; Datei-Endung `-tr`, z. B. `01-vitamin-d-tr.ts`).
Türkische Fassungen: eigene Zahlen für die Türkei prüfen (EFSA statt DGE, Wintermonate
Nov–Feb statt Okt–März), Quelle sichtbar im Bild (`quelleKurz`), Hook-Formeln aus
`recherche-tuerkei/AUSWERTUNG.md`. Thema-Felder: `hook` (Titel im ersten Bild).

Eigenständiges Projekt. Die Maschinerie stammt aus `../yeni fizik/` (Remotion,
Vertonung pro Szene, Auto-Timing) — dort nichts ändern, nichts teilen.

---

## Ablauf

```bash
node scripts/fotos.mjs 01-vitamin-d-tr          # Pexels-Fotos je Szene -> public/fotos/<id>/
node scripts/musik.mjs                          # Lo-Fi-Musik erzeugen (einmalig) -> public/musik/
npm run sprechen 01-vitamin-d-tr -- --piper     # Piper-Stimme (Standard fuer Tests)
npm run sprechen 01-vitamin-d     # Windows-Stimme + Wort-Zeitstempel  -> public/ton/<id>/
npm run render 01-vitamin-d       # MP4                         -> ausgabe/<id>.mp4
node scripts/standbilder.mjs 01-vitamin-d   # Kontrollbilder je Szene (schnell)
```

`npm run vorschau` öffnet Remotion Studio (live, jede Änderung sofort sichtbar).
`npm run render <id> -- --schnell` = halbe Auflösung zum Prüfen.

**Neues Thema:** `src/themen/02-xyz.ts` anlegen (01 als Vorlage), in `src/Root.tsx`
importieren und in `THEMEN` eintragen. Themendateien dürfen **nur Typen importieren**
(Farben als Konstanten in der Datei) — `sprechen.mjs` liest sie ohne Bundler.

---

## Stimmen

| Schalter | Motor | Qualität | Kosten |
|---|---|---|---|
| `--piper` | Piper lokal (`werkzeug/`), Satzzeichen bleiben drin → flüssig | gut, Neuralstimme | gratis |
| *(keiner)* | Windows „Stefan“ (männlich, offline) | hörbar Computer, **Nutzer: zu unnatürlich** | gratis |
| `--eleven` | ElevenLabs | natürlich, für den Kanal | Key in `.env` |
| `--edge` | Microsoft Edge TTS | gut | gratis, **zurzeit 403** |

- `.env`: `ELEVENLABS_API_KEY=…` und `ELEVENLABS_VOICE_ID=…`. Key nie in den Chat.
- Edge-TTS liefert 403, weil die installierte `edge-tts` (7.2.8) veraltet ist.
  Update scheitert, weil **pip kaputt ist** (`pip._vendor.rich._emoji_codes` fehlt).
  Reparatur: `py -m ensurepip --upgrade`, dann `py -m pip install -U edge-tts`.
- AVG prüft HTTPS mit eigenem Zertifikat → `tts.py` lädt es aus `NODE_EXTRA_CA_CERTS`.
- Cache: unveränderte Sätze werden nicht neu vertont (`--neu` erzwingt alles).
  Audiodateien tragen einen Hash im Namen (`szene-05-aabe2add.wav`) — alte Dateien
  ließen sich nicht überschreiben (Zugriff verweigert). Veraltete von Hand löschen.
- **Satzzeichen bekommt die Stimme nicht** (Nutzer mochte die Betonung an Punkt,
  Komma, Strich nicht). Satzenden werden zu einer kurzen Atempause (`atempause`).
  Zahlenbereiche deshalb ausschreiben: „2 bis 4“, nicht „2–4“.
- Windows-Stimme läuft über SSML: Grundton leicht höher, `*Schlüsselwörter*`
  höher/lauter/langsamer (`AYAR.windows` in `sprechen.mjs`). Mehr Emotion geht
  nur mit ElevenLabs.
- Gewünscht: **männliche Stimme, mit Emotion, flüssig und menschlich**. Windows-Stimme mit
  SSML-Betonung wurde als abgehackt abgelehnt (07.11.2026). Plan: Piper testen, sonst Edge.
- Piper liefert **keine Wort-Zeitstempel** → `scripts/piper.mjs` spricht jedes Wort einzeln
  (Längen als Gewicht), erkennt Pausen im Satz und rastet Komma/Satzgrenzen darauf ein.
- Piper-Stimmen: Türkisch gibt es nur `tr_TR-dfki-medium` — Lizenz **CC BY-NC-SA
  (nicht kommerziell)**. Für einen monetarisierten Kanal ersetzen. Deutsch: `thorsten-high`
  (CC0) liegt in `werkzeug/stimmen/` — **Nutzer: Stimme perfekt** (12.11.2026).
- **Aussprache-Wörterbuch** `scripts/aussprache.mjs`: Piper spricht Fremdwörter falsch
  („Eschpresso“, „Koff-ein“, „Blu-test“). Ersatzschreibweisen gelten nur für die Stimme,
  Untertitel bleiben korrekt. **Bei jedem neuen Thema** vor dem Vertonen prüfen:
  `node scripts/aussprache-check.mjs <id>` (Lautschrift aller Wörter, * = ersetzt).
- **Whisper** (`scripts/whisper.mjs`, seit 13.11.2026): hört jede Piper-Szene lokal ab
  (whisper.cpp 1.5.5 + Modell `small`, nur CPU, in `werkzeug/whisper.cpp`) → **exakte
  Wortzeiten** für die Karaoke-Untertitel statt Schätzung, plus **Hörcheck**
  (`public/ton/<id>/hoercheck.txt`: Wörter, die Whisper anders verstand). Whisper
  „korrigiert“ manchmal still – der Check findet grobe Fehler, nicht alle. Schlägt
  Whisper fehl, bleibt die Schätzung aus `piper.mjs`. Abschalten: `AYAR.piper.whisper`.
- Skill **`/health-short <Thema>`** (`~/.claude/skills/health-short/`) fasst den ganzen
  Ablauf zusammen: Recherche → Text → Aussprache → Ton → Clips → Standbilder → Render.
- **Sprechtext rhetorisch schreiben** (Nutzer-Wunsch 13.11.2026): Überleitungen („Klingt
  komisch?“, „Das Problem:“, „Und …?“), Kommas als Atempausen, Vergleich statt nackter Zahl
  („400 mg, also etwa vier Tassen“). Keine abgehackten Stichworte wie „Filterkaffee: 90.“

---

## Szenen-Format (`src/typen.ts`)

Jede Szene = ein gesprochener Satz + eine Grafik. Länge kommt aus der Aufnahme.

- `*Wort*` im Text → Wort im Untertitel farbig (`farbe` der Szene)
- `farben: { Sonne: '#FFC83D' }` → einzelne Wörter in eigener Farbe
- `runde: '…'` → Etikett oben; **Wechsel = Wisch-Übergang + Whoosh**.
  Runden („RUNDE 1 · …“) wollte der Nutzer **nicht** — nur noch „DAS ERGEBNIS“ am Ende.
- `stempel: { text, farbe, wort, y? }` → knallt beim Wort auf die Grafik, Bild wackelt
- Felder `wort` / `chipWort` koppeln eine Animation an den Moment, in dem das Wort fällt

Grafik-Typen (`bild.typ`): `zaehler`, `versus`, `icon`, `balken`, `raster`,
`monate`, `speicher`, `podest`. Icons in `src/icons.tsx` (flache SVGs, 200×200).

## Optik (seit 08.11.2026: Fotos statt leerer Fläche)

Nutzer fand die reinen Icon-Animationen zu karg. Jetzt pro Szene:
- `fotos: [{ suche, wort? }]` → Pexels-Foto formatfüllend mit Ken-Burns-Zoom; mehrere
  Fotos wechseln beim gesprochenen `wort` (mit Zoom-Stoß). Dunkler Verlauf unten für Untertitel.
- `studie: { titel, zeile, wort }` → Quellen-Karte fährt oben ein (im Hook-Bild unten)
- Partikel, Einstieg mit Zoom aus der Unschärfe, Karaoke-Untertitel (aktives Wort mit Box)
- `musik` im Thema → selbst erzeugte Lo-Fi-Musik (`scripts/musik.mjs`, lizenzfrei), ~0.13
- Falls das nicht reicht: nächster Schritt **3D-Look** (Wunsch des Nutzers)

### Stil „großer Gesundheits-YouTuber“ (seit 12.11.2026, Vorlage `01-vitamin-d-neu.ts`)

Analyse in `recherche-exiledmedic/AUSWERTUNG.md`. Bausteine:
- `fotos: [{ suche, video: true, wort }]` → **Pexels-Videoclips** (hochkant, ~1080 breit),
  Schnitt beim gesprochenen Wort
- `schlagzeile: { oben, unten, farbeUnten?, wort? }` → riesige Anton-Schrift, oben weiß,
  unten rot, schwarze Kontur, knallt mit Wackeln + Gum-Sound. **Ohne `bild`** = groß in der
  Mitte (Hook, Pointen), mit `bild` klein oben
- `bild` ist optional; Szenen abwechselnd Grafik / Schlagzeile
- Deutsche Piper-Stimme `de_DE-thorsten-high` (CC0, kommerziell frei), Tempo je Sprache
  in `AYAR.piper.tempo`. `length_scale` wirkt bei Piper nur schwach und etwas zufällig
- Nächster Schritt: **eigene KI-Person „Kaan“** (Prompts in der Analyse) als Sprech-Clip
  einbauen, sobald Higgsfield/Flow-Zugang da ist. Realistische KI-Person bei YouTube als
  synthetisch kennzeichnen, kein „Dr.“, Inhalte belegt

### Reichweite (seit 13.11.2026, Recherche: `recherche-reichweite/AUSWERTUNG.md`)

- **Zwei Fassungen pro Thema:** `kurzfassung: [Szenen-Nr. ab 1]` erzeugt zusätzlich die
  Komposition `<id>-kurz` aus denselben Aufnahmen/Clips. Lang (60–100 s) → TikTok
  (Creator Rewards erst ab 1 Minute), kurz (35–55 s) → YouTube Shorts (Durchsehrate).
  Rendern: `node scripts/render.mjs <id>-kurz`.
- **`node scripts/texte.mjs <id>`** → `ausgabe/<id>-veroeffentlichen.txt` (Titel,
  Beschreibung, Tags, Hashtags je Plattform + Checkliste) und Titelbilder `<id>-cover.png`.
- **Sichere Zone:** Untertitel bei y = 1250, 130 px Seitenabstand (rechts liegen die
  Like-/Kommentar-Buttons, unten Beschreibung/Musik).
- Render-Abbruch beim Ton-Mischen (Ordner im Windows-Temp verschwand) behoben:
  `render.mjs` nutzt `ausgabe/.temp`.

### Ruhiger Look (seit 12.11.2026, Vorlage `02-koffein.ts`)

Feedback zu `01-vitamin-d-neu`: Stimme, Clips und Animationen gut, aber **zu viele Effekte
auf einmal**. Darum `ruhig: true` im Thema:
- keine Partikel, kein Farbschein, kein Wackeln, kein Unschärfe-Einstieg, Grafik nicht vergrößert
- Schlagzeile zoomt sanft rein statt zu knallen, Studien-Karte blendet ein, leisere Sounds
- Redaktionsregel: **höchstens ein Element pro Szene** (Grafik ODER Schlagzeile ODER
  Studien-Karte), manche Szenen nur Clip + Untertitel. Mehrere Clips pro Szene sind erwünscht
- Schlagzeilen passen ihre Größe jetzt je Zeile an (lange Zeilen brechen nicht mehr um)

## Layout

- Logo oben links, Runden-Etikett y≈190, Grafik um y≈760, Untertitel ab y=1300
- Unter y≈1500 und rechts ab x≈950 legt YouTube Titel/Buttons drüber → frei lassen
- Farben/Schrift nur in `src/tema.ts` (Nunito 900, dunkler Navy-Grund)

---

## Analyse @faktenlupe (Stand 05.11.2026)

- Kanal seit 25.10.2026, 32 Shorts in 11 Tagen (≈3/Tag), 101 Abos
- Top: „Zigarette vs. Vape vs. Snus: Was ist am schlimmsten?“ 37.600 Aufrufe (72 s);
  Rest meist 1.000–7.000
- **Erfolgsformat:** „X vs. Y vs. Z: Was ist am schlimmsten?“ → 3 Runden mit Etikett
  („RUNDE 1 · DIE LUNGE“), Zähler, Stempel („UNENTSCHIEDEN“, „VERKAUF VERBOTEN“),
  Siegerpodest mit Strahlen, „Der Haken“ als Wendung am Ende
- Zweiter Stil: Daten-Visualisierung (Karten, Größenvergleiche, Zähler), lime-grün auf dunkel
- Dritter Stil: Cartoon-Figuren (Geschichten) — aufwendiger, nicht übernommen
- Untertitel Wort für Wort, Schlüsselwörter farbig; KI-Stimme; 45–85 s
- Beschreibung: 2 Sätze + Frage („Was hättest du getippt? 👇“) + 4–5 Hashtags

## Regeln für Inhalte

- Zahlen nur aus belastbaren Quellen (BfR, DGE, RKI, EFSA), Quelle in `quellen` eintragen
- Keine Heilversprechen, keine Dosierempfehlungen; Beschreibung endet mit
  „Allgemeine Information, keine medizinische Beratung.“
- Verbreitete Irrtümer als Wendung nutzen (Räucherlachs ist kein guter Vitamin-D-Lieferant)
