<#
  Windows-Stimme (offline, kostenlos) mit Wort-Zeitstempeln.

  Aufruf:
    powershell -File scripts/stimme-windows.ps1 -Stimme Katja -Tempo 1.1 -Wav x.wav -Json x.json -TextDatei text.txt

  Nutzt die eingebauten "OneCore"-Stimmen (Katja, Stefan, Hedda). Klingt
  hoerbar nach Computer - fuer Tests gut, fuer den Kanal besser ElevenLabs.
#>
param(
  [string]$Stimme = 'Katja',
  [double]$Tempo = 1.1,
  [string]$Wav,
  [string]$Json,
  [string]$TextDatei
)
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.DataReader, Windows.Storage.Streams, ContentType = WindowsRuntime]

# WinRT-Async in PowerShell 5.1 abwarten
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
  $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1
function Warte($op, [Type]$typ) {
  $t = $asTask.MakeGenericMethod($typ).Invoke($null, @($op))
  $t.Wait() | Out-Null
  $t.Result
}

$text = [IO.File]::ReadAllText($TextDatei, [Text.Encoding]::UTF8).Trim()

$synth = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
$voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -like "*$Stimme*" } | Select-Object -First 1
if (-not $voice) { throw "Stimme '$Stimme' nicht installiert." }
$synth.Voice = $voice
$synth.Options.SpeakingRate = $Tempo
$synth.Options.IncludeWordBoundaryMetadata = $true

# Beginnt die Datei mit <speak, ist es SSML (Betonung, Tonhoehe pro Wort)
if ($text.StartsWith('<speak')) {
  $stream = Warte ($synth.SynthesizeSsmlToStreamAsync($text)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
} else {
  $stream = Warte ($synth.SynthesizeTextToStreamAsync($text)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
}

# Audio als WAV speichern
$size = [uint32]$stream.Size
$reader = New-Object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
$null = Warte ($reader.LoadAsync($size)) ([uint32])
$bytes = New-Object byte[] $size
$reader.ReadBytes($bytes)
[IO.File]::WriteAllBytes($Wav, $bytes)

# Laenge aus dem WAV-Kopf: Datengroesse / Bytes pro Sekunde
$byteRate = [BitConverter]::ToUInt32($bytes, 28)
$dataPos = 12
while ($dataPos -lt $bytes.Length - 8) {
  $id = [Text.Encoding]::ASCII.GetString($bytes, $dataPos, 4)
  $len = [BitConverter]::ToUInt32($bytes, $dataPos + 4)
  if ($id -eq 'data') { break }
  $dataPos += 8 + $len
}
$dauer = $len / $byteRate

# Wort-Zeitstempel
$woerter = @()
foreach ($track in $stream.TimedMetadataTracks) {
  if ($track.Id -ne 'SpeechWord') { continue }
  foreach ($cue in $track.Cues) {
    # pos = Zeichenposition im Text. Zahlen werden als mehrere Woerter
    # gesprochen ("25" -> "fuenfundzwanzig"), die Position bleibt aber eindeutig.
    $woerter += [ordered]@{
      pos   = $cue.StartPositionInInput
      w     = $cue.Text
      start = [math]::Round($cue.StartTime.TotalSeconds, 3)
      ende  = [math]::Round(($cue.StartTime + $cue.Duration).TotalSeconds, 3)
    }
  }
}

$obj = [ordered]@{ dauer = [math]::Round($dauer, 3); woerter = $woerter }
[IO.File]::WriteAllText($Json, ($obj | ConvertTo-Json -Depth 4 -Compress), (New-Object Text.UTF8Encoding($false)))
