"""
Edge-TTS mit Wort-Zeitstempeln.

Aufruf:  py scripts/tts.py <stimme> <tempo> <ziel.mp3> <ziel.json> "<text>"

Schreibt die MP3 und eine JSON-Datei mit jedem gesprochenen Wort
(start/ende in Sekunden). Daraus baut das Video die Wort-fuer-Wort-Untertitel.
Kostenlos, kein Schluessel noetig.
"""
import asyncio
import json
import os
import ssl
import sys

import certifi
import edge_tts
import edge_tts.communicate

# Der Virenscanner (AVG) prueft HTTPS mit eigenem Zertifikat. Python kennt das
# nicht -> "CERTIFICATE_VERIFY_FAILED". Wir nehmen dasselbe Zertifikat dazu,
# das Node bereits ueber NODE_EXTRA_CA_CERTS verwendet. Die Pruefung bleibt an.
_extra = os.environ.get("NODE_EXTRA_CA_CERTS")
if _extra and os.path.exists(_extra):
    _ctx = ssl.create_default_context(cafile=certifi.where())
    _ctx.load_verify_locations(_extra)
    edge_tts.communicate._SSL_CTX = _ctx


async def main():
    stimme, tempo, mp3, ziel, text = sys.argv[1:6]
    kom = edge_tts.Communicate(text, stimme, rate=tempo, boundary="WordBoundary")
    woerter = []
    groesse = 0
    with open(mp3, "wb") as f:
        async for teil in kom.stream():
            if teil["type"] == "audio":
                f.write(teil["data"])
                groesse += len(teil["data"])
            elif teil["type"] == "WordBoundary":
                start = teil["offset"] / 1e7
                woerter.append({
                    "w": teil["text"],
                    "start": round(start, 3),
                    "ende": round(start + teil["duration"] / 1e7, 3),
                })
    # Edge liefert 24 kHz / 48 kbit/s CBR -> Laenge direkt aus der Dateigroesse
    dauer = groesse * 8 / 48000
    with open(ziel, "w", encoding="utf-8") as f:
        json.dump({"dauer": round(dauer, 3), "woerter": woerter}, f, ensure_ascii=False)


asyncio.run(main())
