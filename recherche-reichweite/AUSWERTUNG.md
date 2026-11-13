# Reichweite auf YouTube Shorts und TikTok – Recherche 13.11.2026

## 1. Was die Plattformen belohnen

**YouTube Shorts**
- Kein Klick, keine Klickrate: Entscheidend ist, ob Zuschauer **dranbleiben oder
  wegwischen**. Jedes Short geht erst an ein kleines Testpublikum und wird je nach
  Ergebnis weiter- oder nicht weiterverteilt.
- Seit 31.03.2025 zählt jeder Start als Aufruf; die strengere Zählung heißt jetzt
  „engagierte Aufrufe“ und bestimmt die Auszahlung (Partnerprogramm).
- In YouTube Studio: **„Angesehen vs. weggewischt“** ist die wichtigste Kennzahl.
  Konkrete Schwellenwerte (z. B. „unter 30 % Wegwischer“) stammen nur aus Blogs,
  nicht von YouTube – selbst messen statt glauben.
- Kürzer = höhere Durchsehrate. → **Kurzfassung ~35–55 s** für Shorts.

**TikTok**
- Creator-Rewards-Programm (Geld): 18+, **10.000 Follower, 100.000 Aufrufe in 30 Tagen**,
  privates Konto, **Videos ab 1 Minute**, Originalinhalt. Deutschland ist dabei.
  Auszahlung laut Drittquellen ~0,40–1,20 $ pro 1.000 qualifizierte Aufrufe.
- → **Lange Fassung (60–100 s)** für TikTok.

**Sichere Zonen (beide):** unteres ~20–25 % (Beschreibung, Name, Musik) und rechte
Spalte ~200 px (Like, Kommentar, Teilen) sind verdeckt. Plattformen veröffentlichen
nur Werbe-Zonen – Werte sind Messungen Dritter. Untertitel liegen bei uns seit heute
bei y = 1250, 130 px vom Rand.

## 2. Was Top-Creator zeigen (eigene Auswertung der Shorts-Seiten)

| Kanal | Abos | Typische Shorts | Ausreißer |
|---|---|---|---|
| DoktorWeigl (DE, Arzt) | 1,34 Mio | 8–25k | 40k: „30 Liegestütze täglich“, „Viszerales Fett verlieren“, „Insulinresistenz stoppen“ |
| Dr Karan (UK, Arzt) | 2,24 Mio | 10–30k (DE-Übersetzung) | **1 Mio**: „Warum Bryan Johnson in Gefahr ist“; 219k „Warum Krebs bei jungen Menschen zunimmt“; 113k Bryan Johnson 2; 90k GLP-1-Supplements |
| faktenlupe (DE, gesichtslos) | 217 | 1–5k | 39k „Zigarette vs. Vape vs. Snus“; 21k DDR-Ballon; 18k „Er schob sich einen Schlauch ins eigene Herz“ |
| ExiledMedic (DE) | 468k | – | 235k Podcast-Clip, 183k Nährstoff-Short (siehe `recherche-exiledmedic/`) |

**Muster der Ausreißer**
1. **Aktueller Aufhänger / bekannte Person** (Bryan Johnson, Ozempic, GLP-1, Protein-Trend)
   schlägt Lehrbuchwissen um Größenordnungen.
2. **Konkretes Ergebnis für den Zuschauer** („30 Liegestütze täglich“, „Bauchfett“,
   „Insulinresistenz stoppen“) – Nutzen im Titel.
3. **Entlarvung / Irrtum**: „Sind Multivitamine Betrug?“, „Probiotika größtenteils nutzlos“.
4. **Vergleich mit Wettkampf**: „Zigarette vs. Vape vs. Snus“ (unser Ursprungsformat).
5. **Du-Perspektive / Geschichte**: „Du wachst auf und …“, „Er trank vor Zeugen Cholera“.
6. Große Ärzte nutzen Shorts überwiegend als **Teaser für Langvideos** – ihre Shorts
   sind nicht besser als gute gesichtslose Shorts. Für uns heißt das: Das Thema und der
   Hook entscheiden, nicht der Doktortitel.

## 3. Umgesetzt (13.11.2026)

- Zwei Fassungen pro Thema: `kurzfassung: [Szenen]` → Komposition `<id>-kurz`
- `scripts/texte.mjs`: fertige Texte für YouTube/TikTok/Instagram + Titelbilder
- Untertitel in die sichere Zone verschoben
- Whisper: exakte Wortzeiten (Karaoke sitzt genauer = angenehmer anzusehen)
- Skill `/health-short` mit Hook- und Themenregeln

## 4. Themen-Ideen nach diesen Mustern (alle belegbar)

- Kreatin: Nur für Muskeln? (Trend, Gehirn-Studien) – Vergleich Kreatin vs. Koffein
- „Abnehmspritze“ GLP-1: Was passiert beim Absetzen? (Aktualität, Studien zu Gewichtszunahme)
- Protein-Hype: Wie viel braucht man wirklich? (DGE 0,8 g/kg vs. Influencer-Mengen)
- Magnesium gegen Krämpfe – wirkt es? (Cochrane-Review: bei Wadenkrämpfen kaum)
- Zucker vs. Süßstoff vs. Honig: Was ist am schlimmsten? (Vergleichsformat)
- „Detox“-Säfte: Was entgiftet wirklich? (Leber/Niere, Irrtum)
- Kollagen-Pulver: Kommt es in der Haut an? (Aufnahme, wie OPC)

## Quellen

- YouTube-Shorts-Algorithmus: [outlierkit.com](https://outlierkit.com/resources/youtube-shorts-algorithm/),
  [gyre.pro](https://gyre.pro/blog/youtube-shorts-view-count-update-impact-strategy-what-to-do-next)
- TikTok Creator Rewards: [creatorsagency.co](https://creatorsagency.co/blog/tiktok-creator-rewards-program-2026),
  [onestream.live](https://onestream.live/blog/what-is-the-tiktok-creator-rewards-program/)
- Sichere Zonen: [adaptlypost.com](https://adaptlypost.com/de/blog/social-media-safe-zones-2026-complete-guide),
  [socialync.io](https://www.socialync.io/tools/safe-zones/tiktok)
- DoktorWeigl: [YouTube-Blog](https://blog.youtube/intl/de-de/creator-and-artist-stories/als-arzt-erfolgreich-auf-youtube-doktorweigl-ermutigt-medizinerinnen-online-aufzuklaren/)
- Kanaldaten: youtube.com/@DoktorWeigl1/shorts, /@DrKaran/shorts, /@faktenlupe/shorts (abgerufen 13.11.2026)
