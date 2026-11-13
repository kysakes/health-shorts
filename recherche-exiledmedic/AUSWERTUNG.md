# Analyse @ExiledMedicDe (Stand 12.11.2026)

Fabian Kowallik · **468.000 Abos · 1.478 Videos** · Slogan „Gesundheit. Aber auf echt.
Ohne Blatt vorm Mund.“ Verdient über eigene Supplement-Shop-Links (Rabattcode),
Buch, Telegram.

## Zahlen

| Format | Beispiele | Aufrufe |
|---|---|---|
| Langvideo 10–20 min | „Dieser billige Drink rettet JEDEN Entzündungsparameter“ | 561k |
| | „Du bist nicht verrückt… irgendwas stimmt nicht mit den Menschen“ | 451k |
| | „Diese virale Zahnpasta remineralisiert Zähne“ | 444k |
| | „DAS killt deinen Cortisol Belly in maximal 7 Tagen“ | 423k |
| | „Hör auf diese 7 Vitamine zu nehmen (#1 macht Lungenkrebs)“ | 264k |
| Shorts 30–60 s | „tschüss“ / „meine Kinder übernachten nicht bei anderen“ | 307k / 236k |
| | „zuckerfreie Muffins Rezept“ / „nährstoffe einfach decken“ | 214k / 184k |

Langvideos: ~3 pro Woche, fast alle 100k–560k. Shorts: meist 20k–120k.

## Die drei Formate (Screenshots in diesem Ordner)

**1. Langvideo (`1-…`, `2-…`)** — das eigentliche Erfolgsformat
- Grundbild: Mann im **dunklen Studio**, Podcast-Mikro vorne, grünes Akzentlicht hinten
- **Schnitt alle ~2 s im Hook** (erste 20 s), danach alle 5–15 s ein Einspieler
- **Riesige 2-Zeilen-Texte** unten: Zeile 1 weiß/grün, Zeile 2 **rot**, fette Schrift
  mit schwarzer Kontur („GUTE / SCHLECHTE“, „DIESE SUPPLEMENTE / BRAUCHST DU NICHT!“)
- **Person freigestellt über Hintergrund** (vor Kapseldosen, vor Supplement-Packungen)
- **3D-Medizin-Renderings**: glühender Darm (Röntgen-Optik rot/orange), Zelle, Blutgefäß
  mit roten Blutkörperchen, Skelett
- **Bauchbinden** („DIE STUDIE / 100.000 Menschen“, „SIEBEN SUPPLEMENTE“)
- **Hinweis-Linien** mit kleinem Text, die auf etwas zeigen
- **Bild-im-Bild**: Grafik links, Gesicht rechts auf blauem Grund
- Stock-Videos (Labor, Mikroskop, Gemüse)

**2. Short „am Tisch“ (`3-…`)**: ein Take, Kappe, Lebensmittel auf Holzbrett, er hält
Dinge hoch. Untertitel **ein Wort** weiß mittig. Keine Animation.

**3. Short „Podcast-Clip“ (`4-…`)**: Ausschnitt aus einem Gespräch, 16:9 oben, darunter
Untertitel, goldener Serifen-Titel „WÜRDE ICH NIE ERLAUBEN“.

## Kann ich die Animationen nachbauen?

| Element | Machbar? | Wie |
|---|---|---|
| Riesige 2-Zeilen-Texte weiß/rot mit Kontur | ✅ sofort | Remotion |
| Bauchbinden, Studien-Karten, Hinweis-Linien | ✅ sofort | Remotion (Studien-Karte gibt es schon) |
| Schnitt alle 2 s, Zoom-Stöße | ✅ sofort | Remotion |
| Stock-Videos (Labor, Essen) | ✅ | Pexels-**Video**-API (gleicher Key, gratis) |
| Person freigestellt über Hintergrund | ✅ mit Vorarbeit | Figur vor **Greenscreen** erzeugen, in Remotion auskeyen |
| 3D-Medizin (Darm, Zellen, Gefäße) | ⚠️ nicht in Remotion | Pexels-Videos („blood cells 3d“) oder KI-Clips (Veo / Higgsfield) |
| Sprechende Person | ⚠️ nur mit KI-Werkzeug | Bild (Nano Banana Pro) + unsere Tonspur → Lippensync-Modell |

**Fazit:** Alles außer der Person selbst und den 3D-Renderings baue ich in Remotion.
Die Person kommt als fertiger Videoclip rein, Remotion schneidet alles drumherum.

## Eigene KI-Person statt echtem Moderator

Wichtig: **eine erfundene Figur**, die Fabian Kowallik nicht ähnelt (kein lockiges
blondes Haar, kein roter Bart, nicht sein Studio 1:1). Keine echten Personen nachbauen.

### Vorschlag „Kaan“
Deutsch-türkischer Typ → passt für **beide** Kanäle (DE + TR).
Anfang 30, kurze dunkle Haare, gepflegter kurzer Bart, olivfarbene Haut, dunkelgrüner
Pullover (= Markenfarbe MRYFACTS #3EE08F), dunkles Studio, Podcast-Mikro.
**Kein „Dr.“, kein Kittel**, keine erfundenen Titel — er erklärt Studien, er behandelt nicht.

### Prompts für Nano Banana Pro (englisch, so versteht es das Modell am besten)

**1. Hauptbild (Moderator im Studio, 9:16)**
```
Photorealistic vertical portrait, 9:16. A fictional man in his early 30s with
Mediterranean features, short dark brown hair with a neat fade, short trimmed dark
beard, warm brown eyes, friendly and confident expression, looking directly into the
camera. He wears a plain dark green crewneck sweater. He sits at a desk in a dark
home studio; a black podcast microphone on a boom arm is in front of him at chest
height. Soft key light from the left, subtle green rim light on the wall behind him,
an out-of-focus plant and warm bokeh lights in the background. 50 mm lens, shallow
depth of field, natural skin texture.
```

**2. Figurenblatt (damit er in jedem Bild gleich aussieht)**
```
Character reference sheet of the same man: front view, three-quarter view left,
three-quarter view right and profile, head and shoulders, same dark green sweater,
neutral light grey background, even studio lighting, photorealistic.
```

**3. Greenscreen-Version (zum Freistellen über Einspieler)**
```
The same man, same outfit, waist-up, facing the camera, in front of a solid flat
chroma-key green background, even lighting with no shadows on the background.
```

### Ablauf

1. Figur mit Nano Banana Pro gestalten → Figurenblatt → als feste Figur speichern
   (Higgsfield „Soul ID“ / Flow „Ingredients“)
2. Text schreiben → **Stimme** erzeugen (ElevenLabs; Piper/Windows klingen mit Gesicht
   noch künstlicher als ohne)
3. Bild + Tonspur → **Lippensync-Clip** (Higgsfield Lipsync / Speak, Kling Avatar, Hedra
   o. ä.). Veo 3 in Google Flow erzeugt Bild + Stimme zusammen, aber nur ~8-s-Clips und
   die Stimme lässt sich schlecht steuern
4. Clip in Remotion: Vollbild-Moderator ↔ Einspieler alle 2–4 s, Texte, Bauchbinden,
   freigestellte Figur über Stock-Video

### Werkzeugwahl

- **Higgsfield**: Nano Banana Pro + gleichbleibende Figur + Lippensync in **einem** Abo
  (Preise in `../IDEEN-SPAETER.md`, vor Kauf prüfen) → **meine Empfehlung**
- **Google Flow**: stark bei Video (Veo), aber Clips kurz; Claude-in-Chrome ist
  gesperrt, im eingebauten Browser ginge es nur mit deiner Anmeldung
- **Creative-Claw-Plugin** ist bei dir installiert (Avatar + Stimme + Video), muss aber
  erst über `/mcp` angemeldet werden

## Was ich NICHT übernehmen würde

- **Den Behauptungsstil.** Titel wie „Krebs ist ein Parasit“, „heilt Leaky Gut nach EINER
  Dosis“, „Meide alles, was die Regierung dir empfiehlt“ sind nicht belegt bzw. falsch.
  YouTube löscht medizinische Falschinformationen und kann den Kanal sperren —
  und ein KI-Gesicht, das so etwas sagt, ist genau das, was in der Presse landet.
  **Format übernehmen, Inhalt bleibt belegt** (Quellen im Bild wie bisher).
- **KI-Kennzeichnung:** Eine realistische KI-Person muss beim Hochladen als
  „veränderte oder synthetische Inhalte“ markiert werden (YouTube-Pflicht). Anders als
  bei den Karussells (dort bewusst kein KI-Hinweis) geht es hier nicht ohne.
- **Supplement-Links mit Rabattcode** neben „Hör auf, X zu nehmen“ — Interessenkonflikt;
  wenn überhaupt, offen als Werbung kennzeichnen.
