# health-shorts · @mryfacts

Animierte Gesundheits-Shorts (9:16, 1080×1920) für YouTube Shorts, TikTok und
Instagram Reels – komplett aus Code mit [Remotion](https://www.remotion.dev).
Belegte Fakten (EFSA, BfR, DGE, Studien), lokale Neuralstimme, Pexels-Videoclips,
Karaoke-Untertitel, selbst erzeugte Musik.

## Ablauf

```bash
node scripts/aussprache-check.mjs 03-opc   # Lautschrift aller Wörter prüfen
node scripts/sprechen.mjs 03-opc --piper   # Stimme (Piper) + Wortzeiten (Whisper) + Hörcheck
node scripts/fotos.mjs 03-opc              # Pexels-Clips laden und optimieren
node scripts/standbilder.mjs 03-opc        # Kontrollbilder
node scripts/render.mjs 03-opc             # lange Fassung (TikTok, ≥ 60 s)
node scripts/render.mjs 03-opc-kurz        # Kurzfassung (YouTube Shorts)
node scripts/texte.mjs 03-opc              # Texte je Plattform + Titelbilder
```

Ein Thema = eine Datei in `src/themen/` (Vorlage: `03-opc.ts`), eingetragen in
`src/Root.tsx`. Ausführliche Regeln und Erfahrungen: [`CLAUDE.md`](CLAUDE.md).

## Einrichtung

- Node.js, dann `npm install`
- `PEXELS_API_KEY` als Benutzer-Umgebungsvariable (`setx PEXELS_API_KEY …`)
- `werkzeug/` (nicht im Repo):
  - Piper Windows-Release + Stimme `de_DE-thorsten-high` (CC0) aus
    [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices)
  - whisper.cpp 1.5.5 + Modell `small` – installiert sich beim ersten
    `sprechen.mjs` selbst
- `node scripts/musik.mjs` erzeugt die Hintergrundmusik

## Nicht im Repo

Pexels-Clips (Lizenz erlaubt keine Weitergabe der Rohdateien), Sprachaufnahmen,
Musik-WAVs und gerenderte Videos werden per Script erzeugt. Screenshots aus der
Kanal-Recherche bleiben lokal.

## Lizenzen

- Stimme Thorsten: CC0 · Pexels-Clips: Pexels-Lizenz · Schrift Anton: OFL
- Türkische Piper-Stimme `tr_TR-dfki-medium`: **nur nicht-kommerziell**
- Allgemeine Information, keine medizinische Beratung.
