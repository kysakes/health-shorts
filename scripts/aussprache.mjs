/**
 * AUSSPRACHE-WOERTERBUCH (nur fuer die Stimme, Untertitel bleiben korrekt geschrieben)
 *
 * Piper spricht ueber eSpeak-Lautschrift; Fremdwoerter gehen dabei oft schief.
 * Pruefen, was Piper aus einem Wort macht:
 *
 *   echo Koffein | werkzeug/piper/piper.exe -m werkzeug/stimmen/de_DE-thorsten-high.onnx \
 *     --output_file x.wav --debug 2>&1 | grep Converting
 *
 * Dann Ersatzschreibweisen testen, bis die Lautschrift stimmt, und hier eintragen.
 * Schluessel = Regex (Gross/klein egal, gilt auch in Wortzusammensetzungen).
 */
export const AUSSPRACHE = {
  de: [
    // Lautschrift vorher -> nachher
    ['espresso', 'Esspresso'], // ɛʃpɾˈɛsoː -> ɛspɾˈɛsoː
    ['koffein', 'Koffé-ihn'], // kˈɔfaɪn -> kɔfˈeːˈiːn
    ['bluttest', 'Blut-Test'], // blˈʊtəst -> blˈuːttˈɛst
    ['\\betwas\\b', 'etwass'], // ˈɛtvɑːs -> ˈɛtvas
    ['filterkaffee', 'Filter-Kaffee'], // Whisper hoerte "faellt der Kaffee" -> eigene Betonung auf Kaffee
    // 03-opc
    ['\\bOPC\\b', 'O-P-C'], // ˈɔpk -> ˈoːpˈeːtsˈeː
    ['proanthocyanidin', 'Proanthozyanidin'], // ...sˌyːan... -> ...tsˌyːan...
    ['\\bJacques\\b', 'Schack'], // jˈakkvəs -> ʃˈak
    ['\\bCartier\\b', 'Kartjee'], // kaɾtˈiːɾ -> kˈaɾtjeː
    ['\\bMasquelier\\b', 'Maskeljee'], // mˌaskvəlˈiːɾ -> mˈaskəljˌeː
    ['\\b1535\\b', 'fünfzehnhundertfünfunddreißig'], // Jahreszahl statt "eintausend..."
    ['blutverdünn', 'Blut-Verdünn'], // blˈʊt -> blˈuːt
    ['erdnusshäutchen', 'Erd-Nusshäutchen'], // Betonung auf Erd
    ['pflanzenstoff', 'Pflanzen-Stoff'], // st -> ʃt
    ['cholesterin', 'Koleste-rien'], // Betonung hinten
    ['\\bKakao\\b', 'Ka-kau'], // kˈɑkaˌoː -> kˈɑːkˈaʊ
    ['\\bSkorbut\\b', 'Skor-buht'], // Whisper hoerte "Scoreboot"; Betonung hinten
    ['kiefernrinde', 'Kiefern-Rinde'], // Whisper hoerte "Siefern"
    ['blutdruck', 'Blut-Druck'], // blˈʊt -> blˈuːt
    ['\\bEU\\b', 'E-U'], // ˈɔø -> ˈeːˈuː
    ['\\bNadeln\\b', 'Naadeln'], // nˈɑdəln -> nˈɑːdəln
    // Nicht verwenden (Piper betont falsch): "Labor", "Fazit", "Bilanz", "Unterm Strich"
  ],
  tr: [],
};

export const aussprechen = (text, sprache = 'de') =>
  (AUSSPRACHE[sprache] ?? []).reduce((t, [muster, ersatz]) => t.replace(new RegExp(muster, 'gi'), ersatz), text);
